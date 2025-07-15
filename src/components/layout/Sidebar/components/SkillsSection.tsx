import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
import type { CVData } from "@/types/cv";

interface SkillsSectionProps {
  cvData: CVData;
  onToggleSkill: (skillId: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  cvData,
  onToggleSkill,
}) => {
  const selectedCount = cvData.skills.filter((s) => s.selected).length;

  // Agrupar habilidades por categoría
  const skillsByCategory = cvData.skills.reduce(
    (acc, skill) => {
      const categoryName = skill.categoryName || "Sin categoría";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(skill);
      return acc;
    },
    {} as Record<string, typeof cvData.skills>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500"></div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
            Habilidades Técnicas
          </h4>
        </div>
        <Badge variant="info" size="sm" pill>
          {selectedCount}/{cvData.skills.length}
        </Badge>
      </div>

      {Object.entries(skillsByCategory).map(([categoryName, skills]) => (
        <Card key={categoryName} variant="modern" padding="sm">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              {categoryName}
            </h5>
            <Badge variant="info" size="sm" pill>
              {skills.filter((s) => s.selected).length}/{skills.length}
            </Badge>
          </div>

          <div className="space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-1.5 rounded-lg bg-gray-50/50 dark:bg-gray-800/50 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200 group/item"
              >
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 mr-2 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                  {skill.name}
                </span>
                <Toggle
                  checked={skill.selected}
                  onChange={() => onToggleSkill(skill.id)}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};
