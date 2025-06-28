export const printCVPage = (pageId: string, pageName: string) => {
  try {
    // Obtener el elemento de la página específica
    const pageElement = document.getElementById(pageId);
    if (!pageElement) {
      console.error(`No se encontró el elemento con ID: ${pageId}`);
      return;
    }

    // Crear una nueva ventana para la impresión
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) {
      console.error("No se pudo abrir la ventana de impresión");
      return;
    }

    // Obtener todos los estilos CSS de la página actual
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join("\n");
        } catch (_e) {
          // Algunos stylesheets pueden tener problemas de CORS
          return "";
        }
      })
      .join("\n");

    // HTML para la ventana de impresión
    const printHTML = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${pageName} - CVitaPilot</title>
        <style>
          /* Reset básico */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          /* Estilos específicos para impresión */
          @media print {
            @page {
              size: A4;
              margin: 0;
              padding: 0;
            }
            
            body {
              margin: 0;
              padding: 0;
              background: white !important;
              color: black !important;
              font-family: Arial, sans-serif;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .cv-page {
              width: 210mm !important;
              min-height: 297mm !important;
              max-width: 210mm !important;
              margin: 0 !important;
              padding: 20mm !important;
              background: white !important;
              box-shadow: none !important;
              border: none !important;
              page-break-after: avoid;
              overflow: visible !important;
            }

            /* Ocultar elementos no necesarios para impresión */
            .no-print,
            [class*="no-print"],
            button,
            .print-hide {
              display: none !important;
            }

            /* Asegurar que el texto sea legible */
            * {
              color: black !important;
              background: transparent !important;
            }

            /* Preservar colores específicos del CV */
            .cv-page * {
              color: inherit !important;
            }

            /* Estilos para formato visual */
            [style*="background: linear-gradient"] {
              background: #14b8a6 !important;
              color: white !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            [style*="background:#14b8a6"],
            [style*="background: #14b8a6"] {
              background: #14b8a6 !important;
              color: white !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            /* Preservar colores de texto en sidebar */
            [style*="color: #ffffff"],
            [style*="color:#ffffff"] {
              color: white !important;
            }

            /* Correcciones específicas para formato visual */
            .visual-format .cv-page .flex {
              display: block !important;
            }

            .visual-format .cv-page [style*="width: 35%"] {
              width: 100% !important;
              margin-bottom: 15pt !important;
            }

            .visual-format .cv-page [style*="flex: 1"] {
              flex: none !important;
              width: 100% !important;
            }
          }

          /* Estilos generales heredados */
          ${styles}
        </style>
      </head>
      <body>
        ${pageElement.outerHTML}
      </body>
      </html>
    `;

    // Escribir el HTML en la nueva ventana
    printWindow.document.write(printHTML);
    printWindow.document.close();

    // Esperar a que se carguen los estilos y luego imprimir
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 500);
    };

    console.log(`✅ Imprimiendo ${pageName} (${pageId})`);
  } catch (error) {
    console.error("Error al imprimir:", error);
    // Fallback a impresión normal
    window.print();
  }
};

export const printAllCVPages = () => {
  try {
    // Obtener ambas páginas del CV
    const page1 = document.getElementById("cv-page-1");
    const page2 = document.getElementById("cv-page-2");

    if (!page1 || !page2) {
      console.error("No se encontraron las páginas del CV");
      return;
    }

    // Crear una nueva ventana para la impresión
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) {
      console.error("No se pudo abrir la ventana de impresión");
      return;
    }

    // Obtener estilos
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join("\n");
        } catch (_e) {
          return "";
        }
      })
      .join("\n");

    // HTML para ambas páginas
    const printHTML = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CV Completo - CVitaPilot</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          @media print {
            @page {
              size: A4;
              margin: 0;
            }
            
            body {
              margin: 0;
              padding: 0;
              background: white !important;
              color: black !important;
              font-family: Arial, sans-serif;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .cv-page {
              width: 210mm !important;
              min-height: 297mm !important;
              max-width: 210mm !important;
              margin: 0 !important;
              padding: 20mm !important;
              background: white !important;
              box-shadow: none !important;
              border: none !important;
              page-break-after: always;
              overflow: visible !important;
            }

            .cv-page:last-child {
              page-break-after: avoid;
            }

            .no-print,
            [class*="no-print"],
            button,
            .print-hide {
              display: none !important;
            }

            * {
              color: black !important;
              background: transparent !important;
            }

            .cv-page * {
              color: inherit !important;
            }

            [style*="background: linear-gradient"] {
              background: #14b8a6 !important;
              color: white !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            [style*="background:#14b8a6"],
            [style*="background: #14b8a6"] {
              background: #14b8a6 !important;
              color: white !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            [style*="color: #ffffff"],
            [style*="color:#ffffff"] {
              color: white !important;
            }

            /* Correcciones específicas para formato visual */
            .visual-format .cv-page .flex {
              display: block !important;
            }

            .visual-format .cv-page [style*="width: 35%"] {
              width: 100% !important;
              margin-bottom: 15pt !important;
            }

            .visual-format .cv-page [style*="flex: 1"] {
              flex: none !important;
              width: 100% !important;
            }
          }

          ${styles}
        </style>
      </head>
      <body>
        ${page1.outerHTML}
        ${page2.outerHTML}
      </body>
      </html>
    `;

    printWindow.document.write(printHTML);
    printWindow.document.close();

    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 500);
    };

    console.log("✅ Imprimiendo CV completo (ambas páginas)");
  } catch (error) {
    console.error("Error al imprimir CV completo:", error);
    window.print();
  }
};
