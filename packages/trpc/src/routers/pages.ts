import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { pageBlocksSchema } from "@orgsites/block-schema";
import { router, protectedProcedure, editorProcedure } from "../trpc";

/**
 * Pages router — this is the router referenced in the spec as the first
 * place to feel tRPC's payoff: block payloads are validated against the
 * shared @orgsites/block-schema union on save, so the editor UI (Puck),
 * this router, and the Site Renderer can never drift out of sync on what a
 * "hero" or "donate_cta" block is allowed to contain.
 */
export const pagesRouter = router({
  /** Ordered list of pages for a site. */
  list: protectedProcedure
    .input(z.object({ siteId: z.string() }))
    .query(async ({ ctx, input }) => {
      await assertSiteInOrg(ctx, input.siteId);
      return ctx.db.page.findMany({
        where: { siteId: input.siteId },
        orderBy: { order: "asc" },
      });
    }),

  /** Single page by id, scoped to the caller's organization. */
  byId: protectedProcedure
    .input(z.object({ pageId: z.string() }))
    .query(async ({ ctx, input }) => {
      const page = await ctx.db.page.findUnique({ where: { id: input.pageId } });
      if (!page) throw new TRPCError({ code: "NOT_FOUND" });
      await assertSiteInOrg(ctx, page.siteId);
      return page;
    }),

  bySlug: protectedProcedure
    .input(z.object({ siteId: z.string(), slug: z.string() }))
    .query(async ({ ctx, input }) => {
      await assertSiteInOrg(ctx, input.siteId);
      const page = await ctx.db.page.findUnique({
        where: { siteId_slug: { siteId: input.siteId, slug: input.slug } },
      });
      if (!page) throw new TRPCError({ code: "NOT_FOUND" });
      return page;
    }),

  create: editorProcedure
    .input(
      z.object({
        siteId: z.string(),
        slug: z.string().min(1),
        title: z.string().min(1).max(120),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await assertSiteInOrg(ctx, input.siteId);
      return ctx.db.page.create({
        data: {
          siteId: input.siteId,
          slug: input.slug,
          title: input.title,
          blocks: [],
        },
      });
    }),

  /**
   * Autosave endpoint the Puck editor calls on every meaningful change.
   * `blocks` is validated against the shared block-schema union here —
   * this is the type-safety payoff described in spec §8.3a: an invalid
   * block shape is rejected before it ever reaches Postgres or the renderer.
   */
  saveBlocks: editorProcedure
    .input(
      z.object({
        pageId: z.string(),
        blocks: pageBlocksSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const page = await ctx.db.page.findUnique({ where: { id: input.pageId } });
      if (!page) throw new TRPCError({ code: "NOT_FOUND" });
      await assertSiteInOrg(ctx, page.siteId);

      return ctx.db.page.update({
        where: { id: input.pageId },
        data: { blocks: input.blocks, isDraft: true },
      });
    }),

  updateMeta: editorProcedure
    .input(
      z.object({
        pageId: z.string(),
        title: z.string().min(1).max(120).optional(),
        seoMeta: z
          .object({
            title: z.string().max(70).optional(),
            description: z.string().max(160).optional(),
            ogImage: z.string().url().optional(),
          })
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const page = await ctx.db.page.findUnique({ where: { id: input.pageId } });
      if (!page) throw new TRPCError({ code: "NOT_FOUND" });
      await assertSiteInOrg(ctx, page.siteId);

      return ctx.db.page.update({
        where: { id: input.pageId },
        data: {
          ...(input.title ? { title: input.title } : {}),
          ...(input.seoMeta ? { seoMeta: input.seoMeta } : {}),
        },
      });
    }),

  delete: editorProcedure
    .input(z.object({ pageId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const page = await ctx.db.page.findUnique({ where: { id: input.pageId } });
      if (!page) throw new TRPCError({ code: "NOT_FOUND" });
      await assertSiteInOrg(ctx, page.siteId);
      await ctx.db.page.delete({ where: { id: input.pageId } });
      return { success: true };
    }),
});

/**
 * Org-scoping guard: confirms the requesting user's organization actually
 * owns the site being mutated. This is the row-level multi-tenancy
 * enforcement point described in spec §8.3 — every mutation routes through
 * a check like this rather than trusting a bare siteId from the client.
 */
async function assertSiteInOrg(
  ctx: { db: import("@orgsites/db").PrismaClient; session: { organizationId: string } | null },
  siteId: string
) {
  const site = await ctx.db.site.findUnique({ where: { id: siteId } });
  if (!site || site.organizationId !== ctx.session?.organizationId) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Site does not belong to your organization." });
  }
  return site;
}
