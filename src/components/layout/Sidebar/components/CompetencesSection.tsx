import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
import type { CVData } from "@/types/cv";

interface CompetencesSectionProps {
  cvData: CVData;
  onToggleCompetence: (competenceId: string) => void;
}

export const CompetencesSection: React.FC<CompetencesSectionProps> = ({
  cvData,
  onToggleCompetence,
}) => {
  const selectedCount = cvData.competences.filter(
    (comp) => comp.selected
  ).length;

  return (
    <Card variant="modern" padding="md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500"></div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
            Competencias
          </h4>
        </div>
        <Badge variant="info" size="sm" pill>
          {selectedCount}/{cvData.competences.length}
        </Badge>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
        {cvData.competences.map((competence) => (
          <div
            key={competence.id}
            className="flex items-center justify-between p-2 rounded-lg bg-gray-50/50 dark:bg-gray-800/50 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200 group/item"
          >
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 mr-2 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">
              {competence.name}
            </span>
            <Toggle
              checked={competence.selected}
              onChange={() => onToggleCompetence(competence.id)}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};
