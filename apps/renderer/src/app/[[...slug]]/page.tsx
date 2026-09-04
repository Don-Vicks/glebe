import { notFound } from "next/navigation";
import { prisma } from "@orgsites/db";
import { pageBlocksSchema } from "@orgsites/block-schema";
import { resolveTenantSite } from "@/lib/resolve-tenant";
import { BlockRenderer } from "@/blocks/registry";
import type { Metadata } from "next";

// On-demand ISR: pages revalidate when a publish event triggers
// `revalidatePath`/`revalidateTag` from the API's site-build worker
// (spec §8.5.3), rather than on a fixed timer.
export const revalidate = false;

type Props = { params: { slug?: string[] }; searchParams?: { site?: string } };

async function getPageData(params: Props["params"], searchParams?: Props["searchParams"]) {
  const site = await resolveTenantSite(searchParams);
  if (!site || site.status !== "PUBLISHED") return null;

  const slug = "/" + (params.slug?.join("/") ?? "");
  const page = await prisma.page.findUnique({
    where: { siteId_slug: { siteId: site.id, slug } },
  });
  if (!page || page.isDraft) return null;

  const parsedBlocks = pageBlocksSchema.safeParse(page.blocks);
  return { site, page, blocks: parsedBlocks.success ? parsedBlocks.data : [] };
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const data = await getPageData(params, searchParams);
  if (!data) return {};
  const seo = data.page.seoMeta as { title?: string; description?: string } | null;
  return {
    title: seo?.title ?? data.page.title,
    description: seo?.description,
  };
}

export default async function TenantPage({ params, searchParams }: Props) {
  const data = await getPageData(params, searchParams);
  if (!data) notFound();

  const { site, blocks } = data;
  const theme = site.themeColors as { primary?: string; secondary?: string; accent?: string };

  return (
    <div
      style={
        {
          "--site-primary": theme?.primary ?? "#0E6E5C",
          "--site-secondary": theme?.secondary ?? "#1B2A4A",
          "--site-accent": theme?.accent ?? "#B98A2E",
        } as React.CSSProperties
      }
    >
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}
