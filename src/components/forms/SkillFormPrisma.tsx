"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { addSkill, updateSkill } from "@/lib/actions/cv-actions";
import { Skill } from "@/types/cv";

interface SkillFormPrismaProps {
  isOpen: boolean;
  onClose: () => void;
  skill?: Skill;
}

export const SkillFormPrisma: React.FC<SkillFormPrismaProps> = ({
  isOpen,
  onClose,
  skill,
}) => {
  const [formData, setFormData] = useState<Omit<Skill, "id">>({
    name: skill?.name || "",
    category: skill?.category || "language",
    selected: skill?.selected || true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const skillCategories = [
    { value: "language", label: "Lenguaje de Programación" },
    { value: "framework", label: "Framework" },
    { value: "database", label: "Base de Datos" },
    { value: "tool", label: "Herramienta" },
    { value: "library", label: "Librería" },
    { value: "orm", label: "ORM" },
    { value: "ai", label: "IA" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (skill) {
        await updateSkill({ ...formData, id: skill.id });
      } else {
        await addSkill(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving skill:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={skill ? "Editar habilidad" : "Nueva habilidad"}
      size="md"
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
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : skill ? "Actualizar" : "Crear"}{" "}
            habilidad
          </Button>
        </div>
      </form>
    </Modal>
  );
};
