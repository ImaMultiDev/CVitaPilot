"use client";

import React from "react";
import { Card } from "@/components/ui/Card";

export const GuiaCVPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📚 Guía Completa del CV Perfecto
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Todo lo que necesitas saber para crear un CV que destaque, superar
            los sistemas ATS, escribir cartas de presentación efectivas y
            dominar tu búsqueda de empleo.
          </p>
        </div>

        {/* Tabla de Contenidos */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📋 Tabla de Contenidos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Estructura del CV
              </h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>
                  •{" "}
                  <a
                    href="#estructura-cv"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Elementos esenciales
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="#diseno-formato"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Diseño y formato
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="#contenido-estrategico"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Contenido estratégico
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Optimización ATS
              </h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>
                  •{" "}
                  <a
                    href="#que-es-ats"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    ¿Qué son los ATS?
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="#optimizacion-ats"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Cómo optimizar tu CV
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="#palabras-clave"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Palabras clave efectivas
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Carta de Presentación
              </h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>
                  •{" "}
                  <a
                    href="#modelo-eva-porto"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Método Eva Porto
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="#estructura-carta"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Estructura efectiva
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="#personalizacion"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Personalización
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Consejos Avanzados
              </h3>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>
                  •{" "}
                  <a
                    href="#errores-comunes"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Errores a evitar
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="#tendencias-2024"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Tendencias 2024-2025
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="#herramientas"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Herramientas útiles
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Sección 1: Estructura del CV */}
        <section id="estructura-cv" className="mb-12">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              🏗️ Estructura del CV Perfecto
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Elementos Esenciales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                      📍 Información de Contacto
                    </h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                      <li>• Nombre completo</li>
                      <li>• Teléfono con código de país</li>
                      <li>• Email profesional</li>
                      <li>• LinkedIn actualizado</li>
                      <li>• Ciudad y país (sin dirección completa)</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                      💼 Resumen Profesional
                    </h4>
                    <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                      <li>• 3-4 líneas máximo</li>
                      <li>• Incluye años de experiencia</li>
                      <li>• Menciona habilidades clave</li>
                      <li>• Alineado con el puesto objetivo</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                      🎯 Experiencia Laboral
                    </h4>
                    <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-1">
                      <li>• Orden cronológico inverso</li>
                      <li>• Logros cuantificables</li>
                      <li>• Verbos de acción</li>
                      <li>• Máximo 4-5 viñetas por puesto</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
                      🎓 Formación y Habilidades
                    </h4>
                    <ul className="text-sm text-orange-700 dark:text-orange-400 space-y-1">
                      <li>• Título más relevante primero</li>
                      <li>• Habilidades técnicas específicas</li>
                      <li>• Certificaciones vigentes</li>
                      <li>• Idiomas con nivel MCER</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div id="diseno-formato">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  🎨 Diseño y Formato
                </h3>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                        Tipografía
                      </h4>
                      <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                        <li>• Arial, Calibri o Times New Roman</li>
                        <li>• 11-12pt para texto normal</li>
                        <li>• 14-16pt para encabezados</li>
                        <li>• Consistencia en todo el documento</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                        Espaciado
                      </h4>
                      <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                        <li>• Márgenes 2-2.5cm</li>
                        <li>• Interlineado 1.15</li>
                        <li>• Espacios entre secciones</li>
                        <li>• Evitar texto apretado</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                        Archivo
                      </h4>
                      <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                        <li>• Formato .docx o PDF</li>
                        <li>• Nombre: CV_Nombre_Apellido</li>
                        <li>• Máximo 5MB</li>
                        <li>• Sin imágenes ni gráficos</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Sección 2: ATS */}
        <section id="que-es-ats" className="mb-12">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              🤖 Sistemas ATS: Tu Primer Filtro
            </h2>

            <div className="space-y-8">
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-400 dark:border-red-600">
                <h3 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-3">
                  ⚠️ Dato Importante
                </h3>
                <p className="text-red-700 dark:text-red-400 text-lg">
                  El{" "}
                  <strong>
                    75% de los CVs son rechazados por sistemas ATS
                  </strong>{" "}
                  antes de llegar a un reclutador humano. El 99% de las empresas
                  Fortune 500 utilizan estos sistemas.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  ¿Qué es un ATS?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Un Sistema de Seguimiento de Candidatos (Applicant Tracking
                  System) es un software que las empresas utilizan para filtrar
                  automáticamente los CVs antes de que lleguen a recursos
                  humanos. Funciona como un &quot;robot guardián&quot; que
                  escanea, analiza y clasifica los currículums según criterios
                  predefinidos.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">🔍</div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300">
                      1. Escaneo
                    </h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Analiza la estructura y extrae información clave
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">🎯</div>
                    <h4 className="font-semibold text-green-800 dark:text-green-300">
                      2. Búsqueda
                    </h4>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Busca palabras clave relacionadas con el puesto
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">📊</div>
                    <h4 className="font-semibold text-purple-800 dark:text-purple-300">
                      3. Clasificación
                    </h4>
                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      Asigna una puntuación y ordena por relevancia
                    </p>
                  </div>
                </div>
              </div>

              <div id="optimizacion-ats">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  🚀 Cómo Optimizar tu CV para ATS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3">
                      ✅ Lo que SÍ debes hacer:
                    </h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li>
                        • Usar encabezados estándar (&ldquo;Experiencia
                        Laboral&rdquo;, &ldquo;Educación&rdquo;)
                      </li>
                      <li>• Formato simple, una columna</li>
                      <li>• Incluir palabras clave de la oferta</li>
                      <li>• Fechas en formato MM/AAAA</li>
                      <li>• Guardar como .docx</li>
                      <li>• Describir abreviaturas la primera vez</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3">
                      ❌ Lo que NO debes hacer:
                    </h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li>• Usar tablas o columnas múltiples</li>
                      <li>• Incluir imágenes, gráficos o iconos</li>
                      <li>
                        • Encabezados creativos (&ldquo;Mi trayectoria&rdquo;)
                      </li>
                      <li>• Texto en encabezados/pies de página</li>
                      <li>• Fuentes decorativas o símbolos especiales</li>
                      <li>• Saturar con palabras clave</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div id="palabras-clave">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  🔑 Estrategia de Palabras Clave
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Método de 4 Pasos:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                        1
                      </div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Analizar
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Lee 3-5 ofertas similares e identifica términos
                        repetidos
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                      <div className="text-lg font-bold text-green-600 dark:text-green-400 mb-2">
                        2
                      </div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Extraer
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Usa herramientas como Jobscan para identificar keywords
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-2">
                        3
                      </div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Integrar
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Incluye naturalmente 2-3 veces cada término clave
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                      <div className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-2">
                        4
                      </div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Verificar
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Testa tu CV con herramientas de compatibilidad ATS
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Sección 3: Carta de Presentación */}
        <section id="modelo-eva-porto" className="mb-12">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              ✉️ Carta de Presentación: Método Eva Porto
            </h2>

            <div className="space-y-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-400 dark:border-blue-600">
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-3">
                  👩‍💼 Sobre Eva Porto
                </h3>
                <p className="text-blue-700 dark:text-blue-400">
                  Eva Porto Soto es una reconocida psicóloga, conferenciante y
                  autora especializada en empleabilidad. Es LinkedIn Top Voice
                  2023 y una referente en España para temas de currículum,
                  entrevistas y carrera profesional. Su método se basa en
                  personalización estratégica y conexión emocional con el
                  reclutador.
                </p>
              </div>

              <div id="estructura-carta">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  📝 Estructura de la Carta Perfecta
                </h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      1. Encabezado (Formal)
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
                      <p>
                        <strong>Estimado/a [Nombre específico]:</strong>
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        <em>
                          Nota de Eva Porto: Usar &ldquo;:&rdquo; en lugar de
                          &ldquo;,&rdquo; después del saludo para mayor
                          formalidad
                        </em>
                      </p>
                    </div>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      2. Primer Párrafo (Gancho)
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
                      <p>
                        <strong>Objetivo:</strong> Captar atención inmediata
                      </p>
                      <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Menciona el puesto específico</li>
                        <li>• Incluye un logro relevante impactante</li>
                        <li>• Muestra conocimiento sobre la empresa</li>
                      </ul>
                      <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <p className="text-blue-800 dark:text-blue-300">
                          <strong>Ejemplo:</strong>
                        </p>
                        <p className="text-blue-700 dark:text-blue-400 text-xs">
                          &ldquo;Me dirijo a usted para mostrar mi interés en el
                          puesto de Marketing Manager en [Empresa]. Durante mis
                          5 años en el sector, he logrado incrementar las ventas
                          en un 40% implementando estrategias digitales
                          innovadoras, algo que creo podría aportar gran valor a
                          [proyecto específico de la empresa].&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      3. Segundo Párrafo (Valor)
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
                      <p>
                        <strong>Objetivo:</strong> Demostrar encaje perfecto
                      </p>
                      <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Conecta tu experiencia con sus necesidades</li>
                        <li>• Usa 2-3 logros cuantificables</li>
                        <li>
                          • Menciona herramientas/metodologías específicas
                        </li>
                        <li>
                          • Evita competencias &ldquo;proactiva&rdquo; (consejo
                          de Eva Porto)
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      4. Cierre (Call to Action)
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
                      <p>
                        <strong>Objetivo:</strong> Invitar a la acción
                      </p>
                      <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                        <p className="text-green-800 dark:text-green-300">
                          <strong>Ejemplo:</strong>
                        </p>
                        <p className="text-green-700 dark:text-green-400 text-xs">
                          &ldquo;Estaré encantado/a de ampliar esta información
                          en una entrevista personal. Quedo a su disposición
                          para cualquier consulta adicional.
                          <br />
                          <br />
                          Atentamente,
                          <br />
                          [Tu nombre]&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="personalizacion">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  🎯 Personalización Estratégica
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3">
                      Investigación Previa
                    </h4>
                    <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                      <li>• LinkedIn del reclutador/hiring manager</li>
                      <li>• Noticias recientes de la empresa</li>
                      <li>• Valores y misión corporativa</li>
                      <li>• Proyectos actuales o expansiones</li>
                      <li>• Cultura empresarial en redes sociales</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-3">
                      Recomendaciones de Eva Porto
                    </h4>
                    <ul className="text-sm text-orange-700 dark:text-orange-400 space-y-1">
                      <li>• Solo para puestos que realmente te motiven</li>
                      <li>• Dedica tiempo a adaptarla completamente</li>
                      <li>• Máximo 1 página</li>
                      <li>• Evita competencias muy genéricas</li>
                      <li>• Acompaña siempre al CV, nunca sola</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Sección 4: Consejos Avanzados */}
        <section id="errores-comunes" className="mb-12">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              💡 Consejos Avanzados y Errores a Evitar
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  🚫 Errores Comunes que Arruinan tu CV
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-400 dark:border-red-600">
                    <h4 className="font-semibold text-red-800 dark:text-red-300 mb-3">
                      Errores de Contenido
                    </h4>
                    <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
                      <li>• Faltas de ortografía (60% menos probabilidades)</li>
                      <li>
                        • Información personal innecesaria (edad, estado civil)
                      </li>
                      <li>• Objetivos genéricos o anticuados</li>
                      <li>• Experiencia sin métricas ni resultados</li>
                      <li>
                        • Habilidades vagas (&ldquo;buenas habilidades
                        comunicativas&rdquo;)
                      </li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-400 dark:border-yellow-600">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3">
                      Errores Técnicos
                    </h4>
                    <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                      <li>
                        • Archivos con nombres genéricos (&ldquo;CV.pdf&rdquo;)
                      </li>
                      <li>• Formatos incompatibles con ATS</li>
                      <li>• Enlaces rotos o profiles desactualizados</li>
                      <li>• CV demasiado largo (más de 3 páginas)</li>
                      <li>• Diseños demasiado creativos</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div id="herramientas">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  🛠️ Herramientas Útiles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      📊 Análisis ATS
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Jobscan.co</li>
                      <li>• ResumeWorded.com</li>
                      <li>• SkillRoads</li>
                      <li>• TopResume (análisis gratuito)</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      ✏️ Revisión Texto
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Grammarly</li>
                      <li>• Hemingway App</li>
                      <li>• LanguageTool</li>
                      <li>• Corrector RAE</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      🎨 Diseño
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Canva (plantillas básicas)</li>
                      <li>• Resume.io</li>
                      <li>• Novoresume</li>
                      <li>• CV Engineer</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Sección Final: Checklist */}
        <section className="mb-12">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              ✅ Checklist Final: CV Perfecto
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Antes de Enviar
                </h3>
                <div className="space-y-2">
                  {[
                    "Información de contacto actualizada y profesional",
                    "CV adaptado a la oferta específica",
                    "Palabras clave de la descripción incluidas naturalmente",
                    "Logros cuantificados con números y porcentajes",
                    "Formato compatible con ATS (.docx preferible)",
                    "Sin errores ortográficos ni gramaticales",
                    "Longitud apropiada (1-2 páginas)",
                    "Nombre de archivo: CV_Nombre_Apellido_Puesto",
                  ].map((item, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Carta de Presentación
                </h3>
                <div className="space-y-2">
                  {[
                    "Dirigida a persona específica (nombre y apellido)",
                    "Primer párrafo con gancho específico",
                    "Logros relevantes incluidos",
                    "Conocimiento de la empresa demostrado",
                    "Call to action claro al final",
                    "Longitud máxima: 1 página",
                    "Tono profesional pero cercano",
                    "Revisión final de ortografía y coherencia",
                  ].map((item, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 dark:border-gray-600 text-green-600 focus:ring-green-500 dark:bg-gray-700"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                📊 Estadísticas de Éxito
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    85%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Puntaje ATS mínimo recomendado
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    40%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Más entrevistas con CV personalizado
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    15s
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Tiempo promedio de revisión inicial
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    98%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Mejora con optimización ATS
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Footer */}
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>
            💼 ¿Te ha sido útil esta guía? Aplica estos consejos usando nuestro
            editor de CV y comparte tus resultados con la comunidad.
          </p>
          <p className="mt-2">
            Basado en investigación actualizada y mejores prácticas de
            reclutadores profesionales • 2024-2025
          </p>
        </div>
      </div>
    </div>
  );
};
