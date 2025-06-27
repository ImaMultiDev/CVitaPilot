"use client";

import React, { useState } from "react";
import {
  SecurityIcon,
  VerificationIcon,
} from "@/components/ui/icons/SettingsIcons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";

export const SecuritySection: React.FC = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handlePasswordChange = () => {
    // Aquí iría la lógica para cambiar la contraseña
    setShowPasswordForm(false);
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const toggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // Aquí iría la lógica para habilitar/deshabilitar 2FA
  };

  return (
    <section id="security" className="mb-8 sm:mb-12">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <SecurityIcon
          size={28}
          className="text-green-600 dark:text-green-400"
        />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Seguridad y Contraseña
        </h2>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Password Section */}
        <Card className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Contraseña
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                Última actualización: hace 3 meses
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="w-full sm:w-auto"
            >
              {showPasswordForm ? "Cancelar" : "Cambiar"}
            </Button>
          </div>

          {showPasswordForm && (
            <div className="space-y-4 border-t pt-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Contraseña actual
                </label>
                <Input
                  type="password"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords({ ...passwords, current: e.target.value })
                  }
                  placeholder="Ingresa tu contraseña actual"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Nueva contraseña
                </label>
                <Input
                  type="password"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                  placeholder="Mínimo 8 caracteres"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Confirmar nueva contraseña
                </label>
                <Input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                  placeholder="Repite la nueva contraseña"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                <Button
                  onClick={handlePasswordChange}
                  className="w-full sm:w-auto"
                >
                  Actualizar contraseña
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowPasswordForm(false)}
                  className="w-full sm:w-auto"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Two Factor Authentication */}
        <Card className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  Autenticación de dos factores
                </h3>
                {twoFactorEnabled && (
                  <div className="flex items-center gap-1">
                    <VerificationIcon size={16} className="text-green-500" />
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                      Activo
                    </span>
                  </div>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4">
                Añade una capa extra de seguridad a tu cuenta con verificación
                en dos pasos.
              </p>
              {twoFactorEnabled && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <p className="text-xs sm:text-sm text-green-800 dark:text-green-200">
                    Tu cuenta está protegida con autenticación de dos factores.
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-center sm:justify-start">
              <Toggle checked={twoFactorEnabled} onChange={toggleTwoFactor} />
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Actividad reciente
          </h3>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Inicio de sesión desde Windows
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  IP: 192.168.1.100 • Madrid, España
                </p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 self-start sm:self-center">
                Hace 2 horas
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Cambio de configuración
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Preferencias de notificaciones
                </p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 self-start sm:self-center">
                Ayer
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Creación de nuevo CV
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 break-words">
                  CV_Desarrollador_Frontend.pdf
                </p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 self-start sm:self-center">
                Hace 3 días
              </span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
