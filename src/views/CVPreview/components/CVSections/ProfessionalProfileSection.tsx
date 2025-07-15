import React from "react";
import { CVFormat } from "@/types/cv";

interface ProfessionalProfileSectionProps {
  professionalProfile?: string;
  format: CVFormat;
  className?: string;
}

export const ProfessionalProfileSection: React.FC<
  ProfessionalProfileSectionProps
> = ({ professionalProfile, format, className = "" }) => {
  if (!professionalProfile?.trim()) {
    return null;
  }

  if (format === "ats") {
    return (
      <div className={className} style={{ marginBottom: "1rem" }}>
        <h2
          style={{
            fontSize: "0.875rem",
            fontWeight: "bold",
            marginBottom: "0.75rem",
            paddingBottom: "0.25rem",
            borderBottom: "1px solid #000000",
            color: "#000000",
            lineHeight: "1.2",
          }}
        >
          PERFIL PROFESIONAL
        </h2>
        <div style={{ marginTop: "1rem" }}>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#000000",
              marginTop: "1rem",
              lineHeight: "1.6",
              textAlign: "justify",
            }}
          >
            {professionalProfile}
          </p>
        </div>
      </div>
    );
  }

  if (format === "visual") {
    return (
      <div className={className} style={{ marginBottom: "2rem" }}>
        <h2 className="cv-section-title">Perfil Profesional</h2>
        <div style={{ marginTop: "1rem" }}>
          <p
            style={{
              fontSize: "1rem",
              color: "#374151",
              marginTop: "1rem",
              lineHeight: "1.6",
              textAlign: "justify",
            }}
          >
            {professionalProfile}
          </p>
        </div>
      </div>
    );
  }

  if (format === "europass") {
    return (
      <div className={className} style={{ marginBottom: "2rem" }}>
        <h2 className="cv-section-title europass">Perfil Profesional</h2>
        <div style={{ marginTop: "1rem" }}>
          <div
            style={{
              fontSize: "1rem",
              color: "#374151",
              marginTop: "1rem",
              lineHeight: "1.6",
              textAlign: "justify",
            }}
          >
            {professionalProfile}
          </div>
        </div>
      </div>
    );
  }

  // Format visual no implementado para esta sección específica
  return null;
};
