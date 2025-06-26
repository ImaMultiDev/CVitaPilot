"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";
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
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Habilidades Blandas
      </h3>

      {/* Add new soft skill */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Añadir nueva habilidad blanda
        </h4>
        <div className="flex space-x-2">
          <Input
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            placeholder="Ej: Liderazgo, Creatividad, Negociación..."
            className="flex-1"
            disabled={isUpdating}
          />
          <Button onClick={handleAddSoftSkill} size="sm" disabled={isUpdating}>
            ➕ Añadir
          </Button>
        </div>
      </div>

      {/* Existing soft skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {softSkills.map((softSkill) => (
          <div
            key={softSkill.id}
            className="flex items-center justify-between border rounded-lg p-2"
          >
            <span className="text-sm text-gray-900 dark:text-white">
              {softSkill.name}
            </span>
            <div className="flex items-center space-x-1">
              <Toggle
                checked={softSkill.selected}
                onChange={() => handleToggleSoftSkill(softSkill.id)}
                disabled={isUpdating}
              />
              <Button
                onClick={() => handleDeleteSoftSkill(softSkill.id)}
                size="sm"
                variant="secondary"
                className="text-red-600 hover:text-red-700 p-1"
                disabled={isUpdating}
              >
                🗑️
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
