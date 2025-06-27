// src/components/layout/Sidebar/Sidebar.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  toggleSkill,
  toggleCompetence,
  toggleSoftSkill,
  toggleExperience,
  toggleEducation,
  toggleCertification,
  toggleAchievement,
  toggleReference,
  forceRevalidation,
} from "@/lib/actions/cv-actions";
import type { CVData } from "@/types/cv";
import {
  SidebarHeader,
  SectionRenderer,
  SidebarCustomScrollbar,
} from "./components";

interface SidebarProps {
  cvData: CVData;
}

export const Sidebar: React.FC<SidebarProps> = ({ cvData }) => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("resumen");
  const [isUpdating, setIsUpdating] = useState(false);

  const sections = [
    {
      id: "resumen",
      name: "Resumen del CV",
      description: "Vista general de todos los elementos",
    },
    {
      id: "skills",
      name: "Habilidades",
      description: "Habilidades técnicas",
    },
    {
      id: "competences",
      name: "Competencias",
      description: "Competencias profesionales",
    },
    {
      id: "softSkills",
      name: "Habilidades Blandas",
      description: "Habilidades interpersonales",
    },
    {
      id: "experiences",
      name: "Experiencias",
      description: "Experiencia laboral",
    },
    {
      id: "education",
      name: "Formación",
      description: "Educación y títulos",
    },
    {
      id: "certifications",
      name: "Certificaciones",
      description: "Certificados y logros",
    },
    {
      id: "achievements",
      name: "Logros y Proyectos",
      description: "Proyectos destacados",
    },
    {
      id: "references",
      name: "Referencias",
      description: "Referencias profesionales",
    },
    {
      id: "languages",
      name: "Idiomas",
      description: "Idiomas y niveles",
    },
  ];

  // Función helper para manejar actualizaciones
  const handleUpdate = async (
    updateFn: () => Promise<{ success: boolean; error?: string }>
  ) => {
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      await updateFn();
      await forceRevalidation();
      router.refresh();
      setTimeout(() => {
        setIsUpdating(false);
      }, 500);
    } catch (error) {
      console.error("Error updating:", error);
      setIsUpdating(false);
      window.location.reload();
    }
  };

  // Handlers para toggle de elementos
  const handleToggleSkill = async (skillId: string) => {
    await handleUpdate(() => toggleSkill(skillId));
  };

  const handleToggleCompetence = async (competenceId: string) => {
    await handleUpdate(() => toggleCompetence(competenceId));
  };

  const handleToggleExperience = async (experienceId: string) => {
    await handleUpdate(() => toggleExperience(experienceId));
  };

  const handleToggleEducation = async (educationId: string) => {
    await handleUpdate(() => toggleEducation(educationId));
  };

  const handleToggleSoftSkill = async (softSkillId: string) => {
    await handleUpdate(() => toggleSoftSkill(softSkillId));
  };

  const handleToggleCertification = async (certificationId: string) => {
    await handleUpdate(() => toggleCertification(certificationId));
  };

  const handleToggleAchievement = async (achievementId: string) => {
    await handleUpdate(() => toggleAchievement(achievementId));
  };

  const handleToggleReference = async (referenceId: string) => {
    await handleUpdate(() => toggleReference(referenceId));
  };

  // Encontrar descripción de la sección actual
  const currentSection = sections.find((s) => s.id === activeSection);

  return (
    <div className="w-80 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-r border-gray-200/50 dark:border-gray-700/50 h-screen overflow-hidden flex flex-col shadow-xl">
      {/* Header */}
      <SidebarHeader
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        currentSectionDescription={currentSection?.description}
        isUpdating={isUpdating}
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 relative z-[1210]">
        <SectionRenderer
          activeSection={activeSection}
          cvData={cvData}
          onToggleSkill={handleToggleSkill}
          onToggleCompetence={handleToggleCompetence}
          onToggleSoftSkill={handleToggleSoftSkill}
          onToggleExperience={handleToggleExperience}
          onToggleEducation={handleToggleEducation}
          onToggleCertification={handleToggleCertification}
          onToggleAchievement={handleToggleAchievement}
          onToggleReference={handleToggleReference}
        />
      </div>

      {/* Custom Scrollbar Styles */}
      <SidebarCustomScrollbar />
    </div>
  );
};
