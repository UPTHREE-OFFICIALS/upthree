import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">404 Error</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-sm text-mute sm:text-base">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/#home"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white shadow-card transition hover:-translate-y-0.5 hover:opacity-90"
      >
        <ArrowLeft size={16} /> Back to Home
      </Link>
    </main>
  );
}
