"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  addSkillCategory,
  deleteSkillCategory,
} from "@/lib/actions/cv-actions";

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

interface SkillCategoriesSectionProps {
  skillCategories: SkillCategory[];
  skills: Skill[];
  onUpdate: (
    updateFn: () => Promise<{ success: boolean; error?: string }>
  ) => Promise<boolean>;
  isUpdating: boolean;
}

export const SkillCategoriesSection: React.FC<SkillCategoriesSectionProps> = ({
  skillCategories,
  skills,
  onUpdate,
  isUpdating,
}) => {
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = async () => {
    if (newCategoryName.trim()) {
      const success = await onUpdate(() =>
        addSkillCategory({
          name: newCategoryName.trim(),
        })
      );
      if (success) {
        setNewCategoryName("");
      }
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    // Encontrar la categoría y contar las habilidades asociadas
    const category = skillCategories.find((cat) => cat.id === categoryId);
    const skillsInCategory = skills.filter(
      (skill) => skill.categoryId === categoryId
    );

    if (!category) return;

    let confirmMessage = "";

    if (skillsInCategory.length === 0) {
      // Categoría vacía - mensaje simple
      confirmMessage = `¿Estás seguro de que quieres eliminar la categoría "${category.name}"?`;
    } else {
      // Categoría con habilidades - mensaje detallado
      const skillCount = skillsInCategory.length;
      const skillNames = skillsInCategory.map((skill) => skill.name).join(", ");

      confirmMessage = `⚠️ ATENCIÓN: La categoría "${
        category.name
      }" contiene ${skillCount} habilidad${skillCount > 1 ? "es" : ""}:

${skillNames}

¿Estás seguro de que quieres eliminar la categoría "${
        category.name
      }" y TODAS sus habilidades asociadas?

Esta acción no se puede deshacer.`;
    }

    if (confirm(confirmMessage)) {
      await onUpdate(() => deleteSkillCategory(categoryId));
    }
  };

  return (
    <Card>
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 md:mb-6">
        🗂️ Categorías de Habilidades
      </h3>

      {/* Add new category */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-4 md:p-6 rounded-lg mb-4 md:mb-6">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3 md:mb-4 text-sm md:text-base">
          ➕ Crear nueva categoría
        </h4>
        <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-2">
          <Input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Ej: Machine Learning, DevOps, Diseño..."
            className="flex-1 h-12 md:h-10 text-base md:text-sm"
            disabled={isUpdating}
          />
          <Button
            onClick={handleAddCategory}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white h-12 md:h-10 px-4 md:px-3 text-base md:text-sm font-medium whitespace-nowrap"
            disabled={isUpdating}
          >
            ➕ Crear Categoría
          </Button>
        </div>
      </div>

      {/* Existing categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
        {skillCategories.map((category) => {
          const skillCount = skills.filter(
            (skill) => skill.categoryId === category.id
          ).length;
          return (
            <div
              key={category.id}
              className="flex items-center justify-between border border-gray-200 dark:border-gray-600 rounded-lg p-4 md:p-3 bg-white dark:bg-gray-700 min-h-[60px] md:min-h-[auto]"
            >
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <span className="text-base md:text-sm font-medium text-gray-900 dark:text-white truncate">
                  📁 {category.name}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                    skillCount > 0
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                  }`}
                >
                  {skillCount} skill{skillCount !== 1 ? "s" : ""}
                </span>
              </div>
              <Button
                onClick={() => handleDeleteCategory(category.id)}
                size="sm"
                variant="secondary"
                className="text-red-600 hover:text-red-700 p-2 md:p-1 min-w-[44px] min-h-[44px] md:min-w-[auto] md:min-h-[auto] ml-2"
                disabled={isUpdating}
                title={
                  skillCount > 0
                    ? `Eliminar categoría y ${skillCount} habilidad${
                        skillCount > 1 ? "es" : ""
                      }`
                    : "Eliminar categoría vacía"
                }
              >
                🗑️
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
