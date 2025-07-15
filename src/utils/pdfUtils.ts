import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CVData } from "@/types/cv";

export interface PDFExportOptions {
  filename?: string;
  quality?: number;
  format?: "a4" | "letter";
  orientation?: "portrait" | "landscape";
}

export const pdfUtils = {
  /**
   * Exporta un elemento HTML a PDF usando html2canvas y jsPDF
   */
  exportToPDF: async (
    elementId: string,
    options: PDFExportOptions = {}
  ): Promise<void> => {
    try {
      const {
        filename = "cv-export.pdf",
        quality = 1.0,
        orientation = "portrait",
      } = options;

      // Obtener el elemento a exportar
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`Elemento con ID "${elementId}" no encontrado`);
      }

      // Configurar opciones para html2canvas
      const canvasOptions = {
        scale: 2, // Mayor resolución
        useCORS: false,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        removeContainer: true,
        foreignObjectRendering: false,
      };

      // Mostrar indicador de carga
      const loadingIndicator = document.createElement("div");
      loadingIndicator.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          color: white;
          font-size: 18px;
        ">
          <div style="text-align: center;">
            <div style="margin-bottom: 10px;">📄 Generando PDF...</div>
            <div style="font-size: 14px; opacity: 0.8;">Por favor espera un momento</div>
          </div>
        </div>
      `;
      document.body.appendChild(loadingIndicator);

      // Capturar el elemento como canvas
      const canvas = await html2canvas(element, canvasOptions);

      // Configurar dimensiones del PDF
      const imgData = canvas.toDataURL("image/png", quality);
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Configurar jsPDF
      const pdf = new jsPDF({
        orientation,
        unit: "px",
        format: [imgWidth, imgHeight],
        compress: true,
      });

      // Añadir la imagen al PDF
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // Descargar el PDF
      pdf.save(filename);

      // Remover indicador de carga
      document.body.removeChild(loadingIndicator);
    } catch (error) {
      console.error("Error al exportar PDF:", error);

      // Remover indicador de carga si existe
      const loadingIndicator = document.querySelector(
        '[style*="z-index: 9999"]'
      );
      if (loadingIndicator) {
        document.body.removeChild(loadingIndicator);
      }

      throw new Error(
        "Error al generar el PDF. Por favor, inténtalo de nuevo."
      );
    }
  },

  /**
   * Exporta múltiples páginas a PDF
   */
  exportMultiPageToPDF: async (
    pageElementIds: string[],
    options: PDFExportOptions = {}
  ): Promise<void> => {
    try {
      const {
        filename = "cv-export.pdf",
        quality = 1.0,
        orientation = "portrait",
      } = options;

      if (pageElementIds.length === 0) {
        throw new Error("No se proporcionaron elementos para exportar");
      }

      // Mostrar indicador de carga
      const loadingIndicator = document.createElement("div");
      loadingIndicator.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          color: white;
          font-size: 18px;
        ">
          <div style="text-align: center;">
            <div style="margin-bottom: 10px;">📄 Generando PDF...</div>
            <div style="font-size: 14px; opacity: 0.8;">Procesando página 1 de ${pageElementIds.length}</div>
          </div>
        </div>
      `;
      document.body.appendChild(loadingIndicator);

      let pdf: jsPDF | null = null;

      for (let i = 0; i < pageElementIds.length; i++) {
        const elementId = pageElementIds[i];
        const element = document.getElementById(elementId);

        if (!element) {
          console.warn(
            `Elemento con ID "${elementId}" no encontrado, saltando...`
          );
          continue;
        }

        // Actualizar indicador de progreso
        const progressDiv = loadingIndicator.querySelector(
          '[style*="font-size: 14px"]'
        ) as HTMLElement;
        if (progressDiv) {
          progressDiv.textContent = `Procesando página ${i + 1} de ${pageElementIds.length}`;
        }

        // Configurar opciones para html2canvas
        const canvasOptions = {
          scale: 2,
          useCORS: false,
          allowTaint: false,
          backgroundColor: "#ffffff",
          logging: false,
          removeContainer: true,
          foreignObjectRendering: false,
        };

        // Capturar el elemento como canvas
        const canvas = await html2canvas(element, canvasOptions);
        const imgData = canvas.toDataURL("image/png", quality);
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        if (i === 0) {
          // Crear el PDF con la primera página
          pdf = new jsPDF({
            orientation,
            unit: "px",
            format: [imgWidth, imgHeight],
            compress: true,
          });
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        } else {
          // Añadir páginas adicionales
          if (pdf) {
            pdf.addPage([imgWidth, imgHeight], orientation);
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          }
        }
      }

      if (pdf) {
        // Descargar el PDF
        pdf.save(filename);
      } else {
        throw new Error("No se pudo crear el PDF");
      }

      // Remover indicador de carga
      document.body.removeChild(loadingIndicator);
    } catch (error) {
      console.error("Error al exportar PDF multipágina:", error);

      // Remover indicador de carga si existe
      const loadingIndicator = document.querySelector(
        '[style*="z-index: 9999"]'
      );
      if (loadingIndicator) {
        document.body.removeChild(loadingIndicator);
      }

      throw new Error(
        "Error al generar el PDF. Por favor, inténtalo de nuevo."
      );
    }
  },

  /**
   * Exporta CV inteligentemente basado en el formato actual
   */
  exportCVIntelligent: async (
    cvData: CVData,
    currentFormat: string = "visual"
  ): Promise<void> => {
    try {
      // Buscar el contenedor del CV
      const cvContainer = document.querySelector(
        ".cv-container"
      ) as HTMLElement;
      if (!cvContainer) {
        throw new Error("No se encontró el contenedor del CV");
      }

      // Buscar páginas individuales
      const page1 = document.getElementById("cv-page-1");
      const page2 = document.getElementById("cv-page-2");

      if (page1 && page2) {
        // Exportar múltiples páginas
        await pdfUtils.exportMultiPageToPDF(["cv-page-1", "cv-page-2"], {
          filename: `CV_${currentFormat}_${cvData.personalInfo.name.replace(/\s+/g, "_")}.pdf`,
          quality: 1.0,
          orientation: "portrait",
        });
      } else if (cvContainer) {
        // Exportar contenedor completo
        await pdfUtils.exportToPDF("cv-container", {
          filename: `CV_${currentFormat}_${cvData.personalInfo.name.replace(/\s+/g, "_")}.pdf`,
          quality: 1.0,
          orientation: "portrait",
        });
      } else {
        throw new Error("No se encontró ningún elemento para exportar");
      }
    } catch (error) {
      console.error("Error en exportación inteligente:", error);
      throw error;
    }
  },

  /**
   * Genera un nombre de archivo basado en los datos del CV
   */
  generateFilename: (cvData: { personalInfo: { name: string } }): string => {
    const name = cvData.personalInfo.name
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "")
      .toLowerCase();
    const date = new Date().toISOString().split("T")[0];
    return `CV_${name}_${date}.pdf`;
  },

  /**
   * Prepara el elemento para exportación (optimiza estilos)
   */
  prepareElementForExport: (elementId: string): void => {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Añadir clase para exportación
    element.classList.add("pdf-export");

    // Aplicar estilos específicos para PDF
    const style = document.createElement("style");
    style.textContent = `
      .pdf-export {
        background: white !important;
        color: black !important;
        font-family: Arial, sans-serif !important;
        line-height: 1.4 !important;
      }
      .pdf-export * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    `;
    document.head.appendChild(style);
  },

  /**
   * Limpia los estilos después de la exportación
   */
  cleanupAfterExport: (elementId: string): void => {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.classList.remove("pdf-export");
  },

  /**
   * Función alternativa simple para exportar un elemento a PDF
   */
  exportToPDFSimple: async (
    elementId: string,
    filename: string = "cv-export.pdf"
  ): Promise<void> => {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`Elemento con ID "${elementId}" no encontrado`);
      }

      // Configuración simple para html2canvas
      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: false,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
      });

      // Crear PDF con dimensiones A4
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png", 0.8);
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(filename);
    } catch (error) {
      console.error("Error en exportación simple:", error);
      throw new Error("Error al generar el PDF con método simple");
    }
  },

  /**
   * Función ultra simple mejorada - versión estable
   */
  exportToPDFUltraSimple: async (
    elementId: string,
    filename: string = "cv-export.pdf"
  ): Promise<void> => {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Elemento con ID "${elementId}" no encontrado`);
    }

    try {
      console.log(
        `[PDF Export] Iniciando exportación para elemento: ${elementId}`
      );

      // Configuración optimizada para html2canvas (misma que funcionaba antes)
      const canvas = await html2canvas(element, {
        scale: 1.5, // Resolución equilibrada
        useCORS: false,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        removeContainer: true,
        foreignObjectRendering: false,
      });

      console.log(
        `[PDF Export] Canvas creado exitosamente. Dimensiones: ${canvas.width}x${canvas.height}`
      );

      // Crear PDF con dimensiones A4
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: false, // Desactivar compresión para mejor calidad
      });

      const imgData = canvas.toDataURL("image/png", 0.95); // PNG con alta calidad
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Verificar si la altura excede una página A4
      const pageHeight = 297; // A4 height in mm

      if (imgHeight <= pageHeight) {
        // Imagen cabe en una página
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      } else {
        // Ajustar imagen para que quepa en la página
        const scaleFactor = pageHeight / imgHeight;
        const scaledWidth = imgWidth * scaleFactor;
        const scaledHeight = pageHeight;

        // Centrar horizontalmente si es necesario
        const xOffset =
          scaledWidth < imgWidth ? (imgWidth - scaledWidth) / 2 : 0;

        pdf.addImage(imgData, "PNG", xOffset, 0, scaledWidth, scaledHeight);
      }

      pdf.save(filename);
      console.log(`[PDF Export] PDF guardado exitosamente: ${filename}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      console.error(
        `[PDF Export] Error en exportToPDFUltraSimple para ${elementId}:`,
        error
      );
      if (error instanceof Error && error.stack) {
        console.error(`[PDF Export] Stack trace:`, error.stack);
      }
      throw new Error(
        `Error al generar el PDF para ${elementId}: ${errorMessage}`
      );
    }
  },

  /**
   * Aplica estilos inline para evitar problemas con oklch
   */
  applyInlineStyles: (element: HTMLElement): void => {
    const allElements = [
      element,
      ...Array.from(element.querySelectorAll("*")),
    ] as HTMLElement[];

    allElements.forEach((el) => {
      // Mapeo de clases de Tailwind a estilos inline
      const classList = Array.from(el.classList);

      // Colores de fondo
      if (classList.includes("bg-gray-700")) {
        el.style.backgroundColor = "#374151";
        el.style.color = "#ffffff";
      }
      if (classList.includes("bg-cyan-500")) {
        el.style.backgroundColor = "#06b6d4";
        el.style.color = "#ffffff";
      }
      if (classList.includes("bg-gray-50")) {
        el.style.backgroundColor = "#f9fafb";
      }
      if (classList.includes("bg-white")) {
        el.style.backgroundColor = "#ffffff";
      }

      // Colores de texto
      if (classList.includes("text-white")) {
        el.style.color = "#ffffff";
      }
      if (classList.includes("text-gray-900")) {
        el.style.color = "#111827";
      }
      if (classList.includes("text-gray-700")) {
        el.style.color = "#374151";
      }
      if (classList.includes("text-gray-600")) {
        el.style.color = "#4b5563";
      }
      if (classList.includes("text-gray-500")) {
        el.style.color = "#6b7280";
      }
      if (classList.includes("text-gray-300")) {
        el.style.color = "#d1d5db";
      }
      if (classList.includes("text-gray-200")) {
        el.style.color = "#e5e7eb";
      }
      if (classList.includes("text-blue-600")) {
        el.style.color = "#2563eb";
      }
      if (classList.includes("text-green-600")) {
        el.style.color = "#16a34a";
      }

      // Bordes
      if (classList.includes("border-gray-300")) {
        el.style.borderColor = "#d1d5db";
      }
      if (classList.includes("border-gray-200")) {
        el.style.borderColor = "#e5e7eb";
      }
      if (classList.includes("border-gray-600")) {
        el.style.borderColor = "#4b5563";
      }

      // Clases de layout y espaciado (mantener algunas)
      const keepClasses = [
        "flex",
        "items-center",
        "justify-between",
        "space-y-1",
        "space-y-2",
        "space-y-4",
        "space-y-6",
        "gap-1",
        "gap-2",
        "mb-1",
        "mb-2",
        "mb-3",
        "mb-6",
        "mb-8",
        "pl-4",
        "p-4",
        "py-1",
        "py-4",
        "px-2",
        "px-8",
        "text-xs",
        "text-sm",
        "text-base",
        "text-xl",
        "text-2xl",
        "text-4xl",
        "font-bold",
        "font-medium",
        "font-semibold",
        "italic",
        "border-l-4",
        "border-b-2",
        "rounded-lg",
        "text-center",
        "break-all",
        "leading-relaxed",
        "w-full",
        "min-h-screen",
      ];

      // Filtrar clases: mantener las de layout, remover las de color
      const filteredClasses = classList.filter(
        (cls) =>
          keepClasses.some((keepCls) => cls.includes(keepCls)) ||
          (!cls.startsWith("text-") &&
            !cls.startsWith("bg-") &&
            !cls.startsWith("border-"))
      );

      el.className = filteredClasses.join(" ");
    });
  },
};
