export interface PersonalInfo {
  name: string;
  position: string;
  phone: string;
  email: string;
  linkedin: string;
  website: string;
  location: string;
  photo?: string; // Foto opcional para formato Europass
  socialNetworks: SocialNetwork[];
}

export type CVFormat = "visual" | "ats" | "europass";

export interface SocialNetwork {
  id: string;
  name: string;
  url: string;
}

export interface Language {
  id: string;
  name: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Nativo";
}

export interface SkillCategory {
  id: string;
  name: string;
}

export interface Skill {
  id: string;
  name: string;
  categoryId: string;
  categoryName?: string; // Para facilitar el renderizado
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
  workSchedule: string; // Jornada completa, parcial
  workModality: string; // Presencial, remoto, híbrido
  description: string;
  technologies: string[];
  selected: boolean;
}

export interface Education {
  id: string;
  title: string; // Título del grado/master/doctorado
  institution: string; // Universidad/Centro educativo
  location: string; // Ciudad, País
  startYear: string; // Año de inicio
  endYear: string; // Año de finalización
  selected: boolean;
}

export interface Interest {
  id: string;
  name: string;
  selected: boolean;
}

export interface SoftSkill {
  id: string;
  name: string;
  selected: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string; // Organización que emite el certificado
  date: string; // Fecha de obtención
  expiryDate?: string; // Fecha de expiración (opcional)
  credentialId?: string; // ID del certificado (opcional)
  url?: string; // URL de verificación (opcional)
  selected: boolean;
}

export interface Achievement {
  id: string;
  title: string; // Título del logro/proyecto
  type: "achievement" | "project"; // Tipo: logro o proyecto
  description: string; // Descripción detallada
  date: string; // Fecha o período
  company?: string; // Empresa/Organización (opcional)
  technologies: string[]; // Tecnologías utilizadas (para proyectos)
  metrics?: string; // Métricas de impacto (ej: "Aumentó ventas 25%")
  url?: string; // URL del proyecto/reconocimiento (opcional)
  selected: boolean;
}

export interface Reference {
  id: string;
  name: string; // Nombre completo
  position: string; // Cargo/Puesto
  company: string; // Empresa
  relationship: string; // Relación profesional
  phone: string; // Teléfono de contacto
  email: string; // Email de contacto
  yearsWorking?: string; // Tiempo trabajando juntos (opcional)
  selected: boolean;
}

export interface OtherInformation {
  id: string;
  name: string; // Nombre del elemento (ej: "Carnet de conducir", "Vehículo propio")
  icon?: string; // Icono opcional (emoji o nombre de icono)
  selected: boolean;
}

export interface CVData {
  personalInfo: PersonalInfo;
  aboutMe: string;
  languages: Language[];
  skills: Skill[];
  skillCategories: SkillCategory[];
  competences: Competence[];
  interests: Interest[];
  softSkills: SoftSkill[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
  references: Reference[];
  otherInformation: OtherInformation[];
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
  thumbnail?: string; // DataURL de imagen, SVG, o HTML reducido
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
