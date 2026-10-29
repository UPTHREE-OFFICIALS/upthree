"use client";
import { useEffect } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const reducedMotion = useReducedMotion();
  const logo = useAnimationControls();
  const branding = useAnimationControls();

  useEffect(() => {
    let cancelled = false;
    const finalX = window.innerWidth < 640 ? -64 : Math.min(window.innerWidth * 0.22, 320);

    const playEntrance = async () => {
      if (reducedMotion) {
        logo.set({ opacity: 1, scale: 1, x: finalX });
        await branding.start("visible");
        return;
      }

      await logo.start({ opacity: 1, scale: 1.55, transition: { duration: 1.8, ease: EASE } });
      if (cancelled) return;
      await logo.start({ scale: 1.2, transition: { duration: 0.4, ease: EASE } });
      if (cancelled) return;
      await new Promise((resolve) => window.setTimeout(resolve, 2000));
      if (cancelled) return;
      await logo.start({ x: finalX, transition: { duration: 1.05, ease: EASE } });
      if (cancelled) return;
      await branding.start("visible");
    };

    void playEntrance();
    return () => {
      cancelled = true;
    };
  }, [branding, logo, reducedMotion]);

  return (
    <section id="home" className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
      <div aria-hidden className="absolute -right-32 -top-32 z-0 h-[28rem] w-[28rem] rounded-full bg-soft blur-3xl" />

      {/* Centered logo zooms in first, then shifts right to frame the brand introduction. */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[50%] z-0 -translate-x-1/2 -translate-y-1/2 sm:top-1/2">
        <motion.img
          src="/upthree-transparent-4k.png"
          alt=""
          draggable={false}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.16, x: 0 }}
          animate={logo}
          className="block h-auto w-[min(75vw,300px)] select-none object-contain opacity-20 sm:w-[min(110vw,1000px)] sm:opacity-100"
          fetchPriority="high"
        />
      </div>

      {/* Gradient veil keeps the left-side copy readable over the moving logo. */}
      <div aria-hidden className="absolute inset-0 z-0 bg-gradient-to-r from-smoke/70 via-smoke/35 to-smoke/20 sm:from-smoke/90 sm:via-smoke/55 sm:to-smoke/10" />

      <motion.div
        initial="hidden"
        animate={branding}
        variants={{ hidden: {}, visible: { transition: { delayChildren: 0.15, staggerChildren: 0.13 } } }}
        className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20 sm:py-24"
      >
        <div className="max-w-2xl">
          <motion.p variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }} className="text-sm font-semibold tracking-[0.24em] text-brand">BRAND &amp; DIGITAL STUDIO</motion.p>
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }} className="mt-5"><img src="/logo.png" alt="UPTHREE — Design, Build, Manage" className="h-auto w-56 object-contain sm:w-72" /></motion.div>
          <motion.p variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }} className="mt-6 max-w-xl text-lg leading-8 text-mute">We shape distinctive identities and build thoughtful digital experiences that help businesses move forward.</motion.p>
          <motion.a variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }} href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-medium text-white shadow-card transition hover:opacity-90">Start a Project <ArrowRight size={16} /></motion.a>
        </div>
      </motion.div>
    </section>
  );
}
