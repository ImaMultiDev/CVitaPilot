// src/hooks/useCVPersistence.ts

import { useEffect } from "react";
import { useCV } from "@/contexts/CVContext";
import { useLocalStorage } from "./useLocalStorage";
import { CVData, SavedCV } from "@/types/cv";

export function useCVPersistence() {
  const { state } = useCV();
  const [, setStoredCVData] = useLocalStorage<CVData | null>(
    "cv-manager-data",
    null
  );
  const [, setStoredSavedCVs] = useLocalStorage<SavedCV[]>(
    "cv-manager-saved-cvs",
    []
  );

  // Guardar en localStorage cuando el estado cambia
  useEffect(() => {
    if (state.currentCV) {
      setStoredCVData(state.currentCV);
    }
  }, [state.currentCV, setStoredCVData]);

  useEffect(() => {
    if (state.savedCVs) {
      setStoredSavedCVs(state.savedCVs);
    }
  }, [state.savedCVs, setStoredSavedCVs]);

  // Función para forzar la persistencia manualmente si es necesario
  const persistData = () => {
    setStoredCVData(state.currentCV);
    setStoredSavedCVs(state.savedCVs);
  };

  return { persistData };
}
