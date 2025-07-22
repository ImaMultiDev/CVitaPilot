"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useProfileImage } from "@/hooks/useProfileImage";
import { updateProfileInfo } from "@/lib/actions/profile-actions";
import Image from "next/image";

export const ProfileSection: React.FC = () => {
  const { data: session, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  });
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    isUploading,
    isDeleting,
    error: imageError,
    success: imageSuccess,
    uploadImage,
    deleteImage,
    clearMessages: clearImageMessages,
  } = useProfileImage();

  // Actualizar formData cuando cambie la sesión
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
      });
    }
  }, [session]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDeleteImage = () => {
    deleteImage();
  };

  const handleSave = async () => {
    setIsSaving(true);
    setProfileError(null);
    setProfileSuccess(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);

      const result = await updateProfileInfo(formDataToSend);

      if (result.success) {
        setProfileSuccess(
          result.message || "Información actualizada correctamente"
        );
        setIsEditing(false);
        await update(); // Actualizar sesión
      } else {
        setProfileError(result.error || "Error al actualizar la información");
      }
    } catch (err) {
      setProfileError("Error inesperado al actualizar la información");
      console.error(err);
    } finally {
      setIsSaving(false);
      clearImageMessages();
    }
  };

  const handleCancel = () => {
    setFormData({
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    });
    setIsEditing(false);
    setProfileError(null);
    setProfileSuccess(null);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section id="profile" className="mb-8 sm:mb-12">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <ConfiguredIcon
          name="user"
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
            {/* Avatar Container */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                {session?.user?.image &&
                session.user.image.startsWith("http") ? (
                  <Image
                    src={session.user.image}
                    alt="Foto de perfil"
                    className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                    width={80}
                    height={80}
                    unoptimized
                  />
                ) : (
                  <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                    {getInitials(session?.user?.name || "U")}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleFileInputClick}
                  disabled={isUploading}
                >
                  {isUploading ? "Subiendo..." : "Cambiar foto"}
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleDeleteImage}
                  disabled={isDeleting || !session?.user?.image}
                >
                  {isDeleting ? "Eliminando..." : "Eliminar foto"}
                </Button>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Foto de perfil
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3">
                Sube una imagen que te represente. Máximo 5MB, formatos: JPG,
                PNG.
              </p>

              {/* Mensajes de estado */}
              {(imageError || imageSuccess) && (
                <div
                  className={`mt-3 p-2 rounded text-xs ${
                    imageError
                      ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                      : "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                  }`}
                >
                  {imageError || imageSuccess}
                </div>
              )}
            </div>
          </div>

          {/* Input file oculto */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

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
                  {formData.name || "No especificado"}
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
              <ConfiguredIcon name="mail" size={16} />
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
                    <ConfiguredIcon
                      name="check-circle"
                      size={16}
                      className="text-green-500"
                    />
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
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full sm:w-auto"
              >
                {isSaving ? "Guardando..." : "Guardar cambios"}
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancel}
                disabled={isSaving}
                className="w-full sm:w-auto"
              >
                Cancelar
              </Button>
            </div>
          )}

          {/* Mensajes de estado para información del perfil */}
          {(profileError || profileSuccess) && (
            <div
              className={`mt-4 p-3 rounded-lg ${
                profileError
                  ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                  : "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <ConfiguredIcon
                  name={profileError ? "alert-circle" : "check-circle"}
                  size={16}
                  className={profileError ? "text-red-500" : "text-green-500"}
                />
                <span className="text-sm font-medium">
                  {profileError || profileSuccess}
                </span>
              </div>
            </div>
          )}

          {/* Info Banner */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <ConfiguredIcon
                  name="badge-info"
                  size={16}
                  className="text-white"
                />
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
