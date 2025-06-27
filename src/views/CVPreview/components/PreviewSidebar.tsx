"use client";

import React, { useState } from "react";
import { FormatSelector } from "./FormatSelector";
import { ActiveCVIndicator } from "./ActiveCVIndicator";
import { PrintControls } from "./PrintControls";
import { VisualFormatIcon, ActiveCVIcon, PrintIcon } from "./CVPreviewIcons";

interface PreviewSidebarProps {
  currentFormat: "visual" | "ats";
  onFormatChange: (format: "visual" | "ats") => void;
  currentCVName?: string;
}

export const PreviewSidebar: React.FC<PreviewSidebarProps> = ({
  currentFormat,
  onFormatChange,
  currentCVName,
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
      id: "impresion",
      name: "Controles de Impresión",
      description: "Opciones para imprimir y descargar",
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
          <div className="space-y-4">
            <FormatSelector
              cvFormat={currentFormat}
              setCvFormat={onFormatChange}
            />
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                💡 Consejo
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {currentFormat === "visual"
                  ? "El formato visual es ideal para presentaciones y entrevistas donde el diseño importa."
                  : "El formato ATS está optimizado para sistemas de seguimiento de candidatos y aplicaciones en línea."}
              </p>
            </div>
          </div>
        );

      case "impresion":
        return (
          <div className="space-y-4">
            <PrintControls
              handlePrintPage={(pageId, pageName) => {
                console.log(`Imprimiendo ${pageName} (${pageId})`);
                window.print();
              }}
            />
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                📄 Formato de Impresión
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                El CV está optimizado para papel A4. Asegúrate de seleccionar
                &quot;A4&quot; en las opciones de impresión de tu navegador.
              </p>
            </div>
          </div>
        );

      case "configuracion":
        return (
          <div className="space-y-4">
            <ActiveCVIndicator currentCVName={currentCVName} />
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                🔧 Configuración Adicional
              </h4>
              <div className="space-y-3">
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
      className="w-80 border-r h-screen overflow-hidden flex flex-col shadow-xl"
      style={{
        backgroundColor: "var(--sidebar-bg, #ffffff)",
        borderRightColor: "var(--sidebar-border, #e5e7eb)",
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

      {/* Header */}
      <div
        className="p-4 border-b"
        style={{
          backgroundColor: "var(--sidebar-bg)",
          borderBottomColor: "var(--sidebar-border)",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <VisualFormatIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2
              className="font-semibold"
              style={{ color: "var(--sidebar-text)" }}
            >
              Vista Previa
            </h2>
            <p
              className="text-xs"
              style={{ color: "var(--sidebar-text-secondary)" }}
            >
              {currentSection?.description}
            </p>
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
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
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
              >
                <IconComponent className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {section.name.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto p-4 custom-scrollbar"
        style={{ backgroundColor: "var(--sidebar-bg)" }}
      >
        {renderSectionContent()}
      </div>

      {/* Footer */}
      <div
        className="p-4 border-t"
        style={{
          backgroundColor: "var(--sidebar-bg)",
          borderTopColor: "var(--sidebar-border)",
        }}
      >
        <div className="text-center">
          <p
            className="text-xs"
            style={{ color: "var(--sidebar-text-secondary)" }}
          >
            CVitaPilot - Vista Previa Profesional
          </p>
        </div>
      </div>
    </div>
  );
};
