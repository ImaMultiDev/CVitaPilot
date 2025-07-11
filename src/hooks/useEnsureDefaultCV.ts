import { useState, useEffect } from "react";

interface UseEnsureDefaultCVReturn {
  isLoading: boolean;
  hasDefaultCV: boolean;
  error: string | null;
  ensureDefaultCV: () => Promise<void>;
}

export const useEnsureDefaultCV = (): UseEnsureDefaultCVReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasDefaultCV, setHasDefaultCV] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ensureDefaultCV = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/cv/ensure-default", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setHasDefaultCV(true);
        console.log("CV por defecto verificado:", data.message);
      } else {
        setError(data.error || "Error al verificar CV por defecto");
      }
    } catch (err) {
      console.error("Error asegurando CV por defecto:", err);
      setError("Error de conexión");
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar automáticamente al montar el componente
  useEffect(() => {
    ensureDefaultCV();
  }, []);

  return {
    isLoading,
    hasDefaultCV,
    error,
    ensureDefaultCV,
  };
};
