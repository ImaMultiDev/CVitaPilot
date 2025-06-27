import React from "react";
import { Card } from "@/components/ui/Card";
import {
  TableOfContentsIcon,
  StructureIcon,
  ATSIcon,
  LetterIcon,
  TipsIcon,
} from "@/components/ui/icons/CVGuideIcons";

interface ContentSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: Array<{
    id: string;
    title: string;
  }>;
}

export const TableOfContents: React.FC = () => {
  const sections: ContentSection[] = [
    {
      id: "estructura",
      title: "Estructura del CV",
      icon: (
        <StructureIcon size={20} className="text-blue-600 dark:text-blue-400" />
      ),
      items: [
        { id: "estructura-cv", title: "Elementos esenciales" },
        { id: "diseno-formato", title: "Diseño y formato" },
        { id: "contenido-estrategico", title: "Contenido estratégico" },
      ],
    },
    {
      id: "ats",
      title: "Optimización ATS",
      icon: (
        <ATSIcon size={20} className="text-green-600 dark:text-green-400" />
      ),
      items: [
        { id: "que-es-ats", title: "¿Qué son los ATS?" },
        { id: "optimizacion-ats", title: "Cómo optimizar tu CV" },
        { id: "palabras-clave", title: "Palabras clave efectivas" },
      ],
    },
    {
      id: "carta",
      title: "Carta de Presentación",
      icon: (
        <LetterIcon
          size={20}
          className="text-purple-600 dark:text-purple-400"
        />
      ),
      items: [
        { id: "modelo-eva-porto", title: "Método Eva Porto" },
        { id: "estructura-carta", title: "Estructura efectiva" },
        { id: "personalizacion", title: "Personalización" },
      ],
    },
    {
      id: "consejos",
      title: "Consejos Avanzados",
      icon: (
        <TipsIcon size={20} className="text-orange-600 dark:text-orange-400" />
      ),
      items: [
        { id: "errores-comunes", title: "Errores a evitar" },
        { id: "tendencias-2024", title: "Tendencias 2024-2025" },
        { id: "herramientas", title: "Herramientas útiles" },
      ],
    },
  ];

  const handleScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Card className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-600">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <TableOfContentsIcon
            size={24}
            className="text-blue-600 dark:text-blue-400"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tabla de Contenidos
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div key={section.id} className="space-y-3">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-600">
              {section.icon}
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                {section.title}
              </h3>
            </div>

            <ul className="space-y-2 ml-8">
              {section.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleScrollTo(item.id)}
                    className="text-left text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    <span className="text-sm group-hover:underline">
                      {item.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
};
