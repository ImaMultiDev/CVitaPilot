"use client";

import React from "react";
import { pdfUtils } from "@/utils/pdfUtils";
import { Button } from "@/components/ui";

export default function TestPDFPage() {
  const handleTestExport = async () => {
    try {
      console.log("Iniciando prueba de exportación PDF...");

      // Crear un elemento de prueba
      const testElement = document.createElement("div");
      testElement.id = "test-pdf-element";
      testElement.innerHTML = `
        <div style="
          width: 210mm;
          height: 297mm;
          background: white;
          padding: 20mm;
          font-family: Arial, sans-serif;
          color: black;
        ">
          <h1 style="font-size: 24px; margin-bottom: 20px;">Test PDF Export</h1>
          <p style="font-size: 14px; line-height: 1.4;">
            Esta es una prueba del sistema de exportación PDF usando html2canvas y jsPDF.
          </p>
          <div style="margin-top: 20px; padding: 10px; background: #f0f0f0;">
            <h2 style="font-size: 18px; margin-bottom: 10px;">Características:</h2>
            <ul style="font-size: 12px;">
              <li>Exportación con html2canvas</li>
              <li>Generación de PDF con jsPDF</li>
              <li>Optimización para A4</li>
              <li>Soporte para múltiples páginas</li>
            </ul>
          </div>
        </div>
      `;

      document.body.appendChild(testElement);

      // Esperar un momento para que se renderice
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Probar exportación
      await pdfUtils.exportToPDFUltraSimple(
        "test-pdf-element",
        "test-export.pdf"
      );

      // Limpiar
      document.body.removeChild(testElement);

      console.log("✅ Prueba de exportación completada exitosamente");
    } catch (error) {
      console.error("❌ Error en prueba de exportación:", error);
      alert(
        "Error en la prueba de exportación. Revisa la consola para más detalles."
      );
    }
  };

  const handleTestMultiPage = async () => {
    try {
      console.log("Iniciando prueba de exportación multipágina...");

      // Crear elementos de prueba
      const page1 = document.createElement("div");
      page1.id = "test-page-1";
      page1.innerHTML = `
        <div style="
          width: 210mm;
          height: 297mm;
          background: white;
          padding: 20mm;
          font-family: Arial, sans-serif;
          color: black;
        ">
          <h1 style="font-size: 24px; margin-bottom: 20px;">Página 1</h1>
          <p style="font-size: 14px; line-height: 1.4;">
            Esta es la primera página del test de exportación multipágina.
          </p>
        </div>
      `;

      const page2 = document.createElement("div");
      page2.id = "test-page-2";
      page2.innerHTML = `
        <div style="
          width: 210mm;
          height: 297mm;
          background: white;
          padding: 20mm;
          font-family: Arial, sans-serif;
          color: black;
        ">
          <h1 style="font-size: 24px; margin-bottom: 20px;">Página 2</h1>
          <p style="font-size: 14px; line-height: 1.4;">
            Esta es la segunda página del test de exportación multipágina.
          </p>
        </div>
      `;

      document.body.appendChild(page1);
      document.body.appendChild(page2);

      // Esperar un momento para que se renderice
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Probar exportación multipágina
      await pdfUtils.exportMultiPageToPDF(["test-page-1", "test-page-2"], {
        filename: "test-multipage.pdf",
        quality: 1.0,
        orientation: "portrait",
      });

      // Limpiar
      document.body.removeChild(page1);
      document.body.removeChild(page2);

      console.log(
        "✅ Prueba de exportación multipágina completada exitosamente"
      );
    } catch (error) {
      console.error("❌ Error en prueba de exportación multipágina:", error);
      alert(
        "Error en la prueba de exportación multipágina. Revisa la consola para más detalles."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Test de Exportación PDF
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Pruebas del Sistema de Exportación
            </h2>
            <p className="text-gray-600 mb-6">
              Esta página permite probar el sistema de exportación PDF usando
              html2canvas y jsPDF.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <Button
                onClick={handleTestExport}
                variant="primary"
                className="flex items-center gap-2"
              >
                <span>Probar Exportación Simple</span>
              </Button>

              <Button
                onClick={handleTestMultiPage}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <span>Probar Exportación Multipágina</span>
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Instrucciones:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>
                • Haz clic en &quot;Probar Exportación Simple&quot; para generar
                un PDF de una página
              </li>
              <li>
                • Haz clic en &quot;Probar Exportación Multipágina&quot; para
                generar un PDF de dos páginas
              </li>
              <li>
                • Revisa la consola del navegador para ver los logs detallados
              </li>
              <li>• Los archivos se descargarán automáticamente</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">
              Tecnologías Utilizadas:
            </h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>
                • <strong>html2canvas:</strong> Captura del DOM como imagen
              </li>
              <li>
                • <strong>jsPDF:</strong> Generación de archivos PDF
              </li>
              <li>
                • <strong>Optimización CSS:</strong> Estilos específicos para
                PDF
              </li>
              <li>
                • <strong>Soporte A4:</strong> Dimensiones estándar de papel
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
