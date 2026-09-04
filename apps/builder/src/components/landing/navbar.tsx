import Link from "next/link";

export function LandingNavbar() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="#top" className="logo">
          OrgSites
        </Link>
        <ul className="nav-links">
          <li>
            <a href="#anatomy">How it works</a>
          </li>
          <li>
            <a href="#audience">Who it&rsquo;s for</a>
          </li>
          <li>
            <a href="#payments">Donations</a>
          </li>
          <li>
            <Link href="/signup" className="nav-cta">
              Start free
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}