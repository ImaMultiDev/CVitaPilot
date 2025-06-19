// src/components/cv/CVPreview.tsx

"use client";

import { useCV } from "@/contexts/CVContext";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const CVPreview: React.FC = () => {
  const {
    state,
    getSelectedSkills,
    getSelectedCompetences,
    getSelectedExperiences,
    getSelectedEducation,
  } = useCV();
  const { currentCV } = state;

  const selectedSkills = getSelectedSkills();
  const selectedCompetences = getSelectedCompetences();
  const selectedExperiences = getSelectedExperiences();
  const selectedEducation = getSelectedEducation();

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
    <div className="max-w-4xl mx-auto bg-white shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {currentCV.personalInfo.name}
            </h1>
            <h2 className="text-xl font-light mb-4">
              {currentCV.personalInfo.position}
            </h2>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>{currentCV.personalInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✉️</span>
                  <span>{currentCV.personalInfo.email}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span>🌐</span>
                  <a
                    href={currentCV.personalInfo.website}
                    className="hover:underline"
                  >
                    {currentCV.personalInfo.website}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📍</span>
                  <span>{currentCV.personalInfo.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-4 text-sm">
              <a
                href={currentCV.personalInfo.linkedin}
                className="flex items-center space-x-1 hover:underline"
              >
                <span>💼</span>
                <span>LinkedIn</span>
              </a>
              <a
                href={currentCV.personalInfo.github}
                className="flex items-center space-x-1 hover:underline"
              >
                <span>💻</span>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/3 bg-gray-50 p-6 space-y-6">
          {/* Languages */}
          {currentCV.languages.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
                Idiomas
              </h3>
              <div className="space-y-2">
                {currentCV.languages.map((language) => (
                  <div
                    key={language.id}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm font-medium">{language.name}</span>
                    <Badge variant="info" size="sm">
                      {language.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Competences */}
          {selectedCompetences.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
                Competencias
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedCompetences.map((competence) => (
                  <Badge key={competence.id} variant="default" size="sm">
                    {competence.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {Object.keys(skillsByCategory).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
                Especialización
              </h3>
              <div className="space-y-4">
                {Object.entries(skillsByCategory).map(([category, skills]) => (
                  <div key={category}>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      {categoryNames[category as keyof typeof categoryNames] ||
                        category}
                    </h4>
                    <div className="text-sm text-gray-600">
                      {skills.map((skill) => skill.name).join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b-2 border-blue-600 pb-1">
              Otra Información
            </h3>
            <div className="space-y-2 text-sm">
              {currentCV.drivingLicense && (
                <div className="flex items-center space-x-2">
                  <span>🚗</span>
                  <span>Carnet de conducir</span>
                </div>
              )}
              {currentCV.ownVehicle && (
                <div className="flex items-center space-x-2">
                  <span>🚙</span>
                  <span>Vehículo propio</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 space-y-8">
          {/* About Me */}
          {currentCV.aboutMe && (
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                Sobre mí
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {currentCV.aboutMe}
              </p>
            </section>
          )}

          {/* Experience */}
          {selectedExperiences.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                Experiencia
              </h3>
              <div className="space-y-6">
                {selectedExperiences.map((experience) => (
                  <div
                    key={experience.id}
                    className="border-l-4 border-blue-200 pl-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {experience.position}
                        </h4>
                        <p className="text-blue-600 font-medium">
                          {experience.company}
                        </p>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>({experience.startDate})</p>
                        <p>{experience.location}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {experience.contractType}, {experience.workType}
                    </p>
                    <p className="text-gray-700 mb-3">
                      {experience.description}
                    </p>
                    {experience.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {experience.technologies.map((tech, index) => (
                          <Badge key={index} variant="info" size="sm">
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
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                Formación
              </h3>

              {/* Formal Education */}
              {formalEducation.length > 0 && (
                <div className="mb-6">
                  <div className="space-y-4">
                    {formalEducation.map((edu) => (
                      <div
                        key={edu.id}
                        className="border-l-4 border-green-200 pl-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {edu.title}
                            </h4>
                            <p className="text-green-600 font-medium">
                              {edu.institution}
                            </p>
                            {edu.location && (
                              <p className="text-sm text-gray-600">
                                {edu.location}
                              </p>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            ({edu.startYear} - {edu.endYear})
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Education */}
              {additionalEducation.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Otra Formación
                  </h4>
                  <div className="space-y-4">
                    {additionalEducation.map((edu) => (
                      <div
                        key={edu.id}
                        className="border-l-4 border-purple-200 pl-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-semibold text-gray-900">
                              {edu.title}
                            </h5>
                            <p className="text-purple-600 font-medium">
                              {edu.institution}
                            </p>
                          </div>
                          {edu.duration && (
                            <div className="text-sm text-gray-600">
                              ({edu.duration})
                            </div>
                          )}
                        </div>
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
  );
};
