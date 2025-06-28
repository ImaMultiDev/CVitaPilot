import React from "react";
import { Certification } from "@/types/cv";

interface CertificationsSectionProps {
  certifications: Certification[];
  format: "visual" | "ats";
  className?: string;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  format,
  className = "",
}) => {
  const selectedCertifications = certifications?.filter(
    (cert) => cert.selected
  );

  if (!selectedCertifications || selectedCertifications.length === 0) {
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
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          Certificaciones
        </h2>
        {selectedCertifications.map((certification, index) => (
          <div key={index} style={{ marginBottom: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "0.5rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#374151",
                  lineHeight: "1.5rem",
                }}
              >
                {certification.name}
              </h3>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  fontWeight: "500",
                }}
              >
                {certification.date}
              </span>
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#374151",
                marginBottom: "0.25rem",
              }}
            >
              {certification.issuer}
            </p>
            {certification.credentialId && (
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#6b7280",
                  marginBottom: "0.25rem",
                }}
              >
                <strong>ID:</strong> {certification.credentialId}
              </p>
            )}
            {certification.url && (
              <p style={{ fontSize: "0.75rem", color: "#0891b2" }}>
                <strong>Verificación:</strong> {certification.url}
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
        CERTIFICACIONES
      </h2>
      {selectedCertifications.map((certification, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#000000" }}>
            {certification.name}
          </h3>
          <p style={{ fontWeight: "500", color: "#000000" }}>
            {certification.issuer} - {certification.date}
          </p>
          {certification.credentialId && (
            <p style={{ fontSize: "0.875rem", color: "#000000" }}>
              ID: {certification.credentialId}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
