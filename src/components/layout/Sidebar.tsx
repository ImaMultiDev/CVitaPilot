// src/components/layout/Sidebar.tsx

"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
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
  const [activeSection, setActiveSection] = useState<string>("skills");
  const [isUpdating, setIsUpdating] = useState(false);

  const sections = [
    { id: "skills", name: "Habilidades", icon: "🛠️" },
    { id: "competences", name: "Competencias", icon: "🎯" },
    { id: "softSkills", name: "Habilidades Blandas", icon: "🤝" },
    { id: "experiences", name: "Experiencias", icon: "💼" },
    { id: "education", name: "Formación", icon: "🎓" },
    { id: "certifications", name: "Certificaciones", icon: "🏆" },
    { id: "achievements", name: "Logros y Proyectos", icon: "🚀" },
    { id: "references", name: "Referencias", icon: "📋" },
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

  // Función helper para manejar actualizaciones
  const handleUpdate = async (
    updateFn: () => Promise<{ success: boolean; error?: string }>
  ) => {
    if (isUpdating) return; // Prevenir múltiples actualizaciones simultáneas

    setIsUpdating(true);
    try {
      await updateFn();
      // Forzar revalidación y refresh suave
      await forceRevalidation();
      router.refresh();

      // Pequeño delay para permitir que los cambios se propaguen
      setTimeout(() => {
        setIsUpdating(false);
      }, 500);
    } catch (error) {
      console.error("Error updating:", error);
      setIsUpdating(false);
      // En caso de error, hacer refresh completo como fallback
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
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </h4>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">
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
          <h4 className="font-medium text-gray-900 dark:text-white">
            Competencias
          </h4>
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
              <span className="text-sm text-gray-700 dark:text-gray-300">
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
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900 dark:text-white">
            Experiencias
          </h4>
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
          <h4 className="font-medium text-gray-900 dark:text-white">
            Formación
          </h4>
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

  const renderSoftSkillsSection = () => {
    const selectedCount = cvData.softSkills.filter(
      (skill) => skill.selected
    ).length;

    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900 dark:text-white">
            Habilidades Blandas
          </h4>
          <Badge variant="info">
            {selectedCount}/{cvData.softSkills.length}
          </Badge>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {cvData.softSkills.map((softSkill) => (
            <div
              key={softSkill.id}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-gray-700 dark:text-gray-300">
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
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">Certificaciones</h4>
          <Badge variant="info">
            {selectedCount}/{cvData.certifications.length}
          </Badge>
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {cvData.certifications.map((cert) => (
            <div key={cert.id} className="border-l-4 border-gray-200 pl-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-900">
                    {cert.name}
                  </h5>
                  <p className="text-xs text-gray-600">{cert.issuer}</p>
                  <p className="text-xs text-gray-500">{cert.date}</p>
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
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">Logros y Proyectos</h4>
          <Badge variant="info">
            {selectedCount}/{cvData.achievements.length}
          </Badge>
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {cvData.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="border-l-4 border-gray-200 pl-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-900 flex items-center gap-1">
                    {achievement.type === "project" ? "🚀" : "🏆"}{" "}
                    {achievement.title}
                  </h5>
                  {achievement.company && (
                    <p className="text-xs text-gray-600">
                      {achievement.company}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">{achievement.date}</p>
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
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">Referencias</h4>
          <Badge variant="info">
            {selectedCount}/{cvData.references.length}
          </Badge>
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {cvData.references.map((reference) => (
            <div key={reference.id} className="border-l-4 border-gray-200 pl-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-900">
                    {reference.name}
                  </h5>
                  <p className="text-xs text-gray-600">{reference.position}</p>
                  <p className="text-xs text-gray-500">{reference.company}</p>
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
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900 dark:text-white">Idiomas</h4>
          <Badge variant="info">{cvData.languages.length}</Badge>
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {cvData.languages.map((language) => (
            <div
              key={language.id}
              className="flex items-center justify-between border rounded-lg p-2"
            >
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {language.name}
              </span>
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
        return null;
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
    <div className="w-80 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Personalizar CV
          </h3>
          {isUpdating && (
            <div className="flex items-center text-blue-600 dark:text-blue-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              <span className="text-xs">Actualizando...</span>
            </div>
          )}
        </div>

        {/* Section Tabs */}
        <div className="space-y-1 mb-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
        <Card className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
          <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
            Resumen del CV
          </h4>
          <div className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
            <div>🛠️ {selectedSkills} habilidades seleccionadas</div>
            <div>🎯 {selectedCompetences} competencias activas</div>
            <div>🤝 {selectedSoftSkills} habilidades blandas</div>
            <div>💼 {selectedExperiences} experiencias incluidas</div>
            <div>🎓 {selectedEducation} títulos mostrados</div>
            <div>🏆 {selectedCertifications} certificaciones</div>
            <div>🚀 {selectedAchievements} logros/proyectos</div>
            <div>📋 {selectedReferences} referencias</div>
            <div>🌍 {cvData.languages.length} idiomas</div>
          </div>
          <div className="mt-3 pt-2 border-t border-blue-200 dark:border-blue-700">
            <div className="text-xs font-medium text-blue-900 dark:text-blue-100">
              Total elementos:{" "}
              {selectedSkills +
                selectedCompetences +
                selectedSoftSkills +
                selectedExperiences +
                selectedEducation +
                selectedCertifications +
                selectedAchievements +
                selectedReferences +
                cvData.languages.length}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
