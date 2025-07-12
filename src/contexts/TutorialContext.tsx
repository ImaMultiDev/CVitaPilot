"use client";

import React, { createContext, useContext, useReducer } from "react";
import { useSession } from "next-auth/react";

// Tipos para el tutorial
export interface TutorialStep {
  id: string;
  title: string;
  content: string;
  action: "next" | "navigate" | "click" | "complete" | "button";
  target?: string; // Para navegación
  elementId?: string; // Para resaltar elementos específicos
  position?: "top" | "bottom" | "left" | "right" | "center";
  buttonLabel?: string; // Para botones
  sidebarAction?: "open" | "close"; // Para acciones de sidebar
  disableNavbarBlur?: boolean; // Para desactivar blur del navbar
  disableContentBlur?: boolean; // Para desactivar blur del contenido
  sidebarOutsideBlur?: boolean; // Para indicar que el sidebar debe estar fuera del blur del contenido
  overlayPosition?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center"
    | "left"
    | "right";
  characterImage?: string; // Ruta de la imagen del personaje para este paso
}

export interface TutorialState {
  isActive: boolean;
  currentStep: number;
  isCompleted: boolean;
  isSkipped: boolean;
  stepActionCompleted: boolean;
}

type TutorialAction =
  | { type: "START_TUTORIAL" }
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" }
  | { type: "GO_TO_STEP"; payload: number }
  | { type: "COMPLETE_TUTORIAL" }
  | { type: "SKIP_TUTORIAL" }
  | { type: "RESET_TUTORIAL" }
  | { type: "COMPLETE_STEP_ACTION" };

// Pasos del tutorial
export const tutorialSteps: TutorialStep[] = [
  {
    id: "welcome",
    title: "¡Bienvenido a CVitaPilot!",
    content:
      "Te guiaremos en un breve tutorial para que conozcas todas las funcionalidades de la aplicación. ¿Estás listo para empezar?",
    action: "next",
    position: "center",
    overlayPosition: "center",
    characterImage: "/characters/tutorial/character-welcome.png",
  },
  {
    id: "navbar-explanation",
    title: "Navegador",
    content:
      "Aquí puedes ver la barra de navegación principal. Te permite acceder a todas las secciones de la aplicación de forma rápida y fácil. Ahora estamos en la página inicial.",
    action: "next",
    position: "center",
    disableNavbarBlur: true,
    disableContentBlur: false,
    overlayPosition: "top-right",
    characterImage: "/characters/tutorial/character-navbar.png",
  },
  {
    id: "home-explanation",
    title: "Página Principal",
    content:
      "Esta es tu página principal. Aquí puedes ver un resumen de tus CVs y acceder rápidamente a las funciones más importantes. A continuación accedemos al editor donde podrás crear y editar tu CV.",
    action: "button",
    buttonLabel: "Ir al Editor",
    target: "/editor",
    position: "center",
    disableNavbarBlur: false,
    disableContentBlur: true,
    overlayPosition: "top-right",
    characterImage: "/characters/tutorial/character-home.png",
  },
  {
    id: "editor-intro",
    title: "Editor de CV",
    content:
      "Aquí es donde crearás y editarás tu CV. El editor te permite personalizar cada sección de tu currículum. A continuación vamos a proceder a ver la barra lateral para explorar las opciones disponibles.",
    action: "button",
    buttonLabel: "Abrir Sidebar",
    sidebarAction: "open",
    position: "left",
    disableNavbarBlur: false,
    disableContentBlur: true,
    overlayPosition: "top-right",
    characterImage: "/characters/tutorial/character-editor.png",
  },
  {
    id: "sidebar-sections",
    title: "Barra Lateral",
    content:
      "Aquí puedes ver todas las secciones disponibles: Información Personal, Experiencia, Educación, Habilidades, y más. Cada sección se puede expandir para editar. Ahora vamos a la sección 'Mis CVs' donde podrás ver y gestionar todos tus currículums guardados.",
    action: "button",
    buttonLabel: "Ir a Mis CVs",
    target: "/saved-cvs",
    position: "left",
    disableNavbarBlur: false,
    disableContentBlur: false,
    overlayPosition: "center",
    characterImage: "/characters/tutorial/character-fly.png",
  },
  {
    id: "mycvs-explanation",
    title: "Gestión de CVs",
    content:
      "Aquí puedes ver todos tus CVs guardados, crear nuevos, duplicar existentes y gestionar cuál está activo. También puedes eliminar los que ya no necesites. Ahora vamos a la vista previa donde podrás ver cómo se ve tu CV y exportarlo en diferentes formatos.",
    action: "button",
    buttonLabel: "Ir a Vista Previa",
    target: "/preview",
    position: "center",
    disableNavbarBlur: false,
    disableContentBlur: true,
    overlayPosition: "top-right",
    characterImage: "/characters/tutorial/character-mycvs.png",
  },
  {
    id: "preview-explanation",
    title: "Vista Previa",
    content:
      "En esta vista puedes ver exactamente cómo se verá tu CV. Puedes cambiar entre diferentes formatos y exportar tu CV en PDF. A continuación vamos a ver la barra lateral para explorar las opciones de formato y exportación.",
    action: "button",
    buttonLabel: "Abrir Sidebar",
    sidebarAction: "open",
    position: "right",
    disableNavbarBlur: false,
    disableContentBlur: true,
    overlayPosition: "top-right",
    characterImage: "/characters/tutorial/character-cvpreview.png",
  },
  {
    id: "preview-sidebar",
    title: "Barra Lateral",
    content:
      "En la barra lateral puedes encontrar: Formatos Visual y ATS, controles de Acercar y Alejar, y la función de Imprimir. Cada formato está optimizado para diferentes tipos de aplicaciones. Ahora vamos a la guía donde encontrarás consejos y mejores prácticas para crear un CV profesional.",
    action: "button",
    buttonLabel: "Ir a Guía CV",
    target: "/guia-cv",
    position: "right",
    disableNavbarBlur: false,
    disableContentBlur: false,
    sidebarOutsideBlur: true,
    overlayPosition: "center",
    characterImage: "/characters/tutorial/character-content.png",
  },
  {
    id: "guide-explanation",
    title: "Guía de CV",
    content:
      "Aquí encontrarás consejos profesionales, mejores prácticas y ejemplos para crear un CV que destaque. Te recomendamos revisarla regularmente. Finalmente, vamos a ver la configuración donde puedes personalizar tu perfil, ajustar notificaciones y gestionar las preferencias de la aplicación.",
    action: "button",
    buttonLabel: "Ir a Configuración",
    target: "/settings",
    position: "center",
    disableNavbarBlur: false,
    disableContentBlur: true,
    overlayPosition: "top-right",
    characterImage: "/characters/tutorial/character-guide.png",
  },
  {
    id: "settings-explanation",
    title: "Configuración",
    content:
      "En la configuración puedes personalizar tu perfil, ajustar notificaciones, gestionar la privacidad y configurar las preferencias de la aplicación. Aquí tienes control total sobre tu experiencia.",
    action: "next",
    position: "center",
    disableNavbarBlur: false,
    disableContentBlur: true,
    overlayPosition: "top-right",
    characterImage: "/characters/tutorial/character-config.png",
  },
  {
    id: "completion",
    title: "¡Tutorial Completado!",
    content:
      "¡Felicidades! Ya conoces todas las funciones principales de CVitaPilot. Ya puedes empezar a crear tu CV profesional. ¡Que tengas mucho éxito!",
    action: "complete",
    position: "center",
    overlayPosition: "center",
    characterImage: "/characters/tutorial/character-final.png",
  },
];

