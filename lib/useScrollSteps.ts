import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
// Scroll-driven stepper: on large screens the section is pinned and scrolling advances `active`.
// On small screens / reduced motion it falls back to plain click-driven state. goTo(i) works in both modes.
export function useScrollSteps(count: number) {
  const ref = useRef<HTMLElement>(null); const reduce = useReducedMotion();
  const [wide, setWide] = useState(false); const [active, setActive] = useState(0);
  useEffect(() => { const m = window.matchMedia("(min-width:1024px)"); const f = () => setWide(m.matches); f(); m.addEventListener("change", f); return () => m.removeEventListener("change", f); }, []);
  const scrub = wide && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => { if (scrub) setActive(Math.min(count - 1, Math.max(0, Math.floor(v * count)))); });
  const goTo = (i: number) => {
    const el = ref.current; const n = Math.min(count - 1, Math.max(0, i));
    if (!scrub || !el) { setActive(n); return; }
    const top = el.getBoundingClientRect().top + window.scrollY; const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((n + 0.5) / count), behavior: "smooth" });
  };
  return { ref, active, goTo, scrub };
}
