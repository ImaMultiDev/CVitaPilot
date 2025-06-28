import React from "react";
import { Skill } from "@/types/cv";

interface SkillsSectionProps {
  skills: Skill[];
  format: "visual" | "ats";
  className?: string;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  format,
  className = "",
}) => {
  const selectedSkills = skills?.filter((skill) => skill.selected);

  if (!selectedSkills || selectedSkills.length === 0) {
    return null;
  }

  if (format === "visual") {
    // Agrupar habilidades por categoría
    const skillsByCategory = selectedSkills.reduce((acc, skill) => {
      const categoryName = skill.categoryName || "Sin categoría";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(skill);
      return acc;
    }, {} as Record<string, Skill[]>);

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
            Habilidades Técnicas
          </h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {Object.entries(skillsByCategory).map(
            ([categoryName, categorySkills]) => (
              <div key={categoryName}>
                <h4
                  style={{
                    color: "#ffffff",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                  }}
                >
                  {categoryName}
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  {categorySkills.map((skill, index) => (
                    <span
                      key={index}
                      style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        color: "#ffffff",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "0.375rem",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  // Formato ATS
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
        HABILIDADES TÉCNICAS
      </h2>
      <p style={{ color: "#000000", lineHeight: "1.6" }}>
        {selectedSkills.map((skill) => skill.name).join(", ")}
      </p>
    </div>
  );
};
