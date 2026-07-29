"use client";

import {
  Children,
  FormEvent,
  cloneElement,
  isValidElement,
  useId,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";
import { isValidEmail, openMailto } from "@/lib/mailto";

type Errors = Partial<Record<string, string>>;

function shouldFallbackToMailto(status: number, error?: string) {
  return (
    status === 404 ||
    status === 405 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    error === "mail_unconfigured"
  );
}

export function ContactForm() {
  const t = useTranslations("contact");
  const tc = useTranslations("common");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);
    const formEl = event.currentTarget;
    const form = new FormData(formEl);

    const next: Errors = {};
    if (!String(form.get("name") || "").trim()) next.name = t("errors.name");
    if (!isValidEmail(String(form.get("email") || ""))) next.email = t("errors.email");
    if (!String(form.get("message") || "").trim()) next.message = t("errors.message");
    setErrors(next);
    if (Object.keys(next).length) return;

    const payload = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      message: String(form.get("message") || "").trim(),
      website: String(form.get("website") || ""),
    };

    const mailtoBody = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone || "-"}`,
      "",
      payload.message,
    ].join("\n");

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        errors?: Errors;
      };

      if (shouldFallbackToMailto(res.status, data.error)) {
        openMailto(t("mailSubject"), mailtoBody);
        formEl.reset();
        setSuccess(true);
        return;
      }

      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setServerError(data.error || tc("errorBody"));
        return;
      }

      formEl.reset();
      setSuccess(true);
    } catch {
      openMailto(t("mailSubject"), mailtoBody);
      formEl.reset();
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-brand-line bg-white p-8 text-center">
        <h3 className="font-display text-2xl font-semibold text-brand-deep">
          {tc("successTitle")}
        </h3>
        <p className="mt-3 text-sm text-brand-muted">
          {tc("successBody", { email: tc("email") })}
        </p>
        <button
          type="button"
          className="btn-primary mt-6 min-h-11"
          onClick={() => setSuccess(false)}
        >
          {tc("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative grid gap-5 rounded-2xl border border-brand-line bg-white p-6 sm:p-8"
      noValidate
    >
      <h2 className="font-display text-2xl font-semibold text-brand-deep">{t("formTitle")}</h2>

      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field label={t("name")} error={errors.name}>
        <input name="name" autoComplete="name" className="min-h-11" />
      </Field>
      <Field label={t("email")} error={errors.email}>
        <input name="email" type="email" autoComplete="email" className="min-h-11" />
      </Field>
      <Field label={`${t("phone")} (${tc("optional")})`}>
        <input name="phone" type="tel" autoComplete="tel" className="min-h-11" />
      </Field>
      <Field label={t("message")} error={errors.message}>
        <textarea name="message" rows={5} placeholder={t("messagePlaceholder")} />
      </Field>

      {serverError ? <p className="form-error text-sm">{serverError}</p> : null}

      <button
        type="submit"
        className="btn-primary min-h-11 w-full sm:w-auto"
        disabled={submitting}
      >
        {submitting ? tc("sending") : t("submit")}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const child = Children.only(children);

  if (!isValidElement(child)) {
    return (
      <div className="form-field">
        <label>{label}</label>
        {children}
        {error ? <span className="form-error">{error}</span> : null}
      </div>
    );
  }

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {cloneElement(child as ReactElement<Record<string, unknown>>, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
      })}
      {error ? (
        <span id={errorId} className="form-error">
          {error}
        </span>
      ) : null}
    </div>
  );
}
