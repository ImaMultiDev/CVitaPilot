"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type {
  CVData,
  PersonalInfo,
  Language,
  Skill,
  Competence,
  Interest,
  Experience,
  Education,
  CVDelivery,
} from "@/types/cv";

// Constante para el usuario actual (temporal)
const CURRENT_USER_ID = "default-user";

// ===============================
// CV PRINCIPAL
// ===============================

export async function getCurrentCV(): Promise<CVData | null> {
  try {
    const cv = await prisma.cV.findFirst({
      where: {
        userId: CURRENT_USER_ID,
        isActive: true,
      },
      include: {
        languages: true,
        skills: true,
        competences: true,
        interests: true,
        experiences: true,
        education: true,
      },
    });

    if (!cv) return null;

    // Transformar a formato CVData
    return {
      personalInfo: {
        name: cv.personalName,
        position: cv.position,
        phone: cv.phone,
        email: cv.email,
        linkedin: cv.linkedin || "",
        github: cv.github || "",
        website: cv.website || "",
        location: cv.location,
      },
      aboutMe: cv.aboutMe || "",
      languages: cv.languages.map((lang) => ({
        id: lang.id,
        name: lang.name,
        level: lang.level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Nativo",
      })),
      skills: cv.skills.map((skill) => ({
        id: skill.id,
        name: skill.name,
        category: skill.category as
          | "language"
          | "framework"
          | "tool"
          | "database"
          | "orm"
          | "ai"
          | "library",
        selected: skill.selected,
      })),
      competences: cv.competences.map((comp: any) => ({
        id: comp.id,
        name: comp.name,
        selected: comp.selected,
      })),
      interests: cv.interests.map((interest: any) => ({
        id: interest.id,
        name: interest.name,
        selected: interest.selected,
      })),
      experiences: cv.experiences.map((exp: any) => ({
        id: exp.id,
        position: exp.position,
        company: exp.company,
        location: exp.location,
        startDate: exp.startDate,
        endDate: exp.endDate || undefined,
        contractType: exp.contractType,
        workType: exp.workType,
        description: exp.description,
        technologies: exp.technologies,
        selected: exp.selected,
      })),
      education: cv.education.map((edu: any) => ({
        id: edu.id,
        title: edu.title,
        institution: edu.institution,
        location: edu.location,
        startYear: edu.startYear,
        endYear: edu.endYear,
        type: edu.type as "formal" | "additional",
        duration: edu.duration || undefined,
        selected: edu.selected,
      })),
      drivingLicense: cv.drivingLicense,
      ownVehicle: cv.ownVehicle,
    };
  } catch (error) {
    console.error("Error getting current CV:", error);
    return null;
  }
}

