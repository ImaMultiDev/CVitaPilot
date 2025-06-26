"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { addSkill, updateSkill } from "@/lib/actions/cv-actions";
import { Skill, SkillCategory } from "@/types/cv";

interface SkillFormPrismaProps {
  isOpen: boolean;
  onClose: () => void;
  skill?: Skill;
  categories: SkillCategory[];
}

export const SkillFormPrisma: React.FC<SkillFormPrismaProps> = ({
  isOpen,
  onClose,
  skill,
  categories,
}) => {
  const [formData, setFormData] = useState<Omit<Skill, "id">>({
    name: skill?.name || "",
    categoryId: skill?.categoryId || categories[0]?.id || "",
    selected: skill?.selected || true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

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
          value={formData.categoryId}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              categoryId: value,
            }))
          }
          options={categoryOptions}
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
