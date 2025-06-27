import React from "react";
import { Card } from "@/components/ui/Card";
import {
  LetterIcon,
  ProfessionalIcon,
  ExperienceIcon,
} from "@/components/ui/icons/CVGuideIcons";

export const CoverLetterSection: React.FC = () => {
  const letterStructure = [
    {
      number: "1",
      title: "Encabezado (Formal)",
      content: "Estimado/a [Nombre específico]:",
      note: 'Nota de Eva Porto: Usar ":" en lugar de "," después del saludo para mayor formalidad',
      color: "blue",
    },
    {
      number: "2",
      title: "Primer Párrafo (Gancho)",
      content: "Captar atención inmediata",
      items: [
        "Menciona el puesto específico",
        "Incluye un logro relevante impactante",
        "Muestra conocimiento sobre la empresa",
      ],
      example:
        "Me dirijo a usted para mostrar mi interés en el puesto de Marketing Manager en [Empresa]. Durante mis 5 años en el sector, he logrado incrementar las ventas en un 40% implementando estrategias digitales innovadoras, algo que creo podría aportar gran valor a [proyecto específico de la empresa].",
      color: "green",
    },
    {
      number: "3",
      title: "Segundo Párrafo (Valor)",
      content: "Demostrar encaje perfecto",
      items: [
        "Conecta tu experiencia con sus necesidades",
        "Usa 2-3 logros cuantificables",
        "Menciona herramientas/metodologías específicas",
        'Evita competencias "proactiva" (consejo de Eva Porto)',
      ],
      color: "purple",
    },
    {
      number: "4",
      title: "Cierre (Call to Action)",
      content: "Invitar a la acción",
      example:
        "Estaré encantado/a de ampliar esta información en una entrevista personal. Quedo a su disposición para cualquier consulta adicional.\n\nAtentamente,\n[Tu nombre]",
      color: "orange",
    },
  ];

  const researchTips = [
    "LinkedIn del reclutador/hiring manager",
    "Noticias recientes de la empresa",
    "Valores y misión corporativa",
    "Proyectos actuales o expansiones",
    "Cultura empresarial en redes sociales",
  ];

  const evaPortoTips = [
    "Solo para puestos que realmente te motiven",
    "Dedica tiempo a adaptarla completamente",
    "Máximo 1 página",
    "Evita competencias muy genéricas",
    "Acompaña siempre al CV, nunca sola",
  ];

  return (
    <section id="modelo-eva-porto" className="mb-8 sm:mb-12">
      <Card className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8">
          <div className="p-2 sm:p-2.5 lg:p-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg sm:rounded-xl">
            <LetterIcon
              size={24}
              className="text-purple-600 dark:text-purple-400 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
            />
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Carta de Presentación: Método Eva Porto
          </h2>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Sobre Eva Porto */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 sm:p-6 rounded-xl border-l-4 border-blue-500 dark:border-blue-400">
            <div className="flex items-start gap-3 sm:gap-4">
              <ProfessionalIcon
                size={20}
                className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0 sm:w-6 sm:h-6"
              />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2 sm:mb-3">
                  Sobre Eva Porto
                </h3>
                <p className="text-blue-700 dark:text-blue-400 leading-relaxed text-sm sm:text-base">
                  Eva Porto Soto es una reconocida psicóloga, conferenciante y
                  autora especializada en empleabilidad. Es LinkedIn Top Voice
                  2023 y una referente en España para temas de currículum,
                  entrevistas y carrera profesional. Su método se basa en
                  personalización estratégica y conexión emocional con el
                  reclutador.
                </p>
              </div>
            </div>
          </div>

          {/* Estructura de la carta */}
          <div id="estructura-carta">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 sm:mb-6">
              Estructura de la Carta Perfecta
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {letterStructure.map((section, index) => {
                const colors = {
                  blue: {
                    bg: "bg-blue-50 dark:bg-blue-900/20",
                    border: "border-blue-200 dark:border-blue-600",
                    text: "text-blue-800 dark:text-blue-300",
                    number:
                      "bg-blue-600 dark:bg-blue-400 text-white dark:text-gray-900",
                  },
                  green: {
                    bg: "bg-green-50 dark:bg-green-900/20",
                    border: "border-green-200 dark:border-green-600",
                    text: "text-green-800 dark:text-green-300",
                    number:
                      "bg-green-600 dark:bg-green-400 text-white dark:text-gray-900",
                  },
                  purple: {
                    bg: "bg-purple-50 dark:bg-purple-900/20",
                    border: "border-purple-200 dark:border-purple-600",
                    text: "text-purple-800 dark:text-purple-300",
                    number:
                      "bg-purple-600 dark:bg-purple-400 text-white dark:text-gray-900",
                  },
                  orange: {
                    bg: "bg-orange-50 dark:bg-orange-900/20",
                    border: "border-orange-200 dark:border-orange-600",
                    text: "text-orange-800 dark:text-orange-300",
                    number:
                      "bg-orange-600 dark:bg-orange-400 text-white dark:text-gray-900",
                  },
                };

                const colorClasses =
                  colors[section.color as keyof typeof colors];

                return (
                  <div
                    key={index}
                    className={`${colorClasses.bg} border ${colorClasses.border} rounded-xl p-4 sm:p-6`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div
                        className={`w-6 h-6 sm:w-8 sm:h-8 ${colorClasses.number} rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0`}
                      >
                        {section.number}
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`font-semibold ${colorClasses.text} text-base sm:text-lg mb-1 sm:mb-2`}
                        >
                          {section.title}
                        </h4>
                        <p
                          className={`${colorClasses.text} mb-2 sm:mb-3 text-sm sm:text-base`}
                        >
                          <strong>Objetivo:</strong> {section.content}
                        </p>
                      </div>
                    </div>

                    {section.items && (
                      <ul
                        className={`mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 ${colorClasses.text} ml-8 sm:ml-12`}
                      >
                        {section.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div
                              className={`w-1.5 h-1.5 ${colorClasses.text} rounded-full mt-1.5 sm:mt-2 flex-shrink-0`}
                            ></div>
                            <span className="text-xs sm:text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.example && (
                      <div
                        className={`mt-3 sm:mt-4 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg ml-8 sm:ml-12`}
                      >
                        <p
                          className={`${colorClasses.text} mb-1 text-sm sm:text-base`}
                        >
                          <strong>Ejemplo:</strong>
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm italic whitespace-pre-line">
                          &ldquo;{section.example}&rdquo;
                        </p>
                      </div>
                    )}

                    {section.note && (
                      <div
                        className={`mt-3 sm:mt-4 p-3 sm:p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-600 ml-8 sm:ml-12`}
                      >
                        <p className="text-yellow-800 dark:text-yellow-300 text-xs sm:text-sm">
                          💡 {section.note}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Investigación previa */}
          <div id="personalizacion">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 sm:mb-6">
              Investigación Previa: Clave del Éxito
            </h3>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 sm:p-6 lg:p-8 rounded-xl border border-yellow-200 dark:border-yellow-600">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <ExperienceIcon
                  size={20}
                  className="text-yellow-600 dark:text-yellow-400 sm:w-6 sm:h-6"
                />
                <h4 className="text-base sm:text-lg font-semibold text-yellow-800 dark:text-yellow-300">
                  Qué investigar antes de escribir
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
                  <h5 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3 sm:mb-4 text-sm sm:text-base">
                    Fuentes de información
                  </h5>
                  <ul className="space-y-2 text-yellow-700 dark:text-yellow-400">
                    {researchTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-600 dark:bg-yellow-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
                  <h5 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3 sm:mb-4 text-sm sm:text-base">
                    Consejos de Eva Porto
                  </h5>
                  <ul className="space-y-2 text-yellow-700 dark:text-yellow-400">
                    {evaPortoTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-600 dark:bg-yellow-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
