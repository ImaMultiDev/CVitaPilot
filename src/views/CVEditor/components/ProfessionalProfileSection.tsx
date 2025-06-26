"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { updateAboutMe } from "@/lib/actions/cv-actions";

interface ProfessionalProfileSectionProps {
  initialAboutMe: string;
  onUpdate: (
    updateFn: () => Promise<{ success: boolean; error?: string }>
  ) => Promise<boolean>;
  isUpdating: boolean;
}

export const ProfessionalProfileSection: React.FC<
  ProfessionalProfileSectionProps
> = ({ initialAboutMe, onUpdate, isUpdating }) => {
  const [aboutMeText, setAboutMeText] = useState(initialAboutMe);

  const handleAboutMeUpdate = async () => {
    await onUpdate(() => updateAboutMe(aboutMeText));
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Perfil Profesional
      </h3>
      <div className="space-y-4">
        <Textarea
          value={aboutMeText}
          onChange={(e) => setAboutMeText(e.target.value)}
          rows={4}
          placeholder="Describe tu experiencia, fortalezas y objetivos profesionales..."
          disabled={isUpdating}
        />
        <Button onClick={handleAboutMeUpdate} size="sm" disabled={isUpdating}>
          Actualizar descripción
        </Button>
      </div>
    </Card>
  );
};
