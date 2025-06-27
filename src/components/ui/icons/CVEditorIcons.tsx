import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

// ============================================================================
// ICONOS DE ACCIONES GENERALES
// ============================================================================

export const SaveIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Diskette base */}
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Diskette slot */}
    <rect
      x="6"
      y="3"
      width="12"
      height="6"
      fill="currentColor"
      fillOpacity="0.2"
    />

    {/* Center circle */}
    <circle
      cx="12"
      cy="14"
      r="3"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1"
    />

    {/* Save indicator */}
    <path
      d="M10 14l1.5 1.5L15 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Decorative elements */}
    <rect
      x="8"
      y="5"
      width="8"
      height="1"
      fill="currentColor"
      fillOpacity="0.4"
    />
  </svg>
);

export const DeleteIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Trash can body */}
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
  </svg>
);

export const ExportIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
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

    {/* Export arrow */}
    <path
      d="M12 11v6M15 14l-3-3-3 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Document lines */}
    <path
      d="M8 13h2M8 17h4"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeOpacity="0.5"
    />
  </svg>
);

export const AddIcon: React.FC<IconProps> = ({ className = "", size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Plus circle */}
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Plus sign */}
    <path
      d="M12 8v8M8 12h8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Center highlight */}
    <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

// ============================================================================
// ICONOS DE CONTACTO Y COMUNICACIÓN
// ============================================================================

export const PhoneIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Phone body */}
    <rect
      x="5"
      y="2"
      width="14"
      height="20"
      rx="3"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Screen */}
    <rect
      x="7"
      y="5"
      width="10"
      height="12"
      rx="1"
      fill="currentColor"
      fillOpacity="0.2"
    />

    {/* Home button */}
    <circle cx="12" cy="19" r="1.5" fill="currentColor" fillOpacity="0.6" />

    {/* Signal waves */}
    <path
      d="M9 9c1.5-1.5 3.5-1.5 5 0M10 11c1-1 2-1 3 0"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeOpacity="0.7"
    />
  </svg>
);

export const EmailIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Envelope base */}
    <rect
      x="2"
      y="6"
      width="20"
      height="12"
      rx="2"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Envelope flap */}
    <path
      d="M2 8l10 6 10-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Email content lines */}
    <rect
      x="5"
      y="10"
      width="6"
      height="1"
      fill="currentColor"
      fillOpacity="0.3"
    />
    <rect
      x="5"
      y="12"
      width="8"
      height="1"
      fill="currentColor"
      fillOpacity="0.3"
    />
    <rect
      x="5"
      y="14"
      width="4"
      height="1"
      fill="currentColor"
      fillOpacity="0.3"
    />

    {/* @ symbol */}
    <circle
      cx="17"
      cy="7"
      r="2"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
    />
    <circle cx="17" cy="7" r="0.8" fill="currentColor" fillOpacity="0.6" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Clock face */}
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Clock hands */}
    <path
      d="M12 7v5l3 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Hour markers */}
    <circle cx="12" cy="5" r="0.5" fill="currentColor" fillOpacity="0.6" />
    <circle cx="19" cy="12" r="0.5" fill="currentColor" fillOpacity="0.6" />
    <circle cx="12" cy="19" r="0.5" fill="currentColor" fillOpacity="0.6" />
    <circle cx="5" cy="12" r="0.5" fill="currentColor" fillOpacity="0.6" />

    {/* Center dot */}
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

// ============================================================================
// ICONOS DE REDES SOCIALES
// ============================================================================

export const GitHubIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* GitHub cat logo */}
    <path
      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03A9.564 9.564 0 0112 6.8c.85.004 1.71.115 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.013 10.013 0 0022 12c0-5.523-4.477-10-10-10z"
      fill="currentColor"
      fillOpacity="0.9"
    />

    {/* Terminal cursor */}
    <rect
      x="8"
      y="14"
      width="1"
      height="4"
      fill="currentColor"
      fillOpacity="0.6"
    />
  </svg>
);

export const TwitterIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Twitter bird */}
    <path
      d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Wing detail */}
    <path
      d="M8 12c2-1 4-1 6 0"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />

    {/* Eye */}
    <circle cx="16" cy="7" r="0.8" fill="currentColor" />
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Instagram square */}
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="6"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Camera lens */}
    <circle
      cx="12"
      cy="12"
      r="4"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />

    {/* Inner lens */}
    <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.3" />

    {/* Flash/Story indicator */}
    <circle cx="18" cy="6" r="1.5" fill="currentColor" fillOpacity="0.6" />

    {/* Gradient effect */}
    <circle cx="12" cy="12" r="1" fill="currentColor" fillOpacity="0.8" />
  </svg>
);

