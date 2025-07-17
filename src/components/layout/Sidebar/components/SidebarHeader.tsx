import React from "react";
import { Select } from "@/components/ui/Select";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

interface SidebarHeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  currentSectionDescription?: string;
  isUpdating: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  activeSection,
  onSectionChange,
  currentSectionDescription,
  isUpdating,
  onClose,
}) => {
  const sections = [
    {
      id: "resumen",
      name: "Resumen del CV",
      description: "Vista general de todos los elementos",
    },
    {
      id: "photo",
      name: "Foto de Perfil",
      description: "Control de visibilidad de la foto",
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
    {
      id: "otherInformation",
      name: "Otra Información",
      description: "Información adicional",
    },
  ];

  const sectionOptions = sections.map((section) => ({
    value: section.id,
    label: section.name,
  }));

  return (
    <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm relative z-[1250]">
      <div className="flex flex-col items-start justify-between mb-4">
        <div className="flex items-center gap-2">
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

        <div className="flex items-center gap-2">
          {isUpdating && (
            <div className="flex items-center absolute top-14 right-2 text-end mt-4 text-indigo-600 dark:text-indigo-400">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent mr-1"></div>
              <span className="text-xs font-medium">Guardando...</span>
            </div>
          )}

          {/* Botón de cerrar integrado */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 absolute top-4 right-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Cerrar panel de personalización"
              title="Cerrar"
            >
              <ConfiguredIcon
                name="x"
                className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              />
            </button>
          )}
        </div>
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
