"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { addExperience, updateExperience } from "@/lib/actions/cv-actions";
import { Experience } from "@/types/cv";

interface ExperienceFormPrismaProps {
  isOpen: boolean;
  onClose: () => void;
  experience?: Experience;
}

export const ExperienceFormPrisma: React.FC<ExperienceFormPrismaProps> = ({
  isOpen,
  onClose,
  experience,
}) => {
  const [formData, setFormData] = useState<Omit<Experience, "id">>({
    position: experience?.position || "",
    company: experience?.company || "",
    location: experience?.location || "",
    startDate: experience?.startDate || "",
    endDate: experience?.endDate || "",
    contractType: experience?.contractType || "",
    workSchedule: experience?.workSchedule || "",
    workModality: experience?.workModality || "",
    description: experience?.description || "",
    technologies: experience?.technologies || [],
    selected: experience?.selected || true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const contractTypes = [
    { value: "Contrato indefinido", label: "Contrato indefinido" },
    { value: "Contrato temporal", label: "Contrato temporal" },
    { value: "Contrato en prácticas", label: "Contrato en prácticas" },
    { value: "Contrato de formación", label: "Contrato de formación" },
    { value: "Contrato de obra", label: "Contrato de obra" },
    { value: "Freelance", label: "Freelance" },
    { value: "Autónomo", label: "Autónomo" },
    { value: "Prácticas no laborales", label: "Prácticas no laborales" },
  ];

  const workSchedules = [
    { value: "Jornada completa", label: "Jornada completa" },
    { value: "Jornada parcial", label: "Jornada parcial" },
    { value: "Media jornada", label: "Media jornada" },
    { value: "Jornada intensiva", label: "Jornada intensiva" },
    { value: "Jornada flexible", label: "Jornada flexible" },
  ];

  const workModalities = [
    { value: "Presencial", label: "Presencial" },
    { value: "Remoto", label: "Remoto" },
    { value: "Híbrido", label: "Híbrido" },
    { value: "Teletrabajo", label: "Teletrabajo" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (experience) {
        await updateExperience({ ...formData, id: experience.id });
      } else {
        await addExperience(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving experience:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTechnologiesChange = (value: string) => {
    const technologies = value
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech);
    setFormData((prev) => ({ ...prev, technologies }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={experience ? "Editar experiencia" : "Nueva experiencia"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Puesto"
            value={formData.position}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, position: e.target.value }))
            }
            required
          />
          <Input
            label="Empresa"
            value={formData.company}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, company: e.target.value }))
            }
            required
          />
        </div>

        <Input
          label="Ubicación"
          value={formData.location}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, location: e.target.value }))
          }
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Fecha de inicio"
            type="month"
            value={formData.startDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, startDate: e.target.value }))
            }
            required
          />
          <Input
            label="Fecha de fin (opcional)"
            type="month"
            value={formData.endDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, endDate: e.target.value }))
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Tipo de contrato"
            value={formData.contractType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, contractType: e.target.value }))
            }
            options={contractTypes}
            required
          />
          <Select
            label="Tipo de jornada"
            value={formData.workSchedule}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, workSchedule: e.target.value }))
            }
            options={workSchedules}
            required
          />
          <Select
            label="Modalidad de trabajo"
            value={formData.workModality}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, workModality: e.target.value }))
            }
            options={workModalities}
            required
          />
        </div>

        <Textarea
          label="Descripción"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          rows={3}
          required
        />

        <Input
          label="Tecnologías (separadas por comas)"
          value={formData.technologies.join(", ")}
          onChange={(e) => handleTechnologiesChange(e.target.value)}
          placeholder="React, Node.js, TypeScript..."
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
            {isLoading ? "Guardando..." : experience ? "Actualizar" : "Crear"}{" "}
            experiencia
          </Button>
        </div>
      </form>
    </Modal>
  );
};