export const FacebookIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Facebook square */}
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="4"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Facebook f */}
    <path
      d="M15 8h-3v2h3v3h-3v7h-3v-7H7v-3h2V8a3 3 0 0 1 3-3h3v3z"
      fill="currentColor"
      fillOpacity="0.8"
    />

    {/* Highlight */}
    <rect
      x="12"
      y="5"
      width="3"
      height="1"
      fill="currentColor"
      fillOpacity="0.4"
    />
  </svg>
);

export const YouTubeIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* YouTube rounded rectangle */}
    <rect
      x="2"
      y="6"
      width="20"
      height="12"
      rx="4"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Play button */}
    <path d="M10 9l5 3-5 3V9z" fill="currentColor" fillOpacity="0.8" />

    {/* Screen reflection */}
    <rect
      x="4"
      y="8"
      width="16"
      height="8"
      rx="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
  </svg>
);

export const TikTokIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* TikTok note shape */}
    <path
      d="M12 2a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Musical note */}
    <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.6" />
    <path
      d="M14 8c2-1 4-1 4 1v3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Sound waves */}
    <path
      d="M6 10c0-1 1-2 2-2M6 14c0 1 1 2 2 2"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeOpacity="0.5"
    />
  </svg>
);

export const BehanceIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Behance canvas */}
    <rect
      x="2"
      y="4"
      width="20"
      height="16"
      rx="3"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Palette */}
    <circle cx="8" cy="12" r="2" fill="currentColor" fillOpacity="0.3" />
    <circle cx="16" cy="12" r="2" fill="currentColor" fillOpacity="0.3" />

    {/* Brush stroke */}
    <path
      d="M6 8h12M8 16h8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />

    {/* Be logo hint */}
    <path d="M5 6h2v2H5zM17 6h2v2h-2z" fill="currentColor" fillOpacity="0.7" />
  </svg>
);

export const DribbbleIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Basketball */}
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Basketball lines */}
    <path
      d="M3 12h18M12 3c-3 6-3 12 0 18M12 3c3 6 3 12 0 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Center dot */}
    <circle cx="12" cy="12" r="1" fill="currentColor" fillOpacity="0.6" />
  </svg>
);

export const DevToIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Monitor screen */}
    <rect
      x="2"
      y="4"
      width="20"
      height="14"
      rx="3"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Code brackets */}
    <path
      d="M8 9l-2 2 2 2M16 9l2 2-2 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Code line */}
    <path
      d="M10 13l4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Stand */}
    <path
      d="M9 18h6M12 18v2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const MediumIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Medium circles */}
    <circle cx="7" cy="12" r="4" fill="currentColor" fillOpacity="0.8" />
    <circle cx="15" cy="12" r="2.5" fill="currentColor" fillOpacity="0.6" />
    <circle cx="20" cy="12" r="1.5" fill="currentColor" fillOpacity="0.4" />

    {/* Text lines suggestion */}
    <path
      d="M3 6h6M3 18h6M11 8h4M11 16h4"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeOpacity="0.3"
    />
  </svg>
);

export const StackOverflowIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Stack of books/papers */}
    <rect
      x="4"
      y="16"
      width="16"
      height="2"
      fill="currentColor"
      fillOpacity="0.8"
    />
    <rect
      x="5"
      y="13"
      width="14"
      height="2"
      fill="currentColor"
      fillOpacity="0.6"
    />
    <rect
      x="6"
      y="10"
      width="12"
      height="2"
      fill="currentColor"
      fillOpacity="0.4"
    />
    <rect
      x="7"
      y="7"
      width="10"
      height="2"
      fill="currentColor"
      fillOpacity="0.2"
    />

    {/* Question mark */}
    <circle
      cx="12"
      cy="5"
      r="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M10.5 4c0-.5.5-1 1.5-1s1.5.5 1.5 1-.5 1-1.5 1"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
    />
    <circle cx="12" cy="6.5" r="0.3" fill="currentColor" />
  </svg>
);

export const DiscordIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Discord robot head */}
    <path
      d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"
      fill="currentColor"
      fillOpacity="0.8"
    />

    {/* Eyes */}
    <circle cx="8.5" cy="12" r="1.2" fill="currentColor" fillOpacity="0.3" />
    <circle cx="15.5" cy="12" r="1.2" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

