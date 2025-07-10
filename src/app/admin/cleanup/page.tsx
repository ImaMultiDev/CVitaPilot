"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface CleanupStats {
  unverifiedUsers: number;
  expiredTokens: number;
}

interface CleanupResult {
  success: boolean;
  message?: string;
  deletedUsers?: number;
  deletedTokens?: number;
  error?: string;
}

export default function AdminCleanupPage() {
  const [stats, setStats] = useState<CleanupStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [cleanupResult, setCleanupResult] = useState<CleanupResult | null>(
    null
  );
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/cleanup");
      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
        setLastRefresh(new Date());
      }
    } catch (error) {
      console.error("Error obteniendo estadísticas:", error);
    }
  };

  const runCleanup = async () => {
    setLoading(true);
    setCleanupResult(null);

    try {
      const response = await fetch("/api/admin/cleanup", {
        method: "POST",
      });
      const result = await response.json();

      setCleanupResult(result);

      // Actualizar estadísticas después de la limpieza
      if (result.success) {
        await fetchStats();
      }
    } catch (error) {
      console.error("Error ejecutando limpieza:", error);
      setCleanupResult({
        success: false,
        error: "Error de conexión",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Administración - Limpieza de Usuarios
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona usuarios no verificados y tokens expirados
          </p>
        </div>

        {/* Estadísticas */}
        <Card className="mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Estadísticas Actuales
            </h2>

            {stats ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                      <svg
                        className="w-6 h-6 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        Usuarios no verificados
                      </p>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                        {stats.unverifiedUsers}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 dark:bg-orange-800 rounded-lg">
                      <svg
                        className="w-6 h-6 text-orange-600 dark:text-orange-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                        Tokens expirados
                      </p>
                      <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                        {stats.expiredTokens}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Cargando estadísticas...
                </p>
              </div>
            )}

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Última actualización: {lastRefresh.toLocaleString()}
            </div>
          </div>
        </Card>

        {/* Acciones */}
        <Card className="mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Acciones
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Ejecutar Limpieza
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Elimina usuarios no verificados (más de 24h) y tokens
                    expirados
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button
                    onClick={fetchStats}
                    variant="secondary"
                    disabled={loading}
                  >
                    Actualizar
                  </Button>
                  <Button
                    onClick={runCleanup}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {loading ? "Ejecutando..." : "Ejecutar Limpieza"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Resultado de la limpieza */}
        {cleanupResult && (
          <Card
            className={`mb-6 ${cleanupResult.success ? "border-green-200 dark:border-green-800" : "border-red-200 dark:border-red-800"}`}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Resultado de la Limpieza
              </h2>

              {cleanupResult.success ? (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-400"
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
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800 dark:text-green-300">
                        {cleanupResult.message}
                      </p>
                      {cleanupResult.deletedUsers !== undefined && (
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                          Usuarios eliminados: {cleanupResult.deletedUsers} |
                          Tokens eliminados: {cleanupResult.deletedTokens}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800 dark:text-red-300">
                        Error: {cleanupResult.error}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Información adicional */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Información
            </h2>

            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <strong>Usuarios no verificados:</strong> Usuarios registrados
                hace más de 24 horas que no han verificado su email.
              </p>
              <p>
                <strong>Tokens expirados:</strong> Tokens de verificación que
                han expirado (más de 24 horas).
              </p>
              <p>
                <strong>Limpieza automática:</strong> Se ejecuta automáticamente
                cada 24 horas para mantener la base de datos limpia.
              </p>
              <p>
                <strong>Seguridad:</strong> Solo se eliminan usuarios con
                contraseña (no usuarios OAuth) para evitar pérdida accidental de
                datos.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
