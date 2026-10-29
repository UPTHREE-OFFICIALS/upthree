"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { NAV } from "@/lib/constants";

// The FAQ lives at the bottom of the home page; it is intentionally not shown as a header tab.
const HEADER_NAV = NAV.filter(([id]) => id !== "faq");

export default function Navbar() {
  const [open, setOpen] = useState(false); const [active, setActive] = useState("home");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("upthree-theme");
    const initialTheme = savedTheme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = initialTheme;
    setTheme(initialTheme);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-40% 0px -55% 0px" });
    HEADER_NAV.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el); }); return () => io.disconnect();
  }, []);
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("upthree-theme", nextTheme);
    setTheme(nextTheme);
  };
  const link = (id: string, l: string) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} aria-current={active === id ? "true" : undefined} className={`rounded-full px-3 py-2 text-sm ${active === id ? "bg-soft text-brand" : "text-mute hover:text-ink"}`}>{l}</a>;
  return <header className="sticky top-0 z-40 border-b border-line bg-smoke/90 backdrop-blur">
    <nav className="mx-auto flex h-16 max-w-6xl items-center px-4" aria-label="Main">
      <a href="#home" aria-label="UPTHREE home" className="inline-flex shrink-0 items-center"><img src="/logo.png" alt="UPTHREE — Design, Build, Manage" className="h-12 w-auto object-contain sm:h-14" /></a>
      <div className="ml-auto flex items-center">
        <div className="hidden items-center lg:flex">{HEADER_NAV.map(([i, l]) => link(i, l))}<a href="#contact" className="ml-2 rounded-full bg-brand px-5 py-2 text-sm font-medium text-white hover:opacity-90">Start a Project</a><a href="/services" className="ml-2 rounded-full border border-line px-5 py-2 text-sm font-medium text-ink hover:border-brand hover:text-brand">All Services</a></div>
        <button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink transition hover:border-brand hover:text-brand"><span className="sr-only">{theme === "dark" ? "Light mode" : "Dark mode"}</span>{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button>
        <button className="p-2 lg:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </nav>
    <AnimatePresence>{open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-line bg-surface lg:hidden"><div className="flex flex-col gap-1 p-4">{HEADER_NAV.map(([i, l]) => link(i, l))}<a href="/services" onClick={() => setOpen(false)} className="mt-2 rounded-full border border-line px-5 py-3 text-center font-medium">All Services</a><a href="#contact" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-brand px-5 py-3 text-center font-medium text-white">Start a Project</a></div></motion.div>}</AnimatePresence>
  </header>;
}