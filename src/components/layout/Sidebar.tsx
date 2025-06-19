// src/components/layout/Sidebar.tsx

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
import {
  toggleSkill,
  toggleCompetence,
  toggleExperience,
  toggleEducation,
} from "@/lib/actions/cv-actions";
import { CVData } from "@/types/cv";

interface SidebarProps {
  cvData: CVData;
}

export const Sidebar: React.FC<SidebarProps> = ({ cvData }) => {
  const [activeSection, setActiveSection] = useState<string>("skills");

  const sections = [
    { id: "skills", name: "Habilidades", icon: "🛠️" },
    { id: "competences", name: "Competencias", icon: "🎯" },
    { id: "experiences", name: "Experiencias", icon: "💼" },
    { id: "education", name: "Formación", icon: "🎓" },
    { id: "languages", name: "Idiomas", icon: "🌍" },
  ];

  const skillCategories = [
    { id: "language", name: "Lenguajes", icon: "💻" },
    { id: "framework", name: "Frameworks", icon: "🏗️" },
    { id: "database", name: "Bases de Datos", icon: "🗄️" },
    { id: "tool", name: "Herramientas", icon: "🔧" },
    { id: "library", name: "Librerías", icon: "📚" },
    { id: "orm", name: "ORM", icon: "🔗" },
    { id: "ai", name: "IA", icon: "🤖" },
  ];

  const handleToggleSkill = async (skillId: string) => {
    try {
      await toggleSkill(skillId);
      window.location.reload(); // Recarga para mostrar cambios
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

  const renderSkillsSection = () => {
    return (
      <div className="space-y-4">
        {skillCategories.map((category) => {
          const skills = cvData.skills.filter(
            (skill) => skill.category === category.id
          );
          const selectedCount = skills.filter((skill) => skill.selected).length;

          if (skills.length === 0) return null;

          return (
            <Card key={category.id} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span>{category.icon}</span>
                  <h4 className="font-medium text-gray-900">{category.name}</h4>
                </div>
                <Badge variant="info">
                  {selectedCount}/{skills.length}
                </Badge>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-700">{skill.name}</span>
                    <Toggle
                      checked={skill.selected}
                      onChange={() => handleToggleSkill(skill.id)}
                    />
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    );
  };

  const renderCompetencesSection = () => {
    const selectedCount = cvData.competences.filter(
      (comp) => comp.selected
    ).length;

    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">Competencias</h4>
          <Badge variant="info">
            {selectedCount}/{cvData.competences.length}
          </Badge>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {cvData.competences.map((competence) => (
            <div
              key={competence.id}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-gray-700">{competence.name}</span>
              <Toggle
                checked={competence.selected}
                onChange={() => handleToggleCompetence(competence.id)}
              />
            </div>
          ))}
        </div>
      </Card>
    );
  };

  const renderExperiencesSection = () => {
    const selectedCount = cvData.experiences.filter(
      (exp) => exp.selected
    ).length;

    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">Experiencias</h4>
          <Badge variant="info">
            {selectedCount}/{cvData.experiences.length}
          </Badge>
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {cvData.experiences.map((experience) => (
            <div
              key={experience.id}
              className="border-l-4 border-gray-200 pl-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-900">
                    {experience.position}
                  </h5>
                  <p className="text-xs text-gray-600">{experience.company}</p>
                  <p className="text-xs text-gray-500">
                    {experience.startDate} - {experience.endDate || "Presente"}
                  </p>
                </div>
                <Toggle
                  checked={experience.selected}
                  onChange={() => handleToggleExperience(experience.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  const renderEducationSection = () => {
    const selectedCount = cvData.education.filter((edu) => edu.selected).length;

    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">Formación</h4>
          <Badge variant="info">
            {selectedCount}/{cvData.education.length}
          </Badge>
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {cvData.education.map((edu) => (
            <div key={edu.id} className="border-l-4 border-gray-200 pl-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-900">
                    {edu.title}
                  </h5>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                  <p className="text-xs text-gray-500">
                    {edu.type === "additional"
                      ? edu.duration
                      : `${edu.startYear} - ${edu.endYear}`}
                  </p>
                </div>
                <Toggle
                  checked={edu.selected}
                  onChange={() => handleToggleEducation(edu.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  const renderLanguagesSection = () => {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">Idiomas</h4>
          <Badge variant="info">{cvData.languages.length}</Badge>
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {cvData.languages.map((language) => (
            <div
              key={language.id}
              className="flex items-center justify-between border rounded-lg p-2"
            >
              <span className="text-sm text-gray-700">{language.name}</span>
              <Badge variant="default">{language.level}</Badge>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-gray-500">
          💡 Los idiomas se muestran siempre en el CV
        </div>
      </Card>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case "skills":
        return renderSkillsSection();
      case "competences":
        return renderCompetencesSection();
      case "experiences":
        return renderExperiencesSection();
      case "education":
        return renderEducationSection();
      case "languages":
        return renderLanguagesSection();
      default:
        return null;
    }
  };

  // Calcular estadísticas
  const selectedSkills = cvData.skills.filter((s) => s.selected).length;
  const selectedCompetences = cvData.competences.filter(
    (c) => c.selected
  ).length;
  const selectedExperiences = cvData.experiences.filter(
    (e) => e.selected
  ).length;
  const selectedEducation = cvData.education.filter((e) => e.selected).length;

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Personalizar CV
        </h3>

        {/* Section Tabs */}
        <div className="space-y-1 mb-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{section.icon}</span>
              <span>{section.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {renderSection()}

        {/* Quick Stats */}
        <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Resumen del CV
          </h4>
          <div className="space-y-1 text-xs text-blue-800">
            <div>🛠️ {selectedSkills} habilidades seleccionadas</div>
            <div>🎯 {selectedCompetences} competencias activas</div>
            <div>💼 {selectedExperiences} experiencias incluidas</div>
            <div>🎓 {selectedEducation} títulos mostrados</div>
            <div>🌍 {cvData.languages.length} idiomas</div>
          </div>
          <div className="mt-3 pt-2 border-t border-blue-200">
            <div className="text-xs font-medium text-blue-900">
              Total elementos:{" "}
              {selectedSkills +
                selectedCompetences +
                selectedExperiences +
                selectedEducation +
                cvData.languages.length}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
