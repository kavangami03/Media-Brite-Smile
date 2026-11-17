"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, CalendarCheck, Check, CircleAlert, Phone, Send, UserRound } from "lucide-react";
import { site } from "@/content/site";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Patient = "existing" | "new";

const patientTypes: { id: Patient; title: string; text: string; icon: typeof UserRound }[] = [
  {
    id: "existing",
    title: "Existing Patient",
    text: "Welcome back. Book your next check-up or treatment.",
    icon: CalendarCheck,
  },
  {
    id: "new",
    title: "New Patient",
    text: "Your first visit with us. Uninsured? The New Patient Special is $99.",
    icon: UserRound,
  },
];

const services = [
  { title: "New Patient Exam & Cleaning", text: "For first-time patients: exam, X-rays and a cleaning if needed" },
  { title: "Routine Cleaning & Check-up", text: "For existing patients due for their regular visit" },
  { title: "Emergency Visit", text: "Pain, swelling, a broken tooth, infection and similar" },
  { title: "Treatment Visit", text: "Fillings, crowns, root canals, extractions or a planned procedure" },
  { title: "Consultation / Second Opinion", text: "Dental implants, veneers, Invisalign or whitening" },
  { title: "Other / Not Sure", text: "Tell us a little in the message and we will help" },
];

const field =
  "mt-2 block w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-base text-ink transition-[border-color,box-shadow] outline-none placeholder:text-muted/70 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15";

const Req = () => (
  <span className="text-rose-500" aria-hidden="true">
    *
  </span>
);

/**
 * Appointment request form (id="appointment-form"), two steps:
 * 1. existing or new patient, 2. contact details, services and a message.
 * DEVELOPER: not yet connected to an inbox or CRM. Wire `onSubmit` to the practice's
 * endpoint before launch; until then it tells the visitor nothing was sent and to call.
 * The hidden "company" field is a spam trap: real visitors never see or fill it.
 */
