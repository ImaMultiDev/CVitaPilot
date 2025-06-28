import React from "react";
import { Education } from "@/types/cv";

interface EducationSectionProps {
  education: Education[];
  format: "visual" | "ats";
  className?: string;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  format,
  className = "",
}) => {
  const selectedEducation = education?.filter((edu) => edu.selected);

  if (!selectedEducation || selectedEducation.length === 0) {
    return null;
  }

  if (format === "visual") {
    return (
      <div className={className} style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            paddingBottom: "0.5rem",
            color: "#374151",
            borderBottom: "2px solid #14b8a6",
            lineHeight: "1.75rem",
          }}
        >
          Formación Académica
        </h2>
        {selectedEducation.map((edu, index) => (
          <div key={index} style={{ marginBottom: "1.5rem" }}>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#374151",
                lineHeight: "1.75rem",
              }}
            >
              {edu.title}
            </h3>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "500",
                color: "#374151",
                margin: "0.25rem 0",
              }}
            >
              {edu.institution}
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                margin: "0",
              }}
            >
              {edu.startYear} - {edu.endYear} | {edu.location}
            </p>
          </div>
        ))}
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
        FORMACIÓN ACADÉMICA
      </h2>
      {selectedEducation.map((edu, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <h3
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "#000000",
              lineHeight: "1.75rem",
            }}
          >
            {edu.title}
          </h3>
          <p
            style={{ fontWeight: "500", color: "#000000", margin: "0.25rem 0" }}
          >
            {edu.institution}
          </p>
          <p style={{ fontSize: "0.875rem", color: "#000000", margin: "0" }}>
            {edu.startYear} - {edu.endYear} | {edu.location}
          </p>
        </div>
      ))}
    </div>
  );
};
