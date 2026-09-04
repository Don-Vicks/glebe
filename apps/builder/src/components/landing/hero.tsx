import Link from "next/link";

export function LandingHero() {
  return (
    <section className="hero wrap">
      <div className="hero-grid">
        <div>
          <span className="eyebrow">
            Websites for organizations, not everyone else
          </span>
          <h1>Your organization deserves a website that looks like the work you do.</h1>
          <p className="hero-sub">
            OrgSites is built for NGOs, faith-based organizations, schools, and
            community foundations — with the pages, donation flow, and structure
            already in place. No blank canvas, no developer, published in under
            an hour.
          </p>
          <div className="hero-actions">
            <Link href="/signup" className="btn btn-primary">
              Start building — it&rsquo;s free
            </Link>
            <a href="#anatomy" className="btn btn-ghost">
              See how it works
            </a>
          </div>
          <p className="hero-note">No credit card required · Live in under an hour</p>
        </div>

        <div className="site-mock" aria-hidden="true">
          <div className="site-mock-chrome">
            <span className="site-mock-dot" />
            <span className="site-mock-dot" />
            <span className="site-mock-dot" />
          </div>
          <div className="site-mock-hero">
            <div className="mock-kicker">HOPE FOUNDATION</div>
            <h3>Building stronger communities, together</h3>
            <p>We partner with local communities to expand access to education and clean water.</p>
            <span className="mock-btn">Donate now</span>
          </div>
          <div className="site-mock-body">
            <div className="mock-stats">
              <div className="mock-stat">
                <b>42</b>
                <span>Communities served</span>
              </div>
              <div className="mock-stat">
                <b>118</b>
                <span>Wells built</span>
              </div>
              <div className="mock-stat">
                <b>310</b>
                <span>Scholarships</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}