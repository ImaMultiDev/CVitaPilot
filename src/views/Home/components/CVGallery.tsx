import React from "react";
import { Card } from "@/components/ui/Card";
import { HomeIcons } from "@/components/ui";

export const CVGallery: React.FC = () => {
  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-500">
        {/* CV Preview Cards */}
        <div className="space-y-4">
          <Card className="p-4 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-bold text-lg">CV Moderno</span>
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
                <span className="text-white font-bold">Profesional</span>
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
                <span className="text-white font-bold text-sm">Ejecutivo</span>
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
  );
};
