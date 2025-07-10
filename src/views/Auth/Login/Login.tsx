"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useTheme } from "@/contexts/ThemeContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showResendVerification, setShowResendVerification] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();

  // Mostrar mensaje de verificación exitosa si viene de la URL
  useEffect(() => {
    const verified = searchParams.get("verified");
    const messageParam = searchParams.get("message");

    if (verified === "true") {
      setMessage("¡Email verificado exitosamente! Ya puedes iniciar sesión.");
    } else if (messageParam) {
      setMessage(decodeURIComponent(messageParam));
    }
  }, [searchParams]);

  // Función para obtener el logo correcto según el tema
  const getLogoSrc = () => {
    return theme === "dark" ? "/logo_dark_128x128.png" : "/logo_128x128.png";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === "EMAIL_NOT_VERIFIED") {
          setError(
            "Tu email no está verificado. Por favor, revisa tu bandeja de entrada y haz clic en el enlace de verificación."
          );
          setShowResendVerification(true);
        } else {
          setError("Credenciales inválidas. Verifica tu email y contraseña.");
        }
      } else if (result?.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Error en login:", error);
      setError("Error interno. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setError("Por favor, introduce tu email primero.");
      return;
    }

    setResendLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage(
          "Email de verificación reenviado. Revisa tu bandeja de entrada."
        );
        setShowResendVerification(false);
      } else {
        setError(result.error || "Error reenviando email de verificación.");
      }
    } catch (error) {
      console.error("Error reenviando verificación:", error);
      setError("Error interno. Inténtalo de nuevo.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
          {/* Logo y Título */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 border-2 border-blue-200 dark:border-gray-600 flex items-center justify-center shadow-lg">
                <Image
                  src={getLogoSrc()}
                  alt="CVitaPilot"
                  width={60}
                  height={60}
                  priority
                  className="rounded-xl"
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Iniciar Sesión
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Accede a tu generador profesional de CVs
            </p>
          </div>

          {/* Google OAuth - Botón mejorado */}
          <div className="mb-6">
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-medium">Continuar con Google</span>
            </button>

            {/* Divisor mejorado */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full mb-4 border-t border-gray-300 dark:border-gray-600"></div>
              </div>
            </div>
          </div>

          {/* Mensaje de éxito */}
          {message && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-6">
              <p className="text-sm text-green-600 dark:text-green-400">
                {message}
              </p>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-10">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cvitapilot.com"
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
                {showResendVerification && (
                  <div className="mt-3 pt-3 border-t border-red-200 dark:border-red-800">
                    <p className="text-xs text-red-500 dark:text-red-400 mb-2">
                      ¿No recibiste el email?
                    </p>
                    <Button
                      type="button"
                      onClick={handleResendVerification}
                      disabled={resendLoading}
                      size="sm"
                      variant="ghost"
                      className="text-xs"
                    >
                      {resendLoading
                        ? "Reenviando..."
                        : "Reenviar email de verificación"}
                    </Button>
                  </div>
                )}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          {/* Link al registro */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿No tienes cuenta?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>

          {/* Información adicional */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p className="mb-2">
                <strong>CVitaPilot</strong>
              </p>
              <p>Tu generador profesional de CVs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
