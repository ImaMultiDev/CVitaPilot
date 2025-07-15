import React from "react";
import { Card } from "@/components/ui/Card";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

export const AdvancedTipsSection: React.FC = () => {
  const contentErrors = [
    "Faltas de ortografía (60% menos probabilidades)",
    "Información personal innecesaria (edad, estado civil)",
    "Objetivos genéricos o anticuados",
    "Experiencia sin métricas ni resultados",
    'Habilidades vagas ("buenas habilidades comunicativas")',
  ];

  const technicalErrors = [
    'Archivos con nombres genéricos ("CV.pdf")',
    "Formatos incompatibles con ATS",
    "Enlaces rotos o profiles desactualizados",
    "CV demasiado largo (más de 3 páginas)",
    "Diseños demasiado creativos",
  ];

  const toolCategories = [
    {
      title: "Análisis ATS",
      icon: (
        <ConfiguredIcon
          name="wrench"
          size={20}
          className="text-blue-600 dark:text-blue-400"
        />
      ),
      tools: [
        "Jobscan.co",
        "ResumeWorded.com",
        "SkillRoads",
        "TopResume (análisis gratuito)",
      ],
      color: "blue",
    },
    {
      title: "Revisión Texto",
      icon: (
        <ConfiguredIcon
          name="wrench"
          size={20}
          className="text-green-600 dark:text-green-400"
        />
      ),
      tools: ["Grammarly", "Hemingway App", "LanguageTool", "Corrector RAE"],
      color: "green",
    },
    {
      title: "Diseño",
      icon: (
        <ConfiguredIcon
          name="wrench"
          size={20}
          className="text-purple-600 dark:text-purple-400"
        />
      ),
      tools: [
        "Canva (plantillas básicas)",
        "Resume.io",
        "Novoresume",
        "CV Engineer",
      ],
      color: "purple",
    },
  ];

  return (
    <section id="errores-comunes" className="mb-8 sm:mb-12">
      <Card className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8">
          <div className="p-2 sm:p-2.5 lg:p-3 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg sm:rounded-xl">
            <ConfiguredIcon
              name="lightbulb"
              size={24}
              className="text-orange-600 dark:text-orange-400 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
            />
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Consejos Avanzados y Errores a Evitar
          </h2>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Errores comunes */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <ConfiguredIcon
                name="alert-circle"
                size={20}
                className="text-red-600 dark:text-red-400 sm:w-6 sm:h-6"
              />
              Errores Comunes que Arruinan tu CV
            </h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              {/* Errores de contenido */}
              <div className="bg-red-50 dark:bg-red-900/20 p-4 sm:p-6 rounded-xl border-l-4 border-red-500 dark:border-red-400">
                <h4 className="font-semibold text-red-800 dark:text-red-300 mb-3 sm:mb-4 text-base sm:text-lg">
                  Errores de Contenido
                </h4>
                <ul className="text-xs sm:text-sm text-red-700 dark:text-red-400 space-y-2 sm:space-y-3">
                  {contentErrors.map((error, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <ConfiguredIcon
                        name="x"
                        size={16}
                        className="text-red-600 dark:text-red-400 flex-shrink-0"
                      />
                      <span>{error}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Errores técnicos */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 sm:p-6 rounded-xl border-l-4 border-yellow-500 dark:border-yellow-400">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3 sm:mb-4 text-base sm:text-lg">
                  Errores Técnicos
                </h4>
                <ul className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-400 space-y-2 sm:space-y-3">
                  {technicalErrors.map((error, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <ConfiguredIcon
                        name="alert-triangle"
                        size={16}
                        className="text-yellow-600 dark:text-yellow-400 flex-shrink-0"
                      />
                      <span>{error}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Herramientas útiles */}
          <div id="herramientas">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <ConfiguredIcon
                name="wrench"
                size={20}
                className="text-gray-600 dark:text-gray-400 sm:w-6 sm:h-6"
              />
              Herramientas Útiles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {toolCategories.map((category, index) => {
                const colors = {
                  blue: {
                    bg: "bg-blue-50 dark:bg-blue-900/20",
                    border: "border-blue-200 dark:border-blue-600",
                    text: "text-blue-700 dark:text-blue-400",
                    title: "text-blue-800 dark:text-blue-300",
                  },
                  green: {
                    bg: "bg-green-50 dark:bg-green-900/20",
                    border: "border-green-200 dark:border-green-600",
                    text: "text-green-700 dark:text-green-400",
                    title: "text-green-800 dark:text-green-300",
                  },
                  purple: {
                    bg: "bg-purple-50 dark:bg-purple-900/20",
                    border: "border-purple-200 dark:border-purple-600",
                    text: "text-purple-700 dark:text-purple-400",
                    title: "text-purple-800 dark:text-purple-300",
                  },
                };

                const colorClasses =
                  colors[category.color as keyof typeof colors];

                return (
                  <div
                    key={index}
                    className={`${colorClasses.bg} p-4 sm:p-6 rounded-xl shadow-sm border ${colorClasses.border}`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      {category.icon}
                      <h4
                        className={`font-semibold ${colorClasses.title} text-sm sm:text-base`}
                      >
                        {category.title}
                      </h4>
                    </div>
                    <ul
                      className={`text-xs sm:text-sm ${colorClasses.text} space-y-1.5 sm:space-y-2`}
                    >
                      {category.tools.map((tool, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div
                            className={`w-1.5 h-1.5 ${colorClasses.text} rounded-full flex-shrink-0`}
                          ></div>
                          <span>{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Estadísticas importantes */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 p-4 sm:p-6 lg:p-8 rounded-xl border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 sm:mb-6 text-center">
              Datos que Debes Conocer
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-lg shadow-sm">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">
                  15s
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Tiempo promedio de revisión inicial por reclutador
                </div>
              </div>
              <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-lg shadow-sm">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-1 sm:mb-2">
                  75%
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  CVs rechazados por sistemas ATS
                </div>
              </div>
              <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-lg shadow-sm">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1 sm:mb-2">
                  60%
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Menos probabilidades con faltas de ortografía
                </div>
              </div>
              <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-lg shadow-sm">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1 sm:mb-2">
                  250+
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  CVs promedio por oferta de trabajo
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
