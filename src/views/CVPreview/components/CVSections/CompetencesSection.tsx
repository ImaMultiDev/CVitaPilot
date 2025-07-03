import React from "react";
import { Competence } from "@/types/cv";

interface CompetencesSectionProps {
  competences: Competence[];
  format: "visual" | "ats";
  className?: string;
}

export const CompetencesSection: React.FC<CompetencesSectionProps> = ({
  competences,
  format,
  className = "",
}) => {
  const selectedCompetences = competences?.filter((comp) => comp.selected);

  if (!selectedCompetences || selectedCompetences.length === 0) {
    return null;
  }

  if (format === "visual") {
    return (
      <div className={className} style={{ marginBottom: "1rem" }}>
        {/* Header con fondo turquesa */}
        <div
          style={{
            background: "#14b8a6",
            margin: "0 -1.5rem 1rem -1.5rem",
            padding: "1rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "bold",
              color: "#ffffff",
              lineHeight: "1.75rem",
            }}
          >
            Competencias
          </h3>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {selectedCompetences.map((competence, index) => (
            <div
              key={index}
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <div
                style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  background: "#ffffff",
                  borderRadius: "50%",
                  flexShrink: 0,
                }}
              />
              <span style={{ color: "#ffffff", fontSize: "0.875rem" }}>
                {competence.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Formato ATS
  return (
    <div className={className} style={{ marginBottom: "1rem" }}>
      <h2
        style={{
          fontSize: "0.875rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          paddingBottom: "0.25rem",
          borderBottom: "1px solid #000000",
          color: "#000000",
          lineHeight: "1.75rem",
        }}
      >
        COMPETENCIAS
      </h2>
      <div style={{ marginTop: "1rem" }}>
        <p
          style={{ fontSize: "0.875rem", color: "#000000", lineHeight: "1.6" }}
        >
          {selectedCompetences.map((competence) => competence.name).join(", ")}
        </p>
      </div>
    </div>
  );
};
