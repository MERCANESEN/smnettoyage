import type { ReactNode } from "react";
import type { ServiceId } from "@/lib/constants";

type IconProps = {
  className?: string;
};

export function ServiceIcon({
  id,
  className = "h-7 w-7",
}: {
  id: ServiceId;
  className?: string;
}) {
  const icons: Record<ServiceId, ReactNode> = {
    home: <HomeIcon className={className} />,
    office: <OfficeIcon className={className} />,
    windows: <WindowsIcon className={className} />,
    construction: <ConstructionIcon className={className} />,
    moving: <MovingIcon className={className} />,
  };

  return <>{icons[id]}</>;
}

function HomeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 11.5 12 4l8 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 10.5V20h11V10.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 20v-5h4v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OfficeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 7h3M13 7h3M8 11h3M13 11h3M8 15h3M13 15h3" strokeLinecap="round" />
    </svg>
  );
}

function WindowsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="1" />
      <path d="M12 4v16M4 12h16" />
      <path d="M15 7l2 1.2" strokeLinecap="round" />
    </svg>
  );
}

function ConstructionIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 19h16" strokeLinecap="round" />
      <path d="M7 19V9l5-4 5 4v10" strokeLinejoin="round" />
      <path d="M10 19v-4h4v4" />
      <path d="M9 12h6" strokeLinecap="round" />
    </svg>
  );
}

function MovingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="8" width="11" height="9" rx="1" />
      <path d="M14 11h4l3 3v3h-7" strokeLinejoin="round" />
      <circle cx="7" cy="18.5" r="1.5" />
      <circle cx="17.5" cy="18.5" r="1.5" />
      <path d="M7 8V6h5v2" />
    </svg>
  );
}
