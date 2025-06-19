// src/components/editor/CVEditor.tsx

"use client";

import { useState, useEffect } from "react";
import { useCV } from "@/contexts/CVContext";
import { useCVPersistence } from "@/hooks/useCVPersistence";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { Toggle } from "@/components/ui/Toggle";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { ExperienceForm } from "@/components/forms/ExperienceForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { SkillForm } from "@/components/forms/SkillForm";
import { LanguageForm } from "@/components/forms/LanguageForm";
import { Experience, Education, Skill, Language } from "@/types/cv";

export const CVEditor: React.FC = () => {
  const { state, dispatch, updateAboutMe, addCompetence } = useCV();
  useCVPersistence(); // Activar la persistencia

  const [aboutMeText, setAboutMeText] = useState(state.currentCV.aboutMe);

  // Sincronizar aboutMeText cuando cambie el estado
  useEffect(() => {
    setAboutMeText(state.currentCV.aboutMe);
  }, [state.currentCV.aboutMe]);

  // Modal states
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  // Edit states
  const [editingExperience, setEditingExperience] = useState<
    Experience | undefined
  >();
  const [editingEducation, setEditingEducation] = useState<
    Education | undefined
  >();
  const [editingSkill, setEditingSkill] = useState<Skill | undefined>();
  const [editingLanguage, setEditingLanguage] = useState<
    Language | undefined
  >();

  // New item states
  const [newCompetence, setNewCompetence] = useState("");

  const handleAboutMeUpdate = () => {
    console.log("Updating about me:", aboutMeText);
    updateAboutMe(aboutMeText);
  };

  const openSkillModal = (skill?: Skill) => {
    console.log("Opening skill modal:", skill);
    setEditingSkill(skill);
    setIsSkillModalOpen(true);
  };

  const closeModals = () => {
    console.log("Closing all modals");
    setIsExperienceModalOpen(false);
    setIsEducationModalOpen(false);
    setIsSkillModalOpen(false);
    setIsLanguageModalOpen(false);
    setEditingExperience(undefined);
    setEditingEducation(undefined);
    setEditingSkill(undefined);
    setEditingLanguage(undefined);
  };

  const handleAddCompetence = () => {
    if (newCompetence.trim()) {
      console.log("Adding competence:", newCompetence.trim());
      addCompetence({
        name: newCompetence.trim(),
        selected: true,
      });
      setNewCompetence("");
    }
  };

  const handleToggleSkill = (skillId: string) => {
    console.log("Toggling skill:", skillId);
    dispatch({
      type: "TOGGLE_SKILL",
      payload: skillId,
    });
  };

  // Debug: Log estado actual
  console.log("CVEditor - Current state:", {
    skills: state.currentCV.skills.length,
    competences: state.currentCV.competences.length,
    experiences: state.currentCV.experiences.length,
    languages: state.currentCV.languages.length,
  });

  // Verificar que el estado esté cargado
  if (!state.currentCV) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Cargando...
          </h2>
          <p className="text-gray-600">Preparando el editor de CV</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Editor de CV</h1>
        <p className="text-gray-600">
          Personaliza tu curriculum para cada oportunidad laboral
        </p>
        <div className="text-xs text-gray-500 mt-2">
          Debug: {state.currentCV.skills.length} skills,{" "}
          {state.currentCV.competences.length} competences
        </div>
      </div>

      {/* Personal Information */}
      <PersonalInfoForm />

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

      {/* Simple Test Section */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Test Básico
        </h3>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={newCompetence}
              onChange={(e) => setNewCompetence(e.target.value)}
              placeholder="Nueva competencia..."
              className="px-3 py-1 border rounded-lg text-sm mr-2"
              onKeyPress={(e) => e.key === "Enter" && handleAddCompetence()}
            />
            <Button onClick={handleAddCompetence} size="sm">
              ➕ Añadir Competencia
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {state.currentCV.competences.map((competence) => (
              <div
                key={competence.id}
                className="flex items-center justify-between border rounded-lg p-2"
              >
                <span className="text-sm">{competence.name}</span>
                <Toggle
                  checked={competence.selected}
                  onChange={() => {
                    console.log("Toggling competence:", competence.id);
                    dispatch({
                      type: "TOGGLE_COMPETENCE",
                      payload: competence.id,
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Skills - Simplified */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Habilidades Técnicas
          </h3>
          <Button onClick={() => openSkillModal()} size="sm">
            ➕ Añadir habilidad
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {state.currentCV.skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between border rounded-lg p-2"
            >
              <span className="text-sm">{skill.name}</span>
              <Toggle
                checked={skill.selected}
                onChange={() => handleToggleSkill(skill.id)}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Modals */}
      <ExperienceForm
        isOpen={isExperienceModalOpen}
        onClose={closeModals}
        experience={editingExperience}
      />
      <EducationForm
        isOpen={isEducationModalOpen}
        onClose={closeModals}
        education={editingEducation}
      />
      <SkillForm
        isOpen={isSkillModalOpen}
        onClose={closeModals}
        skill={editingSkill}
      />
      <LanguageForm
        isOpen={isLanguageModalOpen}
        onClose={closeModals}
        language={editingLanguage}
      />
    </div>
  );
};
