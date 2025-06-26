"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Toggle } from "@/components/ui/Toggle";
import {
  addExperience,
  deleteExperience,
  toggleExperience,
} from "@/lib/actions/cv-actions";

interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  contractType: string;
  workSchedule: string;
  workModality: string;
  description: string;
  technologies: string[];
  selected: boolean;
}

interface ExperiencesSectionProps {
  experiences: Experience[];
  onUpdate: (
    updateFn: () => Promise<{ success: boolean; error?: string }>
  ) => Promise<boolean>;
  isUpdating: boolean;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  experiences,
  onUpdate,
  isUpdating,
}) => {
  const [newExperience, setNewExperience] = useState<{
    position: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    contractType: string;
    workSchedule: string;
    workModality: string;
    description: string;
    technologies: string;
  }>({
    position: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    contractType: "Contrato indefinido",
    workSchedule: "Jornada completa",
    workModality: "Presencial",
    description: "",
    technologies: "",
  });

  const handleAddExperience = async () => {
    if (newExperience.position.trim() && newExperience.company.trim()) {
      const success = await onUpdate(() =>
        addExperience({
          ...newExperience,
          position: newExperience.position.trim(),
          company: newExperience.company.trim(),
          location: newExperience.location.trim(),
          description: newExperience.description.trim(),
          technologies: newExperience.technologies
            .trim()
            .split(",")
            .map((tech) => tech.trim())
            .filter((tech) => tech),
          selected: true,
        })
      );
      if (success) {
        setNewExperience({
          position: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          contractType: "Contrato indefinido",
          workSchedule: "Jornada completa",
          workModality: "Presencial",
          description: "",
          technologies: "",
        });
      }
    }
  };

  const handleDeleteExperience = async (experienceId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta experiencia?")) {
      await onUpdate(() => deleteExperience(experienceId));
    }
  };

  const handleToggleExperience = async (experienceId: string) => {
    await onUpdate(() => toggleExperience(experienceId));
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Experiencia Laboral
      </h3>

      {/* Añadir nueva experiencia */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Añadir nueva experiencia
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <Input
            label="Puesto"
            value={newExperience.position}
            onChange={(e) =>
              setNewExperience((prev) => ({
                ...prev,
                position: e.target.value,
              }))
            }
            placeholder="Ej: Desarrollador Frontend"
            disabled={isUpdating}
          />
          <Input
            label="Empresa"
            value={newExperience.company}
            onChange={(e) =>
              setNewExperience((prev) => ({
                ...prev,
                company: e.target.value,
              }))
            }
            placeholder="Ej: Tech Company S.L."
            disabled={isUpdating}
          />
          <Input
            label="Ubicación"
            value={newExperience.location}
            onChange={(e) =>
              setNewExperience((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
            placeholder="Ej: Madrid, España"
            disabled={isUpdating}
          />
          <Input
            label="Fecha inicio"
            type="date"
            value={newExperience.startDate}
            onChange={(e) =>
              setNewExperience((prev) => ({
                ...prev,
                startDate: e.target.value,
              }))
            }
            disabled={isUpdating}
          />
          <Input
            label="Fecha fin (opcional)"
            type="date"
            value={newExperience.endDate}
            onChange={(e) =>
              setNewExperience((prev) => ({
                ...prev,
                endDate: e.target.value,
              }))
            }
            disabled={isUpdating}
          />
          <Select
            label="Tipo de contrato"
            value={newExperience.contractType}
            onChange={(value) =>
              setNewExperience((prev) => ({
                ...prev,
                contractType: value,
              }))
            }
            options={[
              { value: "Contrato indefinido", label: "Contrato indefinido" },
              { value: "Contrato temporal", label: "Contrato temporal" },
              {
                value: "Contrato en prácticas",
                label: "Contrato en prácticas",
              },
              { value: "Freelance", label: "Freelance" },
              { value: "Autónomo", label: "Autónomo" },
            ]}
          />
          <Select
            label="Tipo de jornada"
            value={newExperience.workSchedule}
            onChange={(value) =>
              setNewExperience((prev) => ({
                ...prev,
                workSchedule: value,
              }))
            }
            options={[
              { value: "Jornada completa", label: "Jornada completa" },
              { value: "Jornada parcial", label: "Jornada parcial" },
              { value: "Media jornada", label: "Media jornada" },
              { value: "Jornada flexible", label: "Jornada flexible" },
            ]}
          />
          <Select
            label="Modalidad de trabajo"
            value={newExperience.workModality}
            onChange={(value) =>
              setNewExperience((prev) => ({
                ...prev,
                workModality: value,
              }))
            }
            options={[
              { value: "Presencial", label: "Presencial" },
              { value: "Remoto", label: "Remoto" },
              { value: "Híbrido", label: "Híbrido" },
              { value: "Teletrabajo", label: "Teletrabajo" },
            ]}
          />
          <Input
            label="Tecnologías"
            value={newExperience.technologies}
            onChange={(e) =>
              setNewExperience((prev) => ({
                ...prev,
                technologies: e.target.value,
              }))
            }
            placeholder="Ej: React, Node.js, PostgreSQL"
            disabled={isUpdating}
          />
        </div>
        <Textarea
          label="Descripción"
          value={newExperience.description}
          onChange={(e) =>
            setNewExperience((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          placeholder="Describe tus responsabilidades y logros..."
          rows={3}
        />
        <Button
          onClick={handleAddExperience}
          size="sm"
          className="mt-3"
          disabled={isUpdating}
        >
          ➕ Añadir experiencia
        </Button>
      </div>

      {/* Experiencias existentes */}
      <div className="space-y-3">
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="border rounded-lg p-4 flex items-start justify-between"
          >
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {experience.position}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {experience.company} - {experience.location}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {experience.startDate} - {experience.endDate || "Presente"}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                {experience.contractType} • {experience.workSchedule} •{" "}
                {experience.workModality}
              </p>
              {experience.description && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  {experience.description}
                </p>
              )}
              {experience.technologies &&
                experience.technologies.length > 0 && (
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    🔧 {experience.technologies.join(", ")}
                  </p>
                )}
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <Toggle
                checked={experience.selected}
                onChange={() => handleToggleExperience(experience.id)}
                disabled={isUpdating}
              />
              <Button
                onClick={() => handleDeleteExperience(experience.id)}
                size="sm"
                variant="secondary"
                className="text-red-600 hover:text-red-700"
                disabled={isUpdating}
              >
                🗑️
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
