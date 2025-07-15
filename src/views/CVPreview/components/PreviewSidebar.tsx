"use client";

import React, { useState } from "react";
import { FormatSelector } from "./FormatSelector";
import { ActiveCVIndicator } from "./ActiveCVIndicator";
import { PrintControls } from "./PrintControls";
import { ZoomControls } from "./ZoomControls";
import {
  VisualFormatIcon,
  ActiveCVIcon,
  PrintIcon,
  ZoomInIcon,
} from "./CVPreviewIcons";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";
import { CVFormat, CVData } from "@/types/cv";

interface PreviewSidebarProps {
  currentFormat: CVFormat;
  onFormatChange: (format: CVFormat) => void;
  currentCVName?: string;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  isMobile?: boolean;
  isTablet?: boolean;
  onClose?: () => void;
  cvData?: CVData; // Nuevo prop para datos del CV
}

export const PreviewSidebar: React.FC<PreviewSidebarProps> = ({
  currentFormat,
  onFormatChange,
  currentCVName,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  isMobile = false,
  isTablet = false,
  onClose,
  cvData,
}) => {
  const [activeSection, setActiveSection] = useState<string>("formato");

  const sections = [
    {
      id: "formato",
      name: "Formato del CV",
      description: "Selecciona entre formato visual o ATS",
      icon: VisualFormatIcon,
    },
    {
      id: "zoom",
      name: "Controles de Zoom",
      description: "Acerca y aleja la vista del CV",
      icon: ZoomInIcon,
    },
    {
      id: "impresion",
      name: "Exportar PDF",
      description: "Opciones para exportar CV como PDF",
      icon: PrintIcon,
    },
    {
      id: "configuracion",
      name: "Configuración",
      description: "Ajustes adicionales de vista previa",
      icon: ActiveCVIcon,
    },
  ];

  const currentSection = sections.find((s) => s.id === activeSection);

  const renderSectionContent = () => {
    switch (activeSection) {
      case "formato":
        return (
          <div className="space-y-2">
            <FormatSelector
              cvFormat={currentFormat}
              setCvFormat={onFormatChange}
            />
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                <ConfiguredIcon name="lightbulb" className="w-4 h-4" />
                Consejo
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {currentFormat === "visual"
                  ? "El formato visual es ideal para presentaciones y entrevistas donde el diseño importa."
                  : "El formato ATS está optimizado para sistemas de seguimiento de candidatos y aplicaciones en línea."}
              </p>
            </div>
          </div>
        );

      case "zoom":
        const initialZoom = isMobile ? 0.4 : isTablet ? 0.75 : 1.0; // Valores optimizados por dispositivo
        return (
          <ZoomControls
            zoomLevel={zoomLevel}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            onZoomReset={onZoomReset}
            minZoom={0.25} // Nuevo rango mínimo
            maxZoom={1.5} // Nuevo rango máximo
            initialZoom={initialZoom}
          />
        );

      case "impresion":
        return (
          <div className="space-y-2">
            <PrintControls cvData={cvData} currentFormat={currentFormat} />
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                <ConfiguredIcon name="info" className="w-4 h-4" />
                Formato de PDF
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                El CV se exporta como PDF optimizado para A4 con layout
                profesional de dos páginas.
              </p>
            </div>
          </div>
        );

      case "configuracion":
        return (
          <div className="space-y-2">
            <ActiveCVIndicator currentCVName={currentCVName} />
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                <ConfiguredIcon name="settings" className="w-4 h-4" />
                Configuración Adicional
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Vista previa en tiempo real
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Optimización A4
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Compatible con ATS
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="w-full overflow-hidden flex flex-col"
      style={{
        height: "calc(100vh - 64px)", // Restar la altura del navbar
        backgroundColor: "var(--sidebar-bg, #ffffff)",
        color: "var(--sidebar-text, #111827)",
      }}
    >
      <style jsx>{`
        :global(.dark) {
          --sidebar-bg: #111827;
          --sidebar-border: #374151;
          --sidebar-text: #f9fafb;
          --sidebar-text-secondary: #d1d5db;
          --sidebar-card-bg: #1f2937;
          --sidebar-hover-bg: #374151;
        }
        :global(:not(.dark)) {
          --sidebar-bg: #ffffff;
          --sidebar-border: #e5e7eb;
          --sidebar-text: #111827;
          --sidebar-text-secondary: #6b7280;
          --sidebar-card-bg: #f9fafb;
          --sidebar-hover-bg: #f3f4f6;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--sidebar-card-bg);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--sidebar-text-secondary);
          border-radius: 3px;
          opacity: 0.5;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          opacity: 0.8;
        }
      `}</style>

      {/* Header - Altura fija */}
      <div
        className="p-2 border-b flex-shrink-0"
        style={{
          backgroundColor: "var(--sidebar-bg)",
          borderBottomColor: "var(--sidebar-border)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <VisualFormatIcon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h2
              className="font-semibold text-sm"
              style={{ color: "var(--sidebar-text)" }}
            >
              Vista Previa del CV
            </h2>
            <p
              className="text-xs leading-tight"
              style={{ color: "var(--sidebar-text-secondary)" }}
            >
              {currentSection?.description}
            </p>
          </div>
          {/* Botón de cerrar */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Cerrar panel de vista previa"
              title="Cerrar"
            >
              <ConfiguredIcon
                name="x"
                className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              />
            </button>
          )}
        </div>

        {/* Información del CV */}
        <div className="space-y-2 mb-3">
          {/* CV Activo */}
          {currentCVName && (
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <p className="text-xs font-medium text-blue-800 dark:text-blue-200">
                  CV Activo: {currentCVName}
                </p>
              </div>
            </div>
          )}

          {/* Estado actual */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  currentFormat === "visual" ? "bg-blue-500" : "bg-green-500"
                }`}
              ></div>
              <span style={{ color: "var(--sidebar-text-secondary)" }}>
                Formato {currentFormat === "visual" ? "Visual" : "ATS"}
              </span>
            </div>

            {/* Indicador de zoom */}
            {(() => {
              const initialZoom = isMobile ? 0.4 : isTablet ? 0.75 : 1.0; // Valores actualizados
              return (
                Math.abs(zoomLevel - initialZoom) > 0.01 && (
                  <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded text-xs font-mono text-purple-700 dark:text-purple-300 flex items-center gap-1">
                    <ConfiguredIcon name="search" className="w-3 h-3" />
                    {Math.round(zoomLevel * 100)}%
                  </div>
                )
              );
            })()}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          className="flex gap-1 p-1 rounded-lg"
          style={{ backgroundColor: "var(--sidebar-card-bg)" }}
        >
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 flex items-center justify-center px-2 py-2 rounded-md transition-all duration-200 ${
                  activeSection === section.id ? "shadow-sm ring-1" : ""
                }`}
                style={{
                  backgroundColor:
                    activeSection === section.id
                      ? "var(--sidebar-bg)"
                      : "transparent",
                  color:
                    activeSection === section.id
                      ? "#3b82f6"
                      : "var(--sidebar-text-secondary)",
                  borderColor:
                    activeSection === section.id ? "#3b82f6" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== section.id) {
                    e.currentTarget.style.backgroundColor =
                      "var(--sidebar-hover-bg)";
                    e.currentTarget.style.color = "var(--sidebar-text)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== section.id) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color =
                      "var(--sidebar-text-secondary)";
                  }
                }}
                title={section.name}
              >
                <IconComponent className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Content - Área de scroll */}
      <div
        className="flex-1 overflow-y-auto p-2 custom-scrollbar"
        style={{
          backgroundColor: "var(--sidebar-bg)",
          minHeight: 0, // Importante para que flex-1 funcione correctamente
        }}
      >
        {renderSectionContent()}
      </div>

      {/* Footer - Altura fija */}
      <div
        className="p-2 border-t flex-shrink-0"
        style={{
          backgroundColor: "var(--sidebar-bg)",
          borderTopColor: "var(--sidebar-border)",
        }}
      >
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span style={{ color: "var(--sidebar-text-secondary)" }}>
              Vista previa en tiempo real
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="text-center">
            <p
              className="text-xs font-medium"
              style={{ color: "var(--sidebar-text-secondary)" }}
            >
              CVitaPilot - Vista Previa Profesional
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
