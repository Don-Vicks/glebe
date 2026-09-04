/**
 * OrgSites brand bar — credits every published site with a minimal
 * "Built with OrgSites" footer. Rendered OUTSIDE the per-site theme
 * wrapper so it always carries the OrgSites brand (navy / paper /
 * Fraunces) regardless of an org's custom colors — branding is always
 * present on the free tier.
 */
export function OrgSitesBrandBar() {
  const brandUrl = process.env.ORGSITES_BRAND_URL ?? "http://localhost:3000";

  return (
    <footer className="bg-navy text-[#AEB9CB] border-t border-white/10">
      <div className="mx-auto max-w-[1120px] px-6 py-5 flex items-center justify-center gap-2 text-sm">
        <span className="text-[13px]">Built with</span>
        <a
          href={brandUrl}
          target="_blank"
          rel="noreferrer"
          className="font-display text-[15px] font-medium tracking-[-0.01em] text-[#FAF7F0] underline-offset-4 hover:text-white hover:underline"
        >
          OrgSites
        </a>
      </div>
    </footer>
  );
}