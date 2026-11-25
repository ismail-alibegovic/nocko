"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { springDefault } from "@/lib/motion";

type Field = "name" | "company" | "email" | "phone" | "subject" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

export type ContactLabels = {
  formTitle: string;
  fields: Record<Field, string>;
  optional: string;
  subjects: string[];
  subjectPlaceholder: string;
  submit: string;
  errors: { name: string; email: string; phone: string; subject: string; message: string; summary: string };
  demoTitle: string;
  demoBody: string;
  demoMail: string;
  reset: string;
  call: string;
};

const empty: Values = { name: "", company: "", email: "", phone: "", subject: "", message: "" };
const order: Field[] = ["name", "company", "email", "phone", "subject", "message"];
const ease = [0.22, 1, 0.36, 1] as const;

function validate(v: Values, e: ContactLabels["errors"]): Errors {
  const out: Errors = {};
  if (v.name.trim().length < 2) out.name = e.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) out.email = e.email;
  if (v.phone.trim() && !/^[+()\d\s/.-]{6,20}$/.test(v.phone.trim())) out.phone = e.phone;
  if (!v.subject) out.subject = e.subject;
  if (v.message.trim().length < 10) out.message = e.message;
  return out;
}

/**
 * Demo contact form: validated locally only. No email service is configured,
 * so the success state says so plainly and offers a pre-filled mailto instead.
 */
