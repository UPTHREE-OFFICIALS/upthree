"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PROCESS } from "@/lib/constants";

const stepDetails = [
  "We start by listening. What does your business do, who do you want to reach, and what should the website help them accomplish?",
  "We turn the conversation into a clear plan: the pages, content, features and visual direction that fit the goal.",
  "We bring the plan to life, share progress as we go, and refine the details with your feedback.",
  "We prepare the site for launch, walk you through the result, and can discuss ongoing improvements if you need them.",
];

export default function ProcessSection() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const [title] = PROCESS[active];
  return <section id="how" className="mx-auto max-w-6xl px-4 py-20">
    <div className="mb-12 max-w-2xl"><p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">How we work</p><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">A clear path from first idea to launch.</h2><p className="mt-4 text-mute">You stay part of the process, with clear decisions at each step.</p></div>
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div role="tablist" aria-label="Project steps" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {PROCESS.map(([name], index) => <button key={name} type="button" role="tab" id={`process-tab-${index}`} aria-selected={active === index} aria-controls="process-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => { const nextIndex = event.key === "ArrowRight" ? (index + 1) % PROCESS.length : event.key === "ArrowLeft" ? (index - 1 + PROCESS.length) % PROCESS.length : -1; if (nextIndex >= 0) { event.preventDefault(); setActive(nextIndex); document.getElementById(`process-tab-${nextIndex}`)?.focus(); } }} className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${active === index ? "border-brand bg-soft" : "border-line bg-surface hover:border-brand/50"}`}>
          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-semibold ${active === index ? "bg-brand text-white" : "bg-smoke text-mute"}`}>{String(index + 1).padStart(2, "0")}</span>
          <span><span className="block font-semibold">{name}</span><span className="mt-1 block text-sm text-mute">{PROCESS[index][1]}</span></span>
        </button>)}
      </div>
      <div id="process-panel" role="tabpanel" aria-labelledby={`process-tab-${active}`} className="flex min-h-64 flex-col justify-between rounded-2xl bg-deep p-7 text-white sm:p-10">
        <AnimatePresence mode="wait"><motion.div key={active} initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">Step {String(active + 1).padStart(2, "0")}</p>
          <h3 className="mt-4 text-3xl font-semibold">{title}</h3>
          <p className="mt-4 max-w-lg leading-7 text-white/65">{stepDetails[active]}</p>
        </motion.div></AnimatePresence>
        <div className="mt-8 flex items-center justify-between border-t border-white/15 pt-5">
          <span className="text-sm text-white/45">{active + 1} of {PROCESS.length}</span>
          {active < PROCESS.length - 1 && <button type="button" onClick={() => setActive((step) => step + 1)} className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-brand">Next step <ArrowRight size={16} /></button>}
          {active === PROCESS.length - 1 && <a href="#contact" className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-brand">Start a conversation <ArrowRight size={16} /></a>}
        </div>
      </div>
    </div>
  </section>;
}
