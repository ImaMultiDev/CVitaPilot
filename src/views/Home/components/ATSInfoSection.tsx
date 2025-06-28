import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HomeIcons } from "@/components/ui";
import Image from "next/image";

export const ATSInfoSection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <Card className="w-full lg:w-4/6">
            <h2 className="text-3xl lg:text-4xl opacity-90 font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
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
                  Guía Completa ATS
                </Button>
              </Link>
              <Button
                variant="secondary"
                onClick={() => router.push("/editor")}
                className="flex items-center gap-2"
              >
                Probar Ahora
              </Button>
            </div>
          </Card>

          <div className="relative mx-auto">
            <Image
              src="/characters/atscharacter.png"
              alt="ATS animated Character"
              width={300}
              height={300}
              className="rounded-2xl"
            />

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
