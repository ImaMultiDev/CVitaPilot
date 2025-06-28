import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

// Icono de Formato Visual - Paleta de colores
export const VisualFormatIcon: React.FC<IconProps> = ({
  className = "",
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
      fill="currentColor"
    />
    <path
      d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z"
      fill="currentColor"
    />
    <path
      d="M5 15L5.5 17.5L8 18L5.5 18.5L5 21L4.5 18.5L2 18L4.5 17.5L5 15Z"
      fill="currentColor"
    />
  </svg>
);

// Icono de Formato ATS - Robot/Sistema
export const ATSFormatIcon: React.FC<IconProps> = ({
  className = "",
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <rect
      x="4"
      y="4"
      width="16"
      height="16"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
    <circle cx="15.5" cy="9.5" r="1.5" fill="currentColor" />
    <path
      d="M9 16h6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M2 8h2M20 8h2M2 16h2M20 16h2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Icono de CV Activo - Documento con check
export const ActiveCVIcon: React.FC<IconProps> = ({
  className = "",
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" fill="none" />
    <path
      d="M9 15L11 17L15 13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Icono de Impresión
export const PrintIcon: React.FC<IconProps> = ({
  className = "",
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M6 9V2H18V9"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 18H4C2.9 18 2 17.1 2 16V11C2 9.9 2.9 9 4 9H20C21.1 9 22 9.9 22 11V16C22 17.1 21.1 18 20 18H18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 14H6V22H18V14Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Icono de Teléfono
export const PhoneIcon: React.FC<IconProps> = ({
  className = "",
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21C10.4 21 2 12.6 2 2.08C2 1.48 2.48 1 3.08 1H6.08C6.68 1 7.16 1.48 7.16 2.08C7.16 3.68 7.44 5.2 7.96 6.6C8.12 7 7.96 7.44 7.64 7.72L6.12 9.24C7.56 12.04 9.96 14.44 12.76 15.88L14.28 14.36C14.56 14.04 15 13.88 15.4 14.04C16.8 14.56 18.32 14.84 19.92 14.84C20.52 14.84 21 15.32 21 15.92V16.92H22Z"
      fill="currentColor"
    />
  </svg>
);

// Icono de Email
export const EmailIcon: React.FC<IconProps> = ({
  className = "",
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M22 6L12 13L2 6"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

// Icono de LinkedIn
export const LinkedInIcon: React.FC<IconProps> = ({
  className = "",
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M16 8C18.2 8 20 9.8 20 12V21H16V12C16 11.4 15.6 11 15 11C14.4 11 14 11.4 14 12V21H10V12C10 9.8 11.8 8 14 8H16Z"
      fill="currentColor"
    />
    <rect x="2" y="9" width="4" height="12" fill="currentColor" />
    <circle cx="4" cy="4" r="2" fill="currentColor" />
  </svg>
);

// Icono de GitHub
export const GitHubIcon: React.FC<IconProps> = ({
  className = "",
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.55C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.7 3.75 17.415C3.33 17.19 2.73 16.605 3.735 16.59C4.68 16.575 5.355 17.49 5.58 17.85C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z"
      fill="currentColor"
    />
  </svg>
);

// Icono de Website/Globe
export const WebsiteIcon: React.FC<IconProps> = ({
  className = "",
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path d="M2 12H22" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 2C14.5 4.5 15.5 7.5 15.5 12S14.5 19.5 12 22C9.5 19.5 8.5 16.5 8.5 12S9.5 4.5 12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

// Icono de Formato de CV (general)
export const CVFormatIcon: React.FC<IconProps> = ({
  className = "",
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M8 7H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 11H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 15H12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="16" cy="16" r="2" fill="currentColor" />
  </svg>
);

// Exportar todos los iconos como objeto por defecto
const CVPreviewIcons = {
  VisualFormatIcon,
  ATSFormatIcon,
  ActiveCVIcon,
  PrintIcon,
  PhoneIcon,
  EmailIcon,
  LinkedInIcon,
  GitHubIcon,
  WebsiteIcon,
  CVFormatIcon,
};

export const ZoomInIcon = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
    />
  </svg>
);

export const ZoomOutIcon = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
    />
  </svg>
);

export const ZoomResetIcon = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM9 12l2 2 4-4"
    />
  </svg>
);

export default CVPreviewIcons;
