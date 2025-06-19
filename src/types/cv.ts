// src/types/cv.ts

export interface PersonalInfo {
  name: string;
  position: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  website: string;
  location: string;
}

export interface Language {
  id: string;
  name: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Nativo";
}

export interface Skill {
  id: string;
  name: string;
  category:
    | "language"
    | "framework"
    | "tool"
    | "database"
    | "orm"
    | "ai"
    | "library";
  selected: boolean;
}

export interface Competence {
  id: string;
  name: string;
  selected: boolean;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  contractType: string;
  workType: string;
  description: string;
  technologies: string[];
  selected: boolean;
}

export interface Education {
  id: string;
  title: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  type: "formal" | "additional";
  duration?: string;
  selected: boolean;
}

export interface Interest {
  id: string;
  name: string;
  selected: boolean;
}

export interface CVData {
  personalInfo: PersonalInfo;
  aboutMe: string;
  languages: Language[];
  skills: Skill[];
  competences: Competence[];
  interests: Interest[];
  experiences: Experience[];
  education: Education[];
  drivingLicense: boolean;
  ownVehicle: boolean;
}

export interface SavedCV {
  id: string;
  name: string;
  data: CVData;
  createdAt: string;
  updatedAt: string;
  deliveries: CVDelivery[];
}

export interface CVDelivery {
  id: string;
  company: string;
  position: string;
  date: string;
  status: "sent" | "interview" | "rejected" | "accepted";
  notes?: string;
}

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  layout: "classic" | "modern" | "minimal" | "creative";
}
