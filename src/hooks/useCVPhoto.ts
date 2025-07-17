"use client";

import { useState, useEffect } from "react";
import { uploadCVPhoto, deleteCVPhoto } from "@/lib/actions/cv-actions";

interface UseCVPhotoReturn {
  photoUrl: string | null;
  isUploading: boolean;
  isDeleting: boolean;
  error: string | null;
  success: string | null;
  uploadPhoto: (file: File) => Promise<void>;
  deletePhoto: () => Promise<void>;
  clearMessages: () => void;
}

export const useCVPhoto = (
  initialPhotoUrl?: string | null
): UseCVPhotoReturn => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(
    initialPhotoUrl || null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Actualizar photoUrl cuando cambie initialPhotoUrl
  useEffect(() => {
    setPhotoUrl(initialPhotoUrl || null);
  }, [initialPhotoUrl]);

  const uploadPhoto = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const result = await uploadCVPhoto(formData);

      if (result.success) {
        setPhotoUrl(result.url || null);
        setSuccess(result.message || "Foto del CV actualizada correctamente");
      } else {
        setError(result.error || "Error al subir la imagen");
      }
    } catch (err) {
      setError("Error inesperado al subir la imagen");
      console.error("Error uploading CV photo:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const deletePhoto = async () => {
    setIsDeleting(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await deleteCVPhoto();

      if (result.success) {
        setPhotoUrl(null);
        setSuccess(result.message || "Foto del CV eliminada correctamente");
      } else {
        setError(result.error || "Error al eliminar la imagen");
      }
    } catch (err) {
      setError("Error inesperado al eliminar la imagen");
      console.error("Error deleting CV photo:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return {
    photoUrl,
    isUploading,
    isDeleting,
    error,
    success,
    uploadPhoto,
    deletePhoto,
    clearMessages,
  };
};
