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
      icon: <ScanIcon size={24} className="text-blue-600 dark:text-blue-400" />,
      title: "1. Escaneo",
      description: "Analiza la estructura y extrae información clave",
      color: "blue",
    },
    {
      icon: (
        <KeywordsIcon
          size={24}
          className="text-green-600 dark:text-green-400"
        />
      ),
      title: "2. Búsqueda",
      description: "Busca palabras clave relacionadas con el puesto",
      color: "green",
    },
    {
      icon: (
        <RankingIcon
          size={24}
          className="text-purple-600 dark:text-purple-400"
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
    <section id="que-es-ats" className="mb-12">
      <Card className="p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl">
            <ATSIcon size={32} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Sistemas ATS: Tu Primer Filtro
          </h2>
        </div>

        <div className="space-y-8">
          {/* Alert importante */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 rounded-xl border-l-4 border-red-500 dark:border-red-400">
            <div className="flex items-start gap-4">
              <WarningIcon
                size={24}
                className="text-red-600 dark:text-red-400 mt-1 flex-shrink-0"
              />
              <div>
                <h3 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-3">
                  Dato Importante
                </h3>
                <p className="text-red-700 dark:text-red-400 text-lg leading-relaxed">
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
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              ¿Qué es un ATS?
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl mb-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                Un Sistema de Seguimiento de Candidatos (Applicant Tracking
                System) es un software que las empresas utilizan para filtrar
                automáticamente los CVs antes de que lleguen a recursos humanos.
                Funciona como un <strong>&ldquo;robot guardián&rdquo;</strong>{" "}
                que escanea, analiza y clasifica los currículums según criterios
                predefinidos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    } p-6 rounded-xl text-center border border-gray-200 dark:border-gray-600`}
                  >
                    <div className="mb-4">{step.icon}</div>
                    <h4
                      className={`font-semibold ${
                        textColors[step.color as keyof typeof textColors]
                      } mb-2`}
                    >
                      {step.title}
                    </h4>
                    <p
                      className={`text-sm ${
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
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Cómo Optimizar tu CV para ATS
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Lo que SÍ debes hacer */}
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-600">
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-4 text-lg flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-600 dark:bg-green-400 text-white dark:text-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  Lo que SÍ debes hacer:
                </h4>
                <ul className="space-y-3 text-green-700 dark:text-green-400">
                  {dosAndDonts.dos.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lo que NO debes hacer */}
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-600">
                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-4 text-lg flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-600 dark:bg-red-400 text-white dark:text-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                    ✗
                  </div>
                  Lo que NO debes hacer:
                </h4>
                <ul className="space-y-3 text-red-700 dark:text-red-400">
                  {dosAndDonts.donts.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Estrategia de palabras clave */}
          <div id="palabras-clave">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Estrategia de Palabras Clave
            </h3>
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 p-8 rounded-xl border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-6 text-lg">
                Método de 4 Pasos:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {keywordSteps.map((step, index) => {
                  const colors = {
                    blue: "text-blue-600 dark:text-blue-400",
                    green: "text-green-600 dark:text-green-400",
                    purple: "text-purple-600 dark:text-purple-400",
                    orange: "text-orange-600 dark:text-orange-400",
                  };

                  return (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600"
                    >
                      <div
                        className={`text-2xl font-bold ${
                          colors[step.color as keyof typeof colors]
                        } mb-3`}
                      >
                        {step.number}
                      </div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                        {step.title}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
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