export async function initializeDefaultCV(): Promise<string> {
  try {
    // Verificar si ya existe un CV activo
    const existingCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
    });

    if (existingCV) {
      return existingCV.id;
    }

    // Datos iniciales (los que están en el context)
    const defaultData = {
      name: "CV Principal",
      userId: CURRENT_USER_ID,
      isActive: true,
      personalName: "Imanol Mugueta Unsain",
      position: "Multiplatform Developer",
      phone: "+34 689 18 17 20",
      email: "contact@imamultidev.dev",
      linkedin: "https://www.linkedin.com/in/imanol-mugueta-unsain/",
      github: "https://github.com/kodebidean",
      website: "https://imamultidev.dev",
      location: "3130 Carcastillo (Navarra)",
      aboutMe:
        "Desarrollador Multiplataforma, con conocimientos en diversos lenguajes de programación, experiencia de desarrollo frontend y backend",
      drivingLicense: true,
      ownVehicle: true,
    };

    const cv = await prisma.cV.create({
      data: defaultData,
    });

    // Añadir idiomas por defecto
    await prisma.language.createMany({
      data: [
        { cvId: cv.id, name: "Español", level: "Nativo" },
        { cvId: cv.id, name: "English", level: "B2" },
      ],
    });

    // Añadir skills por defecto
    await prisma.skill.createMany({
      data: [
        // Programming Languages
        {
          cvId: cv.id,
          name: "JavaScript",
          category: "language",
          selected: true,
        },
        { cvId: cv.id, name: "Java", category: "language", selected: true },
        { cvId: cv.id, name: "Kotlin", category: "language", selected: true },
        { cvId: cv.id, name: "Swift", category: "language", selected: true },
        { cvId: cv.id, name: "Python", category: "language", selected: true },
        { cvId: cv.id, name: "C++", category: "language", selected: false },
        { cvId: cv.id, name: "C#", category: "language", selected: false },

        // Frameworks
        { cvId: cv.id, name: "React", category: "framework", selected: true },
        { cvId: cv.id, name: "Next.js", category: "framework", selected: true },
        {
          cvId: cv.id,
          name: "Tailwind",
          category: "framework",
          selected: true,
        },
        { cvId: cv.id, name: "Angular", category: "framework", selected: true },
        { cvId: cv.id, name: "Astro", category: "framework", selected: true },
        {
          cvId: cv.id,
          name: "Spring Boot",
          category: "framework",
          selected: true,
        },
        { cvId: cv.id, name: "Flutter", category: "framework", selected: true },
        {
          cvId: cv.id,
          name: "React Native",
          category: "framework",
          selected: true,
        },
        { cvId: cv.id, name: "Vue.js", category: "framework", selected: false },
        {
          cvId: cv.id,
          name: "Jetpack Compose",
          category: "framework",
          selected: false,
        },

        // Databases
        {
          cvId: cv.id,
          name: "PostgreSQL",
          category: "database",
          selected: true,
        },
        { cvId: cv.id, name: "MySQL", category: "database", selected: true },
        { cvId: cv.id, name: "MongoDB", category: "database", selected: true },
        { cvId: cv.id, name: "Firebase", category: "database", selected: true },
        { cvId: cv.id, name: "SQLite", category: "database", selected: false },
        {
          cvId: cv.id,
          name: "SQL Server",
          category: "database",
          selected: false,
        },

        // Tools
        { cvId: cv.id, name: "Git", category: "tool", selected: true },
        { cvId: cv.id, name: "Docker", category: "tool", selected: false },
        { cvId: cv.id, name: "Node.js", category: "tool", selected: true },
        { cvId: cv.id, name: "Postman", category: "tool", selected: false },
        { cvId: cv.id, name: "Jira", category: "tool", selected: true },

        // Libraries
        { cvId: cv.id, name: "Prisma", category: "library", selected: true },
        { cvId: cv.id, name: "NextAuth", category: "library", selected: true },
        { cvId: cv.id, name: "Formik", category: "library", selected: true },
        { cvId: cv.id, name: "Zod", category: "library", selected: true },
        { cvId: cv.id, name: "GSAP", category: "library", selected: false },
        {
          cvId: cv.id,
          name: "Bootstrap",
          category: "library",
          selected: false,
        },
      ],
    });

    // Añadir competencias por defecto
    await prisma.competence.createMany({
      data: [
        { cvId: cv.id, name: "Desarrollo Multiplataforma", selected: true },
        { cvId: cv.id, name: "Backend", selected: true },
        { cvId: cv.id, name: "Bases de Datos", selected: true },
        { cvId: cv.id, name: "Desarrollo de Sistemas ERP", selected: true },
        { cvId: cv.id, name: "CMS", selected: true },
        { cvId: cv.id, name: "CRM", selected: true },
        { cvId: cv.id, name: "Landing page", selected: true },
        { cvId: cv.id, name: "Construcción MCP", selected: true },
        { cvId: cv.id, name: "SLM", selected: true },
        { cvId: cv.id, name: "Frontend", selected: false },
        { cvId: cv.id, name: "Fullstack", selected: false },
        { cvId: cv.id, name: "Marketing", selected: false },
      ],
    });

    // Añadir intereses por defecto
    await prisma.interest.createMany({
      data: [
        { cvId: cv.id, name: "Tecnología", selected: true },
        { cvId: cv.id, name: "Programación", selected: true },
        { cvId: cv.id, name: "IA", selected: true },
        { cvId: cv.id, name: "Deportes", selected: false },
      ],
    });

    // Añadir experiencias por defecto
    await prisma.experience.createMany({
      data: [
        {
          cvId: cv.id,
          position: "FullStack Next.js Developer",
          company: "SYNKROSS",
          location: "Madrid (Comunidad de Madrid)",
          startDate: "2025-06",
          contractType: "Contrato en Prácticas",
          workType: "jornada completa",
          description:
            "Next.js (Prisma, PostgreSQL, NextAuth, Formik, Zod), SCRUM, Jira",
          technologies: [
            "Next.js",
            "Prisma",
            "PostgreSQL",
            "NextAuth",
            "Formik",
            "Zod",
            "SCRUM",
            "Jira",
          ],
          selected: true,
        },
        {
          cvId: cv.id,
          position: "Gestor ERP SAP",
          company: "ERRIBERRI S.L.",
          location: "Olite (Comunidad foral de Navarra)",
          startDate: "2024-08",
          contractType: "Contrato temporal",
          workType: "jornada completa",
          description: "SAP, Microsoft 365 (SharePoint, Power Platform)",
          technologies: [
            "SAP",
            "Microsoft 365",
            "SharePoint",
            "Power Platform",
          ],
          selected: true,
        },
        {
          cvId: cv.id,
          position: "Programación CNC",
          company: "ERRIBERRI S.L.",
          location: "Carcastillo (Comunidad foral de Navarra)",
          startDate: "2023-09",
          contractType: "Contrato indefinido",
          workType: "jornada completa",
          description:
            "Elaboración de programas CNC para mecanizado, control de producción",
          technologies: ["CNC", "Mecanizado"],
          selected: false,
        },
        {
          cvId: cv.id,
          position: "Marketing y Comercio Digital",
          company: "SUPERRECAMBIOS.COM",
          location: "Pamplona (Comunidad foral de Navarra)",
          startDate: "2017-03",
          contractType: "Contrato temporal",
          workType: "jornada completa",
          description:
            "Gestión e investigación comercial, análisis de mercado, marketing, comunicación",
          technologies: ["Marketing Digital", "Análisis de mercado"],
          selected: false,
        },
      ],
    });

    // Añadir formación por defecto
    await prisma.education.createMany({
      data: [
        {
          cvId: cv.id,
          title: "FPS Desarrollo de Aplicaciones Multiplataforma",
          institution: "U-TAD",
          location: "Madrid (Comunidad de Madrid)",
          startYear: "2023",
          endYear: "2025",
          type: "formal",
          selected: true,
        },
        {
          cvId: cv.id,
          title: "FPI Programación CNC - Mecanizado por arranque de viruta",
          institution: "CIP ETI",
          location: "Tudela (Comunidad foral de Navarra)",
          startYear: "2017",
          endYear: "2018",
          type: "formal",
          selected: false,
        },
        {
          cvId: cv.id,
          title: "FPS Gestión Comercial y Marketing",
          institution: "CI Maria Ana Sanz",
          location: "Pamplona (Comunidad foral de Navarra)",
          startYear: "2014",
          endYear: "2016",
          type: "formal",
          selected: false,
        },
        {
          cvId: cv.id,
          title: "Curso de Desarrollo Web Full Stack",
          institution: "Codecademy",
          location: "Online",
          startYear: "2022",
          endYear: "2023",
          type: "additional",
          duration: "400 horas",
          selected: true,
        },
        {
          cvId: cv.id,
          title: "Certificación AWS Cloud Practitioner",
          institution: "Amazon Web Services",
          location: "Online",
          startYear: "2024",
          endYear: "2024",
          type: "additional",
          duration: "120 horas",
          selected: false,
        },
      ],
    });

    revalidatePath("/");
    return cv.id;
  } catch (error) {
    console.error("Error initializing default CV:", error);
    throw new Error("Failed to initialize default CV");
  }
}

