import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
import type { CVData } from "@/types/cv";

interface SoftSkillsSectionProps {
  cvData: CVData;
  onToggleSoftSkill: (softSkillId: string) => void;
}

export const SoftSkillsSection: React.FC<SoftSkillsSectionProps> = ({
  cvData,
  onToggleSoftSkill,
}) => {
  const selectedCount = cvData.softSkills.filter(
    (skill) => skill.selected
  ).length;

  return (
    <Card variant="modern" padding="md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-500"></div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
            Habilidades Blandas
          </h4>
        </div>
        <Badge variant="info" size="sm" pill>
          {selectedCount}/{cvData.softSkills.length}
        </Badge>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
        {cvData.softSkills.map((softSkill) => (
          <div
            key={softSkill.id}
            className="flex items-center justify-between p-2 rounded-lg bg-gray-50/50 dark:bg-gray-800/50 border border-transparent hover:border-green-200 dark:hover:border-green-800 transition-all duration-200 group/item"
          >
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 mr-2 group-hover/item:text-green-600 dark:group-hover/item:text-green-400 transition-colors">
              {softSkill.name}
            </span>
            <Toggle
              checked={softSkill.selected}
              onChange={() => onToggleSoftSkill(softSkill.id)}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};
