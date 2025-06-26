"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PersonalInfoFormPrisma } from "@/components/forms/PersonalInfoFormPrisma";
import { saveCurrentCVAs, forceRevalidation } from "@/lib/actions/cv-actions";
import {
  LanguagesSection,
  SkillCategoriesSection,
  SkillsSection,
  ExperiencesSection,
  EducationSection,
  CertificationsSection,
  AchievementsSection,
  ReferencesSection,
  CompetencesSection,
  SoftSkillsSection,
  ProfessionalProfileSection,
} from "./components";
import { CVData } from "@/types/cv";

interface CVEditorPrismaProps {
  initialData: CVData;
  currentCVName?: string | null;
}

export const CVEditorPrisma: React.FC<CVEditorPrismaProps> = ({
  initialData,
  currentCVName,
}) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  // Función helper para manejar actualizaciones (igual que en Sidebar)
  const handleUpdate = async (
    updateFn: () => Promise<{ success: boolean; error?: string }>
  ): Promise<boolean> => {
    if (isUpdating) return false; // Prevenir múltiples actualizaciones simultáneas

    setIsUpdating(true);
    try {
      const result = await updateFn();
      if (result.success) {
        // Forzar revalidación y refresh suave
        await forceRevalidation();
        router.refresh();

        // Pequeño delay para permitir que los cambios se propaguen
        setTimeout(() => {
          setIsUpdating(false);
        }, 500);

        return true;
      } else {
        setIsUpdating(false);
        return false;
      }
    } catch (error) {
      console.error("Error updating:", error);
      setIsUpdating(false);
      // En caso de error, hacer refresh completo como fallback
      window.location.reload();
      return false;
    }
  };

  const handleSaveCV = async () => {
    const name = prompt("Nombre del CV:");
    if (name) {
      try {
        await saveCurrentCVAs(name);
        alert("CV guardado exitosamente");
      } catch (error) {
        console.error("Error saving CV:", error);
        alert("Error al guardar CV");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Editor de CV
          </h1>
          {isUpdating && (
            <div className="flex items-center text-blue-600 dark:text-blue-400">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
              <span className="text-sm font-medium">Actualizando...</span>
            </div>
          )}
        </div>
        {currentCVName && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3 mb-3">
            <p className="text-blue-800 dark:text-blue-200">
              <span className="font-semibold">CV Activo:</span> {currentCVName}
            </p>
          </div>
        )}
      </div>

      <div className="text-center">
        <Button
          onClick={handleSaveCV}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          💾 Guardar CV como nueva versión
        </Button>
      </div>

      {/* Información Personal */}
      <PersonalInfoFormPrisma initialData={initialData.personalInfo} />

      {/* Perfil Profesional */}
      <ProfessionalProfileSection
        initialAboutMe={initialData.aboutMe}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
      />

      {/* Idiomas */}
      <LanguagesSection
        languages={initialData.languages}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
      />

      {/* Gestión de Categorías de Habilidades */}
      <SkillCategoriesSection
        skillCategories={initialData.skillCategories}
        skills={initialData.skills}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
      />

      {/* Habilidades por Categoría */}
      <SkillsSection
        skills={initialData.skills}
        skillCategories={initialData.skillCategories}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
      />

      {/* Competences */}
      <CompetencesSection
        competences={initialData.competences}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
      />

      {/* Habilidades Blandas */}
      <SoftSkillsSection
        softSkills={initialData.softSkills}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
      />

      {/* Experiencias */}
      <ExperiencesSection
        experiences={initialData.experiences}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
      />

      {/* Formación Académica */}
      <EducationSection
        education={initialData.education}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
      />

      {/* Certificaciones */}
      <CertificationsSection
        certifications={initialData.certifications}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
      />

      {/* Logros y Proyectos */}
      <AchievementsSection
        achievements={initialData.achievements}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
      />

      {/* Referencias Profesionales */}
      <ReferencesSection
        references={initialData.references}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
      />

      {/* Guardar CV */}
      <Card>
        <div className="text-center">
          <Button
            onClick={handleSaveCV}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            💾 Guardar CV como nueva versión
          </Button>
        </div>
      </Card>
    </div>
  );
};
