"use client";

import { Button } from "@/components/ui/Button";
import { CVData } from "@/types/cv";
import { pdfUtils } from "@/utils/pdfUtils";

interface CVPreviewPrismaProps {
  cvData: CVData;
  currentCVName?: string | null;
}

export const CVPreviewPrisma: React.FC<CVPreviewPrismaProps> = ({
  cvData,
  currentCVName,
}) => {
  // Export Page 1 to PDF
  const handleExportPage1 = async () => {
    try {
      const filename = pdfUtils.generateFilename(cvData);
      const page1Name = filename.replace(".pdf", "_Pagina1.pdf");

      // Intentar método avanzado primero
      try {
        pdfUtils.prepareElementForExport("cv-page-1");
        await new Promise((resolve) => setTimeout(resolve, 200));
        await pdfUtils.exportToPDFUltraSimple("cv-page-1", page1Name);
        pdfUtils.cleanupAfterExport("cv-page-1");
        alert("✅ Página 1 exportada exitosamente");
      } catch (advancedError) {
        console.warn(
          "Error en método avanzado, usando impresión:",
          advancedError
        );
        // Fallback: usar window.print con focus en página 1
        handlePrintPage("cv-page-1", "Página 1");
      }
    } catch (error) {
      console.error("Error al exportar Página 1:", error);
      alert(
        "Error al exportar Página 1. Usa el botón Imprimir como alternativa."
      );
    }
  };

  // Export Page 2 to PDF
  const handleExportPage2 = async () => {
    try {
      const filename = pdfUtils.generateFilename(cvData);
      const page2Name = filename.replace(".pdf", "_Pagina2.pdf");

      // Intentar método avanzado primero
      try {
        pdfUtils.prepareElementForExport("cv-page-2");
        await new Promise((resolve) => setTimeout(resolve, 200));
        await pdfUtils.exportToPDFUltraSimple("cv-page-2", page2Name);
        pdfUtils.cleanupAfterExport("cv-page-2");
        alert("✅ Página 2 exportada exitosamente");
      } catch (advancedError) {
        console.warn(
          "Error en método avanzado, usando impresión:",
          advancedError
        );
        // Fallback: usar window.print con focus en página 2
        handlePrintPage("cv-page-2", "Página 2");
      }
    } catch (error) {
      console.error("Error al exportar Página 2:", error);
      alert(
        "Error al exportar Página 2. Usa el botón Imprimir como alternativa."
      );
    }
  };

  // Helper function for printing individual pages
  const handlePrintPage = (pageId: string, pageName: string) => {
    // Ocultar temporalmente la otra página
    const page1 = document.getElementById("cv-page-1");
    const page2 = document.getElementById("cv-page-2");
    const targetPage = document.getElementById(pageId);

    if (!targetPage) return;

    const originalDisplay1 = page1?.style.display || "";
    const originalDisplay2 = page2?.style.display || "";

    // Mostrar solo la página objetivo
    if (pageId === "cv-page-1" && page2) {
      page2.style.display = "none";
    } else if (pageId === "cv-page-2" && page1) {
      page1.style.display = "none";
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

      // Restaurar estado original
      setTimeout(() => {
        if (page1) page1.style.display = originalDisplay1;
        if (page2) page2.style.display = originalDisplay2;
        document.title = originalTitle;
      }, 100);
    }, 200);
  };

  // Export both pages sequentially
  const handleExportBothPages = async () => {
    try {
      await handleExportPage1();
      // Pequeña pausa entre exportaciones
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await handleExportPage2();

      alert("✅ Ambas páginas exportadas exitosamente");
    } catch (error) {
      console.error("Error al exportar ambas páginas:", error);
      alert("Error al exportar. Prueba exportar las páginas individualmente.");
    }
  };

  // Función alternativa para usar window.print (como respaldo)
  const handlePrintPDF = () => {
    // Set print title
    const originalTitle = document.title;
    const fileName = `CV_${cvData.personalInfo.name.replace(/\s+/g, "_")}`;
    document.title = fileName;

    // Asegurar que todas las páginas estén completamente renderizadas
    setTimeout(() => {
      // Trigger print dialog (user can save as PDF)
      window.print();

      // Restore original title
      setTimeout(() => {
        document.title = originalTitle;
      }, 100);
    }, 200);
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

  // Group skills by category
  const skillsByCategory = selectedSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof selectedSkills>);

  // Get formal education only
  const formalEducation = selectedEducation.filter(
    (edu) => edu.type === "formal"
  );

  const categoryNames = {
    language: "Lenguajes de Programación",
    framework: "Frameworks",
    database: "Bases de Datos",
    tool: "Herramientas",
    library: "Librerías",
    orm: "ORM",
    ai: "IA",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
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
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          body {
            margin: 0 !important;
            padding: 0 !important;
          }

          .page-1 {
            page-break-after: always !important;
            break-after: page !important;
            min-height: 297mm !important; /* A4 height */
            height: 297mm !important;
            overflow: hidden !important;
          }

          .page-2 {
            page-break-before: always !important;
            break-before: page !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            min-height: 297mm !important;
          }

          .no-print {
            display: none !important;
          }

          /* Asegurar que el contenido de la página 2 se vea */
          .page-2 * {
            visibility: visible !important;
            opacity: 1 !important;
          }

          /* Evitar saltos de página dentro de secciones */
          .page-2 section {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /* Forzar que ambas páginas se impriman */
          .print-content {
            display: block !important;
            width: 100% !important;
            height: auto !important;
          }

          /* Asegurar que la página 2 no se oculte */
          [data-page="2"] {
            display: block !important;
            visibility: visible !important;
            position: relative !important;
            z-index: 1 !important;
          }
        }

        /* Estilos para vista previa en pantalla */
        .page-1 {
          min-height: 100vh;
        }
        .page-2 {
          margin-top: 2rem;
          border-top: 2px dashed #e5e7eb;
          padding-top: 2rem;
        }
      `}</style>

      {/* CV Active Indicator */}
      {currentCVName && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm no-print">
          <div className="text-center">
            <p className="text-blue-800">
              <span className="font-semibold">📄 Previsualizando CV:</span>{" "}
              {currentCVName}
            </p>
          </div>
        </div>
      )}

      {/* Export Controls */}
      <div className="text-center mb-2 no-print">
        <div className="flex justify-center gap-2 mb-3 flex-wrap">
          <Button onClick={handleExportPage1} variant="primary" size="sm">
            📄 Exportar Página 1
          </Button>
          <Button onClick={handleExportPage2} variant="primary" size="sm">
            📄 Exportar Página 2
          </Button>
          <Button onClick={handleExportBothPages} variant="secondary" size="sm">
            📥 Exportar Ambas
          </Button>
          <Button onClick={handlePrintPDF} variant="secondary" size="sm">
            🖨️ Imprimir
          </Button>
        </div>
        <div className="mt-3 text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2 max-w-2xl mx-auto">
          <p className="font-medium">💡 Opciones de exportación:</p>
          <p>
            <strong>Exportar Página 1/2:</strong> Intenta exportación
            automática, si falla usa impresión del navegador.
          </p>
          <p>
            <strong>Exportar Ambas:</strong> Exporta ambas páginas
            secuencialmente.
          </p>
          <p>
            <strong>Imprimir:</strong> Diálogo de impresión tradicional (ambas
            páginas).
          </p>
          <p className="text-xs text-blue-600 mt-1">
            💡 <strong>Tip:</strong> Si la exportación automática falla, se
            abrirá el diálogo de impresión donde puedes seleccionar
            &quot;Guardar como PDF&quot;.
          </p>
        </div>
      </div>

      {/* CV Content */}
      <div className="bg-white print-content">
        {/* PÁGINA 1 - Información Principal */}
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
            <div className="w-1/3 bg-gray-700 text-white p-6">
              {/* Datos Personales */}
              <div className="mb-6">
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
                  {cvData.personalInfo.github && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-300">💻</span>
                      <span className="break-all text-xs">
                        {cvData.personalInfo.github}
                      </span>
                    </div>
                  )}
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
                <div className="mb-6">
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
                <div className="mb-6">
                  <h3 className="text-base font-semibold mb-3 bg-cyan-500 text-center py-1 px-2 text-white">
                    Idiomas
                  </h3>
                  <div className="space-y-1 text-xs">
                    {cvData.languages.map((lang) => (
                      <div key={lang.id} className="flex justify-between">
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
                <div className="mb-6">
                  <h3 className="text-base font-semibold mb-3 bg-cyan-500 text-center py-1 px-2 text-white">
                    Especialización
                  </h3>
                  <div className="space-y-2 text-xs">
                    {Object.entries(skillsByCategory).map(
                      ([category, skills]) => (
                        <div key={category}>
                          <h4 className="text-gray-300 font-medium mb-1 text-xs">
                            {categoryNames[
                              category as keyof typeof categoryNames
                            ] || category}
                            :
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
                <div className="mb-6">
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
                <div className="mb-6">
                  <h3 className="text-base font-semibold mb-3 bg-cyan-500 text-center py-1 px-2 text-white">
                    Otra Información
                  </h3>
                  <div className="space-y-1 text-xs text-gray-200">
                    {cvData.drivingLicense && <div>Carnet de conducir</div>}
                    {cvData.ownVehicle && <div>Vehículo propio</div>}
                  </div>
                </div>
              )}
            </div>

            {/* Right Main Content - Página 1 */}
            <div className="w-2/3 p-8">
              {/* Perfil Profesional */}
              {cvData.aboutMe && (
                <section className="mb-6">
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
                <section className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
                    Experiencia Laboral
                  </h3>
                  <div className="space-y-4">
                    {selectedExperiences.map((exp) => (
                      <div
                        key={exp.id}
                        className="border-l-4 border-gray-300 pl-4"
                      >
                        <div className="flex justify-between items-start mb-1">
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
                            <span className="font-medium">Tecnologías:</span>{" "}
                            {exp.technologies.join(", ")}
                          </p>
                        )}
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
          {/* Header similar a página 1 */}
          <div className="text-center bg-gray-700 py-4 border-b-2 border-gray-600">
            <h1 className="text-2xl font-bold text-white">
              {cvData.personalInfo.name} - Página 2
            </h1>
          </div>

          <div className="w-full p-8 bg-white min-h-screen">
            {/* Formación Académica */}
            {formalEducation.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
                  🎓 Formación Académica
                </h3>
                <div className="space-y-4">
                  {formalEducation.map((edu) => (
                    <div
                      key={edu.id}
                      className="border-l-4 border-gray-300 pl-4"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-900 text-sm">
                          {edu.title}
                        </h4>
                        <span className="text-xs text-gray-500">
                          ({edu.startYear} - {edu.endYear})
                        </span>
                      </div>
                      <p className="font-bold text-gray-700 text-sm">
                        {edu.institution}
                      </p>
                      <p className="text-xs text-gray-600">{edu.location}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certificaciones */}
            {selectedCertifications.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
                  🏆 Certificaciones
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

            {/* Logros y Proyectos Destacados */}
            {selectedAchievements.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
                  🏆 Logros y Proyectos Destacados
                </h3>
                <div className="space-y-4">
                  {selectedAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="border-l-4 border-gray-300 pl-4"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                          {achievement.type === "project" ? "🚀" : "🏆"}{" "}
                          {achievement.title}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {achievement.date}
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
                          <span className="font-medium">Tecnologías:</span>{" "}
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

            {/* Referencias Profesionales */}
            {cvData.references.filter((ref) => ref.selected).length > 0 && (
              <section className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
                  📋 Referencias Profesionales
                </h3>
                <div className="space-y-4">
                  {cvData.references
                    .filter((ref) => ref.selected)
                    .map((reference) => (
                      <div
                        key={reference.id}
                        className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                      >
                        <h4 className="font-bold text-gray-900 text-sm mb-1">
                          {reference.name}
                        </h4>
                        <p className="text-gray-700 text-sm font-medium">
                          {reference.position}
                        </p>
                        <p className="text-gray-600 text-sm mb-2">
                          {reference.company}
                        </p>
                        <p className="text-xs text-gray-500 mb-2 italic">
                          {reference.relationship}
                        </p>
                        <div className="space-y-1 text-xs text-gray-600">
                          {reference.phone && (
                            <p className="flex items-center gap-1">
                              <span>📞</span> {reference.phone}
                            </p>
                          )}
                          {reference.email && (
                            <p className="flex items-center gap-1">
                              <span>✉️</span> {reference.email}
                            </p>
                          )}
                          {reference.yearsWorking && (
                            <p className="flex items-center gap-1">
                              <span>⏱️</span> Colaboración:{" "}
                              {reference.yearsWorking}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
