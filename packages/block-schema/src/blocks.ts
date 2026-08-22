import { z } from "zod";

/**
 * Block-type registry — the contract referenced throughout the spec (§5.2,
 * §8.3a, §8.4). This is intentionally the ONE place that defines what a
 * block is. Three consumers read from here:
 *
 *   1. The Puck editor config in apps/builder (field UI for each block)
 *   2. The tRPC page router in apps/builder/src/server (validates block
 *      payloads on save)
 *   3. The Site Renderer in apps/renderer (maps block.type -> React component)
 *
 * Adding a new block type = add a schema here, a Puck field config entry,
 * and a renderer component. Nothing else needs to know about it.
 */

export const heroBlockSchema = z.object({
  type: z.literal("hero"),
  props: z.object({
    heading: z.string().min(1).max(120),
    subheading: z.string().max(280).optional(),
    ctaLabel: z.string().max(40).optional(),
    ctaHref: z.string().optional(),
    backgroundImageUrl: z.string().url().optional(),
  }),
});

export const missionBlockSchema = z.object({
  type: z.literal("mission"),
  props: z.object({
    heading: z.string().min(1).max(120),
    body: z.string().min(1).max(2000),
  }),
});

export const programsGridBlockSchema = z.object({
  type: z.literal("programs_grid"),
  props: z.object({
    heading: z.string().min(1).max(120),
    programs: z
      .array(
        z.object({
          title: z.string().min(1).max(80),
          description: z.string().max(400),
          imageUrl: z.string().url().optional(),
        })
      )
      .max(12),
  }),
});

export const impactStatsBlockSchema = z.object({
  type: z.literal("impact_stats"),
  props: z.object({
    heading: z.string().max(120).optional(),
    stats: z
      .array(
        z.object({
          label: z.string().min(1).max(60),
          value: z.string().min(1).max(20),
        })
      )
      .min(1)
      .max(6),
  }),
});

export const teamBlockSchema = z.object({
  type: z.literal("team"),
  props: z.object({
    heading: z.string().max(120).optional(),
    members: z
      .array(
        z.object({
          name: z.string().min(1).max(80),
          role: z.string().max(80).optional(),
          photoUrl: z.string().url().optional(),
        })
      )
      .max(24),
  }),
});

export const testimonialsBlockSchema = z.object({
  type: z.literal("testimonials"),
  props: z.object({
    heading: z.string().max(120).optional(),
    quotes: z
      .array(
        z.object({
          quote: z.string().min(1).max(600),
          attribution: z.string().max(80).optional(),
        })
      )
      .max(10),
  }),
});

export const donateCtaBlockSchema = z.object({
  type: z.literal("donate_cta"),
  props: z.object({
    heading: z.string().min(1).max(120),
    body: z.string().max(400).optional(),
    paymentProviderConfigId: z.string().optional(),
    suggestedAmounts: z.array(z.number().int().positive()).max(6).optional(),
    allowCustomAmount: z.boolean().default(true),
    allowRecurring: z.boolean().default(true),
  }),
});

export const eventListBlockSchema = z.object({
  type: z.literal("event_list"),
  props: z.object({
    heading: z.string().max(120).optional(),
    maxItems: z.number().int().min(1).max(20).default(5),
    source: z.enum(["auto", "manual"]).default("auto"),
    eventIds: z.array(z.string()).max(20).optional(),
  }),
});

export const contactFormBlockSchema = z.object({
  type: z.literal("contact_form"),
  props: z.object({
    heading: z.string().max(120).optional(),
    submitLabel: z.string().max(40).default("Send message"),
    fields: z
      .array(z.enum(["name", "email", "phone", "message"]))
      .default(["name", "email", "message"]),
  }),
});

/** Discriminated union of every block type — used to validate a Page's blocks[] array. */
export const blockSchema = z.discriminatedUnion("type", [
  heroBlockSchema,
  missionBlockSchema,
  programsGridBlockSchema,
  impactStatsBlockSchema,
  teamBlockSchema,
  testimonialsBlockSchema,
  donateCtaBlockSchema,
  eventListBlockSchema,
  contactFormBlockSchema,
]);

export const pageBlocksSchema = z.array(blockSchema);

export type Block = z.infer<typeof blockSchema>;
export type BlockType = Block["type"];
export type PageBlocks = z.infer<typeof pageBlocksSchema>;

export const BLOCK_TYPES: BlockType[] = [
  "hero",
  "mission",
  "programs_grid",
  "impact_stats",
  "team",
  "testimonials",
  "donate_cta",
  "event_list",
  "contact_form",
];

/** Human-readable labels for the Puck component picker. */
export const BLOCK_LABELS: Record<BlockType, string> = {
  hero: "Hero",
  mission: "Mission / About",
  programs_grid: "Programs Grid",
  impact_stats: "Impact Stats",
  team: "Team",
  testimonials: "Testimonials",
  donate_cta: "Donate CTA",
  event_list: "Event List",
  contact_form: "Contact Form",
};
