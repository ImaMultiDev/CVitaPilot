// src/contexts/CVContext.tsx

"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  CVData,
  SavedCV,
  CVDelivery,
  Skill,
  Experience,
  Education,
  Language,
  Competence,
  Interest,
} from "@/types/cv";

// Estado inicial basado en tu CV actual
const initialCVData: CVData = {
  personalInfo: {
    name: "Imanol Mugueta Unsain",
    position: "Multiplatform Developer",
    phone: "+34 689 18 17 20",
    email: "contact@imamultidev.dev",
    linkedin: "https://www.linkedin.com/in/imanol-mugueta-unsain/",
    website: "https://imamultidev.dev",
    location: "3130 Carcastillo (Navarra)",
    socialNetworks: [
      { id: "1", name: "GitHub", url: "https://github.com/kodebidean" },
      { id: "2", name: "Dev.to", url: "https://dev.to/imamultidev" },
    ],
  },
  aboutMe:
    "Desarrollador Multiplataforma, con conocimientos en diversos lenguajes de programación, experiencia de desarrollo frontend y backend",
  languages: [
    { id: "1", name: "Español", level: "Nativo" },
    { id: "2", name: "English", level: "B2" },
  ],
  skillCategories: [
    { id: "cat1", name: "Lenguajes de Programación" },
    { id: "cat2", name: "Frameworks" },
    { id: "cat3", name: "Bases de Datos" },
    { id: "cat4", name: "Herramientas" },
    { id: "cat5", name: "Librerías" },
  ],
  skills: [
    // Programming Languages
    {
      id: "1",
      name: "JavaScript",
      categoryId: "cat1",
      categoryName: "Lenguajes de Programación",
      selected: true,
    },
    {
      id: "2",
      name: "Java",
      categoryId: "cat1",
      categoryName: "Lenguajes de Programación",
      selected: true,
    },
    {
      id: "3",
      name: "Kotlin",
      categoryId: "cat1",
      categoryName: "Lenguajes de Programación",
      selected: true,
    },
    {
      id: "4",
      name: "Swift",
      categoryId: "cat1",
      categoryName: "Lenguajes de Programación",
      selected: true,
    },
    {
      id: "5",
      name: "Python",
      categoryId: "cat1",
      categoryName: "Lenguajes de Programación",
      selected: true,
    },
    {
      id: "6",
      name: "C++",
      categoryId: "cat1",
      categoryName: "Lenguajes de Programación",
      selected: false,
    },
    {
      id: "7",
      name: "C#",
      categoryId: "cat1",
      categoryName: "Lenguajes de Programación",
      selected: false,
    },

    // Frameworks
    {
      id: "8",
      name: "React",
      categoryId: "cat2",
      categoryName: "Frameworks",
      selected: true,
    },
    {
      id: "9",
      name: "Next.js",
      categoryId: "cat2",
      categoryName: "Frameworks",
      selected: true,
    },
    {
      id: "10",
      name: "Tailwind",
      categoryId: "cat2",
      categoryName: "Frameworks",
      selected: true,
    },
    {
      id: "11",
      name: "Angular",
      categoryId: "cat2",
      categoryName: "Frameworks",
      selected: true,
    },
    {
      id: "12",
      name: "Astro",
      categoryId: "cat2",
      categoryName: "Frameworks",
      selected: true,
    },
    {
      id: "13",
      name: "Spring Boot",
      categoryId: "cat2",
      categoryName: "Frameworks",
      selected: true,
    },
    {
      id: "14",
      name: "Flutter",
      categoryId: "cat2",
      categoryName: "Frameworks",
      selected: true,
    },
    {
      id: "15",
      name: "React Native",
      categoryId: "cat2",
      categoryName: "Frameworks",
      selected: true,
    },
    {
      id: "16",
      name: "Vue.js",
      categoryId: "cat2",
      categoryName: "Frameworks",
      selected: false,
    },
    {
      id: "17",
      name: "Jetpack Compose",
      categoryId: "cat2",
      categoryName: "Frameworks",
      selected: false,
    },

    // Databases
    {
      id: "18",
      name: "PostgreSQL",
      categoryId: "cat3",
      categoryName: "Bases de Datos",
      selected: true,
    },
    {
      id: "19",
      name: "MySQL",
      categoryId: "cat3",
      categoryName: "Bases de Datos",
      selected: true,
    },
    {
      id: "20",
      name: "MongoDB",
      categoryId: "cat3",
      categoryName: "Bases de Datos",
      selected: true,
    },
    {
      id: "21",
      name: "Firebase",
      categoryId: "cat3",
      categoryName: "Bases de Datos",
      selected: true,
    },
    {
      id: "22",
      name: "SQLite",
      categoryId: "cat3",
      categoryName: "Bases de Datos",
      selected: false,
    },
    {
      id: "23",
      name: "SQL Server",
      categoryId: "cat3",
      categoryName: "Bases de Datos",
      selected: false,
    },

    // Tools
    {
      id: "24",
      name: "Git",
      categoryId: "cat4",
      categoryName: "Herramientas",
      selected: true,
    },
    {
      id: "25",
      name: "Docker",
      categoryId: "cat4",
      categoryName: "Herramientas",
      selected: false,
    },
    {
      id: "26",
      name: "Node.js",
      categoryId: "cat4",
      categoryName: "Herramientas",
      selected: true,
    },
    {
      id: "27",
      name: "Postman",
      categoryId: "cat4",
      categoryName: "Herramientas",
      selected: false,
    },
    {
      id: "28",
      name: "Jira",
      categoryId: "cat4",
      categoryName: "Herramientas",
      selected: true,
    },

    // Libraries
    {
      id: "29",
      name: "Prisma",
      categoryId: "cat5",
      categoryName: "Librerías",
      selected: true,
    },
    {
      id: "30",
      name: "NextAuth",
      categoryId: "cat5",
      categoryName: "Librerías",
      selected: true,
    },
    {
      id: "31",
      name: "Formik",
      categoryId: "cat5",
      categoryName: "Librerías",
      selected: true,
    },
    {
      id: "32",
      name: "Zod",
      categoryId: "cat5",
      categoryName: "Librerías",
      selected: true,
    },
    {
      id: "33",
      name: "GSAP",
      categoryId: "cat5",
      categoryName: "Librerías",
      selected: false,
    },
    {
      id: "34",
      name: "Bootstrap",
      categoryId: "cat5",
      categoryName: "Librerías",
      selected: false,
    },
  ],
  competences: [
    { id: "1", name: "Desarrollo Multiplataforma", selected: true },
    { id: "2", name: "Backend", selected: true },
    { id: "3", name: "Bases de Datos", selected: true },
    { id: "4", name: "Desarrollo de Sistemas ERP", selected: true },
    { id: "5", name: "CMS", selected: true },
    { id: "6", name: "CRM", selected: true },
    { id: "7", name: "Landing page", selected: true },
    { id: "8", name: "Construcción MCP", selected: true },
    { id: "9", name: "SLM", selected: true },
    { id: "10", name: "Frontend", selected: false },
    { id: "11", name: "Fullstack", selected: false },
    { id: "12", name: "Marketing", selected: false },
  ],
  interests: [
    { id: "1", name: "Tecnología", selected: true },
    { id: "2", name: "Programación", selected: true },
    { id: "3", name: "IA", selected: true },
    { id: "4", name: "Deportes", selected: false },
  ],
  experiences: [
    {
      id: "1",
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
      id: "2",
      position: "Gestor ERP SAP",
      company: "ERRIBERRI S.L.",
      location: "Olite (Comunidad foral de Navarra)",
      startDate: "2024-08",
      contractType: "Contrato temporal",
      workSchedule: "Jornada completa",
      workModality: "Presencial",
      description: "SAP, Microsoft 365 (SharePoint, Power Platform)",
      technologies: ["SAP", "Microsoft 365", "SharePoint", "Power Platform"],
      selected: true,
    },
    {
      id: "3",
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
      id: "4",
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
  education: [
    {
      id: "1",
      title: "FPS Desarrollo de Aplicaciones Multiplataforma",
      institution: "U-TAD",
      location: "Madrid (Comunidad de Madrid)",
      startYear: "2023",
      endYear: "2025",
      selected: true,
    },
    {
      id: "2",
      title: "Técnico en Programación CNC",
      institution: "CIP ETI",
      location: "Tudela, Navarra",
      startYear: "2017",
      endYear: "2018",
      selected: false,
    },
    {
      id: "3",
      title: "Técnico Superior en Gestión Comercial y Marketing",
      institution: "CI Maria Ana Sanz",
      location: "Pamplona, Navarra",
      startYear: "2014",
      endYear: "2016",
      selected: false,
    },
    {
      id: "4",
      title: "Bachillerato Científico-Tecnológico",
      institution: "IES Tierra Estella",
      location: "Estella, Navarra",
      startYear: "2012",
      endYear: "2014",
      selected: false,
    },
  ],
  softSkills: [
    { id: "1", name: "Trabajo en equipo", selected: true },
    { id: "2", name: "Comunicación efectiva", selected: true },
    { id: "3", name: "Resolución de problemas", selected: true },
    { id: "4", name: "Adaptabilidad", selected: true },
    { id: "5", name: "Pensamiento crítico", selected: true },
    { id: "6", name: "Gestión del tiempo", selected: true },
    { id: "7", name: "Iniciativa", selected: true },
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2024-03",
      expiryDate: "2027-03",
      credentialId: "AWS-CP-2024-001",
      url: "https://aws.amazon.com/verification",
      selected: true,
    },
    {
      id: "2",
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2024-01",
      expiryDate: "",
      credentialId: "META-REACT-2024-002",
      url: "https://developers.facebook.com/certification",
      selected: true,
    },
    {
      id: "3",
      name: "Curso de Desarrollo Web Full Stack",
      issuer: "Codecademy",
      date: "2023-01",
      expiryDate: "",
      credentialId: "CODECADEMY-FULLSTACK-2023",
      url: "https://codecademy.com/verify/CODECADEMY-FULLSTACK-2023",
      selected: true,
    },
    {
      id: "4",
      name: "Certificación en Fundamentos de Cloud Computing",
      issuer: "Amazon Web Services",
      date: "2024-02",
      expiryDate: "2027-02",
      credentialId: "AWS-FUNDAMENTALS-2024",
      url: "https://aws.amazon.com/verification/AWS-FUNDAMENTALS-2024",
      selected: false,
    },
  ],
  achievements: [
    {
      id: "1",
      title: "Sistema ERP Personalizado",
      type: "project",
      description:
        "Desarrollo completo de sistema ERP para gestión empresarial con módulos de inventario, facturación y CRM integrado.",
      date: "2024",
      company: "ERRIBERRI S.L.",
      technologies: ["Next.js", "Prisma", "PostgreSQL", "TypeScript"],
      metrics:
        "Redujo tiempo de procesamiento en 40% y errores manuales en 60%",
      url: "https://github.com/kodebidean/erp-system",
      selected: true,
    },
    {
      id: "2",
      title: "Reconocimiento Mejor Estudiante DAM",
      type: "achievement",
      description:
        "Galardón por excelencia académica y proyecto final innovador en Desarrollo de Aplicaciones Multiplataforma.",
      date: "2025-06",
      company: "U-TAD",
      technologies: ["Flutter", "Firebase", "Dart"],
      metrics: "Nota media: 9.2/10, Proyecto final: 9.8/10",
      url: "",
      selected: true,
    },
  ],
  references: [
    {
      id: "1",
      name: "María González Pérez",
      position: "Directora de Tecnología",
      company: "SYNKROSS",
      relationship: "Supervisora directa",
      phone: "+34 600 123 456",
      email: "maria.gonzalez@synkross.com",
      yearsWorking: "6 meses",
      selected: true,
    },
    {
      id: "2",
      name: "Carlos Martínez López",
      position: "Gerente de Sistemas",
      company: "ERRIBERRI S.L.",
      relationship: "Supervisor directo",
      phone: "+34 600 789 012",
      email: "carlos.martinez@erriberri.com",
      yearsWorking: "1 año",
      selected: true,
    },
  ],
  drivingLicense: true,
  ownVehicle: true,
};

interface CVState {
  currentCV: CVData;
  savedCVs: SavedCV[];
  isEditing: boolean;
}

const initialState: CVState = {
  currentCV: initialCVData,
  savedCVs: [],
  isEditing: false,
};

type CVAction =
  | { type: "UPDATE_PERSONAL_INFO"; payload: Partial<CVData["personalInfo"]> }
  | { type: "UPDATE_ABOUT_ME"; payload: string }
  | { type: "ADD_LANGUAGE"; payload: Language }
  | { type: "UPDATE_LANGUAGE"; payload: Language }
  | { type: "DELETE_LANGUAGE"; payload: string }
  | { type: "ADD_SKILL"; payload: Skill }
  | { type: "UPDATE_SKILL"; payload: Skill }
  | { type: "TOGGLE_SKILL"; payload: string }
  | { type: "DELETE_SKILL"; payload: string }
  | { type: "ADD_COMPETENCE"; payload: Competence }
  | { type: "UPDATE_COMPETENCE"; payload: Competence }
  | { type: "TOGGLE_COMPETENCE"; payload: string }
  | { type: "DELETE_COMPETENCE"; payload: string }
  | { type: "ADD_INTEREST"; payload: Interest }
  | { type: "UPDATE_INTEREST"; payload: Interest }
  | { type: "TOGGLE_INTEREST"; payload: string }
  | { type: "DELETE_INTEREST"; payload: string }
  | { type: "ADD_EXPERIENCE"; payload: Experience }
  | { type: "UPDATE_EXPERIENCE"; payload: Experience }
  | { type: "TOGGLE_EXPERIENCE"; payload: string }
  | { type: "DELETE_EXPERIENCE"; payload: string }
  | { type: "ADD_EDUCATION"; payload: Education }
  | { type: "UPDATE_EDUCATION"; payload: Education }
  | { type: "TOGGLE_EDUCATION"; payload: string }
  | { type: "DELETE_EDUCATION"; payload: string }
  | { type: "SAVE_CV"; payload: { name: string } }
  | { type: "LOAD_CV"; payload: string }
  | { type: "DELETE_SAVED_CV"; payload: string }
  | { type: "ADD_DELIVERY"; payload: { cvId: string; delivery: CVDelivery } }
  | { type: "SET_EDITING"; payload: boolean }
  | { type: "RESET_CV" }
  | {
      type: "UPDATE_OTHER_INFO";
      payload: { drivingLicense: boolean; ownVehicle: boolean };
    };

function cvReducer(state: CVState, action: CVAction): CVState {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          personalInfo: {
            ...state.currentCV.personalInfo,
            ...action.payload,
          },
        },
      };

    case "UPDATE_ABOUT_ME":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          aboutMe: action.payload,
        },
      };

    case "ADD_LANGUAGE":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          languages: [...state.currentCV.languages, action.payload],
        },
      };

    case "UPDATE_LANGUAGE":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          languages: state.currentCV.languages.map((lang) =>
            lang.id === action.payload.id ? action.payload : lang
          ),
        },
      };

    case "DELETE_LANGUAGE":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          languages: state.currentCV.languages.filter(
            (lang) => lang.id !== action.payload
          ),
        },
      };

    case "ADD_SKILL":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          skills: [...state.currentCV.skills, action.payload],
        },
      };

    case "UPDATE_SKILL":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          skills: state.currentCV.skills.map((skill) =>
            skill.id === action.payload.id ? action.payload : skill
          ),
        },
      };

    case "TOGGLE_SKILL":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          skills: state.currentCV.skills.map((skill) =>
            skill.id === action.payload
              ? { ...skill, selected: !skill.selected }
              : skill
          ),
        },
      };

    case "DELETE_SKILL":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          skills: state.currentCV.skills.filter(
            (skill) => skill.id !== action.payload
          ),
        },
      };

    case "ADD_COMPETENCE":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          competences: [...state.currentCV.competences, action.payload],
        },
      };

    case "UPDATE_COMPETENCE":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          competences: state.currentCV.competences.map((comp) =>
            comp.id === action.payload.id ? action.payload : comp
          ),
        },
      };

    case "TOGGLE_COMPETENCE":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          competences: state.currentCV.competences.map((comp) =>
            comp.id === action.payload
              ? { ...comp, selected: !comp.selected }
              : comp
          ),
        },
      };

    case "DELETE_COMPETENCE":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          competences: state.currentCV.competences.filter(
            (comp) => comp.id !== action.payload
          ),
        },
      };

    case "ADD_INTEREST":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          interests: [...state.currentCV.interests, action.payload],
        },
      };

    case "UPDATE_INTEREST":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          interests: state.currentCV.interests.map((interest) =>
            interest.id === action.payload.id ? action.payload : interest
          ),
        },
      };

    case "TOGGLE_INTEREST":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          interests: state.currentCV.interests.map((interest) =>
            interest.id === action.payload
              ? { ...interest, selected: !interest.selected }
              : interest
          ),
        },
      };

    case "DELETE_INTEREST":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          interests: state.currentCV.interests.filter(
            (interest) => interest.id !== action.payload
          ),
        },
      };

    case "ADD_EXPERIENCE":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          experiences: [...state.currentCV.experiences, action.payload],
        },
      };

    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          experiences: state.currentCV.experiences.map((exp) =>
            exp.id === action.payload.id ? action.payload : exp
          ),
        },
      };

    case "TOGGLE_EXPERIENCE":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          experiences: state.currentCV.experiences.map((exp) =>
            exp.id === action.payload
              ? { ...exp, selected: !exp.selected }
              : exp
          ),
        },
      };

    case "DELETE_EXPERIENCE":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          experiences: state.currentCV.experiences.filter(
            (exp) => exp.id !== action.payload
          ),
        },
      };

    case "ADD_EDUCATION":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          education: [...state.currentCV.education, action.payload],
        },
      };

    case "UPDATE_EDUCATION":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          education: state.currentCV.education.map((edu) =>
            edu.id === action.payload.id ? action.payload : edu
          ),
        },
      };

    case "TOGGLE_EDUCATION":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          education: state.currentCV.education.map((edu) =>
            edu.id === action.payload
              ? { ...edu, selected: !edu.selected }
              : edu
          ),
        },
      };

    case "DELETE_EDUCATION":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          education: state.currentCV.education.filter(
            (edu) => edu.id !== action.payload
          ),
        },
      };

    case "SAVE_CV":
      const newSavedCV: SavedCV = {
        id: Date.now().toString(),
        name: action.payload.name,
        data: { ...state.currentCV },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deliveries: [],
      };
      return {
        ...state,
        savedCVs: [...state.savedCVs, newSavedCV],
      };

    case "LOAD_CV":
      const cvToLoad = state.savedCVs.find((cv) => cv.id === action.payload);
      if (cvToLoad) {
        return {
          ...state,
          currentCV: { ...cvToLoad.data },
        };
      }
      return state;

    case "DELETE_SAVED_CV":
      return {
        ...state,
        savedCVs: state.savedCVs.filter((cv) => cv.id !== action.payload),
      };

    case "ADD_DELIVERY":
      return {
        ...state,
        savedCVs: state.savedCVs.map((cv) =>
          cv.id === action.payload.cvId
            ? { ...cv, deliveries: [...cv.deliveries, action.payload.delivery] }
            : cv
        ),
      };

    case "SET_EDITING":
      return {
        ...state,
        isEditing: action.payload,
      };

    case "UPDATE_OTHER_INFO":
      return {
        ...state,
        currentCV: {
          ...state.currentCV,
          drivingLicense: action.payload.drivingLicense,
          ownVehicle: action.payload.ownVehicle,
        },
      };

    case "RESET_CV":
      return {
        ...state,
        currentCV: initialCVData,
      };

    default:
      return state;
  }
}

