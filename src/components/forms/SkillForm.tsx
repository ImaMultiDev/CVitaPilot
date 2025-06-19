// src/components/forms/SkillForm.tsx

"use client";

import { useState } from "react";
import { useCV } from "@/contexts/CVContext";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Skill } from "@/types/cv";

interface SkillFormProps {
  isOpen: boolean;
  onClose: () => void;
  skill?: Skill;
}

export const SkillForm: React.FC<SkillFormProps> = ({
  isOpen,
  onClose,
  skill,
}) => {
  const { dispatch, addSkill } = useCV();
  const [formData, setFormData] = useState<Omit<Skill, "id">>({
    name: skill?.name || "",
    category: skill?.category || "language",
    selected: skill?.selected || true,
  });

  const skillCategories = [
    { value: "language", label: "Lenguaje de Programación" },
    { value: "framework", label: "Framework" },
    { value: "database", label: "Base de Datos" },
    { value: "tool", label: "Herramienta" },
    { value: "library", label: "Librería" },
    { value: "orm", label: "ORM" },
    { value: "ai", label: "IA" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (skill) {
      dispatch({
        type: "UPDATE_SKILL",
        payload: { ...formData, id: skill.id },
      });
    } else {
      addSkill(formData);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={skill ? "Editar habilidad" : "Nueva habilidad"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre de la habilidad"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />

        <Select
          label="Categoría"
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              category: e.target.value as Skill["category"],
            }))
          }
          options={skillCategories}
          required
        />

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {skill ? "Actualizar" : "Crear"} habilidad
          </Button>
        </div>
      </form>
    </Modal>
  );
};
