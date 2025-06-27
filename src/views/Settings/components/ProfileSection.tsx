"use client";

import React, { useState } from "react";
import {
  UserProfileIcon,
  EmailIcon,
  VerificationIcon,
} from "@/components/ui/icons/SettingsIcons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export const ProfileSection: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Usuario Demo",
    email: "usuario@ejemplo.com",
  });

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Restaurar datos originales
    setIsEditing(false);
  };

  return (
    <section id="profile" className="mb-8 sm:mb-12">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <UserProfileIcon
          size={28}
          className="text-blue-600 dark:text-blue-400"
        />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Información Personal
        </h2>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <div className="relative">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                UD
              </div>
              <button className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 w-6 sm:w-8 h-6 sm:h-8 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 rounded-full flex items-center justify-center text-xs sm:text-sm hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors">
                ✏️
              </button>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Foto de perfil
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3">
                Sube una imagen que te represente. Máximo 5MB, formatos: JPG,
                PNG.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="w-full sm:w-auto"
              >
                Cambiar foto
              </Button>
            </div>
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Nombre completo
            </label>
            {isEditing ? (
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Ingresa tu nombre completo"
              />
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-900 dark:text-white break-words">
                  {formData.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto"
                >
                  Editar
                </Button>
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <EmailIcon size={16} />
              Correo electrónico
            </label>
            {isEditing ? (
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="tu@email.com"
              />
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-gray-900 dark:text-white break-all text-sm sm:text-base">
                    {formData.email}
                  </span>
                  <div className="flex items-center gap-1">
                    <VerificationIcon size={16} className="text-green-500" />
                    <span className="text-xs text-green-600 dark:text-green-400">
                      Verificado
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto"
                >
                  Editar
                </Button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
              <Button onClick={handleSave} className="w-full sm:w-auto">
                Guardar cambios
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancel}
                className="w-full sm:w-auto"
              >
                Cancelar
              </Button>
            </div>
          )}

          {/* Info Banner */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">i</span>
              </div>
              <div className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                <p className="font-medium mb-1">Información importante</p>
                <p>
                  Los cambios en tu email requerirán verificación. Te enviaremos
                  un enlace de confirmación a tu nueva dirección.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
