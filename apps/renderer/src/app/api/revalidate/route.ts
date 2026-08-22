import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@orgsites/db";

/**
 * Called by apps/api's SiteBuildProcessor (spec §8.5 step 3) after a site
 * is published, to trigger on-demand ISR revalidation immediately rather
 * than waiting for the next request to hit a stale cache entry.
 *
 * Protected by a shared secret header rather than real auth, since this is
 * a server-to-server call between the API and the renderer, not something
 * an end user ever calls directly.
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const { subdomain, customDomain } = (await req.json()) as {
    subdomain?: string;
    customDomain?: string | null;
  };

  const site = await prisma.site.findFirst({
    where:
      subdomain
        ? { subdomain }
        : customDomain
          ? { customDomain }
          : undefined,
    include: { pages: { select: { slug: true } } },
  });

  if (!site) {
    return NextResponse.json({ error: "Site not found" }, { status: 404 });
  }

  for (const page of site.pages) {
    revalidatePath(page.slug);
  }

  return NextResponse.json({ revalidated: true, subdomain, customDomain, paths: site.pages.map((page) => page.slug) });
}