export function AppointmentForm() {
  const reduce = useReducedMotion();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sentName, setSentName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const step = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, y: -12 },
    transition: { duration: 0.4, ease: ease.out },
  };

  function choose(type: Patient) {
    setPatient(type);
    setErrors({});
    /* move focus to the first field once step 2 has rendered */
    requestAnimationFrame(() =>
      setTimeout(() => formRef.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus(), 450),
    );
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (String(data.get("company") ?? "").trim()) return; // spam trap filled: ignore quietly
    const next: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").replace(/\D/g, "");
    const email = String(data.get("email") ?? "").trim();
    if (!name) next.name = "Please tell us your name.";
    if (phone.length < 10) next.phone = "Please enter a phone number we can call back.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Please enter an email address we can reply to.";
    if (data.getAll("service").length === 0) next.service = "Please choose at least one option.";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setSentName(name.split(" ")[0]);
  }

  const chosen = patientTypes.find((p) => p.id === patient);

  return (
    <div className="relative">
      <form id="appointment-form" ref={formRef} noValidate onSubmit={onSubmit}>
        <input type="hidden" name="patient" value={patient ?? ""} />

        <AnimatePresence mode="wait" initial={false}>
          {!chosen ? (
            /* ---------- step 1: existing or new patient ---------- */
            <motion.fieldset key="who" {...step}>
              <legend className="text-base font-semibold text-ink">Are you an existing or new patient?</legend>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                {patientTypes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => choose(t.id)}
                    className="group relative flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-3xl bg-linear-to-b from-brand-50 to-white px-3 pt-7 pb-14 text-center ring-1 ring-brand-100 transition-[box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-lift hover:ring-brand-300 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none sm:min-h-64 sm:px-6"
                  >
                    <span className="grid size-14 place-items-center rounded-2xl bg-brand-600 text-white shadow-glow transition-transform duration-500 group-hover:scale-105 sm:size-16">
                      <t.icon className="size-6 sm:size-7" />
                    </span>
                    <span className="mt-4 text-lg leading-tight font-bold text-ink sm:mt-5 sm:text-2xl">{t.title}</span>
                    <span className="mt-2 hidden max-w-60 text-[0.9375rem] leading-relaxed text-body sm:block">
                      {t.text}
                    </span>
                    <span className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-xl bg-white text-ink ring-1 ring-line transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white group-hover:ring-brand-500 sm:right-4 sm:bottom-4">
                      <ArrowRight className="size-4" />
                    </span>
                  </button>
                ))}
              </div>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-body">
                Dental emergency? Call{" "}
                <a href={site.phone.href} className="font-semibold text-brand-700 underline underline-offset-2">
                  {site.phone.display}
                </a>{" "}
                rather than using this form.
              </p>
            </motion.fieldset>
          ) : (
            /* ---------- step 2: details ---------- */
            <motion.div key="details" {...step} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="col-span-full">
                <span className="inline-flex items-center gap-3 rounded-2xl bg-brand-50 py-2 pr-4 pl-2 ring-1 ring-brand-200">
                  <span className="grid size-9 place-items-center rounded-xl bg-brand-600 text-white">
                    <chosen.icon className="size-4" />
                  </span>
                  <span className="font-semibold text-ink">{chosen.title}</span>
                  <button
                    type="button"
                    onClick={() => setPatient(null)}
                    className="-my-2 inline-flex min-h-11 cursor-pointer items-center font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-600"
                  >
                    Change
                  </button>
                </span>
              </div>

              <label className="block sm:col-span-2 lg:col-span-1">
                <span className="text-sm font-semibold text-ink">
                  Full Name <Req />
                </span>
                <input
                  name="name"
                  autoComplete="name"
                  required
                  className={cn(field, errors.name && "border-rose-400")}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <span className="mt-1.5 block text-sm text-rose-600">{errors.name}</span>}
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-ink">
                  Phone Number <Req />
                </span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  placeholder="(610) 555-0123"
                  className={cn(field, errors.phone && "border-rose-400")}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <span className="mt-1.5 block text-sm text-rose-600">{errors.phone}</span>}
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-ink">
                  Email Address <Req />
                </span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@example.com"
                  className={cn(field, errors.email && "border-rose-400")}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <span className="mt-1.5 block text-sm text-rose-600">{errors.email}</span>}
              </label>

              <fieldset className="col-span-full" aria-invalid={!!errors.service}>
                <legend className="text-sm font-semibold text-ink">
                  Services <Req /> <span className="ml-1 font-normal text-muted">Select all that apply</span>
                </legend>
                <div className="mt-3 grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-3">
                  {services.map((s) => (
                    <label
                      key={s.title}
                      className="group flex cursor-pointer items-start gap-3.5 rounded-2xl bg-white p-4 ring-1 ring-line transition-[box-shadow,background-color] duration-300 hover:ring-brand-300 has-checked:bg-brand-50 has-checked:ring-2 has-checked:ring-brand-500"
                    >
                      <span className="relative mt-0.5 grid size-6 shrink-0 place-items-center">
                        <input
                          type="checkbox"
                          name="service"
                          value={s.title}
                          className="peer size-6 cursor-pointer appearance-none rounded-lg border-2 border-line bg-white transition-colors checked:border-brand-500 checked:bg-brand-500 focus-visible:ring-4 focus-visible:ring-brand-500/20 focus-visible:outline-none"
                        />
                        <Check
                          className="pointer-events-none absolute size-4 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                          strokeWidth={3}
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block leading-snug font-semibold text-ink">{s.title}</span>
                        <span className="mt-0.5 block text-[0.9375rem] leading-snug text-body">{s.text}</span>
                      </span>
                    </label>
                  ))}
                </div>
                {errors.service && <span className="mt-2 block text-sm text-rose-600">{errors.service}</span>}
              </fieldset>

              <label className="col-span-full block">
                <span className="text-sm font-semibold text-ink">Message</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Anything we should know, such as the days and times that suit you"
                  className={cn(field, "resize-y")}
                />
                <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                  Please don&apos;t include medical details. We&apos;ll talk through your health history in person or on
                  the phone.
                </span>
              </label>

              {/* spam trap: off-screen, skipped by keyboard and autofill */}
              <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
                <label>
                  Company
                  <input name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="col-span-full flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <button
                    type="submit"
                    className="inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-500 px-8 font-semibold text-white shadow-glow transition-colors hover:bg-brand-600 sm:w-auto"
                  >
                    <Send className="size-4" /> Request My Appointment
                  </button>
                  <p className="mt-3 text-sm text-muted">
                    See our{" "}
                    <Link
                      href="/patient-information/privacy"
                      className="font-semibold text-brand-700 underline underline-offset-2"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-11 items-center gap-2 self-start font-semibold text-brand-600 sm:self-auto"
                >
                  <Phone className="size-4" /> Or call {site.phone.display}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      <AnimatePresence>
        {sentName && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: ease.out }}
            role="status"
            className="mt-6 flex gap-4 rounded-3xl bg-amber-50 p-5 ring-1 ring-amber-200"
          >
            <CircleAlert className="mt-0.5 size-5 shrink-0 text-amber-600" />
            <p className="text-[0.9375rem] leading-relaxed text-ink">
              Thanks, {sentName}. Online requests are not switched on yet on this new website, so nothing has been sent.
              Please call{" "}
              <a href={site.phone.href} className="font-semibold text-brand-700 underline">
                {site.phone.display}
              </a>{" "}
              and we will find you a time.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
