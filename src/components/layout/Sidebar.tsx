// src/components/layout/Sidebar.tsx

"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
import { Select } from "@/components/ui/Select";
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

interface SidebarProps {
  cvData: CVData;
}

export const Sidebar: React.FC<SidebarProps> = ({ cvData }) => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("resumen");
  const [isUpdating, setIsUpdating] = useState(false);

  const sections = [
    {
      id: "resumen",
      name: "Resumen del CV",
      color: "from-blue-500 to-indigo-500",
      description: "Vista general de todos los elementos",
    },
    {
      id: "skills",
      name: "Habilidades",
      color: "from-blue-500 to-cyan-500",
      description: "Habilidades técnicas",
    },
    {
      id: "competences",
      name: "Competencias",
      color: "from-indigo-500 to-purple-500",
      description: "Competencias profesionales",
    },
    {
      id: "softSkills",
      name: "Habilidades Blandas",
      color: "from-green-500 to-emerald-500",
      description: "Habilidades interpersonales",
    },
    {
      id: "experiences",
      name: "Experiencias",
      color: "from-orange-500 to-red-500",
      description: "Experiencia laboral",
    },
    {
      id: "education",
      name: "Formación",
      color: "from-purple-500 to-pink-500",
      description: "Educación y títulos",
    },
    {
      id: "certifications",
      name: "Certificaciones",
      color: "from-yellow-500 to-orange-500",
      description: "Certificados y logros",
    },
    {
      id: "achievements",
      name: "Logros y Proyectos",
      color: "from-pink-500 to-red-500",
      description: "Proyectos destacados",
    },
    {
      id: "references",
      name: "Referencias",
      color: "from-teal-500 to-blue-500",
      description: "Referencias profesionales",
    },
    {
      id: "languages",
      name: "Idiomas",
      color: "from-emerald-500 to-green-500",
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

  // Preparar opciones para el selector
  const sectionOptions = sections.map((section) => ({
    value: section.id,
    label: section.name,
  }));

  const currentSection = sections.find((s) => s.id === activeSection);

  const renderResumenSection = () => {
    return (
      <Card
        variant="modern"
        padding="md"
        className="bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/20 border-blue-200/50 dark:border-blue-800/50"
      >
        <h4 className="text-sm font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500"></div>
          <span>Resumen del CV</span>
        </h4>

        {/* Estadísticas principales en grid vertical */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Habilidades
              </span>
            </div>
            <Badge variant="primary" size="sm">
              {selectedSkills}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Competencias
              </span>
            </div>
            <Badge variant="primary" size="sm">
              {selectedCompetences}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Habilidades Blandas
              </span>
            </div>
            <Badge variant="success" size="sm">
              {selectedSoftSkills}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Experiencias
              </span>
            </div>
            <Badge variant="warning" size="sm">
              {selectedExperiences}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Formación
              </span>
            </div>
            <Badge variant="secondary" size="sm">
              {selectedEducation}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Certificaciones
              </span>
            </div>
            <Badge variant="warning" size="sm">
              {selectedCertifications}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-pink-500"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Logros
              </span>
            </div>
            <Badge variant="danger" size="sm">
              {selectedAchievements}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-teal-500"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Referencias
              </span>
            </div>
            <Badge variant="info" size="sm">
              {selectedReferences}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Idiomas
              </span>
            </div>
            <Badge variant="success" size="sm">
              {cvData.languages.length}
            </Badge>
          </div>
        </div>

        {/* Total general */}
        <div className="mt-4 pt-3 border-t border-blue-200/50 dark:border-blue-700/50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-blue-900 dark:text-blue-100">
              Total elementos:
            </span>
            <Badge variant="primary" size="md" className="font-bold">
              {selectedSkills +
                selectedCompetences +
                selectedSoftSkills +
                selectedExperiences +
                selectedEducation +
                selectedCertifications +
                selectedAchievements +
                selectedReferences +
                cvData.languages.length}
            </Badge>
          </div>
        </div>

        {/* Tip informativo */}
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg border border-blue-200/50 dark:border-blue-700/50">
          <div className="text-xs text-blue-700 dark:text-blue-300 font-medium flex items-start space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0"></div>
            <span>
              Selecciona una sección específica para activar/desactivar
              elementos individuales del CV.
            </span>
          </div>
        </div>
      </Card>
    );
  };

  const renderSkillsSection = () => {
    const skillsByCategory = cvData.skillCategories
      .map((category) => {
        const skills = cvData.skills.filter(
          (skill) => skill.categoryId === category.id
        );
        return {
          ...category,
          skills,
          selectedCount: skills.filter((skill) => skill.selected).length,
        };
      })
      .filter((category) => category.skills.length > 0);

    return (
      <div className="space-y-4">
        {skillsByCategory.map((category) => (
          <Card
            key={category.id}
            variant="modern"
            padding="md"
            className="group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500"></div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {category.name}
                </h4>
              </div>
              <Badge variant="info" size="sm" pill>
                {category.selectedCount}/{category.skills.length}
              </Badge>
            </div>

            <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
              {category.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-gray-50/50 dark:bg-gray-800/50 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200 group/item"
                >
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 mr-2 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                    {skill.name}
                  </span>
                  <Toggle
                    checked={skill.selected}
                    onChange={() => handleToggleSkill(skill.id)}
                  />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const renderCompetencesSection = () => {
    const selectedCount = cvData.competences.filter(
      (comp) => comp.selected
    ).length;

    return (
      <Card variant="modern" padding="md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500"></div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              Competencias
            </h4>
          </div>
          <Badge variant="info" size="sm" pill>
            {selectedCount}/{cvData.competences.length}
          </Badge>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
          {cvData.competences.map((competence) => (
            <div
              key={competence.id}
              className="flex items-center justify-between p-2 rounded-lg bg-gray-50/50 dark:bg-gray-800/50 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200 group/item"
            >
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 mr-2 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">
                {competence.name}
              </span>
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
      <Card variant="modern" padding="md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-500 to-red-500"></div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              Experiencias
            </h4>
          </div>
          <Badge variant="info" size="sm" pill>
            {selectedCount}/{cvData.experiences.length}
          </Badge>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
          {cvData.experiences.map((experience) => (
            <div
              key={experience.id}
              className="border-l-3 border-orange-500 pl-3 p-2 rounded-r-lg bg-gray-50/50 dark:bg-gray-800/50 hover:shadow-sm transition-all duration-200 group/item"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 mr-2">
                  <h5 className="text-xs font-semibold text-gray-900 dark:text-white group-hover/item:text-orange-600 dark:group-hover/item:text-orange-400 transition-colors">
                    {experience.position}
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {experience.company}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
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
      <Card variant="modern" padding="md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              Formación
            </h4>
          </div>
          <Badge variant="info" size="sm" pill>
            {selectedCount}/{cvData.education.length}
          </Badge>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
          {cvData.education.map((edu) => (
            <div
              key={edu.id}
              className="border-l-3 border-purple-500 pl-3 p-2 rounded-r-lg bg-gray-50/50 dark:bg-gray-800/50 hover:shadow-sm transition-all duration-200 group/item"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 mr-2">
                  <h5 className="text-xs font-semibold text-gray-900 dark:text-white group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 transition-colors">
                    {edu.title}
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {`${edu.startYear} - ${edu.endYear}`}
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

  const renderSoftSkillsSection = () => {
    const selectedCount = cvData.softSkills.filter(
      (skill) => skill.selected
    ).length;

    return (
      <Card variant="modern" padding="md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-500"></div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              Habilidades Blandas
            </h4>
          </div>
          <Badge variant="info" size="sm" pill>
            {selectedCount}/{cvData.softSkills.length}
          </Badge>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
          {cvData.softSkills.map((softSkill) => (
            <div
              key={softSkill.id}
              className="flex items-center justify-between p-2 rounded-lg bg-gray-50/50 dark:bg-gray-800/50 border border-transparent hover:border-green-200 dark:hover:border-green-800 transition-all duration-200 group/item"
            >
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 mr-2 group-hover/item:text-green-600 dark:group-hover/item:text-green-400 transition-colors">
                {softSkill.name}
              </span>
              <Toggle
                checked={softSkill.selected}
                onChange={() => handleToggleSoftSkill(softSkill.id)}
              />
            </div>
          ))}
        </div>
      </Card>
    );
  };

  const renderCertificationsSection = () => {
    const selectedCount = cvData.certifications.filter(
      (cert) => cert.selected
    ).length;

    return (
      <Card variant="modern" padding="md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500"></div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              Certificaciones
            </h4>
          </div>
          <Badge variant="info" size="sm" pill>
            {selectedCount}/{cvData.certifications.length}
          </Badge>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
          {cvData.certifications.map((cert) => (
            <div
              key={cert.id}
              className="border-l-3 border-yellow-500 pl-3 p-2 rounded-r-lg bg-gray-50/50 dark:bg-gray-800/50 hover:shadow-sm transition-all duration-200 group/item"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 mr-2">
                  <h5 className="text-xs font-semibold text-gray-900 dark:text-white group-hover/item:text-yellow-600 dark:group-hover/item:text-yellow-400 transition-colors">
                    {cert.name}
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {cert.date}
                  </p>
                </div>
                <Toggle
                  checked={cert.selected}
                  onChange={() => handleToggleCertification(cert.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  const renderAchievementsSection = () => {
    const selectedCount = cvData.achievements.filter(
      (achievement) => achievement.selected
    ).length;

    return (
      <Card variant="modern" padding="md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-pink-500 to-red-500"></div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              Logros y Proyectos
            </h4>
          </div>
          <Badge variant="info" size="sm" pill>
            {selectedCount}/{cvData.achievements.length}
          </Badge>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
          {cvData.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="border-l-3 border-pink-500 pl-3 p-2 rounded-r-lg bg-gray-50/50 dark:bg-gray-800/50 hover:shadow-sm transition-all duration-200 group/item"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 mr-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-pink-500 to-red-500"></div>
                    <h5 className="text-xs font-semibold text-gray-900 dark:text-white group-hover/item:text-pink-600 dark:group-hover/item:text-pink-400 transition-colors">
                      {achievement.title}
                    </h5>
                  </div>
                  {achievement.company && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium ml-3">
                      {achievement.company}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-500 ml-3">
                    {achievement.date}
                  </p>
                </div>
                <Toggle
                  checked={achievement.selected}
                  onChange={() => handleToggleAchievement(achievement.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  const renderReferencesSection = () => {
    const selectedCount = cvData.references.filter(
      (ref) => ref.selected
    ).length;

    return (
      <Card variant="modern" padding="md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-teal-500 to-blue-500"></div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              Referencias
            </h4>
          </div>
          <Badge variant="info" size="sm" pill>
            {selectedCount}/{cvData.references.length}
          </Badge>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
          {cvData.references.map((reference) => (
            <div
              key={reference.id}
              className="border-l-3 border-teal-500 pl-3 p-2 rounded-r-lg bg-gray-50/50 dark:bg-gray-800/50 hover:shadow-sm transition-all duration-200 group/item"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 mr-2">
                  <h5 className="text-xs font-semibold text-gray-900 dark:text-white group-hover/item:text-teal-600 dark:group-hover/item:text-teal-400 transition-colors">
                    {reference.name}
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {reference.position}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {reference.company}
                  </p>
                </div>
                <Toggle
                  checked={reference.selected}
                  onChange={() => handleToggleReference(reference.id)}
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
      <Card variant="modern" padding="md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-500 to-green-500"></div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              Idiomas
            </h4>
          </div>
          <Badge variant="success" size="sm" pill>
            {cvData.languages.length}
          </Badge>
        </div>
        <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
          {cvData.languages.map((language) => (
            <div
              key={language.id}
              className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-sm transition-all duration-200"
            >
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 mr-2">
                {language.name}
              </span>
              <Badge variant="success" size="sm" pill>
                {language.level}
              </Badge>
            </div>
          ))}
        </div>
        <div className="mt-3 p-2 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50">
          <div className="text-xs text-emerald-700 dark:text-emerald-300 font-medium flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span>Los idiomas se muestran siempre</span>
          </div>
        </div>
      </Card>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case "resumen":
        return renderResumenSection();
      case "skills":
        return renderSkillsSection();
      case "competences":
        return renderCompetencesSection();
      case "softSkills":
        return renderSoftSkillsSection();
      case "experiences":
        return renderExperiencesSection();
      case "education":
        return renderEducationSection();
      case "certifications":
        return renderCertificationsSection();
      case "achievements":
        return renderAchievementsSection();
      case "references":
        return renderReferencesSection();
      case "languages":
        return renderLanguagesSection();
      default:
        return renderResumenSection();
    }
  };

  // Calcular estadísticas
  const selectedSkills = cvData.skills.filter((s) => s.selected).length;
  const selectedCompetences = cvData.competences.filter(
    (c) => c.selected
  ).length;
  const selectedSoftSkills = cvData.softSkills.filter((s) => s.selected).length;
  const selectedExperiences = cvData.experiences.filter(
    (e) => e.selected
  ).length;
  const selectedEducation = cvData.education.filter((e) => e.selected).length;
  const selectedCertifications = cvData.certifications.filter(
    (c) => c.selected
  ).length;
  const selectedAchievements = cvData.achievements.filter(
    (a) => a.selected
  ).length;
  const selectedReferences = cvData.references.filter((r) => r.selected).length;

  return (
    <div className="w-80 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-r border-gray-200/50 dark:border-gray-700/50 h-screen overflow-hidden flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm relative z-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg"></div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Personalizar CV
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {currentSection?.description}
              </p>
            </div>
          </div>
          {isUpdating && (
            <div className="flex items-center text-indigo-600 dark:text-indigo-400">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent mr-1"></div>
              <span className="text-xs font-medium">Guardando...</span>
            </div>
          )}
        </div>

        {/* Section Selector */}
        <div className="space-y-2 relative z-[70]">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Sección:
          </label>
          <div className="relative z-[70]">
            <Select
              options={sectionOptions}
              value={activeSection}
              onChange={(value) => setActiveSection(value)}
              variant="modern"
              placeholder="Selecciona una sección..."
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 relative z-10">
        {renderSection()}
      </div>

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(
            to bottom,
            rgba(99, 102, 241, 0.3),
            rgba(139, 92, 246, 0.3)
          );
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            to bottom,
            rgba(99, 102, 241, 0.5),
            rgba(139, 92, 246, 0.5)
          );
        }

        .border-l-3 {
          border-left-width: 3px;
        }
      `}</style>
    </div>
  );
};
