import React from "react";
import { OtherInformation, CVFormat } from "@/types/cv";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

interface OtherInformationSectionProps {
  otherInformation: OtherInformation[];
  format: CVFormat;
  className?: string;
}

export const OtherInformationSection: React.FC<
  OtherInformationSectionProps
> = ({ otherInformation, format, className = "" }) => {
  const selectedItems = otherInformation.filter((item) => item.selected);

  const allItems = [...selectedItems];

  // Solo mostrar la sección si hay al menos uno de los datos
  if (allItems.length === 0) {
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
              lineHeight: "0.2rem",
            }}
          >
            Other Information
          </h3>
        </div>

        <div
          style={{ display: "flex", gap: "0.5rem", flexDirection: "column" }}
        >
          {allItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  flexShrink: 0,
                }}
              >
                <ConfiguredIcon
                  name="check-circle"
                  className="w-3 h-3 text-teal-600 opacity-50"
                />
              </div>
              <span style={{ color: "#ffffff", fontSize: "0.75rem" }}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (format === "europass") {
    return (
      <div className={className} style={{ marginBottom: "0.75rem" }}>
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
            Other Information
          </h3>
        </div>

        <div
          style={{ display: "flex", gap: "0.5rem", flexDirection: "column" }}
        >
          {allItems.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <div
                style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  flexShrink: 0,
                }}
              >
                <ConfiguredIcon
                  name="check-circle"
                  className="w-3 h-3 text-blue-600 opacity-50"
                />
              </div>
              <span style={{ color: "#ffffff", fontSize: "0.75rem" }}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
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
          marginBottom: "1rem",
          paddingBottom: "0.25rem",
          borderBottom: "1px solid #000000",
          color: "#000000",
          lineHeight: "1.75rem",
        }}
      >
        OTRA INFORMACIÓN
      </h2>
      <div style={{ marginTop: "1rem" }}>
        <ul
          style={{
            color: "#000000",
            lineHeight: "1.6",
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {allItems.map((item) => (
            <li key={item.id}>
              {item.name}
              {"."}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
