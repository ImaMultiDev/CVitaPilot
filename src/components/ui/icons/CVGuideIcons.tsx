import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

// 📚 Icono de guía/libro
export const GuideIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20V19.5C20 20.8807 18.8807 22 17.5 22H6.5C5.11929 22 4 20.8807 4 19.5Z"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <path
      d="M6.5 2H20V17H6.5C5.11929 17 4 18.1193 4 19.5V4.5C4 3.11929 5.11929 2 6.5 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 6H16M8 10H16M8 14H12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// 📋 Icono de tabla de contenidos/lista
export const TableOfContentsIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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
      d="M7 7H17M7 12H17M7 17H13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="5" cy="7" r="1" fill="currentColor" />
    <circle cx="5" cy="12" r="1" fill="currentColor" />
    <circle cx="5" cy="17" r="1" fill="currentColor" />
  </svg>
);

// 🏗️ Icono de estructura/arquitectura
export const StructureIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="3"
      y="3"
      width="7"
      height="4"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <rect
      x="14"
      y="3"
      width="7"
      height="4"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <rect
      x="3"
      y="10"
      width="7"
      height="4"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <rect
      x="14"
      y="10"
      width="7"
      height="4"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <rect
      x="8.5"
      y="17"
      width="7"
      height="4"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <path
      d="M6.5 7V10M17.5 7V10M10.5 14V17M15.5 14V17"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

// 🤖 Icono de ATS/robot
export const ATSIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="5"
      y="4"
      width="14"
      height="14"
      rx="3"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <circle cx="9" cy="9" r="1.5" fill="currentColor" />
    <circle cx="15" cy="9" r="1.5" fill="currentColor" />
    <path
      d="M8 13H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M9 2V4M15 2V4M9 18V20M15 18V20M3 9H5M19 9H21M3 15H5M19 15H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// ✉️ Icono de carta/email
export const LetterIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="2"
      y="6"
      width="20"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M2 8L12 14L22 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 💡 Icono de consejos/bombilla
export const TipsIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M9 21H15M12 3C8.68629 3 6 5.68629 6 9C6 11.1 7.1 12.99 8.5 14.1V16C8.5 17.1046 9.39543 18 10.5 18H13.5C14.6046 18 15.5 17.1046 15.5 16V14.1C16.9 12.99 18 11.1 18 9C18 5.68629 15.3137 3 12 3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.1"
    />
  </svg>
);

// 📍 Icono de información de contacto
export const ContactIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2C8.68629 2 6 4.68629 6 8C6 12.5 12 22 12 22C12 22 18 12.5 18 8C18 4.68629 15.3137 2 12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <circle
      cx="12"
      cy="8"
      r="3"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.2"
    />
  </svg>
);

// 💼 Icono de resumen profesional
export const ProfileIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="3"
      y="6"
      width="18"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <circle
      cx="8"
      cy="12"
      r="2"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <path
      d="M14 10H18M14 14H18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M7 3V6M17 3V6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// 🎯 Icono de experiencia/objetivo
export const ExperienceIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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
    <circle
      cx="12"
      cy="12"
      r="6"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

// 🎓 Icono de educación
export const EducationIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 3L2 9L12 15L22 9L12 3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M2 9V15C2 15 4 17 12 17C20 17 22 15 22 15V9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 12V16C7 16 8.5 17 12 17C15.5 17 17 16 17 16V12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 🎨 Icono de diseño
export const DesignIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
    <path
      d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// 🔍 Icono de escaneo/búsqueda
export const ScanIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle
      cx="11"
      cy="11"
      r="8"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M21 21L16.65 16.65"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 11H14M11 8V14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// 📊 Icono de clasificación/ranking
export const RankingIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="3"
      y="16"
      width="4"
      height="5"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <rect
      x="10"
      y="11"
      width="4"
      height="10"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.3"
    />
    <rect
      x="17"
      y="6"
      width="4"
      height="15"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.4"
    />
    <path
      d="M5 16V3M12 11V3M19 6V3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// 🔑 Icono de palabras clave
export const KeywordsIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M21 2L19 4L15 8L13 10L11.5 8.5C10.4 7.4 8.6 7.4 7.5 8.5L2 14L10 22L15.5 16.5C16.6 15.4 16.6 13.6 15.5 12.5L14 11L16 9L20 5L22 3L21 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <circle cx="7.5" cy="16.5" r="1.5" fill="currentColor" />
  </svg>
);

// ✅ Icono de checklist
export const ChecklistIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M9 12L11 14L15 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 8H21M3 16H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// 🚫 Icono de errores/prohibido
export const ErrorIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M15 9L9 15M9 9L15 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 🛠️ Icono de herramientas
export const ToolsIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M14.7 6.3C15.1 5.9 15.1 5.3 14.7 4.9C14.3 4.5 13.7 4.5 13.3 4.9L9.7 8.5C9.3 8.9 9.3 9.5 9.7 9.9C10.1 10.3 10.7 10.3 11.1 9.9L14.7 6.3Z"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <path
      d="M10.5 17.5L14.4 13.6C14.8 13.2 14.8 12.6 14.4 12.2C14 11.8 13.4 11.8 13 12.2L9.1 16.1C8.7 16.5 8.7 17.1 9.1 17.5C9.5 17.9 10.1 17.9 10.5 17.5Z"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <rect
      x="8"
      y="8"
      width="8"
      height="1.5"
      rx="0.75"
      transform="rotate(45 8 8)"
      fill="currentColor"
    />
    <rect
      x="8"
      y="16"
      width="8"
      height="1.5"
      rx="0.75"
      transform="rotate(45 8 16)"
      fill="currentColor"
    />
    <circle
      cx="6"
      cy="6"
      r="2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle
      cx="18"
      cy="18"
      r="2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

// ⚠️ Icono de advertencia
export const WarningIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2L22 20H2L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M12 9V13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
  </svg>
);

// 👩‍💼 Icono de persona profesional
export const ProfessionalIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle
      cx="12"
      cy="8"
      r="4"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="9"
      y="12"
      width="6"
      height="3"
      rx="1"
      fill="currentColor"
      fillOpacity="0.2"
    />
  </svg>
);

// 📊 Icono de estadísticas
export const StatsIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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
      fill="currentColor"
      fillOpacity="0.05"
    />
    <path
      d="M7 14L10 11L13 14L17 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="7" cy="14" r="1" fill="currentColor" />
    <circle cx="10" cy="11" r="1" fill="currentColor" />
    <circle cx="13" cy="14" r="1" fill="currentColor" />
    <circle cx="17" cy="10" r="1" fill="currentColor" />
  </svg>
);
