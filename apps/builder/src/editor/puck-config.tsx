import type { Config } from "@measured/puck";
import { BLOCK_LABELS } from "@orgsites/block-schema";
import {
  HeroBlock,
  MissionBlock,
  ProgramsGridBlock,
  ImpactStatsBlock,
  TeamBlock,
  TestimonialsBlock,
  DonateCtaBlock,
  EventListBlock,
  ContactFormBlock,
} from "@orgsites/ui";

type PuckComponents = {
  hero: {
    heading: string;
    subheading?: string;
    ctaLabel?: string;
    ctaHref?: string;
    backgroundImageUrl?: string;
  };
  mission: { heading: string; body: string };
  programs_grid: {
    heading: string;
    programs: Array<{ title: string; description: string; imageUrl?: string }>;
  };
  impact_stats: { heading?: string; stats: Array<{ label: string; value: string }> };
  team: { heading?: string; members: Array<{ name: string; role?: string; photoUrl?: string }> };
  testimonials: { heading?: string; quotes: Array<{ quote: string; attribution?: string }> };
  donate_cta: {
    heading: string;
    body?: string;
    paymentProviderConfigId?: string;
    suggestedAmounts?: number[];
    allowCustomAmount: boolean;
    allowRecurring: boolean;
  };
  event_list: {
    heading?: string;
    maxItems: number;
    source: "auto" | "manual";
    eventIds?: string[];
  };
  contact_form: { heading?: string; submitLabel: string; fields: Array<"name" | "email" | "phone" | "message"> };
};

export const puckConfig: Config<PuckComponents> = {
  components: {
    hero: {
      label: BLOCK_LABELS.hero,
      fields: {
        heading: { type: "text" },
        subheading: { type: "textarea" },
        ctaLabel: { type: "text" },
        ctaHref: { type: "text" },
        backgroundImageUrl: { type: "text" },
      },
      defaultProps: {
        heading: "Building stronger communities, together",
        subheading: "Tell visitors what your organization does in one sentence.",
        ctaLabel: "Donate now",
        ctaHref: "/donate",
      },
      render: (props) => <HeroBlock {...props} />,
    },
    mission: {
      label: BLOCK_LABELS.mission,
      fields: { heading: { type: "text" }, body: { type: "textarea" } },
      defaultProps: { heading: "Our mission", body: "Describe what your organization believes and why it does this work." },
      render: (props) => <MissionBlock {...props} />,
    },
    programs_grid: {
      label: BLOCK_LABELS.programs_grid,
      fields: {
        heading: { type: "text" },
        programs: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            description: { type: "textarea" },
            imageUrl: { type: "text" },
          },
        },
      },
      defaultProps: {
        heading: "Programs",
        programs: [{ title: "Community outreach", description: "Hands-on support for families and neighborhoods." }],
      },
      render: (props) => <ProgramsGridBlock {...props} />,
    },
    impact_stats: {
      label: BLOCK_LABELS.impact_stats,
      fields: {
        heading: { type: "text" },
        stats: { type: "array", arrayFields: { label: { type: "text" }, value: { type: "text" } } },
      },
      defaultProps: { heading: "Impact", stats: [{ label: "Families served", value: "12,400" }] },
      render: (props) => <ImpactStatsBlock {...props} />,
    },
    team: {
      label: BLOCK_LABELS.team,
      fields: { heading: { type: "text" }, members: { type: "array", arrayFields: { name: { type: "text" }, role: { type: "text" }, photoUrl: { type: "text" } } } },
      defaultProps: { heading: "Our team", members: [{ name: "Amina Yusuf", role: "Programs Lead" }] },
      render: (props) => <TeamBlock {...props} />,
    },
    testimonials: {
      label: BLOCK_LABELS.testimonials,
      fields: { heading: { type: "text" }, quotes: { type: "array", arrayFields: { quote: { type: "textarea" }, attribution: { type: "text" } } } },
      defaultProps: { heading: "What people say", quotes: [{ quote: "This work changed our community.", attribution: "Local partner" }] },
      render: (props) => <TestimonialsBlock {...props} />,
    },
    donate_cta: {
      label: BLOCK_LABELS.donate_cta,
      fields: {
        heading: { type: "text" },
        body: { type: "textarea" },
        paymentProviderConfigId: { type: "text" },
        suggestedAmounts: { type: "array", arrayFields: { value: { type: "number" } } },
        allowCustomAmount: { type: "radio", options: [{ label: "Allow custom amount", value: true }, { label: "Fixed amounts only", value: false }] },
        allowRecurring: { type: "radio", options: [{ label: "Allow recurring donations", value: true }, { label: "One-time only", value: false }] },
      },
      defaultProps: { heading: "Support our work", body: "Your donation directly funds our programs.", allowCustomAmount: true, allowRecurring: true },
      render: (props) => <DonateCtaBlock {...props} />,
    },
    event_list: {
      label: BLOCK_LABELS.event_list,
      fields: {
        heading: { type: "text" },
        maxItems: { type: "number" },
        source: { type: "radio", options: [{ label: "Auto-pull from events", value: "auto" }, { label: "Manually curated", value: "manual" }] },
        eventIds: { type: "array", arrayFields: { value: { type: "text" } } as any },
      },
      defaultProps: { heading: "Upcoming events", maxItems: 5, source: "auto" },
      render: (props) => <EventListBlock {...props} />,
    },
    contact_form: {
      label: BLOCK_LABELS.contact_form,
      fields: {
        heading: { type: "text" },
        submitLabel: { type: "text" },
        fields: { type: "array", arrayFields: { value: { type: "text" } } as any },
      },
      defaultProps: { heading: "Contact us", submitLabel: "Send message", fields: ["name", "email", "message"] },
      render: (props) => <ContactFormBlock {...props} />,
    },
  },
};
