"use client";

import React, { useState } from "react";
import { CVData } from "../../types/cv";
import {
  ActiveCVIndicator,
  FormatSelector,
  PrintControls,
  PhoneIcon,
  EmailIcon,
  LinkedInIcon,
  GitHubIcon,
  WebsiteIcon,
} from "./components";

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
    <section className="flex flex-col gap-8 max-w-7xl mx-auto px-4 py-6">
      {/* Estilos CSS para impresión y exportación PDF */}
      <style jsx>{`
        /* ===== AISLAMIENTO COMPLETO DEL CV DEL SISTEMA DE TEMAS ===== */
        /* Estos estilos garantizan que el CV mantenga colores fijos independientemente del tema */

        .cv-container {
          /* Aislamiento completo del tema */
          color-scheme: light !important;
        }

        .cv-container,
        .cv-container * {
          /* Forzar colores específicos para elementos del CV */
          color: inherit !important;
          background-color: inherit !important;
          border-color: inherit !important;
        }

        /* ===== FORMATO VISUAL - COLORES FIJOS ===== */
        .cv-visual {
          background: #ffffff !important;
          color: #000000 !important;
        }

        /* Header del CV */
        .cv-visual .cv-header {
          background-color: #374151 !important; /* bg-gray-700 */
          color: #ffffff !important;
          border-color: #4b5563 !important; /* border-gray-600 */
        }

        .cv-visual .cv-header h1 {
          color: #ffffff !important;
        }

        .cv-visual .cv-header h2 {
          color: #d1d5db !important; /* text-gray-300 */
        }

        /* Sidebar del CV */
        .cv-visual .cv-sidebar {
          background-color: #374151 !important; /* bg-gray-700 */
          color: #ffffff !important;
        }

        .cv-visual .cv-sidebar h3 {
          background-color: #06b6d4 !important; /* bg-cyan-500 */
          color: #ffffff !important;
        }

        .cv-visual .cv-sidebar .text-gray-300 {
          color: #d1d5db !important;
        }

        .cv-visual .cv-sidebar .text-gray-200 {
          color: #e5e7eb !important;
        }

        .cv-visual .cv-sidebar .text-white {
          color: #ffffff !important;
        }

        /* Contenido principal del CV */
        .cv-visual .cv-main {
          background-color: #ffffff !important;
          color: #000000 !important;
        }

        .cv-visual .cv-main h3 {
          color: #111827 !important; /* text-gray-900 */
          border-color: #e5e7eb !important; /* border-gray-200 */
        }

        .cv-visual .cv-main .text-gray-900 {
          color: #111827 !important;
        }

        .cv-visual .cv-main .text-gray-700 {
          color: #374151 !important;
        }

        .cv-visual .cv-main .text-gray-600 {
          color: #4b5563 !important;
        }

        .cv-visual .cv-main .text-gray-500 {
          color: #6b7280 !important;
        }

        .cv-visual .cv-main .border-gray-300 {
          border-color: #d1d5db !important;
        }

        .cv-visual .cv-main .border-gray-200 {
          border-color: #e5e7eb !important;
        }

        .cv-visual .cv-main .bg-gray-50 {
          background-color: #f9fafb !important;
        }

        .cv-visual .cv-main .text-blue-600 {
          color: #2563eb !important;
        }

        .cv-visual .cv-main .text-green-600 {
          color: #16a34a !important;
        }

        /* ===== FORMATO ATS - COLORES FIJOS ===== */
        .cv-ats {
          font-family: Arial, sans-serif !important;
          color: #000000 !important;
          background: #ffffff !important;
          line-height: 1.4 !important;
        }

        .cv-ats,
        .cv-ats *,
        .cv-ats div,
        .cv-ats section,
        .cv-ats p,
        .cv-ats span,
        .cv-ats h1,
        .cv-ats h2,
        .cv-ats h3,
        .cv-ats h4,
        .cv-ats strong {
          font-family: Arial, sans-serif !important;
          color: #000000 !important;
          background-color: #ffffff !important;
        }

        /* Forzar fondo blanco en contenedores específicos del ATS */
        .cv-ats .w-full,
        .cv-ats .max-w-4xl,
        .cv-ats .mx-auto,
        .cv-ats .bg-white,
        .cv-ats .p-8,
        .cv-ats .px-12,
        .cv-ats .font-serif {
          background-color: #ffffff !important;
        }

        /* Asegurar que todos los elementos de texto sean negros */
        .cv-ats h1,
        .cv-ats h2,
        .cv-ats h3,
        .cv-ats h4 {
          color: #000000 !important;
          font-weight: bold !important;
          background-color: #ffffff !important;
        }

        .cv-ats .border-black {
          border-color: #000000 !important;
          background-color: #ffffff !important;
        }

        .cv-ats .text-black {
          color: #000000 !important;
          background-color: #ffffff !important;
        }

        /* Forzar colores específicos para elementos comunes */
        .cv-ats .text-center {
          background-color: #ffffff !important;
        }

        .cv-ats .mb-6,
        .cv-ats .mb-4,
        .cv-ats .mb-3,
        .cv-ats .mb-2,
        .cv-ats .mb-1 {
          background-color: #ffffff !important;
        }

        .cv-ats .space-y-4 > *,
        .cv-ats .space-y-3 > *,
        .cv-ats .space-y-2 > *,
        .cv-ats .space-y-1 > * {
          background-color: #ffffff !important;
        }

        /* Reglas ultra específicas para el formato ATS */
        .cv-container.cv-ats {
          background-color: #ffffff !important;
        }

        .cv-container.cv-ats,
        .cv-container.cv-ats * {
          background-color: #ffffff !important;
          color: #000000 !important;
        }

        /* Anular cualquier herencia del tema para ATS */
        .cv-ats .page-1,
        .cv-ats .page-2 {
          background-color: #ffffff !important;
        }

        /* Forzar fondo blanco en elementos específicos del ATS */
        .cv-ats #cv-page-1,
        .cv-ats #cv-page-2 {
          background-color: #ffffff !important;
        }

        .cv-ats .grid,
        .cv-ats .flex,
        .cv-ats .contact-info-grid {
          background-color: #ffffff !important;
        }

        /* ===== ESTILOS PARA EXPORTACIÓN PDF ===== */
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
          .cv-ats.page-2 {
            border-top: 2px solid #000000;
          }
        }

        /* Configuración para impresión ATS */
        @media print {
          /* Configuración de página específica para ATS */
          @page :first {
            margin: 0mm !important;
            padding: 0mm !important;
          }

          .cv-ats {
            font-family: Arial, sans-serif !important;
            color: #000000 !important;
            background: #ffffff !important;
          }

          .cv-ats * {
            font-family: Arial, sans-serif !important;
            color: #000000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .cv-ats .border-black {
            border-color: #000000 !important;
          }

          .cv-ats h1,
          .cv-ats h2,
          .cv-ats h3,
          .cv-ats h4 {
            color: #000000 !important;
            font-weight: bold !important;
          }

          /* Márgenes específicos para formato ATS en impresión */
          #cv-page-1.cv-ats,
          #cv-page-2.cv-ats {
            padding: 15mm 20mm !important;
            margin: 0 !important;
            width: 100% !important;
            min-height: 297mm !important;
            box-sizing: border-box !important;
          }

          /* Forzar dos columnas para información de contacto ATS en impresión */
          .cv-ats .contact-info-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
            column-gap: 16px !important;
          }

          #cv-page-1.cv-ats > div,
          #cv-page-2.cv-ats > div {
            padding: 0 !important;
            margin: 0 !important;
            max-width: none !important;
            width: 100% !important;
          }

          /* Asegurar márgenes para todos los estados de impresión */
          body.printing-cv #cv-page-1.cv-ats,
          body.printing-cv #cv-page-2.cv-ats,
          body.print-only-cv-page-1 #cv-page-1.cv-ats,
          body.print-only-cv-page-2 #cv-page-2.cv-ats {
            padding: 15mm 20mm !important;
            margin: 0 !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
        }

        /* ===== ESTRUCTURA VISUAL Y DIFERENCIACIÓN DEL FONDO ===== */

        /* Contenedor principal del CV con estructura visual */
        .cv-container {
          /* Sombra sutil para diferenciar del fondo */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border-radius: 8px;
          overflow: hidden;
          margin: 1rem auto;
          max-width: 210mm; /* Ancho A4 */
        }

        /* Estructura específica para formato visual */
        .cv-visual {
          border: 1px solid #e5e7eb;
          background-color: #ffffff !important;
          /* Asegurar proporciones A4 correctas */
          width: 100%;
          max-width: 210mm;
          min-height: 297mm;
        }

        /* Optimización de espaciado para formato visual */
        .cv-visual .page-1,
        .cv-visual .page-2 {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          min-height: 297mm;
        }

        /* Contenido principal visual más compacto */
        .cv-visual .cv-main {
          padding: 1.5rem !important; /* Reducir padding de 2rem a 1.5rem */
        }

        /* Sidebar visual más compacto */
        .cv-visual .cv-sidebar {
          padding: 1.5rem !important; /* Reducir padding de 1.5rem a 1.25rem */
        }

        /* Espaciado vertical reducido en formato visual */
        .cv-visual .space-y-6 > * + * {
          margin-top: 1.25rem !important;
        }

        .cv-visual .space-y-4 > * + * {
          margin-top: 1rem !important;
        }

        .cv-visual .space-y-3 > * + * {
          margin-top: 0.75rem !important;
        }

        .cv-visual .mb-8 {
          margin-bottom: 1.5rem !important;
        }

        .cv-visual .mb-6 {
          margin-bottom: 1.25rem !important;
        }

        .cv-visual .mb-4 {
          margin-bottom: 1rem !important;
        }

        /* Títulos del sidebar más compactos */
        .cv-visual .cv-sidebar h3 {
          padding: 0.5rem 1rem !important; /* Reducir padding vertical */
          margin-bottom: 0.75rem !important;
        }

        /* Pie de página visual - asegurar que termine correctamente */
        .cv-visual .cv-footer {
          background-color: #374151 !important;
          min-height: 2rem !important;
          width: 100% !important;
          margin: 0 !important;
        }

        /* Estructura flex para páginas visuales */
        .cv-visual .page-1 .flex.min-h-screen {
          min-height: 297mm !important;
        }

        .cv-visual .page-2 .flex.flex-col.min-h-full {
          min-height: 297mm !important;
          display: flex !important;
          flex-direction: column !important;
        }

        .cv-visual .page-2 .cv-main.flex-1 {
          flex: 1 !important;
        }

        /* Asegurar que el sidebar tenga altura completa en página 1 */
        .cv-visual .cv-sidebar.min-h-full {
          min-height: 100% !important;
          display: flex !important;
          flex-direction: column !important;
        }

        /* Estructura específica para formato ATS */
        .cv-ats {
          border: 2px solid #d1d5db;
          background-color: #ffffff !important;
          /* Asegurar proporciones A4 correctas */
          width: 100%;
          max-width: 210mm;
          min-height: 297mm;
        }

        /* Contenedor interno ATS con dimensiones A4 exactas */
        .cv-ats .w-full.max-w-4xl {
          max-width: 100% !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 12mm 15mm !important; /* Márgenes más compactos, similares a impresión */
          box-sizing: border-box !important;
        }

        /* Ajustes adicionales para hacer el ATS más compacto */
        .cv-ats .space-y-6 > * + * {
          margin-top: 1rem !important; /* Reducir espaciado vertical */
        }

        .cv-ats .space-y-4 > * + * {
          margin-top: 0.75rem !important;
        }

        .cv-ats .space-y-3 > * + * {
          margin-top: 0.5rem !important;
        }

        .cv-ats .mb-6 {
          margin-bottom: 1rem !important;
        }

        .cv-ats .mb-4 {
          margin-bottom: 0.75rem !important;
        }

        .cv-ats .mb-3 {
          margin-bottom: 0.5rem !important;
        }

        /* Hacer los títulos más compactos */
        .cv-ats h1 {
          margin-bottom: 0.5rem !important;
          font-size: 1.75rem !important;
        }

        .cv-ats h2 {
          margin-bottom: 0.5rem !important;
          font-size: 1.25rem !important;
        }

        .cv-ats h3 {
          margin-bottom: 0.25rem !important;
          font-size: 1.1rem !important;
        }

        /* Reducir espaciado en listas */
        .cv-ats ul,
        .cv-ats ol {
          margin-bottom: 0.5rem !important;
        }

        .cv-ats li {
          margin-bottom: 0.25rem !important;
        }

        /* Páginas del CV con estructura mejorada */
        .cv-container .page-1,
        .cv-container .page-2 {
          position: relative;
          min-height: 297mm; /* Altura A4 */
          width: 100%;
        }

        /* Separador visual entre páginas */
        .cv-container .page-2 {
          border-top: 3px dashed #9ca3af;
          margin-top: 2rem;
          padding-top: 2rem;
        }

        /* Para formato ATS, separador más sutil */
        .cv-ats .page-2 {
          border-top: 2px solid #d1d5db;
        }

        /* Mejoras de estructura responsive */
        @media screen and (max-width: 768px) {
          .cv-container {
            margin: 0.5rem;
            border-radius: 4px;
          }

          .cv-container .page-1,
          .cv-container .page-2 {
            min-height: auto;
          }
        }

        /* Hover effect sutil para mejor UX */
        .cv-container:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: box-shadow 0.3s ease-in-out;
        }

        /* Indicador visual de formato ATS */
        .cv-ats::before {
          content: "FORMATO ATS";
          position: absolute;
          top: -2px;
          right: -2px;
          background: #10b981;
          color: white;
          padding: 4px 8px;
          font-size: 10px;
          font-weight: bold;
          border-radius: 0 6px 0 6px;
          z-index: 10;
        }

        /* Indicador visual de formato Visual */
        .cv-visual::before {
          content: "FORMATO VISUAL";
          position: absolute;
          top: -2px;
          right: -2px;
          background: #3b82f6;
          color: white;
          padding: 4px 8px;
          font-size: 10px;
          font-weight: bold;
          border-radius: 0 6px 0 6px;
          z-index: 10;
        }

        /* Ocultar indicadores en impresión */
        @media print {
          .cv-ats::before,
          .cv-visual::before {
            display: none !important;
          }

          .cv-container {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            border-radius: 0 !important;
          }

          .cv-container .page-2 {
            border-top: none !important;
            margin-top: 0 !important;
            padding-top: 0 !important;
          }
        }
      `}</style>

      {/* CV Active Indicator */}
      <ActiveCVIndicator currentCVName={currentCVName} />

      {/* Format Selector */}
      <FormatSelector cvFormat={cvFormat} setCvFormat={setCvFormat} />

      {/* Print Control */}
      <PrintControls handlePrintPage={handlePrintPage} />

      {/* CV Content */}
      <div
        className={`cv-container print-content ${
          cvFormat === "visual" ? "cv-visual" : "cv-ats"
        }`}
      >
        {cvFormat === "visual" ? (
          <>
            {/* FORMATO VISUAL - PÁGINA 1 */}
            <div id="cv-page-1" className="page-1 cv-visual" data-page="1">
              {/* Header */}
              <div className="cv-header text-center bg-gray-700 py-6 border-b-2 border-gray-600">
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
                <div className="cv-sidebar w-1/3 bg-gray-700 text-white p-6 min-h-full flex flex-col">
                  {/* Datos Personales */}
                  <div className="mb-8">
                    <h3 className="text-base font-semibold mb-3 bg-cyan-500 text-center py-1 px-2 text-white">
                      Datos Personales
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <PhoneIcon size={16} className="text-gray-300" />
                        <span>{cvData.personalInfo.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <EmailIcon size={16} className="text-gray-300" />
                        <span className="break-all">
                          {cvData.personalInfo.email}
                        </span>
                      </div>
                      {cvData.personalInfo.linkedin && (
                        <div className="flex items-center space-x-2">
                          <LinkedInIcon size={16} className="text-gray-300" />
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
                          {sn.name === "GitHub" ? (
                            <GitHubIcon size={16} className="text-gray-300" />
                          ) : (
                            <WebsiteIcon size={16} className="text-gray-300" />
                          )}
                          <span className="break-all text-xs">{sn.url}</span>
                        </div>
                      ))}
                      {cvData.personalInfo.website && (
                        <div className="flex items-center space-x-2">
                          <WebsiteIcon size={16} className="text-gray-300" />
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
                <div className="cv-main w-2/3 p-8">
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
            <div id="cv-page-2" className="page-2 cv-visual" data-page="2">
              <div className="flex flex-col min-h-full">
                <div className="cv-main w-full p-8 bg-white flex-1">
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
                                <span className="font-medium">
                                  Verificación:
                                </span>{" "}
                                {cert.url}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Referencias Profesionales */}
                  {cvData.references.filter((ref) => ref.selected).length >
                    0 && (
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
                <div className="cv-footer text-center bg-gray-700 py-4 border-t-2 border-gray-600"></div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* FORMATO ATS - Optimizado para sistemas automáticos */}
            <div id="cv-page-1" className="page-1 cv-ats" data-page="1">
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
            <div id="cv-page-2" className="page-2 cv-ats" data-page="2">
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
                          </div>
                          <p className="font-bold text-black">{cert.issuer}</p>
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
