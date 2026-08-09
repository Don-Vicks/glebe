import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job, UnrecoverableError } from "bullmq";
import { resolveTxt } from "dns/promises";
import { prisma } from "@orgsites/db";
import { DOMAIN_VERIFICATION_QUEUE } from "../queue-names";

interface DomainVerificationJobData {
  siteId: string;
  domain: string;
  verificationToken: string;
}

/**
 * Processes the `domain-verification` queue (spec §8.5 step 5 / §8.7).
 * Polls for a DNS TXT record matching the verification token, with the
 * job's own backoff/attempts config (set in SitesService.requestCustomDomain)
 * handling the retry cadence.
 *
 * NOTE: SSL provisioning at the edge/CDN once verification succeeds is
 * provider-specific (Cloudflare API call, or automatic if using Vercel's
 * domain API) and is left as a TODO — the shape depends on which you pick
 * per the open decision in spec §8.2/§14.1.
 */
@Processor(DOMAIN_VERIFICATION_QUEUE)
export class DomainVerificationProcessor extends WorkerHost {
  private readonly logger = new Logger(DomainVerificationProcessor.name);

  async process(job: Job<DomainVerificationJobData>) {
    const { siteId, domain, verificationToken } = job.data;

    let records: string[][] = [];
    try {
      records = await resolveTxt(`_orgsites-verify.${domain}`);
    } catch {
      // No record yet — let BullMQ retry per the job's backoff config.
      throw new Error(`No verification TXT record found yet for ${domain}`);
    }

    const found = records.flat().includes(verificationToken);
    if (!found) {
      throw new Error(`Verification token not found in TXT records for ${domain}`);
    }

    await prisma.domainVerification.update({
      where: { siteId },
      data: { status: "ACTIVE", lastCheckedAt: new Date() },
    });
    await prisma.site.update({
      where: { id: siteId },
      data: { customDomain: domain },
    });

    this.logger.log(`Domain ${domain} verified for site ${siteId}`);

    // TODO: trigger SSL cert issuance at the edge/CDN here.
  }
}
