"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CVData } from "@/types/cv";
import {
  PreviewSidebar,
  CVVisualFormat,
  CVATSFormat,
  ResponsiveStyles,
} from "./components";

interface CVPreviewPrismaProps {
  cvData: CVData;
  currentCVName?: string;
}

export const CVPreviewPrisma: React.FC<CVPreviewPrismaProps> = ({
  cvData,
  currentCVName,
}) => {
  const [cvFormat, setCvFormat] = useState<"visual" | "ats">("visual");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isClient, setIsClient] = useState(false); // Para manejar hidratación SSR

  const [zoomLevel, setZoomLevel] = useState(1.0); // Valor inicial para desktop por defecto en SSR

  // Funciones de zoom memorizadas con rangos más amplios
  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 0.05, 1.5)); // Incrementos más pequeños
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 0.05, 0.25)); // Zoom mucho más pequeño
  }, []);

  const handleZoomReset = useCallback(() => {
    const resetZoom = isMobile ? 0.4 : isTablet ? 0.75 : 1.0; // Valores optimizados por dispositivo
    setZoomLevel(resetZoom);
  }, [isMobile, isTablet]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Detectar tamaño de pantalla y ajustar zoom inicial
  useEffect(() => {
    // Verificar que estamos en el cliente
    if (typeof window === "undefined") return;

    // Marcar como cliente montado
    setIsClient(true);

    const updateScreenSize = () => {
      const newIsMobile = window.innerWidth < 768;
      const newIsTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      setIsMobile(newIsMobile);
      setIsTablet(newIsTablet);

      // Solo ajustar zoom si es la primera carga o si cambió drásticamente el tipo de pantalla
      const currentType = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";
      const newType = newIsMobile
        ? "mobile"
        : newIsTablet
        ? "tablet"
        : "desktop";

      if (currentType !== newType) {
        const newZoom = newIsMobile ? 0.4 : newIsTablet ? 0.75 : 1.0; // Valores optimizados por dispositivo
        setZoomLevel(newZoom);
      }
    };

    // Ejecutar al montar
    updateScreenSize();

    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, [isMobile, isTablet]); // Agregar dependencias requeridas

  // Cerrar sidebar al hacer clic fuera o cambio de ruta + atajos de teclado para zoom
  useEffect(() => {
    // Verificar que estamos en el cliente
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        isSidebarOpen &&
        !target.closest(".sidebar-container") &&
        !target.closest("button[aria-label*='controles']")
      ) {
        setIsSidebarOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape para cerrar sidebar
      if (event.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
        return;
      }

      // Atajos de zoom (Ctrl + / Ctrl -)
      if (event.ctrlKey || event.metaKey) {
        if (event.key === "=" || event.key === "+") {
          event.preventDefault();
          handleZoomIn();
        } else if (event.key === "-") {
          event.preventDefault();
          handleZoomOut();
        } else if (event.key === "0") {
          event.preventDefault();
          handleZoomReset();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSidebarOpen, handleZoomIn, handleZoomOut, handleZoomReset]); // Agregar dependencias de funciones

  const renderCV = () => {
    if (cvFormat === "visual") {
      return <CVVisualFormat cvData={cvData} />;
    } else {
      return <CVATSFormat cvData={cvData} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar Universal - Overlay deslizante en todas las resoluciones */}
      {isSidebarOpen && (
        <>
          {/* Overlay de fondo */}
          <div
            className="no-print fixed inset-0 bg-black/50 z-[40] transition-opacity duration-300"
            onClick={closeSidebar}
            style={{ top: "64px" }} // Debajo del navbar
          />

          {/* Panel del Sidebar */}
          <div
            className="no-print sidebar-container fixed left-0 h-[calc(100vh-64px)] w-64 lg:w-72 z-[45] transform transition-transform duration-300 ease-out animate-in slide-in-from-left shadow-2xl dark:shadow-black/50"
            style={{
              top: "64px", // Debajo del navbar
              backgroundColor: "var(--sidebar-bg)",
              borderRight: "1px solid var(--sidebar-border)",
            }}
          >
            <style jsx>{`
              :global(.dark) {
                --sidebar-bg: #111827;
                --sidebar-border: #374151;
                --sidebar-text: #f9fafb;
                --sidebar-text-secondary: #d1d5db;
              }
              :global(:not(.dark)) {
                --sidebar-bg: #ffffff;
                --sidebar-border: #e5e7eb;
                --sidebar-text: #111827;
                --sidebar-text-secondary: #6b7280;
              }
            `}</style>
            <div
              className="h-full"
              style={{
                backgroundColor: "var(--sidebar-bg)",
                color: "var(--sidebar-text)",
              }}
            >
              <PreviewSidebar
                currentFormat={cvFormat}
                onFormatChange={setCvFormat}
                currentCVName={currentCVName}
                zoomLevel={zoomLevel}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onZoomReset={handleZoomReset}
                isMobile={isClient ? isMobile : false}
                isTablet={isClient ? isTablet : false}
              />
            </div>
          </div>
        </>
      )}

      {/* Botón flotante para controles - Universal */}
      <button
        onClick={isSidebarOpen ? closeSidebar : toggleSidebar}
        className={`no-print fixed top-20 left-4 z-[50] p-3 lg:p-4 text-white rounded-full border-2 transition-all duration-300 hover:scale-110 active:scale-95 ${
          isSidebarOpen
            ? "border-red-300/50 shadow-2xl ring-4 ring-red-500/30 hover:ring-red-500/50 opacity-70 hover:opacity-90"
            : "border-white/30 dark:border-white/20 shadow-xl hover:shadow-2xl hover:border-white/50 dark:hover:border-white/40 ring-4 ring-purple-500/20 hover:ring-purple-500/40 animate-pulse hover:animate-none opacity-80 hover:opacity-100"
        }`}
        aria-label={
          isSidebarOpen
            ? "Cerrar controles de vista previa"
            : "Abrir controles de vista previa"
        }
        style={{
          boxShadow: isSidebarOpen
            ? "0 15px 35px rgba(239, 68, 68, 0.4), 0 6px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
            : "0 10px 25px rgba(147, 51, 234, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          background: isSidebarOpen
            ? "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)"
            : "linear-gradient(135deg, #9333ea 0%, #7c3aed 50%, #6d28d9 100%)",
        }}
      >
        {isSidebarOpen ? (
          // X para cerrar
          <svg
            className="w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          // Icono de controles
          <svg
            className="w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
            />
          </svg>
        )}
      </button>

      {/* Contenido principal - Solo CV Canvas */}
      <div className="min-h-screen">
        {/* CV Content - Completamente optimizado para móvil y desktop */}
        <div className="w-full min-h-screen overflow-y-auto">
          <ResponsiveStyles />

          {/* Contenedor responsive del CV - Optimizado para móvil */}
          <div
            className={`w-full min-h-screen flex ${
              isClient && isMobile ? "justify-start" : "justify-center"
            }`}
            style={{
              // En móvil: sin padding, CV desde borde izquierdo
              // En desktop: padding para centrado
              padding: isClient && isMobile ? "0" : "1rem 2rem",
            }}
          >
            <div
              className="cv-zoom-container transition-transform duration-200 ease-out"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin:
                  isClient && isMobile
                    ? "top left" // Móvil: origen en esquina superior izquierda
                    : "top center", // Desktop: origen en centro superior

                // Espaciado dinámico para zoom
                marginBottom:
                  zoomLevel > 1 ? `${(zoomLevel - 1) * 60}vh` : "1rem",
                marginTop: "0",

                // Ancho optimizado: en móvil usa todo el viewport
                width: isClient && isMobile ? "100vw" : "auto",

                // Alineación perfecta
                display: "flex",
                flexDirection: "column",
                alignItems: isClient && isMobile ? "flex-start" : "center",
              }}
            >
              <div
                style={{
                  width: isClient && isMobile ? "100%" : "auto", // Móvil: CV usa todo el ancho disponible
                  maxWidth: isClient && isMobile ? "none" : "100%", // Móvil: sin límite de ancho máximo
                  minWidth: isClient && isMobile ? "100%" : "auto", // Móvil: forzar ancho completo
                }}
              >
                {renderCV()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
