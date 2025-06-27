"use client";

import React, { useState } from "react";
import {
  NotificationIcon,
  EmailIcon,
} from "@/components/ui/icons/SettingsIcons";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";

interface NotificationSettings {
  emailUpdates: boolean;
  pushNotifications: boolean;
  weeklyReports: boolean;
  securityAlerts: boolean;
  marketingEmails: boolean;
  cvReminders: boolean;
}

export const NotificationSection: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    emailUpdates: true,
    pushNotifications: false,
    weeklyReports: true,
    securityAlerts: true,
    marketingEmails: false,
    cvReminders: true,
  });

  const updateSetting = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationTypes = [
    {
      key: "emailUpdates" as keyof NotificationSettings,
      title: "Actualizaciones por email",
      description: "Recibe notificaciones importantes sobre tu cuenta y CVs",
      icon: <EmailIcon size={20} className="text-blue-500" />,
    },
    {
      key: "pushNotifications" as keyof NotificationSettings,
      title: "Notificaciones push",
      description: "Alertas instantáneas en tu navegador",
      icon: (
        <div className="w-5 h-5 bg-orange-500 rounded text-white flex items-center justify-center text-xs">
          🔔
        </div>
      ),
    },
    {
      key: "weeklyReports" as keyof NotificationSettings,
      title: "Reportes semanales",
      description: "Resumen semanal de tu actividad y estadísticas",
      icon: (
        <div className="w-5 h-5 bg-green-500 rounded text-white flex items-center justify-center text-xs">
          📊
        </div>
      ),
    },
    {
      key: "securityAlerts" as keyof NotificationSettings,
      title: "Alertas de seguridad",
      description: "Notificaciones críticas sobre la seguridad de tu cuenta",
      icon: (
        <div className="w-5 h-5 bg-red-500 rounded text-white flex items-center justify-center text-xs">
          🔒
        </div>
      ),
    },
    {
      key: "marketingEmails" as keyof NotificationSettings,
      title: "Emails promocionales",
      description: "Ofertas especiales, nuevas funciones y contenido educativo",
      icon: (
        <div className="w-5 h-5 bg-purple-500 rounded text-white flex items-center justify-center text-xs">
          ✨
        </div>
      ),
    },
    {
      key: "cvReminders" as keyof NotificationSettings,
      title: "Recordatorios de CV",
      description: "Sugerencias para actualizar y mejorar tus CVs",
      icon: (
        <div className="w-5 h-5 bg-indigo-500 rounded text-white flex items-center justify-center text-xs">
          📝
        </div>
      ),
    },
  ];

  return (
    <section id="notifications" className="mb-8 sm:mb-12">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <NotificationIcon
          size={28}
          className="text-blue-600 dark:text-blue-400"
        />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Notificaciones
        </h2>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Notification Settings */}
        <Card className="p-4 sm:p-6">
          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Tipos de notificaciones
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              Elige qué notificaciones quieres recibir y cómo.
            </p>
          </div>

          <div className="space-y-4">
            {notificationTypes.map((notification, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-lg">{notification.icon}</span>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                      {notification.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm ml-8 sm:ml-8">
                    {notification.description}
                  </p>
                </div>
                <div className="flex justify-end sm:justify-start">
                  <Toggle
                    checked={settings[notification.key]}
                    onChange={() => updateSetting(notification.key)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Email Frequency */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium sm:font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 text-sm sm:text-base">
              Frecuencia de emails
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <button className="p-3 text-left bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="font-medium text-blue-900 dark:text-blue-100 text-sm sm:text-base">
                  Inmediato
                </div>
                <div className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                  Recibir cada notificación
                </div>
              </button>
              <button className="p-3 text-left border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                  Resumen diario
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Una vez al día
                </div>
              </button>
              <button className="p-3 text-left border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                  Resumen semanal
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Los lunes
                </div>
              </button>
            </div>
          </div>

          {/* Important Notice */}
          <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 sm:p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">!</span>
              </div>
              <div className="text-xs sm:text-sm text-amber-800 dark:text-amber-200">
                <p className="font-medium mb-1">Nota importante</p>
                <p>
                  Las alertas de seguridad siempre se enviarán
                  independientemente de tu configuración para mantener tu cuenta
                  protegida.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
