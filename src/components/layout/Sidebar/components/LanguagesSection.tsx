import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { CVData } from "@/types/cv";

interface LanguagesSectionProps {
  cvData: CVData;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  cvData,
}) => {
  return (
    <Card variant="modern" padding="md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-500 to-green-500"></div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
            Idiomas
          </h4>
        </div>
        <Badge variant="success" size="sm" pill>
          {cvData.languages.length}
        </Badge>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
        {cvData.languages.map((language) => (
          <div
            key={language.id}
            className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-sm transition-all duration-200"
          >
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 mr-2">
              {language.name}
            </span>
            <Badge variant="success" size="sm" pill>
              {language.level}
            </Badge>
          </div>
        ))}
      </div>

      <div className="mt-3 p-2 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50">
        <div className="text-xs text-emerald-700 dark:text-emerald-300 font-medium flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span>Los idiomas se muestran siempre</span>
        </div>
      </div>
    </Card>
  );
};
