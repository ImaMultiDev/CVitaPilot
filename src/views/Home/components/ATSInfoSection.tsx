import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HomeIcons } from "@/components/ui";

export const ATSInfoSection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <HomeIcons.Robot
                size={36}
                className="text-blue-600 dark:text-blue-400"
              />
              ¿Qué son los ATS?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Los <strong>Applicant Tracking Systems (ATS)</strong> son sistemas
              automatizados que las empresas usan para filtrar CVs antes de que
              lleguen a recursos humanos.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                  ✗
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    75% de CVs son rechazados
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Por no estar optimizados para ATS
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    CVitaPilot garantiza compatibilidad
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Estructura y formato optimizado automáticamente
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/guia-cv">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                  <HomeIcons.BookOpen size={20} />
                  Guía Completa ATS
                </Button>
              </Link>
              <Button
                variant="secondary"
                onClick={() => router.push("/editor")}
                className="flex items-center gap-2"
              >
                <HomeIcons.Rocket size={20} />
                Probar Ahora
              </Button>
            </div>
          </div>

          <div className="relative">
            <Card className="p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center">
                  <HomeIcons.Bullseye size={48} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Optimización Automática
                </h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <HomeIcons.CheckCircle
                      size={20}
                      className="text-green-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Palabras clave relevantes
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <HomeIcons.CheckCircle
                      size={20}
                      className="text-green-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Formato estándar
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <HomeIcons.CheckCircle
                      size={20}
                      className="text-green-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Estructura legible
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <HomeIcons.CheckCircle
                      size={20}
                      className="text-green-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Secciones organizadas
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 animate-bounce delay-300">
              <Badge variant="success" className="shadow-lg">
                98% ATS Compatible
              </Badge>
            </div>
            <div className="absolute -bottom-4 -left-4 animate-pulse">
              <Badge variant="info" className="shadow-lg">
                AI Optimized
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
