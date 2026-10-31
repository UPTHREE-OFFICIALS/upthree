"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";

const LINKS = [
  ["home", "Home"],
  ["services", "Services"],
  ["work", "Concepts"],
  ["how", "Process"],
  ["contact", "Contact"],
] as const;

const SECTION_LABELS: Record<string, string> = {
  home: "Home",
  work: "Concepts",
  services: "Services",
  how: "Process",
  contact: "Contact",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    LINKS.forEach(([id]) => {
      const el = document.getElementById(id);
      el && io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  function toggle() {
    const d = !dark;
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
    try {
      localStorage.setItem("theme", d ? "dark" : "light");
    } catch {}
  }

  const link = (id: string, l: string) => (
    <Link
      key={id}
      href={`/#${id}`}
      onClick={() => setOpen(false)}
      aria-current={active === id ? "true" : undefined}
      className={`rounded-full px-3 py-2 text-sm ${active === id ? "bg-soft text-brand" : "text-mute hover:text-ink"}`}
    >
      {SECTION_LABELS[id] ?? l}
    </Link>
  );

  const theme = (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface"
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-line bg-smoke/85 backdrop-blur">
      <nav
        className="mx-auto flex h-full max-w-6xl items-center justify-between px-4"
        aria-label="Main"
      >
        <Link href="/#home" aria-label="UPTHREE home">
          <Image
            src="/logo.png"
            alt="UPTHREE"
            width={120}
            height={88}
            priority
            className="h-11 w-auto"
          />
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map(([i, l]) => link(i, l))}
          <Link
            href="/projects"
            className="rounded-full px-3 py-2 text-sm text-mute hover:text-ink"
          >
            Projects
          </Link>
          <Link
            href="/#contact"
            className="ml-2 rounded-full bg-brand px-5 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Start a Project
          </Link>
          <Link
            href="/services"
            className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium"
          >
            All Services
          </Link>
          {theme}
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          {theme}
          <button
            className="p-2"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-0 top-16 border-b border-line bg-surface lg:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {LINKS.map(([i, l]) => link(i, l))}
              <Link href="/projects" onClick={() => setOpen(false)} className="px-3 py-2 text-sm text-mute">
                Projects
              </Link>
              <Link href="/services" onClick={() => setOpen(false)} className="px-3 py-2 text-sm text-mute">
                All Services
              </Link>
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-brand px-5 py-3 text-center font-medium text-white"
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
