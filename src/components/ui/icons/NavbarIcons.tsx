import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

export const HomeIcon: React.FC<IconProps> = ({
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
    <path
      d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M9 22V12h6v10"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="8" r="1" fill="currentColor" fillOpacity="0.6" />
    <path
      d="M7 15h2M15 15h2M7 18h2M15 18h2"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <circle cx="20" cy="7" r="1.5" fill="currentColor" fillOpacity="0.8" />
  </svg>
);

export const EditorIcon: React.FC<IconProps> = ({
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
    <path
      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
      fill="currentColor"
      fillOpacity="0.9"
    />
    <path
      d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
      fill="currentColor"
    />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" fillOpacity="0.6" />
  </svg>
);

export const FilesIcon: React.FC<IconProps> = ({
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
    <path
      d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M14 2v6h6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 13h8M8 17h8M8 9h2"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="16" cy="6" r="2" fill="currentColor" fillOpacity="0.8" />
  </svg>
);

export const PreviewIcon: React.FC<IconProps> = ({
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
    <path
      d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <path
      d="M15 9l2-2M9 9L7 7"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      fillOpacity="0.6"
    />
  </svg>
);

export const GuideIcon: React.FC<IconProps> = ({
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
    <path
      d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 8h8M8 12h6M8 16h4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="17" cy="7" r="1.5" fill="currentColor" fillOpacity="0.8" />
    <path d="M16 10l2-1.5L16 7" fill="currentColor" fillOpacity="0.6" />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({
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
    <path
      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

export const ThemeIcon: React.FC<IconProps> = ({
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
    <circle
      cx="12"
      cy="12"
      r="8"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M12 4a8 8 0 0 0 0 16V4z" fill="currentColor" fillOpacity="0.3" />
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.6" />
    <path
      d="M8 8l1.5 1.5M16 8l-1.5 1.5M8 16l1.5-1.5M16 16l-1.5-1.5"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

export const LogoutIcon: React.FC<IconProps> = ({
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
    <path
      d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="16,17 21,12 16,7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <line
      x1="21"
      y1="12"
      x2="9"
      y2="12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="18" cy="12" r="1" fill="currentColor" />
  </svg>
);

export const LightModeIcon: React.FC<IconProps> = ({
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
    {/* Sol central */}
    <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.9" />

    {/* Rayos exteriores */}
    <path
      d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Círculo brillante interior */}
    <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.6" />

    {/* Detalles decorativos */}
    <circle cx="12" cy="8" r="0.5" fill="currentColor" fillOpacity="0.4" />
    <circle cx="12" cy="16" r="0.5" fill="currentColor" fillOpacity="0.4" />
    <circle cx="8" cy="12" r="0.5" fill="currentColor" fillOpacity="0.4" />
    <circle cx="16" cy="12" r="0.5" fill="currentColor" fillOpacity="0.4" />
  </svg>
);

export const DarkModeIcon: React.FC<IconProps> = ({
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
    {/* Luna principal */}
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      fill="currentColor"
      fillOpacity="0.9"
    />

    {/* Cráteres de la luna */}
    <circle cx="15" cy="9" r="1" fill="currentColor" fillOpacity="0.3" />
    <circle cx="17" cy="13" r="0.7" fill="currentColor" fillOpacity="0.4" />
    <circle cx="14" cy="15" r="0.5" fill="currentColor" fillOpacity="0.5" />

    {/* Estrellas decorativas */}
    <path
      d="M6 3l0.5 1.5L8 5l-1.5 0.5L6 7l-0.5-1.5L4 5l1.5-0.5L6 3z"
      fill="currentColor"
      fillOpacity="0.6"
    />
    <path
      d="M19 6l0.3 0.9L20.2 7l-0.9 0.3L19 8.2l-0.3-0.9L17.8 7l0.9-0.3L19 6z"
      fill="currentColor"
      fillOpacity="0.7"
    />
    <path
      d="M4 16l0.3 0.9L5.2 17l-0.9 0.3L4 18.2l-0.3-0.9L2.8 17l0.9-0.3L4 16z"
      fill="currentColor"
      fillOpacity="0.5"
    />

    {/* Resplandor sutil */}
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeOpacity="0.3"
      fill="none"
    />
  </svg>
);

export const SystemModeIcon: React.FC<IconProps> = ({
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
    {/* Monitor/Pantalla */}
    <rect
      x="3"
      y="4"
      width="18"
      height="12"
      rx="2"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Base del monitor */}
    <path
      d="M8 21h8M12 17v4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Mitad sol/luna dentro de la pantalla */}
    <circle cx="12" cy="10" r="3" fill="currentColor" fillOpacity="0.2" />

    {/* Lado del sol */}
    <path
      d="M9 10a3 3 0 0 1 3-3v6a3 3 0 0 1-3-3z"
      fill="currentColor"
      fillOpacity="0.6"
    />

    {/* Rayos del sol (lado izquierdo) */}
    <path
      d="M12 6v1M7 10h1M9.5 7.5l0.7 0.7"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeOpacity="0.7"
    />

    {/* Estrellas pequeñas (lado derecho) */}
    <circle cx="15" cy="8" r="0.3" fill="currentColor" fillOpacity="0.6" />
    <circle cx="16" cy="12" r="0.3" fill="currentColor" fillOpacity="0.5" />
    <circle cx="14" cy="12.5" r="0.2" fill="currentColor" fillOpacity="0.7" />

    {/* Indicador de auto */}
    <circle
      cx="19"
      cy="6"
      r="1.5"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="0.5"
    />
    <path d="M18.5 6h1" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

// Objeto con todos los iconos para fácil acceso
export const NavbarIcons = {
  Home: HomeIcon,
  Editor: EditorIcon,
  Files: FilesIcon,
  Preview: PreviewIcon,
  Guide: GuideIcon,
  Settings: SettingsIcon,
  Theme: ThemeIcon,
  Logout: LogoutIcon,
  LightMode: LightModeIcon,
  DarkMode: DarkModeIcon,
  SystemMode: SystemModeIcon,
} as const;

export type NavbarIconType = keyof typeof NavbarIcons;
