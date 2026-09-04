import { prisma } from "@orgsites/db";
import { headers } from "next/headers";

/**
 * Resolves the incoming request's hostname to a Site — the step described
 * in spec §8.5.4. Handles both subdomains (org.orgsites.app) and connected
 * custom domains.
 *
 * Local-development note: wildcard DNS for *.orgsites.app usually isn't set
 * up locally, so linking to `subdomain.orgsites.app:3001` fails. To work
 * around this without touching /etc/hosts or DNS, the builder's "View" link
 * uses a `?site=<subdomain>` query param when no custom domain is set. The
 * renderer reads that param first, then falls back to hostname resolution.
 *
 * Phase 2 note (spec §8.3a discussion): this lookup is a good first
 * candidate to push to a Cloudflare Worker / edge KV cache once you have
 * enough tenants that a per-request Postgres round trip for hostname
 * resolution becomes a latency concern. For MVP, a direct Prisma query
 * (ideally behind a short-TTL Redis cache) is enough.
 */
export async function resolveTenantSite(searchParams?: { site?: string }) {
  // 1) Explicit ?site=<subdomain> param (local workflow) wins.
  if (searchParams?.site) {
    return prisma.site.findUnique({ where: { subdomain: searchParams.site } });
  }

  const hostHeader = headers().get("host") ?? "";
  const host = hostHeader.split(":")[0] ?? ""; // strip port for local dev

  const rootDomain = process.env.ORGSITES_ROOT_DOMAIN ?? "orgsites.app";

  let site;
  if (host.endsWith(`.${rootDomain}`)) {
    const subdomain = host.replace(`.${rootDomain}`, "");
    site = await prisma.site.findUnique({ where: { subdomain } });
  } else {
    site = await prisma.site.findUnique({ where: { customDomain: host } });
  }

  return site;
}
