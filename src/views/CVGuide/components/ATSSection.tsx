import React from "react";
import { Card } from "@/components/ui/Card";
import {
  ATSIcon,
  WarningIcon,
  ScanIcon,
  RankingIcon,
  KeywordsIcon,
} from "@/components/ui/icons/CVGuideIcons";

export const ATSSection: React.FC = () => {
  const atsProcess = [
    {
      icon: (
        <ScanIcon
          size={20}
          className="text-blue-600 dark:text-blue-400 sm:w-6 sm:h-6"
        />
      ),
      title: "1. Escaneo",
      description: "Analiza la estructura y extrae información clave",
      color: "blue",
    },
    {
      icon: (
        <KeywordsIcon
          size={20}
          className="text-green-600 dark:text-green-400 sm:w-6 sm:h-6"
        />
      ),
      title: "2. Búsqueda",
      description: "Busca palabras clave relacionadas con el puesto",
      color: "green",
    },
    {
      icon: (
        <RankingIcon
          size={20}
          className="text-purple-600 dark:text-purple-400 sm:w-6 sm:h-6"
        />
      ),
      title: "3. Clasificación",
      description: "Asigna una puntuación y ordena por relevancia",
      color: "purple",
    },
  ];

  const dosAndDonts = {
    dos: [
      'Usar encabezados estándar ("Experiencia Laboral", "Educación")',
      "Formato simple, una columna",
      "Incluir palabras clave de la oferta",
      "Fechas en formato MM/AAAA",
      "Guardar como .docx",
      "Describir abreviaturas la primera vez",
    ],
    donts: [
      "Usar tablas o columnas múltiples",
      "Incluir imágenes, gráficos o iconos",
      'Encabezados creativos ("Mi trayectoria")',
      "Texto en encabezados/pies de página",
      "Fuentes decorativas o símbolos especiales",
      "Saturar con palabras clave",
    ],
  };

  const keywordSteps = [
    {
      number: "1",
      title: "Analizar",
      description: "Lee 3-5 ofertas similares e identifica términos repetidos",
      color: "blue",
    },
    {
      number: "2",
      title: "Extraer",
      description: "Usa herramientas como Jobscan para identificar keywords",
      color: "green",
    },
    {
      number: "3",
      title: "Integrar",
      description: "Incluye naturalmente 2-3 veces cada término clave",
      color: "purple",
    },
    {
      number: "4",
      title: "Verificar",
      description: "Testa tu CV con herramientas de compatibilidad ATS",
      color: "orange",
    },
  ];

  return (
    <section id="que-es-ats" className="mb-8 sm:mb-12">
      <Card className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8">
          <div className="p-2 sm:p-2.5 lg:p-3 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg sm:rounded-xl">
            <ATSIcon
              size={24}
              className="text-green-600 dark:text-green-400 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
            />
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Sistemas ATS: Tu Primer Filtro
          </h2>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Alert importante */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-4 sm:p-6 rounded-xl border-l-4 border-red-500 dark:border-red-400">
            <div className="flex items-start gap-3 sm:gap-4">
              <WarningIcon
                size={20}
                className="text-red-600 dark:text-red-400 mt-1 flex-shrink-0 sm:w-6 sm:h-6"
              />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-red-800 dark:text-red-300 mb-2 sm:mb-3">
                  Dato Importante
                </h3>
                <p className="text-red-700 dark:text-red-400 text-sm sm:text-base lg:text-lg leading-relaxed">
                  El{" "}
                  <strong>
                    75% de los CVs son rechazados por sistemas ATS
                  </strong>{" "}
                  antes de llegar a un reclutador humano. El 99% de las empresas
                  Fortune 500 utilizan estos sistemas.
                </p>
              </div>
            </div>
          </div>

          {/* ¿Qué es un ATS? */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 sm:mb-6">
              ¿Qué es un ATS?
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-xl mb-4 sm:mb-6">
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
                Un Sistema de Seguimiento de Candidatos (Applicant Tracking
                System) es un software que las empresas utilizan para filtrar
                automáticamente los CVs antes de que lleguen a recursos humanos.
                Funciona como un <strong>&ldquo;robot guardián&rdquo;</strong>{" "}
                que escanea, analiza y clasifica los currículums según criterios
                predefinidos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {atsProcess.map((step, index) => {
                const bgColors = {
                  blue: "bg-blue-50 dark:bg-blue-900/20",
                  green: "bg-green-50 dark:bg-green-900/20",
                  purple: "bg-purple-50 dark:bg-purple-900/20",
                };
                const textColors = {
                  blue: "text-blue-600 dark:text-blue-400",
                  green: "text-green-600 dark:text-green-400",
                  purple: "text-purple-600 dark:text-purple-400",
                };

                return (
                  <div
                    key={index}
                    className={`${
                      bgColors[step.color as keyof typeof bgColors]
                    } p-4 sm:p-6 rounded-xl text-center border border-gray-200 dark:border-gray-600`}
                  >
                    <div className="mb-3 sm:mb-4">{step.icon}</div>
                    <h4
                      className={`font-semibold text-sm sm:text-base ${
                        textColors[step.color as keyof typeof textColors]
                      } mb-2`}
                    >
                      {step.title}
                    </h4>
                    <p
                      className={`text-xs sm:text-sm ${
                        textColors[step.color as keyof typeof textColors]
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Optimización ATS */}
          <div id="optimizacion-ats">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 sm:mb-6">
              Cómo Optimizar tu CV para ATS
            </h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
              {/* Lo que SÍ debes hacer */}
              <div className="bg-green-50 dark:bg-green-900/20 p-4 sm:p-6 rounded-xl border border-green-200 dark:border-green-600">
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 sm:mb-4 text-base sm:text-lg flex items-center gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-600 dark:bg-green-400 text-white dark:text-gray-900 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                    ✓
                  </div>
                  Lo que SÍ debes hacer:
                </h4>
                <ul className="space-y-2 sm:space-y-3 text-green-700 dark:text-green-400">
                  {dosAndDonts.dos.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 dark:bg-green-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lo que NO debes hacer */}
              <div className="bg-red-50 dark:bg-red-900/20 p-4 sm:p-6 rounded-xl border border-red-200 dark:border-red-600">
                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3 sm:mb-4 text-base sm:text-lg flex items-center gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-600 dark:bg-red-400 text-white dark:text-gray-900 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                    ✗
                  </div>
                  Lo que NO debes hacer:
                </h4>
                <ul className="space-y-2 sm:space-y-3 text-red-700 dark:text-red-400">
                  {dosAndDonts.donts.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-600 dark:bg-red-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Palabras Clave */}
          <div id="palabras-clave">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 sm:mb-6">
              Estrategia de Palabras Clave
            </h3>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-4 sm:p-6 lg:p-8 rounded-xl border border-indigo-200 dark:border-indigo-600">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {keywordSteps.map((step, index) => {
                  const colors = {
                    blue: {
                      bg: "bg-blue-600 dark:bg-blue-500",
                      text: "text-blue-600 dark:text-blue-400",
                      cardBg: "bg-white dark:bg-gray-800",
                    },
                    green: {
                      bg: "bg-green-600 dark:bg-green-500",
                      text: "text-green-600 dark:text-green-400",
                      cardBg: "bg-white dark:bg-gray-800",
                    },
                    purple: {
                      bg: "bg-purple-600 dark:bg-purple-500",
                      text: "text-purple-600 dark:text-purple-400",
                      cardBg: "bg-white dark:bg-gray-800",
                    },
                    orange: {
                      bg: "bg-orange-600 dark:bg-orange-500",
                      text: "text-orange-600 dark:text-orange-400",
                      cardBg: "bg-white dark:bg-gray-800",
                    },
                  };

                  const stepColors = colors[step.color as keyof typeof colors];

                  return (
                    <div
                      key={index}
                      className={`${stepColors.cardBg} p-4 sm:p-6 rounded-lg shadow-sm text-center`}
                    >
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 ${stepColors.bg} text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base mx-auto mb-3 sm:mb-4`}
                      >
                        {step.number}
                      </div>
                      <h4
                        className={`font-semibold ${stepColors.text} mb-2 text-sm sm:text-base`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
