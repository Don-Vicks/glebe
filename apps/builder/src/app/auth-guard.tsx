"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Routes that require a valid session before they render anything.
const protectedPrefixes = ["/dashboard", "/onboarding", "/sites"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
  const [checking, setChecking] = useState(isProtected);

  useEffect(() => {
    if (!isProtected) return;
    let active = true;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function check() {
      try {
        const response = await fetch("/api/auth/me", { credentials: "include", cache: "no-store" });
        const result = (await response.json()) as { authenticated: boolean };
        if (!active) return;
        if (result.authenticated) {
          setChecking(false);
          return;
        }
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      } catch {
        if (!active) return;
        attempts += 1;
        if (attempts >= 3) {
          router.replace(`/login?next=${encodeURIComponent(pathname)}`);
          return;
        }
        // Back off on transient failures (e.g. brief API restart)
        // instead of bouncing the user to login immediately.
        timer = setTimeout(check, 800 * attempts);
      }
    }

    check();
    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, [isProtected, pathname, router]);

  if (checking) return <div className="auth-loading">Checking your workspace…</div>;
  return <>{children}</>;
}
