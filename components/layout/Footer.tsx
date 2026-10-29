import { NAV, SITE } from "@/lib/constants";
export default function Footer() {
  return <footer className="border-t border-line bg-surface"><div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
    <div><a href="#home" aria-label="UPTHREE home" className="inline-flex"><img src="/logo.png" alt="UPTHREE — Design, Build, Manage" className="h-auto w-32 object-contain" /></a><p className="mt-3 font-medium text-brand">Design. Build. Manage.</p><p className="mt-2 text-sm text-mute">Websites and digital tools, designed around how your business works.</p></div>
    <nav aria-label="Footer" className="grid gap-2 text-sm text-mute">{NAV.map(([i, l]) => <a key={i} href={`#${i}`} className="hover:text-brand">{l}</a>)}</nav>
    <div className="text-sm text-mute"><p>{SITE.email}</p><p>{SITE.phone}</p><div className="mt-3 flex gap-4">{SITE.social.map((s) => <a key={s.label} href={s.href} className="hover:text-brand">{s.label}</a>)}</div></div>
  </div><p className="border-t border-line py-5 text-center text-xs text-mute">© {new Date().getFullYear()} UPTHREE. All rights reserved.</p></footer>;
}
