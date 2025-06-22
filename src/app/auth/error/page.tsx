"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "CredentialsSignin":
        return "Credenciales inválidas. Verifica tu email y contraseña.";
      case "AccessDenied":
        return "Acceso denegado. No tienes permisos para acceder.";
      case "Configuration":
        return "Error de configuración del servidor. Contacta al administrador.";
      case "Verification":
        return "Error de verificación. El enlace puede haber expirado.";
      case "Default":
      default:
        return "Error de autenticación. Inténtalo de nuevo.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="border-3 border-gray-900 dark:border-gray-100 rounded-xl p-2 dark:bg-blue-200">
                <Image
                  src="/logo_192x64.png"
                  alt="CVitaPilot"
                  width={120}
                  height={40}
                  priority
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Error de Autenticación
            </h1>
          </div>

          {/* Error Message */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
                  {getErrorMessage(error)}
                </h3>
                {error && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    Código de error: {error}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="space-y-3">
            <Link href="/auth/login" className="block">
              <Button className="w-full" size="lg">
                Volver al Login
              </Button>
            </Link>

            <Link href="/" className="block">
              <Button variant="secondary" className="w-full" size="lg">
                Ir al Inicio
              </Button>
            </Link>
          </div>

          {/* Información de contacto */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>¿Necesitas ayuda? Contacta al administrador del sistema.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
          </div>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
