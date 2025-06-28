import React from "react";

interface OtherInformationSectionProps {
  drivingLicense: boolean;
  ownVehicle: boolean;
  format: "visual" | "ats";
  className?: string;
}

export const OtherInformationSection: React.FC<
  OtherInformationSectionProps
> = ({ drivingLicense, ownVehicle, format, className = "" }) => {
  // Solo mostrar la sección si hay al menos uno de los datos
  if (!drivingLicense && !ownVehicle) {
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
            Other Information
          </h3>
        </div>

        <div
          style={{ display: "flex", gap: "0.75rem", flexDirection: "column" }}
        >
          {drivingLicense && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <div
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  background: "#ffffff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#0d9488", fontSize: "0.75rem" }}>
                  🚗
                </span>
              </div>
              <span style={{ color: "#ffffff", fontSize: "0.875rem" }}>
                Carnet de conducir
              </span>
            </div>
          )}

          {ownVehicle && (
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <div
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  background: "#ffffff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#0d9488", fontSize: "0.75rem" }}>
                  🔑
                </span>
              </div>
              <span style={{ color: "#ffffff", fontSize: "0.875rem" }}>
                Vehículo propio
              </span>
            </div>
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
        OTRA INFORMACIÓN
      </h2>
      <ul style={{ color: "#000000", lineHeight: "1.6", paddingLeft: "1rem" }}>
        {drivingLicense && <li>Carnet de conducir</li>}
        {ownVehicle && <li>Vehículo propio</li>}
      </ul>
    </div>
  );
};
