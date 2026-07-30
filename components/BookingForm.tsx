"use client";

import {
  Children,
  FormEvent,
  cloneElement,
  isValidElement,
  useId,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { SERVICE_IDS, type ServiceId } from "@/lib/constants";
import { getBookingTimeSlots, isValidSwissPlz } from "@/lib/form-helpers";
import { isValidEmail, openMailto } from "@/lib/mailto";
import {
  formatBookingWhatsAppMessage,
  openWhatsApp,
} from "@/lib/whatsapp";
import { LocaleDatePicker } from "@/components/LocaleDatePicker";
import { WhatsAppIcon } from "@/components/WhatsAppButton";

type Errors = Partial<Record<string, string>>;
type SubmitChannel = "email" | "whatsapp";

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

export function BookingForm() {
  const t = useTranslations("booking");
  const tc = useTranslations("common");
  const ts = useTranslations("services");
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service");
  const defaultService = SERVICE_IDS.includes(initialService as ServiceId)
    ? (initialService as ServiceId)
    : "";

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitChannel, setSubmitChannel] = useState<SubmitChannel | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const timeSlots = useMemo(() => getBookingTimeSlots(), []);
  const serviceOptions = useMemo(
    () =>
      SERVICE_IDS.map((id) => ({
        id,
        label: ts(`${id}.title`),
      })),
    [ts],
  );

  function validate(form: FormData): Errors {
    const next: Errors = {};
    if (!String(form.get("name") || "").trim()) next.name = t("errors.name");
    if (!isValidEmail(String(form.get("email") || ""))) next.email = t("errors.email");
    if (!String(form.get("phone") || "").trim()) next.phone = t("errors.phone");
    if (!String(form.get("service") || "").trim()) next.service = t("errors.service");
    if (!String(form.get("street") || "").trim()) next.street = t("errors.street");
    if (!isValidSwissPlz(String(form.get("plz") || ""))) next.plz = t("errors.plz");
    if (!String(form.get("town") || "").trim()) next.town = t("errors.town");
    if (!String(form.get("date") || "").trim()) next.date = t("errors.date");
    const time = String(form.get("time") || "").trim();
    if (!time || !timeSlots.includes(time)) next.time = t("errors.time");
    return next;
  }

  function getPayload(form: FormData) {
    const street = String(form.get("street") || "").trim();
    const plz = String(form.get("plz") || "").trim();
    const town = String(form.get("town") || "").trim();
    const addressExtra = String(form.get("addressExtra") || "").trim();
    const addressLine2 = `${plz} ${town}`;

    return {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      service: String(form.get("service") || "").trim(),
      street,
      plz,
      town,
      addressExtra,
      address: [street, addressLine2, addressExtra].filter(Boolean).join("\n"),
      date: String(form.get("date") || "").trim(),
      time: String(form.get("time") || "").trim(),
      notes: String(form.get("notes") || "").trim(),
      website: String(form.get("website") || ""),
    };
  }

  async function submitByEmail(formEl: HTMLFormElement, form: FormData) {
    const payload = getPayload(form);
    const addressLine2 = `${payload.plz} ${payload.town}`;
    const mailtoBody = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      `Service: ${payload.service}`,
      `Street: ${payload.street}`,
      `PLZ / Town: ${addressLine2}`,
      `Additional address: ${payload.addressExtra || "-"}`,
      `Preferred date: ${payload.date}`,
      `Preferred time: ${payload.time}`,
      `Notes: ${payload.notes}`,
    ].join("\n");

    setSubmitting(true);
    setSubmitChannel("email");
    try {
      const res = await fetch("/api/booking", {
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
      setSubmitChannel(null);
    }
  }

  function submitByWhatsApp(formEl: HTMLFormElement, form: FormData) {
    const payload = getPayload(form);
    const serviceId = payload.service as ServiceId;
    const serviceLabel = SERVICE_IDS.includes(serviceId)
      ? ts(`${serviceId}.title`)
      : payload.service;

    openWhatsApp(formatBookingWhatsAppMessage(payload, serviceLabel));
    formEl.reset();
    setSuccess(true);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const submitter = (event.nativeEvent as SubmitEvent).submitter as
      | HTMLButtonElement
      | null;
    const channel =
      submitter?.value === "whatsapp" ? "whatsapp" : "email";

    if (channel === "whatsapp") {
      submitByWhatsApp(formEl, form);
      return;
    }

    await submitByEmail(formEl, form);
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
      <h2 className="font-display text-2xl font-semibold text-brand-deep">
        {t("formTitle")}
      </h2>

      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="booking-website">Website</label>
        <input id="booking-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("name")} error={errors.name}>
          <input name="name" autoComplete="name" className="min-h-11" />
        </Field>
        <Field label={t("email")} error={errors.email}>
          <input name="email" type="email" autoComplete="email" className="min-h-11" />
        </Field>
        <Field label={t("phone")} error={errors.phone}>
          <input name="phone" type="tel" autoComplete="tel" className="min-h-11" />
        </Field>
        <Field label={t("service")} error={errors.service}>
          <select name="service" defaultValue={defaultService} className="min-h-11">
            <option value="">{t("servicePlaceholder")}</option>
            {serviceOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t("street")} error={errors.street}>
        <input name="street" autoComplete="street-address" className="min-h-11" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-[8rem_1fr]">
        <Field label={t("plz")} error={errors.plz}>
          <input
            name="plz"
            inputMode="numeric"
            maxLength={4}
            autoComplete="postal-code"
            className="min-h-11"
          />
        </Field>
        <Field label={t("town")} error={errors.town}>
          <input name="town" autoComplete="address-level2" className="min-h-11" />
        </Field>
      </div>

      <Field label={t("addressExtra")}>
        <input
          name="addressExtra"
          placeholder={t("addressExtraPlaceholder")}
          className="min-h-11"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("date")} error={errors.date}>
          <LocaleDatePicker name="date" error={Boolean(errors.date)} />
        </Field>
        <Field label={t("time")} error={errors.time}>
          <select name="time" defaultValue="" className="min-h-11">
            <option value="">{t("timePlaceholder")}</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t("notes")}>
        <textarea name="notes" rows={4} placeholder={t("notesPlaceholder")} />
      </Field>

      {serverError ? <p className="form-error text-sm">{serverError}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="submit"
          name="channel"
          value="email"
          className="btn-primary min-h-11 w-full sm:w-auto"
          disabled={submitting}
        >
          {submitting && submitChannel === "email"
            ? tc("sending")
            : t("submitEmail")}
        </button>
        <button
          type="submit"
          name="channel"
          value="whatsapp"
          className="btn-whatsapp min-h-11 w-full sm:w-auto"
          disabled={submitting}
        >
          <WhatsAppIcon />
          {t("submitWhatsApp")}
        </button>
      </div>
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
