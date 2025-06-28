"use client";

// src/components/layout/Sidebar/Sidebar.tsx

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
  isMobile?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  cvData,
  isMobile: _isMobile = false,
  onClose,
}) => {
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
    <div className="sidebar-container">
      {/* Header */}
      <SidebarHeader
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        currentSectionDescription={currentSection?.description}
        isUpdating={isUpdating}
        onClose={onClose}
        isMobile={_isMobile}
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
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

      {/* Estilos CSS optimizados */}
      <style jsx>{`
        .sidebar-container {
          --sidebar-bg: #ffffff;
          --sidebar-border: #e5e7eb;
          --sidebar-text: #374151;
          --sidebar-shadow: rgba(0, 0, 0, 0.1);
        }

        :global(.dark) .sidebar-container {
          --sidebar-bg: #1f2937;
          --sidebar-border: #374151;
          --sidebar-text: #f9fafb;
          --sidebar-shadow: rgba(0, 0, 0, 0.3);
        }

        .sidebar-container {
          width: 320px;
          background: var(--sidebar-bg);
          border-right: 1px solid var(--sidebar-border);
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 4px 0 20px var(--sidebar-shadow);
          position: relative;
          z-index: 1100;
        }

        .sidebar-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            var(--sidebar-bg) 0%,
            var(--sidebar-bg) 100%
          );
          z-index: -1;
        }

        .close-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid transparent;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          position: relative;
          overflow: hidden;
        }

        .close-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 50%;
        }

        .close-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .close-button:hover::before {
          opacity: 1;
        }

        .close-button:active {
          transform: scale(0.95);
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.5);
        }

        .close-button svg {
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
        }

        :global(.dark) .close-button {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
        }

        :global(.dark) .close-button::before {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }

        :global(.dark) .close-button:hover {
          box-shadow: 0 6px 20px rgba(220, 38, 38, 0.5);
        }
      `}</style>
    </div>
  );
};
