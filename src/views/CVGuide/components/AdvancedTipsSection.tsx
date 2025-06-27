import React from "react";
import { Card } from "@/components/ui/Card";
import {
  TipsIcon,
  ErrorIcon,
  ToolsIcon,
} from "@/components/ui/icons/CVGuideIcons";

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
        <ToolsIcon size={20} className="text-blue-600 dark:text-blue-400" />
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
        <ToolsIcon size={20} className="text-green-600 dark:text-green-400" />
      ),
      tools: ["Grammarly", "Hemingway App", "LanguageTool", "Corrector RAE"],
      color: "green",
    },
    {
      title: "Diseño",
      icon: (
        <ToolsIcon size={20} className="text-purple-600 dark:text-purple-400" />
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
    <section id="errores-comunes" className="mb-12">
      <Card className="p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl">
            <TipsIcon
              size={32}
              className="text-orange-600 dark:text-orange-400"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Consejos Avanzados y Errores a Evitar
          </h2>
        </div>

        <div className="space-y-8">
          {/* Errores comunes */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-3">
              <ErrorIcon size={24} className="text-red-600 dark:text-red-400" />
              Errores Comunes que Arruinan tu CV
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Errores de contenido */}
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border-l-4 border-red-500 dark:border-red-400">
                <h4 className="font-semibold text-red-800 dark:text-red-300 mb-4 text-lg">
                  Errores de Contenido
                </h4>
                <ul className="text-sm text-red-700 dark:text-red-400 space-y-3">
                  {contentErrors.map((error, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-600 dark:bg-red-400 text-white dark:text-gray-900 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        ✗
                      </div>
                      <span>{error}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Errores técnicos */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border-l-4 border-yellow-500 dark:border-yellow-400">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-4 text-lg">
                  Errores Técnicos
                </h4>
                <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-3">
                  {technicalErrors.map((error, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-yellow-600 dark:bg-yellow-400 text-white dark:text-gray-900 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        ⚠
                      </div>
                      <span>{error}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Herramientas útiles */}
          <div id="herramientas">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-3">
              <ToolsIcon
                size={24}
                className="text-gray-600 dark:text-gray-400"
              />
              Herramientas Útiles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    className={`${colorClasses.bg} p-6 rounded-xl shadow-sm border ${colorClasses.border}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {category.icon}
                      <h4 className={`font-semibold ${colorClasses.title}`}>
                        {category.title}
                      </h4>
                    </div>
                    <ul className={`text-sm ${colorClasses.text} space-y-2`}>
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
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 p-8 rounded-xl border border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
              📊 Datos que Debes Conocer
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  15s
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Tiempo promedio de revisión inicial por reclutador
                </div>
              </div>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  75%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  CVs rechazados por sistemas ATS
                </div>
              </div>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  40%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Más entrevistas con CV personalizado
                </div>
              </div>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  6s
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Tiempo para captar atención del reclutador
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
