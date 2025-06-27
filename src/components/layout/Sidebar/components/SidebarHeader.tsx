import React from "react";
import { Select } from "@/components/ui/Select";

interface SidebarHeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  currentSectionDescription?: string;
  isUpdating: boolean;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  activeSection,
  onSectionChange,
  currentSectionDescription,
  isUpdating,
}) => {
  const sections = [
    {
      id: "resumen",
      name: "Resumen del CV",
      description: "Vista general de todos los elementos",
    },
    {
      id: "skills",
      name: "Habilidades",
      description: "Habilidades técnicas",
    },
    {
      id: "competences",
      name: "Competencias",
      description: "Competencias profesionales",
    },
    {
      id: "softSkills",
      name: "Habilidades Blandas",
      description: "Habilidades interpersonales",
    },
    {
      id: "experiences",
      name: "Experiencias",
      description: "Experiencia laboral",
    },
    {
      id: "education",
      name: "Formación",
      description: "Educación y títulos",
    },
    {
      id: "certifications",
      name: "Certificaciones",
      description: "Certificados y logros",
    },
    {
      id: "achievements",
      name: "Logros y Proyectos",
      description: "Proyectos destacados",
    },
    {
      id: "references",
      name: "Referencias",
      description: "Referencias profesionales",
    },
    {
      id: "languages",
      name: "Idiomas",
      description: "Idiomas y niveles",
    },
  ];

  const sectionOptions = sections.map((section) => ({
    value: section.id,
    label: section.name,
  }));

  return (
    <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm relative z-[1250]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg"></div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Personalizar CV
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {currentSectionDescription}
            </p>
          </div>
        </div>
        {isUpdating && (
          <div className="flex items-center text-indigo-600 dark:text-indigo-400">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent mr-1"></div>
            <span className="text-xs font-medium">Guardando...</span>
          </div>
        )}
      </div>

      {/* Section Selector */}
      <div className="space-y-2 relative z-[1300]">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
          Sección:
        </label>
        <div className="relative z-[1300]">
          <Select
            options={sectionOptions}
            value={activeSection}
            onChange={(value) => onSectionChange(value)}
            variant="modern"
            placeholder="Selecciona una sección..."
          />
        </div>
      </div>
    </div>
  );
};
