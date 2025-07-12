"use client";

import React from "react";
import { MainLayout } from "@/components/layout";

export default function CookiesPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div
                className="cookies-content"
                dangerouslySetInnerHTML={{
                  __html: `
                    <style>
                      .cookies-content {
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                        line-height: 1.6;
                        color: #374151;
                      }
                      .dark .cookies-content {
                        color: #d1d5db;
                      }
                      .cookies-content h1 {
                        font-size: 2rem;
                        font-weight: 700;
                        margin-bottom: 1rem;
                        color: #111827;
                      }
                      .dark .cookies-content h1 {
                        color: #f9fafb;
                      }
                      .cookies-content h2 {
                        font-size: 1.5rem;
                        font-weight: 600;
                        margin-top: 2rem;
                        margin-bottom: 1rem;
                        color: #111827;
                      }
                      .dark .cookies-content h2 {
                        color: #f9fafb;
                      }
                      .cookies-content h3 {
                        font-size: 1.25rem;
                        font-weight: 600;
                        margin-top: 1.5rem;
                        margin-bottom: 0.75rem;
                        color: #111827;
                      }
                      .dark .cookies-content h3 {
                        color: #f9fafb;
                      }
                      .cookies-content p {
                        margin-bottom: 1rem;
                        text-align: justify;
                      }
                      .cookies-content ul {
                        margin-bottom: 1rem;
                        padding-left: 1.5rem;
                      }
                      .cookies-content li {
                        margin-bottom: 0.5rem;
                      }
                      .cookies-content strong {
                        font-weight: 600;
                        color: #111827;
                      }
                      .dark .cookies-content strong {
                        color: #f9fafb;
                      }
                      .cookies-content a {
                        color: #3b82f6;
                        text-decoration: underline;
                      }
                      .cookies-content a:hover {
                        color: #2563eb;
                      }
                      .cookies-content .note-box {
                        background-color: #dbeafe;
                        border: 1px solid #93c5fd;
                        border-radius: 0.5rem;
                        padding: 1rem;
                        margin-top: 1.5rem;
                      }
                      .dark .cookies-content .note-box {
                        background-color: #1e3a8a;
                        border-color: #3b82f6;
                      }
                      .cookies-content .note-box p {
                        color: #1e40af;
                        margin: 0;
                      }
                      .dark .cookies-content .note-box p {
                        color: #93c5fd;
                      }
                    </style>
                    <h1>POLÍTICA DE COOKIES</h1>
                    <p><strong>Última actualización:</strong> 12 de julio de 2025</p>

                    <h2>¿QUÉ SON LAS COOKIES?</h2>
                    <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Nos ayudan a mejorar su experiencia y a entender cómo utiliza nuestro sitio.</p>

                    <h2>TIPOS DE COOKIES QUE UTILIZAMOS</h2>

                    <h3>Cookies Esenciales</h3>
                    <p>Estas cookies son necesarias para el funcionamiento básico del sitio web. Incluyen cookies que permiten que se recuerde su sesión de usuario y sus preferencias de seguridad.</p>

                    <h3>Cookies de Rendimiento</h3>
                    <p>Utilizamos Google Analytics para recopilar información sobre cómo los visitantes utilizan nuestro sitio web. Esto nos ayuda a mejorar nuestro sitio y proporcionar una mejor experiencia de usuario.</p>

                    <h3>Cookies de Funcionalidad</h3>
                    <p>Estas cookies permiten que el sitio web recuerde las elecciones que hace (como su nombre de usuario, idioma o la región en la que se encuentra) y proporcionan características mejoradas y más personales.</p>

                    <h2>GESTIÓN DE COOKIES</h2>
                    <p>Puede controlar y/o eliminar las cookies según desee. Puede eliminar todas las cookies que ya están en su dispositivo y puede configurar la mayoría de los navegadores para que no las coloquen.</p>

                    <h2>MÁS INFORMACIÓN</h2>
                    <p>Para obtener más información sobre cómo utilizamos las cookies, consulte nuestra <a href="/legal/privacy-policy">Política de Privacidad</a>.</p>

                    <div class="note-box">
                      <p><strong>Nota:</strong> Al continuar utilizando nuestro sitio web, usted acepta el uso de cookies de acuerdo con esta política.</p>
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
