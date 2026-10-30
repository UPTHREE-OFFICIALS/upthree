"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, LoaderCircle, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

const LOGIN_STYLE = "fixed inset-0 z-50 flex items-center justify-center bg-[#090a0c]/95 p-4";

const fields = [
  { id: "username", label: "Username", value: "admin", type: "text", placeholder: "admin", autoComplete: "username", icon: Mail, readOnly: true },
  { id: "password", label: "Password", value: "", type: "password", placeholder: "Enter password", autoComplete: "current-password", icon: Lock, readOnly: false },
] as const;

export default function AdminLoginPage() {
  const reduce = !!useReducedMotion();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
      const stored = window.localStorage.getItem("upthree_admin_logged_in");
      if (stored === "1") window.location.href = "/admin/dashboard";
    }
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = String(new FormData(event.currentTarget).get("password") ?? "").trim();
    setError(null);
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "admin", password }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error ?? "Invalid credentials.");
        return;
      }
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem("upthree_admin_logged_in", "1");
      }
      window.location.href = "/admin/dashboard";
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (      <div className={LOGIN_STYLE}>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="mb-8 flex items-center gap-4">
          <Link href="/#home" className="flex items-center gap-3 text-white/80 transition hover:text-white">
            <Image src="/logo.png" alt="UPTHREE" width={44} height={44} className="h-10 w-auto" />
            <span className="text-lg font-bold tracking-[0.18em]">UPTHREE</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-line bg-surface/95 p-6 shadow-card backdrop-blur">
          <h1 className="text-2xl font-bold tracking-tight text-ink">Sign in to Admin</h1>
          <p className="mt-1 text-sm text-mute">Enter your credentials to access the control panel.</p>

          {error && <p role="alert" className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm font-medium text-red-600">{error}</p>}

          <form onSubmit={submit} className="mt-6 space-y-4">
            {fields.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.id}>
                  <label htmlFor={f.id} className="flex items-center gap-2 text-xs font-semibold text-ink/70">
                    <Icon size={15} className="text-brand" />
                    {f.label}
                    {f.readOnly && <span className="ml-auto text-[11px] font-normal text-mute">fixed</span>}
                  </label>
                  <div className="relative mt-1">
                    <input
                      id={f.id}
                      name={f.id}
                      defaultValue={f.value}
                      type={showPassword && !f.readOnly ? "text" : f.type}
                      autoComplete={f.autoComplete}
                      disabled={f.readOnly}
                      className={`w-full rounded-lg border border-line bg-smoke/70 px-3.5 py-2.5 pr-10 text-sm outline-none transition placeholder:text-mute/60 focus:border-brand focus:bg-surface focus:ring-2 focus:ring-brand/10 ${f.readOnly ? "bg-soft text-mute cursor-not-allowed" : ""}`}
                      readOnly={f.readOnly}
                      required={!f.readOnly}
                      aria-readonly={f.readOnly}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => (f.id === "password" ? !showPassword : v))}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-1 top-1/2 -translate-y-1/2 rounded p-1 text-mute hover:text-ink transition"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              );
            })}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-medium text-white shadow-card transition hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>Sign in <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-mute">
            Demo access only — no account registration available.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
