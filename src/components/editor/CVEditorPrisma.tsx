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
  addExperience,
  addEducation,
  deleteSkill,
  deleteCompetence,
  deleteLanguage,
  deleteExperience,
  deleteEducation,
  toggleSkill,
  toggleCompetence,
  toggleExperience,
  toggleEducation,
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
  const [newExperience, setNewExperience] = useState({
    position: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    contractType: "indefinido" as const,
    workType: "presencial" as const,
    description: "",
    technologies: "",
  });
  const [newEducation, setNewEducation] = useState({
    title: "",
    institution: "",
    location: "",
    startYear: "",
    endYear: "",
    type: "formal" as const,
    duration: "",
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
          contractType: "indefinido",
          workType: "presencial",
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
          type: "formal",
          duration: "",
        });
        window.location.reload();
      } catch (error) {
        console.error("Error adding education:", error);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Editor de CV con Prisma
        </h1>
        {currentCVName && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
            <p className="text-blue-800">
              <span className="font-semibold">CV Activo:</span> {currentCVName}
            </p>
          </div>
        )}
        <p className="text-gray-600">
          Sistema de persistencia real con base de datos PostgreSQL
        </p>
        <div className="text-xs text-gray-500 mt-2">
          ✅ Estado persistente | ✅ Server Actions | ✅ Prisma ORM
        </div>
      </div>

      {/* Personal Information */}
      <PersonalInfoFormPrisma initialData={initialData.personalInfo} />

      {/* About Me */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sobre mí</h3>
        <div className="space-y-4">
          <Textarea
            value={aboutMeText}
            onChange={(e) => setAboutMeText(e.target.value)}
            rows={4}
            placeholder="Describe brevemente tu perfil profesional..."
          />
          <Button onClick={handleAboutMeUpdate} size="sm">
            Actualizar descripción
          </Button>
        </div>
      </Card>

      {/* Languages */}
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

        {/* Existing languages */}
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

      {/* Skills by Category */}
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

        {/* Existing skills by category */}
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

      {/* Experiences */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Experiencia Laboral
        </h3>

        {/* Add new experience */}
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

        {/* Existing experiences */}
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

      {/* Education */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Formación</h3>

        {/* Add new education */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium mb-3">Añadir nueva formación</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

        {/* Existing education */}
        <div className="space-y-3">
          {initialData.education.map((education) => (
            <div
              key={education.id}
              className="border rounded-lg p-4 flex items-start justify-between"
            >
              <div className="flex-1">
                <h4 className="font-semibold">{education.title}</h4>
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

      {/* Save CV */}
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