export function ContactForm({
  labels,
  email,
  phoneHref,
  phoneDisplay,
}: {
  labels: ContactLabels;
  email: string;
  phoneHref: string;
  phoneDisplay: string;
}) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const set = (f: Field, val: string) => {
    const next = { ...values, [f]: val };
    setValues(next);
    if (touched[f]) setErrors(validate(next, labels.errors));
  };
  const blur = (f: Field) => {
    setTouched((t) => ({ ...t, [f]: true }));
    setErrors(validate(values, labels.errors));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values, labels.errors);
    setErrors(errs);
    setTouched(Object.fromEntries(order.map((f) => [f, true])));
    const first = order.find((f) => errs[f]);
    if (first) {
      setShowSummary(true);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setShowSummary(false);
    setSubmitted(true);
  };

  const mailto = () => {
    const body = [
      `${labels.fields.name}: ${values.name}`,
      values.company ? `${labels.fields.company}: ${values.company}` : null,
      `${labels.fields.email}: ${values.email}`,
      values.phone ? `${labels.fields.phone}: ${values.phone}` : null,
      "",
      values.message,
    ]
      .filter((l): l is string => l !== null)
      .join("\n");
    return `mailto:${email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
  };

  const reset = () => {
    setValues(empty);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  const id = (f: Field) => `${uid}-${f}`;
  const fieldCls = (f: Field) =>
    `peer w-full rounded-none border-0 border-b-2 bg-transparent px-0 pt-7 pb-3 text-lg text-navy outline-none transition-colors placeholder:text-transparent focus:border-gold focus-visible:outline-none ${
      touched[f] && errors[f] ? "border-[#b3261e]" : "border-navy/20"
    }`;

  const label = (f: Field, optional = false) => (
    <label
      htmlFor={id(f)}
      className="pointer-events-none absolute top-1 left-0 text-xs font-bold tracking-[0.16em] text-muted uppercase"
    >
      {labels.fields[f]}
      {optional && <span className="ml-2 font-medium tracking-normal normal-case">({labels.optional})</span>}
    </label>
  );

  const error = (f: Field) =>
    touched[f] && errors[f] ? (
      <p id={`${id(f)}-err`} className="mt-2 flex items-center gap-1.5 text-sm text-[#b3261e]">
        <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
        {errors[f]}
      </p>
    ) : null;

  const aria = (f: Field) => ({
    id: id(f),
    name: f,
    "aria-invalid": touched[f] && errors[f] ? (true as const) : undefined,
    "aria-describedby": touched[f] && errors[f] ? `${id(f)}-err` : undefined,
  });

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div
            key="done"
            role="status"
            // Materialise rather than just fade: blur, scale and opacity resolve together.
            initial={{ opacity: 0, scale: 0.96, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
            transition={{ ...springDefault, opacity: { duration: 0.3, ease }, filter: { duration: 0.45, ease } }}
            className="rounded-[1.5rem] bg-navy p-8 text-cream lg:p-12"
          >
            <CheckCircle2 className="size-10 text-gold" aria-hidden="true" />
            <h3 className="display mt-6 text-3xl lg:text-4xl">{labels.demoTitle}</h3>
            <p className="mt-4 max-w-lg leading-relaxed text-cream/80">{labels.demoBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={mailto()}
                className="inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3.5 font-semibold text-navy press hover:bg-[#e6f26e]"
              >
                <Mail className="size-4" aria-hidden="true" />
                {labels.demoMail}
              </a>
              <a
                href={phoneHref}
                className="inline-flex items-center gap-3 rounded-full border border-cream/40 px-6 py-3.5 font-semibold press hover:bg-cream/10"
              >
                {labels.call} {phoneDisplay}
              </a>
              <button type="button" onClick={reset} className="px-4 py-3.5 font-semibold text-cream/80 underline-offset-4 hover:underline">
                {labels.reset}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            aria-labelledby={`${uid}-title`}
          >
            <h2 id={`${uid}-title`} className="display text-4xl text-navy lg:text-5xl">
              {labels.formTitle}
            </h2>

            {showSummary && Object.keys(errors).length > 0 && (
              <p role="alert" className="mt-6 flex items-center gap-2 rounded-xl bg-[#b3261e]/8 px-4 py-3 text-sm font-semibold text-[#b3261e]">
                <AlertCircle className="size-4" aria-hidden="true" />
                {labels.errors.summary}
              </p>
            )}

            <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              <div className="relative">
                <input
                  {...aria("name")}
                  type="text"
                  autoComplete="name"
                  required
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  onBlur={() => blur("name")}
                  className={fieldCls("name")}
                />
                {label("name")}
                {error("name")}
              </div>
              <div className="relative">
                <input
                  {...aria("company")}
                  type="text"
                  autoComplete="organization"
                  value={values.company}
                  onChange={(e) => set("company", e.target.value)}
                  className={fieldCls("company")}
                />
                {label("company", true)}
              </div>
              <div className="relative">
                <input
                  {...aria("email")}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  onBlur={() => blur("email")}
                  className={fieldCls("email")}
                />
                {label("email")}
                {error("email")}
              </div>
              <div className="relative">
                <input
                  {...aria("phone")}
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={values.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  onBlur={() => blur("phone")}
                  className={fieldCls("phone")}
                />
                {label("phone", true)}
                {error("phone")}
              </div>
              <div className="relative sm:col-span-2">
                <select
                  {...aria("subject")}
                  required
                  value={values.subject}
                  onChange={(e) => {
                    set("subject", e.target.value);
                    setTouched((t) => ({ ...t, subject: true }));
                    setErrors(validate({ ...values, subject: e.target.value }, labels.errors));
                  }}
                  onBlur={() => blur("subject")}
                  className={`${fieldCls("subject")} cursor-pointer appearance-none bg-[url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2306264C' stroke-width='2'><path d='m6 9 6 6 6-6'/></svg>")] bg-[length:14px] bg-[right_0.25rem_center] bg-no-repeat pr-8 ${values.subject ? "" : "text-muted"}`}
                >
                  <option value="" disabled>
                    {labels.subjectPlaceholder}
                  </option>
                  {labels.subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {label("subject")}
                {error("subject")}
              </div>
              <div className="relative sm:col-span-2">
                <textarea
                  {...aria("message")}
                  required
                  rows={5}
                  value={values.message}
                  onChange={(e) => set("message", e.target.value)}
                  onBlur={() => blur("message")}
                  className={`${fieldCls("message")} resize-y`}
                />
                {label("message")}
                {error("message")}
              </div>
            </div>

            <button
              type="submit"
              className="group press mt-10 inline-flex items-center gap-3 rounded-full bg-navy px-8 py-4 font-semibold text-cream hover:bg-blue"
            >
              {labels.submit}
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
