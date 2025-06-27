"use client";

import React, { useState } from "react";
import { ThemeIcon } from "@/components/ui/icons/SettingsIcons";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { SettingsIcon } from "@/components/ui/icons/SettingsIcons";

export const PreferencesSection: React.FC = () => {
  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "es",
    timezone: "Europe/Madrid",
    autoSave: true,
    analytics: false,
    betaFeatures: false,
  });

  const updatePreference = (key: string, value: string | boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const themeOptions = [
    { value: "light", label: "☀️ Claro" },
    { value: "dark", label: "🌙 Oscuro" },
    { value: "system", label: "⚙️ Sistema" },
  ];

  const languageOptions = [
    { value: "es", label: "🇪🇸 Español" },
    { value: "en", label: "🇺🇸 English" },
    { value: "fr", label: "🇫🇷 Français" },
    { value: "de", label: "🇩🇪 Deutsch" },
  ];

  const timezoneOptions = [
    { value: "Europe/Madrid", label: "Madrid (UTC+1)" },
    { value: "Europe/London", label: "Londres (UTC+0)" },
    { value: "America/New_York", label: "Nueva York (UTC-5)" },
    { value: "America/Los_Angeles", label: "Los Ángeles (UTC-8)" },
  ];

  return (
    <section id="preferences" className="mb-8 sm:mb-12">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <SettingsIcon
          size={28}
          className="text-purple-600 dark:text-purple-400"
        />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Preferencias Generales
        </h2>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Main Preferences */}
        <Card className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Configuración de la aplicación
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              Personaliza tu experiencia con CVitaPilot según tus preferencias.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Theme Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <ThemeIcon size={16} />
                Tema de la aplicación
              </label>
              <div className="relative">
                <Select
                  value={preferences.theme}
                  onChange={(value) => updatePreference("theme", value)}
                  options={themeOptions}
                  placeholder="Selecciona un tema"
                />
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Idioma de la interfaz
              </label>
              <div className="relative">
                <Select
                  value={preferences.language}
                  onChange={(value) => updatePreference("language", value)}
                  options={languageOptions}
                  placeholder="Selecciona un idioma"
                />
              </div>
            </div>

            {/* Timezone Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Zona horaria
              </label>
              <div className="relative">
                <Select
                  value={preferences.timezone}
                  onChange={(value) => updatePreference("timezone", value)}
                  options={timezoneOptions}
                  placeholder="Selecciona zona horaria"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Advanced Settings */}
        <Card className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Configuración avanzada
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              Opciones para usuarios avanzados y configuración técnica.
            </p>
          </div>

          <div className="space-y-4">
            {/* Auto Save */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-lg">💾</span>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                    Guardado automático
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm ml-8">
                  Guarda automáticamente los cambios en tus CVs cada 30
                  segundos.
                </p>
              </div>
              <div className="flex justify-end sm:justify-start">
                <Toggle
                  checked={preferences.autoSave}
                  onChange={(checked) => updatePreference("autoSave", checked)}
                />
              </div>
            </div>

            {/* Analytics */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-lg">📊</span>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                    Análisis de uso
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm ml-8">
                  Ayúdanos a mejorar CVitaPilot compartiendo datos de uso
                  anónimos.
                </p>
              </div>
              <div className="flex justify-end sm:justify-start">
                <Toggle
                  checked={preferences.analytics}
                  onChange={(checked) => updatePreference("analytics", checked)}
                />
              </div>
            </div>

            {/* Beta Features */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-lg">🚀</span>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                    Funciones experimentales
                  </h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm ml-8">
                  Accede a nuevas funciones antes de su lanzamiento oficial.
                </p>
              </div>
              <div className="flex justify-end sm:justify-start">
                <Toggle
                  checked={preferences.betaFeatures}
                  onChange={(checked) =>
                    updatePreference("betaFeatures", checked)
                  }
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Performance Stats */}
        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Estadísticas de rendimiento
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                47
              </div>
              <div className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                CVs creados
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                2.3s
              </div>
              <div className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                Tiempo promedio
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                15MB
              </div>
              <div className="text-xs sm:text-sm text-purple-700 dark:text-purple-300">
                Almacenamiento usado
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
