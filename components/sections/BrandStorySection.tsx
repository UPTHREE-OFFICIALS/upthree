"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
const STAGES = [
  ["Design", "Create clear, useful experiences.", "We start with your audience and goals, then shape the structure and look before anything is built."],
  ["Build", "Turn ideas into practical solutions.", "We turn the agreed design into a working, responsive experience and refine it with your feedback."],
  ["Manage", "Maintain and improve solutions over time, as agreed.", "We can keep things updated and improving, according to the support scope we agree together."],
];
export default function BrandStorySection() {
  const ref = useRef<HTMLElement>(null); const reduce = useReducedMotion(); const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const rotateY = useTransform(p, [0, 1], reduce ? [0, 0] : [-14, 14]);
  const scale = useTransform(p, [0, 0.5, 1], reduce ? [1, 1, 1] : [0.92, 1.05, 0.96]);
  const glow = useTransform(p, [0, 1], [0.35, 0.95]); const barW = useTransform(p, [0, 1], ["0%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setI(Math.min(STAGES.length - 1, Math.max(0, Math.floor(v * STAGES.length)))));
  return <section id="story" ref={ref} className="relative h-[300vh]">
    <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden">
      <motion.div aria-hidden style={{ opacity: glow }} className="absolute left-0 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-brand/25 blur-3xl" />
      <div className="relative mx-auto grid h-full max-w-6xl items-center gap-4 px-4 lg:grid-cols-2 lg:gap-12">
        <div className="flex justify-center" style={{ perspective: 1200 }}>
          <motion.div style={{ rotateY, scale }}><Image src="/upthree-transparent-4k.png" alt="UPTHREE logo" width={1460} height={1077} className="h-auto w-[min(60vw,240px)] drop-shadow-[0_28px_28px_rgba(120,40,0,.35)] sm:w-[min(80vw,440px)] lg:w-[min(46vw,560px)]" /></motion.div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">About UPTHREE</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-4xl">Technology should make life easier.</h2>
          <p className="mt-3 max-w-md text-sm text-mute sm:text-base">UPTHREE is a digital solutions startup helping businesses improve their presence, simplify processes and serve customers better.</p>
          <div className="mt-6 flex gap-5 text-xs font-semibold tracking-[0.18em]" aria-hidden>{STAGES.map(([n], k) => <span key={n} className={k === i ? "text-brand" : "text-mute"}>{n.toUpperCase()}</span>)}</div>
          <div className="mt-2 h-0.5 w-full max-w-md bg-line"><motion.div style={{ width: barW }} className="h-full bg-brand" /></div>
          <div className="mt-5 min-h-32 max-w-md" aria-live="polite"><AnimatePresence mode="wait"><motion.div key={i} initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <h3 className="text-3xl font-semibold text-brand sm:text-4xl">{STAGES[i][0]}.</h3><p className="mt-2 font-medium">{STAGES[i][1]}</p><p className="mt-2 text-sm text-mute">{STAGES[i][2]}</p></motion.div></AnimatePresence></div>
        </div>
      </div>
    </div></section>;
}
