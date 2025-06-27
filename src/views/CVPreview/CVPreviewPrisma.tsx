"use client";

import React, { useState, useEffect } from "react";
import { CVData } from "@/types/cv";
import { PreviewSidebar } from "./components";

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Cerrar sidebar automáticamente cuando la pantalla se hace más grande
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        // xl breakpoint
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderCV = () => {
    if (cvFormat === "visual") {
      return (
        <div className="cv-container visual-format">
          <style jsx>{`
            .cv-container {
              color-scheme: light !important;
              background: white !important;
            }
            .cv-container * {
              color-scheme: light !important;
            }
          `}</style>

          {/* Página 1 - Visual */}
          <div
            id="cv-page-1"
            className="cv-page bg-white shadow-2xl mx-auto mb-8 overflow-hidden"
            style={{
              width: "210mm",
              minHeight: "297mm",
              maxWidth: "210mm",
              fontSize: "0.85em",
            }}
          >
            <div className="flex h-full">
              {/* Sidebar */}
              <div
                className="sidebar-section flex-shrink-0 text-white p-6"
                style={{
                  width: "33.333%",
                  background:
                    "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
                  padding: "calc(20mm * 0.85)",
                }}
              >
                {/* Datos Personales */}
                <div className="mb-8">
                  <div
                    className="text-center p-4 rounded-lg mb-6"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <h1 className="text-2xl font-bold mb-2 text-white">
                      {cvData.personalInfo?.name || "Nombre Completo"}
                    </h1>
                    <p className="text-cyan-200 font-medium">
                      {cvData.personalInfo?.position || "Título Profesional"}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {cvData.personalInfo?.phone && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm">📞</span>
                        </div>
                        <span className="text-gray-200 text-sm">
                          {cvData.personalInfo.phone}
                        </span>
                      </div>
                    )}
                    {cvData.personalInfo?.email && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm">✉️</span>
                        </div>
                        <span className="text-gray-200 text-sm break-all">
                          {cvData.personalInfo.email}
                        </span>
                      </div>
                    )}
                    {cvData.personalInfo?.linkedin && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm">💼</span>
                        </div>
                        <span className="text-gray-200 text-sm break-all">
                          {cvData.personalInfo.linkedin}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Especialización */}
                <div className="mb-8">
                  <h3
                    className="text-lg font-bold mb-4 pb-2 text-white"
                    style={{
                      borderBottom: "2px solid #06b6d4",
                    }}
                  >
                    Especialización
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-cyan-200 font-semibold mb-2">
                        Lenguajes de Programación:
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {cvData.skills
                          ?.filter((skill) => skill.selected)
                          .slice(0, 3)
                          .map((skill) => skill.name)
                          .join(", ") || "Java"}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-cyan-200 font-semibold mb-2">
                        Herramientas:
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {cvData.skills
                          ?.filter((skill) => skill.selected)
                          .slice(3, 6)
                          .map((skill) => skill.name)
                          .join(", ") || "Git"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Idiomas */}
                {cvData.languages && cvData.languages.length > 0 && (
                  <div className="mb-8">
                    <h3
                      className="text-lg font-bold mb-4 pb-2 text-white"
                      style={{
                        borderBottom: "2px solid #06b6d4",
                      }}
                    >
                      Idiomas
                    </h3>
                    <div className="space-y-2">
                      {cvData.languages.slice(0, 3).map((language, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-200 text-sm">
                            {language.name}
                          </span>
                          <span className="text-cyan-200 text-sm">
                            {language.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contenido Principal */}
              <div
                className="main-content flex-1 p-6 text-gray-800"
                style={{
                  padding: "calc(20mm * 0.85)",
                  color: "#374151 !important",
                }}
              >
                {/* Experiencia Laboral */}
                <div className="mb-8">
                  <h2
                    className="text-xl font-bold mb-6 pb-2"
                    style={{
                      color: "#374151 !important",
                      borderBottom: "2px solid #06b6d4",
                    }}
                  >
                    Experiencia Laboral
                  </h2>
                  {cvData.experiences
                    ?.filter((exp) => exp.selected)
                    .slice(0, 2)
                    .map((experience, index) => (
                      <div key={index} className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3
                            className="text-lg font-semibold"
                            style={{ color: "#374151 !important" }}
                          >
                            {experience.position}
                          </h3>
                          <span
                            className="text-sm font-medium px-3 py-1 rounded-full"
                            style={{
                              background: "#e0f2fe",
                              color: "#0891b2 !important",
                            }}
                          >
                            ({experience.contractType},{" "}
                            {experience.workSchedule}, {experience.workModality}
                            )
                          </span>
                        </div>
                        <div className="mb-2">
                          <h4
                            className="font-medium"
                            style={{ color: "#374151 !important" }}
                          >
                            {experience.company}
                          </h4>
                          <p
                            className="text-sm"
                            style={{ color: "#6b7280 !important" }}
                          >
                            {experience.startDate} - {experience.endDate} /{" "}
                            {experience.location}
                          </p>
                        </div>
                        {experience.technologies &&
                          experience.technologies.length > 0 && (
                            <p
                              className="text-sm mb-2"
                              style={{ color: "#374151 !important" }}
                            >
                              <strong>Tecnologías:</strong>{" "}
                              {experience.technologies.join(", ")}
                            </p>
                          )}
                        {experience.description && (
                          <p
                            className="text-sm"
                            style={{ color: "#374151 !important" }}
                          >
                            <strong>Descripción:</strong>{" "}
                            {experience.description}
                          </p>
                        )}
                      </div>
                    )) || (
                    <div className="mb-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3
                          className="text-lg font-semibold"
                          style={{ color: "#374151 !important" }}
                        >
                          Puesto de prueba
                        </h3>
                        <span
                          className="text-sm font-medium px-3 py-1 rounded-full"
                          style={{
                            background: "#e0f2fe",
                            color: "#0891b2 !important",
                          }}
                        >
                          (Contrato indefinido, Jornada completa, Presencial)
                        </span>
                      </div>
                      <div className="mb-2">
                        <h4
                          className="font-medium"
                          style={{ color: "#374151 !important" }}
                        >
                          Empresa de prueba
                        </h4>
                        <p
                          className="text-sm"
                          style={{ color: "#6b7280 !important" }}
                        >
                          2020-01-01 - 2020-01-01 / Madrid
                        </p>
                      </div>
                      <p
                        className="text-sm mb-2"
                        style={{ color: "#374151 !important" }}
                      >
                        <strong>Next.js</strong>
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "#374151 !important" }}
                      >
                        <strong>Tecnologías:</strong> React
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Página 2 - Visual */}
          <div
            id="cv-page-2"
            className="cv-page bg-white shadow-2xl mx-auto overflow-hidden"
            style={{
              width: "210mm",
              minHeight: "297mm",
              maxWidth: "210mm",
              fontSize: "0.85em",
            }}
          >
            <div className="flex flex-col h-full">
              <div
                className="flex-1 p-6 text-gray-800"
                style={{
                  padding: "calc(20mm * 0.85)",
                  color: "#374151 !important",
                }}
              >
                {/* Formación */}
                {cvData.education && cvData.education.length > 0 && (
                  <div className="mb-8">
                    <h2
                      className="text-xl font-bold mb-6 pb-2"
                      style={{
                        color: "#374151 !important",
                        borderBottom: "2px solid #06b6d4",
                      }}
                    >
                      Formación
                    </h2>
                    {cvData.education
                      .filter((edu) => edu.selected)
                      .map((education, index) => (
                        <div key={index} className="mb-4">
                          <h3
                            className="text-lg font-semibold"
                            style={{ color: "#374151 !important" }}
                          >
                            {education.title}
                          </h3>
                          <p
                            className="text-sm"
                            style={{ color: "#6b7280 !important" }}
                          >
                            {education.institution} • {education.startYear} -{" "}
                            {education.endYear}
                          </p>
                        </div>
                      ))}
                  </div>
                )}

                {/* Habilidades Adicionales */}
                {cvData.skills && cvData.skills.length > 6 && (
                  <div className="mb-8">
                    <h2
                      className="text-xl font-bold mb-6 pb-2"
                      style={{
                        color: "#374151 !important",
                        borderBottom: "2px solid #06b6d4",
                      }}
                    >
                      Habilidades Adicionales
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {cvData.skills
                        .filter((skill) => skill.selected)
                        .slice(6)
                        .map((skill, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                            <span
                              className="text-sm"
                              style={{ color: "#374151 !important" }}
                            >
                              {skill.name}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div
                className="cv-footer p-4 text-center"
                style={{
                  background: "#f3f4f6",
                  borderTop: "1px solid #e5e7eb",
                }}
              >
                <p className="text-xs" style={{ color: "#6b7280 !important" }}>
                  {cvData.personalInfo?.name || "Nombre Completo"} - CV
                  Profesional - Página 2
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Formato ATS
      return (
        <div className="cv-container ats-format">
          <style jsx>{`
            .cv-container {
              color-scheme: light !important;
              background: white !important;
            }
            .cv-container * {
              color-scheme: light !important;
              color: #000000 !important;
            }
          `}</style>

          <div
            id="cv-page-1"
            className="cv-page bg-white shadow-2xl mx-auto mb-8 overflow-hidden"
            style={{
              width: "210mm",
              minHeight: "297mm",
              maxWidth: "210mm",
              fontSize: "0.75em",
              padding: "calc(12mm * 0.75)",
              color: "#000000 !important",
            }}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h1
                className="text-2xl font-bold mb-2"
                style={{ color: "#000000 !important" }}
              >
                {cvData.personalInfo?.name || "Nombre Completo"}
              </h1>
              <p
                className="text-lg mb-4"
                style={{ color: "#000000 !important" }}
              >
                {cvData.personalInfo?.position || "Título Profesional"}
              </p>
              <div className="flex justify-center gap-4 text-sm">
                {cvData.personalInfo?.phone && (
                  <span style={{ color: "#000000 !important" }}>
                    Teléfono: {cvData.personalInfo.phone}
                  </span>
                )}
                {cvData.personalInfo?.email && (
                  <span style={{ color: "#000000 !important" }}>
                    Email: {cvData.personalInfo.email}
                  </span>
                )}
              </div>
            </div>

            {/* Experiencia */}
            <div className="mb-6">
              <h2
                className="text-xl font-bold mb-4 pb-1 border-b border-black"
                style={{ color: "#000000 !important" }}
              >
                EXPERIENCIA LABORAL
              </h2>
              {cvData.experiences
                ?.filter((exp) => exp.selected)
                .map((experience, index) => (
                  <div key={index} className="mb-4">
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: "#000000 !important" }}
                    >
                      {experience.position}
                    </h3>
                    <p
                      className="font-medium"
                      style={{ color: "#000000 !important" }}
                    >
                      {experience.company}
                    </p>
                    <p
                      className="text-sm mb-2"
                      style={{ color: "#000000 !important" }}
                    >
                      {experience.startDate} - {experience.endDate} |{" "}
                      {experience.location}
                    </p>
                    {experience.technologies &&
                      experience.technologies.length > 0 && (
                        <p
                          className="text-sm"
                          style={{ color: "#000000 !important" }}
                        >
                          Tecnologías: {experience.technologies.join(", ")}
                        </p>
                      )}
                  </div>
                )) || (
                <div className="mb-4">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "#000000 !important" }}
                  >
                    Puesto de prueba
                  </h3>
                  <p
                    className="font-medium"
                    style={{ color: "#000000 !important" }}
                  >
                    Empresa de prueba
                  </p>
                  <p
                    className="text-sm mb-2"
                    style={{ color: "#000000 !important" }}
                  >
                    2020-01-01 - 2020-01-01 | Madrid
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "#000000 !important" }}
                  >
                    Tecnologías: React
                  </p>
                </div>
              )}
            </div>

            {/* Habilidades */}
            {cvData.skills && cvData.skills.length > 0 && (
              <div className="mb-6">
                <h2
                  className="text-xl font-bold mb-4 pb-1 border-b border-black"
                  style={{ color: "#000000 !important" }}
                >
                  HABILIDADES
                </h2>
                <p style={{ color: "#000000 !important" }}>
                  {cvData.skills
                    .filter((skill) => skill.selected)
                    .map((skill) => skill.name)
                    .join(", ")}
                </p>
              </div>
            )}

            {/* Formación */}
            {cvData.education && cvData.education.length > 0 && (
              <div className="mb-6">
                <h2
                  className="text-xl font-bold mb-4 pb-1 border-b border-black"
                  style={{ color: "#000000 !important" }}
                >
                  FORMACIÓN
                </h2>
                {cvData.education
                  .filter((edu) => edu.selected)
                  .map((education, index) => (
                    <div key={index} className="mb-2">
                      <h3
                        className="font-semibold"
                        style={{ color: "#000000 !important" }}
                      >
                        {education.title}
                      </h3>
                      <p style={{ color: "#000000 !important" }}>
                        {education.institution} | {education.startYear} -{" "}
                        {education.endYear}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar Desktop - Solo visible en xl+ (1280px+) */}
      <div className="hidden xl:block fixed left-0 top-16 h-[calc(100vh-4rem)] z-40">
        <PreviewSidebar
          currentFormat={cvFormat}
          onFormatChange={setCvFormat}
          currentCVName={currentCVName}
        />
      </div>

      {/* Sidebar Mobile/Tablet - Overlay deslizante */}
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="xl:hidden fixed inset-0 bg-black/50 z-[40] transition-opacity duration-300"
            onClick={closeSidebar}
            style={{ top: "64px" }} // Debajo del navbar
          />

          {/* Sidebar Panel */}
          <div
            className="xl:hidden fixed left-0 h-[calc(100vh-64px)] w-80 z-[45] transform transition-transform duration-300 ease-out animate-in slide-in-from-left shadow-2xl dark:shadow-black/50"
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
              />
            </div>
          </div>
        </>
      )}

      {/* Botón flotante para abrir sidebar en mobile/tablet */}
      <button
        onClick={isSidebarOpen ? closeSidebar : toggleSidebar}
        className={`xl:hidden fixed top-20 left-4 z-[50] p-2 md:p-3 text-white rounded-full border-2 transition-all duration-300 hover:scale-110 active:scale-95 ${
          isSidebarOpen
            ? "border-red-300/50 shadow-2xl ring-4 ring-red-500/30 hover:ring-red-500/50"
            : "border-white/30 dark:border-white/20 shadow-xl hover:shadow-2xl hover:border-white/50 dark:hover:border-white/40 ring-4 ring-purple-500/20 hover:ring-purple-500/40 animate-pulse hover:animate-none"
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
            className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300"
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
          // Ojo para abrir
          <svg
            className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        )}
      </button>

      {/* Contenido principal - CV */}
      <div className="xl:ml-80 min-h-screen">
        <div className="container mx-auto px-4 py-6">
          {/* Header móvil */}
          <div className="xl:hidden mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Vista Previa del CV
            </h1>
            {currentCVName && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3 mb-3 mx-4">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  <span className="font-semibold">CV Activo:</span>{" "}
                  {currentCVName}
                </p>
              </div>
            )}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div
                className={`w-2 h-2 rounded-full ${
                  cvFormat === "visual" ? "bg-blue-500" : "bg-green-500"
                }`}
              ></div>
              <span>Formato {cvFormat === "visual" ? "Visual" : "ATS"}</span>
            </div>
          </div>

          {/* CV Content */}
          <div className="flex justify-center">
            <style jsx>{`
              /* Estilos responsive estilo Canva */
              @media (max-width: 1279px) {
                .cv-container {
                  width: 100% !important;
                  max-width: 100% !important;
                  margin: 0 !important;
                  transform: scale(0.95);
                  transform-origin: top center;
                }

                .cv-page {
                  width: 100% !important;
                  max-width: 100vw !important;
                  margin: 0 auto 2rem auto !important;
                  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
                }
              }

              @media (max-width: 768px) {
                .cv-container {
                  transform: scale(0.85);
                  margin: 0 -2rem !important;
                }

                .cv-page {
                  font-size: 0.7em !important;
                }

                .sidebar-section {
                  padding: calc(15mm * 0.7) !important;
                }

                .main-content {
                  padding: calc(15mm * 0.7) !important;
                }
              }

              @media (max-width: 480px) {
                .cv-container {
                  transform: scale(0.75);
                  margin: 0 -3rem !important;
                }

                .cv-page {
                  font-size: 0.65em !important;
                }

                .sidebar-section {
                  padding: calc(12mm * 0.65) !important;
                }

                .main-content {
                  padding: calc(12mm * 0.65) !important;
                }
              }

              /* Asegurar que el CV siempre mantenga proporciones A4 */
              .cv-page {
                aspect-ratio: 210 / 297;
                min-height: auto !important;
              }
            `}</style>
            {renderCV()}
          </div>
        </div>
      </div>
    </div>
  );
};
