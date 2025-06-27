"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { addSkill, deleteSkill, toggleSkill } from "@/lib/actions/cv-actions";
import { CVEditorIcons } from "@/components/ui/icons/CVEditorIcons";

interface SkillCategory {
  id: string;
  name: string;
}

interface Skill {
  id: string;
  name: string;
  categoryId: string;
  selected: boolean;
}

interface SkillsSectionProps {
  skills: Skill[];
  skillCategories: SkillCategory[];
  onUpdate: (
    updateFn: () => Promise<{ success: boolean; error?: string }>
  ) => Promise<boolean>;
  isUpdating: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  skillCategories,
  onUpdate,
  isUpdating,
}) => {
  const [newSkill, setNewSkill] = useState({
    name: "",
    categoryId: skillCategories[0]?.id || "",
  });

  // Group skills by category using categoryId
  const skillsByCategory = skills.reduce((acc, skill) => {
    const categoryId = skill.categoryId;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Create category options for the select
  const categoryOptions = skillCategories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  const handleAddSkill = async () => {
    if (newSkill.name.trim() && newSkill.categoryId) {
      const success = await onUpdate(() =>
        addSkill({
          name: newSkill.name.trim(),
          categoryId: newSkill.categoryId,
          selected: true,
        })
      );
      if (success) {
        setNewSkill({
          name: "",
          categoryId: skillCategories[0]?.id || "",
        });
      }
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta habilidad?")) {
      await onUpdate(() => deleteSkill(skillId));
    }
  };

  const handleToggleSkill = async (skillId: string) => {
    await onUpdate(() => toggleSkill(skillId));
  };

  return (
    <Card>
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 md:mb-6 flex items-center gap-2">
        <CVEditorIcons.Skills size={24} />
        Habilidades Técnicas
      </h3>

      {/* Add new skill */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg mb-4 md:mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3 md:mb-4 text-sm md:text-base">
          Añadir nueva habilidad
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <Input
            label="Nombre de la habilidad"
            value={newSkill.name}
            onChange={(e) =>
              setNewSkill((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Ej: React, Python, PostgreSQL..."
            disabled={isUpdating}
            className="h-12 md:h-10 text-base md:text-sm"
          />
          <Select
            label="Categoría"
            value={newSkill.categoryId}
            onChange={(value) =>
              setNewSkill((prev) => ({
                ...prev,
                categoryId: value,
              }))
            }
            options={categoryOptions}
            className="h-12 md:h-10 text-base md:text-sm"
          />
          <div className="flex items-end">
            <Button
              onClick={handleAddSkill}
              size="sm"
              className="w-full h-12 md:h-10 text-base md:text-sm font-medium"
              disabled={isUpdating}
            >
              <span className="inline-flex items-center gap-2">
                <CVEditorIcons.Add size={16} />
                Añadir habilidad
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Habilidades existentes por categoría */}
      {Object.entries(skillsByCategory).map(([categoryId, categorySkills]) => (
        <div key={categoryId} className="mb-6 md:mb-8">
          <h4 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 md:mb-4">
            {skillCategories.find((cat) => cat.id === categoryId)?.name ||
              categoryId}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {categorySkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between border rounded-lg p-3 md:p-2 min-h-[56px] md:min-h-[auto]"
              >
                <span className="text-base md:text-sm text-gray-900 dark:text-white flex-1 min-w-0 truncate pr-2">
                  {skill.name}
                </span>
                <div className="flex items-center space-x-2 md:space-x-1 flex-shrink-0">
                  <div className="scale-125 md:scale-100">
                    <Toggle
                      checked={skill.selected}
                      onChange={() => handleToggleSkill(skill.id)}
                      disabled={isUpdating}
                    />
                  </div>
                  <Button
                    onClick={() => handleDeleteSkill(skill.id)}
                    size="sm"
                    variant="secondary"
                    className="text-red-600 hover:text-red-700 p-2 md:p-1 min-w-[44px] min-h-[44px] md:min-w-[auto] md:min-h-[auto]"
                    disabled={isUpdating}
                  >
                    <CVEditorIcons.Delete size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Card>
  );
};
