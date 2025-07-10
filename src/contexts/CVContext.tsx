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

// Utilidad para generar una miniatura SVG base64 simple
function generateCVThumbnail(cv: CVData): string {
  const name = cv.personalInfo.name || "CV";
  const position = cv.personalInfo.position || "Puesto";
  const svg = `
    <svg width='200' height='260' viewBox='0 0 200 260' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='200' height='260' rx='24' fill='#2563eb'/>
      <text x='50%' y='44%' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='white' font-family='sans-serif' font-weight='bold'>${name}</text>
      <text x='50%' y='58%' dominant-baseline='middle' text-anchor='middle' font-size='14' fill='#dbeafe' font-family='sans-serif'>${position}</text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

// Estado inicial con datos de ejemplo para nuevos usuarios
const initialCVData: CVData = {
  personalInfo: {
    name: "Juan Pérez",
    position: "Desarrollador Full Stack",
    phone: "+34 600 123 456",
    email: "juan.perez@email.com",
    linkedin: "linkedin.com/in/juanperez",
    website: "juanperez.dev",
    location: "Madrid, España",
    socialNetworks: [
      { id: "sn1", name: "LinkedIn", url: "https://linkedin.com/in/juanperez" },
      { id: "sn2", name: "GitHub", url: "https://github.com/juanperez" },
    ],
  },
  aboutMe:
    "Desarrollador Full Stack con 5 años de experiencia en aplicaciones web modernas. Apasionado por la tecnología, el clean code y el aprendizaje continuo.",
  languages: [{ id: "lang1", name: "Inglés", level: "B2" }],
  skillCategories: [
    { id: "cat1", name: "Lenguajes de Programación" },
    { id: "cat2", name: "Frameworks" },
    { id: "cat3", name: "Bases de Datos" },
  ],
  skills: [
    {
      id: "sk1",
      name: "JavaScript",
      categoryId: "cat1",
      categoryName: "Lenguajes de Programación",
      selected: true,
    },
    {
      id: "sk2",
      name: "TypeScript",
      categoryId: "cat1",
      categoryName: "Lenguajes de Programación",
      selected: true,
    },
    {
      id: "sk3",
      name: "React",
      categoryId: "cat2",
      categoryName: "Frameworks",
      selected: true,
    },
    {
      id: "sk4",
      name: "Next.js",
      categoryId: "cat2",
      categoryName: "Frameworks",
      selected: true,
    },
    {
      id: "sk5",
      name: "PostgreSQL",
      categoryId: "cat3",
      categoryName: "Bases de Datos",
      selected: true,
    },
    {
      id: "sk6",
      name: "MongoDB",
      categoryId: "cat3",
      categoryName: "Bases de Datos",
      selected: true,
    },
  ],
  competences: [
    { id: "comp1", name: "Trabajo en equipo", selected: true },
    { id: "comp2", name: "Resolución de problemas", selected: true },
    { id: "comp3", name: "Comunicación efectiva", selected: true },
  ],
  interests: [],
  softSkills: [
    { id: "ss1", name: "Proactividad", selected: true },
    { id: "ss2", name: "Adaptabilidad", selected: true },
    { id: "ss3", name: "Pensamiento crítico", selected: true },
  ],
  experiences: [
    {
      id: "exp1",
      position: "Desarrollador Full Stack",
      company: "Tech Solutions S.A.",
      location: "Madrid, España",
      startDate: "2021-01",
      endDate: "2024-06",
      contractType: "Indefinido",
      workSchedule: "Jornada completa",
      workModality: "Híbrido",
      description:
        "Desarrollo de aplicaciones web con React, Next.js y Node.js. Integración de APIs y optimización de rendimiento.",
      technologies: ["React", "Next.js", "Node.js", "PostgreSQL"],
      selected: true,
    },
  ],
  education: [
    {
      id: "edu1",
      title: "Grado en Ingeniería Informática",
      institution: "Universidad Complutense de Madrid",
      location: "Madrid, España",
      startYear: "2016",
      endYear: "2020",
      selected: true,
    },
  ],
  certifications: [
    {
      id: "cert1",
      name: "Certificado Scrum Master",
      issuer: "Scrum.org",
      date: "2022-05",
      expiryDate: undefined,
      credentialId: "12345-SM",
      url: "https://scrum.org/certificates/12345-SM",
      selected: true,
    },
  ],
  achievements: [
    {
      id: "ach1",
      title: "Proyecto de Automatización de Procesos",
      type: "project",
      description:
        "Lideré el desarrollo de una herramienta interna que automatizó procesos clave, reduciendo el tiempo de gestión en un 30%.",
      date: "2023-03",
      company: "Tech Solutions S.A.",
      technologies: ["Node.js", "PostgreSQL"],
      metrics: "Reducción del 30% en tiempos de gestión",
      url: "https://github.com/juanperez/automatizacion-procesos",
      selected: true,
    },
  ],
  references: [
    {
      id: "ref1",
      name: "María López",
      position: "CTO",
      company: "Tech Solutions S.A.",
      relationship: "Supervisora directa",
      phone: "+34 600 987 654",
      email: "maria.lopez@techsolutions.com",
      yearsWorking: "3",
      selected: true,
    },
  ],
  otherInformation: [
    { id: "oi1", name: "Carnet de conducir", icon: "🚗", selected: true },
    { id: "oi2", name: "Vehículo propio", icon: "🚙", selected: true },
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

    case "SAVE_CV": {
      const thumbnail = generateCVThumbnail(state.currentCV);
      const newSavedCV: SavedCV = {
        id: Date.now().toString(),
        name: action.payload.name,
        data: { ...state.currentCV },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deliveries: [],
        thumbnail,
      };
      return {
        ...state,
        savedCVs: [...state.savedCVs, newSavedCV],
      };
    }

    case "LOAD_CV": {
      const cvToLoad = state.savedCVs.find((cv) => cv.id === action.payload);
      if (cvToLoad) {
        // Si el CV cargado no tiene miniatura, la generamos y la añadimos
        if (!cvToLoad.thumbnail) {
          const thumbnail = generateCVThumbnail(cvToLoad.data);
          cvToLoad.thumbnail = thumbnail;
        }
        return {
          ...state,
          currentCV: { ...cvToLoad.data },
          savedCVs: state.savedCVs.map((cv) =>
            cv.id === cvToLoad.id
              ? { ...cv, thumbnail: cvToLoad.thumbnail }
              : cv
          ),
        };
      }
      return state;
    }

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
