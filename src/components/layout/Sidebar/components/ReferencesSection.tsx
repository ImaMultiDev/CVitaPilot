import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
import type { CVData } from "@/types/cv";

interface ReferencesSectionProps {
  cvData: CVData;
  onToggleReference: (referenceId: string) => void;
}

export const ReferencesSection: React.FC<ReferencesSectionProps> = ({
  cvData,
  onToggleReference,
}) => {
  const selectedCount = cvData.references.filter((ref) => ref.selected).length;

  return (
    <Card variant="modern" padding="md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-teal-500 to-blue-500"></div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
            Referencias
          </h4>
        </div>
        <Badge variant="info" size="sm" pill>
          {selectedCount}/{cvData.references.length}
        </Badge>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
        {cvData.references.map((reference) => (
          <div
            key={reference.id}
            className="border-l-3 border-teal-500 pl-3 p-2 rounded-r-lg bg-gray-50/50 dark:bg-gray-800/50 hover:shadow-sm transition-all duration-200 group/item"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-2">
                <h5 className="text-xs font-semibold text-gray-900 dark:text-white group-hover/item:text-teal-600 dark:group-hover/item:text-teal-400 transition-colors">
                  {reference.name}
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {reference.position}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {reference.company}
                </p>
              </div>
              <Toggle
                checked={reference.selected}
                onChange={() => onToggleReference(reference.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
