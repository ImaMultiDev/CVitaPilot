"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CVData } from "@/types/cv";

interface CVPreviewPrismaProps {
  cvData: CVData;
  currentCVName?: string | null;
}

export const CVPreviewPrisma: React.FC<CVPreviewPrismaProps> = ({
  cvData,
  currentCVName,
}) => {
  // Export to PDF function
  const handleExportPDF = () => {
    // Set print title
    const originalTitle = document.title;
    const fileName = `CV_${cvData.personalInfo.name.replace(/\s+/g, "_")}`;
    document.title = fileName;

    // Trigger print dialog (user can save as PDF)
    window.print();

    // Restore original title
    setTimeout(() => {
      document.title = originalTitle;
    }, 100);
  };

  // Filter selected items
  const selectedSkills = cvData.skills.filter((skill) => skill.selected);
  const selectedCompetences = cvData.competences.filter(
    (comp) => comp.selected
  );
  const selectedExperiences = cvData.experiences.filter((exp) => exp.selected);
  const selectedEducation = cvData.education.filter((edu) => edu.selected);

  // Group skills by category
  const skillsByCategory = selectedSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof selectedSkills>);

  // Separate formal and additional education
  const formalEducation = selectedEducation.filter(
    (edu) => edu.type === "formal"
  );
  const additionalEducation = selectedEducation.filter(
    (edu) => edu.type === "additional"
  );

  const categoryNames = {
    language: "Lenguajes de Programación",
    framework: "Frameworks",
    database: "Bases de Datos",
    tool: "Herramientas",
    library: "Librerías",
    orm: "ORM",
    ai: "IA",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* CV Active Indicator */}
      {currentCVName && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm no-print">
          <div className="text-center">
            <p className="text-blue-800">
              <span className="font-semibold">📄 Previsualizando CV:</span>{" "}
              {currentCVName}
            </p>
          </div>
        </div>
      )}

      {/* Export Controls */}
      <div className="text-center mb-6 no-print">
        <Button onClick={handleExportPDF} variant="primary" size="sm">
          📥 Exportar a PDF
        </Button>
      </div>

      {/* CV Content */}
      <div className="bg-white p-8 print-content">
        {/* Header */}
        <div className="text-center border-b pb-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {cvData.personalInfo.name}
          </h1>
          <h2 className="text-xl text-gray-600 mb-4">
            {cvData.personalInfo.position}
          </h2>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span>📧 {cvData.personalInfo.email}</span>
            <span>📱 {cvData.personalInfo.phone}</span>
            <span>📍 {cvData.personalInfo.location}</span>
            {cvData.personalInfo.linkedin && <span>🔗 LinkedIn</span>}
            {cvData.personalInfo.github && <span>💻 GitHub</span>}
            {cvData.personalInfo.website && <span>🌐 Web</span>}
          </div>

          {(cvData.drivingLicense || cvData.ownVehicle) && (
            <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
              {cvData.drivingLicense && <span>🚗 Carnet de conducir</span>}
              {cvData.ownVehicle && <span>🚙 Vehículo propio</span>}
            </div>
          )}
        </div>

        {/* About Me */}
        {cvData.aboutMe && (
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b pb-1">
              Perfil Profesional
            </h3>
            <p className="text-gray-700 leading-relaxed">{cvData.aboutMe}</p>
          </section>
        )}

        {/* Experience */}
        {selectedExperiences.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-1">
              Experiencia Laboral
            </h3>
            <div className="space-y-4">
              {selectedExperiences.map((exp) => (
                <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-gray-900">
                      {exp.position}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {exp.startDate} - {exp.endDate || "Presente"}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-600 mb-2">{exp.location}</p>
                  <p className="text-gray-700 mb-2">{exp.description}</p>
                  {exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {exp.technologies.map((tech, index) => (
                        <Badge key={index} variant="info">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {selectedEducation.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-1">
              Formación
            </h3>

            {/* Formal Education */}
            {formalEducation.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-3">
                  Formación Oficial
                </h4>
                <div className="space-y-3">
                  {formalEducation.map((edu) => (
                    <div
                      key={edu.id}
                      className="border-l-2 border-gray-200 pl-4"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-semibold text-gray-900">
                          {edu.title}
                        </h5>
                        <span className="text-sm text-gray-500">
                          {edu.startYear} - {edu.endYear}
                        </span>
                      </div>
                      <p className="text-gray-700">{edu.institution}</p>
                      <p className="text-sm text-gray-600">{edu.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Education */}
            {additionalEducation.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 mb-3">
                  Formación Adicional
                </h4>
                <div className="space-y-3">
                  {additionalEducation.map((edu) => (
                    <div
                      key={edu.id}
                      className="border-l-2 border-gray-200 pl-4"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-semibold text-gray-900">
                          {edu.title}
                        </h5>
                        <span className="text-sm text-gray-500">
                          {edu.startYear} - {edu.endYear}
                          {edu.duration && ` (${edu.duration})`}
                        </span>
                      </div>
                      <p className="text-gray-700">{edu.institution}</p>
                      <p className="text-sm text-gray-600">{edu.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Skills */}
        {selectedSkills.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-1">
              Habilidades Técnicas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category}>
                  <h4 className="font-medium text-gray-800 mb-2">
                    {categoryNames[category as keyof typeof categoryNames] ||
                      category}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {skills.map((skill) => (
                      <Badge key={skill.id} variant="success">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Competences */}
        {selectedCompetences.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-1">
              Competencias Profesionales
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedCompetences.map((comp) => (
                <Badge key={comp.id} variant="warning">
                  {comp.name}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {cvData.languages.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-1">
              Idiomas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {cvData.languages.map((lang) => (
                <div
                  key={lang.id}
                  className="text-center border rounded-lg p-3"
                >
                  <div className="font-medium text-gray-900">{lang.name}</div>
                  <div className="text-sm text-gray-600">{lang.level}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <div className="text-center pt-6 border-t text-sm text-gray-500">
          Curriculum generado con CV Gestor - Sistema Prisma + PostgreSQL
        </div>
      </div>
    </div>
  );
};
