import React from "react";
import { Card } from "@/components/ui/Card";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

export const CVStructureSection: React.FC = () => {
  const essentialElements = [
    {
      icon: (
        <ConfiguredIcon
          name="phone"
          size={20}
          className="text-blue-600 dark:text-blue-400"
        />
      ),
      title: "Información de Contacto",
      color: "blue",
      items: [
        "Nombre completo",
        "Teléfono con código de país",
        "Email profesional",
        "LinkedIn actualizado",
        "Ciudad y país (sin dirección completa)",
      ],
    },
    {
      icon: (
        <ConfiguredIcon
          name="user"
          size={20}
          className="text-green-600 dark:text-green-400"
        />
      ),
      title: "Resumen Profesional",
      color: "green",
      items: [
        "3-4 líneas máximo",
        "Incluye años de experiencia",
        "Menciona habilidades clave",
        "Alineado con el puesto objetivo",
      ],
    },
    {
      icon: (
        <ConfiguredIcon
          name="briefcase"
          size={20}
          className="text-purple-600 dark:text-purple-400"
        />
      ),
      title: "Experiencia Laboral",
      color: "purple",
      items: [
        "Orden cronológico inverso",
        "Logros cuantificables",
        "Verbos de acción",
        "Máximo 4-5 viñetas por puesto",
      ],
    },
    {
      icon: (
        <ConfiguredIcon
          name="graduation-cap"
          size={20}
          className="text-orange-600 dark:text-orange-400"
        />
      ),
      title: "Formación y Habilidades",
      color: "orange",
      items: [
        "Título más relevante primero",
        "Habilidades técnicas específicas",
        "Certificaciones vigentes",
        "Idiomas con nivel MCER",
      ],
    },
  ];

  const designElements = [
    {
      title: "Tipografía",
      items: [
        "Arial, Calibri o Times New Roman",
        "11-12pt para texto normal",
        "14-16pt para encabezados",
        "Consistencia en todo el documento",
      ],
    },
    {
      title: "Espaciado",
      items: [
        "Márgenes 2-2.5cm",
        "Interlineado 1.15",
        "Espacios entre secciones",
        "Evitar texto apretado",
      ],
    },
    {
      title: "Archivo",
      items: [
        "Formato .docx o PDF",
        "Nombre: CV_Nombre_Apellido",
        "Máximo 5MB",
        "Sin imágenes ni gráficos",
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        text: "text-blue-700 dark:text-blue-400",
        title: "text-blue-800 dark:text-blue-300",
      },
      green: {
        bg: "bg-green-50 dark:bg-green-900/20",
        text: "text-green-700 dark:text-green-400",
        title: "text-green-800 dark:text-green-300",
      },
      purple: {
        bg: "bg-purple-50 dark:bg-purple-900/20",
        text: "text-purple-700 dark:text-purple-400",
        title: "text-purple-800 dark:text-purple-300",
      },
      orange: {
        bg: "bg-orange-50 dark:bg-orange-900/20",
        text: "text-orange-700 dark:text-orange-400",
        title: "text-orange-800 dark:text-orange-300",
      },
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="estructura-cv" className="mb-8 sm:mb-12">
      <Card className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8">
          <div className="p-2 sm:p-2.5 lg:p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg sm:rounded-xl">
            <ConfiguredIcon
              name="layout"
              size={24}
              className="text-blue-600 dark:text-blue-400 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
            />
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Estructura del CV Perfecto
          </h2>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 sm:mb-6">
              Elementos Esenciales
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {essentialElements.map((element, index) => {
                const colorClasses = getColorClasses(element.color);
                return (
                  <div
                    key={index}
                    className={`${colorClasses.bg} p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-600`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      {element.icon}
                      <h4
                        className={`font-semibold text-sm sm:text-base ${colorClasses.title}`}
                      >
                        {element.title}
                      </h4>
                    </div>
                    <ul
                      className={`text-xs sm:text-sm ${colorClasses.text} space-y-1.5 sm:space-y-2`}
                    >
                      {element.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${colorClasses.text} mt-1.5 sm:mt-2 flex-shrink-0`}
                          ></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div id="diseno-formato">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 sm:mb-6">
              Diseño y Formato
            </h3>
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-4 sm:p-6 lg:p-8 rounded-xl border border-yellow-200 dark:border-yellow-600">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <ConfiguredIcon
                  name="palette"
                  size={20}
                  className="text-yellow-600 dark:text-yellow-400 sm:w-6 sm:h-6"
                />
                <h4 className="text-base sm:text-lg font-semibold text-yellow-800 dark:text-yellow-300">
                  Principios de Diseño
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {designElements.map((element, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm"
                  >
                    <h5 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2 sm:mb-3 text-sm sm:text-base">
                      {element.title}
                    </h5>
                    <ul className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-400 space-y-1.5 sm:space-y-2">
                      {element.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-yellow-600 dark:bg-yellow-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
