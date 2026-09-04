import type { Block } from "@orgsites/block-schema";
import { card, section, heading, text, bg } from "./styles";

/**
 * Shared React renderers for the 9 site blocks.
 *
 * Consumed by BOTH:
 *  - apps/builder/src/editor/puck-config.tsx  (live Puck preview)
 *  - apps/renderer/src/blocks/registry.tsx     (published site)
 *
 * Output is pixel-identical from a single source. Theme colors resolve via
 * CSS custom properties (--site-*) set by the host page, falling back to the
 * OrgSites brand defaults.
 */

const heroGradient = `bg-[linear-gradient(135deg,var(--site-secondary,#1C1917),var(--site-primary,#4338CA))]`;
const donateGradient = `bg-[linear-gradient(135deg,var(--site-primary,#4338CA),#134E4A)]`;
const glassPanel = [
  "bg-white/[0.04]",
  "backdrop-blur-[12px]",
  "rounded-[20px]",
  "p-10",
].join(" ");

function Card({ children }: { children: React.ReactNode }) {
  return <article className={card}>{children}</article>;
}

export function HeroBlock({
  heading: title,
  subheading,
  ctaLabel,
  ctaHref,
}: {
  heading: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section
      className={`${section} ${heroGradient} text-center text-white`}
    >
      <div className={`${glassPanel} max-w-[920px] mx-auto`}>
        <h1 className="text-[48px] leading-[1.05] font-extrabold mb-4">{title}</h1>
        {subheading && (
          <p className="text-[18px] max-w-[680px] mx-auto mb-7 opacity-90">
            {subheading}
          </p>
        )}
        {ctaLabel && (
          <a
            href={ctaHref || "#"}
            className={`${bg.accent} inline-block px-7 py-[13px] rounded-full font-bold text-[#1C1917] no-underline`}
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}

export function MissionBlock({ heading: title, body }: { heading: string; body: string }) {
  return (
    <section className={`${section} max-w-[760px] mx-auto`}>
      <h2 className={heading}>{title}</h2>
      <p className="text-[17px] leading-[1.7] text-[#334155]">{body}</p>
    </section>
  );
}

const autoGridCols = (min: number) =>
  `grid gap-5 grid-cols-[repeat(auto-fit,minmax(${min}px,1fr))]`;

export function ProgramsGridBlock({
  heading: title,
  programs,
}: {
  heading: string;
  programs: Array<{ title: string; description: string }>;
}) {
  return (
    <section className={`${section} ${bg.surface}`}>
      <div className="max-w-[1120px] mx-auto">
        {title && <h2 className={heading}>{title}</h2>}
        <div className={autoGridCols(220)}>
          {programs.map((program, index) => (
            <Card key={index}>
              <div className="p-6">
                <h3 className="text-[18px] font-bold mb-2">{program.title}</h3>
                <p className="text-[#475569] leading-[1.6]">{program.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ImpactStatsBlock({
  heading: title,
  stats,
}: {
  heading?: string;
  stats: Array<{ label: string; value: string }>;
}) {
  return (
    <section className={`${section} text-center`}>
      <div className="max-w-[960px] mx-auto">
        {title && <h2 className={heading}>{title}</h2>}
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
          {stats.map((stat, i) => (
            <Card key={i}>
              <div className="p-6">
                <div className={`text-[36px] font-black ${text.primary}`}>{stat.value}</div>
                <div className={`mt-1 ${text.muted}`}>{stat.label}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamBlock({
  heading: title,
  members,
}: {
  heading?: string;
  members: Array<{ name: string; role?: string }>;
}) {
  return (
    <section className={section}>
      <div className="max-w-[1120px] mx-auto">
        {title && <h2 className={heading}>{title}</h2>}
        <div className={autoGridCols(220)}>
          {members.map((member, i) => (
            <Card key={i}>
              <div className="p-6">
                <h3 className="text-[18px] font-bold">{member.name}</h3>
                {member.role && <p className={`mt-1.5 ${text.primary}`}>{member.role}</p>}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsBlock({
  heading: title,
  quotes,
}: {
  heading?: string;
  quotes: Array<{ quote: string; attribution?: string }>;
}) {
  return (
    <section className={`${section} ${bg.surface}`}>
      <div className="max-w-[960px] mx-auto">
        {title && <h2 className={heading}>{title}</h2>}
        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
          {quotes.map((quote, i) => (
            <blockquote
              key={i}
              className={`${card} p-6 text-[17px] leading-[1.7] text-[#334155] italic`}
            >
              <p>{quote.quote}</p>
              {quote.attribution && (
                <footer className={`mt-3 font-bold not-italic ${text.secondary}`}>
                  {quote.attribution}
                </footer>
              )}
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DonateCtaBlock({
  heading: title,
  body,
  allowRecurring,
  allowCustomAmount,
}: {
  heading: string;
  body?: string;
  allowRecurring: boolean;
  allowCustomAmount: boolean;
}) {
  return (
    <section
      className={`${section} ${donateGradient} text-center text-white`}
    >
      <div className={`${glassPanel} max-w-[760px] mx-auto`}>
        <h2 className="text-[28px] font-extrabold mb-2">{title}</h2>
        {body && <p className="mb-5 opacity-90">{body}</p>}
        <button
          type="button"
          className={`${bg.accent} px-7 py-3 rounded-full font-bold text-[#1C1917] border-0 cursor-pointer`}
        >
          Donate {allowRecurring ? "once or monthly" : "now"}
          {allowCustomAmount ? "" : " (preset amounts)"}
        </button>
      </div>
    </section>
  );
}

export function EventListBlock({ heading: title }: { heading?: string }) {
  return (
    <section className={section}>
      <div className="max-w-[760px] mx-auto">
        {title && <h2 className={heading}>{title}</h2>}
        <div className={`${card} p-6 ${text.muted}`}>
          Event list preview will render published events here.
        </div>
      </div>
    </section>
  );
}

const inputClass = "p-3 rounded-[12px] border border-[#E7E5E4] font-sans text-[14px] w-full";

export function ContactFormBlock({
  heading: title,
  submitLabel,
}: {
  heading?: string;
  submitLabel: string;
}) {
  return (
    <section className={`${section} ${bg.surface}`}>
      <div className="max-w-[760px] mx-auto">
        {title && <h2 className={heading}>{title}</h2>}
        <form className={`${card} grid gap-3 p-6`}>
          <input placeholder="Your name" className={inputClass} />
          <input placeholder="Email address" className={inputClass} />
          <textarea placeholder="Message" rows={5} className={inputClass} />
          <button
            type="button"
            className={`${bg.ink} px-5 py-3 rounded-full border-0 text-white font-bold cursor-pointer`}
          >
            {submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}

/** Dispatch a validated `Block` to its renderer. */
export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "hero":
      return <HeroBlock {...block.props} />;
    case "mission":
      return <MissionBlock {...block.props} />;
    case "programs_grid":
      return <ProgramsGridBlock {...block.props} />;
    case "impact_stats":
      return <ImpactStatsBlock {...block.props} />;
    case "team":
      return <TeamBlock {...block.props} />;
    case "testimonials":
      return <TestimonialsBlock {...block.props} />;
    case "donate_cta":
      return <DonateCtaBlock {...block.props} />;
    case "event_list":
      return <EventListBlock {...block.props} />;
    case "contact_form":
      return <ContactFormBlock {...block.props} />;
    default:
      return null;
  }
}
