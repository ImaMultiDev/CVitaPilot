"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { InputWithValidation } from "@/components/ui/InputWithValidation";
import { registerUser } from "@/lib/actions/auth-actions";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { useFormValidation } from "@/hooks/useFormValidation";

export default function RegisterPage() {
  const router = useRouter();

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
      const result = await registerUser(formData);

      if (result.success) {
        setSuccess(true);
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          router.push(
            "/auth/login?message=Registro exitoso. Ya puedes iniciar sesión."
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
              Tu cuenta ha sido creada con éxito. Redirigiendo al login...
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
              <div className="border-3 border-gray-900 dark:border-gray-100 rounded-xl p-2 dark:bg-blue-200">
                <Image
                  src="/logo_192X64.png"
                  alt="CVitaPilot"
                  width={120}
                  height={40}
                  priority
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

          {/* Formulario */}
          <form onSubmit={handleFormSubmit} className="space-y-6">
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
