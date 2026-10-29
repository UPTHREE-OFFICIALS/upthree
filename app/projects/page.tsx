"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
const PER = 9; const PAGES = Math.ceil(PROJECTS.length / PER);
export default function ProjectsPage() {
  const [page, setPage] = useState(0); const top = useRef<HTMLDivElement>(null); const reduce = useReducedMotion();
  const go = (n: number) => { setPage(n); top.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); };
  const items = PROJECTS.slice(page * PER, page * PER + PER);
  return <main className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:py-20">
    <div ref={top} className="scroll-mt-24"><p className="text-sm font-semibold uppercase tracking-widest text-brand">Projects</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Ideas turned into digital experiences.</h1>
      <p className="mt-3 max-w-xl text-mute">Illustrative concept projects showing what we can design and build. They are samples, not completed client work.</p></div>
    <AnimatePresence mode="wait"><motion.ul key={page} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.3 }} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => <li key={p.id} className="group overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-1 hover:shadow-card">
        <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.g} p-4`} aria-hidden><div className="h-full rounded-lg bg-white/70 p-3 transition group-hover:scale-[1.03]"><div className="h-2 w-1/3 rounded bg-brand/70" /><div className="mt-3 h-8 rounded bg-black/5" /><div className="mt-3 grid grid-cols-3 gap-2"><i className="h-10 rounded bg-black/5" /><i className="h-10 rounded bg-black/5" /><i className="h-10 rounded bg-brand/30" /></div></div></div>
        <div className="flex items-center justify-between gap-3 p-4"><div><h2 className="font-semibold">{p.name}</h2><p className="text-sm text-mute">{p.cat}</p></div><span className="shrink-0 rounded-full bg-soft px-2.5 py-1 text-[10px] font-semibold text-brand">CONCEPT</span></div></li>)}
    </motion.ul></AnimatePresence>
    <nav aria-label="Projects pagination" className="mt-10 flex items-center justify-between">
      <button onClick={() => go(page - 1)} disabled={page === 0} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium transition hover:border-brand disabled:cursor-not-allowed disabled:opacity-40"><ArrowLeft size={16} />Previous</button>
      <span className="text-sm text-mute" aria-live="polite">Page {page + 1} of {PAGES}</span>
      <button onClick={() => go(page + 1)} disabled={page === PAGES - 1} className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">Next<ArrowRight size={16} /></button>
    </nav></main>;
}
