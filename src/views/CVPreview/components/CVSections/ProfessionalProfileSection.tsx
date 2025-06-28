import React from "react";

interface ProfessionalProfileSectionProps {
  professionalProfile?: string;
  format: "visual" | "ats";
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
      <div className={className} style={{ marginBottom: "1.5rem" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            paddingBottom: "0.25rem",
            borderBottom: "1px solid #000000",
            color: "#000000",
            lineHeight: "1.75rem",
          }}
        >
          PERFIL PROFESIONAL
        </h2>
        <p
          style={{
            color: "#000000",
            lineHeight: "1.6",
            textAlign: "justify",
          }}
        >
          {professionalProfile}
        </p>
      </div>
    );
  }

  // Format visual no implementado para esta sección específica
  return null;
};
