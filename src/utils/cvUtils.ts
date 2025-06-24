// src/utils/cvUtils.ts

import type { CVData, Experience, Skill } from "@/types/cv";

export const cvUtils = {
  // Generate a summary of the CV
  generateCVSummary: (cvData: CVData) => {
    const selectedSkills = cvData.skills.filter((s) => s.selected);
    const selectedExperiences = cvData.experiences.filter((e) => e.selected);
    const selectedEducation = cvData.education.filter((e) => e.selected);
    const selectedCompetences = cvData.competences.filter((c) => c.selected);

    return {
      skillCount: selectedSkills.length,
      experienceCount: selectedExperiences.length,
      educationCount: selectedEducation.length,
      competenceCount: selectedCompetences.length,
      languages: cvData.languages.length,
      hasContact: !!(cvData.personalInfo.email && cvData.personalInfo.phone),
      hasOnlinePresence: !!(
        cvData.personalInfo.linkedin ||
        cvData.personalInfo.socialNetworks.length > 0 ||
        cvData.personalInfo.website
      ),
      completenessScore: calculateCompletenessScore(cvData),
    };
  },

  // Export CV data to different formats
  exportToJSON: (cvData: CVData, filename?: string) => {
    const dataStr = JSON.stringify(cvData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download =
      filename ||
      `cv-${cvData.personalInfo.name.replace(/\s+/g, "-").toLowerCase()}-${
        new Date().toISOString().split("T")[0]
      }.json`;
    link.click();

    URL.revokeObjectURL(url);
  },

  // Generate text version of CV
  generateTextVersion: (cvData: CVData) => {
    const selectedSkills = cvData.skills.filter((s) => s.selected);
    const selectedExperiences = cvData.experiences.filter((e) => e.selected);
    const selectedEducation = cvData.education.filter((e) => e.selected);
    const selectedCompetences = cvData.competences.filter((c) => c.selected);

    let text = `${cvData.personalInfo.name}\n`;
    text += `${cvData.personalInfo.position}\n\n`;
    text += `CONTACTO:\n`;
    text += `Email: ${cvData.personalInfo.email}\n`;
    text += `Teléfono: ${cvData.personalInfo.phone}\n`;
    text += `Ubicación: ${cvData.personalInfo.location}\n`;
    if (cvData.personalInfo.linkedin)
      text += `LinkedIn: ${cvData.personalInfo.linkedin}\n`;
    if (cvData.personalInfo.socialNetworks.length > 0) {
      cvData.personalInfo.socialNetworks.forEach((social) => {
        text += `${social.name}: ${social.url}\n`;
      });
    }
    if (cvData.personalInfo.website)
      text += `Website: ${cvData.personalInfo.website}\n`;

    if (cvData.aboutMe) {
      text += `\nSOBRE MÍ:\n${cvData.aboutMe}\n`;
    }

    if (selectedCompetences.length > 0) {
      text += `\nCOMPETENCIAS:\n`;
      selectedCompetences.forEach((comp) => (text += `• ${comp.name}\n`));
    }

    if (selectedSkills.length > 0) {
      text += `\nHABILIDADES TÉCNICAS:\n`;
      const skillsByCategory = selectedSkills.reduce((acc, skill) => {
        const categoryName = skill.categoryName || "Sin categoría";
        if (!acc[categoryName]) acc[categoryName] = [];
        acc[categoryName].push(skill.name);
        return acc;
      }, {} as Record<string, string[]>);

      Object.entries(skillsByCategory).forEach(([categoryName, skills]) => {
        text += `${categoryName.toUpperCase()}: ${skills.join(", ")}\n`;
      });
    }

    if (selectedExperiences.length > 0) {
      text += `\nEXPERIENCIA:\n`;
      selectedExperiences.forEach((exp) => {
        text += `${exp.position} - ${exp.company} (${exp.startDate}${
          exp.endDate ? ` - ${exp.endDate}` : " - Presente"
        })\n`;
        text += `${exp.location}\n`;
        text += `${exp.description}\n`;
        if (exp.technologies.length > 0) {
          text += `Tecnologías: ${exp.technologies.join(", ")}\n`;
        }
        text += "\n";
      });
    }

    if (selectedEducation.length > 0) {
      text += `FORMACIÓN ACADÉMICA:\n`;
      selectedEducation.forEach((edu) => {
        text += `${edu.title} - ${edu.institution} (${edu.startYear} - ${edu.endYear})\n`;
      });
    }

    if (cvData.languages.length > 0) {
      text += `\nIDIOMAS:\n`;
      cvData.languages.forEach((lang) => {
        text += `${lang.name}: ${lang.level}\n`;
      });
    }

    return text;
  },

  // Validate CV completeness
  validateCV: (cvData: CVData) => {
    const issues: string[] = [];

    if (!cvData.personalInfo.name) issues.push("Falta el nombre");
    if (!cvData.personalInfo.email) issues.push("Falta el email");
    if (!cvData.personalInfo.phone) issues.push("Falta el teléfono");
    if (!cvData.personalInfo.position) issues.push("Falta el puesto objetivo");

    if (!cvData.aboutMe || cvData.aboutMe.length < 50) {
      issues.push("La descripción personal es muy corta o inexistente");
    }

    const selectedExperiences = cvData.experiences.filter((e) => e.selected);
    if (selectedExperiences.length === 0) {
      issues.push("No hay experiencias seleccionadas");
    }

    const selectedSkills = cvData.skills.filter((s) => s.selected);
    if (selectedSkills.length < 3) {
      issues.push("Muy pocas habilidades seleccionadas (mínimo 3)");
    }

    return {
      isValid: issues.length === 0,
      issues,
      completenessScore: calculateCompletenessScore(cvData),
    };
  },

  // Filter and search functions
  filterSkillsByCategory: (skills: Skill[], categoryId: string) => {
    return skills.filter((skill) => skill.categoryId === categoryId);
  },

  searchExperiences: (experiences: Experience[], query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return experiences.filter(
      (exp) =>
        exp.position.toLowerCase().includes(lowercaseQuery) ||
        exp.company.toLowerCase().includes(lowercaseQuery) ||
        exp.description.toLowerCase().includes(lowercaseQuery) ||
        exp.technologies.some((tech) =>
          tech.toLowerCase().includes(lowercaseQuery)
        )
    );
  },

  // Generate CV suggestions
  generateSuggestions: (cvData: CVData) => {
    const suggestions: string[] = [];

    const selectedSkills = cvData.skills.filter((s) => s.selected);
    const selectedExperiences = cvData.experiences.filter((e) => e.selected);

    if (selectedSkills.length < 5) {
      suggestions.push("Considera añadir más habilidades técnicas relevantes");
    }

    if (selectedExperiences.length < 2) {
      suggestions.push(
        "Añade más experiencias laborales para mostrar tu trayectoria"
      );
    }

    if (!cvData.personalInfo.linkedin) {
      suggestions.push("Añade tu perfil de LinkedIn para mayor credibilidad");
    }

    const hasGitHub = cvData.personalInfo.socialNetworks.some(
      (social) => social.name.toLowerCase() === "github"
    );
    const hasDevSkills = selectedSkills.some(
      (s) =>
        s.categoryName?.toLowerCase().includes("programación") ||
        s.categoryName?.toLowerCase().includes("desarrollo")
    );

    if (!hasGitHub && hasDevSkills) {
      suggestions.push(
        "Considera añadir tu perfil de GitHub si eres desarrollador"
      );
    }

    if (cvData.aboutMe.length < 100) {
      suggestions.push(
        "Expande tu descripción personal con más detalles sobre tu perfil"
      );
    }

    return suggestions;
  },
};

// Helper function to calculate completeness score
function calculateCompletenessScore(cvData: CVData): number {
  let score = 0;
  let maxScore = 0;

  // Personal info (30 points)
  maxScore += 30;
  if (cvData.personalInfo.name) score += 5;
  if (cvData.personalInfo.email) score += 5;
  if (cvData.personalInfo.phone) score += 5;
  if (cvData.personalInfo.position) score += 5;
  if (cvData.personalInfo.location) score += 3;
  if (cvData.personalInfo.linkedin) score += 2;
  if (cvData.personalInfo.socialNetworks.length > 0) score += 2;
  if (cvData.personalInfo.website) score += 3;

  // About me (15 points)
  maxScore += 15;
  if (cvData.aboutMe) {
    if (cvData.aboutMe.length > 200) score += 15;
    else if (cvData.aboutMe.length > 100) score += 10;
    else if (cvData.aboutMe.length > 50) score += 5;
  }

  // Skills (20 points)
  maxScore += 20;
  const selectedSkills = cvData.skills.filter((s) => s.selected);
  if (selectedSkills.length >= 10) score += 20;
  else if (selectedSkills.length >= 7) score += 15;
  else if (selectedSkills.length >= 5) score += 10;
  else if (selectedSkills.length >= 3) score += 5;

  // Experience (25 points)
  maxScore += 25;
  const selectedExperiences = cvData.experiences.filter((e) => e.selected);
  if (selectedExperiences.length >= 3) score += 25;
  else if (selectedExperiences.length >= 2) score += 20;
  else if (selectedExperiences.length >= 1) score += 15;

  // Education (10 points)
  maxScore += 10;
  const selectedEducation = cvData.education.filter((e) => e.selected);
  if (selectedEducation.length >= 2) score += 10;
  else if (selectedEducation.length >= 1) score += 7;

  return Math.round((score / maxScore) * 100);
}
