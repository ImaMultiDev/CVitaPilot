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
  SoftSkill,
  Experience,
  Education,
  Certification,
  Achievement,
  Reference,
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
        softSkills: true,
        experiences: true,
        education: true,
        certifications: true,
        achievements: true,
        references: true,
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
        type: edu.type as "formal" | "additional",
        duration: edu.duration || undefined,
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
    // Verificar si ya existe CUALQUIER CV para este usuario
    const existingCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID },
      orderBy: { createdAt: "desc" },
    });

    if (existingCV) {
      // Si existe un CV pero no está activo, activarlo
      if (!existingCV.isActive) {
        await prisma.cV.updateMany({
          where: { userId: CURRENT_USER_ID },
          data: { isActive: false },
        });

        await prisma.cV.update({
          where: { id: existingCV.id },
          data: { isActive: true },
        });
      }
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

    // Añadir habilidades blandas por defecto
    await prisma.softSkill.createMany({
      data: [
        { cvId: cv.id, name: "Trabajo en equipo", selected: true },
        { cvId: cv.id, name: "Comunicación efectiva", selected: true },
        { cvId: cv.id, name: "Resolución de problemas", selected: true },
        { cvId: cv.id, name: "Adaptabilidad", selected: true },
        { cvId: cv.id, name: "Pensamiento crítico", selected: true },
        { cvId: cv.id, name: "Liderazgo", selected: false },
        { cvId: cv.id, name: "Gestión del tiempo", selected: true },
        { cvId: cv.id, name: "Creatividad", selected: false },
        { cvId: cv.id, name: "Empatía", selected: false },
        { cvId: cv.id, name: "Iniciativa", selected: true },
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
        {
          cvId: cv.id,
          position: "Gestor ERP SAP",
          company: "ERRIBERRI S.L.",
          location: "Olite (Comunidad foral de Navarra)",
          startDate: "2024-08",
          contractType: "Contrato temporal",
          workSchedule: "Jornada completa",
          workModality: "Presencial",
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
          workSchedule: "Jornada completa",
          workModality: "Presencial",
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
          workSchedule: "Jornada completa",
          workModality: "Presencial",
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

    // Añadir certificaciones por defecto
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
        {
          cvId: cv.id,
          name: "React Developer Certification",
          issuer: "Meta",
          date: "2023-11-20",
          credentialId: "META-REACT-2023-789012",
          url: "https://coursera.org/verify/META-REACT-2023-789012",
          selected: true,
        },
        {
          cvId: cv.id,
          name: "Java SE 11 Developer",
          issuer: "Oracle",
          date: "2023-08-10",
          expiryDate: "2026-08-10",
          credentialId: "OCP-JAVA-SE11-345678",
          selected: true,
        },
        {
          cvId: cv.id,
          name: "Scrum Master Certified (SMC)",
          issuer: "Scrum Alliance",
          date: "2024-01-25",
          expiryDate: "2026-01-25",
          credentialId: "SA-SMC-2024-901234",
          url: "https://scrumalliance.org/verify/SA-SMC-2024-901234",
          selected: true,
        },
        {
          cvId: cv.id,
          name: "Google Analytics Individual Qualification",
          issuer: "Google",
          date: "2023-06-05",
          expiryDate: "2024-06-05",
          credentialId: "GA-IQ-2023-567890",
          selected: false,
        },
        {
          cvId: cv.id,
          name: "Microsoft Azure Fundamentals",
          issuer: "Microsoft",
          date: "2024-02-12",
          credentialId: "MS-AZ900-2024-123789",
          url: "https://learn.microsoft.com/verify/MS-AZ900-2024-123789",
          selected: false,
        },
      ],
    });

    // Añadir logros y proyectos por defecto
    await prisma.achievement.createMany({
      data: [
        {
          cvId: cv.id,
          title: "Desarrollo de Sistema ERP Completo",
          type: "project",
          description:
            "Diseñé y desarrollé un sistema ERP completo para gestión empresarial, incluyendo módulos de inventario, facturación, CRM y reporting avanzado.",
          date: "2024",
          company: "ERRIBERRI S.L.",
          technologies: [
            "SAP",
            "Microsoft 365",
            "SharePoint",
            "Power Platform",
          ],
          metrics:
            "Redujo tiempo de procesamiento de pedidos en 40% y mejoró eficiencia operativa en 25%",
          selected: true,
        },
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
          url: "https://github.com/kodebidean/cv-gestor",
          selected: true,
        },
        {
          cvId: cv.id,
          title: "Certificación AWS Cloud Practitioner",
          type: "achievement",
          description:
            "Obtuve la certificación AWS Cloud Practitioner, demostrando conocimientos sólidos en servicios de nube y arquitectura AWS.",
          date: "2024-03",
          company: "Amazon Web Services",
          technologies: ["AWS", "Cloud Computing", "EC2", "S3", "RDS"],
          metrics: "Puntuación: 850/1000 (85%)",
          selected: true,
        },
        {
          cvId: cv.id,
          title: "Optimización de Procesos CNC",
          type: "achievement",
          description:
            "Implementé mejoras en procesos de programación CNC que resultaron en significativa reducción de tiempos de producción.",
          date: "2023",
          company: "ERRIBERRI S.L.",
          technologies: ["CNC Programming", "CAD/CAM", "Lean Manufacturing"],
          metrics:
            "Redujo tiempo de setup en 30% y aumentó productividad en 20%",
          selected: true,
        },
        {
          cvId: cv.id,
          title: "Sistema de Análisis de Mercado Digital",
          type: "project",
          description:
            "Desarrollé herramientas de análisis para investigación comercial y marketing digital, automatizando procesos de recopilación de datos.",
          date: "2017",
          company: "SUPERRECAMBIOS.COM",
          technologies: [
            "Marketing Digital",
            "Analytics",
            "Data Analysis",
            "Excel VBA",
          ],
          metrics: "Aumentó eficiencia en análisis de mercado en 60%",
          selected: false,
        },
        {
          cvId: cv.id,
          title: "Reconocimiento por Excelencia Académica",
          type: "achievement",
          description:
            "Reconocimiento por mantener expediente académico sobresaliente durante toda la formación en Desarrollo de Aplicaciones Multiplataforma.",
          date: "2025",
          company: "U-TAD",
          technologies: [],
          metrics: "Nota media: 9.2/10",
          selected: false,
        },
      ],
    });

    // Añadir referencias por defecto
    await prisma.reference.createMany({
      data: [
        {
          cvId: cv.id,
          name: "María González Pérez",
          position: "Gerente de Sistemas",
          company: "ERRIBERRI S.L.",
          relationship: "Supervisora directa",
          phone: "+34 948 123 456",
          email: "maria.gonzalez@erriberri.com",
          yearsWorking: "2 años trabajando juntos",
          selected: true,
        },
        {
          cvId: cv.id,
          name: "Carlos Martínez López",
          position: "Lead Developer",
          company: "SYNKROSS",
          relationship: "Supervisor técnico",
          phone: "+34 915 789 012",
          email: "carlos.martinez@synkross.com",
          yearsWorking: "6 meses colaborando",
          selected: true,
        },
        {
          cvId: cv.id,
          name: "Ana Rodríguez Sánchez",
          position: "Directora Académica",
          company: "U-TAD",
          relationship: "Tutora académica",
          phone: "+34 918 567 890",
          email: "ana.rodriguez@u-tad.com",
          yearsWorking: "2 años de formación",
          selected: false,
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
// HABILIDADES BLANDAS
// ===============================

export async function addSoftSkill(softSkill: Omit<SoftSkill, "id">) {
  try {
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
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
// CERTIFICACIONES
// ===============================

export async function addCertification(
  certification: Omit<Certification, "id">
) {
  try {
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
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
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
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
    const currentCV = await prisma.cV.findFirst({
      where: { userId: CURRENT_USER_ID, isActive: true },
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
        certifications: true,
        achievements: true,
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
          type: edu.type,
          duration: edu.duration,
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
    // Obtener todos los CVs del usuario
    const allCVs = await prisma.cV.findMany({
      where: { userId: CURRENT_USER_ID },
      orderBy: { createdAt: "desc" },
    });

    if (allCVs.length <= 1) {
      return { success: true, message: "No hay CVs duplicados" };
    }

    // Encontrar CVs con el mismo nombre
    const cvsByName = allCVs.reduce((acc, cv) => {
      if (!acc[cv.name]) {
        acc[cv.name] = [];
      }
      acc[cv.name].push(cv);
      return acc;
    }, {} as Record<string, typeof allCVs>);

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
            where: { userId: CURRENT_USER_ID },
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
