"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";
import {
  addEducation,
  deleteEducation,
  toggleEducation,
} from "@/lib/actions/cv-actions";
import { CVEditorIcons } from "@/components/ui/icons/CVEditorIcons";

interface Education {
  id: string;
  title: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  selected: boolean;
}

interface EducationSectionProps {
  education: Education[];
  onUpdate: (
    updateFn: () => Promise<{ success: boolean; error?: string }>
  ) => Promise<boolean>;
  isUpdating: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  onUpdate,
  isUpdating,
}) => {
  const [newEducation, setNewEducation] = useState({
    title: "",
    institution: "",
    location: "",
    startYear: "",
    endYear: "",
  });

  const handleAddEducation = async () => {
    if (newEducation.title.trim() && newEducation.institution.trim()) {
      const success = await onUpdate(() =>
        addEducation({
          ...newEducation,
          title: newEducation.title.trim(),
          institution: newEducation.institution.trim(),
          location: newEducation.location.trim(),
          selected: true,
        })
      );
      if (success) {
        setNewEducation({
          title: "",
          institution: "",
          location: "",
          startYear: "",
          endYear: "",
        });
      }
    }
  };

  const handleDeleteEducation = async (educationId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta formación?")) {
      await onUpdate(() => deleteEducation(educationId));
    }
  };

  const handleToggleEducation = async (educationId: string) => {
    await onUpdate(() => toggleEducation(educationId));
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Formación Académica
      </h3>

      {/* Añadir nueva formación */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Añadir nueva formación académica
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Título del grado/master/doctorado"
            value={newEducation.title}
            onChange={(e) =>
              setNewEducation((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Ej: Técnico Superior en Desarrollo de Aplicaciones Multiplataforma"
            disabled={isUpdating}
          />
          <Input
            label="Universidad/Centro educativo"
            value={newEducation.institution}
            onChange={(e) =>
              setNewEducation((prev) => ({
                ...prev,
                institution: e.target.value,
              }))
            }
            placeholder="Ej: Universidad de Navarra"
            disabled={isUpdating}
          />
          <Input
            label="Ubicación"
            value={newEducation.location}
            onChange={(e) =>
              setNewEducation((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
            placeholder="Ej: Madrid, España"
            disabled={isUpdating}
          />
          <Input
            label="Año inicio"
            value={newEducation.startYear}
            onChange={(e) =>
              setNewEducation((prev) => ({
                ...prev,
                startYear: e.target.value,
              }))
            }
            placeholder="2020"
            disabled={isUpdating}
          />
          <Input
            label="Año fin"
            value={newEducation.endYear}
            onChange={(e) =>
              setNewEducation((prev) => ({
                ...prev,
                endYear: e.target.value,
              }))
            }
            placeholder="2024"
            disabled={isUpdating}
          />
        </div>
        <Button
          onClick={handleAddEducation}
          size="sm"
          className="mt-3"
          disabled={isUpdating}
        >
          <span className="inline-flex items-center gap-2">
            <CVEditorIcons.Add size={16} />
            Añadir formación académica
          </span>
        </Button>
      </div>

      {/* Formación existente */}
      <div className="space-y-3 md:space-y-4">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="border rounded-lg p-4 md:p-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-0"
          >
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {edu.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {edu.institution} - {edu.location}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {edu.startYear} - {edu.endYear}
              </p>
            </div>
            <div className="flex items-center justify-end md:justify-center space-x-3 md:space-x-2 md:ml-4 flex-shrink-0">
              <Toggle
                checked={edu.selected}
                onChange={() => handleToggleEducation(edu.id)}
                disabled={isUpdating}
              />
              <Button
                onClick={() => handleDeleteEducation(edu.id)}
                size="sm"
                variant="secondary"
                className="text-red-600 hover:text-red-700"
                disabled={isUpdating}
              >
                <CVEditorIcons.Delete size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
