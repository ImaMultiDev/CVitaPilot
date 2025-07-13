import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
import type { CVData } from "@/types/cv";

interface EducationSectionProps {
  cvData: CVData;
  onToggleEducation: (educationId: string) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  cvData,
  onToggleEducation,
}) => {
  const selectedCount = cvData.education.filter((edu) => edu.selected).length;

  return (
    <Card variant="modern" padding="md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
            Formación
          </h4>
        </div>
        <Badge variant="info" size="sm" pill>
          {selectedCount}/{cvData.education.length}
        </Badge>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
        {cvData.education.map((edu) => (
          <div
            key={edu.id}
            className="border-l-3 border-purple-500 pl-3 p-2 rounded-r-lg bg-gray-50/50 dark:bg-gray-800/50 hover:shadow-sm transition-all duration-200 group/item"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-2">
                <h5 className="text-xs font-semibold text-gray-900 dark:text-white group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 transition-colors">
                  {edu.title}
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {edu.institution}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {`${edu.startYear} - ${edu.endYear}`}
                </p>
              </div>
              <Toggle
                checked={edu.selected}
                onChange={() => onToggleEducation(edu.id)}
                size="sm"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
