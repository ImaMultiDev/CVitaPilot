import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const ActiveCVIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Document base */}
    <path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Document corner */}
    <path
      d="M14 2v6h6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Star indicator */}
    <path
      d="M12 10l1.5 3h3l-2.5 2 1 3-3-2-3 2 1-3-2.5-2h3L12 10z"
      fill="currentColor"
      fillOpacity="0.8"
      stroke="currentColor"
      strokeWidth="0.5"
    />
  </svg>
);

export const SavedCVIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Storage/Archive container */}
    <rect
      x="3"
      y="4"
      width="18"
      height="16"
      rx="2"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Multiple document layers */}
    <rect
      x="6"
      y="7"
      width="8"
      height="10"
      rx="1"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1"
    />

    <rect
      x="8"
      y="9"
      width="8"
      height="8"
      rx="1"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1"
    />

    {/* Document lines */}
    <path
      d="M10 12h4M10 14h3"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
    />

    {/* Save indicator */}
    <circle cx="18" cy="6" r="2" fill="currentColor" fillOpacity="0.8" />
  </svg>
);

export const LoadingDocsIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Loading circle */}
    <circle
      cx="12"
      cy="12"
      r="8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="32"
      strokeDashoffset="32"
      fill="none"
      opacity="0.3"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 12 12;360 12 12"
        dur="1s"
        repeatCount="indefinite"
      />
    </circle>

    {/* Document in center */}
    <rect
      x="8"
      y="8"
      width="8"
      height="8"
      rx="1"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1"
    />

    {/* Document lines */}
    <path
      d="M9 10h6M9 12h4M9 14h5"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

export const EmptyStateIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Empty folder */}
    <path
      d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7l-2-2H5a2 2 0 0 0-2 2z"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Dashed lines indicating emptiness */}
    <path
      d="M8 12h8M8 14h6"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeDasharray="2 2"
      opacity="0.4"
    />

    {/* Plus indicator */}
    <circle
      cx="18"
      cy="6"
      r="3"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1"
    />
    <path
      d="M18 4v4M16 6h4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const EditCVIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Document */}
    <path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Document corner */}
    <path
      d="M14 2v6h6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Edit pen */}
    <path
      d="M10 15l4-4 2 2-4 4-2-2z"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1"
    />

    {/* Pen tip */}
    <path
      d="M16 11l2-2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Edit lines */}
    <path
      d="M8 10h2M8 13h1"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

export const DeleteCVIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Trash can */}
    <path
      d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Trash lines */}
    <path
      d="M10 11v6M14 11v6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Lid highlight */}
    <rect
      x="3"
      y="5"
      width="18"
      height="2"
      rx="1"
      fill="currentColor"
      fillOpacity="0.2"
    />

    {/* Danger indicator */}
    <circle cx="19" cy="5" r="2" fill="currentColor" fillOpacity="0.8" />
  </svg>
);

export const InfoIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Info circle */}
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Info i */}
    <circle cx="12" cy="8" r="1" fill="currentColor" />
    <path
      d="M12 12v4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Decorative elements */}
    <circle
      cx="12"
      cy="12"
      r="6"
      stroke="currentColor"
      strokeWidth="0.5"
      fill="none"
      opacity="0.3"
    />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Calendar base */}
    <rect
      x="3"
      y="4"
      width="18"
      height="16"
      rx="2"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Top binding */}
    <path
      d="M16 2v4M8 2v4M3 8h18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Calendar grid */}
    <circle cx="8" cy="12" r="1" fill="currentColor" fillOpacity="0.3" />
    <circle cx="12" cy="12" r="1" fill="currentColor" fillOpacity="0.3" />
    <circle cx="16" cy="12" r="1" fill="currentColor" fillOpacity="0.3" />
    <circle cx="8" cy="16" r="1" fill="currentColor" fillOpacity="0.3" />
    <circle cx="12" cy="16" r="1" fill="currentColor" fillOpacity="0.8" />
    <circle cx="16" cy="16" r="1" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

export const DeliveryIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Send/Export arrow */}
    <path
      d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Motion lines */}
    <path
      d="M2 8l4 2M6 14l2 4"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.6"
    />

    {/* Success indicator */}
    <circle cx="18" cy="6" r="2" fill="currentColor" fillOpacity="0.8" />
  </svg>
);

export const CountIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Counter background */}
    <rect
      x="3"
      y="8"
      width="18"
      height="8"
      rx="4"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Digital display */}
    <rect
      x="6"
      y="10"
      width="12"
      height="4"
      rx="1"
      fill="currentColor"
      fillOpacity="0.2"
    />

    {/* Number segments */}
    <path
      d="M9 11h2M9 13h2M13 11h2M13 13h2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Indicator lights */}
    <circle cx="5" cy="10" r="1" fill="currentColor" fillOpacity="0.6" />
    <circle cx="5" cy="14" r="1" fill="currentColor" fillOpacity="0.3" />
    <circle cx="19" cy="12" r="1" fill="currentColor" fillOpacity="0.8" />
  </svg>
);
