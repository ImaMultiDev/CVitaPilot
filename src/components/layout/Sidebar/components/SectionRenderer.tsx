import React from "react";
import type { CVData } from "@/types/cv";
import { ResumenSection } from "./ResumenSection";
import { SkillsSection } from "./SkillsSection";
import { CompetencesSection } from "./CompetencesSection";
import { SoftSkillsSection } from "./SoftSkillsSection";
import { ExperiencesSection } from "./ExperiencesSection";
import { EducationSection } from "./EducationSection";
import { CertificationsSection } from "./CertificationsSection";
import { AchievementsSection } from "./AchievementsSection";
import { ReferencesSection } from "./ReferencesSection";
import { LanguagesSection } from "./LanguagesSection";
import { OtherInformationSection } from "./OtherInformationSection";

interface SectionRendererProps {
  activeSection: string;
  cvData: CVData;
  onToggleSkill: (skillId: string) => void;
  onToggleCompetence: (competenceId: string) => void;
  onToggleSoftSkill: (softSkillId: string) => void;
  onToggleExperience: (experienceId: string) => void;
  onToggleEducation: (educationId: string) => void;
  onToggleCertification: (certificationId: string) => void;
  onToggleAchievement: (achievementId: string) => void;
  onToggleReference: (referenceId: string) => void;
  onToggleOtherInformation: (otherInfoId: string) => void;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  activeSection,
  cvData,
  onToggleSkill,
  onToggleCompetence,
  onToggleSoftSkill,
  onToggleExperience,
  onToggleEducation,
  onToggleCertification,
  onToggleAchievement,
  onToggleReference,
  onToggleOtherInformation,
}) => {
  switch (activeSection) {
    case "resumen":
      return <ResumenSection cvData={cvData} />;

    case "skills":
      return <SkillsSection cvData={cvData} onToggleSkill={onToggleSkill} />;

    case "competences":
      return (
        <CompetencesSection
          cvData={cvData}
          onToggleCompetence={onToggleCompetence}
        />
      );

    case "softSkills":
      return (
        <SoftSkillsSection
          cvData={cvData}
          onToggleSoftSkill={onToggleSoftSkill}
        />
      );

    case "experiences":
      return (
        <ExperiencesSection
          cvData={cvData}
          onToggleExperience={onToggleExperience}
        />
      );

    case "education":
      return (
        <EducationSection
          cvData={cvData}
          onToggleEducation={onToggleEducation}
        />
      );

    case "certifications":
      return (
        <CertificationsSection
          cvData={cvData}
          onToggleCertification={onToggleCertification}
        />
      );

    case "achievements":
      return (
        <AchievementsSection
          cvData={cvData}
          onToggleAchievement={onToggleAchievement}
        />
      );

    case "references":
      return (
        <ReferencesSection
          cvData={cvData}
          onToggleReference={onToggleReference}
        />
      );

    case "languages":
      return <LanguagesSection cvData={cvData} />;

    case "otherInformation":
      return (
        <OtherInformationSection
          otherInformation={cvData.otherInformation}
          onToggleOtherInformation={onToggleOtherInformation}
        />
      );

    default:
      return <ResumenSection cvData={cvData} />;
  }
};
