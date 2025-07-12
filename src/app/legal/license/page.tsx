"use client";

import React from "react";
import { MainLayout } from "@/components/layout";

export default function LicensePage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div
                className="license-content"
                dangerouslySetInnerHTML={{
                  __html: `
                    <style>
                      .license-content {
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                        line-height: 1.6;
                        color: #374151;
                      }
                      .dark .license-content {
                        color: #d1d5db;
                      }
                      .license-content h1 {
                        font-size: 2rem;
                        font-weight: 700;
                        margin-bottom: 1rem;
                        color: #111827;
                      }
                      .dark .license-content h1 {
                        color: #f9fafb;
                      }
                      .license-content h2 {
                        font-size: 1.5rem;
                        font-weight: 600;
                        margin-top: 2rem;
                        margin-bottom: 1rem;
                        color: #111827;
                      }
                      .dark .license-content h2 {
                        color: #f9fafb;
                      }
                      .license-content p {
                        margin-bottom: 1rem;
                        text-align: justify;
                      }
                      .license-content ul {
                        margin-bottom: 1rem;
                        padding-left: 1.5rem;
                      }
                      .license-content li {
                        margin-bottom: 0.5rem;
                      }
                      .license-content strong {
                        font-weight: 600;
                        color: #111827;
                      }
                      .dark .license-content strong {
                        color: #f9fafb;
                      }
                      .license-content a {
                        color: #3b82f6;
                        text-decoration: underline;
                      }
                      .license-content a:hover {
                        color: #2563eb;
                      }
                      .license-content .note-box {
                        background-color: #dcfce7;
                        border: 1px solid #22c55e;
                        border-radius: 0.5rem;
                        padding: 1rem;
                        margin-top: 1.5rem;
                      }
                      .dark .license-content .note-box {
                        background-color: #14532d;
                        border-color: #22c55e;
                      }
                      .license-content .note-box p {
                        color: #15803d;
                        margin: 0;
                      }
                      .dark .license-content .note-box p {
                        color: #86efac;
                      }
                    </style>
                    <h1>LICENCIA DE USO</h1>
                    <p><strong>Última actualización:</strong> 12 de julio de 2025</p>

                    <h2>LICENCIA DE SOFTWARE</h2>
                    <p>CVitaPilot se proporciona bajo una licencia de uso personal y comercial limitada. Esta licencia le permite utilizar el software para crear y gestionar sus currículums vitae profesionales.</p>

                    <h2>DERECHOS CONCEDIDOS</h2>
                    <ul>
                      <li>Uso personal y comercial del software</li>
                      <li>Creación y gestión de múltiples currículums</li>
                      <li>Exportación de documentos en formatos estándar</li>
                      <li>Almacenamiento seguro de sus datos profesionales</li>
                    </ul>

                    <h2>RESTRICCIONES</h2>
                    <ul>
                      <li>No puede redistribuir el software</li>
                      <li>No puede realizar ingeniería inversa del código</li>
                      <li>No puede usar el servicio para actividades ilegales</li>
                      <li>No puede compartir su cuenta con terceros</li>
                    </ul>

                    <h2>PROPIEDAD INTELECTUAL</h2>
                    <p>CVitaPilot y todo su contenido, incluyendo pero no limitado a textos, gráficos, logos, iconos, imágenes, clips de audio, descargas digitales y compilaciones de datos, son propiedad de CVitaPilot y están protegidos por las leyes de propiedad intelectual.</p>

                    <h2>CONTENIDO DEL USUARIO</h2>
                    <p>Usted conserva todos los derechos sobre el contenido que crea y sube a CVitaPilot. Al usar nuestro servicio, nos otorga una licencia limitada para almacenar y procesar su contenido únicamente para proporcionar el servicio.</p>

                    <h2>TERMINACIÓN</h2>
                    <p>Esta licencia es efectiva hasta que sea terminada por usted o por nosotros. Sus derechos bajo esta licencia terminarán automáticamente sin previo aviso si no cumple con cualquiera de sus términos y condiciones.</p>

                    <h2>CONTACTO</h2>
                    <p>Si tiene preguntas sobre esta licencia, contáctenos en <a href="mailto:contact@imamultidev.dev">contact@imamultidev.dev</a></p>

                    <div class="note-box">
                      <p><strong>Nota:</strong> Al usar CVitaPilot, usted acepta los términos de esta licencia de uso.</p>
                    </div>
                  `,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