export const TelegramIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Telegram circle */}
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Paper plane */}
    <path
      d="M8 12l2 2 4-4M7 12l10-5-3 10-4-2-3-3z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.3"
    />

    {/* Trail */}
    <path
      d="M15 9l-3 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const WhatsAppIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* WhatsApp circle */}
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Phone in circle */}
    <path
      d="M16.5 8.5c-1-1-2.5-1-3.5 0l-.5.5c-.5.5-.5 1 0 1.5l1 1c.5.5.5 1 0 1.5l-2 2c-.5.5-1 .5-1.5 0l-1-1c-.5-.5-1-.5-1.5 0l-.5.5c-1 1-1 2.5 0 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />

    {/* Chat bubble */}
    <path
      d="M9 15l-2 2v-2H6a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h5"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />
  </svg>
);

export const WebIcon: React.FC<IconProps> = ({ className = "", size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Globe */}
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Longitude lines */}
    <path
      d="M12 3c-3 3-3 6 0 9 3-3 3-6 0-9zM12 12c-3 3-3 6 0 9 3-3 3-6 0-9z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />

    {/* Latitude lines */}
    <path
      d="M3 12h18M6 8h12M6 16h12"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />

    {/* Link symbol */}
    <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
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
      height="18"
      rx="2"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Calendar header */}
    <rect
      x="3"
      y="4"
      width="18"
      height="4"
      rx="2"
      fill="currentColor"
      fillOpacity="0.2"
    />

    {/* Binding holes */}
    <path
      d="M8 2v4M16 2v4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Calendar grid */}
    <path
      d="M3 10h18M8 14h1M12 14h1M16 14h1M8 18h1M12 18h1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />
  </svg>
);

export const LinkIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Link chain */}
    <path
      d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Link highlight */}
    <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

export const MetricsIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Chart bars */}
    <rect
      x="3"
      y="16"
      width="4"
      height="6"
      fill="currentColor"
      fillOpacity="0.6"
      stroke="currentColor"
      strokeWidth="1"
    />
    <rect
      x="10"
      y="12"
      width="4"
      height="10"
      fill="currentColor"
      fillOpacity="0.7"
      stroke="currentColor"
      strokeWidth="1"
    />
    <rect
      x="17"
      y="8"
      width="4"
      height="14"
      fill="currentColor"
      fillOpacity="0.8"
      stroke="currentColor"
      strokeWidth="1"
    />

    {/* Trend arrow */}
    <path
      d="M14 6l4-4 4 4M18 2v6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Baseline */}
    <path
      d="M2 22h20"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeOpacity="0.5"
    />
  </svg>
);

export const TechIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Wrench */}
    <path
      d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Gear teeth */}
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />

    {/* Tool handle */}
    <path
      d="M9 12l-2-2M15 6l2 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const BadgeIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Badge shield */}
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* Badge center */}
    <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.3" />

    {/* Badge checkmark */}
    <path
      d="M9 12l2 2 4-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IdIcon: React.FC<IconProps> = ({ className = "", size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* ID Card */}
    <rect
      x="2"
      y="6"
      width="20"
      height="12"
      rx="2"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Photo area */}
    <rect
      x="4"
      y="8"
      width="4"
      height="4"
      rx="1"
      fill="currentColor"
      fillOpacity="0.3"
    />

    {/* Text lines */}
    <path
      d="M10 9h8M10 11h6M10 13h4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />

    {/* ID number */}
    <path
      d="M4 15h16"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeOpacity="0.4"
    />
  </svg>
);

export const SkillsIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Toolbox base */}
    <rect
      x="4"
      y="8"
      width="16"
      height="12"
      rx="2"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Toolbox handle */}
    <path
      d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Tools inside */}
    <path
      d="M7 12h10M9 15h6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />

    {/* Tool icons */}
    <circle cx="8" cy="12" r="1" fill="currentColor" fillOpacity="0.7" />
    <circle cx="16" cy="12" r="1" fill="currentColor" fillOpacity="0.7" />
    <rect
      x="11"
      y="14"
      width="2"
      height="2"
      fill="currentColor"
      fillOpacity="0.5"
    />
  </svg>
);

// ============================================================================
// ICONOS DE CONTENIDO Y EDUCACIÓN
// ============================================================================

