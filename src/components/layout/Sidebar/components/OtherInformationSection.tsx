import React from "react";
import { OtherInformation } from "@/types/cv";

interface OtherInformationSectionProps {
  otherInformation: OtherInformation[];
  onToggleOtherInformation?: (otherInfoId: string) => void;
}

export const OtherInformationSection: React.FC<
  OtherInformationSectionProps
> = ({ otherInformation, onToggleOtherInformation }) => {
  if (otherInformation.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
        Otra Información
      </h3>
      <div className="space-y-1.5">
        {otherInformation.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-2 text-xs transition-colors ${
              item.selected
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-400 dark:text-gray-500"
            }`}
          >
            {onToggleOtherInformation && (
              <button
                onClick={() => onToggleOtherInformation(item.id)}
                className={`w-3 h-3 rounded border transition-colors ${
                  item.selected
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-300 dark:border-gray-600 hover:border-blue-400"
                }`}
              >
                {item.selected && <span className="text-white text-xs">✓</span>}
              </button>
            )}
            {item.icon && <span className="text-xs">{item.icon}</span>}
            <span className="flex-1">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
