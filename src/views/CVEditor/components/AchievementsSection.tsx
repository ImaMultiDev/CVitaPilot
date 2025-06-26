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
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        🏆 Logros y Proyectos Destacados
      </h3>

      {/* Añadir nuevo logro/proyecto */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Añadir nuevo logro/proyecto
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
              { value: "project", label: "🚀 Proyecto" },
              { value: "achievement", label: "🏆 Logro/Reconocimiento" },
            ]}
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
          />
        </div>
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
          className="mt-3"
        />
        <Button
          onClick={handleAddAchievement}
          size="sm"
          className="mt-3"
          disabled={isUpdating}
        >
          🏆 Añadir logro/proyecto
        </Button>
      </div>

      {/* Logros/Proyectos existentes */}
      <div className="space-y-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="border rounded-lg p-4 flex items-start justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  {achievement.type === "project" ? "🚀" : "🏆"}{" "}
                  {achievement.title}
                </h4>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    achievement.type === "project"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {achievement.type === "project" ? "Proyecto" : "Logro"}
                </span>
              </div>
              {achievement.company && (
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {achievement.company}
                </p>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                📅 {achievement.date}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
                {achievement.description}
              </p>
              {achievement.technologies.length > 0 && (
                <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">
                  🔧 {achievement.technologies.join(", ")}
                </p>
              )}
              {achievement.metrics && (
                <p className="text-xs text-green-600 dark:text-green-400 mb-1">
                  📊 {achievement.metrics}
                </p>
              )}
              {achievement.url && (
                <p className="text-xs text-purple-600 dark:text-purple-400">
                  🔗{" "}
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
            <div className="flex items-center space-x-2 ml-4">
              <Toggle
                checked={achievement.selected}
                onChange={() => handleToggleAchievement(achievement.id)}
                disabled={isUpdating}
              />
              <Button
                onClick={() => handleDeleteAchievement(achievement.id)}
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