export const BookIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Book cover */}
    <path
      d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Book pages */}
    <path
      d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Book content lines */}
    <path
      d="M8 7h8M8 11h6M8 15h4"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />

    {/* Bookmark */}
    <path
      d="M17 2v8l-2-1-2 1V2"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

export const PaletteIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Palette shape */}
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.497 2 12 2z"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Color dots */}
    <circle cx="6.5" cy="11.5" r="1.5" fill="currentColor" fillOpacity="0.8" />
    <circle cx="9.5" cy="7.5" r="1.5" fill="currentColor" fillOpacity="0.6" />
    <circle cx="14.5" cy="7.5" r="1.5" fill="currentColor" fillOpacity="0.7" />
    <circle cx="17.5" cy="11.5" r="1.5" fill="currentColor" fillOpacity="0.5" />

    {/* Brush handle */}
    <path
      d="M12 16l2 2-1 3-2-2 1-3z"
      fill="currentColor"
      fillOpacity="0.4"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

export const WriteIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
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

    {/* Writing lines */}
    <path
      d="M8 13h8M8 17h8M8 9h2"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />

    {/* Pen tip */}
    <path
      d="M15 11l2-2 1 1-2 2-1-1z"
      fill="currentColor"
      fillOpacity="0.6"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Trophy cup */}
    <path
      d="M7 8h10v5a5 5 0 0 1-10 0V8z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Trophy handles */}
    <path
      d="M6 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h1M18 10a2 2 0 0 0 2-2V6a1 1 0 0 0-1-1h-1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Trophy base */}
    <rect
      x="8"
      y="18"
      width="8"
      height="3"
      rx="1"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Trophy stem */}
    <path
      d="M12 18v-3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Winner decoration */}
    <circle cx="12" cy="11" r="2" fill="currentColor" fillOpacity="0.6" />

    {/* Star on trophy */}
    <path
      d="M12 9.5l0.5 1h1l-0.8 0.6 0.3 1-1-0.7-1 0.7 0.3-1-0.8-0.6h1l0.5-1z"
      fill="currentColor"
      fillOpacity="0.8"
    />
  </svg>
);

export const ProjectIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Rocket body */}
    <path
      d="M12 2l3 7h-6l3-7z"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* Rocket fins */}
    <path
      d="M9 9l-3 3v3l3-3M15 9l3 3v3l-3-3"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* Rocket window */}
    <circle
      cx="12"
      cy="6"
      r="1.5"
      fill="currentColor"
      fillOpacity="0.6"
      stroke="currentColor"
      strokeWidth="1"
    />

    {/* Flame */}
    <path
      d="M10 15c0 2 1 4 2 4s2-2 2-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="currentColor"
      fillOpacity="0.4"
    />

    {/* Exhaust particles */}
    <circle cx="10" cy="17" r="0.5" fill="currentColor" fillOpacity="0.6" />
    <circle cx="14" cy="17" r="0.5" fill="currentColor" fillOpacity="0.6" />
    <circle cx="12" cy="19" r="0.5" fill="currentColor" fillOpacity="0.4" />
  </svg>
);

// ============================================================================
// OBJETO DE EXPORTACIÓN CON TODOS LOS ICONOS
// ============================================================================

export const CVEditorIcons = {
  // Acciones generales
  Save: SaveIcon,
  Delete: DeleteIcon,
  Export: ExportIcon,
  Add: AddIcon,

  // Contacto y comunicación
  Phone: PhoneIcon,
  Email: EmailIcon,
  Clock: ClockIcon,

  // Redes sociales
  GitHub: GitHubIcon,
  Twitter: TwitterIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  YouTube: YouTubeIcon,
  TikTok: TikTokIcon,
  Behance: BehanceIcon,
  Dribbble: DribbbleIcon,
  DevTo: DevToIcon,
  Medium: MediumIcon,
  StackOverflow: StackOverflowIcon,
  Discord: DiscordIcon,
  Telegram: TelegramIcon,
  WhatsApp: WhatsAppIcon,
  Web: WebIcon,

  // Utilidades
  Calendar: CalendarIcon,
  Link: LinkIcon,
  Metrics: MetricsIcon,
  Tech: TechIcon,
  Badge: BadgeIcon,
  Id: IdIcon,
  Skills: SkillsIcon,

  // Contenido y educación
  Book: BookIcon,
  Palette: PaletteIcon,
  Write: WriteIcon,
  Trophy: TrophyIcon,
  Project: ProjectIcon,
} as const;

export type CVEditorIconType = keyof typeof CVEditorIcons;
