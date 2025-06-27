import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
import type { CVData } from "@/types/cv";

interface AchievementsSectionProps {
  cvData: CVData;
  onToggleAchievement: (achievementId: string) => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  cvData,
  onToggleAchievement,
}) => {
  const selectedCount = cvData.achievements.filter(
    (achievement) => achievement.selected
  ).length;

  return (
    <Card variant="modern" padding="md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-pink-500 to-red-500"></div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
            Logros y Proyectos
          </h4>
        </div>
        <Badge variant="info" size="sm" pill>
          {selectedCount}/{cvData.achievements.length}
        </Badge>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
        {cvData.achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="border-l-3 border-pink-500 pl-3 p-2 rounded-r-lg bg-gray-50/50 dark:bg-gray-800/50 hover:shadow-sm transition-all duration-200 group/item"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-2">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-br from-pink-500 to-red-500"></div>
                  <h5 className="text-xs font-semibold text-gray-900 dark:text-white group-hover/item:text-pink-600 dark:group-hover/item:text-pink-400 transition-colors">
                    {achievement.title}
                  </h5>
                </div>
                {achievement.company && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium ml-3">
                    {achievement.company}
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-500 ml-3">
                  {achievement.date}
                </p>
              </div>
              <Toggle
                checked={achievement.selected}
                onChange={() => onToggleAchievement(achievement.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
