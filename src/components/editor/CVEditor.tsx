// src/components/editor/CVEditor.tsx

"use client";

import { useState } from "react";
import { useCV } from "@/contexts/CVContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Textarea } from "@/components/ui/Textarea";
import { Toggle } from "@/components/ui/Toggle";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { ExperienceForm } from "@/components/forms/ExperienceForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { SkillForm } from "@/components/forms/SkillForm";
import { LanguageForm } from "@/components/forms/LanguageForm";
import {
  Experience,
  Education,
  Skill,
  Language,
  Competence,
  Interest,
} from "@/types/cv";

export const CVEditor: React.FC = () => {
  const { state, dispatch, updateAboutMe } = useCV();
  const [aboutMeText, setAboutMeText] = useState(state.currentCV.aboutMe);

  // Modal states
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isCompetenceModalOpen, setIsCompetenceModalOpen] = useState(false);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);

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
  const [newInterest, setNewInterest] = useState("");

  const handleAboutMeUpdate = () => {
    updateAboutMe(aboutMeText);
  };

  const openExperienceModal = (experience?: Experience) => {
    setEditingExperience(experience);
    setIsExperienceModalOpen(true);
  };

  const openEducationModal = (education?: Education) => {
    setEditingEducation(education);
    setIsEducationModalOpen(true);
  };

  const openSkillModal = (skill?: Skill) => {
    setEditingSkill(skill);
    setIsSkillModalOpen(true);
  };

  const openLanguageModal = (language?: Language) => {
    setEditingLanguage(language);
    setIsLanguageModalOpen(true);
  };

  const closeModals = () => {
    setIsExperienceModalOpen(false);
    setIsEducationModalOpen(false);
    setIsSkillModalOpen(false);
    setIsLanguageModalOpen(false);
    setEditingExperience(undefined);
    setEditingEducation(undefined);
    setEditingSkill(undefined);
    setEditingLanguage(undefined);
  };

  const addCompetence = () => {
    if (newCompetence.trim()) {
      dispatch({
        type: "ADD_COMPETENCE",
        payload: {
          id: Date.now().toString(),
          name: newCompetence.trim(),
          selected: true,
        },
      });
      setNewCompetence("");
    }
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      dispatch({
        type: "ADD_INTEREST",
        payload: {
          id: Date.now().toString(),
          name: newInterest.trim(),
          selected: true,
        },
      });
      setNewInterest("");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Editor de CV</h1>
        <p className="text-gray-600">
          Personaliza tu curriculum para cada oportunidad laboral
        </p>
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

      {/* Languages */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Idiomas</h3>
          <Button onClick={() => openLanguageModal()} size="sm">
            ➕ Añadir idioma
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {state.currentCV.languages.map((language) => (
            <div
              key={language.id}
              className="border rounded-lg p-3 flex justify-between items-center"
            >
              <div>
                <span className="font-medium">{language.name}</span>
                <Badge variant="info" size="sm" className="ml-2">
                  {language.level}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openLanguageModal(language)}
                >
                  ✏️
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() =>
                    dispatch({ type: "DELETE_LANGUAGE", payload: language.id })
                  }
                >
                  🗑️
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Skills */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Habilidades Técnicas
          </h3>
          <Button onClick={() => openSkillModal()} size="sm">
            ➕ Añadir habilidad
          </Button>
        </div>

        {/* Skills by category */}
        {["language", "framework", "database", "tool", "library"].map(
          (category) => {
            const categorySkills = state.currentCV.skills.filter(
              (skill) => skill.category === category
            );
            const categoryNames = {
              language: "Lenguajes de Programación",
              framework: "Frameworks",
              database: "Bases de Datos",
              tool: "Herramientas",
              library: "Librerías",
            };

            if (categorySkills.length === 0) return null;

            return (
              <div key={category} className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">
                  {categoryNames[category as keyof typeof categoryNames]}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="border rounded-lg p-3 flex justify-between items-center"
                    >
                      <div className="flex items-center space-x-3">
                        <Toggle
                          checked={skill.selected}
                          onChange={() =>
                            dispatch({
                              type: "TOGGLE_SKILL",
                              payload: skill.id,
                            })
                          }
                        />
                        <span
                          className={`${
                            skill.selected ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {skill.name}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openSkillModal(skill)}
                        >
                          ✏️
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() =>
                            dispatch({
                              type: "DELETE_SKILL",
                              payload: skill.id,
                            })
                          }
                        >
                          🗑️
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        )}
      </Card>

      {/* Competences */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Competencias</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newCompetence}
              onChange={(e) => setNewCompetence(e.target.value)}
              placeholder="Nueva competencia..."
              className="px-3 py-1 border rounded text-sm"
              onKeyPress={(e) => e.key === "Enter" && addCompetence()}
            />
            <Button onClick={addCompetence} size="sm">
              ➕
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {state.currentCV.competences.map((competence) => (
            <div
              key={competence.id}
              className="border rounded-lg p-3 flex justify-between items-center"
            >
              <div className="flex items-center space-x-3">
                <Toggle
                  checked={competence.selected}
                  onChange={() =>
                    dispatch({
                      type: "TOGGLE_COMPETENCE",
                      payload: competence.id,
                    })
                  }
                />
                <span
                  className={`${
                    competence.selected ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {competence.name}
                </span>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() =>
                  dispatch({
                    type: "DELETE_COMPETENCE",
                    payload: competence.id,
                  })
                }
              >
                🗑️
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Interests */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Intereses</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Nuevo interés..."
              className="px-3 py-1 border rounded text-sm"
              onKeyPress={(e) => e.key === "Enter" && addInterest()}
            />
            <Button onClick={addInterest} size="sm">
              ➕
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {state.currentCV.interests.map((interest) => (
            <div
              key={interest.id}
              className="border rounded-lg p-3 flex justify-between items-center"
            >
              <div className="flex items-center space-x-3">
                <Toggle
                  checked={interest.selected}
                  onChange={() =>
                    dispatch({ type: "TOGGLE_INTEREST", payload: interest.id })
                  }
                />
                <span
                  className={`${
                    interest.selected ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {interest.name}
                </span>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() =>
                  dispatch({ type: "DELETE_INTEREST", payload: interest.id })
                }
              >
                🗑️
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Experience */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Experiencia Laboral
          </h3>
          <Button onClick={() => openExperienceModal()} size="sm">
            ➕ Añadir experiencia
          </Button>
        </div>
        <div className="space-y-4">
          {state.currentCV.experiences.map((experience) => (
            <div
              key={experience.id}
              className={`border rounded-lg p-4 ${
                experience.selected
                  ? "border-blue-200 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start space-x-3">
                  <Toggle
                    checked={experience.selected}
                    onChange={() =>
                      dispatch({
                        type: "TOGGLE_EXPERIENCE",
                        payload: experience.id,
                      })
                    }
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {experience.position}
                    </h4>
                    <p className="text-blue-600 font-medium">
                      {experience.company}
                    </p>
                    <p className="text-sm text-gray-600">
                      {experience.location} • {experience.startDate}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openExperienceModal(experience)}
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      dispatch({
                        type: "DELETE_EXPERIENCE",
                        payload: experience.id,
                      })
                    }
                  >
                    🗑️
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                {experience.description}
              </p>
              {experience.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {experience.technologies.map((tech, index) => (
                    <Badge key={index} variant="info" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Education */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Formación</h3>
          <Button onClick={() => openEducationModal()} size="sm">
            ➕ Añadir formación
          </Button>
        </div>
        <div className="space-y-4">
          {state.currentCV.education.map((education) => (
            <div
              key={education.id}
              className={`border rounded-lg p-4 ${
                education.selected
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-start space-x-3">
                  <Toggle
                    checked={education.selected}
                    onChange={() =>
                      dispatch({
                        type: "TOGGLE_EDUCATION",
                        payload: education.id,
                      })
                    }
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {education.title}
                    </h4>
                    <p className="text-green-600 font-medium">
                      {education.institution}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      {education.location && <span>{education.location}</span>}
                      <Badge
                        variant={
                          education.type === "formal" ? "success" : "warning"
                        }
                        size="sm"
                      >
                        {education.type === "formal" ? "Oficial" : "Adicional"}
                      </Badge>
                      <span>
                        {education.type === "formal"
                          ? `${education.startYear} - ${education.endYear}`
                          : education.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEducationModal(education)}
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      dispatch({
                        type: "DELETE_EDUCATION",
                        payload: education.id,
                      })
                    }
                  >
                    🗑️
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Other Information */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Otra Información
        </h3>
        <div className="space-y-4">
          <Toggle
            checked={state.currentCV.drivingLicense}
            onChange={(checked) =>
              dispatch({
                type: "UPDATE_OTHER_INFO",
                payload: {
                  drivingLicense: checked,
                  ownVehicle: state.currentCV.ownVehicle,
                },
              })
            }
            label="Carnet de conducir"
          />
          <Toggle
            checked={state.currentCV.ownVehicle}
            onChange={(checked) =>
              dispatch({
                type: "UPDATE_OTHER_INFO",
                payload: {
                  drivingLicense: state.currentCV.drivingLicense,
                  ownVehicle: checked,
                },
              })
            }
            label="Vehículo propio"
          />
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
