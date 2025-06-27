import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

// ============================================================================
// ICONOS DE ESTADÍSTICAS Y MÉTRICAS
// ============================================================================

export const RocketIcon: React.FC<IconProps> = ({
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
      d="M12 2c3 0 5.5 2.5 5.5 5.5 0 2-1 4-2.5 5.5L12 16l-3-3c-1.5-1.5-2.5-3.5-2.5-5.5C6.5 4.5 9 2 12 2z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Rocket window */}
    <circle
      cx="12"
      cy="8"
      r="2"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1"
    />

    {/* Rocket flames */}
    <path
      d="M10 16v4c0 1 .5 2 2 2s2-1 2-2v-4"
      fill="currentColor"
      fillOpacity="0.4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Side flames */}
    <path
      d="M8 14c-1 1-2 2-1.5 3.5C7 19 8 19 9 18l1-2"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1"
    />
    <path
      d="M16 14c1 1 2 2 1.5 3.5C17 19 16 19 15 18l-1-2"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1"
    />

    {/* Stars */}
    <circle cx="6" cy="6" r="1" fill="currentColor" fillOpacity="0.6" />
    <circle cx="18" cy="4" r="0.8" fill="currentColor" fillOpacity="0.5" />
    <circle cx="20" cy="8" r="0.6" fill="currentColor" fillOpacity="0.4" />
  </svg>
);

export const LightningIcon: React.FC<IconProps> = ({
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
    {/* Lightning bolt */}
    <path
      d="M13 2L4.09 12.97C3.73 13.54 4.14 14.25 4.84 14.25H9L11 22L19.91 11.03C20.27 10.46 19.86 9.75 19.16 9.75H15L13 2Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* Inner lightning */}
    <path
      d="M13 2L9 14h4l-2 8l6-12h-4l2-8z"
      fill="currentColor"
      fillOpacity="0.4"
    />

    {/* Energy particles */}
    <circle cx="6" cy="8" r="0.8" fill="currentColor" fillOpacity="0.6" />
    <circle cx="18" cy="16" r="0.6" fill="currentColor" fillOpacity="0.5" />
    <circle cx="4" cy="16" r="0.5" fill="currentColor" fillOpacity="0.4" />
    <circle cx="20" cy="6" r="0.7" fill="currentColor" fillOpacity="0.5" />
  </svg>
);

export const TargetIcon: React.FC<IconProps> = ({
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
    {/* Outer circle */}
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Middle circle */}
    <circle
      cx="12"
      cy="12"
      r="6"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.2"
    />

    {/* Inner circle */}
    <circle
      cx="12"
      cy="12"
      r="3"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1"
    />

    {/* Bullseye */}
    <circle cx="12" cy="12" r="1" fill="currentColor" fillOpacity="0.8" />

    {/* Arrow pointing to target */}
    <path
      d="M20 4l-8 8M20 4l-4 0M20 4l0 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fillOpacity="0.6"
    />
  </svg>
);

export const ChartIcon: React.FC<IconProps> = ({
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
    {/* Chart base */}
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

    {/* Chart bars */}
    <rect
      x="6"
      y="14"
      width="2"
      height="4"
      fill="currentColor"
      fillOpacity="0.4"
    />
    <rect
      x="9"
      y="11"
      width="2"
      height="7"
      fill="currentColor"
      fillOpacity="0.5"
    />
    <rect
      x="12"
      y="8"
      width="2"
      height="10"
      fill="currentColor"
      fillOpacity="0.6"
    />
    <rect
      x="15"
      y="12"
      width="2"
      height="6"
      fill="currentColor"
      fillOpacity="0.4"
    />

    {/* Trend line */}
    <path
      d="M6 15l3-3l3-3l3 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Data points */}
    <circle cx="6" cy="15" r="1.5" fill="currentColor" />
    <circle cx="9" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="9" r="1.5" fill="currentColor" />
    <circle cx="15" cy="13" r="1.5" fill="currentColor" />
  </svg>
);

// ============================================================================
// ICONOS DE CARACTERÍSTICAS
// ============================================================================

export const RobotIcon: React.FC<IconProps> = ({
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
    {/* Robot head */}
    <rect
      x="6"
      y="6"
      width="12"
      height="10"
      rx="2"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Robot antenna */}
    <line
      x1="12"
      y1="3"
      x2="12"
      y2="6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="3" r="1" fill="currentColor" />

    {/* Robot eyes */}
    <circle cx="9" cy="10" r="1.5" fill="currentColor" fillOpacity="0.6" />
    <circle cx="15" cy="10" r="1.5" fill="currentColor" fillOpacity="0.6" />

    {/* Robot mouth */}
    <rect
      x="10"
      y="13"
      width="4"
      height="1"
      rx="0.5"
      fill="currentColor"
      fillOpacity="0.4"
    />

    {/* Robot body */}
    <rect
      x="8"
      y="16"
      width="8"
      height="6"
      rx="1"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.2"
    />

    {/* Robot arms */}
    <rect
      x="4"
      y="18"
      width="3"
      height="2"
      rx="1"
      fill="currentColor"
      fillOpacity="0.3"
    />
    <rect
      x="17"
      y="18"
      width="3"
      height="2"
      rx="1"
      fill="currentColor"
      fillOpacity="0.3"
    />

    {/* Control panel */}
    <circle cx="10" cy="19" r="0.8" fill="currentColor" fillOpacity="0.5" />
    <circle cx="14" cy="19" r="0.8" fill="currentColor" fillOpacity="0.5" />
  </svg>
);

export const PaintbrushIcon: React.FC<IconProps> = ({
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
    {/* Brush handle */}
    <path
      d="M3 21c3-1 6.5-2 8-4l8-8c1-1 1-3 0-4s-3-1-4 0l-8 8c-2 1.5-3 5-4 8z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* Brush tip */}
    <path
      d="M15 5l4 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Paint stroke */}
    <path
      d="M9 15c-1 1-2 2-3 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Color palette dots */}
    <circle cx="5" cy="19" r="1" fill="currentColor" fillOpacity="0.6" />
    <circle cx="7" cy="17" r="0.8" fill="currentColor" fillOpacity="0.5" />
    <circle cx="9" cy="15" r="0.6" fill="currentColor" fillOpacity="0.4" />

    {/* Brush ferrule */}
    <rect
      x="12"
      y="8"
      width="3"
      height="1"
      rx="0.5"
      fill="currentColor"
      fillOpacity="0.4"
      transform="rotate(45 13.5 8.5)"
    />
  </svg>
);

export const SmartphoneIcon: React.FC<IconProps> = ({
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
      x="6"
      y="2"
      width="12"
      height="20"
      rx="3"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Screen */}
    <rect
      x="8"
      y="5"
      width="8"
      height="12"
      rx="1"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1"
    />

    {/* Home button */}
    <circle
      cx="12"
      cy="19"
      r="1"
      fill="currentColor"
      fillOpacity="0.4"
      stroke="currentColor"
      strokeWidth="0.5"
    />

    {/* Screen content */}
    <rect
      x="10"
      y="7"
      width="4"
      height="0.5"
      rx="0.25"
      fill="currentColor"
      fillOpacity="0.3"
    />
    <rect
      x="10"
      y="9"
      width="3"
      height="0.5"
      rx="0.25"
      fill="currentColor"
      fillOpacity="0.3"
    />
    <rect
      x="10"
      y="11"
      width="4"
      height="0.5"
      rx="0.25"
      fill="currentColor"
      fillOpacity="0.3"
    />

    {/* Signal/Wi-Fi indicator */}
    <path
      d="M14 8c0.5-0.5 1-0.5 1.5 0M15.5 8c0.5-0.5 1-0.5 1.5 0"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
    />
  </svg>
);

export const RefreshIcon: React.FC<IconProps> = ({
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
    {/* Circular arrow */}
    <path
      d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Center circle */}
    <circle
      cx="12"
      cy="12"
      r="3"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1"
    />

    {/* Rotation indicators */}
    <path
      d="M12 8l2 2-2 2M12 16l-2-2 2-2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fillOpacity="0.6"
    />
  </svg>
);

// ============================================================================
// ICONOS DE ACCIONES Y NAVEGACIÓN
// ============================================================================

export const FolderIcon: React.FC<IconProps> = ({
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
    {/* Folder base */}
    <path
      d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7l-2-2H4z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* Folder tab */}
    <path
      d="M2 6h20v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z"
      fill="currentColor"
      fillOpacity="0.15"
    />

    {/* Document icons inside */}
    <rect
      x="6"
      y="10"
      width="3"
      height="4"
      rx="0.5"
      fill="currentColor"
      fillOpacity="0.3"
    />
    <rect
      x="10"
      y="12"
      width="3"
      height="2"
      rx="0.5"
      fill="currentColor"
      fillOpacity="0.3"
    />
    <rect
      x="14"
      y="11"
      width="3"
      height="3"
      rx="0.5"
      fill="currentColor"
      fillOpacity="0.3"
    />

    {/* Folder shine */}
    <path
      d="M2 8h20"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeOpacity="0.3"
    />
  </svg>
);

export const PlayIcon: React.FC<IconProps> = ({
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
    {/* Play button circle */}
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Play triangle */}
    <path
      d="M9 8l6 4-6 4V8z"
      fill="currentColor"
      fillOpacity="0.7"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />

    {/* Inner highlight */}
    <path d="M10 10l4 2-4 2V10z" fill="currentColor" fillOpacity="0.9" />

    {/* Outer glow effect */}
    <circle
      cx="12"
      cy="12"
      r="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeOpacity="0.2"
    />
  </svg>
);

export const BookOpenIcon: React.FC<IconProps> = ({
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
    {/* Book pages */}
    <path
      d="M2 3h6a4 4 0 0 1 4 4v9a3 3 0 0 0-3-3H2V3zM22 3h-6a4 4 0 0 0-4 4v9a3 3 0 0 1 3-3h7V3z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* Book spine */}
    <path
      d="M12 7v9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Page content lines */}
    <path
      d="M4 8h3M4 10h3M4 12h2"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeOpacity="0.5"
    />
    <path
      d="M17 8h3M17 10h3M17 12h2"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeOpacity="0.5"
    />

    {/* Bookmark */}
    <path
      d="M12 3v4l1-1 1 1V3"
      fill="currentColor"
      fillOpacity="0.4"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({
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
    {/* Circle background */}
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Checkmark */}
    <path
      d="M8 12l2.5 2.5L16 9"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Inner circle */}
    <circle cx="12" cy="12" r="6" fill="currentColor" fillOpacity="0.1" />

    {/* Success glow */}
    <circle
      cx="12"
      cy="12"
      r="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeOpacity="0.3"
    />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({
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
    {/* Main sparkle */}
    <path
      d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* Small sparkles */}
    <path
      d="M6 6l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"
      fill="currentColor"
      fillOpacity="0.6"
    />
    <path
      d="M18 16l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"
      fill="currentColor"
      fillOpacity="0.6"
    />
    <path
      d="M18 4l0.5 1 1 0.5-1 0.5-0.5 1-0.5-1-1-0.5 1-0.5 0.5-1z"
      fill="currentColor"
      fillOpacity="0.5"
    />
    <path
      d="M6 18l0.5 1 1 0.5-1 0.5-0.5 1-0.5-1-1-0.5 1-0.5 0.5-1z"
      fill="currentColor"
      fillOpacity="0.5"
    />

    {/* Center highlight */}
    <circle cx="12" cy="10" r="1" fill="currentColor" fillOpacity="0.8" />
  </svg>
);

export const DocumentIcon: React.FC<IconProps> = ({
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
    {/* Document body */}
    <path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* Document corner */}
    <path
      d="M14 2v6h6"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Document content */}
    <path
      d="M8 12h8M8 16h8M8 8h2"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />

    {/* PDF indicator */}
    <rect
      x="16"
      y="16"
      width="6"
      height="6"
      rx="1"
      fill="currentColor"
      fillOpacity="0.4"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    <text
      x="19"
      y="20"
      fontSize="4"
      textAnchor="middle"
      fill="currentColor"
      fontWeight="bold"
    >
      PDF
    </text>
  </svg>
);

export const BullseyeIcon: React.FC<IconProps> = ({
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
    {/* Outer target ring */}
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Middle target ring */}
    <circle
      cx="12"
      cy="12"
      r="6"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.2"
    />

    {/* Inner target ring */}
    <circle
      cx="12"
      cy="12"
      r="3"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1"
    />

    {/* Center bullseye */}
    <circle cx="12" cy="12" r="1.5" fill="currentColor" fillOpacity="0.8" />

    {/* Crosshairs */}
    <path
      d="M12 3v4M12 17v4M3 12h4M17 12h4"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeOpacity="0.6"
    />

    {/* Target scoring areas */}
    <path
      d="M15 9l3-3M9 9L6 6M9 15l-3 3M15 15l3 3"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeOpacity="0.4"
    />
  </svg>
);

// ============================================================================
// ICONOS DE PASOS Y PROCESOS
// ============================================================================

export const PenIcon: React.FC<IconProps> = ({ className = "", size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Pen body */}
    <path
      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* Pen tip */}
    <path
      d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
      fill="currentColor"
      fillOpacity="0.4"
      stroke="currentColor"
      strokeWidth="1.2"
    />

    {/* Writing line */}
    <path
      d="M6 18L18 6"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeOpacity="0.5"
    />

    {/* Ink dots */}
    <circle cx="8" cy="16" r="0.5" fill="currentColor" fillOpacity="0.6" />
    <circle cx="10" cy="14" r="0.4" fill="currentColor" fillOpacity="0.5" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" fillOpacity="0.7" />
  </svg>
);

// ============================================================================
// EXPORTACIÓN DE TODOS LOS ICONOS
// ============================================================================

export const HomeIcons = {
  // Estadísticas
  Rocket: RocketIcon,
  Lightning: LightningIcon,
  Target: TargetIcon,
  Chart: ChartIcon,

  // Características
  Robot: RobotIcon,
  Paintbrush: PaintbrushIcon,
  Smartphone: SmartphoneIcon,
  Refresh: RefreshIcon,

  // Navegación y acciones
  Folder: FolderIcon,
  Play: PlayIcon,
  BookOpen: BookOpenIcon,
  CheckCircle: CheckCircleIcon,
  Sparkles: SparklesIcon,
  Document: DocumentIcon,
  Bullseye: BullseyeIcon,
  Pen: PenIcon,
} as const;

export type HomeIconType = keyof typeof HomeIcons;
