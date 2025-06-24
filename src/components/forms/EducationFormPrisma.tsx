"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { addEducation, updateEducation } from "@/lib/actions/cv-actions";
import { Education } from "@/types/cv";

interface EducationFormPrismaProps {
  isOpen: boolean;
  onClose: () => void;
  education?: Education;
}

export const EducationFormPrisma: React.FC<EducationFormPrismaProps> = ({
  isOpen,
  onClose,
  education,
}) => {
  const [formData, setFormData] = useState<Omit<Education, "id">>({
    title: education?.title || "",
    institution: education?.institution || "",
    location: education?.location || "",
    startYear: education?.startYear || "",
    endYear: education?.endYear || "",
    selected: education?.selected || true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (education) {
        await updateEducation({ ...formData, id: education.id });
      } else {
        await addEducation(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving education:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        education ? "Editar formación académica" : "Nueva formación académica"
      }
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Título del grado/master/doctorado"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Ej: Técnico Superior en Desarrollo de Aplicaciones Multiplataforma"
          required
        />

        <Input
          label="Universidad/Centro educativo"
          value={formData.institution}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, institution: e.target.value }))
          }
          placeholder="Ej: Universidad de Navarra"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Ubicación"
            value={formData.location}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, location: e.target.value }))
            }
            placeholder="Ciudad, País"
          />
          <Input
            label="Año inicio"
            value={formData.startYear}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, startYear: e.target.value }))
            }
            placeholder="2020"
            required
          />
          <Input
            label="Año fin"
            value={formData.endYear}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, endYear: e.target.value }))
            }
            placeholder="2024"
            required
          />
        </div>

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
            {isLoading ? "Guardando..." : education ? "Actualizar" : "Añadir"}{" "}
            formación académica
          </Button>
        </div>
      </form>
    </Modal>
  );
};
