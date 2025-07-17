"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { getSavedCVs, loadCV } from "@/lib/actions/cv-actions";
import {
  HeroSection,
  UserCVsSection,
  FeaturesSection,
  VideoTutorialSection,
  ATSInfoSection,
  QuickActionsSection,
} from "./components";

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
  const [savedCVs, setSavedCVs] = useState<SavedCV[]>([]);

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
      // Redirigir se maneja en los componentes individuales
    } catch (error) {
      console.error("Error loading CV:", error);
    }
  };

  // Datos de estadísticas
  const statsData = [
    {
      icon: "badge-check",
      number: "98%",
      label: "Tasa de aprobación ATS",
      description: "CVs optimizados para sistemas automatizados",
    },
    {
      icon: "lightning",
      number: "<2min",
      label: "Tiempo de creación",
      description: "Crea tu CV profesional en menos de 2 minutos",
    },
    {
      icon: "layout-panel-left",
      number: "15+",
      label: "Secciones personalizables",
      description: "Adapta tu CV a cualquier industria",
    },
    {
      icon: "responsive",
      number: "100%",
      label: "Responsive design",
      description: "Perfecto en cualquier dispositivo",
    },
  ];

  // Datos de características
  const features = [
    {
      icon: "bookmark-check",
      title: "Optimización ATS",
      description: "Tu CV será leído por sistemas automatizados sin problemas",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "figma",
      title: "Diseño Profesional",
      description: "Plantillas modernas que destacan tu perfil profesional",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "responsive",
      title: "Multi-dispositivo",
      description: "Edita desde cualquier lugar, en cualquier momento",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: "files",
      title: "Versionado Inteligente",
      description: "Guarda múltiples versiones para diferentes puestos",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      {/* Hero Section con Logo, Título, Botones, Stats y CV Gallery */}
      <section className="relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div
            className="absolute inset-0 animate-pulse pointer-events-none"
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
          <div className="flex items-center justify-center">
            <HeroSection theme={theme} statsData={statsData} />
          </div>
        </div>
      </section>

      {/* User CVs Section - Solo se muestra si hay CVs */}
      <UserCVsSection savedCVs={savedCVs} onLoadCV={handleLoadCV} />

      {/* Features Section */}
      <FeaturesSection features={features} />

      {/* Video Tutorial Section */}
      <VideoTutorialSection />

      {/* ATS Information Section */}
      <ATSInfoSection />

      {/* Quick Actions Section */}
      <QuickActionsSection />
    </div>
  );
};
