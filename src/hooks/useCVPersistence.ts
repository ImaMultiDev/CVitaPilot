// src/hooks/useCVPersistence.ts

import { useEffect } from "react";
import { useCV } from "@/contexts/CVContext";
import { useLocalStorage } from "./useLocalStorage";

export function useCVPersistence() {
  const { state, dispatch } = useCV();
  const [, setStoredCVData] = useLocalStorage("cv-manager-data", null);
  const [, setStoredSavedCVs] = useLocalStorage("cv-manager-saved-cvs", []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    setStoredCVData(state.currentCV);
  }, [state.currentCV, setStoredCVData]);

  useEffect(() => {
    setStoredSavedCVs(state.savedCVs);
  }, [state.savedCVs, setStoredSavedCVs]);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedCVData = localStorage.getItem("cv-manager-data");
        const storedSavedCVs = localStorage.getItem("cv-manager-saved-cvs");

        if (storedCVData) {
          const cvData = JSON.parse(storedCVData);
          // Aquí podrías dispatch una acción para cargar los datos
          // dispatch({ type: 'LOAD_PERSISTED_DATA', payload: cvData });
        }

        if (storedSavedCVs) {
          const savedCVs = JSON.parse(storedSavedCVs);
          // dispatch({ type: 'LOAD_SAVED_CVS', payload: savedCVs });
        }
      } catch (error) {
        console.error("Error loading persisted data:", error);
      }
    }
  }, [dispatch]);

  return { persistData: () => {} };
}
