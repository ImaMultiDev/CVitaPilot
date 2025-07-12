"use client";

import React, { useEffect, useState } from "react";
import { useTutorial, tutorialSteps } from "@/contexts/TutorialContext";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { TutorialCard } from "./TutorialCard";
import Image from "next/image";

export function TutorialOverlay() {
  const { state, currentStep, nextStep, completeTutorial, skipTutorial } =
    useTutorial();
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  // Efecto para mostrar/ocultar el overlay con animación
  useEffect(() => {
    if (state.isActive) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [state.isActive]);

  if (!state.isActive && !isVisible) {
    return null;
  }

  const isFirstStep = state.currentStep === 0;
  const isLastStep = state.currentStep === tutorialSteps.length - 1;
  const progress = ((state.currentStep + 1) / tutorialSteps.length) * 100;
  const isClickStep = currentStep.action === "click";
  const isButtonStep = currentStep.action === "button";
  const canAdvance = !isClickStep || state.stepActionCompleted;

  // Control de blur basado en las propiedades del paso actual
  const shouldDisableNavbarBlur = currentStep.disableNavbarBlur || false;
  const shouldDisableContentBlur = currentStep.disableContentBlur || false;
  const sidebarOutsideBlur = currentStep.sidebarOutsideBlur || false;

  // Posición del overlay basada en el paso actual
  const overlayPosition = currentStep.overlayPosition || "bottom-right";

  // Clases de posición para el overlay
  const getOverlayPositionClasses = () => {
    switch (overlayPosition) {
      case "top-left":
        return "items-start justify-start py-16";
      case "top-right":
        return "items-start justify-end py-16";
      case "bottom-left":
        return "items-end justify-start p-4";
      case "bottom-right":
        return "items-end justify-end p-4";
      case "center":
        return "items-center justify-center p-4";
      case "left":
        return "items-center justify-start p-4";
      case "right":
        return "items-center justify-end p-4";
      default:
        return "items-end justify-end p-4";
    }
  };

  // Acción personalizada para pasos tipo 'button'
  const handleButtonAction = async () => {
    if (currentStep.target) {
      router.push(currentStep.target);
    }
    // Si es acción de sidebar, lanzar evento global (window)
    if (currentStep.sidebarAction === "open") {
      window.dispatchEvent(new CustomEvent("tutorial-open-sidebar"));
    }
    // Avanzar tutorial tras la acción
    setTimeout(() => {
      nextStep();
    }, 300);
  };

  // Función para cancelar el tutorial y redirigir al editor
  const handleCancelTutorial = () => {
    skipTutorial();
    router.push("/editor");
  };

  // Función para completar el tutorial y redirigir a home
  const handleCompleteTutorial = () => {
    completeTutorial();
    router.push("/");
  };

  return (
    <>
      {/* Overlay de fondo que bloquea la interfaz (oscuro + blur) */}
      <div
        className={`fixed inset-0 z-[1000] transition-all duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${shouldDisableContentBlur ? "bg-black/40" : "bg-black/60 backdrop-blur-sm"}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          // Si el sidebar debe estar fuera del blur, excluimos el área del sidebar
          ...(sidebarOutsideBlur && {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            // Excluir el área del sidebar (aproximadamente 256px desde la izquierda)
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 285px, black 285px, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 285px, black 285px, black 100%)",
          }),
        }}
      />

      {/* Overlay extra para bloquear el navbar (ajusta height si tu navbar es diferente) */}
      <div
        className={`fixed top-0 left-0 right-0 h-20 z-[1100] cursor-not-allowed transition-all duration-300 ${
          shouldDisableNavbarBlur
            ? "bg-transparent"
            : "backdrop-blur-xs bg-transparent"
        }`}
        style={{ pointerEvents: "auto" }}
      />

      {/* Modal del tutorial - SEPARADO del overlay para evitar herencia de opacidad */}
      <div
        className={`fixed inset-0 z-[1200] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          pointerEvents: "none", // Permitir que los clics pasen al overlay
        }}
      >
        {/* Contenedor responsivo para el modal con posición dinámica */}
        <div
          className={`flex h-full ${getOverlayPositionClasses()}`}
          style={{
            pointerEvents: "auto", // Restaurar eventos de clic solo para el modal
          }}
        >
          {/* Personaje del tutorial - Fuera del modal */}
          {currentStep.characterImage && (
            <div className="flex items-center z-50 -mr-25">
              <Image
                src={currentStep.characterImage}
                alt="Personaje del tutorial"
                className="w-32 h-32 md:w-80 md:h-80 object-contain drop-shadow-2xl"
                width={320}
                height={320}
              />
            </div>
          )}

          <div
            className={`transition-all duration-500 ${
              isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-4 opacity-0 scale-95"
            }`}
            style={{
              background: "var(--card)",
              backgroundColor: "var(--card)",
              color: "var(--card-foreground)",
              opacity: 1,
              position: "relative",
              isolation: "isolate",
            }}
          >
            <TutorialCard className="w-full max-w-lg mx-auto shadow-2xl border-0 md:max-w-xl">
              <div className="p-8 md:p-6">
                {/* Barra de progreso */}
                <div className="mb-8 md:mb-6">
                  <div
                    className="flex justify-between text-lg mb-2"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    <span>
                      Paso {state.currentStep + 1} de {tutorialSteps.length}
                    </span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div
                    className="w-full rounded-full h-2"
                    style={{ backgroundColor: "var(--secondary)" }}
                  >
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: "var(--primary)",
                      }}
                    />
                  </div>
                </div>

                {/* Contenido del paso */}
                <div className="text-center mb-8 md:mb-6">
                  <h3
                    className="text-xl font-semibold mb-3 md:text-4xl md:mb-2"
                    style={{ color: "var(--foreground)" }}
                  >
                    {currentStep.title}
                  </h3>
                  <p
                    className="leading-relaxed text-lg md:text-xl"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {currentStep.content}
                  </p>
                </div>

                {/* Botones de navegación */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {/* Mostrar Cancelar Tutorial solo en el primer paso */}
                    {isFirstStep && (
                      <Button
                        variant="danger"
                        onClick={handleCancelTutorial}
                        size="lg"
                      >
                        Cancelar
                      </Button>
                    )}
                    {/* Mostrar Saltar Tutorial solo después del paso 2 */}
                    {state.currentStep > 2 && (
                      <Button variant="danger" onClick={skipTutorial} size="lg">
                        Saltar Tutorial
                      </Button>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {isLastStep ? (
                      <Button
                        size="lg"
                        variant="success"
                        onClick={handleCompleteTutorial}
                      >
                        ¡Completar!
                      </Button>
                    ) : isButtonStep ? (
                      <Button
                        size="lg"
                        variant="primary"
                        onClick={handleButtonAction}
                      >
                        {currentStep.buttonLabel || "Continuar"}
                      </Button>
                    ) : canAdvance ? (
                      <Button size="lg" variant="primary" onClick={nextStep}>
                        Siguiente
                      </Button>
                    ) : (
                      <span
                        className="text-lg italic px-2"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        Realiza la acción indicada para continuar
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </TutorialCard>
          </div>
        </div>
      </div>
    </>
  );
}

// Componente para resaltar elementos específicos
export function TutorialHighlight({
  elementId,
  children,
}: {
  elementId: string;
  children: React.ReactNode;
}) {
  const { state, currentStep } = useTutorial();

  const isHighlighted = state.isActive && currentStep.elementId === elementId;

  if (!isHighlighted) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 border-2 border-blue-500 rounded-lg bg-blue-500/10 z-40" />
    </div>
  );
}
