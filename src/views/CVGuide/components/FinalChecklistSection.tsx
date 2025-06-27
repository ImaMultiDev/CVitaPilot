import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ChecklistIcon, StatsIcon } from "@/components/ui/icons/CVGuideIcons";

interface ChecklistItem {
  id: string;
  text: string;
  category: "cv" | "carta";
}

export const FinalChecklistSection: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const cvChecklist: ChecklistItem[] = [
    {
      id: "cv-1",
      text: "Información de contacto actualizada y profesional",
      category: "cv",
    },
    { id: "cv-2", text: "CV adaptado a la oferta específica", category: "cv" },
    {
      id: "cv-3",
      text: "Palabras clave de la descripción incluidas naturalmente",
      category: "cv",
    },
    {
      id: "cv-4",
      text: "Logros cuantificados con números y porcentajes",
      category: "cv",
    },
    {
      id: "cv-5",
      text: "Formato compatible con ATS (.docx preferible)",
      category: "cv",
    },
    {
      id: "cv-6",
      text: "Sin errores ortográficos ni gramaticales",
      category: "cv",
    },
    { id: "cv-7", text: "Longitud apropiada (1-2 páginas)", category: "cv" },
    {
      id: "cv-8",
      text: "Nombre de archivo: CV_Nombre_Apellido_Puesto",
      category: "cv",
    },
  ];

  const cartaChecklist: ChecklistItem[] = [
    {
      id: "carta-1",
      text: "Dirigida a persona específica (nombre y apellido)",
      category: "carta",
    },
    {
      id: "carta-2",
      text: "Primer párrafo con gancho específico",
      category: "carta",
    },
    { id: "carta-3", text: "Logros relevantes incluidos", category: "carta" },
    {
      id: "carta-4",
      text: "Conocimiento de la empresa demostrado",
      category: "carta",
    },
    { id: "carta-5", text: "Call to action claro al final", category: "carta" },
    { id: "carta-6", text: "Longitud máxima: 1 página", category: "carta" },
    { id: "carta-7", text: "Tono profesional pero cercano", category: "carta" },
    {
      id: "carta-8",
      text: "Revisión final de ortografía y coherencia",
      category: "carta",
    },
  ];

  const successStats = [
    {
      value: "85%",
      label: "Puntaje ATS mínimo recomendado",
      color: "blue",
    },
    {
      value: "40%",
      label: "Más entrevistas con CV personalizado",
      color: "green",
    },
    {
      value: "15s",
      label: "Tiempo promedio de revisión inicial",
      color: "purple",
    },
    {
      value: "98%",
      label: "Mejora con optimización ATS",
      color: "orange",
    },
  ];

  const handleItemCheck = (itemId: string) => {
    const newCheckedItems = new Set(checkedItems);
    if (newCheckedItems.has(itemId)) {
      newCheckedItems.delete(itemId);
    } else {
      newCheckedItems.add(itemId);
    }
    setCheckedItems(newCheckedItems);
  };

  const cvProgress =
    (checkedItems.size / (cvChecklist.length + cartaChecklist.length)) * 100;
  const cvItemsChecked = cvChecklist.filter((item) =>
    checkedItems.has(item.id)
  ).length;
  const cartaItemsChecked = cartaChecklist.filter((item) =>
    checkedItems.has(item.id)
  ).length;

  const getStatColor = (color: string) => {
    const colors = {
      blue: "text-blue-600 dark:text-blue-400",
      green: "text-green-600 dark:text-green-400",
      purple: "text-purple-600 dark:text-purple-400",
      orange: "text-orange-600 dark:text-orange-400",
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="mb-12">
      <Card className="p-8 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-blue-200 dark:border-blue-600">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 rounded-xl">
            <ChecklistIcon
              size={32}
              className="text-blue-600 dark:text-blue-400"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Checklist Final: CV Perfecto
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${cvProgress}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                {checkedItems.size}/{cvChecklist.length + cartaChecklist.length}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Checklist CV */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Antes de Enviar tu CV
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {cvItemsChecked}/{cvChecklist.length}
                </span>
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">
                    {Math.round((cvItemsChecked / cvChecklist.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {cvChecklist.map((item) => (
                <label
                  key={item.id}
                  className="flex items-start gap-3 cursor-pointer group hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checkedItems.has(item.id)}
                    onChange={() => handleItemCheck(item.id)}
                    className="mt-1 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 cursor-pointer"
                  />
                  <span
                    className={`text-sm leading-relaxed transition-colors ${
                      checkedItems.has(item.id)
                        ? "text-blue-700 dark:text-blue-400 line-through"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Checklist Carta */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Carta de Presentación
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {cartaItemsChecked}/{cartaChecklist.length}
                </span>
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 text-xs font-bold">
                    {Math.round(
                      (cartaItemsChecked / cartaChecklist.length) * 100
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {cartaChecklist.map((item) => (
                <label
                  key={item.id}
                  className="flex items-start gap-3 cursor-pointer group hover:bg-green-50 dark:hover:bg-green-900/20 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checkedItems.has(item.id)}
                    onChange={() => handleItemCheck(item.id)}
                    className="mt-1 rounded border-gray-300 dark:border-gray-600 text-green-600 focus:ring-green-500 dark:bg-gray-700 cursor-pointer"
                  />
                  <span
                    className={`text-sm leading-relaxed transition-colors ${
                      checkedItems.has(item.id)
                        ? "text-green-700 dark:text-green-400 line-through"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Estadísticas de éxito */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-3 mb-6">
            <StatsIcon size={24} className="text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Estadísticas de Éxito
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {successStats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
              >
                <div
                  className={`text-3xl font-bold ${getStatColor(
                    stat.color
                  )} mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer motivacional */}
        <div className="text-center mt-8 text-gray-500 dark:text-gray-400">
          <p className="text-lg mb-2">
            💼 ¿Te ha sido útil esta guía? Aplica estos consejos usando nuestro
            editor de CV.
          </p>
          <p className="text-sm">
            Basado en investigación actualizada y mejores prácticas de
            reclutadores profesionales • 2024-2025
          </p>
        </div>
      </Card>
    </section>
  );
};
