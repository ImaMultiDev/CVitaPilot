import React from "react";
import { CVData } from "@/types/cv";
import {
  PersonalInfoSection,
  ProfessionalProfileSection,
  LanguagesSection,
  ExperienceSection,
  AchievementsSection,
  EducationSection,
  CertificationsSection,
  CompetencesSection,
  SkillsSection,
  SoftSkillsSection,
  OtherInformationSection,
  ReferencesSection,
} from "./CVSections";

interface CVATSFormatProps {
  cvData: CVData;
}

export const CVATSFormat: React.FC<CVATSFormatProps> = ({ cvData }) => {
  return (
    <div className="cv-container ats-format">
      <style jsx>{`
        .cv-container {
          color-scheme: light !important;
          background: white !important;
          display: flex;
          flex-direction: column;
          gap: 4rem;
          box-sizing: border-box;
        }
        .cv-container * {
          color-scheme: light !important;
          color: #000000 !important;
        }
      `}</style>

      {/* Página 1 - ATS: Perfil profesional + Experiencia laboral */}
      <div
        id="cv-page-1"
        className="cv-page mx-auto mb-8 overflow-hidden bg-white shadow-2xl"
        style={{
          width: "210mm",
          minHeight: "297mm",
          maxWidth: "210mm",
          color: "#000000",
          fontFamily: "Arial, sans-serif",
          padding: "0.75rem 1.5rem",
        }}
      >
        {/* 1-4. Header: Nombre completo, Puesto objetivo, Info de contacto en 2 columnas, Línea separadora */}
        <PersonalInfoSection personalInfo={cvData.personalInfo} format="ats" />
        <br />
        {/* 5. Perfil Profesional */}
        <ProfessionalProfileSection
          professionalProfile={cvData.aboutMe}
          format="ats"
        />
        <br />
        {/* 6. Idiomas */}
        <LanguagesSection languages={cvData.languages} format="ats" />
        <br />
        {/* 7. Experiencia Profesional - Con espacio bien aireado */}
        <ExperienceSection experiences={cvData.experiences} format="ats" />
      </div>

      {/* Página 2 - ATS: Logros + Formación + Certificaciones + Competencias */}
      <div
        id="cv-page-2"
        className="cv-page mx-auto overflow-hidden bg-white shadow-2xl"
        style={{
          width: "210mm",
          minHeight: "297mm",
          maxWidth: "210mm",
          color: "#000000",
          fontFamily: "Arial, sans-serif",
          padding: "0.75rem 1.5rem",
        }}
      >
        {/* 8. Logros y Proyectos - Movido a página 2 */}
        <AchievementsSection achievements={cvData.achievements} format="ats" />
        <br />
        {/* 9. Formación Académica */}
        <EducationSection education={cvData.education} format="ats" />
        <br />
        {/* 10. Certificaciones */}
        <CertificationsSection
          certifications={cvData.certifications}
          format="ats"
        />
        <br />
        {/* 11. Competencias */}
        <CompetencesSection competences={cvData.competences} format="ats" />
        <br />
        {/* 12. Habilidades Técnicas */}
        <SkillsSection skills={cvData.skills} format="ats" />
        <br />
        {/* 13. Habilidades Blandas */}
        <SoftSkillsSection softSkills={cvData.softSkills} format="ats" />
        <br />
        {/* 14. Otra Información */}
        <OtherInformationSection
          otherInformation={cvData.otherInformation}
          format="ats"
        />
        <br />
        {/* 15. Referencias */}
        <ReferencesSection references={cvData.references} format="ats" />
      </div>
    </div>
  );
};
