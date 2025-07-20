"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export interface UserPreferences {
  theme: string;
  language: string;
  timezone: string;
  autoSave: boolean;
  analytics: boolean;
  betaFeatures: boolean;
}

/**
 * Obtiene las preferencias del usuario autenticado
 */
export async function getUserPreferences(): Promise<UserPreferences | null> {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        theme: true,
        language: true,
        timezone: true,
        autoSave: true,
        analytics: true,
        betaFeatures: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      theme: user.theme,
      language: user.language,
      timezone: user.timezone,
      autoSave: user.autoSave,
      analytics: user.analytics,
      betaFeatures: user.betaFeatures,
    };
  } catch (error) {
    console.error("Error getting user preferences:", error);
    return null;
  }
}

/**
 * Actualiza las preferencias del usuario autenticado
 */
export async function updateUserPreferences(
  preferences: Partial<UserPreferences>
): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return { success: false, error: "Usuario no autenticado" };
    }

    // Validar los valores de las preferencias
    const validThemes = ["light", "dark", "system"];
    const validLanguages = ["es", "en", "fr", "de"];
    const validTimezones = [
      "Europe/Madrid",
      "Europe/London",
      "America/New_York",
      "America/Los_Angeles",
    ];

    if (preferences.theme && !validThemes.includes(preferences.theme)) {
      return { success: false, error: "Tema no válido" };
    }

    if (
      preferences.language &&
      !validLanguages.includes(preferences.language)
    ) {
      return { success: false, error: "Idioma no válido" };
    }

    if (
      preferences.timezone &&
      !validTimezones.includes(preferences.timezone)
    ) {
      return { success: false, error: "Zona horaria no válida" };
    }

    // Actualizar las preferencias
    await prisma.user.update({
      where: { email: session.user.email },
      data: preferences,
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating user preferences:", error);
    return { success: false, error: "Error al actualizar las preferencias" };
  }
}

/**
 * Actualiza una preferencia específica del usuario
 */
export async function updateUserPreference(
  key: keyof UserPreferences,
  value: string | boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return { success: false, error: "Usuario no autenticado" };
    }

    // Validar el valor según la clave
    if (key === "theme") {
      const validThemes = ["light", "dark", "system"];
      if (!validThemes.includes(value as string)) {
        return { success: false, error: "Tema no válido" };
      }
    }

    if (key === "language") {
      const validLanguages = ["es", "en", "fr", "de"];
      if (!validLanguages.includes(value as string)) {
        return { success: false, error: "Idioma no válido" };
      }
    }

    if (key === "timezone") {
      const validTimezones = [
        "Europe/Madrid",
        "Europe/London",
        "America/New_York",
        "America/Los_Angeles",
      ];
      if (!validTimezones.includes(value as string)) {
        return { success: false, error: "Zona horaria no válida" };
      }
    }

    // Actualizar la preferencia específica
    await prisma.user.update({
      where: { email: session.user.email },
      data: { [key]: value },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating user preference:", error);
    return { success: false, error: "Error al actualizar la preferencia" };
  }
}