// Estado inicial
const initialState: TutorialState = {
  isActive: false,
  currentStep: 0,
  isCompleted: false,
  isSkipped: false,
  stepActionCompleted: false,
};

// Reducer para manejar el estado
function tutorialReducer(
  state: TutorialState,
  action: TutorialAction
): TutorialState {
  switch (action.type) {
    case "START_TUTORIAL":
      return {
        ...state,
        isActive: true,
        currentStep: 0,
        isCompleted: false,
        isSkipped: false,
        stepActionCompleted: false,
      };
    case "NEXT_STEP": {
      const nextStep = state.currentStep + 1;
      if (nextStep >= tutorialSteps.length) {
        return {
          ...state,
          isActive: false,
          isCompleted: true,
          stepActionCompleted: false,
        };
      }
      return {
        ...state,
        currentStep: nextStep,
        stepActionCompleted: false,
      };
    }
    case "PREVIOUS_STEP":
      return {
        ...state,
        currentStep: Math.max(0, state.currentStep - 1),
        stepActionCompleted: false,
      };
    case "GO_TO_STEP":
      return {
        ...state,
        currentStep: action.payload,
        stepActionCompleted: false,
      };
    case "COMPLETE_TUTORIAL":
      return {
        ...state,
        isActive: false,
        isCompleted: true,
        stepActionCompleted: false,
      };
    case "SKIP_TUTORIAL":
      return {
        ...state,
        isActive: false,
        isSkipped: true,
        stepActionCompleted: false,
      };
    case "RESET_TUTORIAL":
      return initialState;
    case "COMPLETE_STEP_ACTION":
      return {
        ...state,
        stepActionCompleted: true,
      };
    default:
      return state;
  }
}

// Contexto
interface TutorialContextType {
  state: TutorialState;
  currentStep: TutorialStep;
  startTutorial: () => void;
  nextStep: () => void;
  previousStep: () => void;
  completeTutorial: () => void;
  skipTutorial: () => void;
  resetTutorial: () => void;
  goToStep: (step: number) => void;
  completeStepAction: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(
  undefined
);

// Provider
export function TutorialProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(tutorialReducer, initialState);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const currentStep = tutorialSteps[state.currentStep];

  // Helpers para claves por usuario
  const getCompletedKey = () => `tutorial-completed-${userId}`;
  const getSkippedKey = () => `tutorial-skipped-${userId}`;

  const startTutorial = () => {
    dispatch({ type: "START_TUTORIAL" });
  };

  const nextStep = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const previousStep = () => {
    dispatch({ type: "PREVIOUS_STEP" });
  };

  const completeTutorial = () => {
    dispatch({ type: "COMPLETE_TUTORIAL" });
    if (userId) localStorage.setItem(getCompletedKey(), "true");
  };

  const skipTutorial = () => {
    dispatch({ type: "SKIP_TUTORIAL" });
    if (userId) localStorage.setItem(getSkippedKey(), "true");
  };

  const resetTutorial = () => {
    dispatch({ type: "RESET_TUTORIAL" });
    if (userId) {
      localStorage.removeItem(getCompletedKey());
      localStorage.removeItem(getSkippedKey());
    }
  };

  const goToStep = (step: number) => {
    dispatch({ type: "GO_TO_STEP", payload: step });
  };

  const completeStepAction = () => {
    dispatch({ type: "COMPLETE_STEP_ACTION" });
  };

  const value: TutorialContextType = {
    state,
    currentStep,
    startTutorial,
    nextStep,
    previousStep,
    completeTutorial,
    skipTutorial,
    resetTutorial,
    goToStep,
    completeStepAction,
  };

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
}

// Hook para usar el contexto
export function useTutorial() {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error("useTutorial must be used within a TutorialProvider");
  }
  return context;
}
