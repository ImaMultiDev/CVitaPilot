"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/auth";
import type {
  CVData,
  PersonalInfo,
  Language,
  Skill,
  SkillCategory,
  Competence,
  Interest,
  SoftSkill,
  Experience,
  Education,
  Certification,
  Achievement,
  Reference,
  CVDelivery,
  SocialNetwork,
  OtherInformation,
} from "@/types/cv";

// Función helper para obtener el usuario actual - CRÍTICO PARA MULTIUSUARIO
async function getCurrentUserId(): Promise<string> {
  const user = await getCurrentUser();
  if (!user?.id) {
    throw new Error("Usuario no autenticado. Debes iniciar sesión.");
  }
  return user.id;
}

// ===============================
// CV PRINCIPAL
// ===============================

export async function getCurrentCV(): Promise<CVData | null> {
  try {
    const userId = await getCurrentUserId();
    const cv = await prisma.cV.findFirst({
      where: {
        userId: userId,
        isActive: true,
      },
      include: {
        languages: true,
        skills: {
          include: {
            category: true,
          },
        },
        skillCategories: {
          include: {
            skills: true,
          },
        },
        competences: true,
        interests: true,
        softSkills: true,
        experiences: true,
        education: true,
        certifications: true,
        achievements: true,
        references: true,
        socialNetworks: true,
        otherInformation: true,
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
        website: cv.website || "",
        location: cv.location,
        socialNetworks: cv.socialNetworks.map((sn: any) => ({
          id: sn.id,
          name: sn.name,
          url: sn.url,
        })),
      },
      aboutMe: cv.aboutMe || "",
      languages: cv.languages.map((lang) => ({
        id: lang.id,
        name: lang.name,
        level: lang.level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Nativo",
      })),
      skills: cv.skills.map((skill: any) => ({
        id: skill.id,
        name: skill.name,
        categoryId: skill.categoryId,
        categoryName: skill.category.name,
        selected: skill.selected,
      })),
      skillCategories: cv.skillCategories.map((category: any) => ({
        id: category.id,
        name: category.name,
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
      softSkills:
        cv.softSkills?.map((softSkill: any) => ({
          id: softSkill.id,
          name: softSkill.name,
          selected: softSkill.selected,
        })) || [],
      experiences: cv.experiences.map((exp: any) => ({
        id: exp.id,
        position: exp.position,
        company: exp.company,
        location: exp.location,
        startDate: exp.startDate,
        endDate: exp.endDate || undefined,
        contractType: exp.contractType,
        workSchedule: exp.workSchedule,
        workModality: exp.workModality,
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
        selected: edu.selected,
      })),
      certifications:
        cv.certifications?.map((cert: any) => ({
          id: cert.id,
          name: cert.name,
          issuer: cert.issuer,
          date: cert.date,
          expiryDate: cert.expiryDate || undefined,
          credentialId: cert.credentialId || undefined,
          url: cert.url || undefined,
          selected: cert.selected,
        })) || [],
      achievements:
        cv.achievements?.map((achievement: any) => ({
          id: achievement.id,
          title: achievement.title,
          type: achievement.type as "achievement" | "project",
          description: achievement.description,
          date: achievement.date,
          company: achievement.company || undefined,
          technologies: achievement.technologies,
          metrics: achievement.metrics || undefined,
          url: achievement.url || undefined,
          selected: achievement.selected,
        })) || [],
      references:
        cv.references?.map((reference: any) => ({
          id: reference.id,
          name: reference.name,
          position: reference.position,
          company: reference.company,
          relationship: reference.relationship,
          phone: reference.phone,
          email: reference.email,
          yearsWorking: reference.yearsWorking || undefined,
          selected: reference.selected,
        })) || [],
      otherInformation:
        cv.otherInformation?.map((item: any) => ({
          id: item.id,
          name: item.name,
          icon: item.icon || undefined,
          selected: item.selected,
        })) || [],
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
    const userId = await getCurrentUserId();

    // Verificar si ya existe CUALQUIER CV para este usuario
    const existingCV = await prisma.cV.findFirst({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });

    if (existingCV) {
      // Si existe un CV pero no está activo, activarlo
      if (!existingCV.isActive) {
        await prisma.cV.updateMany({
          where: { userId: userId },
          data: { isActive: false },
        });

        await prisma.cV.update({
          where: { id: existingCV.id },
          data: { isActive: true },
        });
      }
      return existingCV.id;
    }

    // Datos iniciales de ejemplo genéricos
    const defaultData = {
      name: "CV Principal",
      userId: userId,
      isActive: true,
      personalName: "Ana García López",
      position: "Desarrolladora Full Stack",
      phone: "+34 600 123 456",
      email: "ana.garcia@ejemplo.com",
      linkedin: "https://www.linkedin.com/in/ana-garcia-lopez",
      website: "https://anagarcia.dev",
      location: "Madrid, España",
      aboutMe:
        "Desarrolladora Full Stack con experiencia en tecnologías modernas, apasionada por crear soluciones innovadoras y escalables. Especializada en React, Node.js y bases de datos.",
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

    // Añadir redes sociales por defecto
    await prisma.socialNetwork.createMany({
      data: [
        { cvId: cv.id, name: "GitHub", url: "https://github.com/anagarcia" },
        { cvId: cv.id, name: "Dev.to", url: "https://dev.to/anagarcia" },
      ],
    });

    // Crear categorías de habilidades por defecto (3 categorías como especificaste)
    const languageCategory = await prisma.skillCategory.create({
      data: { cvId: cv.id, name: "Lenguajes de Programación" },
    });

    const frameworkCategory = await prisma.skillCategory.create({
      data: { cvId: cv.id, name: "Frameworks" },
    });

    const databaseCategory = await prisma.skillCategory.create({
      data: { cvId: cv.id, name: "Bases de Datos" },
    });

    // Añadir skills por defecto con categorías (2 habilidades por categoría como especificaste)
    await prisma.skill.createMany({
      data: [
        // Programming Languages (2 habilidades)
        {
          cvId: cv.id,
          name: "JavaScript",
          categoryId: languageCategory.id,
          selected: true,
        },
        {
          cvId: cv.id,
          name: "Java",
          categoryId: languageCategory.id,
          selected: true,
        },

        // Frameworks (2 habilidades)
        {
          cvId: cv.id,
          name: "React",
          categoryId: frameworkCategory.id,
          selected: true,
        },
        {
          cvId: cv.id,
          name: "Next.js",
          categoryId: frameworkCategory.id,
          selected: true,
        },

        // Databases (2 habilidades)
        {
          cvId: cv.id,
          name: "PostgreSQL",
          categoryId: databaseCategory.id,
          selected: true,
        },
        {
          cvId: cv.id,
          name: "MySQL",
          categoryId: databaseCategory.id,
          selected: true,
        },
      ],
    });

    // Añadir competencias por defecto (3 competencias como especificaste)
    await prisma.competence.createMany({
      data: [
        { cvId: cv.id, name: "Desarrollo Multiplataforma", selected: true },
        { cvId: cv.id, name: "Backend", selected: true },
        { cvId: cv.id, name: "Bases de Datos", selected: true },
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

    // Añadir habilidades blandas por defecto (3 habilidades como especificaste)
    await prisma.softSkill.createMany({
      data: [
        { cvId: cv.id, name: "Trabajo en equipo", selected: true },
        { cvId: cv.id, name: "Comunicación efectiva", selected: true },
        { cvId: cv.id, name: "Resolución de problemas", selected: true },
      ],
    });

    // Añadir experiencias por defecto (1 experiencia como especificaste)
    await prisma.experience.createMany({
      data: [
        {
          cvId: cv.id,
          position: "FullStack Next.js Developer",
          company: "Empresa Ejemplo",
          location: "Madrid (Comunidad de Madrid)",
          startDate: "2025-06",
          contractType: "Contrato en prácticas",
          workSchedule: "Jornada completa",
          workModality: "Híbrido",
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
      ],
    });

    // Añadir formación académica oficial por defecto (1 formación como especificaste)
    await prisma.education.createMany({
      data: [
        {
          cvId: cv.id,
          title:
            "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma",
          institution: "Centro Ejemplo",
          location: "Madrid, España",
          startYear: "2023",
          endYear: "2025",
          selected: true,
        },
      ],
    });

    // Añadir certificaciones por defecto (1 certificación como especificaste)
    await prisma.certification.createMany({
      data: [
        {
          cvId: cv.id,
          name: "AWS Cloud Practitioner",
          issuer: "Amazon Web Services",
          date: "2024-03-15",
          expiryDate: "2027-03-15",
          credentialId: "AWS-CP-2024-123456",
          url: "https://aws.amazon.com/verification/AWS-CP-2024-123456",
          selected: true,
        },
      ],
    });

    // Añadir logros y proyectos por defecto (1 logro como especificaste)
    await prisma.achievement.createMany({
      data: [
        {
          cvId: cv.id,
          title: "Aplicación Web Full Stack con Next.js",
          type: "project",
          description:
            "Desarrollé una aplicación web completa de gestión de CVs con funcionalidades avanzadas de edición, exportación PDF y sistema de entregas.",
          date: "2024-2025",
          technologies: [
            "Next.js",
            "React",
            "Prisma",
            "PostgreSQL",
            "TypeScript",
            "Tailwind CSS",
          ],
          metrics:
            "Aplicación utilizada por más de 100 usuarios con 95% de satisfacción",
          url: "https://github.com/anagarcia/cv-gestor",
          selected: true,
        },
      ],
    });

    // Añadir referencias por defecto (1 referencia como especificaste)
    await prisma.reference.createMany({
      data: [
        {
          cvId: cv.id,
          name: "Carlos Martínez López",
          position: "Lead Developer",
          company: "Empresa Ejemplo",
          relationship: "Supervisor técnico",
          phone: "+34 915 789 012",
          email: "carlos.martinez@empresa-ejemplo.com",
          yearsWorking: "6 meses colaborando",
          selected: true,
        },
      ],
    });

    // Añadir otra información por defecto (2 ejemplos como especificaste)
    await prisma.otherInformation.createMany({
      data: [
        {
          cvId: cv.id,
          name: "Carné de conducir",
          selected: true,
        },
        {
          cvId: cv.id,
          name: "Coche propio",
          selected: true,
        },
      ],
    });

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
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
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
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
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
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
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
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    await prisma.skill.create({
      data: {
        name: skill.name,
        categoryId: skill.categoryId,
        selected: skill.selected,
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
        categoryId: skill.categoryId,
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

    // Revalidar múltiples rutas para asegurar actualización
    revalidatePath("/");
    revalidatePath("/preview");
    revalidatePath("/", "layout");
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
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
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

    // Revalidar múltiples rutas para asegurar actualización
    revalidatePath("/");
    revalidatePath("/preview");
    revalidatePath("/", "layout");
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
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
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
// HABILIDADES BLANDAS
// ===============================

export async function addSoftSkill(softSkill: Omit<SoftSkill, "id">) {
  try {
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    await prisma.softSkill.create({
      data: {
        ...softSkill,
        cvId: currentCV.id,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error adding soft skill:", error);
    return { success: false, error: "Failed to add soft skill" };
  }
}

export async function updateSoftSkill(softSkill: SoftSkill) {
  try {
    await prisma.softSkill.update({
      where: { id: softSkill.id },
      data: {
        name: softSkill.name,
        selected: softSkill.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating soft skill:", error);
    return { success: false, error: "Failed to update soft skill" };
  }
}

export async function toggleSoftSkill(id: string) {
  try {
    const softSkill = await prisma.softSkill.findUnique({
      where: { id },
    });

    if (!softSkill) {
      throw new Error("Soft skill not found");
    }

    await prisma.softSkill.update({
      where: { id },
      data: {
        selected: !softSkill.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error toggling soft skill:", error);
    return { success: false, error: "Failed to toggle soft skill" };
  }
}

export async function deleteSoftSkill(id: string) {
  try {
    await prisma.softSkill.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting soft skill:", error);
    return { success: false, error: "Failed to delete soft skill" };
  }
}

// ===============================
// EXPERIENCIAS
// ===============================

export async function addExperience(experience: Omit<Experience, "id">) {
  try {
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
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
        workSchedule: experience.workSchedule,
        workModality: experience.workModality,
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
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
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
// CERTIFICACIONES
// ===============================

export async function addCertification(
  certification: Omit<Certification, "id">
) {
  try {
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    await prisma.certification.create({
      data: {
        ...certification,
        cvId: currentCV.id,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error adding certification:", error);
    return { success: false, error: "Failed to add certification" };
  }
}

export async function updateCertification(certification: Certification) {
  try {
    await prisma.certification.update({
      where: { id: certification.id },
      data: {
        name: certification.name,
        issuer: certification.issuer,
        date: certification.date,
        expiryDate: certification.expiryDate,
        credentialId: certification.credentialId,
        url: certification.url,
        selected: certification.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating certification:", error);
    return { success: false, error: "Failed to update certification" };
  }
}

export async function toggleCertification(id: string) {
  try {
    const certification = await prisma.certification.findUnique({
      where: { id },
    });

    if (!certification) {
      throw new Error("Certification not found");
    }

    await prisma.certification.update({
      where: { id },
      data: {
        selected: !certification.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error toggling certification:", error);
    return { success: false, error: "Failed to toggle certification" };
  }
}

export async function deleteCertification(id: string) {
  try {
    await prisma.certification.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting certification:", error);
    return { success: false, error: "Failed to delete certification" };
  }
}

// ===============================
// LOGROS Y PROYECTOS
// ===============================

export async function addAchievement(achievement: Omit<Achievement, "id">) {
  try {
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    await prisma.achievement.create({
      data: {
        ...achievement,
        cvId: currentCV.id,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error adding achievement:", error);
    return { success: false, error: "Failed to add achievement" };
  }
}

export async function updateAchievement(achievement: Achievement) {
  try {
    await prisma.achievement.update({
      where: { id: achievement.id },
      data: {
        title: achievement.title,
        type: achievement.type,
        description: achievement.description,
        date: achievement.date,
        company: achievement.company,
        technologies: achievement.technologies,
        metrics: achievement.metrics,
        url: achievement.url,
        selected: achievement.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating achievement:", error);
    return { success: false, error: "Failed to update achievement" };
  }
}

export async function toggleAchievement(id: string) {
  try {
    const achievement = await prisma.achievement.findUnique({
      where: { id },
    });

    if (!achievement) {
      throw new Error("Achievement not found");
    }

    await prisma.achievement.update({
      where: { id },
      data: {
        selected: !achievement.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error toggling achievement:", error);
    return { success: false, error: "Failed to toggle achievement" };
  }
}

export async function deleteAchievement(id: string) {
  try {
    await prisma.achievement.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting achievement:", error);
    return { success: false, error: "Failed to delete achievement" };
  }
}

// ===============================
// REFERENCIAS PROFESIONALES
// ===============================

export async function addReference(reference: Omit<Reference, "id">) {
  try {
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    await prisma.reference.create({
      data: {
        ...reference,
        cvId: currentCV.id,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error adding reference:", error);
    return { success: false, error: "Failed to add reference" };
  }
}

export async function updateReference(reference: Reference) {
  try {
    await prisma.reference.update({
      where: { id: reference.id },
      data: {
        name: reference.name,
        position: reference.position,
        company: reference.company,
        relationship: reference.relationship,
        phone: reference.phone,
        email: reference.email,
        yearsWorking: reference.yearsWorking,
        selected: reference.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating reference:", error);
    return { success: false, error: "Failed to update reference" };
  }
}

export async function toggleReference(id: string) {
  try {
    const reference = await prisma.reference.findUnique({
      where: { id },
    });

    if (!reference) {
      throw new Error("Reference not found");
    }

    await prisma.reference.update({
      where: { id },
      data: {
        selected: !reference.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error toggling reference:", error);
    return { success: false, error: "Failed to toggle reference" };
  }
}

export async function deleteReference(id: string) {
  try {
    await prisma.reference.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting reference:", error);
    return { success: false, error: "Failed to delete reference" };
  }
}

// ===============================
// CVS GUARDADOS
// ===============================

export async function getSavedCVs() {
  try {
    const userId = await getCurrentUserId();
    const cvs = await prisma.cV.findMany({
      where: {
        userId: userId,
      },
      include: {
        deliveries: true,
        skills: {
          where: { selected: true },
          take: 3,
          select: { name: true },
        },
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
      personalName: cv.personalName,
      position: cv.position,
      aboutMe: cv.aboutMe,
      skillsPreview: cv.skills ? cv.skills.map((s: any) => s.name) : [],
    }));
  } catch (error) {
    console.error("Error getting saved CVs:", error);
    return [];
  }
}

export async function saveCurrentCVAs(name: string) {
  try {
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
      include: {
        languages: true,
        skills: true,
        skillCategories: true,
        competences: true,
        interests: true,
        experiences: true,
        education: true,
        certifications: true,
        achievements: true,
        socialNetworks: true,
      },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    // Crear una copia del CV actual
    const newCV = await prisma.cV.create({
      data: {
        name,
        userId: userId,
        isActive: false,
        personalName: currentCV.personalName,
        position: currentCV.position,
        phone: currentCV.phone,
        email: currentCV.email,
        linkedin: currentCV.linkedin,
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

    // Copiar categorías de habilidades primero
    const categoryMapping: Record<string, string> = {};
    if (currentCV.skillCategories.length > 0) {
      for (const category of currentCV.skillCategories) {
        const newCategory = await prisma.skillCategory.create({
          data: {
            cvId: newCV.id,
            name: category.name,
          },
        });
        categoryMapping[category.id] = newCategory.id;
      }
    }

    // Copiar skills con las nuevas categorías
    if (currentCV.skills.length > 0) {
      await prisma.skill.createMany({
        data: currentCV.skills.map((skill: any) => ({
          cvId: newCV.id,
          name: skill.name,
          categoryId: categoryMapping[skill.categoryId],
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
          workSchedule: exp.workSchedule,
          workModality: exp.workModality,
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
          selected: edu.selected,
        })),
      });
    }

    if (currentCV.certifications.length > 0) {
      await prisma.certification.createMany({
        data: currentCV.certifications.map((cert: any) => ({
          cvId: newCV.id,
          name: cert.name,
          issuer: cert.issuer,
          date: cert.date,
          expiryDate: cert.expiryDate,
          credentialId: cert.credentialId,
          url: cert.url,
          selected: cert.selected,
        })),
      });
    }

    if (currentCV.achievements.length > 0) {
      await prisma.achievement.createMany({
        data: currentCV.achievements.map((achievement: any) => ({
          cvId: newCV.id,
          title: achievement.title,
          type: achievement.type,
          description: achievement.description,
          date: achievement.date,
          company: achievement.company,
          technologies: achievement.technologies,
          metrics: achievement.metrics,
          url: achievement.url,
          selected: achievement.selected,
        })),
      });
    }

    // Copiar redes sociales
    if (currentCV.socialNetworks.length > 0) {
      await prisma.socialNetwork.createMany({
        data: currentCV.socialNetworks.map((sn: any) => ({
          cvId: newCV.id,
          name: sn.name,
          url: sn.url,
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
    const userId = await getCurrentUserId();
    // Desactivar el CV actual
    await prisma.cV.updateMany({
      where: { userId: userId, isActive: true },
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
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
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
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
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
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
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
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
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
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
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
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
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
    const userId = await getCurrentUserId();
    const cv = await prisma.cV.findFirst({
      where: {
        userId: userId,
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

// ===============================
// UTILIDADES DE LIMPIEZA
// ===============================

export async function forceRevalidation() {
  try {
    // Revalidar todas las rutas importantes
    revalidatePath("/");
    revalidatePath("/preview");
    revalidatePath("/saved-cvs");
    revalidatePath("/settings");

    // También revalidar por tags si los usamos
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Error forcing revalidation:", error);
    return { success: false, error: "Failed to force revalidation" };
  }
}

export async function cleanupDuplicateCVs() {
  try {
    const userId = await getCurrentUserId();
    // Obtener todos los CVs del usuario
    const allCVs = await prisma.cV.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });

    if (allCVs.length <= 1) {
      return { success: true, message: "No hay CVs duplicados" };
    }

    // Encontrar CVs con el mismo nombre
    const cvsByName = allCVs.reduce(
      (acc, cv) => {
        if (!acc[cv.name]) {
          acc[cv.name] = [];
        }
        acc[cv.name].push(cv);
        return acc;
      },
      {} as Record<string, typeof allCVs>
    );

    let deletedCount = 0;

    for (const [name, cvs] of Object.entries(cvsByName)) {
      if (cvs.length > 1) {
        // Mantener solo el más reciente
        const [newest, ...duplicates] = cvs;

        // Eliminar los duplicados
        for (const duplicate of duplicates) {
          await prisma.cV.delete({
            where: { id: duplicate.id },
          });
          deletedCount++;
        }

        // Asegurar que el más reciente esté activo si es "CV Principal"
        if (name === "CV Principal") {
          await prisma.cV.updateMany({
            where: { userId: userId },
            data: { isActive: false },
          });

          await prisma.cV.update({
            where: { id: newest.id },
            data: { isActive: true },
          });
        }
      }
    }

    revalidatePath("/");
    revalidatePath("/saved-cvs");

    return {
      success: true,
      message: `Se eliminaron ${deletedCount} CVs duplicados`,
    };
  } catch (error) {
    console.error("Error cleaning up duplicate CVs:", error);
    return {
      success: false,
      error: "Failed to cleanup duplicate CVs",
    };
  }
}

// ===============================
// REDES SOCIALES
// ===============================

export async function addSocialNetwork(
  socialNetwork: Omit<SocialNetwork, "id">
) {
  try {
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
      include: { socialNetworks: true },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    // Verificar límite máximo de 5 redes sociales
    if (currentCV.socialNetworks.length >= 5) {
      return { success: false, error: "Maximum 5 social networks allowed" };
    }

    await prisma.socialNetwork.create({
      data: {
        ...socialNetwork,
        cvId: currentCV.id,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error adding social network:", error);
    return { success: false, error: "Failed to add social network" };
  }
}

export async function updateSocialNetwork(socialNetwork: SocialNetwork) {
  try {
    await prisma.socialNetwork.update({
      where: { id: socialNetwork.id },
      data: {
        name: socialNetwork.name,
        url: socialNetwork.url,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating social network:", error);
    return { success: false, error: "Failed to update social network" };
  }
}

export async function deleteSocialNetwork(id: string) {
  try {
    await prisma.socialNetwork.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting social network:", error);
    return { success: false, error: "Failed to delete social network" };
  }
}

// ===============================
// CATEGORÍAS DE HABILIDADES
// ===============================

export async function addSkillCategory(category: Omit<SkillCategory, "id">) {
  try {
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
      include: { skillCategories: true },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    // Verificar límite máximo de categorías (opcional)
    if (currentCV.skillCategories.length >= 20) {
      return { success: false, error: "Maximum 20 skill categories allowed" };
    }

    const newCategory = await prisma.skillCategory.create({
      data: {
        ...category,
        cvId: currentCV.id,
      },
    });

    revalidatePath("/");
    return { success: true, category: newCategory };
  } catch (error) {
    console.error("Error adding skill category:", error);
    return { success: false, error: "Failed to add skill category" };
  }
}

export async function updateSkillCategory(category: SkillCategory) {
  try {
    await prisma.skillCategory.update({
      where: { id: category.id },
      data: {
        name: category.name,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating skill category:", error);
    return { success: false, error: "Failed to update skill category" };
  }
}

export async function deleteSkillCategory(id: string) {
  try {
    // Eliminar en cascada: primero las habilidades, luego la categoría
    await prisma.$transaction(async (tx) => {
      // Eliminar todas las habilidades de esta categoría
      await tx.skill.deleteMany({
        where: { categoryId: id },
      });

      // Eliminar la categoría
      await tx.skillCategory.delete({
        where: { id },
      });
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting skill category:", error);
    return { success: false, error: "Failed to delete skill category" };
  }
}

// ===============================
// OTRA INFORMACIÓN
// ===============================

export async function addOtherInformation(
  otherInfo: Omit<OtherInformation, "id">
) {
  try {
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
      include: { otherInformation: true },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    // Verificar límite máximo de 10 elementos
    if (currentCV.otherInformation.length >= 10) {
      return {
        success: false,
        error: "Maximum 10 other information items allowed",
      };
    }

    await prisma.otherInformation.create({
      data: {
        ...otherInfo,
        cvId: currentCV.id,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error adding other information:", error);
    return { success: false, error: "Failed to add other information" };
  }
}

export async function updateOtherInformation(otherInfo: OtherInformation) {
  try {
    await prisma.otherInformation.update({
      where: { id: otherInfo.id },
      data: {
        name: otherInfo.name,
        icon: otherInfo.icon,
        selected: otherInfo.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating other information:", error);
    return { success: false, error: "Failed to update other information" };
  }
}

export async function toggleOtherInformation(id: string) {
  try {
    const otherInfo = await prisma.otherInformation.findUnique({
      where: { id },
    });

    if (!otherInfo) {
      return { success: false, error: "Other information not found" };
    }

    await prisma.otherInformation.update({
      where: { id },
      data: {
        selected: !otherInfo.selected,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error toggling other information:", error);
    return { success: false, error: "Failed to toggle other information" };
  }
}

export async function deleteOtherInformation(id: string) {
  try {
    await prisma.otherInformation.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting other information:", error);
    return { success: false, error: "Failed to delete other information" };
  }
}

export async function updateAllOtherInformation(
  otherInformation: OtherInformation[]
) {
  try {
    const userId = await getCurrentUserId();
    const currentCV = await prisma.cV.findFirst({
      where: { userId: userId, isActive: true },
    });

    if (!currentCV) {
      throw new Error("No active CV found");
    }

    // Usar transacción para actualizar todo atomicamente
    await prisma.$transaction(async (tx) => {
      // Obtener items existentes
      const existingItems = await tx.otherInformation.findMany({
        where: { cvId: currentCV.id },
      });

      // Separar items a actualizar, crear y eliminar
      const itemsToUpdate = otherInformation.filter((item) =>
        existingItems.some((existing) => existing.id === item.id)
      );

      const itemsToCreate = otherInformation.filter(
        (item) => !existingItems.some((existing) => existing.id === item.id)
      );

      const itemsToDelete = existingItems.filter(
        (existing) => !otherInformation.some((item) => item.id === existing.id)
      );

      // Actualizar items existentes
      for (const item of itemsToUpdate) {
        await tx.otherInformation.update({
          where: { id: item.id },
          data: {
            name: item.name,
            icon: item.icon,
            selected: item.selected,
          },
        });
      }

      // Crear nuevos items
      for (const item of itemsToCreate) {
        await tx.otherInformation.create({
          data: {
            name: item.name,
            icon: item.icon,
            selected: item.selected,
            cvId: currentCV.id,
          },
        });
      }

      // Eliminar items no presentes
      for (const item of itemsToDelete) {
        await tx.otherInformation.delete({
          where: { id: item.id },
        });
      }
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating all other information:", error);
    return { success: false, error: "Failed to update other information" };
  }
}

// ===============================
// CREAR NUEVO CV VACÍO
// ===============================

export async function createNewCV(
  name: string
): Promise<{ success: boolean; cvId?: string; error?: string }> {
  try {
    const userId = await getCurrentUserId();

    // Validar que el nombre no esté vacío
    if (!name || name.trim().length === 0) {
      return { success: false, error: "El nombre del CV es requerido" };
    }

    // Verificar que no exista otro CV con el mismo nombre
    const existingCV = await prisma.cV.findFirst({
      where: {
        userId: userId,
        name: name.trim(),
      },
    });

    if (existingCV) {
      return { success: false, error: "Ya existe un CV con este nombre" };
    }

    // Desactivar el CV activo actual
    await prisma.cV.updateMany({
      where: { userId: userId, isActive: true },
      data: { isActive: false },
    });

    // Crear el nuevo CV con datos mínimos vacíos
    const newCV = await prisma.cV.create({
      data: {
        name: name.trim(),
        userId: userId,
        isActive: true,
        // Información personal mínima vacía
        personalName: "",
        position: "",
        phone: "",
        email: "",
        linkedin: "",
        website: "",
        location: "",
        aboutMe: "",
        drivingLicense: false,
        ownVehicle: false,
      },
    });

    revalidatePath("/");
    return { success: true, cvId: newCV.id };
  } catch (error) {
    console.error("Error creating new CV:", error);
    return { success: false, error: "Error al crear el nuevo CV" };
  }
}

export async function getCVById(cvId: string): Promise<CVData | null> {
  try {
    const cv = await prisma.cV.findUnique({
      where: { id: cvId },
      include: {
        languages: true,
        skills: { include: { category: true } },
        skillCategories: { include: { skills: true } },
        competences: true,
        interests: true,
        softSkills: true,
        experiences: true,
        education: true,
        certifications: true,
        achievements: true,
        references: true,
        socialNetworks: true,
        otherInformation: true,
      },
    });
    if (!cv) return null;
    return {
      personalInfo: {
        name: cv.personalName,
        position: cv.position,
        phone: cv.phone,
        email: cv.email,
        linkedin: cv.linkedin || "",
        website: cv.website || "",
        location: cv.location,
        socialNetworks: cv.socialNetworks.map((sn: any) => ({
          id: sn.id,
          name: sn.name,
          url: sn.url,
        })),
      },
      aboutMe: cv.aboutMe || "",
      languages: cv.languages.map((lang) => ({
        id: lang.id,
        name: lang.name,
        level: lang.level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Nativo",
      })),
      skills: cv.skills.map((skill: any) => ({
        id: skill.id,
        name: skill.name,
        categoryId: skill.categoryId,
        categoryName: skill.category.name,
        selected: skill.selected,
      })),
      skillCategories: cv.skillCategories.map((category: any) => ({
        id: category.id,
        name: category.name,
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
      softSkills:
        cv.softSkills?.map((softSkill: any) => ({
          id: softSkill.id,
          name: softSkill.name,
          selected: softSkill.selected,
        })) || [],
      experiences: cv.experiences.map((exp: any) => ({
        id: exp.id,
        position: exp.position,
        company: exp.company,
        location: exp.location,
        startDate: exp.startDate,
        endDate: exp.endDate || undefined,
        contractType: exp.contractType,
        workSchedule: exp.workSchedule,
        workModality: exp.workModality,
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
        selected: edu.selected,
      })),
      certifications:
        cv.certifications?.map((cert: any) => ({
          id: cert.id,
          name: cert.name,
          issuer: cert.issuer,
          date: cert.date,
          expiryDate: cert.expiryDate || undefined,
          credentialId: cert.credentialId || undefined,
          url: cert.url || undefined,
          selected: cert.selected,
        })) || [],
      achievements:
        cv.achievements?.map((achievement: any) => ({
          id: achievement.id,
          title: achievement.title,
          type: achievement.type as "achievement" | "project",
          description: achievement.description,
          date: achievement.date,
          company: achievement.company || undefined,
          technologies: achievement.technologies,
          metrics: achievement.metrics || undefined,
          url: achievement.url || undefined,
          selected: achievement.selected,
        })) || [],
      references:
        cv.references?.map((reference: any) => ({
          id: reference.id,
          name: reference.name,
          position: reference.position,
          company: reference.company,
          relationship: reference.relationship,
          phone: reference.phone,
          email: reference.email,
          yearsWorking: reference.yearsWorking || undefined,
          selected: reference.selected,
        })) || [],
      otherInformation:
        cv.otherInformation?.map((item: any) => ({
          id: item.id,
          name: item.name,
          icon: item.icon || undefined,
          selected: item.selected,
        })) || [],
      drivingLicense: cv.drivingLicense,
      ownVehicle: cv.ownVehicle,
    };
  } catch (error) {
    console.error("Error getting CV by id:", error);
    return null;
  }
}