interface CVContextType {
  state: CVState;
  dispatch: React.Dispatch<CVAction>;

  // Helper functions
  updatePersonalInfo: (info: Partial<CVData["personalInfo"]>) => void;
  updateAboutMe: (text: string) => void;
  addLanguage: (language: Omit<Language, "id">) => void;
  addSkill: (skill: Omit<Skill, "id">) => void;
  addCompetence: (competence: Omit<Competence, "id">) => void;
  addInterest: (interest: Omit<Interest, "id">) => void;
  addExperience: (experience: Omit<Experience, "id">) => void;
  addEducation: (education: Omit<Education, "id">) => void;
  saveCV: (name: string) => void;
  loadCV: (id: string) => void;
  getSkillsByCategory: (category: string) => Skill[];
  getSelectedSkills: () => Skill[];
  getSelectedCompetences: () => Competence[];
  getSelectedExperiences: () => Experience[];
  getSelectedEducation: () => Education[];
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export const CVProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cvReducer, initialState);

  const updatePersonalInfo = (info: Partial<CVData["personalInfo"]>) => {
    dispatch({ type: "UPDATE_PERSONAL_INFO", payload: info });
  };

  const updateAboutMe = (text: string) => {
    dispatch({ type: "UPDATE_ABOUT_ME", payload: text });
  };

  const addLanguage = (language: Omit<Language, "id">) => {
    dispatch({
      type: "ADD_LANGUAGE",
      payload: { ...language, id: Date.now().toString() },
    });
  };

  const addSkill = (skill: Omit<Skill, "id">) => {
    dispatch({
      type: "ADD_SKILL",
      payload: { ...skill, id: Date.now().toString() },
    });
  };

  const addCompetence = (competence: Omit<Competence, "id">) => {
    dispatch({
      type: "ADD_COMPETENCE",
      payload: { ...competence, id: Date.now().toString() },
    });
  };

  const addInterest = (interest: Omit<Interest, "id">) => {
    dispatch({
      type: "ADD_INTEREST",
      payload: { ...interest, id: Date.now().toString() },
    });
  };

  const addExperience = (experience: Omit<Experience, "id">) => {
    dispatch({
      type: "ADD_EXPERIENCE",
      payload: { ...experience, id: Date.now().toString() },
    });
  };

  const addEducation = (education: Omit<Education, "id">) => {
    dispatch({
      type: "ADD_EDUCATION",
      payload: { ...education, id: Date.now().toString() },
    });
  };

  const saveCV = (name: string) => {
    dispatch({ type: "SAVE_CV", payload: { name } });
  };

  const loadCV = (id: string) => {
    dispatch({ type: "LOAD_CV", payload: id });
  };

  const getSkillsByCategory = (category: string) => {
    return state.currentCV.skills.filter(
      (skill) => skill.categoryId === category
    );
  };

  const getSelectedSkills = () => {
    return state.currentCV.skills.filter((skill) => skill.selected);
  };

  const getSelectedCompetences = () => {
    return state.currentCV.competences.filter((comp) => comp.selected);
  };

  const getSelectedExperiences = () => {
    return state.currentCV.experiences.filter((exp) => exp.selected);
  };

  const getSelectedEducation = () => {
    return state.currentCV.education.filter((edu) => edu.selected);
  };

  const value: CVContextType = {
    state,
    dispatch,
    updatePersonalInfo,
    updateAboutMe,
    addLanguage,
    addSkill,
    addCompetence,
    addInterest,
    addExperience,
    addEducation,
    saveCV,
    loadCV,
    getSkillsByCategory,
    getSelectedSkills,
    getSelectedCompetences,
    getSelectedExperiences,
    getSelectedEducation,
  };

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
};

export const useCV = () => {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
};
