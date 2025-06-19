// src/components/layout/Sidebar.tsx

"use client";

import { useState } from "react";
import { useCV } from "@/contexts/CVContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";

export const Sidebar: React.FC = () => {
  const { state, dispatch, getSelectedSkills, getSelectedCompetences } =
    useCV();
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
  ];

  const renderSkillsSection = () => {
    return (
      <div className="space-y-4">
        {skillCategories.map((category) => {
          const skills = state.currentCV.skills.filter(
            (skill) => skill.category === category.id
          );
          const selectedCount = skills.filter((skill) => skill.selected).length;

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
                      onChange={() =>
                        dispatch({ type: "TOGGLE_SKILL", payload: skill.id })
                      }
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
    const selectedCount = state.currentCV.competences.filter(
      (comp) => comp.selected
    ).length;

    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">Competencias</h4>
          <Badge variant="info">
            {selectedCount}/{state.currentCV.competences.length}
          </Badge>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {state.currentCV.competences.map((competence) => (
            <div
              key={competence.id}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-gray-700">{competence.name}</span>
              <Toggle
                checked={competence.selected}
                onChange={() =>
                  dispatch({
                    type: "TOGGLE_COMPETENCE",
                    payload: competence.id,
                  })
                }
              />
            </div>
          ))}
        </div>
      </Card>
    );
  };

  const renderExperiencesSection = () => {
    const selectedCount = state.currentCV.experiences.filter(
      (exp) => exp.selected
    ).length;

    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">Experiencias</h4>
          <Badge variant="info">
            {selectedCount}/{state.currentCV.experiences.length}
          </Badge>
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {state.currentCV.experiences.map((experience) => (
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
                    {experience.startDate}
                  </p>
                </div>
                <Toggle
                  checked={experience.selected}
                  onChange={() =>
                    dispatch({
                      type: "TOGGLE_EXPERIENCE",
                      payload: experience.id,
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  const renderEducationSection = () => {
    const selectedCount = state.currentCV.education.filter(
      (edu) => edu.selected
    ).length;

    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">Formación</h4>
          <Badge variant="info">
            {selectedCount}/{state.currentCV.education.length}
          </Badge>
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {state.currentCV.education.map((edu) => (
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
                  onChange={() =>
                    dispatch({ type: "TOGGLE_EDUCATION", payload: edu.id })
                  }
                />
              </div>
            </div>
          ))}
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
        return (
          <Card className="p-4">
            <h4 className="font-medium text-gray-900 mb-3">Idiomas</h4>
            <div className="space-y-2">
              {state.currentCV.languages.map((language) => (
                <div
                  key={language.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-gray-700">{language.name}</span>
                  <Badge variant="default">{language.level}</Badge>
                </div>
              ))}
            </div>
          </Card>
        );
      default:
        return null;
    }
  };

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
            <div>🛠️ {getSelectedSkills().length} habilidades seleccionadas</div>
            <div>🎯 {getSelectedCompetences().length} competencias activas</div>
            <div>
              💼 {state.currentCV.experiences.filter((e) => e.selected).length}{" "}
              experiencias incluidas
            </div>
            <div>
              🎓 {state.currentCV.education.filter((e) => e.selected).length}{" "}
              títulos mostrados
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
