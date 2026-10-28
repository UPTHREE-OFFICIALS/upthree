"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
export default function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && onClose(); document.addEventListener("keydown", k); return () => document.removeEventListener("keydown", k); }, [onClose]);
  return <AnimatePresence>{open && <motion.div className="fixed inset-0 z-50 grid place-items-center bg-deep/50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
    <motion.div role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="relative max-h-[90vh] w-full max-w-lg overflow-auto rounded-2xl bg-surface p-6 shadow-card">
      <button aria-label="Close" onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 hover:bg-smoke"><X size={18} /></button>{children}</motion.div></motion.div>}</AnimatePresence>;
}
