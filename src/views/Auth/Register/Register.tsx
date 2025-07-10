"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { InputWithValidation } from "@/components/ui/InputWithValidation";
import { registerUserWithEmailVerification } from "@/lib/actions/auth-actions";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useTheme } from "@/contexts/ThemeContext";

export default function Register() {
  const router = useRouter();
  const { theme } = useTheme();

  // Función para obtener el logo correcto según el tema
  const getLogoSrc = () => {
    return theme === "dark" ? "/logo_dark_128x128.png" : "/logo_128x128.png";
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    validateField,
  } = useFormValidation<RegisterFormData>({
    schema: registerSchema,
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [success, setSuccess] = useState(false);
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>(
    {}
  );

  const onSubmit = async (formData: RegisterFormData) => {
    setServerErrors({});

    try {
      const result = await registerUserWithEmailVerification(formData);

      if (result.success) {
        setSuccess(true);
        // Mostrar mensaje de verificación de email
        setTimeout(() => {
          router.push(
            "/auth/login?message=Registro exitoso. Por favor, verifica tu email para activar tu cuenta."
          );
        }, 2000);
      } else if (result.errors) {
        setServerErrors(result.errors);
      }
    } catch (error) {
      console.error("Error en registro:", error);
      setServerErrors({ general: ["Error interno. Inténtalo de nuevo."] });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(onSubmit);
  };

  // Combinar errores del cliente y del servidor
  const getFieldError = (field: string) => {
    return (
      errors[field] || (serverErrors[field] && serverErrors[field][0]) || ""
    );
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              ¡Registro Exitoso!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Tu cuenta ha sido creada. Te hemos enviado un email de
              verificación.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Por favor, revisa tu bandeja de entrada y haz clic en el enlace de
              verificación para activar tu cuenta.
            </p>
            <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

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
              Crear Cuenta
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Únete a CVitaPilot y crea tu CV profesional
            </p>
          </div>

          {/* Google OAuth - Botón mejorado */}
          <div className="mb-6">
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              disabled={isSubmitting}
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

          {/* Formulario */}
          <form onSubmit={handleFormSubmit} className="space-y-6 mt-10">
            <InputWithValidation
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => validateField("name")}
              placeholder="Ej: Juan Pérez"
              required
              disabled={isSubmitting}
              label="Nombre completo"
              error={getFieldError("name")}
            />

            <InputWithValidation
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => validateField("email")}
              placeholder="tu@email.com"
              required
              disabled={isSubmitting}
              label="Email"
              error={getFieldError("email")}
            />

            <InputWithValidation
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={() => validateField("password")}
              placeholder="••••••••"
              required
              disabled={isSubmitting}
              label="Contraseña"
              error={getFieldError("password")}
              showPasswordStrength={true}
            />

            <InputWithValidation
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              onBlur={() => validateField("confirmPassword")}
              placeholder="••••••••"
              required
              disabled={isSubmitting}
              label="Confirmar contraseña"
              error={getFieldError("confirmPassword")}
            />

            {serverErrors.general && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {serverErrors.general[0]}
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>
          </form>

          {/* Link al login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿Ya tienes cuenta?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
              >
                Inicia sesión aquí
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
