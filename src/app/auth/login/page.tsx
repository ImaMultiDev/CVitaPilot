"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
        setError("Credenciales inválidas. Verifica tu email y contraseña.");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
          {/* Logo y Título */}
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
              Iniciar Sesión
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Accede a tu generador profesional de CVs
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Información adicional */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p className="mb-2">
                <strong>Demo de CVitaPilot</strong>
              </p>
              <p>Sistema de autenticación mejorado con Auth.js</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
