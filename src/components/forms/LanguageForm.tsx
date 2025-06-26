// src/components/forms/LanguageForm.tsx

"use client";

import { useState } from "react";
import { useCV } from "@/contexts/CVContext";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Language } from "@/types/cv";

interface LanguageFormProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

export const LanguageForm: React.FC<LanguageFormProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const { dispatch, addLanguage } = useCV();
  const [formData, setFormData] = useState<Omit<Language, "id">>({
    name: language?.name || "",
    level: language?.level || "A1",
  });

  const languageLevels = [
    { value: "A1", label: "A1 - Principiante" },
    { value: "A2", label: "A2 - Básico" },
    { value: "B1", label: "B1 - Intermedio" },
    { value: "B2", label: "B2 - Intermedio Alto" },
    { value: "C1", label: "C1 - Avanzado" },
    { value: "C2", label: "C2 - Competencia" },
    { value: "Nativo", label: "Nativo" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (language) {
      dispatch({
        type: "UPDATE_LANGUAGE",
        payload: { ...formData, id: language.id },
      });
    } else {
      addLanguage(formData);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={language ? "Editar idioma" : "Nuevo idioma"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Idioma"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />

        <Select
          label="Nivel"
          value={formData.level}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              level: value as Language["level"],
            }))
          }
          options={languageLevels}
          required
        />

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {language ? "Actualizar" : "Crear"} idioma
          </Button>
        </div>
      </form>
    </Modal>
  );
};
