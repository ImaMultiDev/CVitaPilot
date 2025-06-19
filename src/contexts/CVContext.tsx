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
    github: "https://github.com/kodebidean",
    website: "https://imamultidev.dev",
    location: "3130 Carcastillo (Navarra)",
  },
  aboutMe:
    "Desarrollador Multiplataforma, con conocimientos en diversos lenguajes de programación, experiencia de desarrollo frontend y backend",
  languages: [
    { id: "1", name: "Español", level: "Nativo" },
    { id: "2", name: "English", level: "B2" },
  ],
  skills: [
    // Programming Languages
    { id: "1", name: "JavaScript", category: "language", selected: true },
    { id: "2", name: "Java", category: "language", selected: true },
    { id: "3", name: "Kotlin", category: "language", selected: true },
    { id: "4", name: "Swift", category: "language", selected: true },
    { id: "5", name: "Python", category: "language", selected: true },
    { id: "6", name: "C++", category: "language", selected: false },
    { id: "7", name: "C#", category: "language", selected: false },

    // Frameworks
    { id: "8", name: "React", category: "framework", selected: true },
    { id: "9", name: "Next.js", category: "framework", selected: true },
    { id: "10", name: "Tailwind", category: "framework", selected: true },
    { id: "11", name: "Angular", category: "framework", selected: true },
    { id: "12", name: "Astro", category: "framework", selected: true },
    { id: "13", name: "Spring Boot", category: "framework", selected: true },
    { id: "14", name: "Flutter", category: "framework", selected: true },
    { id: "15", name: "React Native", category: "framework", selected: true },
    { id: "16", name: "Vue.js", category: "framework", selected: false },
    {
      id: "17",
      name: "Jetpack Compose",
      category: "framework",
      selected: false,
    },

    // Databases
    { id: "18", name: "PostgreSQL", category: "database", selected: true },
    { id: "19", name: "MySQL", category: "database", selected: true },
    { id: "20", name: "MongoDB", category: "database", selected: true },
    { id: "21", name: "Firebase", category: "database", selected: true },
    { id: "22", name: "SQLite", category: "database", selected: false },
    { id: "23", name: "SQL Server", category: "database", selected: false },

    // Tools
    { id: "24", name: "Git", category: "tool", selected: true },
    { id: "25", name: "Docker", category: "tool", selected: false },
    { id: "26", name: "Node.js", category: "tool", selected: true },
    { id: "27", name: "Postman", category: "tool", selected: false },
    { id: "28", name: "Jira", category: "tool", selected: true },

    // Libraries
    { id: "29", name: "Prisma", category: "library", selected: true },
    { id: "30", name: "NextAuth", category: "library", selected: true },
    { id: "31", name: "Formik", category: "library", selected: true },
    { id: "32", name: "Zod", category: "library", selected: true },
    { id: "33", name: "GSAP", category: "library", selected: false },
    { id: "34", name: "Bootstrap", category: "library", selected: false },
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
      id: "2",
      position: "Gestor ERP SAP",
      company: "ERRIBERRI S.L.",
      location: "Olite (Comunidad foral de Navarra)",
      startDate: "2024-08",
      contractType: "Contrato temporal",
      workType: "jornada completa",
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
      workType: "jornada completa",
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
      workType: "jornada completa",
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
      type: "formal",
      selected: true,
    },
    {
      id: "2",
      title: "FPI Programación CNC - Mecanizado por arranque de viruta",
      institution: "CIP ETI",
      location: "Tudela (Comunidad foral de Navarra)",
      startYear: "2017",
      endYear: "2018",
      type: "formal",
      selected: false,
    },
    {
      id: "3",
      title: "FPS Gestión Comercial y Marketing",
      institution: "CI Maria Ana Sanz",
      location: "Pamplona (Comunidad foral de Navarra)",
      startYear: "2014",
      endYear: "2016",
      type: "formal",
      selected: false,
    },
    {
      id: "4",
      title: "React y Next.js",
      institution: "Official Courses",
      location: "",
      startYear: "",
      endYear: "",
      duration: "64h",
      type: "additional",
      selected: true,
    },
    {
      id: "5",
      title: "Fundamentos y estructuras de datos en Python",
      institution: "Michigan University",
      location: "",
      startYear: "",
      endYear: "",
      duration: "120h",
      type: "additional",
      selected: true,
    },
    {
      id: "6",
      title: "Java: Desde principiante hasta avanzado",
      institution: "Andrés Guzmán",
      location: "",
      startYear: "",
      endYear: "",
      duration: "370h",
      type: "additional",
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
      (skill) => skill.category === category
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
