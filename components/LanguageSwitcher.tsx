"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const LABELS: Record<Locale, string> = {
  fr: "FR",
  de: "DE",
  it: "IT",
  en: "EN",
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function switchTo(code: Locale) {
    router.replace(pathname, { locale: code });
    setOpen(false);
  }

  return (
    <>
      {/* Desktop / website: inline buttons (lg+ matches header nav breakpoint) */}
      <div
        className="hidden items-center gap-0.5 rounded-full border border-brand-line bg-white/80 p-1 shadow-sm backdrop-blur lg:inline-flex"
        role="group"
        aria-label="Language"
      >
        {routing.locales.map((code) => {
          const active = code === locale;
          return (
            <button
              key={code}
              type="button"
              onClick={() => switchTo(code)}
              className={`min-w-9 rounded-full px-2.5 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
                active
                  ? "bg-brand-deep text-white"
                  : "text-brand-muted hover:bg-brand-mist hover:text-brand-deep"
              }`}
              aria-pressed={active}
            >
              {LABELS[code]}
            </button>
          );
        })}
      </div>

      {/* Mobile: dropdown */}
      <div className="relative lg:hidden" ref={rootRef}>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full border border-brand-line bg-white/90 px-3 text-sm font-semibold text-brand-deep shadow-sm"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((value) => !value)}
        >
          {LABELS[locale]}
          <svg
            viewBox="0 0 20 20"
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            fill="currentColor"
            aria-hidden
          >
            <path d="M5.25 7.5 10 12.25 14.75 7.5" />
          </svg>
        </button>

        {open ? (
          <ul
            id={listId}
            role="listbox"
            className="absolute right-0 z-50 mt-2 min-w-[8.5rem] overflow-hidden rounded-xl border border-brand-line bg-white py-1 shadow-lg"
          >
            {routing.locales.map((code) => {
              const active = code === locale;
              return (
                <li key={code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    className={`flex min-h-11 w-full items-center px-4 text-left text-sm font-semibold ${
                      active
                        ? "bg-brand-mist text-brand-deep"
                        : "text-brand-ink hover:bg-brand-mist/70"
                    }`}
                    onClick={() => switchTo(code)}
                  >
                    {LABELS[code]}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </>
  );
}
