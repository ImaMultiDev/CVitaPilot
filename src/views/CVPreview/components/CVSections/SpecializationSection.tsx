import React from "react";
import { Skill, CVFormat } from "@/types/cv";

interface SpecializationSectionProps {
  skills: Skill[];
  format: CVFormat;
  className?: string;
}

export const SpecializationSection: React.FC<SpecializationSectionProps> = ({
  skills,
  format,
  className = "",
}) => {
  const selectedSkills = skills?.filter((skill) => skill.selected);

  if (!selectedSkills || selectedSkills.length === 0) {
    return null;
  }

  // Organizar skills por categorías específicas para el sidebar
  const getSkillsByType = (type: string) => {
    const typeMap: Record<string, string[]> = {
      programming: [
        "kotlin",
        "swift",
        "javascript",
        "typescript",
        "python",
        "java",
        "c#",
        "php",
      ],
      frameworks: [
        "react",
        "next.js",
        "tailwind",
        "angular",
        "astro",
        "spring boot",
        "flutter",
        "react native",
        "swift ui",
      ],
      databases: ["postgresql", "mysql", "mongodb", "firebase", "prisma"],
      tools: ["node.js", "jira", "git", "docker", "webpack", "vite"],
      libraries: ["prisma", "nextauth", "formik", "zod", "axios", "lodash"],
    };

    return selectedSkills
      .filter((skill) =>
        typeMap[type]?.some((keyword) =>
          skill.name.toLowerCase().includes(keyword.toLowerCase())
        )
      )
      .map((skill) => skill.name);
  };

  const programmingLanguages = getSkillsByType("programming");
  const frameworks = getSkillsByType("frameworks");
  const databases = getSkillsByType("databases");
  const tools = getSkillsByType("tools");
  const libraries = getSkillsByType("libraries");

  if (format === "visual") {
    return (
      <div className={className} style={{ marginBottom: "1rem" }}>
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
            Especialización
          </h3>
        </div>

        <div
          style={{ display: "flex", gap: "0.75rem", flexDirection: "column" }}
        >
          {programmingLanguages.length > 0 && (
            <div>
              <h4
                style={{
                  color: "#ffffff",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  fontSize: "0.75rem",
                }}
              >
                Lenguajes de Programación:
              </h4>
              <p
                style={{
                  color: "#e5e7eb",
                  fontSize: "0.7rem",
                  lineHeight: "1.4",
                }}
              >
                {programmingLanguages.slice(0, 3).join(", ")}
              </p>
            </div>
          )}

          {frameworks.length > 0 && (
            <div>
              <h4
                style={{
                  color: "#ffffff",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  fontSize: "0.75rem",
                }}
              >
                Frameworks:
              </h4>
              <p
                style={{
                  color: "#e5e7eb",
                  fontSize: "0.7rem",
                  lineHeight: "1.4",
                }}
              >
                {frameworks.slice(0, 5).join(", ")}
              </p>
            </div>
          )}

          {databases.length > 0 && (
            <div>
              <h4
                style={{
                  color: "#ffffff",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  fontSize: "0.75rem",
                }}
              >
                Bases de Datos:
              </h4>
              <p
                style={{
                  color: "#e5e7eb",
                  fontSize: "0.7rem",
                  lineHeight: "1.4",
                }}
              >
                {databases.slice(0, 4).join(", ")}
              </p>
            </div>
          )}

          {tools.length > 0 && (
            <div>
              <h4
                style={{
                  color: "#ffffff",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  fontSize: "0.75rem",
                }}
              >
                Herramientas:
              </h4>
              <p
                style={{
                  color: "#e5e7eb",
                  fontSize: "0.7rem",
                  lineHeight: "1.4",
                }}
              >
                {tools.slice(0, 3).join(", ")}
              </p>
            </div>
          )}

          {libraries.length > 0 && (
            <div>
              <h4
                style={{
                  color: "#ffffff",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  fontSize: "0.75rem",
                }}
              >
                Librerías:
              </h4>
              <p
                style={{
                  color: "#e5e7eb",
                  fontSize: "0.7rem",
                  lineHeight: "1.4",
                }}
              >
                {libraries.slice(0, 4).join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (format === "europass") {
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
              fontSize: "0.875rem",
              fontWeight: "bold",
              color: "#ffffff",
              lineHeight: "1.75rem",
            }}
          >
            Specialization
          </h3>
        </div>

        <div
          style={{ display: "flex", gap: "0.75rem", flexDirection: "column" }}
        >
          {programmingLanguages.length > 0 && (
            <div>
              <h4
                style={{
                  color: "#ffffff",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  fontSize: "0.75rem",
                }}
              >
                Lenguajes de Programación:
              </h4>
              <p
                style={{
                  color: "#e5e7eb",
                  fontSize: "0.7rem",
                  lineHeight: "1.4",
                }}
              >
                {programmingLanguages.slice(0, 3).join(", ")}
              </p>
            </div>
          )}

          {frameworks.length > 0 && (
            <div>
              <h4
                style={{
                  color: "#ffffff",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  fontSize: "0.75rem",
                }}
              >
                Frameworks:
              </h4>
              <p
                style={{
                  color: "#e5e7eb",
                  fontSize: "0.7rem",
                  lineHeight: "1.4",
                }}
              >
                {frameworks.slice(0, 5).join(", ")}
              </p>
            </div>
          )}

          {databases.length > 0 && (
            <div>
              <h4
                style={{
                  color: "#ffffff",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  fontSize: "0.75rem",
                }}
              >
                Bases de Datos:
              </h4>
              <p
                style={{
                  color: "#e5e7eb",
                  fontSize: "0.7rem",
                  lineHeight: "1.4",
                }}
              >
                {databases.slice(0, 4).join(", ")}
              </p>
            </div>
          )}

          {tools.length > 0 && (
            <div>
              <h4
                style={{
                  color: "#ffffff",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  fontSize: "0.75rem",
                }}
              >
                Herramientas:
              </h4>
              <p
                style={{
                  color: "#e5e7eb",
                  fontSize: "0.7rem",
                  lineHeight: "1.4",
                }}
              >
                {tools.slice(0, 3).join(", ")}
              </p>
            </div>
          )}

          {libraries.length > 0 && (
            <div>
              <h4
                style={{
                  color: "#ffffff",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  fontSize: "0.75rem",
                }}
              >
                Librerías:
              </h4>
              <p
                style={{
                  color: "#e5e7eb",
                  fontSize: "0.7rem",
                  lineHeight: "1.4",
                }}
              >
                {libraries.slice(0, 4).join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};
