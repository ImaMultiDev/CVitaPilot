import React from "react";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

interface IconProps {
  className?: string;
  size?: number;
}

// Icono de Formato Visual - Paleta de colores
export const VisualFormatIcon: React.FC<IconProps> = ({ className = "" }) => (
  <ConfiguredIcon name="palette" className={`${className} w-6 h-6`} />
);

// Icono de Formato ATS - Robot/Sistema
export const ATSFormatIcon: React.FC<IconProps> = ({ className = "" }) => (
  <ConfiguredIcon name="bot" className={`${className} w-6 h-6`} />
);

// Icono de CV Activo - Documento con check
export const ActiveCVIcon: React.FC<IconProps> = ({ className = "" }) => (
  <ConfiguredIcon name="check-circle" className={`${className} w-6 h-6`} />
);

// Icono de Impresión
export const PrintIcon: React.FC<IconProps> = ({ className = "" }) => (
  <ConfiguredIcon name="printer" className={`${className} w-6 h-6`} />
);

// Icono de Teléfono
export const PhoneIcon: React.FC<IconProps> = ({ className = "" }) => (
  <ConfiguredIcon name="phone" className={`${className} w-6 h-6`} />
);

// Icono de Email
export const EmailIcon: React.FC<IconProps> = ({ className = "" }) => (
  <ConfiguredIcon name="mail" className={`${className} w-6 h-6`} />
);

// Icono de LinkedIn
export const LinkedInIcon: React.FC<IconProps> = ({ className = "" }) => (
  <ConfiguredIcon name="linkedin" className={`${className} w-6 h-6`} />
);

// Icono de GitHub
export const GitHubIcon: React.FC<IconProps> = ({ className = "" }) => (
  <ConfiguredIcon name="github" className={`${className} w-6 h-6`} />
);

// Icono de Website/Globe
export const WebsiteIcon: React.FC<IconProps> = ({ className = "" }) => (
  <ConfiguredIcon name="globe" className={`${className} w-6 h-6`} />
);

// Icono de Formato de CV (general)
export const CVFormatIcon: React.FC<IconProps> = ({ className = "" }) => (
  <ConfiguredIcon name="file-text" className={`${className} w-6 h-6`} />
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

// Icono de Zoom In
export const ZoomInIcon: React.FC<IconProps> = ({ className = "" }) => (
  <ConfiguredIcon name="zoom-in" className={`${className} w-6 h-6`} />
);

// Icono de Zoom Out
export const ZoomOutIcon: React.FC<IconProps> = ({ className = "" }) => (
  <ConfiguredIcon name="zoom-out" className={`${className} w-6 h-6`} />
);

// Icono de Zoom Reset
export const ZoomResetIcon: React.FC<IconProps> = ({ className = "" }) => (
  <ConfiguredIcon name="search" className={`${className} w-6 h-6`} />
);

export default CVPreviewIcons;
