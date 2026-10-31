"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const STAGES = [
  ["Design", "Create clear, useful experiences.", "We start with your audience and goals, then shape the structure and look before anything is built."],
  ["Build", "Turn ideas into practical solutions.", "We turn the agreed design into a working, responsive experience and refine it with your feedback."],
  ["Manage", "Maintain and improve solutions over time, as agreed.", "We can keep things updated and improving, according to the support scope we agree together."],
];

function Reveal({ p, at, children, className }: { p: MotionValue<number>; at: number; children: React.ReactNode; className?: string }) {
  const opacity = useTransform(p, [at, at + 0.08], [0, 1]); const y = useTransform(p, [at, at + 0.08], [24, 0]);
  return <motion.div style={{ opacity, y }} className={className}>{children}</motion.div>;
}

// One pinned timeline: the logo rises on load; scrolling slides it left while the About copy and Design → Build → Manage stages play on the right.
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null); const reduce = !!useReducedMotion(); const [wide, setWide] = useState(true); const [stage, setStage] = useState(0);
  useEffect(() => { const m = window.matchMedia("(min-width:1024px)"); const f = () => setWide(m.matches); f(); m.addEventListener("change", f); return () => m.removeEventListener("change", f); }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });
  useMotionValueEvent(scrollYProgress, "change", (v) => setStage(Math.min(2, Math.max(0, Math.floor(((v - 0.45) / 0.5) * 3)))));
  const R = <T,>(a: T, b: T): T[] => (reduce ? [b, b] : [a, b]);
  const x = useTransform(p, [0, 0.3], R("0vw", wide ? "-24vw" : "0vw"));
  const y = useTransform(p, [0, 0.3], R("0svh", wide ? "0svh" : "-27svh"));
  const scale = useTransform(p, [0, 0.3], R(1, wide ? 0.62 : 0.48));
  const veil = useTransform(p, [0, 0.3], R(1, 0));
  const glow = useTransform(p, [0, 0.3], R(0.9, 0.5));
  const bar = useTransform(p, [0.45, 0.95], R("0%", "100%"));
  const at = (n: number) => (reduce ? -1 : n);
  const shown = reduce ? STAGES : [STAGES[stage]];
  return <section id="home" ref={ref} className={reduce ? "min-h-[calc(100svh-4rem)]" : "h-[280vh]"}>
    <h1 className="sr-only">UPTHREE — Design. Build. Manage.</h1>
    <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden">
      <motion.div aria-hidden style={{ opacity: veil }} className="absolute inset-0 bg-[#09090b]" />
      <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
        <motion.div initial={reduce ? false : { y: "110svh" }} animate={{ y: 0 }} transition={{ duration: 1.8, ease: EASE }}>
          <motion.div style={{ x, y, scale }} className="relative">
            <motion.div aria-hidden style={{ opacity: glow }} className="absolute inset-[8%] -z-10 rounded-full bg-brand/30 blur-3xl" />
            <Image src="/upthree-transparent-4k.png" alt="UPTHREE — Design, Build, Manage" width={1460} height={1077} priority className="h-auto w-[min(80vw,820px)] drop-shadow-[0_24px_40px_rgba(255,112,18,.25)]" />
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute inset-0 z-20 mx-auto flex max-w-6xl items-end px-4 pb-6 lg:items-center lg:justify-end lg:pb-0">
        <div className="w-full lg:w-[46%]">
          <Reveal p={p} at={at(0.26)}>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">About UPTHREE</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-4xl">Technology should make life easier.</h2>
            <p className="mt-3 text-sm text-mute sm:text-base">UPTHREE is a digital solutions startup helping businesses improve their presence, simplify processes and serve customers better.</p>
          </Reveal>
          <Reveal p={p} at={at(0.38)} className="mt-5">
            <div className="flex gap-5 text-xs font-semibold tracking-[0.18em]" aria-hidden>{STAGES.map(([n], k) => <span key={n} className={k === stage || reduce ? "text-brand" : "text-mute"}>{n.toUpperCase()}</span>)}</div>
            <div className="mt-2 h-0.5 w-full bg-line"><motion.div style={{ width: bar }} className="h-full bg-brand" /></div>
            <div className="mt-4 min-h-36" aria-live="polite"><AnimatePresence mode="wait">{shown.map(([n, t, d]) => <motion.div key={n} initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className={reduce ? "mb-4" : ""}>
              <h3 className="text-3xl font-semibold text-brand sm:text-4xl">{n}.</h3><p className="mt-1 font-medium">{t}</p><p className="mt-1 text-sm text-mute">{d}</p></motion.div>)}</AnimatePresence></div>
          </Reveal>
          <Reveal p={p} at={at(0.88)} className="mt-2 flex flex-wrap items-center gap-4">
            <a href="#contact" className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-medium text-white shadow-card transition hover:-translate-y-0.5 hover:opacity-90">Start a Project <ArrowRight size={16} /></a>
            <a href="/projects" className="pointer-events-auto text-sm font-medium text-mute hover:text-brand">View projects</a>
          </Reveal>
        </div>
      </div>
    </div></section>;
}
