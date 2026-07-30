"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { de, enUS, fr, it, type Locale as DateLocale } from "date-fns/locale";
import { useLocale } from "next-intl";
import "react-day-picker/style.css";

const DATE_LOCALES: Record<string, DateLocale> = {
  fr,
  de,
  it,
  en: enUS,
};

type LocaleDatePickerProps = {
  name?: string;
  error?: boolean;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

function toIsoDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function LocaleDatePicker({
  name = "date",
  error,
  id,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: LocaleDatePickerProps) {
  const siteLocale = useLocale();
  const dateLocale = DATE_LOCALES[siteLocale] || fr;
  const [selected, setSelected] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const display = useMemo(() => {
    if (!selected) return "";
    return format(selected, "PPP", { locale: dateLocale });
  }, [selected, dateLocale]);

  return (
    <div className="relative" ref={rootRef} lang={siteLocale}>
      <input type="hidden" name={name} value={selected ? toIsoDate(selected) : ""} />
      <button
        type="button"
        id={id}
        className={`flex min-h-11 w-full items-center justify-between rounded-[0.5rem] border bg-white px-3 text-left text-sm ${
          error ? "border-red-400" : "border-brand-line"
        } ${selected ? "text-brand-ink" : "text-brand-muted"}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{display || ""}</span>
        <svg viewBox="0 0 20 20" className="h-4 w-4 text-brand-sky" fill="none" aria-hidden>
          <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 8h14M7 2v4M13 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <div className="absolute left-0 z-40 mt-2 rounded-xl border border-brand-line bg-white p-3 shadow-lg">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              setSelected(date);
              if (date) setOpen(false);
            }}
            locale={dateLocale}
            weekStartsOn={siteLocale === "en" ? 0 : 1}
            disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
          />
        </div>
      ) : null}
    </div>
  );
}
