// src/components/forms/PersonalInfoForm.tsx

"use client";

import { useState } from "react";
import { useCV } from "@/contexts/CVContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const PersonalInfoForm: React.FC = () => {
  const { state, updatePersonalInfo } = useCV();
  const [formData, setFormData] = useState(state.currentCV.personalInfo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Información Personal
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre completo"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
          <Input
            label="Puesto objetivo"
            value={formData.position}
            onChange={(e) => handleChange("position", e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Teléfono"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="LinkedIn"
            value={formData.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
          />
          <Input
            label="GitHub"
            value={
              formData.socialNetworks.find((sn) => sn.name === "GitHub")?.url ||
              ""
            }
            onChange={(e) => {
              // TODO: Actualizar para usar socialNetworks
              handleChange("github", e.target.value);
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Sitio web"
            value={formData.website}
            onChange={(e) => handleChange("website", e.target.value)}
          />
          <Input
            label="Ubicación"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full">
          Actualizar información personal
        </Button>
      </form>
    </Card>
  );
};
