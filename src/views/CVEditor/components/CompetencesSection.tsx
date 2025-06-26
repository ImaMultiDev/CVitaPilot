"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";
import {
  addCompetence,
  deleteCompetence,
  toggleCompetence,
} from "@/lib/actions/cv-actions";

interface Competence {
  id: string;
  name: string;
  selected: boolean;
}

interface CompetencesSectionProps {
  competences: Competence[];
  onUpdate: (
    updateFn: () => Promise<{ success: boolean; error?: string }>
  ) => Promise<boolean>;
  isUpdating: boolean;
}

export const CompetencesSection: React.FC<CompetencesSectionProps> = ({
  competences,
  onUpdate,
  isUpdating,
}) => {
  const [newCompetence, setNewCompetence] = useState("");

  const handleAddCompetence = async () => {
    if (newCompetence.trim()) {
      const success = await onUpdate(() =>
        addCompetence({
          name: newCompetence.trim(),
          selected: true,
        })
      );
      if (success) {
        setNewCompetence("");
      }
    }
  };

  const handleDeleteCompetence = async (competenceId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta competencia?")) {
      await onUpdate(() => deleteCompetence(competenceId));
    }
  };

  const handleToggleCompetence = async (competenceId: string) => {
    await onUpdate(() => toggleCompetence(competenceId));
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Competencias Profesionales
      </h3>

      {/* Add new competence */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Añadir nueva competencia
        </h4>
        <div className="flex space-x-2">
          <Input
            value={newCompetence}
            onChange={(e) => setNewCompetence(e.target.value)}
            placeholder="Nueva competencia..."
            className="flex-1"
            disabled={isUpdating}
          />
          <Button onClick={handleAddCompetence} size="sm" disabled={isUpdating}>
            ➕ Añadir
          </Button>
        </div>
      </div>

      {/* Existing competences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {competences.map((competence) => (
          <div
            key={competence.id}
            className="flex items-center justify-between border rounded-lg p-2"
          >
            <span className="text-sm text-gray-900 dark:text-white">
              {competence.name}
            </span>
            <div className="flex items-center space-x-1">
              <Toggle
                checked={competence.selected}
                onChange={() => handleToggleCompetence(competence.id)}
                disabled={isUpdating}
              />
              <Button
                onClick={() => handleDeleteCompetence(competence.id)}
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
