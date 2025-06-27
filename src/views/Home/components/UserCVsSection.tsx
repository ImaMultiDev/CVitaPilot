import React from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { HomeIcons } from "@/components/ui";

interface SavedCV {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deliveryCount: number;
}

interface UserCVsSectionProps {
  savedCVs: SavedCV[];
  onLoadCV: (cvId: string) => Promise<void>;
}

export const UserCVsSection: React.FC<UserCVsSectionProps> = ({
  savedCVs,
  onLoadCV,
}) => {
  const router = useRouter();

  if (savedCVs.length === 0) {
    return null;
  }

  return (
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
              onClick={async () => {
                try {
                  await onLoadCV(cv.id);
                  router.push("/editor");
                } catch (error) {
                  console.error("Error loading CV:", error);
                }
              }}
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
  );
};
