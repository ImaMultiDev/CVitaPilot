"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";
import { PersonalInfoFormPrisma } from "@/components/forms/PersonalInfoFormPrisma";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";
import {
  saveCurrentCVAs,
  forceRevalidation,
  updateAllOtherInformation,
} from "@/lib/actions/cv-actions";
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
  OtherInformationSection,
} from "./components";
import { CVData } from "@/types/cv";
import { TutorialHighlight } from "@/components/TutorialOverlay";
import { useTutorial } from "@/contexts/TutorialContext";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { completeStepAction } = useTutorial();

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Cerrar sidebar automáticamente cuando la pantalla se hace más grande
  // y prevenir fallos al cambiar de vista
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        // xl breakpoint
        setIsSidebarOpen(false);
      }
    };

    const handleRouteChange = () => {
      // Cerrar sidebar al cambiar de ruta para evitar conflictos
      setIsSidebarOpen(false);
    };

    // Escuchar cambios de tamaño de ventana
    window.addEventListener("resize", handleResize);

    // Escuchar cambios de ruta (popstate para navegación del navegador)
    window.addEventListener("popstate", handleRouteChange);

    // Cerrar sidebar al hacer clic fuera del área del sidebar
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        isSidebarOpen &&
        !target.closest(".sidebar-container") &&
        !target.closest("button[aria-label*='panel de personalización']")
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("popstate", handleRouteChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleTutorialOpenSidebar = () => {
      setIsSidebarOpen(true);
    };
    window.addEventListener("tutorial-open-sidebar", handleTutorialOpenSidebar);
    return () => {
      window.removeEventListener(
        "tutorial-open-sidebar",
        handleTutorialOpenSidebar
      );
    };
  }, []);

  return (
    <div className="relative">
      {/* Sidebar Desktop - Solo visible en xl+ (1280px+) */}
      <div className="hidden fixed left-0 top-16 h-[calc(100vh-4rem)] z-[1100]">
        <Sidebar cvData={initialData} />
      </div>

      {/* Sidebar Mobile/Tablet - Overlay deslizante */}
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-[1000] transition-opacity duration-300"
            onClick={closeSidebar}
          />

          {/* Sidebar Panel */}
          <div className="fixed left-0 top-0 h-full w-72 md:w-80 z-[1100] transform transition-transform duration-300 ease-out animate-in slide-in-from-left">
            <div className="h-full pt-16">
              <Sidebar
                cvData={initialData}
                isMobile={true}
                onClose={closeSidebar}
              />
            </div>
          </div>
        </>
      )}

      {/* Botón flotante para abrir sidebar en mobile/tablet */}
      <TutorialHighlight elementId="sidebar-toggle">
        <button
          onClick={() => {
            toggleSidebar();
            completeStepAction();
          }}
          className={`fixed top-20 left-4 z-[60] p-2 md:p-3 text-white justify-center items-center flex rounded-full border-2 transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm ${
            isSidebarOpen
              ? "opacity-0 pointer-events-none"
              : "border-white/30 dark:border-white/20 shadow-xl hover:shadow-2xl hover:border-white/50 dark:hover:border-white/40 ring-4 ring-indigo-500/20 hover:ring-indigo-500/40 animate-pulse hover:animate-none"
          }`}
          aria-label="Abrir panel de personalización"
          style={{
            boxShadow:
              "0 10px 25px rgba(79, 70, 229, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            background:
              "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          }}
        >
          <ConfiguredIcon name="menu" size={20} className="text-white" />
        </button>
      </TutorialHighlight>

      {/* Contenido principal */}
      <div className=" max-w-6xl mx-auto p-4 lg:p-6 pt-4 lg:pt-6 space-y-6 lg:space-y-8">
        <div className="text-center mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-4 mb-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Editor de CV
            </h1>
            {isUpdating && (
              <div className="flex items-center text-blue-600 dark:text-blue-400">
                <div className="animate-spin rounded-full h-4 lg:h-5 w-4 lg:w-5 border-b-2 border-blue-600 mr-2"></div>
                <span className="text-xs lg:text-sm font-medium">
                  Actualizando...
                </span>
              </div>
            )}
          </div>
          {currentCVName && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3 mb-3">
              <p className="text-blue-800 dark:text-blue-200">
                <span className="font-semibold">CV Activo:</span>{" "}
                {currentCVName}
              </p>
            </div>
          )}
        </div>

        <div className="text-center">
          <Button
            onClick={handleSaveCV}
            className="bg-green-600 hover:bg-green-700 text-white text-sm lg:text-base px-4 lg:px-6"
          >
            <span className="inline-flex items-center gap-2">
              <ConfiguredIcon name="save" size={20} className="text-white" />
              Guardar CV
            </span>
          </Button>
        </div>

        {/* Información Personal - Z-index especial para dropdowns */}
        <div className="relative" style={{ zIndex: 100 }}>
          <PersonalInfoFormPrisma initialData={initialData.personalInfo} />
        </div>

        {/* Perfil Profesional */}
        <ProfessionalProfileSection
          initialAboutMe={initialData.aboutMe}
          onUpdate={handleUpdate}
          isUpdating={isUpdating}
        />

        {/* Idiomas - Z-index especial para dropdowns */}
        <div className="relative" style={{ zIndex: 99 }}>
          <LanguagesSection
            languages={initialData.languages}
            onUpdate={handleUpdate}
            isUpdating={isUpdating}
          />
        </div>

        {/* Gestión de Categorías de Habilidades */}
        <SkillCategoriesSection
          skillCategories={initialData.skillCategories}
          skills={initialData.skills}
          onUpdate={handleUpdate}
          isUpdating={isUpdating}
        />

        {/* Habilidades por Categoría - Z-index especial para dropdowns */}
        <div className="relative" style={{ zIndex: 98 }}>
          <SkillsSection
            skills={initialData.skills}
            skillCategories={initialData.skillCategories}
            onUpdate={handleUpdate}
            isUpdating={isUpdating}
          />
        </div>

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

        {/* Experiencias - Z-index especial para dropdowns */}
        <div className="relative" style={{ zIndex: 97 }}>
          <ExperiencesSection
            experiences={initialData.experiences}
            onUpdate={handleUpdate}
            isUpdating={isUpdating}
          />
        </div>

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

        {/* Logros y Proyectos - Z-index especial para dropdowns */}
        <div className="relative" style={{ zIndex: 96 }}>
          <AchievementsSection
            achievements={initialData.achievements}
            onUpdate={handleUpdate}
            isUpdating={isUpdating}
          />
        </div>

        {/* Referencias Profesionales */}
        <ReferencesSection
          references={initialData.references}
          onUpdate={handleUpdate}
          isUpdating={isUpdating}
        />

        {/* Otra Información */}
        <OtherInformationSection
          otherInformation={initialData.otherInformation}
          onChange={(otherInformation) => {
            handleUpdate(() => updateAllOtherInformation(otherInformation));
          }}
        />

        {/* Guardar CV */}
        <Card className="border-none">
          <div className="text-center">
            <Button
              onClick={handleSaveCV}
              className="bg-green-600 hover:bg-green-700 text-white text-sm lg:text-base px-4 lg:px-6"
            >
              <span className="inline-flex items-center gap-2">
                <ConfiguredIcon name="save" size={20} className="text-white" />
                Guardar CV
              </span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
