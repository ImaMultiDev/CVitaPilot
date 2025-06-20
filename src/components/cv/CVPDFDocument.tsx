"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { CVData } from "@/types/cv";

// Registrar fuentes (opcional, usa fuentes del sistema por defecto)
// Font.register({
//   family: 'Inter',
//   src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2'
// });

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 0,
    fontSize: 10,
    fontFamily: "Helvetica",
  },

  // Header
  header: {
    backgroundColor: "#374151",
    color: "#FFFFFF",
    padding: 20,
    textAlign: "center",
    borderBottom: "2pt solid #4B5563",
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },

  position: {
    fontSize: 14,
    color: "#D1D5DB",
  },

  // Main layout
  content: {
    flexDirection: "row",
    flex: 1,
  },

  // Sidebar
  sidebar: {
    width: "35%",
    backgroundColor: "#374151",
    color: "#FFFFFF",
    padding: 20,
  },

  sidebarSection: {
    marginBottom: 20,
  },

  sidebarTitle: {
    backgroundColor: "#06B6D4",
    color: "#FFFFFF",
    textAlign: "center",
    padding: 6,
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 10,
  },

  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    fontSize: 9,
  },

  contactIcon: {
    width: 12,
    marginRight: 6,
    fontSize: 8,
  },

  skillCategory: {
    marginBottom: 8,
  },

  skillCategoryTitle: {
    fontSize: 9,
    color: "#D1D5DB",
    fontWeight: "bold",
    marginBottom: 2,
  },

  skillList: {
    fontSize: 8,
    color: "#E5E7EB",
    lineHeight: 1.3,
  },

  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    fontSize: 9,
  },

  // Main content
  mainContent: {
    width: "65%",
    padding: 20,
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottom: "1.5pt solid #E5E7EB",
  },

  aboutText: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.4,
  },

  experienceItem: {
    marginBottom: 12,
    paddingLeft: 8,
    borderLeft: "2pt solid #D1D5DB",
  },

  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },

  experiencePosition: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111827",
  },

  experienceDetails: {
    fontSize: 8,
    color: "#6B7280",
    fontStyle: "italic",
  },

  experienceCompany: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 2,
  },

  experienceDate: {
    fontSize: 8,
    color: "#6B7280",
    marginBottom: 4,
  },

  experienceDescription: {
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.3,
    marginBottom: 4,
  },

  experienceTech: {
    fontSize: 8,
    color: "#6B7280",
  },

  // Page 2 styles
  page2Header: {
    backgroundColor: "#374151",
    color: "#FFFFFF",
    padding: 12,
    textAlign: "center",
    borderBottom: "2pt solid #4B5563",
  },

  page2Title: {
    fontSize: 16,
    fontWeight: "bold",
  },

  page2Content: {
    padding: 20,
    flex: 1,
  },

  educationItem: {
    marginBottom: 10,
    paddingLeft: 8,
    borderLeft: "2pt solid #D1D5DB",
  },

  certificationItem: {
    marginBottom: 10,
    paddingLeft: 8,
    borderLeft: "2pt solid #D1D5DB",
  },

  achievementItem: {
    marginBottom: 12,
    paddingLeft: 8,
    borderLeft: "2pt solid #D1D5DB",
  },

  achievementHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },

  achievementTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111827",
  },

  achievementDate: {
    fontSize: 8,
    color: "#6B7280",
  },

  achievementCompany: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 2,
  },

  achievementDescription: {
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.3,
    marginBottom: 4,
  },

  achievementTech: {
    fontSize: 8,
    color: "#6B7280",
    marginBottom: 2,
  },

  achievementMetrics: {
    fontSize: 8,
    color: "#16A34A",
    marginBottom: 2,
  },

  achievementUrl: {
    fontSize: 8,
    color: "#2563EB",
  },

  referenceItem: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: "#F9FAFB",
    border: "1pt solid #E5E7EB",
  },

  referenceName: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 2,
  },

  referencePosition: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 1,
  },

  referenceCompany: {
    fontSize: 9,
    color: "#6B7280",
    marginBottom: 4,
  },

  referenceRelationship: {
    fontSize: 8,
    color: "#6B7280",
    fontStyle: "italic",
    marginBottom: 4,
  },

  referenceContact: {
    fontSize: 8,
    color: "#6B7280",
    marginBottom: 1,
  },
});

interface CVPDFDocumentProps {
  cvData: CVData;
}

