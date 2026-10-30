"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, Mail, MapPin, Phone } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { SERVICES, SITE } from "@/lib/constants";

type InquiryField = "name" | "businessName" | "email" | "service" | "message";
type Errors = Partial<Record<InquiryField, string>>;

const inputClass = "mt-1.5 w-full rounded-lg border border-line bg-smoke/70 px-3.5 py-2.5 text-sm outline-none transition placeholder:text-mute/60 focus:border-brand focus:bg-surface focus:ring-2 focus:ring-brand/10";
type ContactValues = { name: string; businessName: string; email: string; service: string; message: string };
const empty = { name: "", businessName: "", email: "", service: SERVICES[0].name, message: "" };

export default function ContactSection() {
  const [values, setValues] = useState<ContactValues>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ kind: "success" | "error"; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function update(field: InquiryField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus(null);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors = {};
    if (!values.name.trim()) nextErrors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) nextErrors.email = "Enter a valid email address.";
    if (values.message.trim().length < 10) nextErrors.message = "Add a few details (at least 10 characters).";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setStatus(null);
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: values.name.trim(), businessName: values.businessName.trim(), email: values.email.trim(), service: values.service, message: values.message.trim() }),
      });
      const result = await response.json();
      if (!response.ok) {
        setStatus({ kind: "error", message: result.error ?? "We couldn't send your inquiry. Please try again." });
        return;
      }
      setStatus({ kind: "success", message: result.message ?? "Thanks! Your project inquiry has been received." });
    } catch {
      setStatus({ kind: "error", message: "We couldn't connect just now. Please try again in a moment." });
    } finally {
      setSubmitting(false);
    }
  }

  const field = (id: "name" | "businessName" | "email", label: string, placeholder: string, type = "text") => (
    <label htmlFor={`inquiry-${id}`} className="block text-xs font-semibold text-ink/80">
      {label}
      <input id={`inquiry-${id}`} name={id} type={type} autoComplete={id === "businessName" ? "organization" : id} value={values[id]} onChange={(event) => update(id, event.target.value)} placeholder={placeholder} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `error-${id}` : undefined} className={inputClass} />
      {errors[id] && <span id={`error-${id}`} role="alert" className="mt-1 block text-xs font-normal text-red-600">{errors[id]}</span>}
    </label>
  );

  return (
    <section id="contact" className="bg-surface py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <SectionHeading kicker="Start a conversation" title="Tell us what you have in mind." sub="Share a little about your project. We’ll get back to you to discuss what makes sense." />
          <div className="mt-8 space-y-3 border-t border-line pt-5 text-sm text-mute">
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 transition hover:text-brand"><Mail size={16} className="text-brand" />{SITE.email}</a>
            <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-3 transition hover:text-brand"><Phone size={16} className="text-brand" />{SITE.phone}</a>
            <p className="flex items-center gap-3"><MapPin size={16} className="text-brand" />Working with businesses wherever they are</p>
          </div>
        </div>

        <form onSubmit={submit} noValidate aria-label="Project inquiry" className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-7">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div><h3 className="font-semibold">Project inquiry</h3><p className="mt-1 text-xs text-mute">Fill out the fields below—nothing is saved or sent yet.</p></div>
            <span className="shrink-0 rounded-full bg-soft px-2.5 py-1 text-[10px] font-semibold text-brand">EDIT SAMPLE</span>
          </div>
          <div className="grid gap-x-4 gap-y-3.5 sm:grid-cols-2">
            {field("name", "Your name", "e.g. Jordan Lee")}
            {field("businessName", "Business name", "Optional")}
            {field("email", "Email address", "you@company.com", "email")}
            <label htmlFor="inquiry-service" className="block text-xs font-semibold text-ink/80">What do you need?
              <select id="inquiry-service" name="service" value={values.service} onChange={(event) => update("service", event.target.value)} className={inputClass}>{SERVICES.map((service) => <option key={service.name} value={service.name}>{service.name}</option>)}</select>
            </label>
            <label htmlFor="inquiry-message" className="block text-xs font-semibold text-ink/80 sm:col-span-2">A few details about the project
              <textarea id="inquiry-message" name="message" rows={3} maxLength={5000} value={values.message} onChange={(event) => update("message", event.target.value)} placeholder="What would you like your website to help you do?" aria-invalid={!!errors.message} aria-describedby={errors.message ? "error-message" : undefined} className={`${inputClass} resize-y`} />
              {errors.message && <span id="error-message" role="alert" className="mt-1 block text-xs font-normal text-red-600">{errors.message}</span>}
            </label>
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-wait disabled:opacity-70">
              {submitting ? <>Sending <LoaderCircle size={15} className="animate-spin" /></> : <>Send project inquiry <ArrowRight size={15} /></>}
            </button>
            <p className="text-[11px] text-mute">No commitment—just a conversation about your project.</p>
          </div>
          {status && <p role="status" className={`mt-4 flex items-start gap-2 rounded-lg p-3 text-sm ${status.kind === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"}`}>{status.kind === "success" && <CheckCircle2 size={17} className="mt-0.5 shrink-0" />}{status.message}</p>}
        </form>
      </div>
    </section>
  );
}
