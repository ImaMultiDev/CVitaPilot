"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { addLanguage, updateLanguage } from "@/lib/actions/cv-actions";
import { Language } from "@/types/cv";

interface LanguageFormPrismaProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

export const LanguageFormPrisma: React.FC<LanguageFormPrismaProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [formData, setFormData] = useState<Omit<Language, "id">>({
    name: language?.name || "",
    level: language?.level || "A1",
  });
  const [isLoading, setIsLoading] = useState(false);

  const languageLevels = [
    { value: "A1", label: "A1 - Principiante" },
    { value: "A2", label: "A2 - Básico" },
    { value: "B1", label: "B1 - Intermedio" },
    { value: "B2", label: "B2 - Intermedio-Alto" },
    { value: "C1", label: "C1 - Avanzado" },
    { value: "C2", label: "C2 - Competencia" },
    { value: "Nativo", label: "Nativo" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (language) {
        await updateLanguage({ ...formData, id: language.id });
      } else {
        await addLanguage(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving language:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={language ? "Editar idioma" : "Nuevo idioma"}
      size="md"
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
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              level: e.target.value as Language["level"],
            }))
          }
          options={languageLevels}
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
            {isLoading ? "Guardando..." : language ? "Actualizar" : "Crear"}{" "}
            idioma
          </Button>
        </div>
      </form>
    </Modal>
  );
};
