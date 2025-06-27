"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Toggle } from "@/components/ui/Toggle";
import {
  addAchievement,
  deleteAchievement,
  toggleAchievement,
} from "@/lib/actions/cv-actions";
import { CVEditorIcons } from "@/components/ui/icons/CVEditorIcons";

interface Achievement {
  id: string;
  title: string;
  type: "achievement" | "project";
  description: string;
  date: string;
  company?: string;
  technologies: string[];
  metrics?: string;
  url?: string;
  selected: boolean;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
  onUpdate: (
    updateFn: () => Promise<{ success: boolean; error?: string }>
  ) => Promise<boolean>;
  isUpdating: boolean;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
  onUpdate,
  isUpdating,
}) => {
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    type: "project" as "achievement" | "project",
    description: "",
    date: "",
    company: "",
    technologies: "",
    metrics: "",
    url: "",
  });

  const handleAddAchievement = async () => {
    if (newAchievement.title.trim() && newAchievement.description.trim()) {
      const success = await onUpdate(() =>
        addAchievement({
          ...newAchievement,
          title: newAchievement.title.trim(),
          description: newAchievement.description.trim(),
          company: newAchievement.company.trim() || undefined,
          technologies: newAchievement.technologies
            .trim()
            .split(",")
            .map((tech) => tech.trim())
            .filter((tech) => tech),
          metrics: newAchievement.metrics.trim() || undefined,
          url: newAchievement.url.trim() || undefined,
          selected: true,
        })
      );
      if (success) {
        setNewAchievement({
          title: "",
          type: "project" as "achievement" | "project",
          description: "",
          date: "",
          company: "",
          technologies: "",
          metrics: "",
          url: "",
        });
      }
    }
  };

  const handleDeleteAchievement = async (achievementId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este logro/proyecto?")) {
      await onUpdate(() => deleteAchievement(achievementId));
    }
  };

  const handleToggleAchievement = async (achievementId: string) => {
    await onUpdate(() => toggleAchievement(achievementId));
  };

  return (
    <Card>
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 md:mb-6 flex items-center gap-2">
        Logros y Proyectos Destacados
      </h3>

      {/* Añadir nuevo logro/proyecto */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg mb-4 md:mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3 md:mb-4 text-sm md:text-base">
          Añadir nuevo logro/proyecto
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <Select
            label="Tipo"
            value={newAchievement.type}
            onChange={(value) =>
              setNewAchievement((prev) => ({
                ...prev,
                type: value as "achievement" | "project",
              }))
            }
            options={[
              { value: "project", label: "Proyecto" },
              { value: "achievement", label: "Logro/Reconocimiento" },
            ]}
            className="h-12 md:h-10 text-base md:text-sm"
          />
          <Input
            label="Título"
            value={newAchievement.title}
            onChange={(e) =>
              setNewAchievement((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            placeholder="Ej: Desarrollo de Sistema ERP"
            disabled={isUpdating}
            className="h-12 md:h-10 text-base md:text-sm"
          />
          <Input
            label="Fecha/Período"
            value={newAchievement.date}
            onChange={(e) =>
              setNewAchievement((prev) => ({
                ...prev,
                date: e.target.value,
              }))
            }
            placeholder="Ej: 2024, 2023-2024"
            disabled={isUpdating}
            className="h-12 md:h-10 text-base md:text-sm"
          />
          <Input
            label="Empresa/Organización (opcional)"
            value={newAchievement.company}
            onChange={(e) =>
              setNewAchievement((prev) => ({
                ...prev,
                company: e.target.value,
              }))
            }
            placeholder="Ej: ERRIBERRI S.L."
            disabled={isUpdating}
            className="h-12 md:h-10 text-base md:text-sm"
          />
          <Input
            label="Tecnologías utilizadas"
            value={newAchievement.technologies}
            onChange={(e) =>
              setNewAchievement((prev) => ({
                ...prev,
                technologies: e.target.value,
              }))
            }
            placeholder="Ej: React, Node.js, PostgreSQL"
            disabled={isUpdating}
            className="h-12 md:h-10 text-base md:text-sm"
          />
          <Input
            label="Métricas de impacto (opcional)"
            value={newAchievement.metrics}
            onChange={(e) =>
              setNewAchievement((prev) => ({
                ...prev,
                metrics: e.target.value,
              }))
            }
            placeholder="Ej: Aumentó eficiencia en 25%"
            disabled={isUpdating}
            className="h-12 md:h-10 text-base md:text-sm"
          />
          <Input
            label="URL del proyecto (opcional)"
            value={newAchievement.url}
            onChange={(e) =>
              setNewAchievement((prev) => ({
                ...prev,
                url: e.target.value,
              }))
            }
            placeholder="Ej: https://github.com/usuario/proyecto"
            disabled={isUpdating}
            className="h-12 md:h-10 text-base md:text-sm"
          />
        </div>
        <div className="mt-4 md:mt-5">
          <Textarea
            label="Descripción"
            value={newAchievement.description}
            onChange={(e) =>
              setNewAchievement((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Describe el proyecto/logro, tu rol, tecnologías utilizadas y resultados obtenidos..."
            rows={3}
            className="text-base md:text-sm"
          />
        </div>
        <div className="mt-4 md:mt-5">
          <Button
            onClick={handleAddAchievement}
            size="sm"
            className="h-12 md:h-10 text-base md:text-sm font-medium"
            disabled={isUpdating}
          >
            <span className="inline-flex items-center gap-2">
              <CVEditorIcons.Add size={16} />
              Añadir logro/proyecto
            </span>
          </Button>
        </div>
      </div>

      {/* Logros/Proyectos existentes */}
      <div className="space-y-3 md:space-y-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="border rounded-lg p-4 md:p-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-0"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 text-base md:text-lg">
                  {achievement.type === "project" ? (
                    <CVEditorIcons.Project size={20} />
                  ) : (
                    <CVEditorIcons.Trophy size={20} />
                  )}
                  {achievement.title}
                </h4>
                <span
                  className={`text-xs px-2 py-1 rounded-full self-start md:self-auto ${
                    achievement.type === "project"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {achievement.type === "project" ? "Proyecto" : "Logro"}
                </span>
              </div>
              {achievement.company && (
                <p className="text-gray-600 dark:text-gray-300 text-base md:text-sm">
                  {achievement.company}
                </p>
              )}
              <p className="text-sm md:text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                <CVEditorIcons.Calendar size={14} />
                {achievement.date}
              </p>
              <p className="text-sm md:text-sm text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
                {achievement.description}
              </p>
              {achievement.technologies.length > 0 && (
                <p className="text-xs md:text-xs text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                  <CVEditorIcons.Tech size={12} />
                  {achievement.technologies.join(", ")}
                </p>
              )}
              {achievement.metrics && (
                <p className="text-xs md:text-xs text-green-600 dark:text-green-400 mb-1 flex items-center gap-1">
                  <CVEditorIcons.Metrics size={12} />
                  {achievement.metrics}
                </p>
              )}
              {achievement.url && (
                <p className="text-xs md:text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1">
                  <CVEditorIcons.Link size={12} />
                  <a
                    href={achievement.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Ver proyecto
                  </a>
                </p>
              )}
            </div>
            <div className="flex items-center justify-end md:justify-center space-x-3 md:space-x-2 md:ml-4 flex-shrink-0">
              <div className="scale-125 md:scale-100">
                <Toggle
                  checked={achievement.selected}
                  onChange={() => handleToggleAchievement(achievement.id)}
                  disabled={isUpdating}
                />
              </div>
              <Button
                onClick={() => handleDeleteAchievement(achievement.id)}
                size="sm"
                variant="secondary"
                className="text-red-600 hover:text-red-700 p-2 md:p-1 min-w-[44px] min-h-[44px] md:min-w-[auto] md:min-h-[auto]"
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
