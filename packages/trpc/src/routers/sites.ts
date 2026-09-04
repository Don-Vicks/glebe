import { randomUUID } from "node:crypto";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, editorProcedure } from "../trpc";

export const sitesRouter = router({
  /** All sites for the caller's organization. */
  mine: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.site.findMany({
      where: { organizationId: ctx.session.organizationId },
      include: { organization: true, pages: { select: { id: true, slug: true, title: true } } },
      orderBy: { createdAt: "asc" },
    });
  }),

  /** Create a site + seeded homepage; subdomain derives from the name. */
  create: editorProcedure
    .input(
      z.object({
        name: z.string().min(2).max(80),
        orgType: z.enum(["NGO", "FAITH_BASED", "SCHOOL", "FOUNDATION", "OTHER"]).optional(),
        template: z.enum(["starter", "ngo", "faith", "school", "foundation"]).default("starter"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const org = await ctx.db.organization.update({
        where: { id: ctx.session.organizationId },
        data: { ...(input.orgType ? { type: input.orgType } : {}) },
      });

      const slug = input.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .slice(0, 40);

      const site = await ctx.db.site.create({
        data: {
          organizationId: org.id,
          subdomain: slug || `site-${Date.now()}`,
          status: "DRAFT",
          pages: {
            create: [
              {
                slug: "/",
                title: `${input.name} Home`,
                blocks: [],
              },
            ],
          },
        },
        include: { pages: true, organization: true },
      });

      return { site, template: input.template };
    }),

  /** Fetch one site, verified to belong to the caller's organization. */
  byId: protectedProcedure
    .input(z.object({ siteId: z.string() }))
    .query(async ({ ctx, input }) => {
      const site = await ctx.db.site.findUnique({ where: { id: input.siteId } });
      if (!site || site.organizationId !== ctx.session.organizationId) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return site;
    }),

  /** Set brand colors / logo for a site. */
  updateTheme: editorProcedure
    .input(
      z.object({
        siteId: z.string(),
        themeColors: z
          .object({ primary: z.string(), secondary: z.string(), accent: z.string() })
          .partial()
          .optional(),
        logoUrl: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const site = await ctx.db.site.findUnique({ where: { id: input.siteId } });
      if (!site || site.organizationId !== ctx.session.organizationId) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return ctx.db.site.update({
        where: { id: input.siteId },
        data: {
          ...(input.themeColors ? { themeColors: input.themeColors } : {}),
          ...(input.logoUrl ? { logoUrl: input.logoUrl } : {}),
        },
      });
    }),

  /**
   * Publish flow (spec §8.5, step 2): marks the site + its pages published
   * and enqueues a rebuild job. The actual BullMQ enqueue happens API-side
   * (apps/api/src/queues) — this stub shows where that call belongs.
   */
  /** Flip a site (and its pages) to PUBLISHED. */
  publish: editorProcedure
    .input(z.object({ siteId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const site = await ctx.db.site.findUnique({ where: { id: input.siteId } });
      if (!site || site.organizationId !== ctx.session.organizationId) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const updated = await ctx.db.site.update({
        where: { id: input.siteId },
        data: { status: "PUBLISHED", publishedAt: new Date() },
      });

      await ctx.db.page.updateMany({
        where: { siteId: input.siteId },
        data: { isDraft: false },
      });

      // TODO(Phase 0): enqueue a `site-build` job on the shared BullMQ queue
      // (see apps/api/src/queues/site-build.queue.ts) to trigger ISR
      // revalidation for this site's routes.

      return updated;
    }),

  requestCustomDomain: editorProcedure
    .input(z.object({ siteId: z.string(), domain: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const site = await ctx.db.site.findUnique({ where: { id: input.siteId } });
      if (!site || site.organizationId !== ctx.session.organizationId) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const token = `orgsites-verify-${randomUUID()}`;

      // TODO(Phase 0): enqueue a `domain-verification` job (BullMQ) that
      // polls DNS for a TXT record matching `token` before flipping status
      // to ACTIVE and provisioning SSL at the edge/CDN.
      return ctx.db.domainVerification.upsert({
        where: { siteId: input.siteId },
        create: {
          siteId: input.siteId,
          domain: input.domain,
          verificationToken: token,
          status: "PENDING",
        },
        update: {
          domain: input.domain,
          verificationToken: token,
          status: "PENDING",
        },
      });
    }),
});
