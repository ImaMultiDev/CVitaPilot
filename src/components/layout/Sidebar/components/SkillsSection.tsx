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
  const skillsByCategory = cvData.skillCategories
    .map((category) => {
      const skills = cvData.skills.filter(
        (skill) => skill.categoryId === category.id
      );
      return {
        ...category,
        skills,
        selectedCount: skills.filter((skill) => skill.selected).length,
      };
    })
    .filter((category) => category.skills.length > 0);

  return (
    <div className="space-y-4">
      {skillsByCategory.map((category) => (
        <Card key={category.id} variant="modern" padding="md" className="group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500"></div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                {category.name}
              </h4>
            </div>
            <Badge variant="info" size="sm" pill>
              {category.selectedCount}/{category.skills.length}
            </Badge>
          </div>

          <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
            {category.skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-2 rounded-lg bg-gray-50/50 dark:bg-gray-800/50 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200 group/item"
              >
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 mr-2 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                  {skill.name}
                </span>
                <Toggle
                  checked={skill.selected}
                  onChange={() => onToggleSkill(skill.id)}
                />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};
