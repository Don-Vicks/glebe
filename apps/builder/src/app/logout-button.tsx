"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function logout() {
    setPending(true);
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.replace("/");
    router.refresh();
  }

  return <button type="button" onClick={logout} disabled={pending} className="workspace-logout">{pending ? "Signing out…" : "Sign out"}</button>;
}
