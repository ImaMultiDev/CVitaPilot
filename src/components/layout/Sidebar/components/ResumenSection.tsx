import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { CVData } from "@/types/cv";

interface ResumenSectionProps {
  cvData: CVData;
}

export const ResumenSection: React.FC<ResumenSectionProps> = ({ cvData }) => {
  // Calcular estadísticas
  const selectedSkills = cvData.skills.filter((s) => s.selected).length;
  const selectedCompetences = cvData.competences.filter(
    (c) => c.selected
  ).length;
  const selectedSoftSkills = cvData.softSkills.filter((s) => s.selected).length;
  const selectedExperiences = cvData.experiences.filter(
    (e) => e.selected
  ).length;
  const selectedEducation = cvData.education.filter((e) => e.selected).length;
  const selectedCertifications = cvData.certifications.filter(
    (c) => c.selected
  ).length;
  const selectedAchievements = cvData.achievements.filter(
    (a) => a.selected
  ).length;
  const selectedReferences = cvData.references.filter((r) => r.selected).length;

  const totalElements =
    selectedSkills +
    selectedCompetences +
    selectedSoftSkills +
    selectedExperiences +
    selectedEducation +
    selectedCertifications +
    selectedAchievements +
    selectedReferences +
    cvData.languages.length;

  const stats = [
    {
      label: "Habilidades",
      count: selectedSkills,
      color: "bg-blue-500",
      variant: "primary" as const,
    },
    {
      label: "Competencias",
      count: selectedCompetences,
      color: "bg-indigo-500",
      variant: "primary" as const,
    },
    {
      label: "Habilidades Blandas",
      count: selectedSoftSkills,
      color: "bg-green-500",
      variant: "success" as const,
    },
    {
      label: "Experiencias",
      count: selectedExperiences,
      color: "bg-orange-500",
      variant: "warning" as const,
    },
    {
      label: "Formación",
      count: selectedEducation,
      color: "bg-purple-500",
      variant: "secondary" as const,
    },
    {
      label: "Certificaciones",
      count: selectedCertifications,
      color: "bg-yellow-500",
      variant: "warning" as const,
    },
    {
      label: "Logros",
      count: selectedAchievements,
      color: "bg-pink-500",
      variant: "danger" as const,
    },
    {
      label: "Referencias",
      count: selectedReferences,
      color: "bg-teal-500",
      variant: "info" as const,
    },
    {
      label: "Idiomas",
      count: cvData.languages.length,
      color: "bg-emerald-500",
      variant: "success" as const,
    },
  ];

  return (
    <Card
      variant="modern"
      padding="md"
      className="bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/20 border-blue-200/50 dark:border-blue-800/50"
    >
      <h4 className="text-sm font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500"></div>
        <span>Resumen del CV</span>
      </h4>

      {/* Estadísticas principales en grid vertical */}
      <div className="space-y-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {stat.label}
              </span>
            </div>
            <Badge variant={stat.variant} size="sm">
              {stat.count}
            </Badge>
          </div>
        ))}
      </div>

      {/* Total general */}
      <div className="mt-4 pt-3 border-t border-blue-200/50 dark:border-blue-700/50">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-blue-900 dark:text-blue-100">
            Total elementos:
          </span>
          <Badge variant="primary" size="md" className="font-bold">
            {totalElements}
          </Badge>
        </div>
      </div>

      {/* Tip informativo */}
      <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg border border-blue-200/50 dark:border-blue-700/50">
        <div className="text-xs text-blue-700 dark:text-blue-300 font-medium flex items-start space-x-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0"></div>
          <span>
            Selecciona una sección específica para activar/desactivar elementos
            individuales del CV.
          </span>
        </div>
      </div>
    </Card>
  );
};
