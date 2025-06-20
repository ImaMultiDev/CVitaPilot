"use client";

import { useState } from "react";
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
  const [aboutMeText, setAboutMeText] = useState(initialData.aboutMe);

  // States for new items
  const [newCompetence, setNewCompetence] = useState("");
  const [newSoftSkill, setNewSoftSkill] = useState("");
  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "language" as
      | "language"
      | "framework"
      | "tool"
      | "database"
      | "orm"
      | "ai"
      | "library",
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
    type: "formal" as "formal" | "additional",
    duration: "",
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
    try {
      await updateAboutMe(aboutMeText);
      window.location.reload(); // Recargar para ver cambios
    } catch (error) {
      console.error("Error updating about me:", error);
    }
  };

  const handleAddCompetence = async () => {
    if (newCompetence.trim()) {
      try {
        await addCompetence({
          name: newCompetence.trim(),
          selected: true,
        });
        setNewCompetence("");
        window.location.reload();
      } catch (error) {
        console.error("Error adding competence:", error);
      }
    }
  };

  const handleAddSoftSkill = async () => {
    if (newSoftSkill.trim()) {
      try {
        await addSoftSkill({
          name: newSoftSkill.trim(),
          selected: true,
        });
        setNewSoftSkill("");
        window.location.reload();
      } catch (error) {
        console.error("Error adding soft skill:", error);
      }
    }
  };

  const handleAddSkill = async () => {
    if (newSkill.name.trim()) {
      try {
        await addSkill({
          name: newSkill.name.trim(),
          category: newSkill.category,
          selected: true,
        });
        setNewSkill({ name: "", category: "language" });
        window.location.reload();
      } catch (error) {
        console.error("Error adding skill:", error);
      }
    }
  };

  const handleAddLanguage = async () => {
    if (newLanguage.name.trim()) {
      try {
        await addLanguage({
          name: newLanguage.name.trim(),
          level: newLanguage.level,
        });
        setNewLanguage({ name: "", level: "A1" });
        window.location.reload();
      } catch (error) {
        console.error("Error adding language:", error);
      }
    }
  };

  const handleAddExperience = async () => {
    if (newExperience.position.trim() && newExperience.company.trim()) {
      try {
        await addExperience({
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
        });
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
        window.location.reload();
      } catch (error) {
        console.error("Error adding experience:", error);
      }
    }
  };

  const handleAddEducation = async () => {
    if (newEducation.title.trim() && newEducation.institution.trim()) {
      try {
        await addEducation({
          ...newEducation,
          title: newEducation.title.trim(),
          institution: newEducation.institution.trim(),
          location: newEducation.location.trim(),
          duration: newEducation.duration.trim() || undefined,
          selected: true,
        });
        setNewEducation({
          title: "",
          institution: "",
          location: "",
          startYear: "",
          endYear: "",
          type: "formal" as "formal" | "additional",
          duration: "",
        });
        window.location.reload();
      } catch (error) {
        console.error("Error adding education:", error);
      }
    }
  };

  const handleAddCertification = async () => {
    if (newCertification.name.trim() && newCertification.issuer.trim()) {
      try {
        await addCertification({
          ...newCertification,
          name: newCertification.name.trim(),
          issuer: newCertification.issuer.trim(),
          date: newCertification.date,
          expiryDate: newCertification.expiryDate || undefined,
          credentialId: newCertification.credentialId.trim() || undefined,
          url: newCertification.url.trim() || undefined,
          selected: true,
        });
        setNewCertification({
          name: "",
          issuer: "",
          date: "",
          expiryDate: "",
          credentialId: "",
          url: "",
        });
        window.location.reload();
      } catch (error) {
        console.error("Error adding certification:", error);
      }
    }
  };

  const handleAddAchievement = async () => {
    if (newAchievement.title.trim() && newAchievement.description.trim()) {
      try {
        await addAchievement({
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
        });
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
        window.location.reload();
      } catch (error) {
        console.error("Error adding achievement:", error);
      }
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta habilidad?")) {
      try {
        await deleteSkill(skillId);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting skill:", error);
      }
    }
  };

  const handleDeleteCompetence = async (competenceId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta competencia?")) {
      try {
        await deleteCompetence(competenceId);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting competence:", error);
      }
    }
  };

  const handleDeleteSoftSkill = async (softSkillId: string) => {
    if (
      confirm("¿Estás seguro de que quieres eliminar esta habilidad blanda?")
    ) {
      try {
        await deleteSoftSkill(softSkillId);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting soft skill:", error);
      }
    }
  };

  const handleDeleteLanguage = async (languageId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este idioma?")) {
      try {
        await deleteLanguage(languageId);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting language:", error);
      }
    }
  };

  const handleDeleteExperience = async (experienceId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta experiencia?")) {
      try {
        await deleteExperience(experienceId);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting experience:", error);
      }
    }
  };

  const handleDeleteEducation = async (educationId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta formación?")) {
      try {
        await deleteEducation(educationId);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting education:", error);
      }
    }
  };

  const handleDeleteCertification = async (certificationId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta certificación?")) {
      try {
        await deleteCertification(certificationId);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting certification:", error);
      }
    }
  };

  const handleDeleteAchievement = async (achievementId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este logro/proyecto?")) {
      try {
        await deleteAchievement(achievementId);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting achievement:", error);
      }
    }
  };

  const handleToggleSkill = async (skillId: string) => {
    try {
      await toggleSkill(skillId);
      window.location.reload();
    } catch (error) {
      console.error("Error toggling skill:", error);
    }
  };

  const handleToggleCompetence = async (competenceId: string) => {
    try {
      await toggleCompetence(competenceId);
      window.location.reload();
    } catch (error) {
      console.error("Error toggling competence:", error);
    }
  };

  const handleToggleSoftSkill = async (softSkillId: string) => {
    try {
      await toggleSoftSkill(softSkillId);
      window.location.reload();
    } catch (error) {
      console.error("Error toggling soft skill:", error);
    }
  };

  const handleToggleExperience = async (experienceId: string) => {
    try {
      await toggleExperience(experienceId);
      window.location.reload();
    } catch (error) {
      console.error("Error toggling experience:", error);
    }
  };

  const handleToggleEducation = async (educationId: string) => {
    try {
      await toggleEducation(educationId);
      window.location.reload();
    } catch (error) {
      console.error("Error toggling education:", error);
    }
  };

  const handleToggleCertification = async (certificationId: string) => {
    try {
      await toggleCertification(certificationId);
      window.location.reload();
    } catch (error) {
      console.error("Error toggling certification:", error);
    }
  };

  const handleToggleAchievement = async (achievementId: string) => {
    try {
      await toggleAchievement(achievementId);
      window.location.reload();
    } catch (error) {
      console.error("Error toggling achievement:", error);
    }
  };

  const handleAddReference = async () => {
    if (newReference.name && newReference.position && newReference.company) {
      try {
        await addReference(newReference);
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
        window.location.reload();
      } catch (error) {
        console.error("Error adding reference:", error);
      }
    }
  };

  const handleDeleteReference = async (referenceId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta referencia?")) {
      try {
        await deleteReference(referenceId);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting reference:", error);
      }
    }
  };

  const handleToggleReference = async (referenceId: string) => {
    try {
      await toggleReference(referenceId);
      window.location.reload();
    } catch (error) {
      console.error("Error toggling reference:", error);
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

  // Group skills by category
  const skillsByCategory = initialData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof initialData.skills>);

  const categoryNames = {
    language: "Lenguajes de Programación",
    framework: "Frameworks",
    database: "Bases de Datos",
    tool: "Herramientas",
    library: "Librerías",
    orm: "ORM",
    ai: "IA",
  };

  const skillCategories = [
    { value: "language", label: "Lenguaje de Programación" },
    { value: "framework", label: "Framework" },
    { value: "database", label: "Base de Datos" },
    { value: "tool", label: "Herramienta" },
    { value: "library", label: "Librería" },
    { value: "orm", label: "ORM" },
    { value: "ai", label: "IA" },
  ];

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Editor de CV</h1>
        {currentCVName && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
            <p className="text-blue-800">
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Idiomas</h3>

        {/* Add new language */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium mb-3">Añadir nuevo idioma</h4>
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
                <span className="font-medium">{language.name}</span>
                <span className="text-sm text-gray-500 ml-2">
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

      {/* Habilidades por Categoría */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Habilidades Técnicas
        </h3>

        {/* Add new skill */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium mb-3">Añadir nueva habilidad</h4>
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
              value={newSkill.category}
              onChange={(e) =>
                setNewSkill((prev) => ({
                  ...prev,
                  category: e.target.value as
                    | "language"
                    | "framework"
                    | "tool"
                    | "database"
                    | "orm"
                    | "ai"
                    | "library",
                }))
              }
              options={skillCategories}
            />
            <div className="flex items-end">
              <Button onClick={handleAddSkill} size="sm" className="w-full">
                ➕ Añadir habilidad
              </Button>
            </div>
          </div>
        </div>

        {/* Habilidades existentes por categoría */}
        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <div key={category} className="mb-6">
            <h4 className="text-md font-semibold text-gray-800 mb-3">
              {categoryNames[category as keyof typeof categoryNames] ||
                category}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between border rounded-lg p-2"
                >
                  <span className="text-sm">{skill.name}</span>
                  <div className="flex items-center space-x-1">
                    <Toggle
                      checked={skill.selected}
                      onChange={() => handleToggleSkill(skill.id)}
                    />
                    <Button
                      onClick={() => handleDeleteSkill(skill.id)}
                      size="sm"
                      variant="secondary"
                      className="text-red-600 hover:text-red-700 p-1"
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Competencias Profesionales
        </h3>

        {/* Add new competence */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium mb-3">Añadir nueva competencia</h4>
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
              <span className="text-sm">{competence.name}</span>
              <div className="flex items-center space-x-1">
                <Toggle
                  checked={competence.selected}
                  onChange={() => handleToggleCompetence(competence.id)}
                />
                <Button
                  onClick={() => handleDeleteCompetence(competence.id)}
                  size="sm"
                  variant="secondary"
                  className="text-red-600 hover:text-red-700 p-1"
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Habilidades Blandas
        </h3>

        {/* Add new soft skill */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium mb-3">Añadir nueva habilidad blanda</h4>
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
              <span className="text-sm">{softSkill.name}</span>
              <div className="flex items-center space-x-1">
                <Toggle
                  checked={softSkill.selected}
                  onChange={() => handleToggleSoftSkill(softSkill.id)}
                />
                <Button
                  onClick={() => handleDeleteSoftSkill(softSkill.id)}
                  size="sm"
                  variant="secondary"
                  className="text-red-600 hover:text-red-700 p-1"
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Experiencia Laboral
        </h3>

        {/* Añadir nueva experiencia */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium mb-3">Añadir nueva experiencia</h4>
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
                <h4 className="font-semibold">{experience.position}</h4>
                <p className="text-gray-600">
                  {experience.company} - {experience.location}
                </p>
                <p className="text-sm text-gray-500">
                  {experience.startDate} - {experience.endDate || "Presente"}
                </p>
                <p className="text-xs text-gray-600 mb-2">
                  {experience.contractType} • {experience.workSchedule} •{" "}
                  {experience.workModality}
                </p>
                {experience.description && (
                  <p className="text-sm text-gray-700 mt-2">
                    {experience.description}
                  </p>
                )}
                {experience.technologies && (
                  <p className="text-sm text-blue-600 mt-1">
                    🔧 {experience.technologies}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Toggle
                  checked={experience.selected}
                  onChange={() => handleToggleExperience(experience.id)}
                />
                <Button
                  onClick={() => handleDeleteExperience(experience.id)}
                  size="sm"
                  variant="secondary"
                  className="text-red-600 hover:text-red-700"
                >
                  🗑️
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Formación */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Formación</h3>

        {/* Añadir nueva formación */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium mb-3">Añadir nueva formación</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Select
              label="Tipo de formación"
              value={newEducation.type}
              onChange={(e) =>
                setNewEducation((prev) => ({
                  ...prev,
                  type: e.target.value as "formal" | "additional",
                }))
              }
              options={[
                { value: "formal", label: "📚 Formación Oficial" },
                { value: "additional", label: "🎓 Otra Formación" },
              ]}
            />
            <Input
              label="Título"
              value={newEducation.title}
              onChange={(e) =>
                setNewEducation((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Ej: Grado en Ingeniería Informática"
            />
            <Input
              label="Institución"
              value={newEducation.institution}
              onChange={(e) =>
                setNewEducation((prev) => ({
                  ...prev,
                  institution: e.target.value,
                }))
              }
              placeholder="Ej: Universidad Politécnica"
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
              placeholder="2018"
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
              placeholder="2022"
            />
            <Input
              label="Duración (opcional)"
              value={newEducation.duration}
              onChange={(e) =>
                setNewEducation((prev) => ({
                  ...prev,
                  duration: e.target.value,
                }))
              }
              placeholder="Ej: 4 años, 300 horas"
            />
          </div>
          <Button onClick={handleAddEducation} size="sm" className="mt-3">
            ➕ Añadir formación
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
                  <h4 className="font-semibold">{education.title}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      education.type === "formal"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {education.type === "formal"
                      ? "📚 Oficial"
                      : "🎓 Adicional"}
                  </span>
                </div>
                <p className="text-gray-600">
                  {education.institution} - {education.location}
                </p>
                <p className="text-sm text-gray-500">
                  {education.startYear} - {education.endYear}
                  {education.duration && ` (${education.duration})`}
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Toggle
                  checked={education.selected}
                  onChange={() => handleToggleEducation(education.id)}
                />
                <Button
                  onClick={() => handleDeleteEducation(education.id)}
                  size="sm"
                  variant="secondary"
                  className="text-red-600 hover:text-red-700"
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Certificaciones
        </h3>

        {/* Añadir nueva certificación */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium mb-3">Añadir nueva certificación</h4>
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
                <h4 className="font-semibold flex items-center gap-2">
                  🏆 {certification.name}
                </h4>
                <p className="text-gray-600">{certification.issuer}</p>
                <p className="text-sm text-gray-500">
                  📅 Obtenida: {certification.date}
                  {certification.expiryDate && (
                    <span> • Expira: {certification.expiryDate}</span>
                  )}
                </p>
                {certification.credentialId && (
                  <p className="text-xs text-gray-600">
                    🆔 ID: {certification.credentialId}
                  </p>
                )}
                {certification.url && (
                  <p className="text-xs text-blue-600">
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
                />
                <Button
                  onClick={() => handleDeleteCertification(certification.id)}
                  size="sm"
                  variant="secondary"
                  className="text-red-600 hover:text-red-700"
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🏆 Logros y Proyectos Destacados
        </h3>

        {/* Añadir nuevo logro/proyecto */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium mb-3">Añadir nuevo logro/proyecto</h4>
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
                  <h4 className="font-semibold flex items-center gap-2">
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
                  <p className="text-gray-600 text-sm">{achievement.company}</p>
                )}
                <p className="text-sm text-gray-500 mb-2">
                  📅 {achievement.date}
                </p>
                <p className="text-sm text-gray-700 mb-2 leading-relaxed">
                  {achievement.description}
                </p>
                {achievement.technologies.length > 0 && (
                  <p className="text-xs text-blue-600 mb-1">
                    🔧 {achievement.technologies.join(", ")}
                  </p>
                )}
                {achievement.metrics && (
                  <p className="text-xs text-green-600 mb-1">
                    📊 {achievement.metrics}
                  </p>
                )}
                {achievement.url && (
                  <p className="text-xs text-purple-600">
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
                />
                <Button
                  onClick={() => handleDeleteAchievement(achievement.id)}
                  size="sm"
                  variant="secondary"
                  className="text-red-600 hover:text-red-700"
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📋 Referencias Profesionales
        </h3>

        {/* Añadir nueva referencia */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium mb-3">Añadir nueva referencia</h4>
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
                <h4 className="font-semibold text-gray-900 mb-1">
                  {reference.name}
                </h4>
                <p className="text-gray-700 text-sm">
                  {reference.position} en {reference.company}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  {reference.relationship}
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-500">
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
                />
                <Button
                  onClick={() => handleDeleteReference(reference.id)}
                  size="sm"
                  variant="secondary"
                  className="text-red-600 hover:text-red-700"
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
