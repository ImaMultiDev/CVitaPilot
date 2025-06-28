import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { HomeIcons } from "@/components/ui";

interface HeroSectionProps {
  theme: string | undefined;
  statsData: Array<{
    icon: React.ComponentType<{ size?: number; className?: string }>;
    number: string;
    label: string;
    description: string;
  }>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  theme,
  statsData,
}) => {
  const router = useRouter();

  // Función para obtener el logo correcto según el tema
  const getLogoSrc = (size: string = "256x256") => {
    return theme === "dark" ? `/logo_dark_${size}.png` : `/logo_${size}.png`;
  };

  return (
    <div className="text-center lg:w-2/3 mx-auto flex flex-col lg:text-left">
      {/* Logo animado */}
      <div className=" flex justify-center items-center gap-4 mb-4 lg:mb-8 lg:justify-start">
        <div className="flex items-center gap-4 my-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="block lg:hidden fixed top-20 opacity-10 left-0 -z-10">
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
            <div className="hidden lg:block fixed top-20 opacity-10 -left-10 -z-10">
              <Image
                src={getLogoSrc("256x256")}
                alt="CVitaPilot Logo"
                width={320}
                height={320}
                className="rounded-2xl"
                priority
                key={`home-logo-${theme}`}
              />
            </div>
          </div>
        </div>

        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
          CVitaPilot
        </h1>
      </div>

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
            const videoSection = document.getElementById("video-tutorial");
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
  );
};
