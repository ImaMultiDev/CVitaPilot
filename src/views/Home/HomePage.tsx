"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HomeIcons } from "@/components/ui";
import { getSavedCVs, loadCV } from "@/lib/actions/cv-actions";

interface SavedCV {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deliveryCount: number;
}

export const HomePage: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [savedCVs, setSavedCVs] = useState<SavedCV[]>([]);

  // Función para obtener el logo correcto según el tema
  const getLogoSrc = (size: string = "256x256") => {
    return theme === "dark" ? `/logo_dark_${size}.png` : `/logo_${size}.png`;
  };

  // Cargar CVs del usuario
  useEffect(() => {
    const loadUserCVs = async () => {
      try {
        const cvs = await getSavedCVs();
        setSavedCVs(cvs);
      } catch (error) {
        console.error("Error loading user CVs:", error);
      }
    };
    loadUserCVs();
  }, []);

  const handleLoadCV = async (cvId: string) => {
    try {
      await loadCV(cvId);
      router.push("/editor");
    } catch (error) {
      console.error("Error loading CV:", error);
    }
  };

  const statsData = [
    {
      icon: HomeIcons.Rocket,
      number: "98%",
      label: "Tasa de aprobación ATS",
      description: "CVs optimizados para sistemas automatizados",
    },
    {
      icon: HomeIcons.Lightning,
      number: "<2min",
      label: "Tiempo de creación",
      description: "Crea tu CV profesional en menos de 2 minutos",
    },
    {
      icon: HomeIcons.Target,
      number: "15+",
      label: "Secciones personalizables",
      description: "Adapta tu CV a cualquier industria",
    },
    {
      icon: HomeIcons.Chart,
      number: "100%",
      label: "Responsive design",
      description: "Perfecto en cualquier dispositivo",
    },
  ];

  const features = [
    {
      icon: HomeIcons.Robot,
      title: "Optimización ATS",
      description: "Tu CV será leído por sistemas automatizados sin problemas",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: HomeIcons.Paintbrush,
      title: "Diseño Profesional",
      description: "Plantillas modernas que destacan tu perfil profesional",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: HomeIcons.Smartphone,
      title: "Multi-dispositivo",
      description: "Edita desde cualquier lugar, en cualquier momento",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: HomeIcons.Refresh,
      title: "Versionado Inteligente",
      description: "Guarda múltiples versiones para diferentes puestos",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              background: `
                radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)
              `,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Logo animado */}
              <div className="mb-8 flex justify-center lg:justify-start">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={getLogoSrc("256x256")}
                      alt="CVitaPilot Logo"
                      width={120}
                      height={120}
                      className="rounded-2xl"
                      priority
                      key={`home-logo-${theme}`}
                    />
                  </div>
                </div>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  CVitaPilot
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                <span className="font-semibold text-gray-900 dark:text-white">
                  Crea CVs profesionales
                </span>{" "}
                que superen los filtros ATS y destaquen ante los reclutadores.
              </p>

              {/* Quick Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button
                  onClick={() => router.push("/editor")}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <HomeIcons.Rocket size={20} />
                    Crear CV Ahora
                  </span>
                </Button>

                <Button
                  onClick={() => {
                    const videoSection =
                      document.getElementById("video-tutorial");
                    videoSection?.scrollIntoView({ behavior: "smooth" });
                  }}
                  variant="secondary"
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-gray-700 dark:text-gray-300 text-lg px-8 py-4 rounded-2xl hover:bg-white/30 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <HomeIcons.Play size={20} />
                    Ver Tutorial
                  </span>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div
                      key={index}
                      className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex justify-center mb-2">
                        <IconComponent
                          size={28}
                          className="text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors"
                        />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Content - CV Gallery */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                {/* CV Preview Cards */}
                <div className="space-y-4">
                  <Card className="p-4 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          CV Moderno
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mb-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white font-bold">
                          Profesional
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                    </div>
                  </Card>
                </div>

                <div className="space-y-4 mt-8">
                  <Card className="p-4 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="h-28 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white font-bold">Creativo</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg mb-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          Ejecutivo
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-3/5"></div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 animate-bounce">
                <div className="bg-yellow-400 text-yellow-900 rounded-full p-3 shadow-lg">
                  <HomeIcons.Sparkles size={16} />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 animate-pulse">
                <div className="bg-green-400 text-green-900 rounded-full p-3 shadow-lg">
                  <HomeIcons.CheckCircle size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User CVs Section */}
      {savedCVs.length > 0 && (
        <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                <HomeIcons.Folder
                  size={36}
                  className="text-blue-600 dark:text-blue-400"
                />
                Tus CVs
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Gestiona y edita tus curriculums guardados
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Botón para crear nuevo CV */}
              <div
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50 backdrop-blur-sm shadow-lg shadow-gray-900/5 dark:shadow-black/20"
                onClick={() => router.push("/editor")}
              >
                <div className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl text-white">+</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Crear Nuevo CV
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Comienza desde cero
                  </p>
                </div>
              </div>

              {/* CVs existentes */}
              {savedCVs.slice(0, 7).map((cv) => (
                <div
                  key={cv.id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm shadow-lg shadow-gray-900/5 dark:shadow-black/20 overflow-hidden"
                  onClick={() => handleLoadCV(cv.id)}
                >
                  <div className="p-6">
                    {/* CV Preview */}
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg mb-4 relative overflow-hidden group-hover:shadow-lg transition-shadow duration-300">
                      <div className="p-3 space-y-2">
                        <div className="h-2 bg-gray-400 dark:bg-gray-500 rounded w-3/4"></div>
                        <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                        <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                        <div className="mt-3 space-y-1">
                          <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
                          <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-3/5"></div>
                        </div>
                      </div>

                      {/* Overlay con info */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm">
                          Editar CV
                        </span>
                      </div>

                      {/* Badge de CV activo */}
                      {cv.isActive && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="success" className="text-xs">
                            ACTIVO
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* CV Info */}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                        {cv.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(cv.updatedAt).toLocaleDateString()}
                      </p>
                      {cv.deliveryCount > 0 && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                          <HomeIcons.Document size={12} />
                          {cv.deliveryCount} entregas
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Ver todos los CVs */}
              {savedCVs.length > 7 && (
                <div
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50 backdrop-blur-sm shadow-lg shadow-gray-900/5 dark:shadow-black/20"
                  onClick={() => router.push("/saved-cvs")}
                >
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <HomeIcons.Folder size={24} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Ver Todos
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {savedCVs.length - 7} CVs más
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
              <HomeIcons.Sparkles
                size={36}
                className="text-purple-600 dark:text-purple-400"
              />
              Características Destacadas
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              CVitaPilot está diseñado para ayudarte a crear CVs que realmente
              funcionen en el mercado laboral actual
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                >
                  <div className="p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <IconComponent size={28} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Tutorial Section */}
      <section
        id="video-tutorial"
        className="py-16 bg-gradient-to-r from-purple-600 to-blue-600"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <HomeIcons.Play size={36} />
              Tutorial Completo
            </h2>
            <p className="text-lg text-purple-100 mb-8 max-w-3xl mx-auto">
              Aprende a crear tu CV perfecto paso a paso con nuestro tutorial
              interactivo
            </p>

            <Card className="max-w-4xl mx-auto overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
                    <HomeIcons.Play size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Tutorial de CVitaPilot
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Video próximamente disponible
                  </p>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    🔔 Notificarme cuando esté listo
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ATS Information Section */}
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
                Los <strong>Applicant Tracking Systems (ATS)</strong> son
                sistemas automatizados que las empresas usan para filtrar CVs
                antes de que lleguen a recursos humanos.
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

      {/* Quick Actions Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <HomeIcons.Rocket size={36} />
              ¿Listo para destacar?
            </h2>
            <p className="text-lg text-indigo-100">
              Únete a miles de profesionales que ya están consiguiendo el
              trabajo de sus sueños
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Crea tu CV",
                description:
                  "Completa la información de forma sencilla e intuitiva",
                icon: HomeIcons.Pen,
                action: () => router.push("/editor"),
              },
              {
                step: "2",
                title: "Descarga PDF",
                description: "Obtén tu CV optimizado listo para enviar",
                icon: HomeIcons.Document,
                action: () => router.push("/preview"),
              },
              {
                step: "3",
                title: "Consigue el trabajo",
                description:
                  "Destaca entre otros candidatos con tu CV profesional",
                icon: HomeIcons.Bullseye,
                action: () => router.push("/guia-cv"),
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden"
                  onClick={item.action}
                >
                  <div className="p-8 text-center text-white">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={28} className="text-white" />
                    </div>
                    <div className="w-8 h-8 mx-auto mb-4 bg-yellow-400 text-yellow-900 rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-indigo-100 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => router.push("/editor")}
              className="bg-white text-purple-600 hover:bg-gray-100 text-xl px-12 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <HomeIcons.Rocket size={24} />
              Empezar Ahora - Es Gratis
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
