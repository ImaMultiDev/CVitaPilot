"use client";

import { useState } from "react";
import {
  uploadProfileImage,
  deleteProfileImage,
} from "@/lib/actions/profile-actions";
import { useSession } from "next-auth/react";

interface UseProfileImageReturn {
  isUploading: boolean;
  isDeleting: boolean;
  error: string | null;
  success: string | null;
  uploadImage: (file: File) => Promise<void>;
  deleteImage: () => Promise<void>;
  clearMessages: () => void;
}

export const useProfileImage = (): UseProfileImageReturn => {
  const { update } = useSession();
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const result = await uploadProfileImage(formData);

      if (result.success) {
        setSuccess(
          result.message || "Foto de perfil actualizada correctamente"
        );
        // Actualizar la sesión para reflejar los cambios
        await update();
      } else {
        setError(result.error || "Error al subir la imagen");
      }
    } catch (err) {
      setError("Error inesperado al subir la imagen");
      console.error("Error uploading image:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = async () => {
    setIsDeleting(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await deleteProfileImage();

      if (result.success) {
        setSuccess(result.message || "Foto de perfil eliminada correctamente");
        // Actualizar la sesión para reflejar los cambios
        await update();
      } else {
        setError(result.error || "Error al eliminar la imagen");
      }
    } catch (err) {
      setError("Error inesperado al eliminar la imagen");
      console.error("Error deleting image:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return {
    isUploading,
    isDeleting,
    error,
    success,
    uploadImage,
    deleteImage,
    clearMessages,
  };
};
