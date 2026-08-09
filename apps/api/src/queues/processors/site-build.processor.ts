import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { SITE_BUILD_QUEUE } from "../queue-names";

interface SiteBuildJobData {
  siteId: string;
  subdomain: string;
  customDomain: string | null;
}

/**
 * Processes the `site-build` queue (spec §8.5 step 3 / §8.7).
 *
 * On publish, this calls the renderer app's revalidation endpoint so the
 * newly published content shows up immediately instead of waiting for the
 * next natural request-triggered ISR check. Requires a matching
 * `/api/revalidate` route in apps/renderer that calls Next.js's
 * `revalidatePath`/`revalidateTag` — not scaffolded yet, since it's a small
 * addition once you've decided on your exact revalidation strategy
 * (per-path vs. per-tenant tag).
 */
@Processor(SITE_BUILD_QUEUE)
export class SiteBuildProcessor extends WorkerHost {
  private readonly logger = new Logger(SiteBuildProcessor.name);

  async process(job: Job<SiteBuildJobData>) {
    const { siteId, subdomain, customDomain } = job.data;
    this.logger.log(`Rebuilding site ${siteId} (${subdomain})`);

    const rendererUrl = process.env.RENDERER_REVALIDATE_URL ?? "http://localhost:3001/api/revalidate";
    const secret = process.env.REVALIDATE_SECRET ?? "";

    try {
      const res = await fetch(rendererUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-revalidate-secret": secret },
        body: JSON.stringify({ subdomain, customDomain }),
      });
      if (!res.ok) {
        throw new Error(`Revalidation request failed: ${res.status}`);
      }
    } catch (err) {
      this.logger.warn(
        `Revalidation endpoint not reachable yet (${(err as Error).message}) — this is expected until apps/renderer/src/app/api/revalidate is implemented.`
      );
    }
  }
}
