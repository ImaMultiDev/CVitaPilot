import React from "react";
import { Card } from "@/components/ui/Card";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

export const VideoTutorialSection: React.FC = () => {
  return (
    <section
      id="video-tutorial"
      className="py-16 bg-gradient-to-r from-purple-600 to-blue-600"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <ConfiguredIcon name="film" size={36} />
            Tutorial Completo
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-3xl mx-auto">
            Aprende a crear tu CV perfecto paso a paso con nuestro tutorial
            interactivo
          </p>

          <Card className="max-w-4xl mx-auto overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 border-1 border-white rounded-full mx-auto mb-4 bg-red-600 flex items-center justify-center">
                  <ConfiguredIcon
                    name="play"
                    size={32}
                    className="text-white"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Tutorial de CVitaPilot
                </h3>
                <p className="text-gray-300 mb-4">
                  Video próximamente disponible
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
