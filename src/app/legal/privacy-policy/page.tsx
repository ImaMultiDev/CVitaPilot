"use client";

import React from "react";
import { MainLayout } from "@/components/layout";

export default function PrivacyPolicyPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <div
                className="privacy-policy-content"
                dangerouslySetInnerHTML={{
                  __html: `
                    <style>
                      .privacy-policy-content {
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        line-height: 1.6;
                        color: #374151;
                      }
                      .dark .privacy-policy-content {
                        color: #d1d5db;
                      }
                      .privacy-policy-content h1 {
                        font-size: 2rem;
                        font-weight: 700;
                        margin-bottom: 1rem;
                        color: #111827;
                      }
                      .dark .privacy-policy-content h1 {
                        color: #f9fafb;
                      }
                      .privacy-policy-content h2 {
                        font-size: 1.5rem;
                        font-weight: 600;
                        margin-top: 2rem;
                        margin-bottom: 1rem;
                        color: #111827;
                      }
                      .dark .privacy-policy-content h2 {
                        color: #f9fafb;
                      }
                      .privacy-policy-content h3 {
                        font-size: 1.25rem;
                        font-weight: 600;
                        margin-top: 1.5rem;
                        margin-bottom: 0.75rem;
                        color: #111827;
                      }
                      .dark .privacy-policy-content h3 {
                        color: #f9fafb;
                      }
                      .privacy-policy-content p {
                        margin-bottom: 1rem;
                      }
                      .privacy-policy-content ul {
                        margin-bottom: 1rem;
                        padding-left: 1.5rem;
                      }
                      .privacy-policy-content li {
                        margin-bottom: 0.5rem;
                      }
                      .privacy-policy-content a {
                        color: #3b82f6;
                        text-decoration: underline;
                      }
                      .privacy-policy-content a:hover {
                        color: #2563eb;
                      }
                      .privacy-policy-content strong {
                        font-weight: 600;
                      }
                      .privacy-policy-content em {
                        font-style: italic;
                      }
                    </style>
                    <h1>POLÍTICA DE PRIVACIDAD</h1>
                    <p><strong>Última actualización:</strong> 12 de julio de 2025</p>
                    
                    <p>Esta Política de Privacidad para CVitaPilot ("nosotros", "nos" o "nuestro"), describe cómo y por qué podríamos acceder, recopilar, almacenar, usar y/o compartir ("procesar") su información personal cuando utiliza nuestros servicios ("Servicios"), incluyendo cuando usted:</p>
                    
                    <ul>
                      <li>Visita nuestro sitio web en <a href="https://www.cvitapilot.com" target="_blank" rel="noopener noreferrer">https://www.cvitapilot.com</a> o cualquier sitio web nuestro que enlace a esta Política de Privacidad</li>
                      <li>Descarga y usa nuestra aplicación móvil (CVitaPilot) o cualquier otra aplicación nuestra que enlace a esta Política de Privacidad</li>
                      <li>Usa CVitaPilot. CVitaPilot es una herramienta digital que ayuda a los usuarios a crear, gestionar y compartir currículums vitae profesionales (CV) y perfiles de carrera. Usamos información personal solo para autenticar usuarios y personalizar su experiencia. El servicio puede integrarse con plataformas de terceros como LinkedIn o Google para propósitos de inicio de sesión.</li>
                      <li>Se relaciona con nosotros de otras maneras relacionadas, incluyendo cualquier venta, marketing o eventos</li>
                    </ul>
                    
                    <h2>RESUMEN DE PUNTOS CLAVE</h2>
                    
                    <p><strong>¿Qué información personal procesamos?</strong> Cuando visita, usa o navega por nuestros Servicios, podemos procesar información personal dependiendo de cómo interactúe con nosotros y los Servicios, las elecciones que haga y los productos y características que use.</p>
                    
                    <p><strong>¿Procesamos alguna información personal sensible?</strong> No procesamos información personal sensible.</p>
                    
                    <p><strong>¿Recopilamos alguna información de terceros?</strong> No recopilamos ninguna información de terceros.</p>
                    
                    <p><strong>¿Cómo procesamos su información?</strong> Procesamos su información para proporcionar, mejorar y administrar nuestros Servicios, comunicarnos con usted, para seguridad y prevención de fraude, y para cumplir con la ley.</p>
                    
                    <p><strong>¿En qué situaciones y con qué partes compartimos información personal?</strong> Podemos compartir información en situaciones específicas y con terceros específicos.</p>
                    
                    <p><strong>¿Cómo mantenemos su información segura?</strong> Tenemos procesos y procedimientos organizacionales y técnicos adecuados para proteger su información personal.</p>
                    
                    <p><strong>¿Cuáles son sus derechos?</strong> Dependiendo de dónde se encuentre geográficamente, la ley de privacidad aplicable puede significar que tiene ciertos derechos con respecto a su información personal.</p>
                    
                    <p><strong>¿Cómo ejerce sus derechos?</strong> La forma más fácil de ejercer sus derechos es visitando <a href="https://www.cvitapilot.com/settings" target="_blank" rel="noopener noreferrer">https://www.cvitapilot.com/settings</a>, o contactándonos.</p>
                    
                    <h2>1. ¿QUÉ INFORMACIÓN RECOPILAMOS?</h2>
                    
                    <h3>Información personal que usted nos proporciona</h3>
                    
                    <p>Recopilamos información personal que usted nos proporciona voluntariamente cuando se registra en los Servicios, expresa interés en obtener información sobre nosotros o nuestros productos y Servicios, cuando participa en actividades en los Servicios, o de otra manera cuando nos contacta.</p>
                    
                    <p><strong>Información Personal Proporcionada por Usted.</strong> La información personal que recopilamos depende del contexto de sus interacciones con nosotros y los Servicios, las elecciones que haga y los productos y características que use. La información personal que recopilamos puede incluir lo siguiente:</p>
                    
                    <ul>
                      <li>Datos de contacto o autenticación</li>
                      <li>Contraseñas</li>
                      <li>Títulos de trabajo</li>
                      <li>Nombres de usuario</li>
                      <li>Direcciones postales</li>
                      <li>Direcciones de correo electrónico</li>
                      <li>Números de teléfono</li>
                      <li>Nombres</li>
                      <li>Cualificaciones profesionales, certificaciones, habilidades, enlaces de redes sociales y otra información relacionada con el currículum proporcionada voluntariamente por el usuario</li>
                      <li>Preferencias de contacto</li>
                    </ul>
                    
                    <h3>Información recopilada automáticamente</h3>
                    
                    <p>Recopilamos automáticamente cierta información cuando visita, usa o navega por los Servicios. Esta información no revela su identidad específica (como su nombre o información de contacto) pero puede incluir información del dispositivo y uso, como su dirección IP, características del navegador y dispositivo, sistema operativo, preferencias de idioma, URLs de referencia, nombre del dispositivo, país, ubicación, información sobre cómo y cuándo usa nuestros Servicios, y otra información técnica.</p>
                    
                    <h2>2. ¿CÓMO PROCESAMOS SU INFORMACIÓN?</h2>
                    
                    <p>Procesamos su información personal por una variedad de razones, dependiendo de cómo interactúe con nuestros Servicios, incluyendo:</p>
                    
                    <ul>
                      <li><strong>Para facilitar la creación de cuentas y autenticación y gestionar cuentas de usuario.</strong> Podemos procesar su información para que pueda crear e iniciar sesión en su cuenta, así como mantener su cuenta en funcionamiento.</li>
                      <li><strong>Para entregar y facilitar la entrega de servicios al usuario.</strong> Podemos procesar su información para proporcionarle el servicio solicitado.</li>
                      <li><strong>Para responder a consultas de usuarios/ofrecer soporte a usuarios.</strong> Podemos procesar su información para responder a sus consultas y resolver cualquier problema potencial que pueda tener con el servicio solicitado.</li>
                      <li><strong>Para enviar información administrativa.</strong> Podemos procesar su información para enviarle detalles sobre nuestros productos y servicios, cambios en nuestros términos y políticas, y otra información similar.</li>
                      <li><strong>Para proteger nuestros Servicios.</strong> Podemos procesar su información como parte de nuestros esfuerzos para mantener nuestros Servicios seguros, incluyendo monitoreo y prevención de fraude.</li>
                      <li><strong>Para identificar tendencias de uso.</strong> Podemos procesar información sobre cómo usa nuestros Servicios para entender mejor cómo se están usando para poder mejorarlos.</li>
                      <li><strong>Para salvar o proteger el interés vital de un individuo.</strong> Podemos procesar su información cuando sea necesario para salvar o proteger el interés vital de un individuo, como para prevenir daños.</li>
                    </ul>
                    
                    <h2>3. ¿QUÉ BASES LEGALES UTILIZAMOS PARA PROCESAR SU INFORMACIÓN?</h2>
                    
                    <p>Solo procesamos su información personal cuando creemos que es necesario y tenemos una razón legal válida (es decir, base legal) para hacerlo bajo la ley aplicable, como con su consentimiento, para cumplir con las leyes, para proporcionarle servicios para celebrar o cumplir nuestras obligaciones contractuales, para proteger sus derechos, o para cumplir nuestros intereses comerciales legítimos.</p>
                    
                    <h2>4. ¿CUÁNDO Y CON QUIÉN COMPARTIMOS SU INFORMACIÓN PERSONAL?</h2>
                    
                    <p>Podemos compartir información en situaciones específicas descritas en esta sección y/o con los siguientes terceros:</p>
                    
                    <ul>
                      <li><strong>Vendedores, Consultores y Otros Proveedores de Servicios de Terceros.</strong> Podemos compartir sus datos con vendedores de terceros, proveedores de servicios, contratistas o agentes ("terceros") que realizan servicios para nosotros o en nuestro nombre y requieren acceso a dicha información para hacer ese trabajo.</li>
                    </ul>
                    
                    <h2>5. ¿UTILIZAMOS COOKIES Y OTRAS TECNOLOGÍAS DE SEGUIMIENTO?</h2>
                    
                    <p>Como muchas empresas, también recopilamos información a través de cookies y tecnologías similares. Puede obtener más información sobre esto en nuestro Aviso de Cookies: <a href="https://cvitapilot.com/cookies" target="_blank" rel="noopener noreferrer">https://cvitapilot.com/cookies</a>.</p>
                    
                    <h2>6. ¿CÓMO MANEJAMOS SUS INICIOS DE SESIÓN SOCIALES?</h2>
                    
                    <p>Podemos proporcionarle la opción de registrarse con nosotros usando los detalles de su cuenta de redes sociales existente, como su cuenta de Facebook, X u otras redes sociales. Si elige registrarse de esta manera, recopilaremos cierta información de perfil sobre usted del proveedor de redes sociales.</p>
                    
                    <h2>7. ¿SE TRANSFIERE SU INFORMACIÓN INTERNACIONALMENTE?</h2>
                    
                    <p>Podemos transferir, almacenar y procesar su información en países distintos al suyo. Nuestros servidores están ubicados en [países específicos]. Si está ubicado fuera de estos países y elige usar nuestros Servicios, tenga en cuenta que su información puede ser transferida a, almacenada y procesada en esos países.</p>
                    
                    <h2>8. ¿CUÁNTO TIEMPO CONSERVAMOS SU INFORMACIÓN?</h2>
                    
                    <p>Conservamos su información solo por el tiempo que es necesario para cumplir con los propósitos descritos en esta Política de Privacidad, a menos que la ley requiera o permita un período de retención más largo.</p>
                    
                    <h2>9. ¿CÓMO MANTENEMOS SU INFORMACIÓN SEGURA?</h2>
                    
                    <p>Tenemos procesos y procedimientos organizacionales y técnicos adecuados para proteger su información personal. Sin embargo, ninguna transmisión electrónica a través de Internet o tecnología de almacenamiento de información puede garantizarse como 100% segura.</p>
                    
                    <h2>10. ¿RECOPILAMOS INFORMACIÓN DE MENORES?</h2>
                    
                    <p>No recopilamos intencionalmente datos de menores de 18 años. Si usted es menor de 18 años, no use ni proporcione ninguna información en estos Servicios o a través de cualquiera de sus características.</p>
                    
                    <h2>11. ¿CUÁLES SON SUS DERECHOS DE PRIVACIDAD?</h2>
                    
                    <p>Dependiendo de su ubicación geográfica, la ley de privacidad aplicable puede significar que tiene ciertos derechos con respecto a su información personal.</p>
                    
                    <h2>12. CONTROLES PARA CARACTERÍSTICAS DE NO SEGUIR</h2>
                    
                    <p>La mayoría de los navegadores web y algunos sistemas operativos móviles y aplicaciones móviles incluyen una característica de No Seguir ("DNT") que puede activar para señalar su preferencia de privacidad de no tener información sobre sus actividades de navegación en línea monitoreadas y recopiladas.</p>
                    
                    <h2>13. ¿LOS RESIDENTES DE ESTADOS UNIDOS TIENEN DERECHOS DE PRIVACIDAD ESPECÍFICOS?</h2>
                    
                    <p>Si es residente de California, Colorado, Connecticut, Utah o Virginia, tiene derechos específicos con respecto a su información personal.</p>
                    
                    <h2>14. INFORMACIÓN DEL CURRÍCULUM</h2>
                    
                    <p>CVitaPilot está diseñado para ayudar a los usuarios a crear y gestionar sus currículums vitae profesionales. Toda la información del currículum que proporcione es voluntaria y se utiliza únicamente para proporcionar el servicio solicitado.</p>
                    
                    <h2>15. COMPROMISO DE SEGURIDAD</h2>
                    
                    <p>Nos comprometemos a proteger la seguridad de su información personal. Implementamos medidas de seguridad técnicas y organizacionales apropiadas para proteger contra el acceso no autorizado, alteración, divulgación o destrucción de su información personal.</p>
                    
                    <h2>16. SIN PUBLICIDAD O PERFILADO</h2>
                    
                    <p>No utilizamos su información personal para publicidad dirigida o para crear perfiles de usuario para propósitos de marketing. Su información se utiliza únicamente para proporcionar y mejorar nuestros servicios de creación de currículums.</p>
                    
                    <h2>17. ¿HACEMOS ACTUALIZACIONES A ESTE AVISO?</h2>
                    
                    <p>Podemos actualizar esta Política de Privacidad de vez en cuando. La versión actualizada se indicará con una fecha de "Revisión" actualizada y la versión actualizada será efectiva tan pronto como sea accesible.</p>
                    
                    <h2>18. ¿CÓMO PUEDE CONTACTARNOS SOBRE ESTE AVISO?</h2>
                    
                    <p>Si tiene preguntas o comentarios sobre este aviso, puede enviarnos un correo electrónico a <a href="mailto:contact@imamultidev.dev">contact@imamultidev.dev</a>.</p>
                    
                    <h2>19. ¿CÓMO PUEDE REVISAR, ACTUALIZAR O ELIMINAR LOS DATOS QUE RECOPILAMOS DE USTED?</h2>
                    
                    <p>Puede revisar, actualizar o eliminar su información personal visitando <a href="https://www.cvitapilot.com/settings" target="_blank" rel="noopener noreferrer">https://www.cvitapilot.com/settings</a> o contactándonos directamente.</p>
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
