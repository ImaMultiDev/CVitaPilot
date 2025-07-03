import React from "react";
import { Achievement } from "@/types/cv";

interface AchievementsSectionProps {
  achievements: Achievement[];
  format: "visual" | "ats";
  className?: string;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
  format,
  className = "",
}) => {
  const selectedAchievements = achievements?.filter(
    (achievement) => achievement.selected
  );

  if (!selectedAchievements || selectedAchievements.length === 0) {
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
          Logros y Proyectos Destacados
        </h2>
        {selectedAchievements.map((achievement, index) => (
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
                  color: achievement.type === "project" ? "#7c3aed" : "#dc2626",
                  lineHeight: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {achievement.type === "project" ? "🔧" : "🎯"}{" "}
                {achievement.title}
              </h3>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  fontWeight: "500",
                }}
              >
                {achievement.date}
              </span>
            </div>

            {achievement.company && (
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#374151",
                  marginBottom: "0.5rem",
                }}
              >
                <strong>{achievement.company}</strong>
              </p>
            )}

            <p
              style={{
                fontSize: "0.875rem",
                color: "#374151",
                marginBottom: "0.5rem",
                lineHeight: "1.4",
              }}
            >
              {achievement.description}
            </p>

            {achievement.technologies &&
              achievement.technologies.length > 0 && (
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  <strong>Tecnologías:</strong>{" "}
                  {achievement.technologies.join(", ")}
                </p>
              )}

            {achievement.metrics && (
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#059669",
                  fontWeight: "600",
                  marginBottom: "0.25rem",
                }}
              >
                <strong>Impacto:</strong> {achievement.metrics}
              </p>
            )}

            {achievement.url && (
              <p style={{ fontSize: "0.75rem", color: "#0891b2" }}>
                <strong>URL:</strong> {achievement.url}
              </p>
            )}
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
        LOGROS Y PROYECTOS
      </h2>
      <div style={{ marginTop: "1rem" }}>
        {selectedAchievements.map((achievement, index) => (
          <div key={index} style={{ marginTop: "1rem" }}>
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#000000",
              }}
            >
              {achievement.title}
            </span>

            <span
              style={{
                fontSize: "0.8rem",
                color: "##2563eb",
                marginBottom: "0.25rem",
              }}
            >
              {" ("}
              {achievement.url}
              {")"}
            </span>

            <p
              style={{
                fontSize: "0.875rem",
                color: "#000000",
                marginBottom: "0.25rem",
              }}
            >
              {achievement.description}
            </p>
            {achievement.technologies &&
              achievement.technologies.length > 0 && (
                <p style={{ fontSize: "0.875rem", color: "#000000" }}>
                  Tecnologías: {achievement.technologies.join(", ")}
                </p>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};
