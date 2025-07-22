"use client";

import React from "react";
import {
  SettingsHeader,
  ProfileSection,
  SecuritySection,
  PreferencesSection,
  PrivacySection,
} from "./components";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";
import { SupportSection } from "./components/SupportSection";

export const SettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-6xl">
        {/* Header */}
        <SettingsHeader />

        {/* Quick Navigation */}
        <div className="mb-6 sm:mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 text-xs sm:text-sm">
            <a
              href="#profile"
              className="px-2 flex items-center gap-2 sm:px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-center whitespace-nowrap"
            >
              <ConfiguredIcon name="user" size={16} /> Perfil
            </a>
            <a
              href="#security"
              className="px-2 flex items-center gap-2 sm:px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-center whitespace-nowrap"
            >
              <ConfiguredIcon name="lock" size={16} /> Seguridad
            </a>
            {/*<a
              href="#notifications"
              className="px-2 flex items-center gap-2 sm:px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-center whitespace-nowrap"
            >
              <ConfiguredIcon name="bell" size={16} /> Notificaciones
            </a>*/}

            <a
              href="#preferences"
              className="px-2 flex items-center gap-2 sm:px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-center whitespace-nowrap"
            >
              <ConfiguredIcon name="file-sliders" size={16} /> Preferencias
            </a>
            <a
              href="#privacy"
              className="px-2 flex items-center gap-2 sm:px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-center whitespace-nowrap"
            >
              <ConfiguredIcon name="shield-user" size={16} /> Privacidad
            </a>
            <a
              href="#support"
              className="px-2 flex items-center gap-2 sm:px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-center whitespace-nowrap"
            >
              <ConfiguredIcon name="badge-question-mark" size={16} /> Soporte
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8 relative isolation-isolate">
          <ProfileSection />
          <SecuritySection />
          <PreferencesSection />
          <PrivacySection />
          <SupportSection />
        </div>
      </div>
    </div>
  );
};
