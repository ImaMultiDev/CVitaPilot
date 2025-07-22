"use client";

import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import {
  exportUserData,
  deleteUserAccount,
  getUserStorageUsage,
} from "@/lib/actions/auth-actions";
import { useNotification } from "@/hooks/useNotification";
import { Notification } from "@/components/ui/Notification";

export const PrivacySection: React.FC = () => {
  const { notifications, showSuccess, showError, removeNotification } =
    useNotification();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [storageData, setStorageData] = useState<{
    cvs: number;
    totalSize: number;
    breakdown: {
      cvs: number;
      configurations: number;
      activities: number;
    };
  } | null>(null);
  const [isLoadingStorage, setIsLoadingStorage] = useState(true);

  // Cargar datos de uso de almacenamiento
  useEffect(() => {
    const loadStorageData = async () => {
      try {
        setIsLoadingStorage(true);
        const result = await getUserStorageUsage();

        if (result.success && result.data) {
          setStorageData(result.data);
        } else {
          console.error("Error loading storage data:", result.error);
        }
      } catch (error) {
        console.error("Error loading storage data:", error);
      } finally {
        setIsLoadingStorage(false);
      }
    };

    loadStorageData();
  }, []);

  // Función para formatear bytes en formato legible
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleDataExport = async () => {
    setIsExporting(true);
    try {
      const result = await exportUserData();

      if (result.success && result.data) {
        // Crear y descargar el archivo JSON
        const dataStr = JSON.stringify(result.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `cvitapilot-data-${
          new Date().toISOString().split("T")[0]
        }.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showSuccess(
          "Exportación exitosa",
          "Los datos se han exportado y descargado correctamente."
        );
      } else {
        showError(
          "Error al exportar",
          result.error || "Error desconocido al exportar datos."
        );
      }
    } catch (error) {
      console.error("Error exportando datos:", error);
      showError(
        "Error al exportar",
        "Error interno al exportar datos. Inténtalo de nuevo."
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation === "ELIMINAR") {
      setIsDeleting(true);
      try {
        const result = await deleteUserAccount();

        if (result.success) {
          showSuccess(
            "Cuenta eliminada",
            "Tu cuenta ha sido eliminada exitosamente."
          );
          setShowDeleteModal(false);
          // Cerrar sesión y redirigir al login
          await signOut({ callbackUrl: "/auth/login" });
        } else {
          showError(
            "Error al eliminar cuenta",
            result.error || "Error desconocido al eliminar la cuenta."
          );
        }
      } catch (error) {
        console.error("Error eliminando cuenta:", error);
        showError(
          "Error al eliminar cuenta",
          "Error interno al eliminar la cuenta. Inténtalo de nuevo."
        );
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <section id="privacy" className="mb-8 sm:mb-12">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <ConfiguredIcon
          name="shield-user"
          size={28}
          className="text-green-600 dark:text-green-400"
        />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Privacidad y Datos
        </h2>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Privacy Controls - TEMPORARILY HIDDEN */}
        {/* <Card className="p-4 sm:p-6">
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
        </Card> */}

        {/* Data Export */}
        <Card className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Exportación de datos
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              Descarga una copia completa de todos tus datos almacenados en
              CVitaPilot.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <ConfiguredIcon
                  name="download"
                  size={20}
                  className="text-blue-500"
                />
                <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                  Solicitar exportación
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                Incluye todos tus CVs, configuraciones, preferencias y datos del
                perfil en formato JSON.
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={handleDataExport}
              disabled={isExporting}
              loading={isExporting}
              className="w-full sm:w-auto"
            >
              {isExporting ? "Exportando..." : "Exportar datos"}
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

          {isLoadingStorage ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">
                Cargando datos...
              </span>
            </div>
          ) : storageData ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    CVs y documentos ({storageData.cvs} CVs)
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatBytes(storageData.breakdown.cvs)}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Configuraciones y preferencias
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatBytes(storageData.breakdown.configurations)}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Actividad y logs
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatBytes(storageData.breakdown.activities)}
                </span>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Total utilizado
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {formatBytes(storageData.totalSize)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                No hay datos de almacenamiento disponibles.
              </p>
            </div>
          )}
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
                className="w-full flex sm:w-auto items-center justify-center"
              >
                <ConfiguredIcon
                  name="alert-triangle"
                  size={16}
                  className="mr-2 inline-block"
                />
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
              disabled={deleteConfirmation !== "ELIMINAR" || isDeleting}
              loading={isDeleting}
              className="w-full sm:w-auto"
            >
              {isDeleting ? "Eliminando..." : "Eliminar cuenta definitivamente"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setShowDeleteModal(false);
                setDeleteConfirmation("");
              }}
              disabled={isDeleting}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>

      {/* Notifications */}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </section>
  );
};
