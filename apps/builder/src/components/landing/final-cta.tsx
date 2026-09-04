import Link from "next/link";

export function FinalCta() {
  return (
    <section className="final-cta" id="pricing">
      <div className="wrap">
        <h2>Your organization&rsquo;s site, published this week.</h2>
        <p>
          Start free on a orgsites.app address. Add your own domain, remove
          branding, and connect donations when you&rsquo;re ready.
        </p>
        <div className="hero-actions">
          <Link href="/signup" className="btn btn-primary">
            Start building — it&rsquo;s free
          </Link>
          <a href="#top" className="btn btn-ghost">
            Talk to us
          </a>
        </div>
      </div>
    </section>
  );
}