import React from "react";
import { Reference } from "@/types/cv";

interface ReferencesSectionProps {
  references: Reference[];
  format: "visual" | "ats";
  className?: string;
}

export const ReferencesSection: React.FC<ReferencesSectionProps> = ({
  references,
  format,
  className = "",
}) => {
  const selectedReferences = references?.filter((ref) => ref.selected);

  if (!selectedReferences || selectedReferences.length === 0) {
    return null;
  }

  if (format === "visual") {
    return (
      <div className={className} style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            paddingBottom: "0.5rem",
            color: "#374151",
            borderBottom: "2px solid #14b8a6",
            lineHeight: "1.75rem",
          }}
        >
          Referencias
        </h2>
        {selectedReferences.map((reference, index) => (
          <div key={index} style={{ marginBottom: "1.5rem" }}>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "#374151",
                lineHeight: "1.5rem",
                marginBottom: "0.25rem",
              }}
            >
              {reference.name}
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#374151",
                marginBottom: "0.25rem",
                fontWeight: "500",
              }}
            >
              {reference.position} - {reference.company}
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "0.25rem",
              }}
            >
              <strong>Relación:</strong> {reference.relationship}
            </p>
            <div style={{ display: "flex", gap: "1rem", fontSize: "0.875rem" }}>
              <span style={{ color: "#6b7280" }}>
                <strong>Tel:</strong> {reference.phone}
              </span>
              <span style={{ color: "#6b7280" }}>
                <strong>Email:</strong> {reference.email}
              </span>
            </div>
            {reference.yearsWorking && (
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#6b7280",
                  marginTop: "0.25rem",
                }}
              >
                Tiempo trabajando juntos: {reference.yearsWorking}
              </p>
            )}
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
        REFERENCIAS
      </h2>
      {selectedReferences.map((reference, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#000000" }}>
            {reference.name}
          </h3>
          <p
            style={{ fontWeight: "500", color: "#000000", margin: "0.25rem 0" }}
          >
            {reference.position} - {reference.company}
          </p>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#000000",
              margin: "0.25rem 0",
            }}
          >
            {reference.relationship}
          </p>
          <p style={{ fontSize: "0.875rem", color: "#000000" }}>
            Tel: {reference.phone} | Email: {reference.email}
          </p>
        </div>
      ))}
    </div>
  );
};
