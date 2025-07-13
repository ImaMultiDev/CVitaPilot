import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CreateCVModal } from "@/components/ui";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";
import { useTutorial } from "@/contexts/TutorialContext";

export const QuickActionsSection: React.FC = () => {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { resetTutorial, startTutorial } = useTutorial();

  const steps = [
    {
      step: "1",
      title: "Crea tu CV",
      description: "Completa la información de forma sencilla e intuitiva",
      icon: "book-user",
      action: () => setIsCreateModalOpen(true),
    },
    {
      step: "2",
      title: "Descarga PDF",
      description: "Obtén tu CV optimizado listo para enviar",
      icon: "download",
      action: () => router.push("/preview"),
    },
    {
      step: "3",
      title: "Consigue el trabajo",
      description: "Destaca entre otros candidatos con tu CV profesional",
      icon: "award",
      action: () => router.push("/guia-cv"),
    },
  ];

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <ConfiguredIcon name="gem" size={36} />
              ¿Listo para destacar?
            </h2>
            <p className="text-lg text-indigo-100">
              Únete a miles de profesionales que ya están consiguiendo el
              trabajo de sus sueños
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, index) => {
              return (
                <div
                  key={index}
                  className="group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden"
                  onClick={item.action}
                >
                  <div className="p-8 text-center text-white">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <ConfiguredIcon
                        name={item.icon}
                        size={42}
                        className="text-white"
                      />
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

          <div className="text-center mt-12 space-y-4">
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-white text-purple-600 hover:bg-gray-100 text-xl px-12 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              Empezar Ahora - Es Gratis
            </Button>

            <div className="flex justify-center">
              <Button
                onClick={() => {
                  resetTutorial();
                  startTutorial();
                }}
                variant="ghost"
                className="text-white/80 hover:text-white text-sm underline"
              >
                ¿Nuevo aquí? Ver tutorial
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal para crear nuevo CV */}
      <CreateCVModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};