// ===============================
// INFORMACIÓN PERSONAL
// ===============================

export async function updatePersonalInfo(info: Partial<PersonalInfo>) {
  try {
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    await prisma.cV.update({
      where: { id: currentCV.id },
      data: {
        personalName: info.name || currentCV.personalName,
        position: info.position || currentCV.position,
        phone: info.phone || currentCV.phone,
        email: info.email || currentCV.email,
        linkedin:
          info.linkedin !== undefined ? info.linkedin : currentCV.linkedin,
        github: info.github !== undefined ? info.github : currentCV.github,
        website: info.website !== undefined ? info.website : currentCV.website,
        location: info.location || currentCV.location,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating personal info:", error);
    return { success: false, error: "Failed to update personal info" };
  }
}

export async function updateAboutMe(aboutMe: string) {
  try {
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    await prisma.cV.update({
      where: { id: currentCV.id },
      data: { aboutMe },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating about me:", error);
    return { success: false, error: "Failed to update about me" };
  }
}

// ===============================
// IDIOMAS
// ===============================

export async function addLanguage(language: Omit<Language, "id">) {
  try {
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    await prisma.language.create({
      data: {
        ...language,
        cvId: currentCV.id,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error adding language:", error);
    return { success: false, error: "Failed to add language" };
  }
}

export async function updateLanguage(language: Language) {
  try {
    await prisma.language.update({
      where: { id: language.id },
      data: {
        name: language.name,
        level: language.level,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating language:", error);
    return { success: false, error: "Failed to update language" };
  }
}

export async function deleteLanguage(id: string) {
  try {
    await prisma.language.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting language:", error);
    return { success: false, error: "Failed to delete language" };
  }
}

// ===============================
// HABILIDADES
// ===============================

export async function addSkill(skill: Omit<Skill, "id">) {
  try {
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    await prisma.skill.create({
      data: {
        ...skill,
        cvId: currentCV.id,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error adding skill:", error);
    return { success: false, error: "Failed to add skill" };
  }
}

export async function updateSkill(skill: Skill) {
  try {
    await prisma.skill.update({
      where: { id: skill.id },
      data: {
        name: skill.name,
        category: skill.category,
        selected: skill.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating skill:", error);
    return { success: false, error: "Failed to update skill" };
  }
}

export async function toggleSkill(id: string) {
  try {
    const skill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      throw new Error("Skill not found");
    }

    await prisma.skill.update({
      where: { id },
      data: {
        selected: !skill.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error toggling skill:", error);
    return { success: false, error: "Failed to toggle skill" };
  }
}

export async function deleteSkill(id: string) {
  try {
    await prisma.skill.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting skill:", error);
    return { success: false, error: "Failed to delete skill" };
  }
}

// ===============================
// COMPETENCIAS
// ===============================

export async function addCompetence(competence: Omit<Competence, "id">) {
  try {
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    await prisma.competence.create({
      data: {
        ...competence,
        cvId: currentCV.id,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error adding competence:", error);
    return { success: false, error: "Failed to add competence" };
  }
}

export async function updateCompetence(competence: Competence) {
  try {
    await prisma.competence.update({
      where: { id: competence.id },
      data: {
        name: competence.name,
        selected: competence.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating competence:", error);
    return { success: false, error: "Failed to update competence" };
  }
}

export async function toggleCompetence(id: string) {
  try {
    const competence = await prisma.competence.findUnique({
      where: { id },
    });

    if (!competence) {
      throw new Error("Competence not found");
    }

    await prisma.competence.update({
      where: { id },
      data: {
        selected: !competence.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error toggling competence:", error);
    return { success: false, error: "Failed to toggle competence" };
  }
}

export async function deleteCompetence(id: string) {
  try {
    await prisma.competence.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting competence:", error);
    return { success: false, error: "Failed to delete competence" };
  }
}

// ===============================
// INTERESES
// ===============================

export async function addInterest(interest: Omit<Interest, "id">) {
  try {
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    await prisma.interest.create({
      data: {
        ...interest,
        cvId: currentCV.id,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error adding interest:", error);
    return { success: false, error: "Failed to add interest" };
  }
}

export async function updateInterest(interest: Interest) {
  try {
    await prisma.interest.update({
      where: { id: interest.id },
      data: {
        name: interest.name,
        selected: interest.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating interest:", error);
    return { success: false, error: "Failed to update interest" };
  }
}

export async function toggleInterest(id: string) {
  try {
    const interest = await prisma.interest.findUnique({
      where: { id },
    });

    if (!interest) {
      throw new Error("Interest not found");
    }

    await prisma.interest.update({
      where: { id },
      data: {
        selected: !interest.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error toggling interest:", error);
    return { success: false, error: "Failed to toggle interest" };
  }
}

export async function deleteInterest(id: string) {
  try {
    await prisma.interest.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting interest:", error);
    return { success: false, error: "Failed to delete interest" };
  }
}

// ===============================
// EXPERIENCIAS
// ===============================

export async function addExperience(experience: Omit<Experience, "id">) {
  try {
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    await prisma.experience.create({
      data: {
        ...experience,
        cvId: currentCV.id,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error adding experience:", error);
    return { success: false, error: "Failed to add experience" };
  }
}

export async function updateExperience(experience: Experience) {
  try {
    await prisma.experience.update({
      where: { id: experience.id },
      data: {
        position: experience.position,
        company: experience.company,
        location: experience.location,
        startDate: experience.startDate,
        endDate: experience.endDate,
        contractType: experience.contractType,
        workType: experience.workType,
        description: experience.description,
        technologies: experience.technologies,
        selected: experience.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating experience:", error);
    return { success: false, error: "Failed to update experience" };
  }
}

export async function toggleExperience(id: string) {
  try {
    const experience = await prisma.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      throw new Error("Experience not found");
    }

    await prisma.experience.update({
      where: { id },
      data: {
        selected: !experience.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error toggling experience:", error);
    return { success: false, error: "Failed to toggle experience" };
  }
}

export async function deleteExperience(id: string) {
  try {
    await prisma.experience.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting experience:", error);
    return { success: false, error: "Failed to delete experience" };
  }
}

// ===============================
// FORMACIÓN
// ===============================

export async function addEducation(education: Omit<Education, "id">) {
  try {
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    await prisma.education.create({
      data: {
        ...education,
        cvId: currentCV.id,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error adding education:", error);
    return { success: false, error: "Failed to add education" };
  }
}

export async function updateEducation(education: Education) {
  try {
    await prisma.education.update({
      where: { id: education.id },
      data: {
        title: education.title,
        institution: education.institution,
        location: education.location,
        startYear: education.startYear,
        endYear: education.endYear,
        type: education.type,
        duration: education.duration,
        selected: education.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating education:", error);
    return { success: false, error: "Failed to update education" };
  }
}

export async function toggleEducation(id: string) {
  try {
    const education = await prisma.education.findUnique({
      where: { id },
    });

    if (!education) {
      throw new Error("Education not found");
    }

    await prisma.education.update({
      where: { id },
      data: {
        selected: !education.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error toggling education:", error);
    return { success: false, error: "Failed to toggle education" };
  }
}

export async function deleteEducation(id: string) {
  try {
    await prisma.education.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting education:", error);
    return { success: false, error: "Failed to delete education" };
  }
}

// ===============================
// CVS GUARDADOS
// ===============================

export async function getSavedCVs() {
  try {
    const cvs = await prisma.cV.findMany({
      where: {
        userId: CURRENT_USER_ID,
      },
      include: {
        deliveries: true,
        _count: {
          select: {
            deliveries: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return cvs.map((cv: any) => ({
      id: cv.id,
      name: cv.name,
      isActive: cv.isActive,
      createdAt: cv.createdAt.toISOString(),
      updatedAt: cv.updatedAt.toISOString(),
      deliveries: cv.deliveries,
      deliveryCount: cv._count.deliveries,
    }));
  } catch (error) {
    console.error("Error getting saved CVs:", error);
    return [];
  }
}

export async function saveCurrentCVAs(name: string) {
  try {
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
      include: {
        languages: true,
        skills: true,
        competences: true,
        interests: true,
        experiences: true,
        education: true,
      },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    // Crear una copia del CV actual
    const newCV = await prisma.cV.create({
      data: {
        name,
        userId: CURRENT_USER_ID,
        isActive: false,
        personalName: currentCV.personalName,
        position: currentCV.position,
        phone: currentCV.phone,
        email: currentCV.email,
        linkedin: currentCV.linkedin,
        github: currentCV.github,
        website: currentCV.website,
        location: currentCV.location,
        aboutMe: currentCV.aboutMe,
        drivingLicense: currentCV.drivingLicense,
        ownVehicle: currentCV.ownVehicle,
      },
    });

    // Copiar todas las relaciones
    if (currentCV.languages.length > 0) {
      await prisma.language.createMany({
        data: currentCV.languages.map((lang: any) => ({
          cvId: newCV.id,
          name: lang.name,
          level: lang.level,
        })),
      });
    }

    if (currentCV.skills.length > 0) {
      await prisma.skill.createMany({
        data: currentCV.skills.map((skill: any) => ({
          cvId: newCV.id,
          name: skill.name,
          category: skill.category,
          selected: skill.selected,
        })),
      });
    }

    if (currentCV.competences.length > 0) {
      await prisma.competence.createMany({
        data: currentCV.competences.map((comp: any) => ({
          cvId: newCV.id,
          name: comp.name,
          selected: comp.selected,
        })),
      });
    }

    if (currentCV.interests.length > 0) {
      await prisma.interest.createMany({
        data: currentCV.interests.map((interest: any) => ({
          cvId: newCV.id,
          name: interest.name,
          selected: interest.selected,
        })),
      });
    }

    if (currentCV.experiences.length > 0) {
      await prisma.experience.createMany({
        data: currentCV.experiences.map((exp: any) => ({
          cvId: newCV.id,
          position: exp.position,
          company: exp.company,
          location: exp.location,
          startDate: exp.startDate,
          endDate: exp.endDate,
          contractType: exp.contractType,
          workType: exp.workType,
          description: exp.description,
          technologies: exp.technologies,
          selected: exp.selected,
        })),
      });
    }

    if (currentCV.education.length > 0) {
      await prisma.education.createMany({
        data: currentCV.education.map((edu: any) => ({
          cvId: newCV.id,
          title: edu.title,
          institution: edu.institution,
          location: edu.location,
          startYear: edu.startYear,
          endYear: edu.endYear,
          type: edu.type,
          duration: edu.duration,
          selected: edu.selected,
        })),
      });
    }

    revalidatePath("/saved-cvs");
    return { success: true, cvId: newCV.id };
  } catch (error) {
    console.error("Error saving CV:", error);
    return { success: false, error: "Failed to save CV" };
  }
}

export async function loadCV(cvId: string) {
  try {
    // Desactivar el CV actual
    await prisma.cV.updateMany({
      where: { userId: CURRENT_USER_ID, isActive: true },
      data: { isActive: false },
    });

    // Activar el CV seleccionado
    await prisma.cV.update({
      where: { id: cvId },
      data: { isActive: true },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error loading CV:", error);
    return { success: false, error: "Failed to load CV" };
  }
}

export async function deleteSavedCV(cvId: string) {
  try {
    const cv = await prisma.cV.findUnique({
      where: { id: cvId },
    });

    if (!cv) {
      throw new Error("CV not found");
    }

    if (cv.isActive) {
      throw new Error("Cannot delete active CV");
    }

    await prisma.cV.delete({
      where: { id: cvId },
    });

    revalidatePath("/saved-cvs");
    return { success: true };
  } catch (error) {
    console.error("Error deleting CV:", error);
    return { success: false, error: "Failed to delete CV" };
  }
}

// ===============================
// ENTREGAS
// ===============================

export async function addDelivery(
  cvId: string,
  delivery: Omit<CVDelivery, "id">
) {
  try {
    await prisma.cVDelivery.create({
      data: {
        ...delivery,
        cvId,
      },
    });

    revalidatePath("/saved-cvs");
    return { success: true };
  } catch (error) {
    console.error("Error adding delivery:", error);
    return { success: false, error: "Failed to add delivery" };
  }
}

// ===============================
// UTILIDADES
// ===============================

export async function getSkillsByCategory(category: string) {
  try {
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
      include: { skills: true },
    });

    if (!currentCV) return [];

    return currentCV.skills.filter((skill: any) => skill.category === category);
  } catch (error) {
    console.error("Error getting skills by category:", error);
    return [];
  }
}

export async function getSelectedSkills() {
  try {
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
      include: { skills: true },
    });

    if (!currentCV) return [];

    return currentCV.skills.filter((skill: any) => skill.selected);
  } catch (error) {
    console.error("Error getting selected skills:", error);
    return [];
  }
}

export async function getSelectedCompetences() {
  try {
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
      include: { competences: true },
    });

    if (!currentCV) return [];

    return currentCV.competences.filter((comp: any) => comp.selected);
  } catch (error) {
    console.error("Error getting selected competences:", error);
    return [];
  }
}

export async function getSelectedExperiences() {
  try {
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
      include: { experiences: true },
    });

    if (!currentCV) return [];

    return currentCV.experiences.filter((exp: any) => exp.selected);
  } catch (error) {
    console.error("Error getting selected experiences:", error);
    return [];
  }
}

export async function getSelectedEducation() {
  try {
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
      include: { education: true },
    });

    if (!currentCV) return [];

    return currentCV.education.filter((edu: any) => edu.selected);
  } catch (error) {
    console.error("Error getting selected education:", error);
    return [];
  }
}

export async function updateOtherInfo(data: {
  drivingLicense: boolean;
  ownVehicle: boolean;
}) {
  try {
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    await prisma.cV.update({
      where: { id: currentCV.id },
      data: {
        drivingLicense: data.drivingLicense,
        ownVehicle: data.ownVehicle,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating other info:", error);
    return { success: false, error: "Failed to update other info" };
  }
}

export async function getCurrentCVName(): Promise<string | null> {
  try {
    const cv = await prisma.cV.findFirst({
      where: {
        userId: CURRENT_USER_ID,
        isActive: true,
      },
      select: {
        name: true,
      },
    });

    return cv?.name || null;
  } catch (error) {
    console.error("Error getting current CV name:", error);
    return null;
  }
}
