"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";
import {
  addSoftSkill,
  deleteSoftSkill,
  toggleSoftSkill,
} from "@/lib/actions/cv-actions";

interface SoftSkill {
  id: string;
  name: string;
  selected: boolean;
}

interface SoftSkillsSectionProps {
  softSkills: SoftSkill[];
  onUpdate: (
    updateFn: () => Promise<{ success: boolean; error?: string }>
  ) => Promise<boolean>;
  isUpdating: boolean;
}

export const SoftSkillsSection: React.FC<SoftSkillsSectionProps> = ({
  softSkills,
  onUpdate,
  isUpdating,
}) => {
  const [newSoftSkill, setNewSoftSkill] = useState("");

  const handleAddSoftSkill = async () => {
    if (newSoftSkill.trim()) {
      const success = await onUpdate(() =>
        addSoftSkill({
          name: newSoftSkill.trim(),
          selected: true,
        })
      );
      if (success) {
        setNewSoftSkill("");
      }
    }
  };

  const handleDeleteSoftSkill = async (softSkillId: string) => {
    if (
      confirm("¿Estás seguro de que quieres eliminar esta habilidad blanda?")
    ) {
      await onUpdate(() => deleteSoftSkill(softSkillId));
    }
  };

  const handleToggleSoftSkill = async (softSkillId: string) => {
    await onUpdate(() => toggleSoftSkill(softSkillId));
  };

  return (
    <Card>
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 md:mb-6">
        Habilidades Blandas
      </h3>

      {/* Add new soft skill */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg mb-4 md:mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3 md:mb-4 text-sm md:text-base">
          Añadir nueva habilidad blanda
        </h4>
        <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-2">
          <Input
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            placeholder="Ej: Liderazgo, Creatividad, Negociación..."
            className="flex-1 h-12 md:h-10 text-base md:text-sm"
            disabled={isUpdating}
          />
          <Button
            onClick={handleAddSoftSkill}
            size="sm"
            disabled={isUpdating}
            className="h-12 md:h-10 px-4 md:px-3 text-base md:text-sm font-medium whitespace-nowrap"
          >
            <span className="inline-flex items-center gap-2">
              <ConfiguredIcon name="plus" size={16} />
              Añadir habilidad blanda
            </span>
          </Button>
        </div>
      </div>

      {/* Existing soft skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {softSkills.map((softSkill) => (
          <div
            key={softSkill.id}
            className="flex items-center justify-between border rounded-lg p-3 md:p-2 min-h-[56px] md:min-h-[auto]"
          >
            <span className="text-base md:text-sm text-gray-900 dark:text-white flex-1 min-w-0 truncate pr-2">
              {softSkill.name}
            </span>
            <div className="flex items-center space-x-2 md:space-x-1 flex-shrink-0">
              <Toggle
                checked={softSkill.selected}
                onChange={() => handleToggleSoftSkill(softSkill.id)}
                disabled={isUpdating}
              />
              <Button
                onClick={() => handleDeleteSoftSkill(softSkill.id)}
                size="sm"
                variant="secondary"
                className="text-red-600 hover:text-red-700 p-2 md:p-1 min-w-[44px] min-h-[44px] md:min-w-[auto] md:min-h-[auto]"
                disabled={isUpdating}
              >
                <ConfiguredIcon name="trash" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
