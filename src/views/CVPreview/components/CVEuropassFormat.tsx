import React from "react";
import { CVData } from "@/types/cv";
import Image from "next/image";
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

interface CVEuropassFormatProps {
  cvData: CVData;
}

export const CVEuropassFormat: React.FC<CVEuropassFormatProps> = ({
  cvData,
}) => {
  return (
    <div className="cv-container europass-format">
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
        }
      `}</style>

      {/* Página 1 - Europass con sidebar */}
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
        <div style={{ display: "flex", height: "100%" }}>
          {/* Sidebar Europass - Azul europeo */}
          <div
            style={{
              background:
                "linear-gradient(135deg, #003399 0%, #0066cc 50%, #0099ff 100%)",
              width: "30%",
              padding: "1.5rem",
              color: "#ffffff",
              flexShrink: 0,
            }}
          >
            {/* Foto opcional */}
            {cvData.personalInfo?.photo && (
              <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
                <Image
                  src={cvData.personalInfo.photo}
                  alt="Foto de perfil"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #ffffff",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </div>
            )}

            {/* Información Personal */}
            <PersonalInfoSection
              personalInfo={cvData.personalInfo}
              format="europass"
            />

            {/* Competencias */}
            <CompetencesSection
              competences={cvData.competences}
              format="europass"
            />

            {/* Idiomas */}
            <LanguagesSection languages={cvData.languages} format="europass" />

            {/* Especialización - Habilidades organizadas */}
            <SpecializationSection skills={cvData.skills} format="europass" />

            {/* Otra información */}
            <OtherInformationSection
              otherInformation={cvData.otherInformation}
              format="europass"
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
                  color: "#003399",
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
              format="europass"
              maxItems={2}
            />
          </div>
        </div>
      </div>

      {/* Página 2 - Europass sin sidebar */}
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
            <EducationSection education={cvData.education} format="europass" />

            {/* Certificaciones */}
            <CertificationsSection
              certifications={cvData.certifications}
              format="europass"
            />

            {/* Logros y Proyectos Destacados */}
            <AchievementsSection
              achievements={cvData.achievements}
              format="europass"
            />

            {/* Referencias */}
            <ReferencesSection
              references={cvData.references}
              format="europass"
            />

            {/* Habilidades Técnicas Detalladas - Solo si hay espacio */}
            {cvData.skills && cvData.skills.length > 6 && (
              <SkillsSection skills={cvData.skills} format="europass" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
