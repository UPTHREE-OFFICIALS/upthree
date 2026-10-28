"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, BarChart3, Globe } from "lucide-react";
export default function HeroSection() {
  const reducedMotion = useReducedMotion();
  return <section id="home" className="relative overflow-hidden">
    <motion.div aria-hidden className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-soft blur-3xl" animate={reducedMotion ? undefined : { scale: [1, 1.12, 1] }} transition={{ duration: 12, repeat: Infinity }} />
    <motion.img
      src="/upthree-transparent-4k.png"
      alt=""
      aria-hidden="true"
      draggable={false}
      initial={reducedMotion ? false : { opacity: 0, y: 140 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, delay: 2, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute -bottom-8 left-1/2 z-[-1] w-[min(92%,560px)] -translate-x-1/2 select-none lg:left-auto lg:right-[-2%] lg:w-[640px] lg:translate-x-0"
    />
    <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 lg:grid-cols-2 lg:py-28">
      <motion.div initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <a href="#home" aria-label="UPTHREE home" className="inline-block text-2xl font-bold tracking-[0.18em] text-ink">UPTHREE<span className="text-brand">.</span></a>
        <p className="mb-4 mt-5 text-sm font-semibold tracking-widest text-brand">WEB DEVELOPMENT STUDIO</p>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Websites built to move your business forward.</h1>
        <p className="mt-6 max-w-lg text-lg text-mute">We design and develop thoughtful websites and digital tools that make it easier for your customers to choose you.</p>
        <div className="mt-8 flex flex-wrap gap-3"><a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-medium text-white shadow-card hover:opacity-90">Let&apos;s Talk About Your Project <ArrowRight size={16} /></a><a href="#work" className="rounded-full border border-line bg-surface px-6 py-3 font-medium hover:border-brand">Explore Concept Demos</a></div>
        <p className="mt-6 text-sm text-mute">A good project starts with a conversation.</p>
      </motion.div>
      <motion.div aria-hidden initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative mx-auto w-full max-w-md">
        <div className="rounded-2xl border border-line bg-surface p-4 shadow-card"><div className="mb-3 flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-line" />)}</div>
          <div className="h-24 rounded-xl bg-soft p-4"><div className="h-3 w-2/3 rounded bg-brand/70" /><div className="mt-3 h-2 w-1/2 rounded bg-brand/30" /></div>
          <div className="mt-3 grid grid-cols-3 gap-3">{[28, 56, 40].map((h, i) => <div key={i} className="flex h-20 items-end rounded-lg bg-smoke p-2"><div style={{ height: `${h}%` }} className="w-full rounded bg-brand/60" /></div>)}</div></div>
        <motion.div animate={reducedMotion ? undefined : { y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -left-2 top-10 flex items-center gap-2 rounded-xl border border-line bg-surface p-3 text-xs shadow-card"><Calendar size={16} className="text-brand" />Booking request</motion.div>
        <motion.div animate={reducedMotion ? undefined : { y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -right-2 bottom-12 flex items-center gap-2 rounded-xl bg-sky p-3 text-xs shadow-card"><BarChart3 size={16} className="text-azure" />Overview</motion.div>
        <motion.div animate={reducedMotion ? undefined : { y: [0, -6, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute -bottom-4 left-10 flex items-center gap-2 rounded-xl border border-line bg-surface p-3 text-xs shadow-card"><Globe size={16} className="text-brand" />Business page</motion.div>
      </motion.div></div></section>;
}
