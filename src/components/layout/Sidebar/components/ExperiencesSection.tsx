import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
import type { CVData } from "@/types/cv";

interface ExperiencesSectionProps {
  cvData: CVData;
  onToggleExperience: (experienceId: string) => void;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  cvData,
  onToggleExperience,
}) => {
  const selectedCount = cvData.experiences.filter((exp) => exp.selected).length;

  return (
    <Card variant="modern" padding="md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-500 to-red-500"></div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
            Experiencias
          </h4>
        </div>
        <Badge variant="info" size="sm" pill>
          {selectedCount}/{cvData.experiences.length}
        </Badge>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
        {cvData.experiences.map((experience) => (
          <div
            key={experience.id}
            className="border-l-3 border-orange-500 pl-3 p-2 rounded-r-lg bg-gray-50/50 dark:bg-gray-800/50 hover:shadow-sm transition-all duration-200 group/item"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-2">
                <h5 className="text-xs font-semibold text-gray-900 dark:text-white group-hover/item:text-orange-600 dark:group-hover/item:text-orange-400 transition-colors">
                  {experience.position}
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {experience.company}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {experience.startDate} - {experience.endDate || "Presente"}
                </p>
              </div>
              <Toggle
                checked={experience.selected}
                onChange={() => onToggleExperience(experience.id)}
                size="sm"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
