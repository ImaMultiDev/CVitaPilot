import React from "react";
import { Language } from "@/types/cv";

interface LanguagesSectionProps {
  languages: Language[];
  format: "visual" | "ats";
  className?: string;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  languages,
  format,
  className = "",
}) => {
  if (!languages || languages.length === 0) {
    return null;
  }

  if (format === "visual") {
    return (
      <div className={className} style={{ marginBottom: "0.75rem" }}>
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
            Idiomas
          </h3>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          {languages.map((language, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                {language.name}
              </span>
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "0.75rem",
                  background: "rgba(255, 255, 255, 0.2)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "0.375rem",
                }}
              >
                {language.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Formato ATS
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
          IDIOMAS
        </h2>
        <div style={{ marginTop: "1rem" }}>
          {languages.map((language, index) => (
            <div key={index}>
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#000000",
                }}
              >
                {language.name}: {language.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
