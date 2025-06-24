"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { Toggle } from "@/components/ui/Toggle";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { PersonalInfoFormPrisma } from "@/components/forms/PersonalInfoFormPrisma";
import {
  updateAboutMe,
  addCompetence,
  addSkill,
  addLanguage,
  addSoftSkill,
  addExperience,
  addEducation,
  addCertification,
  addAchievement,
  addReference,
  deleteSkill,
  deleteCompetence,
  deleteLanguage,
  deleteSoftSkill,
  deleteExperience,
  deleteEducation,
  deleteCertification,
  deleteAchievement,
  deleteReference,
  toggleSkill,
  toggleCompetence,
  toggleSoftSkill,
  toggleExperience,
  toggleEducation,
  toggleCertification,
  toggleAchievement,
  toggleReference,
  saveCurrentCVAs,
  forceRevalidation,
  addSkillCategory,
  deleteSkillCategory,
} from "@/lib/actions/cv-actions";
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
  const [aboutMeText, setAboutMeText] = useState(initialData.aboutMe);
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

  // States for new items
  const [newCompetence, setNewCompetence] = useState("");
  const [newSoftSkill, setNewSoftSkill] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSkill, setNewSkill] = useState({
    name: "",
    categoryId: initialData.skillCategories[0]?.id || "",
  });
  const [newLanguage, setNewLanguage] = useState({
    name: "",
    level: "A1" as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Nativo",
  });
  const [newExperience, setNewExperience] = useState<{
    position: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    contractType: string;
    workSchedule: string;
    workModality: string;
    description: string;
    technologies: string;
  }>({
    position: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    contractType: "Contrato indefinido",
    workSchedule: "Jornada completa",
    workModality: "Presencial",
    description: "",
    technologies: "",
  });
  const [newEducation, setNewEducation] = useState({
    title: "",
    institution: "",
    location: "",
    startYear: "",
    endYear: "",
  });
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    date: "",
    expiryDate: "",
    credentialId: "",
    url: "",
  });
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    type: "project" as "achievement" | "project",
    description: "",
    date: "",
    company: "",
    technologies: "",
    metrics: "",
    url: "",
  });
  const [newReference, setNewReference] = useState({
    name: "",
    position: "",
    company: "",
    relationship: "",
    phone: "",
    email: "",
    yearsWorking: "",
    selected: true,
  });

  const handleAboutMeUpdate = async () => {
    await handleUpdate(() => updateAboutMe(aboutMeText));
  };

  const handleAddCompetence = async () => {
    if (newCompetence.trim()) {
      const success = await handleUpdate(() =>
        addCompetence({
          name: newCompetence.trim(),
          selected: true,
        })
      );
      if (success) {
        setNewCompetence("");
      }
    }
  };

  const handleAddSoftSkill = async () => {
    if (newSoftSkill.trim()) {
      const success = await handleUpdate(() =>
        addSoftSkill({
          name: newSoftSkill.trim(),
          selected: true,
        })
      );
      if (success) {
        setNewSoftSkill("");
      }
    }
  };

  const handleAddSkill = async () => {
    if (newSkill.name.trim() && newSkill.categoryId) {
      const success = await handleUpdate(() =>
        addSkill({
          name: newSkill.name.trim(),
          categoryId: newSkill.categoryId,
          selected: true,
        })
      );
      if (success) {
        setNewSkill({
          name: "",
          categoryId: initialData.skillCategories[0]?.id || "",
        });
      }
    }
  };

  const handleAddCategory = async () => {
    if (newCategoryName.trim()) {
      const success = await handleUpdate(() =>
        addSkillCategory({
          name: newCategoryName.trim(),
        })
      );
      if (success) {
        setNewCategoryName("");
      }
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    // Encontrar la categoría y contar las habilidades asociadas
    const category = initialData.skillCategories.find(
      (cat) => cat.id === categoryId
    );
    const skillsInCategory = initialData.skills.filter(
      (skill) => skill.categoryId === categoryId
    );

    if (!category) return;

    let confirmMessage = "";

    if (skillsInCategory.length === 0) {
      // Categoría vacía - mensaje simple
      confirmMessage = `¿Estás seguro de que quieres eliminar la categoría "${category.name}"?`;
    } else {
      // Categoría con habilidades - mensaje detallado
      const skillCount = skillsInCategory.length;
      const skillNames = skillsInCategory.map((skill) => skill.name).join(", ");

      confirmMessage = `⚠️ ATENCIÓN: La categoría "${
        category.name
      }" contiene ${skillCount} habilidad${skillCount > 1 ? "es" : ""}:

${skillNames}

¿Estás seguro de que quieres eliminar la categoría "${
        category.name
      }" y TODAS sus habilidades asociadas?

Esta acción no se puede deshacer.`;
    }

    if (confirm(confirmMessage)) {
      await handleUpdate(() => deleteSkillCategory(categoryId));
    }
  };

  const handleAddLanguage = async () => {
    if (newLanguage.name.trim()) {
      const success = await handleUpdate(() =>
        addLanguage({
          name: newLanguage.name.trim(),
          level: newLanguage.level,
        })
      );
      if (success) {
        setNewLanguage({ name: "", level: "A1" });
      }
    }
  };

  const handleAddExperience = async () => {
    if (newExperience.position.trim() && newExperience.company.trim()) {
      const success = await handleUpdate(() =>
        addExperience({
          ...newExperience,
          position: newExperience.position.trim(),
          company: newExperience.company.trim(),
          location: newExperience.location.trim(),
          description: newExperience.description.trim(),
          technologies: newExperience.technologies
            .trim()
            .split(",")
            .map((tech) => tech.trim())
            .filter((tech) => tech),
          selected: true,
        })
      );
      if (success) {
        setNewExperience({
          position: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          contractType: "Contrato indefinido",
          workSchedule: "Jornada completa",
          workModality: "Presencial",
          description: "",
          technologies: "",
        });
      }
    }
  };

  const handleAddEducation = async () => {
    if (newEducation.title.trim() && newEducation.institution.trim()) {
      const success = await handleUpdate(() =>
        addEducation({
          ...newEducation,
          title: newEducation.title.trim(),
          institution: newEducation.institution.trim(),
          location: newEducation.location.trim(),
          selected: true,
        })
      );
      if (success) {
        setNewEducation({
          title: "",
          institution: "",
          location: "",
          startYear: "",
          endYear: "",
        });
      }
    }
  };

  const handleAddCertification = async () => {
    if (newCertification.name.trim() && newCertification.issuer.trim()) {
      const success = await handleUpdate(() =>
        addCertification({
          ...newCertification,
          name: newCertification.name.trim(),
          issuer: newCertification.issuer.trim(),
          date: newCertification.date,
          expiryDate: newCertification.expiryDate || undefined,
          credentialId: newCertification.credentialId.trim() || undefined,
          url: newCertification.url.trim() || undefined,
          selected: true,
        })
      );
      if (success) {
        setNewCertification({
          name: "",
          issuer: "",
          date: "",
          expiryDate: "",
          credentialId: "",
          url: "",
        });
      }
    }
  };

  const handleAddAchievement = async () => {
    if (newAchievement.title.trim() && newAchievement.description.trim()) {
      const success = await handleUpdate(() =>
        addAchievement({
          ...newAchievement,
          title: newAchievement.title.trim(),
          description: newAchievement.description.trim(),
          company: newAchievement.company.trim() || undefined,
          technologies: newAchievement.technologies
            .trim()
            .split(",")
            .map((tech) => tech.trim())
            .filter((tech) => tech),
          metrics: newAchievement.metrics.trim() || undefined,
          url: newAchievement.url.trim() || undefined,
          selected: true,
        })
      );
      if (success) {
        setNewAchievement({
          title: "",
          type: "project" as "achievement" | "project",
          description: "",
          date: "",
          company: "",
          technologies: "",
          metrics: "",
          url: "",
        });
      }
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta habilidad?")) {
      await handleUpdate(() => deleteSkill(skillId));
    }
  };

  const handleDeleteCompetence = async (competenceId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta competencia?")) {
      await handleUpdate(() => deleteCompetence(competenceId));
    }
  };

  const handleDeleteSoftSkill = async (softSkillId: string) => {
    if (
      confirm("¿Estás seguro de que quieres eliminar esta habilidad blanda?")
    ) {
      await handleUpdate(() => deleteSoftSkill(softSkillId));
    }
  };

  const handleDeleteLanguage = async (languageId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este idioma?")) {
      await handleUpdate(() => deleteLanguage(languageId));
    }
  };

  const handleDeleteExperience = async (experienceId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta experiencia?")) {
      await handleUpdate(() => deleteExperience(experienceId));
    }
  };

  const handleDeleteEducation = async (educationId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta formación?")) {
      await handleUpdate(() => deleteEducation(educationId));
    }
  };

  const handleDeleteCertification = async (certificationId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta certificación?")) {
      await handleUpdate(() => deleteCertification(certificationId));
    }
  };

  const handleDeleteAchievement = async (achievementId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este logro/proyecto?")) {
      await handleUpdate(() => deleteAchievement(achievementId));
    }
  };

  const handleToggleSkill = async (skillId: string) => {
    await handleUpdate(() => toggleSkill(skillId));
  };

  const handleToggleCompetence = async (competenceId: string) => {
    await handleUpdate(() => toggleCompetence(competenceId));
  };

  const handleToggleSoftSkill = async (softSkillId: string) => {
    await handleUpdate(() => toggleSoftSkill(softSkillId));
  };

  const handleToggleExperience = async (experienceId: string) => {
    await handleUpdate(() => toggleExperience(experienceId));
  };

  const handleToggleEducation = async (educationId: string) => {
    await handleUpdate(() => toggleEducation(educationId));
  };

  const handleToggleCertification = async (certificationId: string) => {
    await handleUpdate(() => toggleCertification(certificationId));
  };

  const handleToggleAchievement = async (achievementId: string) => {
    await handleUpdate(() => toggleAchievement(achievementId));
  };

  const handleAddReference = async () => {
    if (newReference.name && newReference.position && newReference.company) {
      const success = await handleUpdate(() => addReference(newReference));
      if (success) {
        setNewReference({
          name: "",
          position: "",
          company: "",
          relationship: "",
          phone: "",
          email: "",
          yearsWorking: "",
          selected: true,
        });
      }
    }
  };

  const handleDeleteReference = async (referenceId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta referencia?")) {
      await handleUpdate(() => deleteReference(referenceId));
    }
  };

  const handleToggleReference = async (referenceId: string) => {
    await handleUpdate(() => toggleReference(referenceId));
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

  // Group skills by category using categoryId
  const skillsByCategory = initialData.skills.reduce((acc, skill) => {
    const categoryId = skill.categoryId;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(skill);
    return acc;
  }, {} as Record<string, typeof initialData.skills>);

  // Create category options for the select
  const categoryOptions = initialData.skillCategories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  const languageLevels = [
    { value: "A1", label: "A1 - Básico" },
    { value: "A2", label: "A2 - Básico" },
    { value: "B1", label: "B1 - Intermedio" },
    { value: "B2", label: "B2 - Intermedio" },
    { value: "C1", label: "C1 - Avanzado" },
    { value: "C2", label: "C2 - Avanzado" },
    { value: "Nativo", label: "Nativo" },
  ];

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
          />
          <Button onClick={handleAboutMeUpdate} size="sm">
            Actualizar descripción
          </Button>
        </div>
      </Card>

      {/* Idiomas */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Idiomas
        </h3>

        {/* Add new language */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Añadir nuevo idioma
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input
              label="Nombre del idioma"
              value={newLanguage.name}
              onChange={(e) =>
                setNewLanguage((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Ej: Inglés, Francés..."
            />
            <Select
              label="Nivel"
              value={newLanguage.level}
              onChange={(e) =>
                setNewLanguage((prev) => ({
                  ...prev,
                  level: e.target.value as
                    | "A1"
                    | "A2"
                    | "B1"
                    | "B2"
                    | "C1"
                    | "C2"
                    | "Nativo",
                }))
              }
              options={languageLevels}
            />
            <div className="flex items-end">
              <Button onClick={handleAddLanguage} size="sm" className="w-full">
                ➕ Añadir idioma
              </Button>
            </div>
          </div>
        </div>

        {/* Idiomas existentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {initialData.languages.map((language) => (
            <div
              key={language.id}
              className="flex items-center justify-between border rounded-lg p-3"
            >
              <div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {language.name}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  ({language.level})
                </span>
              </div>
              <Button
                onClick={() => handleDeleteLanguage(language.id)}
                size="sm"
                variant="secondary"
                className="text-red-600 hover:text-red-700"
              >
                🗑️
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Gestión de Categorías de Habilidades */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🗂️ Categorías de Habilidades
        </h3>

        {/* Add new category */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">
            ➕ Crear nueva categoría
          </h4>
          <div className="flex space-x-2">
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Ej: Machine Learning, DevOps, Diseño..."
              className="flex-1"
            />
            <Button
              onClick={handleAddCategory}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              ➕ Crear Categoría
            </Button>
          </div>
        </div>

        {/* Existing categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {initialData.skillCategories.map((category) => {
            const skillCount = initialData.skills.filter(
              (skill) => skill.categoryId === category.id
            ).length;
            return (
              <div
                key={category.id}
                className="flex items-center justify-between border border-gray-200 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    📁 {category.name}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      skillCount > 0
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {skillCount} skill{skillCount !== 1 ? "s" : ""}
                  </span>
                </div>
                <Button
                  onClick={() => handleDeleteCategory(category.id)}
                  size="sm"
                  variant="secondary"
                  className="text-red-600 hover:text-red-700 p-1"
                  disabled={isUpdating}
                  title={
                    skillCount > 0
                      ? `Eliminar categoría y ${skillCount} habilidad${
                          skillCount > 1 ? "es" : ""
                        }`
                      : "Eliminar categoría vacía"
                  }
                >
                  🗑️
                </Button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Habilidades por Categoría */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🛠️ Habilidades Técnicas
        </h3>

        {/* Add new skill */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Añadir nueva habilidad
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input
              label="Nombre de la habilidad"
              value={newSkill.name}
              onChange={(e) =>
                setNewSkill((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Ej: React, Python, PostgreSQL..."
            />
            <Select
              label="Categoría"
              value={newSkill.categoryId}
              onChange={(e) =>
                setNewSkill((prev) => ({
                  ...prev,
                  categoryId: e.target.value,
                }))
              }
              options={categoryOptions}
            />
            <div className="flex items-end">
              <Button onClick={handleAddSkill} size="sm" className="w-full">
                ➕ Añadir habilidad
              </Button>
            </div>
          </div>
        </div>

        {/* Habilidades existentes por categoría */}
        {Object.entries(skillsByCategory).map(([categoryId, skills]) => (
          <div key={categoryId} className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3">
              {initialData.skillCategories.find((cat) => cat.id === categoryId)
                ?.name || categoryId}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between border rounded-lg p-2"
                >
                  <span className="text-sm text-gray-900 dark:text-white">
                    {skill.name}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Toggle
                      checked={skill.selected}
                      onChange={() => handleToggleSkill(skill.id)}
                      disabled={isUpdating}
                    />
                    <Button
                      onClick={() => handleDeleteSkill(skill.id)}
                      size="sm"
                      variant="secondary"
                      className="text-red-600 hover:text-red-700 p-1"
                      disabled={isUpdating}
                    >
                      🗑️
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Card>

      {/* Competences */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Competencias Profesionales
        </h3>

        {/* Add new competence */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Añadir nueva competencia
          </h4>
          <div className="flex space-x-2">
            <Input
              value={newCompetence}
              onChange={(e) => setNewCompetence(e.target.value)}
              placeholder="Nueva competencia..."
              className="flex-1"
            />
            <Button onClick={handleAddCompetence} size="sm">
              ➕ Añadir
            </Button>
          </div>
        </div>

        {/* Existing competences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {initialData.competences.map((competence) => (
            <div
              key={competence.id}
              className="flex items-center justify-between border rounded-lg p-2"
            >
              <span className="text-sm text-gray-900 dark:text-white">
                {competence.name}
              </span>
              <div className="flex items-center space-x-1">
                <Toggle
                  checked={competence.selected}
                  onChange={() => handleToggleCompetence(competence.id)}
                  disabled={isUpdating}
                />
                <Button
                  onClick={() => handleDeleteCompetence(competence.id)}
                  size="sm"
                  variant="secondary"
                  className="text-red-600 hover:text-red-700 p-1"
                  disabled={isUpdating}
                >
                  🗑️
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Habilidades Blandas */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Habilidades Blandas
        </h3>

        {/* Add new soft skill */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Añadir nueva habilidad blanda
          </h4>
          <div className="flex space-x-2">
            <Input
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              placeholder="Ej: Liderazgo, Creatividad, Negociación..."
              className="flex-1"
            />
            <Button onClick={handleAddSoftSkill} size="sm">
              ➕ Añadir
            </Button>
          </div>
        </div>

        {/* Existing soft skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {initialData.softSkills.map((softSkill) => (
            <div
              key={softSkill.id}
              className="flex items-center justify-between border rounded-lg p-2"
            >
              <span className="text-sm text-gray-900 dark:text-white">
                {softSkill.name}
              </span>
              <div className="flex items-center space-x-1">
                <Toggle
                  checked={softSkill.selected}
                  onChange={() => handleToggleSoftSkill(softSkill.id)}
                  disabled={isUpdating}
                />
                <Button
                  onClick={() => handleDeleteSoftSkill(softSkill.id)}
                  size="sm"
                  variant="secondary"
                  className="text-red-600 hover:text-red-700 p-1"
                  disabled={isUpdating}
                >
                  🗑️
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Experiencias */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Experiencia Laboral
        </h3>

        {/* Añadir nueva experiencia */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Añadir nueva experiencia
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <Input
              label="Puesto"
              value={newExperience.position}
              onChange={(e) =>
                setNewExperience((prev) => ({
                  ...prev,
                  position: e.target.value,
                }))
              }
              placeholder="Ej: Desarrollador Frontend"
            />
            <Input
              label="Empresa"
              value={newExperience.company}
              onChange={(e) =>
                setNewExperience((prev) => ({
                  ...prev,
                  company: e.target.value,
                }))
              }
              placeholder="Ej: Tech Company S.L."
            />
            <Input
              label="Ubicación"
              value={newExperience.location}
              onChange={(e) =>
                setNewExperience((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
              placeholder="Ej: Madrid, España"
            />
            <Input
              label="Fecha inicio"
              type="date"
              value={newExperience.startDate}
              onChange={(e) =>
                setNewExperience((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
            />
            <Input
              label="Fecha fin (opcional)"
              type="date"
              value={newExperience.endDate}
              onChange={(e) =>
                setNewExperience((prev) => ({
                  ...prev,
                  endDate: e.target.value,
                }))
              }
            />
            <Select
              label="Tipo de contrato"
              value={newExperience.contractType}
              onChange={(e) =>
                setNewExperience((prev) => ({
                  ...prev,
                  contractType: e.target.value,
                }))
              }
              options={[
                { value: "Contrato indefinido", label: "Contrato indefinido" },
                { value: "Contrato temporal", label: "Contrato temporal" },
                {
                  value: "Contrato en prácticas",
                  label: "Contrato en prácticas",
                },
                { value: "Freelance", label: "Freelance" },
                { value: "Autónomo", label: "Autónomo" },
              ]}
            />
            <Select
              label="Tipo de jornada"
              value={newExperience.workSchedule}
              onChange={(e) =>
                setNewExperience((prev) => ({
                  ...prev,
                  workSchedule: e.target.value,
                }))
              }
              options={[
                { value: "Jornada completa", label: "Jornada completa" },
                { value: "Jornada parcial", label: "Jornada parcial" },
                { value: "Media jornada", label: "Media jornada" },
                { value: "Jornada flexible", label: "Jornada flexible" },
              ]}
            />
            <Select
              label="Modalidad de trabajo"
              value={newExperience.workModality}
              onChange={(e) =>
                setNewExperience((prev) => ({
                  ...prev,
                  workModality: e.target.value,
                }))
              }
              options={[
                { value: "Presencial", label: "Presencial" },
                { value: "Remoto", label: "Remoto" },
                { value: "Híbrido", label: "Híbrido" },
                { value: "Teletrabajo", label: "Teletrabajo" },
              ]}
            />
            <Input
              label="Tecnologías"
              value={newExperience.technologies}
              onChange={(e) =>
                setNewExperience((prev) => ({
                  ...prev,
                  technologies: e.target.value,
                }))
              }
              placeholder="Ej: React, Node.js, PostgreSQL"
            />
          </div>
          <Textarea
            label="Descripción"
            value={newExperience.description}
            onChange={(e) =>
              setNewExperience((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Describe tus responsabilidades y logros..."
            rows={3}
          />
          <Button onClick={handleAddExperience} size="sm" className="mt-3">
            ➕ Añadir experiencia
          </Button>
        </div>

        {/* Experiencias existentes */}
        <div className="space-y-3">
          {initialData.experiences.map((experience) => (
            <div
              key={experience.id}
              className="border rounded-lg p-4 flex items-start justify-between"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {experience.position}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {experience.company} - {experience.location}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {experience.startDate} - {experience.endDate || "Presente"}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {experience.contractType} • {experience.workSchedule} •{" "}
                  {experience.workModality}
                </p>
                {experience.description && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    {experience.description}
                  </p>
                )}
                {experience.technologies && (
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    🔧 {experience.technologies}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Toggle
                  checked={experience.selected}
                  onChange={() => handleToggleExperience(experience.id)}
                  disabled={isUpdating}
                />
                <Button
                  onClick={() => handleDeleteExperience(experience.id)}
                  size="sm"
                  variant="secondary"
                  className="text-red-600 hover:text-red-700"
                  disabled={isUpdating}
                >
                  🗑️
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Formación Académica */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Formación Académica
        </h3>

        {/* Añadir nueva formación */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Añadir nueva formación académica
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Título del grado/master/doctorado"
              value={newEducation.title}
              onChange={(e) =>
                setNewEducation((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Ej: Técnico Superior en Desarrollo de Aplicaciones Multiplataforma"
            />
            <Input
              label="Universidad/Centro educativo"
              value={newEducation.institution}
              onChange={(e) =>
                setNewEducation((prev) => ({
                  ...prev,
                  institution: e.target.value,
                }))
              }
              placeholder="Ej: Universidad de Navarra"
            />
            <Input
              label="Ubicación"
              value={newEducation.location}
              onChange={(e) =>
                setNewEducation((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
              placeholder="Ej: Madrid, España"
            />
            <Input
              label="Año inicio"
              value={newEducation.startYear}
              onChange={(e) =>
                setNewEducation((prev) => ({
                  ...prev,
                  startYear: e.target.value,
                }))
              }
              placeholder="2020"
            />
            <Input
              label="Año fin"
              value={newEducation.endYear}
              onChange={(e) =>
                setNewEducation((prev) => ({
                  ...prev,
                  endYear: e.target.value,
                }))
              }
              placeholder="2024"
            />
          </div>
          <Button onClick={handleAddEducation} size="sm" className="mt-3">
            ➕ Añadir formación académica
          </Button>
        </div>

        {/* Formación existente */}
        <div className="space-y-3">
          {initialData.education.map((education) => (
            <div
              key={education.id}
              className="border rounded-lg p-4 flex items-start justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {education.title}
                  </h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                    📚 Formación académica
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {education.institution} - {education.location}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {education.startYear} - {education.endYear}
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Toggle
                  checked={education.selected}
                  onChange={() => handleToggleEducation(education.id)}
                  disabled={isUpdating}
                />
                <Button
                  onClick={() => handleDeleteEducation(education.id)}
                  size="sm"
                  variant="secondary"
                  className="text-red-600 hover:text-red-700"
                  disabled={isUpdating}
                >
                  🗑️
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Certificaciones */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Certificaciones
        </h3>

        {/* Añadir nueva certificación */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Añadir nueva certificación
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Nombre de la certificación"
              value={newCertification.name}
              onChange={(e) =>
                setNewCertification((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="Ej: AWS Cloud Practitioner"
            />
            <Input
              label="Organización emisora"
              value={newCertification.issuer}
              onChange={(e) =>
                setNewCertification((prev) => ({
                  ...prev,
                  issuer: e.target.value,
                }))
              }
              placeholder="Ej: Amazon Web Services"
            />
            <Input
              label="Fecha de obtención"
              type="date"
              value={newCertification.date}
              onChange={(e) =>
                setNewCertification((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
            />
            <Input
              label="Fecha de expiración (opcional)"
              type="date"
              value={newCertification.expiryDate}
              onChange={(e) =>
                setNewCertification((prev) => ({
                  ...prev,
                  expiryDate: e.target.value,
                }))
              }
            />
            <Input
              label="ID del certificado (opcional)"
              value={newCertification.credentialId}
              onChange={(e) =>
                setNewCertification((prev) => ({
                  ...prev,
                  credentialId: e.target.value,
                }))
              }
              placeholder="Ej: AWS-CP-2024-123456"
            />
            <Input
              label="URL de verificación (opcional)"
              value={newCertification.url}
              onChange={(e) =>
                setNewCertification((prev) => ({
                  ...prev,
                  url: e.target.value,
                }))
              }
              placeholder="Ej: https://verify.example.com/cert123"
            />
          </div>
          <Button onClick={handleAddCertification} size="sm" className="mt-3">
            🏆 Añadir certificación
          </Button>
        </div>

        {/* Certificaciones existentes */}
        <div className="space-y-3">
          {initialData.certifications.map((certification) => (
            <div
              key={certification.id}
              className="border rounded-lg p-4 flex items-start justify-between"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  🏆 {certification.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {certification.issuer}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  📅 Obtenida: {certification.date}
                  {certification.expiryDate && (
                    <span> • Expira: {certification.expiryDate}</span>
                  )}
                </p>
                {certification.credentialId && (
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    🆔 ID: {certification.credentialId}
                  </p>
                )}
                {certification.url && (
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    🔗{" "}
                    <a
                      href={certification.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Verificar certificado
                    </a>
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Toggle
                  checked={certification.selected}
                  onChange={() => handleToggleCertification(certification.id)}
                  disabled={isUpdating}
                />
                <Button
                  onClick={() => handleDeleteCertification(certification.id)}
                  size="sm"
                  variant="secondary"
                  className="text-red-600 hover:text-red-700"
                  disabled={isUpdating}
                >
                  🗑️
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Logros y Proyectos */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🏆 Logros y Proyectos Destacados
        </h3>

        {/* Añadir nuevo logro/proyecto */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Añadir nuevo logro/proyecto
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Select
              label="Tipo"
              value={newAchievement.type}
              onChange={(e) =>
                setNewAchievement((prev) => ({
                  ...prev,
                  type: e.target.value as "achievement" | "project",
                }))
              }
              options={[
                { value: "project", label: "🚀 Proyecto" },
                { value: "achievement", label: "🏆 Logro/Reconocimiento" },
              ]}
            />
            <Input
              label="Título"
              value={newAchievement.title}
              onChange={(e) =>
                setNewAchievement((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              placeholder="Ej: Desarrollo de Sistema ERP"
            />
            <Input
              label="Fecha/Período"
              value={newAchievement.date}
              onChange={(e) =>
                setNewAchievement((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
              placeholder="Ej: 2024, 2023-2024"
            />
            <Input
              label="Empresa/Organización (opcional)"
              value={newAchievement.company}
              onChange={(e) =>
                setNewAchievement((prev) => ({
                  ...prev,
                  company: e.target.value,
                }))
              }
              placeholder="Ej: ERRIBERRI S.L."
            />
            <Input
              label="Tecnologías utilizadas"
              value={newAchievement.technologies}
              onChange={(e) =>
                setNewAchievement((prev) => ({
                  ...prev,
                  technologies: e.target.value,
                }))
              }
              placeholder="Ej: React, Node.js, PostgreSQL"
            />
            <Input
              label="Métricas de impacto (opcional)"
              value={newAchievement.metrics}
              onChange={(e) =>
                setNewAchievement((prev) => ({
                  ...prev,
                  metrics: e.target.value,
                }))
              }
              placeholder="Ej: Aumentó eficiencia en 25%"
            />
            <Input
              label="URL del proyecto (opcional)"
              value={newAchievement.url}
              onChange={(e) =>
                setNewAchievement((prev) => ({
                  ...prev,
                  url: e.target.value,
                }))
              }
              placeholder="Ej: https://github.com/usuario/proyecto"
            />
          </div>
          <Textarea
            label="Descripción"
            value={newAchievement.description}
            onChange={(e) =>
              setNewAchievement((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Describe el proyecto/logro, tu rol, tecnologías utilizadas y resultados obtenidos..."
            rows={3}
            className="mt-3"
          />
          <Button onClick={handleAddAchievement} size="sm" className="mt-3">
            🏆 Añadir logro/proyecto
          </Button>
        </div>

        {/* Logros/Proyectos existentes */}
        <div className="space-y-3">
          {initialData.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="border rounded-lg p-4 flex items-start justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    {achievement.type === "project" ? "🚀" : "🏆"}{" "}
                    {achievement.title}
                  </h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      achievement.type === "project"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {achievement.type === "project" ? "Proyecto" : "Logro"}
                  </span>
                </div>
                {achievement.company && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {achievement.company}
                  </p>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  📅 {achievement.date}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
                  {achievement.description}
                </p>
                {achievement.technologies.length > 0 && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">
                    🔧 {achievement.technologies.join(", ")}
                  </p>
                )}
                {achievement.metrics && (
                  <p className="text-xs text-green-600 dark:text-green-400 mb-1">
                    📊 {achievement.metrics}
                  </p>
                )}
                {achievement.url && (
                  <p className="text-xs text-purple-600 dark:text-purple-400">
                    🔗{" "}
                    <a
                      href={achievement.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Ver proyecto
                    </a>
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Toggle
                  checked={achievement.selected}
                  onChange={() => handleToggleAchievement(achievement.id)}
                  disabled={isUpdating}
                />
                <Button
                  onClick={() => handleDeleteAchievement(achievement.id)}
                  size="sm"
                  variant="secondary"
                  className="text-red-600 hover:text-red-700"
                  disabled={isUpdating}
                >
                  🗑️
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Referencias Profesionales */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          📋 Referencias Profesionales
        </h3>

        {/* Añadir nueva referencia */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Añadir nueva referencia
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Nombre completo"
              value={newReference.name}
              onChange={(e) =>
                setNewReference((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="Ej: Ana García López"
            />
            <Input
              label="Cargo/Posición"
              value={newReference.position}
              onChange={(e) =>
                setNewReference((prev) => ({
                  ...prev,
                  position: e.target.value,
                }))
              }
              placeholder="Ej: Directora de Tecnología"
            />
            <Input
              label="Empresa"
              value={newReference.company}
              onChange={(e) =>
                setNewReference((prev) => ({
                  ...prev,
                  company: e.target.value,
                }))
              }
              placeholder="Ej: ERRIBERRI S.L."
            />
            <Input
              label="Relación profesional"
              value={newReference.relationship}
              onChange={(e) =>
                setNewReference((prev) => ({
                  ...prev,
                  relationship: e.target.value,
                }))
              }
              placeholder="Ej: Supervisor directo, Compañero de equipo"
            />
            <Input
              label="Teléfono"
              value={newReference.phone}
              onChange={(e) =>
                setNewReference((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              placeholder="Ej: +34 600 123 456"
            />
            <Input
              label="Email"
              value={newReference.email}
              onChange={(e) =>
                setNewReference((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="Ej: ana.garcia@empresa.com"
            />
            <Input
              label="Años trabajando juntos"
              value={newReference.yearsWorking}
              onChange={(e) =>
                setNewReference((prev) => ({
                  ...prev,
                  yearsWorking: e.target.value,
                }))
              }
              placeholder="Ej: 2 años, 6 meses"
            />
          </div>
          <Button onClick={handleAddReference} size="sm" className="mt-3">
            📋 Añadir referencia
          </Button>
        </div>

        {/* Referencias existentes */}
        <div className="space-y-3">
          {initialData.references.map((reference) => (
            <div
              key={reference.id}
              className="border rounded-lg p-4 flex items-start justify-between"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {reference.name}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {reference.position} en {reference.company}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {reference.relationship}
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
                  {reference.phone && <span>📞 {reference.phone}</span>}
                  {reference.email && <span>✉️ {reference.email}</span>}
                  {reference.yearsWorking && (
                    <span>⏱️ {reference.yearsWorking}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Toggle
                  checked={reference.selected}
                  onChange={() => handleToggleReference(reference.id)}
                  disabled={isUpdating}
                />
                <Button
                  onClick={() => handleDeleteReference(reference.id)}
                  size="sm"
                  variant="secondary"
                  className="text-red-600 hover:text-red-700"
                  disabled={isUpdating}
                >
                  🗑️
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

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
