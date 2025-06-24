// src/components/forms/EducationForm.tsx

"use client";

import { useState } from "react";
import { useCV } from "@/contexts/CVContext";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Education } from "@/types/cv";

interface EducationFormProps {
  isOpen: boolean;
  onClose: () => void;
  education?: Education;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  isOpen,
  onClose,
  education,
}) => {
  const { dispatch, addEducation } = useCV();
  const [formData, setFormData] = useState<Omit<Education, "id">>({
    title: education?.title || "",
    institution: education?.institution || "",
    location: education?.location || "",
    startYear: education?.startYear || "",
    endYear: education?.endYear || "",
    selected: education?.selected || true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (education) {
      dispatch({
        type: "UPDATE_EDUCATION",
        payload: { ...formData, id: education.id },
      });
    } else {
      addEducation(formData);
    }

    onClose();
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
          required
        />

        <Input
          label="Universidad/Centro educativo"
          value={formData.institution}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, institution: e.target.value }))
          }
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
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {education ? "Actualizar" : "Añadir"} formación académica
          </Button>
        </div>
      </form>
    </Modal>
  );
};
