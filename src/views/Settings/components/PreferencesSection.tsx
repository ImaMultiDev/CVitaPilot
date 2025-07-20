"use client";

import React from "react";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { usePreferences } from "@/hooks/usePreferences";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export const PreferencesSection: React.FC = () => {
  const { preferences, isLoading, isSaving, updatePreference } =
    usePreferences();

  const themeOptions = [
    { value: "light", label: "Claro" },
    { value: "dark", label: "Oscuro" },
    { value: "system", label: "Sistema" },
  ];

  if (isLoading) {
    return (
      <section id="preferences" className="mb-8 sm:mb-12">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <ConfiguredIcon
            name="settings"
            size={28}
            className="text-purple-600 dark:text-purple-400"
          />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Preferencias Generales
          </h2>
        </div>
        <div className="flex justify-center items-center h-32">
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  return (
    <section id="preferences" className="mb-8 sm:mb-12">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <ConfiguredIcon
          name="settings"
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
                <ConfiguredIcon name="moon" size={16} />
                Tema de la aplicación
              </label>
              <div className="relative">
                <Select
                  value={preferences.theme}
                  onChange={(value) => updatePreference("theme", value)}
                  options={themeOptions}
                  placeholder="Selecciona un tema"
                  disabled={isSaving}
                />
              </div>
            </div>

            {/* Language Selection - TEMPORARILY HIDDEN */}
            {/* <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Idioma de la interfaz
              </label>
              <div className="relative">
                <Select
                  value={preferences.language}
                  onChange={(value) => updatePreference("language", value)}
                  options={languageOptions}
                  placeholder="Selecciona un idioma"
                  disabled={isSaving}
                />
              </div>
            </div> */}

            {/* Timezone Selection - TEMPORARILY HIDDEN */}
            {/* <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Zona horaria
              </label>
              <div className="relative">
                <Select
                  value={preferences.timezone}
                  onChange={(value) => updatePreference("timezone", value)}
                  options={timezoneOptions}
                  placeholder="Selecciona zona horaria"
                  disabled={isSaving}
                />
              </div>
            </div> */}
          </div>
        </Card>

        {/* Advanced Settings - TEMPORARILY HIDDEN */}
        {/* <Card className="p-4 sm:p-6">
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
        {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <ConfiguredIcon
                    name="save"
                    size={20}
                    className="text-blue-500"
                  />
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
                  disabled={isSaving}
                />
              </div>
            </div> */}

        {/* Analytics */}
        {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <ConfiguredIcon
                    name="bar-chart"
                    size={20}
                    className="text-green-500"
                  />
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
                  disabled={isSaving}
                />
              </div>
            </div> */}

        {/* Beta Features */}
        {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <ConfiguredIcon
                    name="zap"
                    size={20}
                    className="text-yellow-500"
                  />
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
                  disabled={isSaving}
                />
              </div>
            </div> */}
        {/* </div> */}
        {/* </Card> */}
      </div>
    </section>
  );
};
