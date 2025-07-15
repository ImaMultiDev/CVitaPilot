import React from "react";
import { PersonalInfo, CVFormat } from "@/types/cv";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  format: CVFormat;
  className?: string;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  personalInfo,
  format,
  className = "",
}) => {
  if (format === "visual") {
    // Buscar GitHub en socialNetworks
    const githubNetwork = personalInfo?.socialNetworks?.find(
      (social) => social.name.toLowerCase() === "github"
    );

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
              lineHeight: "0.2rem",
            }}
          >
            Datos Personales
          </h3>
        </div>

        <div
          style={{ display: "flex", gap: "0.5rem", flexDirection: "column" }}
        >
          {personalInfo?.phone && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "0.125rem",
                }}
              >
                <span style={{ color: "#ffffff", fontSize: "0.75rem" }}>
                  <ConfiguredIcon name="phone" className="w-4 h-4 opacity-30" />
                </span>
              </div>
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                }}
              >
                {personalInfo.phone}
              </span>
            </div>
          )}

          {personalInfo?.email && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "0.125rem",
                }}
              >
                <span style={{ color: "#ffffff", fontSize: "0.75rem" }}>
                  <ConfiguredIcon name="mail" className="w-4 h-4 opacity-30" />
                </span>
              </div>
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "0.75rem",
                  lineHeight: "1.4",
                  wordBreak: "break-all",
                }}
              >
                {personalInfo.email}
              </span>
            </div>
          )}

          {personalInfo?.linkedin && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "0.125rem",
                }}
              >
                <span style={{ color: "#ffffff", fontSize: "0.75rem" }}>
                  <ConfiguredIcon name="linkedin" className="w-4 h-4" />
                </span>
              </div>
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "0.7rem",
                  lineHeight: "1.3",
                  wordBreak: "break-all",
                }}
              >
                {personalInfo.linkedin}
              </span>
            </div>
          )}

          {githubNetwork && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "0.125rem",
                }}
              >
                <span style={{ color: "#ffffff", fontSize: "0.75rem" }}>
                  <ConfiguredIcon
                    name="github"
                    className="w-4 h-4 opacity-50"
                  />
                </span>
              </div>
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "0.7rem",
                  lineHeight: "1.3",
                  wordBreak: "break-all",
                }}
              >
                {githubNetwork.url}
              </span>
            </div>
          )}

          {personalInfo?.website && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "0.125rem",
                }}
              >
                <span style={{ color: "#ffffff", fontSize: "0.75rem" }}>
                  <ConfiguredIcon name="globe" className="w-4 h-4 opacity-30" />
                </span>
              </div>
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "0.7rem",
                  lineHeight: "1.3",
                  wordBreak: "break-all",
                }}
              >
                {personalInfo.website}
              </span>
            </div>
          )}

          {personalInfo?.location && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "0.125rem",
                }}
              >
                <span style={{ color: "#ffffff", fontSize: "0.75rem" }}>
                  <ConfiguredIcon
                    name="map-pin"
                    className="w-4 h-4 opacity-50"
                  />
                </span>
              </div>
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                }}
              >
                {personalInfo.location}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (format === "europass") {
    // Buscar GitHub en socialNetworks
    const githubNetwork = personalInfo?.socialNetworks?.find(
      (social) => social.name.toLowerCase() === "github"
    );

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
            Datos Personales
          </h3>
        </div>

        <div
          style={{ display: "flex", gap: "0.5rem", flexDirection: "column" }}
        >
          {personalInfo?.phone && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "0.125rem",
                }}
              >
                <span style={{ color: "#ffffff", fontSize: "0.75rem" }}>
                  <ConfiguredIcon name="phone" className="w-4 h-4 opacity-30" />
                </span>
              </div>
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                }}
              >
                {personalInfo.phone}
              </span>
            </div>
          )}

          {personalInfo?.email && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "0.125rem",
                }}
              >
                <span style={{ color: "#ffffff", fontSize: "0.75rem" }}>
                  <ConfiguredIcon name="mail" className="w-4 h-4 opacity-30" />
                </span>
              </div>
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "0.75rem",
                  lineHeight: "1.4",
                  wordBreak: "break-all",
                }}
              >
                {personalInfo.email}
              </span>
            </div>
          )}

          {personalInfo?.linkedin && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "0.125rem",
                }}
              >
                <span style={{ color: "#ffffff", fontSize: "0.75rem" }}>
                  <ConfiguredIcon name="linkedin" className="w-4 h-4" />
                </span>
              </div>
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "0.7rem",
                  lineHeight: "1.3",
                  wordBreak: "break-all",
                }}
              >
                {personalInfo.linkedin}
              </span>
            </div>
          )}

          {githubNetwork && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "0.125rem",
                }}
              >
                <span style={{ color: "#ffffff", fontSize: "0.75rem" }}>
                  <ConfiguredIcon
                    name="github"
                    className="w-4 h-4 opacity-50"
                  />
                </span>
              </div>
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "0.7rem",
                  lineHeight: "1.3",
                  wordBreak: "break-all",
                }}
              >
                {githubNetwork.url}
              </span>
            </div>
          )}

          {personalInfo?.website && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "0.125rem",
                }}
              >
                <span style={{ color: "#ffffff", fontSize: "0.75rem" }}>
                  <ConfiguredIcon name="globe" className="w-4 h-4 opacity-30" />
                </span>
              </div>
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "0.7rem",
                  lineHeight: "1.3",
                  wordBreak: "break-all",
                }}
              >
                {personalInfo.website}
              </span>
            </div>
          )}

          {personalInfo?.location && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "0.125rem",
                }}
              >
                <span style={{ color: "#ffffff", fontSize: "0.75rem" }}>
                  <ConfiguredIcon
                    name="map-pin"
                    className="w-4 h-4 opacity-50"
                  />
                </span>
              </div>
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                }}
              >
                {personalInfo.location}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Formato ATS optimizado para máquinas
  const githubNetwork = personalInfo?.socialNetworks?.find(
    (social) => social.name.toLowerCase() === "github"
  );

  return (
    <div className={className} style={{ marginTop: "1rem" }}>
      {/* Nombre completo */}
      <h1
        style={{
          fontSize: "1.75rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
          color: "#000000",
          textAlign: "center",
          lineHeight: "2rem",
        }}
      >
        {personalInfo?.name || ""}
      </h1>

      {/* Puesto objetivo */}
      <h2
        style={{
          fontSize: "1.25rem",
          marginBottom: "1rem",
          color: "#000000",
          textAlign: "center",
          fontWeight: "normal",
          lineHeight: "1.75rem",
        }}
      >
        {personalInfo?.position || ""}
      </h2>

      {/* Línea separadora */}
      <hr
        style={{
          border: "none",
          borderTop: "2px solid #000000",
          margin: "1rem 0",
        }}
      />

      {/* Información de contacto en 2 columnas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.5rem",
          marginTop: "0.5rem",
          fontSize: "0.8rem",
          color: "#000000",
        }}
      >
        {/* Columna izquierda */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {personalInfo?.phone && (
            <div>
              <strong>Teléfono:</strong> {personalInfo.phone}
            </div>
          )}
          {personalInfo?.email && (
            <div>
              <strong>Email:</strong> {personalInfo.email}
            </div>
          )}
          {personalInfo?.location && (
            <div>
              <strong>Ubicación:</strong> {personalInfo.location}
            </div>
          )}
        </div>

        {/* Columna derecha */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {personalInfo?.linkedin && (
            <div>
              <strong>LinkedIn:</strong> {personalInfo.linkedin}
            </div>
          )}
          {personalInfo?.website && (
            <div>
              <strong>Website:</strong> {personalInfo.website}
            </div>
          )}
          {githubNetwork && (
            <div>
              <strong>GitHub:</strong> {githubNetwork.url}
            </div>
          )}
          {personalInfo?.socialNetworks &&
            personalInfo.socialNetworks.length > 0 &&
            personalInfo.socialNetworks
              .filter((social) => social.name.toLowerCase() !== "github")
              .slice(0, 2)
              .map((social, index) => (
                <div key={index}>
                  <strong>{social.name}:</strong> {social.url}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};
