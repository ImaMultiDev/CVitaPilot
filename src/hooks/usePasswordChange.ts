"use client";

import { useState } from "react";
import { changePassword } from "@/lib/actions/security-actions";
import { getPasswordStrength } from "@/utils/passwordUtils";
import { useSession } from "next-auth/react";

interface UsePasswordChangeReturn {
  isChanging: boolean;
  error: string | null;
  success: string | null;
  passwordStrength: {
    score: number;
    feedback: string[];
    color: string;
  };
  changePassword: (formData: FormData) => Promise<void>;
  getPasswordStrength: (password: string) => void;
  clearMessages: () => void;
}

export const usePasswordChange = (): UsePasswordChangeReturn => {
  const { update } = useSession();
  const [isChanging, setIsChanging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    feedback: string[];
    color: string;
  }>({
    score: 0,
    feedback: [],
    color: "red",
  });

  const handleChangePassword = async (formData: FormData) => {
    setIsChanging(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await changePassword(formData);

      if (result.success) {
        setSuccess(result.message || "Contraseña actualizada correctamente");
        // Actualizar la sesión
        await update();
      } else {
        setError(result.error || "Error al cambiar la contraseña");
      }
    } catch (err) {
      setError("Error inesperado al cambiar la contraseña");
      console.error("Error changing password:", err);
    } finally {
      setIsChanging(false);
    }
  };

  const handleGetPasswordStrength = (password: string) => {
    const strength = getPasswordStrength(password);
    setPasswordStrength(strength);
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return {
    isChanging,
    error,
    success,
    passwordStrength,
    changePassword: handleChangePassword,
    getPasswordStrength: handleGetPasswordStrength,
    clearMessages,
  };
};
