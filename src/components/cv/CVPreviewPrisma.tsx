"use client";

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
      <div className="text-center mb-2 no-print">
        <Button onClick={handleExportPDF} variant="primary" size="sm">
          📥 Exportar a PDF
        </Button>
        <div className="mt-3 text-xs text-gray-600 bg-gray-50 rounded-lg px-3 max-w-2xl mx-auto">
          <p className="font-medium">💡 Para un PDF limpio:</p>
          <p>
            En el diálogo de impresión, desactiva &quot;Encabezados y pies de
            página&quot; en las opciones de más configuración.
          </p>
        </div>
      </div>

      {/* CV Content */}
      <div className="bg-white print-content">
        {/* Header */}
        <div className="text-center bg-gray-700 py-6 border-b-2 border-gray-600">
          <h1 className="text-4xl font-bold text-white mb-2">
            {cvData.personalInfo.name}
          </h1>
          <h2 className="text-xl text-gray-300">
            {cvData.personalInfo.position}
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="flex min-h-screen">
          {/* Left Sidebar */}
          <div className="w-1/3 bg-gray-700 text-white p-6">
            {/* Personal Data Header */}
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-3 bg-cyan-500 text-center py-1 px-2 text-white">
                Personal Data
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">📱</span>
                  <span>{cvData.personalInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">📧</span>
                  <span className="break-all">{cvData.personalInfo.email}</span>
                </div>
                {cvData.personalInfo.linkedin && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-300">🔗</span>
                    <span className="break-all text-xs">
                      {cvData.personalInfo.linkedin}
                    </span>
                  </div>
                )}
                {cvData.personalInfo.github && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-300">💻</span>
                    <span className="break-all text-xs">
                      {cvData.personalInfo.github}
                    </span>
                  </div>
                )}
                {cvData.personalInfo.website && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-300">🌐</span>
                    <span className="break-all text-xs">
                      {cvData.personalInfo.website}
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">📍</span>
                  <span>{cvData.personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Competences */}
            {selectedCompetences.length > 0 && (
              <div className="mb-6">
                <h3 className="text-base font-semibold mb-3 bg-cyan-500 text-center py-1 px-2 text-white">
                  Competencies
                </h3>
                <div className="text-xs text-gray-200">
                  {selectedCompetences.map((comp, index) => (
                    <span key={comp.id}>
                      {comp.name}
                      {index < selectedCompetences.length - 1 && " , "}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {cvData.languages.length > 0 && (
              <div className="mb-6">
                <h3 className="text-base font-semibold mb-3 bg-cyan-500 text-center py-1 px-2 text-white">
                  Languages
                </h3>
                <div className="space-y-1 text-xs">
                  {cvData.languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between">
                      <span className="text-gray-200">{lang.name}:</span>
                      <span className="text-white font-medium">
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specialization (Skills) */}
            {selectedSkills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-base font-semibold mb-3 bg-cyan-500 text-center py-1 px-2 text-white">
                  Specialization
                </h3>
                <div className="space-y-2 text-xs">
                  {Object.entries(skillsByCategory).map(
                    ([category, skills]) => (
                      <div key={category}>
                        <h4 className="text-gray-300 font-medium mb-1 text-xs">
                          {categoryNames[
                            category as keyof typeof categoryNames
                          ] || category}
                          :
                        </h4>
                        <div className="text-gray-200 text-xs">
                          {skills.map((skill, index) => (
                            <span key={skill.id}>
                              {skill.name}
                              {index < skills.length - 1 && " , "}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Other Information */}
            {(cvData.drivingLicense || cvData.ownVehicle) && (
              <div className="mb-6">
                <h3 className="text-base font-semibold mb-3 bg-cyan-500 text-center py-1 px-2 text-white">
                  Other Information
                </h3>
                <div className="space-y-1 text-xs text-gray-200">
                  {cvData.drivingLicense && <div>Carnet de conducir</div>}
                  {cvData.ownVehicle && <div>Vehículo propio</div>}
                </div>
              </div>
            )}
          </div>

          {/* Right Main Content */}
          <div className="w-2/3 p-8">
            {/* About Me */}
            {cvData.aboutMe && (
              <section className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
                  About me
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {cvData.aboutMe}
                </p>
              </section>
            )}

            {/* Experience */}
            {selectedExperiences.length > 0 && (
              <section className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
                  Experience
                </h3>
                <div className="space-y-4">
                  {selectedExperiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="border-l-4 border-gray-300 pl-4"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-900 text-sm">
                          {exp.position}
                        </h4>
                        <span className="text-xs text-gray-500 italic">
                          ({exp.contractType}, {exp.workType})
                        </span>
                      </div>
                      <p className="font-bold text-gray-700 text-sm">
                        {exp.company}
                      </p>
                      <p className="text-xs text-gray-600 mb-1">
                        {exp.startDate} - {exp.endDate || "Presente"} /{" "}
                        {exp.location}
                      </p>
                      <p className="text-gray-700 text-xs mb-2 leading-relaxed">
                        {exp.description}
                      </p>
                      {exp.technologies.length > 0 && (
                        <p className="text-xs text-gray-600">
                          <span className="font-medium">Tecnologías:</span>{" "}
                          {exp.technologies.join(", ")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {selectedEducation.length > 0 && (
              <section className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-2">
                  Formation
                </h3>

                {/* Formal Education */}
                {formalEducation.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {formalEducation.map((edu) => (
                      <div
                        key={edu.id}
                        className="border-l-4 border-gray-300 pl-4"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-bold text-gray-900 text-sm">
                            {edu.title}
                          </h5>
                          <span className="text-xs text-gray-500">
                            ({edu.startYear} - {edu.endYear})
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm font-medium">
                          {edu.institution}
                        </p>
                        <p className="text-xs text-gray-600">{edu.location}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Additional Education */}
                {additionalEducation.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                      Other formation
                    </h4>
                    <div className="space-y-3">
                      {additionalEducation.map((edu) => (
                        <div
                          key={edu.id}
                          className="border-l-4 border-gray-300 pl-4"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h5 className="font-bold text-gray-900 text-sm">
                              {edu.title}
                            </h5>
                            <span className="text-xs text-gray-500">
                              ({edu.startYear} - {edu.endYear}
                              {edu.duration && ` / ${edu.duration}`})
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm font-medium">
                            {edu.institution}
                          </p>
                          <p className="text-xs text-gray-600">
                            {edu.location}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
