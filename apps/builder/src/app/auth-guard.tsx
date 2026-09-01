"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const protectedPrefixes = ["/dashboard", "/onboarding", "/sites"];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
  const [checking, setChecking] = useState(isProtected);

  useEffect(() => {
    if (!isProtected) return;
    let active = true;
    fetch("/api/auth/me", { credentials: "include", cache: "no-store" })
      .then((response) => response.json() as Promise<{ authenticated: boolean }>)
      .then((result) => {
        if (!active) return;
        if (!result.authenticated) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
        else setChecking(false);
      })
      .catch(() => router.replace(`/login?next=${encodeURIComponent(pathname)}`));
    return () => { active = false; };
  }, [isProtected, pathname, router]);

  if (checking) return <div className="auth-loading">Checking your workspace…</div>;
  return <>{children}</>;
}