export const CVPDFDocument: React.FC<CVPDFDocumentProps> = ({ cvData }) => {
  // Filter selected items
  const selectedSkills = cvData.skills.filter((skill) => skill.selected);
  const selectedCompetences = cvData.competences.filter(
    (comp) => comp.selected
  );
  const selectedSoftSkills =
    cvData.softSkills?.filter((skill) => skill.selected) || [];
  const selectedExperiences = cvData.experiences.filter((exp) => exp.selected);
  const selectedEducation = cvData.education.filter((edu) => edu.selected);
  const selectedCertifications = cvData.certifications.filter(
    (cert) => cert.selected
  );
  const selectedAchievements = cvData.achievements.filter(
    (achievement) => achievement.selected
  );
  const selectedReferences = cvData.references.filter((ref) => ref.selected);

  // Group skills by category
  const skillsByCategory = selectedSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof selectedSkills>);

  // Get formal education only
  const formalEducation = selectedEducation.filter(
    (edu) => edu.type === "formal"
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
    <Document>
      {/* PÁGINA 1 */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{cvData.personalInfo.name}</Text>
          <Text style={styles.position}>{cvData.personalInfo.position}</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Sidebar */}
          <View style={styles.sidebar}>
            {/* Datos Personales */}
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Datos Personales</Text>
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>📱</Text>
                <Text>{cvData.personalInfo.phone}</Text>
              </View>
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>📧</Text>
                <Text>{cvData.personalInfo.email}</Text>
              </View>
              {cvData.personalInfo.linkedin && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>🔗</Text>
                  <Text>{cvData.personalInfo.linkedin}</Text>
                </View>
              )}
              {cvData.personalInfo.github && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>💻</Text>
                  <Text>{cvData.personalInfo.github}</Text>
                </View>
              )}
              {cvData.personalInfo.website && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactIcon}>🌐</Text>
                  <Text>{cvData.personalInfo.website}</Text>
                </View>
              )}
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>📍</Text>
                <Text>{cvData.personalInfo.location}</Text>
              </View>
            </View>

            {/* Competencias */}
            {selectedCompetences.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Competencias</Text>
                <Text style={styles.skillList}>
                  {selectedCompetences
                    .map(
                      (comp, index) =>
                        comp.name +
                        (index < selectedCompetences.length - 1 ? " , " : "")
                    )
                    .join("")}
                </Text>
              </View>
            )}

            {/* Idiomas */}
            {cvData.languages.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Idiomas</Text>
                {cvData.languages.map((lang) => (
                  <View key={lang.id} style={styles.languageItem}>
                    <Text>{lang.name}:</Text>
                    <Text>{lang.level}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Especialización */}
            {selectedSkills.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Especialización</Text>
                {Object.entries(skillsByCategory).map(([category, skills]) => (
                  <View key={category} style={styles.skillCategory}>
                    <Text style={styles.skillCategoryTitle}>
                      {categoryNames[category as keyof typeof categoryNames] ||
                        category}
                      :
                    </Text>
                    <Text style={styles.skillList}>
                      {skills
                        .map(
                          (skill, index) =>
                            skill.name +
                            (index < skills.length - 1 ? " , " : "")
                        )
                        .join("")}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Habilidades Blandas */}
            {selectedSoftSkills.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Habilidades Blandas</Text>
                <Text style={styles.skillList}>
                  {selectedSoftSkills
                    .map(
                      (skill, index) =>
                        skill.name +
                        (index < selectedSoftSkills.length - 1 ? " • " : "")
                    )
                    .join("")}
                </Text>
              </View>
            )}

            {/* Otra Información */}
            {(cvData.drivingLicense || cvData.ownVehicle) && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Otra Información</Text>
                {cvData.drivingLicense && (
                  <Text style={styles.skillList}>Carnet de conducir</Text>
                )}
                {cvData.ownVehicle && (
                  <Text style={styles.skillList}>Vehículo propio</Text>
                )}
              </View>
            )}
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* Perfil Profesional */}
            {cvData.aboutMe && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Perfil Profesional</Text>
                <Text style={styles.aboutText}>{cvData.aboutMe}</Text>
              </View>
            )}

            {/* Experiencia Laboral */}
            {selectedExperiences.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
                {selectedExperiences.map((exp) => (
                  <View key={exp.id} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.experiencePosition}>
                        {exp.position}
                      </Text>
                      <Text style={styles.experienceDetails}>
                        ({exp.contractType}, {exp.workSchedule},{" "}
                        {exp.workModality})
                      </Text>
                    </View>
                    <Text style={styles.experienceCompany}>{exp.company}</Text>
                    <Text style={styles.experienceDate}>
                      {exp.startDate} - {exp.endDate || "Presente"} /{" "}
                      {exp.location}
                    </Text>
                    <Text style={styles.experienceDescription}>
                      {exp.description}
                    </Text>
                    {exp.technologies.length > 0 && (
                      <Text style={styles.experienceTech}>
                        Tecnologías: {exp.technologies.join(", ")}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>

      {/* PÁGINA 2 */}
      {(formalEducation.length > 0 ||
        selectedCertifications.length > 0 ||
        selectedAchievements.length > 0 ||
        selectedReferences.length > 0) && (
        <Page size="A4" style={styles.page}>
          <View style={styles.page2Header}>
            <Text style={styles.page2Title}>
              {cvData.personalInfo.name} - Página 2
            </Text>
          </View>

          <View style={styles.page2Content}>
            {/* Formación Académica */}
            {formalEducation.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🎓 Formación Académica</Text>
                {formalEducation.map((edu) => (
                  <View key={edu.id} style={styles.educationItem}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.experiencePosition}>{edu.title}</Text>
                      <Text style={styles.experienceDetails}>
                        ({edu.startYear} - {edu.endYear})
                      </Text>
                    </View>
                    <Text style={styles.experienceCompany}>
                      {edu.institution}
                    </Text>
                    <Text style={styles.experienceDate}>{edu.location}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Certificaciones */}
            {selectedCertifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🏆 Certificaciones</Text>
                {selectedCertifications.map((cert) => (
                  <View key={cert.id} style={styles.certificationItem}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.experiencePosition}>{cert.name}</Text>
                      <Text style={styles.experienceDetails}>
                        {cert.date}
                        {cert.expiryDate && ` - ${cert.expiryDate}`}
                      </Text>
                    </View>
                    <Text style={styles.experienceCompany}>{cert.issuer}</Text>
                    {cert.credentialId && (
                      <Text style={styles.experienceDate}>
                        ID: {cert.credentialId}
                      </Text>
                    )}
                    {cert.url && (
                      <Text style={styles.achievementUrl}>
                        Verificación: {cert.url}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Logros y Proyectos */}
            {selectedAchievements.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  🏆 Logros y Proyectos Destacados
                </Text>
                {selectedAchievements.map((achievement) => (
                  <View key={achievement.id} style={styles.achievementItem}>
                    <View style={styles.achievementHeader}>
                      <Text style={styles.achievementTitle}>
                        {achievement.type === "project" ? "🚀" : "🏆"}{" "}
                        {achievement.title}
                      </Text>
                      <Text style={styles.achievementDate}>
                        {achievement.date}
                      </Text>
                    </View>
                    {achievement.company && (
                      <Text style={styles.achievementCompany}>
                        {achievement.company}
                      </Text>
                    )}
                    <Text style={styles.achievementDescription}>
                      {achievement.description}
                    </Text>
                    {achievement.technologies.length > 0 && (
                      <Text style={styles.achievementTech}>
                        Tecnologías: {achievement.technologies.join(", ")}
                      </Text>
                    )}
                    {achievement.metrics && (
                      <Text style={styles.achievementMetrics}>
                        Impacto: {achievement.metrics}
                      </Text>
                    )}
                    {achievement.url && (
                      <Text style={styles.achievementUrl}>
                        URL: {achievement.url}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Referencias */}
            {selectedReferences.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  📋 Referencias Profesionales
                </Text>
                {selectedReferences.map((reference) => (
                  <View key={reference.id} style={styles.referenceItem}>
                    <Text style={styles.referenceName}>{reference.name}</Text>
                    <Text style={styles.referencePosition}>
                      {reference.position}
                    </Text>
                    <Text style={styles.referenceCompany}>
                      {reference.company}
                    </Text>
                    <Text style={styles.referenceRelationship}>
                      {reference.relationship}
                    </Text>
                    {reference.phone && (
                      <Text style={styles.referenceContact}>
                        📞 {reference.phone}
                      </Text>
                    )}
                    {reference.email && (
                      <Text style={styles.referenceContact}>
                        ✉️ {reference.email}
                      </Text>
                    )}
                    {reference.yearsWorking && (
                      <Text style={styles.referenceContact}>
                        ⏱️ Colaboración: {reference.yearsWorking}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </Page>
      )}
    </Document>
  );
};
