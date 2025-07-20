"use client";

import React, { useState, useEffect } from "react";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Toggle";
import { usePasswordChange } from "@/hooks/usePasswordChange";
import { useTwoFactor } from "@/hooks/useTwoFactor";
import { getPasswordLastUpdate } from "@/lib/actions/security-actions";
import Image from "next/image";

export const SecuritySection: React.FC = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [lastPasswordUpdate, setLastPasswordUpdate] = useState<string>("");

  const {
    isChanging,
    error,
    success,
    passwordStrength,
    changePassword,
    getPasswordStrength,
    clearMessages,
  } = usePasswordChange();

  const {
    isEnabled: twoFactorEnabled,
    isLoading: twoFactorLoading,
    isEnabling,
    isDisabling,
    error: twoFactorError,
    success: twoFactorSuccess,
    qrCodeUrl,
    setupCode,
    generateSecret,
    enable2FA,
    disable2FA,
    clearMessages: clearTwoFactorMessages,
  } = useTwoFactor();

  // Obtener última actualización de contraseña
  useEffect(() => {
    const fetchLastUpdate = async () => {
      const result = await getPasswordLastUpdate();
      if (result.success && result.lastUpdate) {
        const date = new Date(result.lastUpdate);
        const now = new Date();
        const diffInDays = Math.floor(
          (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffInDays === 0) {
          setLastPasswordUpdate("Hoy");
        } else if (diffInDays === 1) {
          setLastPasswordUpdate("Ayer");
        } else if (diffInDays < 30) {
          setLastPasswordUpdate(`Hace ${diffInDays} días`);
        } else {
          const months = Math.floor(diffInDays / 30);
          setLastPasswordUpdate(`Hace ${months} mes${months > 1 ? "es" : ""}`);
        }
      }
    };

    fetchLastUpdate();
  }, []);

  const handlePasswordChange = async () => {
    const formData = new FormData();
    formData.append("currentPassword", passwords.current);
    formData.append("newPassword", passwords.new);
    formData.append("confirmPassword", passwords.confirm);

    await changePassword(formData);

    if (!error) {
      setShowPasswordForm(false);
      setPasswords({ current: "", new: "", confirm: "" });
    }
  };

  const toggleTwoFactor = async () => {
    if (twoFactorEnabled) {
      await disable2FA();
    } else {
      await generateSecret();
      setShowTwoFactorSetup(true);
    }
  };

  return (
    <section id="security" className="mb-8 sm:mb-12">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <ConfiguredIcon
          name="shield"
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
                Última actualización: {lastPasswordUpdate || "No disponible"}
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
                  onChange={(e) => {
                    setPasswords({ ...passwords, new: e.target.value });
                    getPasswordStrength(e.target.value);
                  }}
                  placeholder="Mínimo 8 caracteres"
                />
                {/* Indicador de fortaleza de contraseña */}
                {passwords.new && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded ${
                            level <= passwordStrength.score
                              ? passwordStrength.color === "green"
                                ? "bg-green-500"
                                : passwordStrength.color === "yellow"
                                  ? "bg-yellow-500"
                                  : passwordStrength.color === "orange"
                                    ? "bg-orange-500"
                                    : "bg-red-500"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                    <p
                      className={`text-xs ${
                        passwordStrength.color === "green"
                          ? "text-green-600 dark:text-green-400"
                          : passwordStrength.color === "yellow"
                            ? "text-yellow-600 dark:text-yellow-400"
                            : passwordStrength.color === "orange"
                              ? "text-orange-600 dark:text-orange-400"
                              : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      Fortaleza: {passwordStrength.score}/5
                    </p>
                    {passwordStrength.feedback.length > 0 && (
                      <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {passwordStrength.feedback.map((feedback, index) => (
                          <li key={index}>• {feedback}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
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

              {/* Mensajes de estado */}
              {(error || success) && (
                <div
                  className={`mt-4 p-3 rounded-lg ${
                    error
                      ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                      : "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ConfiguredIcon
                      name={error ? "alert-circle" : "check-circle"}
                      size={16}
                      className={error ? "text-red-500" : "text-green-500"}
                    />
                    <span className="text-sm font-medium">
                      {error || success}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                <Button
                  onClick={handlePasswordChange}
                  disabled={isChanging}
                  className="w-full sm:w-auto"
                >
                  {isChanging ? "Actualizando..." : "Actualizar contraseña"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswords({ current: "", new: "", confirm: "" });
                    clearMessages();
                  }}
                  disabled={isChanging}
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
                    <ConfiguredIcon
                      name="check-circle"
                      size={16}
                      className="text-green-500"
                    />
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

              {/* Mensajes de estado 2FA */}
              {(twoFactorError || twoFactorSuccess) && (
                <div
                  className={`mt-4 p-3 rounded-lg ${
                    twoFactorError
                      ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                      : "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ConfiguredIcon
                      name={twoFactorError ? "alert-circle" : "check-circle"}
                      size={16}
                      className={
                        twoFactorError ? "text-red-500" : "text-green-500"
                      }
                    />
                    <span className="text-sm font-medium">
                      {twoFactorError || twoFactorSuccess}
                    </span>
                  </div>
                </div>
              )}

              {/* Setup 2FA */}
              {showTwoFactorSetup && setupCode && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-3">
                    Configurar autenticación de dos factores
                  </h4>

                  <div className="space-y-3">
                    {/* Instrucciones */}
                    <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-3">
                      <h5 className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        📱 Pasos para configurar 2FA:
                      </h5>
                      <ol className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                        <li>
                          1. Descarga una aplicación autenticadora (Google
                          Authenticator, Authy, Microsoft Authenticator)
                        </li>
                        <li>
                          2. Escanea el código QR o ingresa manualmente el
                          código de configuración
                        </li>
                        <li>
                          3. Ingresa el código de 6 dígitos que aparece en tu
                          app
                        </li>
                        <li>4. Haz clic en &quot;Verificar y activar&quot;</li>
                      </ol>
                    </div>

                    {/* Código QR */}
                    {qrCodeUrl && (
                      <div className="text-center">
                        <p className="text-xs text-blue-800 dark:text-blue-200 mb-2">
                          Escanea este código QR con tu aplicación
                          autenticadora:
                        </p>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded border inline-block">
                          <Image
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeUrl)}`}
                            alt="Código QR para 2FA"
                            className="w-48 h-48 mx-auto"
                            width={200}
                            height={200}
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="text-xs text-blue-800 dark:text-blue-200 mb-2">
                        Código de configuración (si no puedes escanear el QR):
                      </p>
                      <div className="bg-white dark:bg-gray-800 p-2 rounded border font-mono text-sm">
                        {setupCode}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-blue-800 dark:text-blue-200 mb-2 block">
                        Código de verificación:
                      </label>
                      <Input
                        type="text"
                        value={twoFactorCode}
                        onChange={(e) => setTwoFactorCode(e.target.value)}
                        placeholder="Ingresa el código de 6 dígitos"
                        maxLength={6}
                        className="text-center font-mono"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => enable2FA(twoFactorCode)}
                        disabled={isEnabling || twoFactorCode.length !== 6}
                      >
                        {isEnabling ? "Verificando..." : "Verificar y activar"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setShowTwoFactorSetup(false);
                          setTwoFactorCode("");
                          clearTwoFactorMessages();
                        }}
                        disabled={isEnabling}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-center sm:justify-start">
              <Toggle
                checked={twoFactorEnabled}
                onChange={toggleTwoFactor}
                disabled={twoFactorLoading || isEnabling || isDisabling}
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
