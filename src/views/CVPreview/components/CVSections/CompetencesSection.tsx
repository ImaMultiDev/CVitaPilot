import React from "react";
import { Competence, CVFormat } from "@/types/cv";

interface CompetencesSectionProps {
  competences: Competence[];
  format: CVFormat;
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
              lineHeight: "0.2rem",
            }}
          >
            Competencias
          </h3>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            padding: "0 0.5rem",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: "0.75rem",
              lineHeight: "1.4",
              wordBreak: "break-word",
            }}
          >
            {selectedCompetences
              .map((competence) => competence.name)
              .join(", ")}
          </span>
        </div>
      </div>
    );
  }

  if (format === "europass") {
    return (
      <div className={className} style={{ marginBottom: "1rem" }}>
        {/* Header con fondo azul europeo */}
        <div
          style={{
            background: "#003399",
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
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            padding: "0 0.5rem",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: "0.75rem",
              lineHeight: "1.4",
              wordBreak: "break-word",
            }}
          >
            {selectedCompetences
              .map((competence) => competence.name)
              .join(", ")}
          </span>
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
