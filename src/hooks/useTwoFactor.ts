"use client";

import { useState, useEffect } from "react";
import {
  generateTwoFactorSecret,
  enableTwoFactor,
  disableTwoFactor,
  getTwoFactorStatus,
  verifyTwoFactorCode,
} from "@/lib/actions/security-actions";
import { useSession } from "next-auth/react";

interface UseTwoFactorReturn {
  isEnabled: boolean;
  isLoading: boolean;
  isEnabling: boolean;
  isDisabling: boolean;
  error: string | null;
  success: string | null;
  qrCodeUrl: string | null;
  secret: string | null;
  setupCode: string | null;
  generateSecret: () => Promise<void>;
  enable2FA: (code: string) => Promise<void>;
  disable2FA: () => Promise<void>;
  verifyCode: (code: string) => Promise<boolean>;
  clearMessages: () => void;
}

export const useTwoFactor = (): UseTwoFactorReturn => {
  const { update } = useSession();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnabling, setIsEnabling] = useState(false);
  const [isDisabling, setIsDisabling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [setupCode, setSetupCode] = useState<string | null>(null);

  // Obtener estado inicial del 2FA
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const result = await getTwoFactorStatus();
        if (result.success && result.isEnabled !== undefined) {
          setIsEnabled(result.isEnabled);
        }
      } catch (err) {
        console.error("Error fetching 2FA status:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const generateSecret = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await generateTwoFactorSecret();
      if (result.success && result.secret && result.qrCodeUrl) {
        setSecret(result.secret);
        setQrCodeUrl(result.qrCodeUrl);
        setSetupCode(result.secret); // Para mostrar al usuario
        setSuccess(
          "Código 2FA generado. Escanea el QR o ingresa el código manualmente."
        );
      } else {
        setError(result.error || "Error al generar el código 2FA");
      }
    } catch (err) {
      setError("Error inesperado al generar el código 2FA");
      console.error("Error generating 2FA secret:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const enable2FA = async (code: string) => {
    if (!secret) {
      setError("No hay un código 2FA generado");
      return;
    }

    setIsEnabling(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await enableTwoFactor(secret, code);
      if (result.success) {
        setSuccess(result.message || "2FA habilitado correctamente");
        setIsEnabled(true);
        setQrCodeUrl(null);
        setSecret(null);
        setSetupCode(null);
        await update(); // Actualizar sesión
      } else {
        setError(result.error || "Error al habilitar 2FA");
      }
    } catch (err) {
      setError("Error inesperado al habilitar 2FA");
      console.error("Error enabling 2FA:", err);
    } finally {
      setIsEnabling(false);
    }
  };

  const disable2FA = async () => {
    setIsDisabling(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await disableTwoFactor();
      if (result.success) {
        setSuccess(result.message || "2FA deshabilitado correctamente");
        setIsEnabled(false);
        await update(); // Actualizar sesión
      } else {
        setError(result.error || "Error al deshabilitar 2FA");
      }
    } catch (err) {
      setError("Error inesperado al deshabilitar 2FA");
      console.error("Error disabling 2FA:", err);
    } finally {
      setIsDisabling(false);
    }
  };

  const verifyCode = async (code: string): Promise<boolean> => {
    if (!secret) return false;

    try {
      const result = await verifyTwoFactorCode(code, secret);
      return result.success && result.isValid === true;
    } catch (err) {
      console.error("Error verifying 2FA code:", err);
      return false;
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return {
    isEnabled,
    isLoading,
    isEnabling,
    isDisabling,
    error,
    success,
    qrCodeUrl,
    secret,
    setupCode,
    generateSecret,
    enable2FA,
    disable2FA,
    verifyCode,
    clearMessages,
  };
};
