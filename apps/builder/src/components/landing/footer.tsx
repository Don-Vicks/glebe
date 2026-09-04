import Link from "next/link";
import { Globe } from "lucide-react";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "Donation processing", href: "#features" },
  { label: "Custom domains", href: "#features" },
];

const startLinks = [
  { label: "Create free account", href: "/signup" },
  { label: "Sign in to workspace", href: "/login" },
  { label: "Documentation & spec", href: "https://github.com/Don-Vicks/glebe", external: true },
];

export function LandingFooter() {
  return (
    <footer className="bg-ink text-muted-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 md:col-span-2 max-w-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-indigo-soft to-indigo-deep flex items-center justify-center text-white">
                <Globe className="w-4 h-4" />
              </div>
              <span className="font-bold tracking-tight text-lg text-white">
                OrgSites
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The website and donation platform built for civic organizations,
              non-profits, faith communities, and schools.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors duration-150">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Get started
            </h4>
            <ul className="space-y-2.5 text-sm">
              {startLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    className="hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-10 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} OrgSites. All rights reserved.</p>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}