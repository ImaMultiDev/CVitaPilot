import React from "react";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

interface ActiveCVIndicatorProps {
  currentCVName?: string;
}

export const ActiveCVIndicator: React.FC<ActiveCVIndicatorProps> = ({
  currentCVName,
}) => {
  if (!currentCVName) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4 sm:p-6 shadow-sm no-print">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div className="flex items-center gap-2">
            <ConfiguredIcon
              name="check-circle"
              className="text-blue-800 dark:text-blue-200 w-6 h-6"
            />
            <span className="font-semibold text-base sm:text-lg text-blue-800 dark:text-blue-200">
              CV Activo
            </span>
          </div>
        </div>
        <p className="text-lg sm:text-xl font-bold text-blue-900 dark:text-blue-100 break-words">
          {currentCVName}
        </p>
        <div className="mt-2 sm:mt-3 flex items-center justify-center gap-2 text-xs sm:text-sm text-blue-700 dark:text-blue-300">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Listo para previsualizar e imprimir</span>
        </div>
      </div>
    </div>
  );
};
