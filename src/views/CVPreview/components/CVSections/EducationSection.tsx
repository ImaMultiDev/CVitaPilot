import React from "react";
import { Education, CVFormat } from "@/types/cv";

interface EducationSectionProps {
  education: Education[];
  format: CVFormat;
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
      <div className={className} style={{ marginBottom: "1rem" }}>
        <h2 className="cv-section-title">Formación Académica</h2>
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

  if (format === "europass") {
    return (
      <div className={className} style={{ marginBottom: "1rem" }}>
        <h2 className="cv-section-title europass">Formación Académica</h2>
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
        FORMACIÓN ACADÉMICA
      </h2>
      <div style={{ marginTop: "1rem" }}>
        {selectedEducation.map((edu, index) => (
          <div key={index} style={{ marginTop: "0.75rem" }}>
            <div>
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#000000",
                  lineHeight: "1.2",
                }}
              >
                {edu.title}
              </span>

              <span style={{ fontSize: "0.8rem", color: "#000000" }}>
                {" ("}
                {edu.startYear} - {edu.endYear}
                {")"}
              </span>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#000000",
                  marginBottom: "0.25rem",
                }}
              >
                {edu.institution} | {edu.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
