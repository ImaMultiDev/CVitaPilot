"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSavedCVs, loadCV, deleteSavedCV } from "@/lib/actions/cv-actions";
import {
  LoadingState,
  EmptyState,
  MyCVsHeader,
  ActiveCVSection,
  SavedCVsGrid,
  InfoSection,
} from "./components";

interface SavedCV {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deliveryCount: number;
}

export const MyCVsPage: React.FC = () => {
  const [savedCVs, setSavedCVs] = useState<SavedCV[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadSavedCVs();
  }, []);

  const loadSavedCVs = async () => {
    try {
      setIsLoading(true);
      const cvs = await getSavedCVs();
      setSavedCVs(cvs);
    } catch (error) {
      console.error("Error loading saved CVs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadCV = async (cvId: string, cvName: string) => {
    if (confirm(`¿Cargar '${cvName}' como CV activo?`)) {
      try {
        await loadCV(cvId);
        alert("✅ CV cargado exitosamente. Ve al editor para verlo.");
        router.push("/editor");
      } catch (error) {
        console.error("Error loading CV:", error);
        alert("❌ Error al cargar el CV");
      }
    }
  };

  const handleDeleteCV = async (cvId: string, cvName: string) => {
    if (confirm(`¿Estás seguro de que quieres eliminar '${cvName}'?`)) {
      try {
        await deleteSavedCV(cvId);
        alert("✅ CV eliminado exitosamente");
        loadSavedCVs();
      } catch (error) {
        console.error("Error deleting CV:", error);
        alert("❌ Error al eliminar el CV");
      }
    }
  };

  // Estado de carga
  if (isLoading) {
    return <LoadingState />;
  }

  // Buscar CV activo
  const activeCV = savedCVs.find((cv) => cv.isActive);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header con estadísticas */}
        <MyCVsHeader totalCVs={savedCVs.length} />

        {/* Estado vacío */}
        {savedCVs.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* CV Activo Destacado */}
            {activeCV && <ActiveCVSection activeCV={activeCV} />}

            {/* Lista de CVs Guardados */}
            <SavedCVsGrid
              savedCVs={savedCVs}
              onLoadCV={handleLoadCV}
              onDeleteCV={handleDeleteCV}
            />

            {/* Sección de información */}
            <InfoSection />
          </>
        )}
      </div>
    </div>
  );
};
