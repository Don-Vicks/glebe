import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { prisma } from "@orgsites/db";
import { SITE_BUILD_QUEUE, DOMAIN_VERIFICATION_QUEUE } from "../../queues/queue-names";
import { randomUUID } from "crypto";

@Injectable()
export class SitesService {
  constructor(
    @InjectQueue(SITE_BUILD_QUEUE) private readonly siteBuildQueue: Queue,
    @InjectQueue(DOMAIN_VERIFICATION_QUEUE) private readonly domainQueue: Queue
  ) {}

  /**
   * Publish flow (spec §8.5, steps 2–3). This is the REST-side counterpart
   * to `sites.publish` in packages/trpc/src/routers/sites.ts — call this
   * from the Builder app's server actions, or move the enqueue call
   * directly into the tRPC mutation if you'd rather not round-trip through
   * the REST API for this. Either is a reasonable Phase 0 decision; this
   * scaffold keeps them separate so the API remains the single owner of
   * BullMQ access.
   */
  async publish(siteId: string) {
    const site = await prisma.site.findUnique({ where: { id: siteId } });
    if (!site) throw new NotFoundException("Site not found");

    const updated = await prisma.site.update({
      where: { id: siteId },
      data: { status: "PUBLISHED", publishedAt: new Date() },
    });

    await prisma.page.updateMany({
      where: { siteId },
      data: { isDraft: false },
    });

    await this.siteBuildQueue.add("rebuild", {
      siteId,
      subdomain: site.subdomain,
      customDomain: site.customDomain,
    });

    return updated;
  }

  async requestCustomDomain(siteId: string, domain: string) {
    const site = await prisma.site.findUnique({ where: { id: siteId } });
    if (!site) throw new NotFoundException("Site not found");

    const verificationToken = `orgsites-verify-${randomUUID()}`;

    const record = await prisma.domainVerification.upsert({
      where: { siteId },
      create: { siteId, domain, verificationToken, status: "PENDING" },
      update: { domain, verificationToken, status: "PENDING" },
    });

    // Kick off periodic DNS polling (spec §8.5 step 5). The worker retries
    // on a backoff until the TXT record is found, then flips status to
    // ACTIVE and hands off to the CDN/edge for SSL provisioning.
    await this.domainQueue.add(
      "verify",
      { siteId, domain, verificationToken },
      { attempts: 20, backoff: { type: "exponential", delay: 60_000 } }
    );

    return record;
  }
}
