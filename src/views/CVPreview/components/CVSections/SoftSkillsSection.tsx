import React from "react";
import { SoftSkill, CVFormat } from "@/types/cv";

interface SoftSkillsSectionProps {
  softSkills: SoftSkill[];
  format: CVFormat;
  className?: string;
}

export const SoftSkillsSection: React.FC<SoftSkillsSectionProps> = ({
  softSkills,
  format,
  className = "",
}) => {
  const selectedSoftSkills = softSkills?.filter((skill) => skill.selected);

  if (!selectedSoftSkills || selectedSoftSkills.length === 0) {
    return null;
  }

  if (format === "ats") {
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
          HABILIDADES BLANDAS
        </h2>
        <div style={{ marginTop: "1rem" }}>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#000000",
              lineHeight: "1.6",
            }}
          >
            {selectedSoftSkills.map((skill) => skill.name).join(", ")}
          </p>
        </div>
      </div>
    );
  }

  return null; // Visual format not needed for soft skills
};
