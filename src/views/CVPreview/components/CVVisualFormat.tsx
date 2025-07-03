import React from "react";
import { CVData } from "@/types/cv";
import {
  PersonalInfoSection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  LanguagesSection,
  SpecializationSection,
  OtherInformationSection,
  CompetencesSection,
  CertificationsSection,
  AchievementsSection,
  ReferencesSection,
} from "./CVSections";

interface CVVisualFormatProps {
  cvData: CVData;
}

export const CVVisualFormat: React.FC<CVVisualFormatProps> = ({ cvData }) => {
  return (
    <div className="cv-container visual-format">
      <style jsx>{`
        .cv-container {
          color-scheme: light !important;
          background: white !important;
          color: #374151 !important;
        }
        .cv-container * {
          color-scheme: light !important;
          box-sizing: border-box;
        }
        .cv-page {
          background: white !important;
          color: #374151 !important;
        }
        .cv-page * {
          color: inherit !important;
        }
      `}</style>

      {/* Página 1 - Visual */}
      <div
        id="cv-page-1"
        className="cv-page mx-auto mb-8 overflow-hidden"
        style={{
          width: "210mm",
          minHeight: "297mm",
          maxWidth: "210mm",
          background: "#ffffff",
          color: "#374151",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="flex h-full visual-page-layout">
          {/* Sidebar */}
          <div
            style={{
              background:
                "linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #14b8a6 100%)",
              width: "35%",
              padding: "1.5rem",
              color: "#ffffff",
              flexShrink: 0,
            }}
          >
            {/* Información Personal */}
            <PersonalInfoSection
              personalInfo={cvData.personalInfo}
              format="visual"
            />

            {/* Competencias */}
            <CompetencesSection
              competences={cvData.competences}
              format="visual"
            />

            {/* Idiomas */}
            <LanguagesSection languages={cvData.languages} format="visual" />

            {/* Especialización - Habilidades organizadas */}
            <SpecializationSection skills={cvData.skills} format="visual" />

            {/* Otra información */}
            <OtherInformationSection
              otherInformation={cvData.otherInformation}
              format="visual"
            />
          </div>

          {/* Contenido Principal */}
          <div
            style={{
              flex: 1,
              padding: "2rem",
              color: "#374151",
              background: "#ffffff",
            }}
          >
            {/* Header con nombre y puesto */}
            <div style={{ marginBottom: "2rem" }}>
              <h1
                style={{
                  fontSize: "1.875rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: "#1f2937",
                  lineHeight: "2.25rem",
                }}
              >
                {cvData.personalInfo?.name || ""}
              </h1>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "500",
                  marginBottom: "1rem",
                  color: "#0f766e",
                  lineHeight: "1.75rem",
                }}
              >
                {cvData.personalInfo?.position || ""}
              </h2>

              {/* About me section */}
              {cvData.aboutMe && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      marginBottom: "0.75rem",
                      color: "#1f2937",
                      lineHeight: "1.75rem",
                    }}
                  >
                    Perfil Profesional
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                      color: "#374151",
                    }}
                  >
                    {cvData.aboutMe}
                  </p>
                </div>
              )}
            </div>

            {/* Experiencia Laboral */}
            <ExperienceSection
              experiences={cvData.experiences}
              format="visual"
              maxItems={2}
            />
          </div>
        </div>
      </div>

      {/* Página 2 - Visual */}
      <div
        id="cv-page-2"
        className="cv-page mx-auto overflow-hidden"
        style={{
          width: "210mm",
          minHeight: "297mm",
          maxWidth: "210mm",
          background: "#ffffff",
          color: "#374151",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div
            style={{
              flex: 1,
              padding: "2rem",
              color: "#374151",
              background: "#ffffff",
            }}
          >
            {/* Formación Académica */}
            <EducationSection education={cvData.education} format="visual" />

            {/* Certificaciones */}
            <CertificationsSection
              certifications={cvData.certifications}
              format="visual"
            />

            {/* Logros y Proyectos Destacados */}
            <AchievementsSection
              achievements={cvData.achievements}
              format="visual"
            />

            {/* Referencias */}
            <ReferencesSection references={cvData.references} format="visual" />

            {/* Habilidades Adicionales - Solo si hay espacio y habilidades extra */}
            {cvData.skills && cvData.skills.length > 9 && (
              <SkillsSection skills={cvData.skills} format="visual" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
