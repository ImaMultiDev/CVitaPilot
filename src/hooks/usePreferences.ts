"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getUserPreferences,
  updateUserPreference,
  UserPreferences,
} from "@/lib/actions/preferences-actions";
import { useNotification } from "./useNotification";

export const usePreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: "system",
    language: "es",
    timezone: "Europe/Madrid",
    autoSave: true,
    analytics: false,
    betaFeatures: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { showSuccess, showError } = useNotification();

  // Aplicar tema
  const applyTheme = useCallback((theme: string) => {
    const root = document.documentElement;

    // Remover clases existentes
    root.classList.remove("light", "dark");

    if (theme === "system") {
      // Usar preferencia del sistema
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      // Aplicar tema específico
      root.classList.add(theme);
    }

    console.log("🎨 Tema aplicado:", theme);
  }, []);

  // Aplicar idioma
  const applyLanguage = useCallback((language: string) => {
    // Por ahora solo log, pero aquí se podría implementar i18n
    console.log("🌍 Idioma aplicado:", language);
    // TODO: Implementar cambio de idioma con i18n
  }, []);

  // Aplicar zona horaria
  const applyTimezone = useCallback((timezone: string) => {
    // Por ahora solo log, pero aquí se podría implementar cambio de zona horaria
    console.log("🕐 Zona horaria aplicada:", timezone);
    // TODO: Implementar cambio de zona horaria
  }, []);

  // Función para aplicar cambios de preferencias en la aplicación
  const applyPreferenceChange = useCallback(
    (key: keyof UserPreferences, value: string | boolean) => {
      switch (key) {
        case "theme":
          applyTheme(value as string);
          break;
        case "language":
          applyLanguage(value as string);
          break;
        case "timezone":
          applyTimezone(value as string);
          break;
        // Los booleanos (autoSave, analytics, betaFeatures) no necesitan aplicación inmediata
      }
    },
    [applyTheme, applyLanguage, applyTimezone]
  );

  // Función para revertir cambios de preferencias
  const revertPreferenceChange = (
    key: keyof UserPreferences,
    oldValue: string | boolean
  ) => {
    switch (key) {
      case "theme":
        applyTheme(oldValue as string);
        break;
      case "language":
        applyLanguage(oldValue as string);
        break;
      case "timezone":
        applyTimezone(oldValue as string);
        break;
    }
  };

  // Cargar preferencias del backend al montar el componente
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        setIsLoading(true);
        const userPreferences = await getUserPreferences();

        if (userPreferences) {
          setPreferences(userPreferences);

          // Aplicar las preferencias cargadas
          applyPreferenceChange("theme", userPreferences.theme);
          applyPreferenceChange("language", userPreferences.language);
          applyPreferenceChange("timezone", userPreferences.timezone);
        }
        // Si no hay preferencias del usuario, se mantienen los valores por defecto
      } catch (error) {
        console.error("Error loading preferences:", error);
        showError("Error", "Error al cargar las preferencias");
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, [applyPreferenceChange, showError]);

  // Función para actualizar una preferencia específica
  const updatePreference = async (
    key: keyof UserPreferences,
    value: string | boolean
  ) => {
    try {
      console.log("🔄 Actualizando preferencia:", key, "=", value);
      setIsSaving(true);

      // Actualizar estado local inmediatamente para UX
      setPreferences((prev) => ({
        ...prev,
        [key]: value,
      }));

      // Aplicar cambios inmediatamente en la aplicación
      applyPreferenceChange(key, value);

      // Guardar en el backend
      console.log("📡 Llamando a updateUserPreference...");
      const result = await updateUserPreference(key, value);
      console.log("📡 Resultado:", result);

      if (result.success) {
        console.log("✅ Preferencia actualizada correctamente");
        showSuccess("Éxito", "Preferencia actualizada correctamente");
      } else {
        console.log("❌ Error al actualizar:", result.error);
        // Revertir cambio local si falla
        setPreferences((prev) => ({
          ...prev,
          [key]: prev[key as keyof UserPreferences],
        }));
        // Revertir aplicación del cambio
        revertPreferenceChange(key, preferences[key as keyof UserPreferences]);
        showError(
          "Error",
          result.error || "Error al actualizar la preferencia"
        );
      }
    } catch (error) {
      console.error("💥 Error updating preference:", error);
      // Revertir cambio local si falla
      setPreferences((prev) => ({
        ...prev,
        [key]: prev[key as keyof UserPreferences],
      }));
      // Revertir aplicación del cambio
      revertPreferenceChange(key, preferences[key as keyof UserPreferences]);
      showError("Error", "Error al actualizar la preferencia");
    } finally {
      setIsSaving(false);
    }
  };

  // Función para actualizar múltiples preferencias a la vez
  const updateMultiplePreferences = async (
    newPreferences: Partial<UserPreferences>
  ) => {
    try {
      setIsSaving(true);

      // Actualizar estado local inmediatamente
      setPreferences((prev) => ({
        ...prev,
        ...newPreferences,
      }));

      // Guardar en el backend (una por una para mejor control de errores)
      const updates = Object.entries(newPreferences).map(([key, value]) =>
        updateUserPreference(key as keyof UserPreferences, value)
      );

      const results = await Promise.all(updates);
      const hasErrors = results.some((result) => !result.success);

      if (hasErrors) {
        // Revertir cambios locales si hay errores
        const userPreferences = await getUserPreferences();
        if (userPreferences) {
          setPreferences(userPreferences);
        }
        showError("Error", "Error al actualizar algunas preferencias");
      } else {
        showSuccess("Éxito", "Preferencias actualizadas correctamente");
      }
    } catch (error) {
      console.error("Error updating multiple preferences:", error);
      showError("Error", "Error al actualizar las preferencias");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    preferences,
    isLoading,
    isSaving,
    updatePreference,
    updateMultiplePreferences,
  };
};
