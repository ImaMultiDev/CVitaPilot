"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { addLanguage, deleteLanguage } from "@/lib/actions/cv-actions";

interface Language {
  id: string;
  name: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Nativo";
}

interface LanguagesSectionProps {
  languages: Language[];
  onUpdate: (
    updateFn: () => Promise<{ success: boolean; error?: string }>
  ) => Promise<boolean>;
  isUpdating: boolean;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  languages,
  onUpdate,
  isUpdating,
}) => {
  const [newLanguage, setNewLanguage] = useState({
    name: "",
    level: "A1" as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Nativo",
  });

  const languageLevels = [
    { value: "A1", label: "A1 - Básico" },
    { value: "A2", label: "A2 - Básico" },
    { value: "B1", label: "B1 - Intermedio" },
    { value: "B2", label: "B2 - Intermedio" },
    { value: "C1", label: "C1 - Avanzado" },
    { value: "C2", label: "C2 - Avanzado" },
    { value: "Nativo", label: "Nativo" },
  ];

  const handleAddLanguage = async () => {
    if (newLanguage.name.trim()) {
      const success = await onUpdate(() =>
        addLanguage({
          name: newLanguage.name.trim(),
          level: newLanguage.level,
        })
      );
      if (success) {
        setNewLanguage({ name: "", level: "A1" });
      }
    }
  };

  const handleDeleteLanguage = async (languageId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este idioma?")) {
      await onUpdate(() => deleteLanguage(languageId));
    }
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Idiomas
      </h3>

      {/* Add new language */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Añadir nuevo idioma
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input
            label="Nombre del idioma"
            value={newLanguage.name}
            onChange={(e) =>
              setNewLanguage((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Ej: Inglés, Francés..."
            disabled={isUpdating}
          />
          <Select
            label="Nivel"
            value={newLanguage.level}
            onChange={(value) =>
              setNewLanguage((prev) => ({
                ...prev,
                level: value as
                  | "A1"
                  | "A2"
                  | "B1"
                  | "B2"
                  | "C1"
                  | "C2"
                  | "Nativo",
              }))
            }
            options={languageLevels}
          />
          <div className="flex items-end">
            <Button
              onClick={handleAddLanguage}
              size="sm"
              className="w-full"
              disabled={isUpdating}
            >
              ➕ Añadir idioma
            </Button>
          </div>
        </div>
      </div>

      {/* Idiomas existentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {languages.map((language) => (
          <div
            key={language.id}
            className="flex items-center justify-between border rounded-lg p-3"
          >
            <div>
              <span className="font-medium text-gray-900 dark:text-white">
                {language.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                ({language.level})
              </span>
            </div>
            <Button
              onClick={() => handleDeleteLanguage(language.id)}
              size="sm"
              variant="secondary"
              className="text-red-600 hover:text-red-700"
              disabled={isUpdating}
            >
              🗑️
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
