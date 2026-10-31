import Link from "next/link";
import { ArrowRight, ArrowUp, Mail, Phone } from "lucide-react";
import { SERVICES, SITE } from "@/lib/constants";

const NAVL = [
  ["/#home", "Home"],
  ["/#work", "Concepts"],
  ["/#services", "Services"],
  ["/#how", "Process"],
  ["/projects", "Projects"],
  ["/#faq", "FAQ"],
  ["/#contact", "Contact"],
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-deep text-white">
      <div aria-hidden className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 pt-16">
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-12 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">Let&apos;s talk</p>
            <h2 className="mt-3 max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">Let&apos;s build something that works.</h2>
          </div>
          <Link href="/#contact" className="inline-flex w-fit items-center gap-2 rounded-full bg-brand px-6 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:opacity-90">
            Start a Project <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-xl font-semibold tracking-[0.25em]">UPTHREE</p>
            <p className="mt-2 text-xs font-semibold tracking-[0.3em] text-brand">DESIGN | BUILD | MANAGE</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">A digital solutions startup helping businesses improve their presence, simplify processes and serve customers better.</p>
          </div>
          <nav aria-label="Footer">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {NAVL.map(([h, l]) => (
                <li key={l}>
                  <Link href={h} className="text-white/75 transition hover:text-brand">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">Services</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.name}>
                  <Link href="/services" className="text-white/75 transition hover:text-brand">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 transition hover:text-brand">
                  <Mail size={15} className="text-brand" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-brand" />
                {SITE.phone}
              </li>
            </ul>
            <p className="mt-5 flex gap-4 text-sm">
              {SITE.social.map((s) => (
                <a key={s.label} href={s.href} className="text-white/75 transition hover:text-brand">
                  {s.label}
                </a>
              ))}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} UPTHREE. All rights reserved.</p>
          <Link href="/#home" className="inline-flex items-center gap-2 transition hover:text-brand">
            Back to top <ArrowUp size={14} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
