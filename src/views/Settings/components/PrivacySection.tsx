"use client";

import React, { useState } from "react";
import {
  PrivacyIcon,
  ExportIcon,
  DeleteAccountIcon,
} from "@/components/ui/icons/SettingsIcons";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";

export const PrivacySection: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [privacySettings, setPrivacySettings] = useState([
    {
      title: "Perfil público",
      description: "Permite que otros usuarios vean tu perfil y CVs públicos.",
      icon: "👤",
      enabled: false,
    },
    {
      title: "Recolección de datos",
      description:
        "Permitir la recolección de datos para mejorar la experiencia.",
      icon: "📊",
      enabled: true,
    },
    {
      title: "Compartir con terceros",
      description:
        "Compartir datos agregados y anónimos con socios de confianza.",
      icon: "🔗",
      enabled: false,
    },
    {
      title: "Análisis de comportamiento",
      description: "Analizar patrones de uso para optimizar la aplicación.",
      icon: "🔍",
      enabled: true,
    },
  ]);

  const togglePrivacySetting = (index: number) => {
    setPrivacySettings((prev) =>
      prev.map((setting, i) =>
        i === index ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const handleDataExport = () => {
    // Aquí iría la lógica para exportar datos
    alert("Se iniciará la descarga de tus datos en unos momentos.");
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation === "ELIMINAR") {
      // Aquí iría la lógica para eliminar la cuenta
      alert("Cuenta eliminada exitosamente.");
      setShowDeleteModal(false);
    }
  };

  return (
    <section id="privacy" className="mb-8 sm:mb-12">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <PrivacyIcon size={28} className="text-green-600 dark:text-green-400" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Privacidad y Datos
        </h2>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Privacy Controls */}
        <Card className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Control de privacidad
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              Gestiona qué información compartes y cómo se utiliza.
            </p>
          </div>

          <div className="space-y-4">
            {privacySettings.map((setting, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-lg">{setting.icon}</span>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                      {setting.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm ml-8">
                    {setting.description}
                  </p>
                </div>
                <div className="flex justify-end sm:justify-start">
                  <Toggle
                    checked={setting.enabled}
                    onChange={() => togglePrivacySetting(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Data Export */}
        <Card className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Exportación de datos
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              Descarga una copia de todos tus datos almacenados en CVitaPilot.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <ExportIcon size={20} className="text-blue-500" />
                <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                  Solicitar exportación
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                Incluye CVs, configuraciones y datos del perfil en formato JSON.
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={handleDataExport}
              className="w-full sm:w-auto"
            >
              Exportar datos
            </Button>
          </div>
        </Card>

        {/* Storage Usage */}
        <Card className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Uso del almacenamiento
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              Revisa cuánto espacio ocupan tus datos en CVitaPilot.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  CVs y documentos
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                12.4 MB
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Configuraciones
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                2.1 KB
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Caché y temporales
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                1.8 MB
              </span>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  Total utilizado
                </span>
                <span className="font-bold text-gray-900 dark:text-white">
                  14.3 MB
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-4 sm:p-6 border-red-200 dark:border-red-800">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
              Zona de peligro
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              Estas acciones son permanentes y no se pueden deshacer.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
              <div className="flex-1">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-1 text-sm sm:text-base">
                  Eliminar cuenta permanentemente
                </h4>
                <p className="text-red-700 dark:text-red-300 text-xs sm:text-sm">
                  Esto eliminará todos tus datos, CVs, configuraciones y
                  preferencias de forma irreversible.
                </p>
              </div>
              <Button
                variant="danger"
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex sm:w-auto"
              >
                <DeleteAccountIcon size={16} className="mr-2 inline-block" />
                Eliminar cuenta
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmar eliminación de cuenta"
      >
        <div className="space-y-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">!</span>
              </div>
              <div className="text-sm text-red-800 dark:text-red-200">
                <p className="font-medium mb-1">¡Atención!</p>
                <p>
                  Esta acción eliminará permanentemente tu cuenta y todos los
                  datos asociados. No podrás recuperar esta información.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Para confirmar, escribe{" "}
              <span className="font-bold text-red-600 dark:text-red-400">
                &ldquo;ELIMINAR&rdquo;
              </span>{" "}
              en el campo:
            </label>
            <Input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="Escribe ELIMINAR para confirmar"
              className="w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
            <Button
              variant="danger"
              onClick={handleDeleteAccount}
              disabled={deleteConfirmation !== "ELIMINAR"}
              className="w-full sm:w-auto"
            >
              Eliminar cuenta definitivamente
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setShowDeleteModal(false);
                setDeleteConfirmation("");
              }}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
