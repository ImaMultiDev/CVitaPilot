"use client";

import { Button } from "@/components/ui/Button";
import { CVData } from "@/types/cv";
import { useState } from "react";

interface CVPreviewPrismaProps {
  cvData: CVData;
  currentCVName?: string | null;
}

type CVFormat = "visual" | "ats";

export const CVPreviewPrisma: React.FC<CVPreviewPrismaProps> = ({
  cvData,
  currentCVName,
}) => {
  // Estado para el formato del CV
  const [cvFormat, setCvFormat] = useState<CVFormat>("visual");
  // Helper function for printing individual pages (CORREGIDO)
  const handlePrintPage = (pageId: string, pageName: string) => {
    // Obtener referencias a las páginas
    const page1 = document.getElementById("cv-page-1");
    const page2 = document.getElementById("cv-page-2");
    const targetPage = document.getElementById(pageId);

    if (!targetPage) return;

    // Guardar estados originales
    const originalDisplay1 = page1?.style.display || "";
    const originalDisplay2 = page2?.style.display || "";
    const originalVisibility1 = page1?.style.visibility || "";
    const originalVisibility2 = page2?.style.visibility || "";

    // Agregar clase temporal para identificar qué página imprimir
    document.body.classList.add(`print-only-${pageId}`);

    // Aplicar estilos específicos para la página a imprimir
    if (pageId === "cv-page-1") {
      // Mostrar solo página 1
      if (page1) {
        page1.style.display = "block";
        page1.style.visibility = "visible";
      }
      if (page2) {
        page2.style.display = "none";
        page2.style.visibility = "hidden";
      }
    } else if (pageId === "cv-page-2") {
      // Mostrar solo página 2
      if (page1) {
        page1.style.display = "none";
        page1.style.visibility = "hidden";
      }
      if (page2) {
        page2.style.display = "block";
        page2.style.visibility = "visible";
      }
    }

    // Configurar título
    const originalTitle = document.title;
    document.title = `CV_${cvData.personalInfo.name.replace(
      /\s+/g,
      "_"
    )}_${pageName}`;

    // Mostrar instrucciones
    alert(
      `📄 Se abrirá el diálogo de impresión para ${pageName}.\n\n💡 Para guardar como PDF:\n1. Selecciona "Guardar como PDF" como destino\n2. Desactiva "Encabezados y pies de página"\n3. Haz clic en "Guardar"`
    );

    // Abrir diálogo de impresión
    setTimeout(() => {
      window.print();

      // Restaurar estado original después de la impresión
      setTimeout(() => {
        // Remover clase temporal
        document.body.classList.remove(`print-only-${pageId}`);

        // Restaurar estilos originales
        if (page1) {
          page1.style.display = originalDisplay1;
          page1.style.visibility = originalVisibility1;
        }
        if (page2) {
          page2.style.display = originalDisplay2;
          page2.style.visibility = originalVisibility2;
        }
        document.title = originalTitle;
      }, 500);
    }, 300);
  };

  // Filter selected items
  const selectedSkills = cvData.skills.filter((skill) => skill.selected);
  const selectedCompetences = cvData.competences.filter(
    (comp) => comp.selected
  );
  const selectedSoftSkills =
    cvData.softSkills?.filter((skill) => skill.selected) || [];
  const selectedExperiences = cvData.experiences.filter((exp) => exp.selected);
  const selectedEducation = cvData.education.filter((edu) => edu.selected);
  const selectedCertifications = cvData.certifications.filter(
    (cert) => cert.selected
  );
  const selectedAchievements = cvData.achievements.filter(
    (achievement) => achievement.selected
  );

  // Group skills by category using dynamic categories
  const skillsByCategory = cvData.skillCategories.reduce((acc, category) => {
    const categorySkills = selectedSkills.filter(
      (skill) => skill.categoryId === category.id
    );
    if (categorySkills.length > 0) {
      acc[category.id] = categorySkills;
    }
    return acc;
  }, {} as Record<string, typeof selectedSkills>);

  // All education is now academic/formal education
  const academicEducation = selectedEducation;

  // Helper function to get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = cvData.skillCategories.find(
      (cat) => cat.id === categoryId
    );
    return category?.name || categoryId;
  };

  return (
    <section className="flex flex-col gap-6 max-w-4xl mx-auto  dark:bg-">
      {/* Estilos CSS para impresión y exportación PDF */}
      <style jsx>{`
        /* Estilos para exportación PDF - Colores compatibles con html2canvas */
        .pdf-export {
          background: #ffffff !important;
          width: 210mm !important; /* A4 width */
          min-height: 297mm !important; /* A4 height */
          margin: 0 !important;
          padding: 0 !important;
          box-shadow: none !important;
          border: none !important;
          font-size: 12px !important;
        }

        .pdf-export * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
          visibility: visible !important;
          opacity: 1 !important;
        }

        /* Colores específicos para elementos del CV en formato hex/rgb */
        .pdf-export .bg-gray-700,
        .pdf-export .bg-gray-700 * {
          background-color: #374151 !important;
          color: #ffffff !important;
        }

        .pdf-export .bg-cyan-500,
        .pdf-export .bg-cyan-500 * {
          background-color: #06b6d4 !important;
          color: #ffffff !important;
        }

        .pdf-export .text-gray-900 {
          color: #111827 !important;
        }

        .pdf-export .text-gray-700 {
          color: #374151 !important;
        }

        .pdf-export .text-gray-600 {
          color: #4b5563 !important;
        }

        .pdf-export .text-gray-500 {
          color: #6b7280 !important;
        }

        .pdf-export .text-gray-300 {
          color: #d1d5db !important;
        }

        .pdf-export .text-gray-200 {
          color: #e5e7eb !important;
        }

        .pdf-export .text-white {
          color: #ffffff !important;
        }

        .pdf-export .border-gray-300 {
          border-color: #d1d5db !important;
        }

        .pdf-export .border-gray-200 {
          border-color: #e5e7eb !important;
        }

        .pdf-export .border-gray-600 {
          border-color: #4b5563 !important;
        }

        .pdf-export .bg-gray-50 {
          background-color: #f9fafb !important;
        }

        .pdf-export .bg-white {
          background-color: #ffffff !important;
        }

        @media print {
          /* Configuración de página sin márgenes */
          @page {
            margin: 0mm !important;
            padding: 0mm !important;
            size: A4 portrait;
          }

          /* Configuración global para impresión */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: auto !important;
            background: white !important;
          }

          /* Ocultar elementos que no se deben imprimir */
          .no-print {
            display: none !important;
          }

          /* Configuración para imprimir CV completo (ambas páginas) */
          body.printing-cv .page-1 {
            page-break-after: always !important;
            break-after: page !important;
            width: 100% !important;
            min-height: 297mm !important;
            display: block !important;
            visibility: visible !important;
          }

          body.printing-cv .page-2 {
            page-break-before: always !important;
            break-before: page !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            width: 100% !important;
            min-height: 297mm !important;
            display: block !important;
            visibility: visible !important;
            /* Remover espacios y líneas de separación visual */
            margin-top: 0 !important;
            padding-top: 0 !important;
            border-top: none !important;
          }

          /* Configuración para imprimir página individual */
          body.print-only-cv-page-1 .page-1 {
            display: block !important;
            visibility: visible !important;
            width: 100% !important;
            min-height: 297mm !important;
          }

          body.print-only-cv-page-1 .page-2 {
            display: none !important;
          }

          body.print-only-cv-page-2 .page-1 {
            display: none !important;
          }

          body.print-only-cv-page-2 .page-2 {
            display: block !important;
            visibility: visible !important;
            width: 100% !important;
            min-height: 297mm !important;
            page-break-before: avoid !important;
            /* Remover espacios y líneas de separación visual */
            margin-top: 0 !important;
            padding-top: 0 !important;
            border-top: none !important;
          }

          /* Asegurar que todo el contenido se vea correctamente */
          .page-1 *,
          .page-2 * {
            visibility: visible !important;
            opacity: 1 !important;
          }

          /* Evitar saltos de página dentro de secciones importantes */
          .page-1 section,
          .page-2 section {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /* Configuración del contenido principal */
          .print-content {
            display: block !important;
            width: 100% !important;
            height: auto !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Eliminar márgenes del contenedor principal */
          .max-w-4xl {
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Asegurar que las páginas ocupen todo el espacio */
          .page-1,
          .page-2 {
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }

          /* Mantener el espaciado aumentado en impresión */
          .mb-8 {
            margin-bottom: 2rem !important;
          }

          /* Espaciado específico para secciones del sidebar */
          .page-1 .w-1/3 .mb-8 {
            margin-bottom: 2rem !important;
          }

          /* Espaciado específico para secciones del contenido principal */
          .page-1 .w-2/3 section.mb-8 {
            margin-bottom: 2rem !important;
          }

          /* Asegurar que el sidebar ocupe toda la altura en impresión */
          .page-1 .w-1/3 {
            min-height: 100vh !important;
            height: 100% !important;
            display: flex !important;
            flex-direction: column !important;
          }

          /* El contenedor principal debe tener altura completa */
          .page-1 .flex.min-h-screen {
            min-height: 100vh !important;
            height: auto !important;
          }

          /* El spacer flex debe ocupar el espacio restante en impresión */
          .flex-grow {
            flex-grow: 1 !important;
          }

          /* Layout de columnas para Referencias Profesionales en impresión */
          .page-2 .grid {
            display: grid !important;
            gap: 1rem !important;
          }

          /* Configuración responsiva del grid para impresión */
          .page-2 .grid-cols-1 {
            grid-template-columns: 1fr !important;
          }

          .page-2 .md\:grid-cols-2 {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .page-2 .lg\:grid-cols-3 {
            grid-template-columns: repeat(3, 1fr) !important;
          }

          /* Asegurar que las tarjetas de referencia se vean bien */
          .page-2 .h-fit {
            height: fit-content !important;
          }

          /* Evitar rupturas de página dentro de las referencias */
          .page-2 .grid > div {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /* Asegurar que los colores se mantengan */
          .bg-gray-700,
          .bg-cyan-500 {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }

        /* Estilos para vista previa en pantalla (solo cuando NO se está imprimiendo) */
        /* Estilos específicos para formato ATS */
        .ats-format {
          font-family: Arial, sans-serif !important;
          color: #000000 !important;
          background: #ffffff !important;
          line-height: 1.4 !important;
        }

        .ats-format * {
          font-family: Arial, sans-serif !important;
          color: #000000 !important;
        }

        .ats-format h1,
        .ats-format h2,
        .ats-format h3,
        .ats-format h4 {
          color: #000000 !important;
          font-weight: bold !important;
        }

        .ats-format .border-black {
          border-color: #000000 !important;
        }

        .ats-format .text-black {
          color: #000000 !important;
        }

        /* Configuración para impresión ATS */
        @media print {
          /* Configuración de página específica para ATS */
          @page :first {
            margin: 0mm !important;
            padding: 0mm !important;
          }

          .ats-format {
            font-family: Arial, sans-serif !important;
            color: #000000 !important;
            background: #ffffff !important;
          }

          .ats-format * {
            font-family: Arial, sans-serif !important;
            color: #000000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .ats-format .border-black {
            border-color: #000000 !important;
          }

          .ats-format h1,
          .ats-format h2,
          .ats-format h3,
          .ats-format h4 {
            color: #000000 !important;
            font-weight: bold !important;
          }

          /* Márgenes específicos para formato ATS en impresión */
          #cv-page-1.ats-format,
          #cv-page-2.ats-format {
            padding: 15mm 20mm !important;
            margin: 0 !important;
            width: 100% !important;
            min-height: 297mm !important;
            box-sizing: border-box !important;
          }

          /* Forzar dos columnas para información de contacto ATS en impresión */
          .ats-format .contact-info-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
            column-gap: 16px !important;
          }

          #cv-page-1.ats-format > div,
          #cv-page-2.ats-format > div {
            padding: 0 !important;
            margin: 0 !important;
            max-width: none !important;
            width: 100% !important;
          }

          /* Asegurar márgenes para todos los estados de impresión */
          body.printing-cv #cv-page-1.ats-format,
          body.printing-cv #cv-page-2.ats-format,
          body.print-only-cv-page-1 #cv-page-1.ats-format,
          body.print-only-cv-page-2 #cv-page-2.ats-format {
            padding: 15mm 20mm !important;
            margin: 0 !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
        }

        @media screen {
          .page-1 {
            min-height: 100vh;
          }
          .page-2 {
            margin-top: 2rem;
            border-top: 2px dashed #e5e7eb;
            padding-top: 2rem;
          }

          /* Ajuste específico para formato ATS en pantalla */
          .ats-format.page-2 {
            border-top: 2px solid #000000;
          }
        }
      `}</style>

      {/* CV Active Indicator */}
      {currentCVName && (
        <div className="max-w-140 mx-auto bg-blue-50 dark:bg-blue-900/80 border border-blue-200 dark:border-blue-800 rounded-lg p-4 shadow-sm no-print">
          <div className="text-center">
            <p className="text-blue-800 text-2xl dark:text-blue-200">
              <span className="font-semibold text-lg">
                📄 Previsualizando CV:
              </span>{" "}
              {currentCVName}
            </p>
          </div>
        </div>
      )}
      {/* Format Selector */}
      <div className="mx-auto bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm no-print">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            🎨 Formato del CV
          </h3>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setCvFormat("visual")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                cvFormat === "visual"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
              }`}
            >
              🎨 Formato Visual
              <div className="text-xs mt-1 opacity-80">
                Diseño atractivo con colores
              </div>
            </button>
            <button
              onClick={() => setCvFormat("ats")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                cvFormat === "ats"
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
              }`}
            >
              🤖 Formato ATS
              <div className="text-xs mt-1 opacity-80">
                Optimizado para sistemas automáticos
              </div>
            </button>
          </div>
          <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
            {cvFormat === "visual" ? (
              <p>
                <span className="inline-block">🎨</span>{" "}
                <strong>Formato Visual:</strong> Diseño moderno con colores y
                estilos atractivos para impresionar a reclutadores humanos
              </p>
            ) : (
              <p>
                <span className="inline-block">🤖</span>{" "}
                <strong>Formato ATS:</strong> Diseño simple y estructurado que
                garantiza que los sistemas automáticos lean correctamente toda
                tu información
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Print Control */}
      <div className="text-center mb-2 no-print">
        <div className="flex justify-center gap-3 mb-3">
          <Button
            onClick={() => handlePrintPage("cv-page-1", "Página 1")}
            variant="secondary"
            size="md"
          >
            <p className="text-lg">📄 Imprimir Solo Página 1</p>
          </Button>
          <Button
            onClick={() => handlePrintPage("cv-page-2", "Página 2")}
            variant="secondary"
            size="sm"
          >
            <p className="text-lg">📄 Imprimir Solo Página 2</p>
          </Button>
        </div>
      </div>

      {/* CV Content */}
      <div className="bg-white print-content">
        {cvFormat === "visual" ? (
          <>
            {/* FORMATO VISUAL - PÁGINA 1 */}
            <div id="cv-page-1" className="page-1" data-page="1">
              {/* Header */}
              <div className="text-center bg-gray-700 py-6 border-b-2 border-gray-600">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {cvData.personalInfo.name}
                </h1>
                <h2 className="text-xl text-gray-300">
                  {cvData.personalInfo.position}
                </h2>
              </div>

              {/* Two Column Layout */}
              <div className="flex min-h-screen">
                {/* Left Sidebar */}
                <div className="w-1/3 bg-gray-700 text-white p-6 min-h-full flex flex-col">
                  {/* Datos Personales */}
                  <div className="mb-8">
                    <h3 className="text-base font-semibold mb-3 bg-cyan-500 text-center py-1 px-2 text-white">
                      Datos Personales
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-300">📱</span>
                        <span>{cvData.personalInfo.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-300">📧</span>
                        <span className="break-all">
                          {cvData.personalInfo.email}
                        </span>
                      </div>
                      {cvData.personalInfo.linkedin && (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-300">🔗</span>
                          <span className="break-all text-xs">
                            {cvData.personalInfo.linkedin}
                          </span>
                        </div>
                      )}
                      {cvData.personalInfo.socialNetworks.map((sn) => (
                        <div
                          key={sn.id}
                          className="flex items-center space-x-2"
                        >
                          <span className="text-gray-300">
                            {sn.name === "GitHub"
                              ? "💻"
                              : sn.name === "Twitter"
                              ? "🐦"
                              : sn.name === "Instagram"
                              ? "📷"
                              : sn.name === "Facebook"
                              ? "📘"
                              : sn.name === "YouTube"
                              ? "🎥"
                              : sn.name === "TikTok"
                              ? "🎵"
                              : sn.name === "Behance"
                              ? "🎨"
                              : sn.name === "Dribbble"
                              ? "🏀"
                              : sn.name === "Dev.to"
                              ? "👩‍💻"
                              : sn.name === "Medium"
                              ? "📝"
                              : sn.name === "Stack Overflow"
                              ? "📚"
                              : sn.name === "Discord"
                              ? "🎮"
                              : sn.name === "Telegram"
                              ? "📨"
                              : sn.name === "WhatsApp"
                              ? "💬"
                              : "🌐"}
                          </span>
                          <span className="break-all text-xs">{sn.url}</span>
                        </div>
                      ))}
                      {cvData.personalInfo.website && (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-300">🌐</span>
                          <span className="break-all text-xs">
                            {cvData.personalInfo.website}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-300">📍</span>
                        <span>{cvData.personalInfo.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Competencias */}
                  {selectedCompetences.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-base font-semibold mb-3 bg-cyan-500 text-center py-1 px-2 text-white">
                        Competencias
                      </h3>
                      <div className="text-xs text-gray-200">
                        {selectedCompetences.map((comp, index) => (
                          <span key={comp.id}>
                            {comp.name}
                            {index < selectedCompetences.length - 1 && " , "}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Idiomas */}
                  {cvData.languages.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-base font-semibold mb-3 bg-cyan-500 text-center py-1 px-2 text-white">
                        Idiomas
                      </h3>
                      <div className="space-y-1 text-xs">
                        {cvData.languages.map((lang) => (
                          <div key={lang.id} className="flex gap-4">
                            <span className="text-gray-200">{lang.name}:</span>
                            <span className="text-white font-medium">
                              {lang.level}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Especialización (Skills) */}
                  {selectedSkills.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-base font-semibold mb-3 bg-cyan-500 text-center py-1 px-2 text-white">
                        Especialización
                      </h3>
                      <div className="space-y-2 text-xs">
                        {Object.entries(skillsByCategory).map(
                          ([categoryId, skills]) => (
                            <div key={categoryId}>
                              <h4 className="text-gray-300 font-large mb-1 text-sm">
                                {getCategoryName(categoryId)}:
                              </h4>
                              <div className="text-gray-200 text-xs">
                                {skills.map((skill, index) => (
                                  <span key={skill.id}>
                                    {skill.name}
                                    {index < skills.length - 1 && " , "}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Habilidades Blandas */}
                  {selectedSoftSkills.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-base font-semibold mb-3 bg-cyan-500 text-center py-1 px-2 text-white">
                        Habilidades Blandas
                      </h3>
                      <div className="text-xs text-gray-200">
                        {selectedSoftSkills.map((skill, index) => (
                          <span key={skill.id}>
                            {skill.name}
                            {index < selectedSoftSkills.length - 1 && " • "}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Otra Información */}
                  {(cvData.drivingLicense || cvData.ownVehicle) && (
                    <div className="mb-8">
                      <h3 className="text-base font-semibold mb-3 bg-cyan-500 text-center py-1 px-2 text-white">
                        Otra Información
                      </h3>
                      <div className="space-y-1 text-xs text-gray-200">
                        {cvData.drivingLicense && <div>Carnet de conducir</div>}
                        {cvData.ownVehicle && <div>Vehículo propio</div>}
                      </div>
                    </div>
                  )}

                  {/* Spacer flex para ocupar el espacio restante */}
                  <div className="flex-grow"></div>
                </div>

                {/* Right Main Content - Página 1 */}
                <div className="w-2/3 p-8">
                  {/* Perfil Profesional */}
                  {cvData.aboutMe && (
                    <section className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
                        Perfil Profesional
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {cvData.aboutMe}
                      </p>
                    </section>
                  )}

                  {/* Experiencia Laboral */}
                  {selectedExperiences.length > 0 && (
                    <section className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
                        Experiencia Laboral
                      </h3>
                      <div className="space-y-4">
                        {selectedExperiences.map((exp) => (
                          <div
                            key={exp.id}
                            className="border-l-4 border-gray-300 pl-4"
                          >
                            <div className="flex gap-4 items-center mb-1">
                              <h4 className="font-bold text-gray-900 text-sm">
                                {exp.position}
                              </h4>
                              <span className="text-xs text-gray-500 italic">
                                ({exp.contractType}, {exp.workSchedule},{" "}
                                {exp.workModality})
                              </span>
                            </div>
                            <p className="font-bold text-gray-700 text-sm">
                              {exp.company}
                            </p>
                            <p className="text-xs text-gray-600 mb-1">
                              {exp.startDate} - {exp.endDate || "Presente"} /{" "}
                              {exp.location}
                            </p>
                            <p className="text-gray-700 text-xs mb-2 leading-relaxed">
                              {exp.description}
                            </p>
                            {exp.technologies.length > 0 && (
                              <p className="text-xs text-gray-600">
                                <span className="font-medium">
                                  Tecnologías:
                                </span>{" "}
                                {exp.technologies.join(", ")}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                  {/* Logros y Proyectos Destacados */}
                  {selectedAchievements.length > 0 && (
                    <section className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
                        Logros y Proyectos Destacados
                      </h3>
                      <div className="space-y-4">
                        {selectedAchievements.map((achievement) => (
                          <div
                            key={achievement.id}
                            className="border-l-4 border-gray-300 pl-4"
                          >
                            <div className="flex gap-4 items-center mb-1">
                              <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                                {achievement.title}
                              </h4>
                              <span className="text-xs text-gray-500">
                                {"("}
                                {achievement.date}
                                {")"}
                              </span>
                            </div>
                            {achievement.company && (
                              <p className="font-bold text-gray-700 text-sm">
                                {achievement.company}
                              </p>
                            )}
                            <p className="text-gray-700 text-xs mb-2 leading-relaxed">
                              {achievement.description}
                            </p>
                            {achievement.technologies.length > 0 && (
                              <p className="text-xs text-gray-600 mb-1">
                                <span className="font-medium">
                                  Tecnologías:
                                </span>{" "}
                                {achievement.technologies.join(", ")}
                              </p>
                            )}
                            {achievement.metrics && (
                              <p className="text-xs text-green-600 mb-1">
                                <span className="font-medium">Impacto:</span>{" "}
                                {achievement.metrics}
                              </p>
                            )}
                            {achievement.url && (
                              <p className="text-xs text-blue-600">
                                <span className="font-medium">URL:</span>{" "}
                                {achievement.url}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Formación Académica */}
                  {academicEducation.length > 0 && (
                    <section className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
                        Formación Académica
                      </h3>
                      <div className="space-y-4">
                        {academicEducation.map((edu) => (
                          <div
                            key={edu.id}
                            className="border-l-4 border-gray-300 pl-4"
                          >
                            <div className="flex gap-4 items-center mb-1">
                              <h4 className="font-bold text-gray-900 text-sm">
                                {edu.title}
                              </h4>
                              <span className="text-xs text-gray-500">
                                ({edu.startYear} - {edu.endYear})
                              </span>
                            </div>
                            <div className="flex gap-4 items-center">
                              <p className="font-bold text-gray-700 text-sm">
                                {edu.institution}
                              </p>
                              <p className="text-xs text-gray-600">
                                {edu.location}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>

            {/* PÁGINA 2 - Formación y Nuevas Secciones */}
            <div id="cv-page-2" className="page-2" data-page="2">
              <div className="w-full p-8 bg-white min-h-screen">
                {/* Certificaciones */}
                {selectedCertifications.length > 0 && (
                  <section className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
                      Certificaciones
                    </h3>
                    <div className="space-y-4">
                      {selectedCertifications.map((cert) => (
                        <div
                          key={cert.id}
                          className="border-l-4 border-gray-300 pl-4"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-gray-900 text-sm">
                              {cert.name}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {cert.date}
                              {cert.expiryDate && ` - ${cert.expiryDate}`}
                            </span>
                          </div>
                          <p className="font-bold text-gray-700 text-sm">
                            {cert.issuer}
                          </p>
                          {cert.credentialId && (
                            <p className="text-xs text-gray-600 mb-1">
                              <span className="font-medium">ID:</span>{" "}
                              {cert.credentialId}
                            </p>
                          )}
                          {cert.url && (
                            <p className="text-xs text-blue-600">
                              <span className="font-medium">Verificación:</span>{" "}
                              {cert.url}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Referencias Profesionales */}
                {cvData.references.filter((ref) => ref.selected).length > 0 && (
                  <section className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
                      📋 Referencias Profesionales
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cvData.references
                        .filter((ref) => ref.selected)
                        .map((reference) => (
                          <div
                            key={reference.id}
                            className="border border-gray-200 rounded-lg p-3 bg-gray-50 h-fit"
                          >
                            <h4 className="font-bold text-gray-900 text-sm mb-1 leading-tight">
                              {reference.name}
                            </h4>
                            <p className="text-gray-700 text-xs font-medium leading-tight">
                              {reference.position}
                            </p>
                            <p className="text-gray-600 text-xs mb-2 leading-tight">
                              {reference.company}
                            </p>
                            <p className="text-xs text-gray-500 mb-2 italic leading-tight">
                              {reference.relationship}
                            </p>
                            <div className="space-y-1 text-xs text-gray-600">
                              {reference.phone && (
                                <p className="flex items-center gap-1 leading-tight">
                                  <span>📞</span>
                                  <span className="break-all">
                                    {reference.phone}
                                  </span>
                                </p>
                              )}
                              {reference.email && (
                                <p className="flex items-center gap-1 leading-tight">
                                  <span>✉️</span>
                                  <span className="break-all text-xs">
                                    {reference.email}
                                  </span>
                                </p>
                              )}
                              {reference.yearsWorking && (
                                <p className="flex items-center gap-1 leading-tight">
                                  <span>⏱️</span>
                                  <span className="text-xs">
                                    Colaboración: {reference.yearsWorking}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </section>
                )}
              </div>
              {/* Footer*/}
              <div className="text-center bg-gray-700 py-4 border-b-2 border-gray-600"></div>
            </div>
          </>
        ) : (
          <>
            {/* FORMATO ATS - Optimizado para sistemas automáticos */}
            <div id="cv-page-1" className="page-1 ats-format" data-page="1">
              <div className="w-full max-w-4xl mx-auto bg-white p-8 px-12 font-serif">
                {/* Header ATS - Simple y claro */}
                <div className="text-center border-b-2 border-black pb-4 mb-6">
                  <h1 className="text-3xl font-bold text-black mb-2 uppercase tracking-wider">
                    {cvData.personalInfo.name}
                  </h1>
                  <h2 className="text-xl text-black font-medium">
                    {cvData.personalInfo.position}
                  </h2>
                </div>

                {/* Información de Contacto ATS */}
                <div className="mb-6 text-left">
                  <h3 className="text-md font-bold text-black mb-3 uppercase border-b border-black pb-1">
                    INFORMACIÓN DE CONTACTO
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-black contact-info-grid">
                    <div>
                      <strong>Teléfono:</strong> {cvData.personalInfo.phone}
                    </div>
                    <div>
                      <strong>Email:</strong> {cvData.personalInfo.email}
                    </div>
                    <div>
                      <strong>Ubicación:</strong> {cvData.personalInfo.location}
                    </div>
                    {cvData.personalInfo.linkedin && (
                      <div>
                        <strong>LinkedIn:</strong>{" "}
                        {cvData.personalInfo.linkedin}
                      </div>
                    )}
                    {cvData.personalInfo.socialNetworks.map((sn) => (
                      <div key={sn.id}>
                        <strong>{sn.name}:</strong> {sn.url}
                      </div>
                    ))}
                    {cvData.personalInfo.website && (
                      <div>
                        <strong>Website:</strong> {cvData.personalInfo.website}
                      </div>
                    )}
                  </div>
                </div>

                {/* Perfil Profesional ATS */}
                {cvData.aboutMe && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-black mb-3 uppercase border-b border-black pb-1">
                      PERFIL PROFESIONAL
                    </h3>
                    <p className="text-sm text-black leading-relaxed">
                      {cvData.aboutMe}
                    </p>
                  </div>
                )}

                {/* Experiencia Laboral ATS */}
                {selectedExperiences.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-black mb-3 uppercase border-b border-black pb-1">
                      EXPERIENCIA LABORAL
                    </h3>
                    <div className="space-y-4">
                      {selectedExperiences.map((exp) => (
                        <div key={exp.id} className="mb-4">
                          <div className="flex gap-4 items-start mb-1">
                            <h4 className="font-bold text-black">
                              {exp.position}
                            </h4>
                            <p className="text-sm text-black">
                              {"("}
                              {exp.startDate} - {exp.endDate || "Presente"}
                              {")"}
                            </p>
                          </div>
                          <div className="flex gap-4 text-black mb-1">
                            <p className="font-bold">{exp.company}</p> |{" "}
                            <p>{exp.location}</p>
                          </div>
                          <p className="text-sm text-black mb-2">
                            Modalidad: {exp.contractType}, {exp.workSchedule},{" "}
                            {exp.workModality}
                          </p>
                          <p className="text-sm text-black mb-2 leading-relaxed">
                            {exp.description}
                          </p>
                          {exp.technologies.length > 0 && (
                            <p className="text-sm text-black">
                              <strong>Tecnologías utilizadas:</strong>{" "}
                              {exp.technologies.join(", ")}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Formación Académica ATS */}
                {academicEducation.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-black mb-3 uppercase border-b border-black pb-1">
                      FORMACIÓN ACADÉMICA
                    </h3>
                    <div className="space-y-3">
                      {academicEducation.map((edu) => (
                        <div key={edu.id}>
                          <div className="flex gap-4 items-start mb-1">
                            <h4 className="font-bold text-black">
                              {edu.title}
                            </h4>
                            <span className="text-sm text-black">
                              {"("}
                              {edu.startYear} - {edu.endYear}
                              {")"}
                            </span>
                          </div>
                          <div className="flex gap-4">
                            <p className="font-bold text-black">
                              {edu.institution}
                            </p>
                            <p className="text-sm text-black">{edu.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Logros y Proyectos ATS */}
                {selectedAchievements.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-black mb-3 uppercase border-b border-black pb-1">
                      LOGROS Y PROYECTOS DESTACADOS
                    </h3>
                    <div className="space-y-3">
                      {selectedAchievements.map((achievement) => (
                        <div key={achievement.id}>
                          <div className="flex gap-4 items-start mb-1">
                            <h4 className="font-bold text-black">
                              {achievement.title}
                            </h4>
                            <span className="text-sm text-black">
                              {"("}
                              {achievement.date}
                              {")"}
                            </span>
                          </div>
                          {achievement.company && (
                            <p className="font-bold text-black">
                              {achievement.company}
                            </p>
                          )}
                          <p className="text-sm text-black mb-2">
                            {achievement.description}
                          </p>
                          {achievement.technologies.length > 0 && (
                            <p className="text-sm text-black mb-1">
                              <strong>Tecnologías:</strong>{" "}
                              {achievement.technologies.join(", ")}
                            </p>
                          )}
                          {achievement.metrics && (
                            <p className="text-sm text-black mb-1">
                              <strong>Impacto:</strong> {achievement.metrics}
                            </p>
                          )}
                          {achievement.url && (
                            <p className="text-sm text-black">
                              <strong>URL:</strong> {achievement.url}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* PÁGINA 2 ATS */}
            <div id="cv-page-2" className="page-2 ats-format" data-page="2">
              <div className="w-full max-w-4xl mx-auto bg-white p-8 px-12 font-serif">
                {/* Certificaciones ATS */}
                {selectedCertifications.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-black mb-3 uppercase border-b border-black pb-1">
                      CERTIFICACIONES
                    </h3>
                    <div className="space-y-3">
                      {selectedCertifications.map((cert) => (
                        <div key={cert.id}>
                          <div className="flex gap-4 items-start mb-1">
                            <h4 className="font-bold text-black">
                              {cert.name}
                            </h4>
                            <span className="text-sm text-black">
                              {"("}
                              {cert.date}
                              {cert.expiryDate && ` - ${cert.expiryDate}`}
                              {")"}
                            </span>
                            <p className="font-bold text-black">
                              {cert.issuer}
                            </p>
                          </div>
                          {cert.credentialId && (
                            <p className="text-sm text-black">
                              ID de Credencial: {cert.credentialId}
                            </p>
                          )}
                          {cert.url && (
                            <p className="text-sm text-black">
                              Verificación: {cert.url}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Idiomas ATS */}
                {cvData.languages.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-black mb-3 uppercase border-b border-black pb-1">
                      IDIOMAS
                    </h3>
                    <div className="space-y-1">
                      {cvData.languages.map((lang) => (
                        <div key={lang.id} className="flex gap-4">
                          <span className="text-black">
                            {lang.name}
                            {":"}
                          </span>
                          <span className="text-black font-bold">
                            {lang.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Habilidades Técnicas ATS */}
                {selectedSkills.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-black mb-3 uppercase border-b border-black pb-1">
                      HABILIDADES TÉCNICAS
                    </h3>
                    {Object.entries(skillsByCategory).map(
                      ([categoryId, skills]) => (
                        <div key={categoryId} className="mb-3">
                          <h4 className="font-bold text-black text-sm mb-1">
                            {getCategoryName(categoryId)}:
                          </h4>
                          <p className="text-sm text-black">
                            {skills.map((skill) => skill.name).join(", ")}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* Competencias ATS */}
                {selectedCompetences.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-black mb-3 uppercase border-b border-black pb-1">
                      COMPETENCIAS PROFESIONALES
                    </h3>
                    <p className="text-sm text-black">
                      {selectedCompetences.map((comp) => comp.name).join(", ")}
                    </p>
                  </div>
                )}

                {/* Habilidades Blandas ATS */}
                {selectedSoftSkills.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-black mb-3 uppercase border-b border-black pb-1">
                      HABILIDADES INTERPERSONALES
                    </h3>
                    <p className="text-sm text-black">
                      {selectedSoftSkills.map((skill) => skill.name).join(", ")}
                    </p>
                  </div>
                )}

                {/* Referencias ATS */}
                {cvData.references.filter((ref) => ref.selected).length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-black mb-3 uppercase border-b border-black pb-1">
                      REFERENCIAS PROFESIONALES
                    </h3>
                    <div className="space-y-4">
                      {cvData.references
                        .filter((ref) => ref.selected)
                        .map((reference) => (
                          <div key={reference.id}>
                            <h4 className="font-bold text-black">
                              {reference.name}
                            </h4>
                            <p className="text-black font-medium">
                              {reference.position}
                            </p>
                            <p className="text-black">{reference.company}</p>
                            <p className="text-sm text-black">
                              Relación: {reference.relationship}
                            </p>
                            <div className="text-sm text-black">
                              {reference.phone && (
                                <p>Teléfono: {reference.phone}</p>
                              )}
                              {reference.email && (
                                <p>Email: {reference.email}</p>
                              )}
                              {reference.yearsWorking && (
                                <p>
                                  Años de colaboración: {reference.yearsWorking}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Información Adicional ATS */}
                {(cvData.drivingLicense || cvData.ownVehicle) && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-black mb-3 uppercase border-b border-black pb-1">
                      INFORMACIÓN ADICIONAL
                    </h3>
                    <div className="text-sm text-black">
                      {cvData.drivingLicense && <p>• Carnet de conducir</p>}
                      {cvData.ownVehicle && <p>• Vehículo propio</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
