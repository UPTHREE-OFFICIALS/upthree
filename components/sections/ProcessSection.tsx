"use client";
import { useScrollSteps } from "@/lib/useScrollSteps";
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
  const { ref, active, goTo: setActive } = useScrollSteps(PROCESS.length);
  const reducedMotion = useReducedMotion();
  const [title] = PROCESS[active];
  return (
    <section id="how" ref={ref} className="lg:h-[260vh]">
      <div className="mx-auto flex max-w-6xl flex-col justify-center px-4 py-16 sm:py-20 lg:sticky lg:top-16 lg:h-[calc(100svh-4rem)] lg:py-4">
        <div className="mb-4 w-full max-w-2xl lg:mb-3">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand sm:text-sm">How we work</p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">A clear path from first idea to launch.</h2>
          <p className="mt-1.5 text-xs text-mute sm:text-sm">You stay part of the process, with clear decisions at each step.</p>
        </div>
        <div className="grid w-full gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6">
          <div role="tablist" aria-label="Project steps" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {PROCESS.map(([name], index) => (
              <button
                key={name}
                type="button"
                role="tab"
                id={`process-tab-${index}`}
                aria-selected={active === index}
                aria-controls="process-panel"
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  const nextIndex = event.key === "ArrowRight" ? (index + 1) % PROCESS.length : event.key === "ArrowLeft" ? (index - 1 + PROCESS.length) % PROCESS.length : -1;
                  if (nextIndex >= 0) {
                    event.preventDefault();
                    setActive(nextIndex);
                    document.getElementById(`process-tab-${nextIndex}`)?.focus();
                  }
                }}
                className={`flex items-center gap-3.5 rounded-xl border p-3 sm:p-3.5 text-left transition ${active === index ? "border-brand bg-soft" : "border-line bg-surface hover:border-brand/50"}`}
              >
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold ${active === index ? "bg-brand text-white" : "bg-smoke text-mute"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{name}</span>
                  <span className="mt-0.5 block text-xs text-mute">{PROCESS[index][1]}</span>
                </span>
              </button>
            ))}
          </div>
          <div id="process-panel" role="tabpanel" aria-labelledby={`process-tab-${active}`} className="flex min-h-[240px] flex-col justify-between rounded-2xl bg-deep p-5 text-white sm:p-6 lg:p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-brand sm:text-sm">Step {String(active + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">{title}</h3>
                <p className="mt-2 max-w-lg text-xs leading-relaxed text-white/65 sm:text-sm">{stepDetails[active]}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-3.5 text-xs sm:text-sm">
              <span className="text-white/45">{active + 1} of {PROCESS.length}</span>
              {active < PROCESS.length - 1 && (
                <button type="button" onClick={() => setActive(active + 1)} className="inline-flex items-center gap-1.5 font-medium text-white hover:text-brand">
                  Next step <ArrowRight size={15} />
                </button>
              )}
              {active === PROCESS.length - 1 && (
                <a href="#contact" className="inline-flex items-center gap-1.5 font-medium text-white hover:text-brand">
                  Start a conversation <ArrowRight size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
