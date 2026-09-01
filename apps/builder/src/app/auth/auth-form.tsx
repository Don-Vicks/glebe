"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const isSignup = mode === "signup";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const payload = {
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      ...(isSignup
        ? { name: String(form.get("name") ?? ""), organizationName: String(form.get("organizationName") ?? "") }
        : {}),
    };

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "We could not sign you in.");
      router.push(isSignup ? "/onboarding" : "/dashboard");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We could not complete that request.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="auth-title">
        <Link href="/" className="auth-brand">OrgSites</Link>
        <p className="auth-kicker">{isSignup ? "Start your workspace" : "Welcome back"}</p>
        <h1 id="auth-title">{isSignup ? "Build your organization’s home online." : "Sign in to your workspace."}</h1>
        <p className="auth-intro">
          {isSignup ? "Create a site, invite your team, and publish a clear public presence." : "Your sites, pages, and publishing workflow are waiting."}
        </p>

        <form onSubmit={submit} className="auth-form">
          {isSignup && <Field label="Your name" name="name" autoComplete="name" placeholder="Ada Lovelace" />}
          {isSignup && <Field label="Organization name" name="organizationName" autoComplete="organization" placeholder="Hope Foundation" required />}
          <Field label="Email address" name="email" type="email" autoComplete="email" placeholder="you@example.org" required />
          <Field label="Password" name="password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} placeholder="At least 10 characters" required minLength={10} />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="auth-submit" type="submit" disabled={pending}>
            {pending ? "Working…" : isSignup ? "Create workspace" : "Sign in"}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? "Already have an account?" : "New to OrgSites?"} {" "}
          <Link href={isSignup ? "/login" : "/signup"}>{isSignup ? "Sign in" : "Create an account"}</Link>
        </p>
      </section>
      <aside className="auth-aside">
        <span className="aside-mark">01 / 03</span>
        <h2>A better first impression for the work that matters.</h2>
        <p>OrgSites gives mission-led teams a focused way to shape their story, accept support, and keep publishing in their own hands.</p>
        <div className="aside-line" />
        <span>NGOs · schools · faith communities · civic teams</span>
      </aside>
    </main>
  );
}

function Field(props: { label: string; name: string; type?: string; autoComplete: string; placeholder: string; required?: boolean; minLength?: number }) {
  const { label, ...inputProps } = props;
  return (
    <label className="auth-field">
      <span>{label}</span>
      <input {...inputProps} />
    </label>
  );
}
