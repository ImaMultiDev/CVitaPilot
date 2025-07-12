"use client";

import React from "react";
import { MainLayout } from "@/components/layout";

export default function TermsOfServicePage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div
                className="terms-content"
                dangerouslySetInnerHTML={{
                  __html: `
                    <style>
                      .terms-content {
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        line-height: 1.6;
                        color: #374151;
                      }
                      .dark .terms-content {
                        color: #d1d5db;
                      }
                      .terms-content h1 {
                        font-size: 2rem;
                        font-weight: 700;
                        margin-bottom: 1rem;
                        color: #111827;
                      }
                      .dark .terms-content h1 {
                        color: #f9fafb;
                      }
                      .terms-content h2 {
                        font-size: 1.5rem;
                        font-weight: 600;
                        margin-top: 2rem;
                        margin-bottom: 1rem;
                        color: #111827;
                      }
                      .dark .terms-content h2 {
                        color: #f9fafb;
                      }
                      .terms-content h3 {
                        font-size: 1.25rem;
                        font-weight: 600;
                        margin-top: 1.5rem;
                        margin-bottom: 0.75rem;
                        color: #111827;
                      }
                      .dark .terms-content h3 {
                        color: #f9fafb;
                      }
                      .terms-content p {
                        margin-bottom: 1rem;
                      }
                      .terms-content ul {
                        margin-bottom: 1rem;
                        padding-left: 1.5rem;
                      }
                      .terms-content li {
                        margin-bottom: 0.5rem;
                      }
                      .terms-content a {
                        color: #3b82f6;
                        text-decoration: underline;
                      }
                      .terms-content a:hover {
                        color: #2563eb;
                      }
                      .terms-content strong {
                        font-weight: 600;
                      }
                      .terms-content em {
                        font-style: italic;
                      }
                      .terms-content .contact-info {
                        border: 1px solid #e5e7eb;
                        padding: 1rem;
                        border-radius: 0.5rem;
                        margin: 1rem 0;
                      }
                      .terms-content.dark .contact-info {
                        background-color: #374151;
                      }
                    </style>
                    
                    <h1>TÉRMINOS Y CONDICIONES</h1>
                    <p><strong>Última actualización:</strong> 12 de julio de 2025</p>
                    
                    <h2>1. ACUERDO A LOS TÉRMINOS</h2>
                    
                    <p>Estos Términos y Condiciones constituyen un acuerdo legalmente vinculante celebrado entre usted, ya sea personalmente o en nombre de una entidad ("usted"), y CVitaPilot ("Compañía", "nosotros", "nos" o "nuestro"), con respecto a su acceso y uso de la plataforma CVitaPilot como un producto de Software-as-a-Service (SaaS), incluyendo cualquier contenido, funcionalidad y servicios ofrecidos.</p>
                    
                    <p>Usted acepta que al acceder a la plataforma, ha leído, entendido y acordado estar sujeto a todos estos Términos. Si no está de acuerdo, tiene prohibido usar la plataforma y debe discontinuar su uso inmediatamente.</p>
                    
                    <h2>2. INFORMACIÓN DE LA COMPAÑÍA</h2>
                    
                    <ul>
                      <li><strong>Nombre Legal Completo:</strong> CVitaPilot</li>
                      <li><strong>Jurisdicción:</strong> España, Navarra</li>
                      <li><strong>Email:</strong> <a href="mailto:contact@imamultidev.dev">contact@imamultidev.dev</a></li>
                      <li><strong>Teléfono:</strong> (ES) 689181720</li>
                      <li><strong>Dirección:</strong> Pamplona, Navarra, 31011, España</li>
                    </ul>
                    
                    <h2>3. USO DE LOS SERVICIOS</h2>
                    
                    <p>Nuestra plataforma se proporciona tanto para uso personal como interno de negocios. Los usuarios deben tener al menos 18 años para registrarse o usar la plataforma. Actualmente, CVitaPilot no ofrece software descargable o una aplicación móvil, pero las versiones futuras pueden incluir tales características.</p>
                    
                    <h2>4. SUSCRIPCIÓN Y PAGOS</h2>
                    
                    <p>Si bien la plataforma actualmente no ofrece planes de suscripción, está planificado para implementación futura. Los métodos de pago aceptados incluirán Visa, Mastercard y PayPal, y todas las transacciones se procesarán en Euros.</p>
                    
                    <h2>5. POLÍTICA DE REEMBOLSO</h2>
                    
                    <p>Los reembolsos pueden ser solicitados por los usuarios en compras calificadas, sujeto a nuestros procedimientos internos de aprobación y procesamiento.</p>
                    
                    <h2>6. ACTIVIDADES PROHIBIDAS</h2>
                    
                    <p>Los usuarios acuerdan no participar en las siguientes actividades: publicitar servicios a través de la plataforma, transferir su perfil a otros, y cualquier otra acción que viole estos términos, leyes o integridad de la plataforma. El contenido que sea dañino, ilegal o viole los derechos de terceros está estrictamente prohibido.</p>
                    
                    <h2>7. CONTENIDO DEL USUARIO Y RESEÑAS</h2>
                    
                    <p>Los usuarios pueden subir contenido como fotos de perfil y enviar reseñas de productos o servicios. Todo el contenido debe cumplir con las leyes aplicables y nuestras pautas. Al enviar contenido, los usuarios otorgan a CVitaPilot el derecho de usar y mostrarlo en la plataforma.</p>
                    
                    <h2>8. SERVICIOS DE TERCEROS</h2>
                    
                    <p>CVitaPilot puede incluir enlaces a sitios web de terceros. No somos responsables de su contenido o prácticas. Actualmente no se muestran anuncios de terceros en la plataforma.</p>
                    
                    <h2>9. LEY APLICABLE Y RESOLUCIÓN DE DISPUTAS</h2>
                    
                    <p>Estos términos se rigen por las leyes de España, específicamente Navarra. En caso de disputa, las partes primero intentarán negociaciones informales. Si no se resuelve, las disputas se resolverán a través de arbitraje vinculante.</p>
                    
                    <h2>10. LIMITACIÓN DE RESPONSABILIDAD</h2>
                    
                    <p>Nuestra responsabilidad está limitada al menor de la cantidad pagada por el usuario o 6 meses de tarifas de suscripción. La responsabilidad también está limitada a reclamos presentados dentro de los 6 meses.</p>
                    
                    <h2>11. ACTUALIZACIONES DE LOS TÉRMINOS</h2>
                    
                    <p>Nos reservamos el derecho de actualizar estos Términos. Los usuarios serán notificados por correo electrónico al menos 7 días antes de que los cambios entren en vigor. Las actualizaciones relacionadas con nuevas características, seguridad, errores o órdenes judiciales pueden aplicarse inmediatamente.</p>
                    
                    <h2>12. CONTÁCTENOS</h2>
                    
                    <div class="contact-info">
                      <p>Para cualquier pregunta o inquietud con respecto a estos Términos, por favor contáctenos en:</p>
                      <ul>
                        <li><strong>Email:</strong> <a href="mailto:contact@imamultidev.dev">contact@imamultidev.dev</a></li>
                        <li><strong>Teléfono:</strong> (ES) 689181720</li>
                        <li><strong>Dirección:</strong> Pamplona, Navarra, 31011, España</li>
                      </ul>
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
