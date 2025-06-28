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
        }
        .cv-container * {
          color-scheme: light !important;
          color: #000000 !important;
        }
      `}</style>

      {/* Página 1 - ATS */}
      <div
        id="cv-page-1"
        className="cv-page bg-white shadow-2xl p-6 mb-8 overflow-hidden"
        style={{
          width: "210mm",
          minHeight: "297mm",
          maxWidth: "210mm",
          color: "#000000 !important",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* 1-4. Header: Nombre completo, Puesto objetivo, Info de contacto en 2 columnas, Línea separadora */}
        <PersonalInfoSection personalInfo={cvData.personalInfo} format="ats" />

        {/* 5. Perfil Profesional */}
        <ProfessionalProfileSection
          professionalProfile={cvData.aboutMe}
          format="ats"
        />

        {/* 6. Idiomas */}
        <LanguagesSection languages={cvData.languages} format="ats" />

        {/* 7. Experiencia Profesional */}
        <ExperienceSection experiences={cvData.experiences} format="ats" />

        {/* 8. Logros y Proyectos */}
        <AchievementsSection achievements={cvData.achievements} format="ats" />
      </div>

      {/* Página 2 - ATS */}
      <div
        id="cv-page-2"
        className="cv-page bg-white shadow-2xl p-6 overflow-hidden"
        style={{
          width: "210mm",
          minHeight: "297mm",
          maxWidth: "210mm",
          color: "#000000 !important",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* 9. Formación Académica */}
        <EducationSection education={cvData.education} format="ats" />

        {/* 10. Certificaciones */}
        <CertificationsSection
          certifications={cvData.certifications}
          format="ats"
        />

        {/* 11. Competencias */}
        <CompetencesSection competences={cvData.competences} format="ats" />

        {/* 12. Habilidades Técnicas */}
        <SkillsSection skills={cvData.skills} format="ats" />

        {/* 13. Habilidades Blandas */}
        <SoftSkillsSection softSkills={cvData.softSkills} format="ats" />

        {/* 14. Otra Información */}
        <OtherInformationSection
          drivingLicense={cvData.drivingLicense}
          ownVehicle={cvData.ownVehicle}
          format="ats"
        />

        {/* 15. Referencias */}
        <ReferencesSection references={cvData.references} format="ats" />
      </div>
    </div>
  );
};
