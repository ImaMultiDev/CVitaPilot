import React from "react";
import { Experience, CVFormat } from "@/types/cv";

interface ExperienceSectionProps {
  experiences: Experience[];
  format: CVFormat;
  maxItems?: number;
  className?: string;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  format,
  maxItems = 10,
  className = "",
}) => {
  const selectedExperiences = experiences
    ?.filter((exp) => exp.selected)
    .slice(0, maxItems);

  if (!selectedExperiences || selectedExperiences.length === 0) {
    return null;
  }

  if (format === "visual") {
    return (
      <div className={className} style={{ marginBottom: "2rem" }}>
        <h2 className="cv-section-title">Experiencia Laboral</h2>
        {selectedExperiences.map((experience, index) => (
          <div
            key={index}
            className="flex flex-col mb-4 pb-2 border-b-2 border-dotted border-gray-200"
          >
            {/* Header con puesto y etiqueta de contrato */}
            <div className="flex justify-between gap-1 flex-col">
              <h3 className="text-lg font-bold">{experience.position}</h3>
              <span className="font-[0.75rem] text-xs weight-500 p-1 rounded-md bg-[#e0f2fe] text-[#0891b2] whitespace-nowrap">
                ({experience.contractType}, {experience.workSchedule},{" "}
                {experience.workModality})
              </span>
            </div>

            {/* Empresa y fechas */}
            <div className="flex mt-1 justify-between  flex-col">
              <div className="flex justify-between items-center">
                <h4
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  {experience.company}
                </h4>
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    fontWeight: "500",
                  }}
                >
                  {experience.startDate} - {experience.endDate}
                </span>
              </div>
              <p
                style={{ fontSize: "0.875rem", color: "#6b7280", margin: "0" }}
              >
                {experience.location}
              </p>
            </div>

            {/* Tecnologías */}
            {experience.technologies && experience.technologies.length > 0 && (
              <div style={{ marginBottom: "0.25rem" }}>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#374151",
                    margin: "0",
                  }}
                >
                  <span style={{ fontWeight: "600", color: "#0f766e" }}>
                    Tecnologías:
                  </span>{" "}
                  {experience.technologies.join(", ")}
                </p>
              </div>
            )}

            {/* Descripción */}
            {experience.description && (
              <div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#374151",
                    lineHeight: "1.4",
                    margin: "0",
                    whiteSpace: "pre-line",
                  }}
                >
                  <span style={{ fontWeight: "600", color: "#0f766e" }}>
                    Descripción:
                  </span>{" "}
                  {experience.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (format === "europass") {
    return (
      <div className={className} style={{ marginBottom: "2rem" }}>
        <h2 className="cv-section-title europass">Experiencia Laboral</h2>
        {selectedExperiences.map((experience, index) => (
          <div
            key={index}
            className="flex flex-col mb-4 pb-2 border-b-2 border-dotted border-gray-200"
          >
            {/* Header con puesto y etiqueta de contrato */}
            <div className="flex justify-between gap-1 flex-col">
              <h3 className="text-lg font-bold">{experience.position}</h3>
              <span className="font-[0.75rem] text-xs weight-500 p-1 rounded-md bg-[#e6f3ff] text-[#003399] whitespace-nowrap">
                ({experience.contractType}, {experience.workSchedule},{" "}
                {experience.workModality})
              </span>
            </div>

            {/* Empresa y fechas */}
            <div className="flex mt-1 justify-between  flex-col">
              <div className="flex justify-between items-center">
                <h4
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  {experience.company}
                </h4>
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    fontWeight: "500",
                  }}
                >
                  {experience.startDate} - {experience.endDate}
                </span>
              </div>
              <p
                style={{ fontSize: "0.875rem", color: "#6b7280", margin: "0" }}
              >
                {experience.location}
              </p>
            </div>

            {/* Tecnologías */}
            {experience.technologies && experience.technologies.length > 0 && (
              <div style={{ marginBottom: "0.25rem" }}>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#374151",
                    margin: "0",
                  }}
                >
                  <span style={{ fontWeight: "600", color: "#003399" }}>
                    Tecnologías:
                  </span>{" "}
                  {experience.technologies.join(", ")}
                </p>
              </div>
            )}

            {/* Descripción */}
            {experience.description && (
              <div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#374151",
                    lineHeight: "1.4",
                    margin: "0",
                    whiteSpace: "pre-line",
                  }}
                >
                  <span style={{ fontWeight: "600", color: "#003399" }}>
                    Descripción:
                  </span>{" "}
                  {experience.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Formato ATS
  return (
    <div className={className} style={{ marginBottom: "2rem" }}>
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
        EXPERIENCIA LABORAL
      </h2>
      <div style={{ marginTop: "1rem" }}>
        {selectedExperiences.map((experience, index) => (
          <div key={index} style={{ marginTop: "1rem" }}>
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#000000",
                lineHeight: "1.2",
              }}
            >
              {experience.position}
            </span>
            <span style={{ fontSize: "0.8rem", color: "#000000" }}>
              {" ("}
              {experience.startDate} / {experience.endDate}
              {")"}
            </span>
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: "500",
                color: "#000000",
              }}
            >
              {experience.company} | {experience.location}
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                marginBottom: "0.5rem",
                color: "#000000",
              }}
            >
              {" "}
            </p>
            {experience.description && (
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#000000",
                  marginBottom: "0.5rem",
                  lineHeight: "1.4",
                  whiteSpace: "pre-line",
                }}
              >
                {experience.description}
              </p>
            )}
            {experience.technologies && experience.technologies.length > 0 && (
              <p style={{ fontSize: "0.875rem", color: "#000000" }}>
                Tecnologías: {experience.technologies.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
