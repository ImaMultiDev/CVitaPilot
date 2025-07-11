"use client";

import React, { useEffect, useState } from "react";
import { useTutorial, tutorialSteps } from "@/contexts/TutorialContext";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { TutorialCard } from "./TutorialCard";

export function TutorialOverlay() {
  const {
    state,
    currentStep,
    nextStep,
    previousStep,
    completeTutorial,
    skipTutorial,
  } = useTutorial();
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

  // Pasos donde se debe desactivar el blur (0-indexed)
  // Estos pasos presentan páginas específicas donde queremos que el usuario vea claramente el contenido
  // Paso 2 (1): Página principal - mostrar claramente la home
  // Paso 4 (3): Editor de CV - mostrar claramente el editor
  // Paso 8 (7): Mis CVs - mostrar claramente la gestión de CVs
  // Paso 10 (9): Vista previa - mostrar claramente la vista previa
  // Paso 12 (11): Guía de CV - mostrar claramente la guía
  const stepsWithoutBlur = [1, 3, 7, 9, 11]; // Pasos 2, 4, 8, 10, 12 (1-indexed)
  const shouldDisableBlur = stepsWithoutBlur.includes(state.currentStep);

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

  return (
    <>
      {/* Overlay de fondo que bloquea la interfaz (oscuro + blur) */}
      <div
        className={`fixed inset-0 z-[1000] transition-all duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${shouldDisableBlur ? "bg-black/40" : "bg-black/60 backdrop-blur-sm"}`}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Overlay extra para bloquear el navbar (ajusta height si tu navbar es diferente) */}
      <div
        className={`fixed top-0 left-0 right-0 h-20 z-[1100] cursor-not-allowed transition-all duration-300 ${
          shouldDisableBlur
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
        {/* Contenedor responsivo para el modal */}
        <div
          className="flex items-center justify-center p-4 h-full md:items-end md:justify-end md:p-6"
          style={{
            pointerEvents: "auto", // Restaurar eventos de clic solo para el modal
          }}
        >
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
            <TutorialCard className="w-full max-w-md mx-auto shadow-2xl border-0 md:max-w-sm">
              <div className="p-6 md:p-4">
                {/* Barra de progreso */}
                <div className="mb-4 md:mb-3">
                  <div
                    className="flex justify-between text-sm mb-2"
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
                <div className="text-center mb-6 md:mb-4">
                  <h3
                    className="text-xl font-semibold mb-3 md:text-lg md:mb-2"
                    style={{ color: "var(--foreground)" }}
                  >
                    {currentStep.title}
                  </h3>
                  <p
                    className="leading-relaxed md:text-sm"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {currentStep.content}
                  </p>
                </div>

                {/* Botones de navegación */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {!isFirstStep && (
                      <Button
                        variant="ghost"
                        onClick={previousStep}
                        className="text-sm"
                      >
                        Anterior
                      </Button>
                    )}
                    {/* Mostrar Saltar Tutorial solo antes del editor */}
                    {state.currentStep > 2 && (
                      <Button
                        variant="ghost"
                        onClick={skipTutorial}
                        className="text-sm"
                      >
                        Saltar Tutorial
                      </Button>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {isLastStep ? (
                      <Button variant="success" onClick={completeTutorial}>
                        ¡Completar!
                      </Button>
                    ) : isButtonStep ? (
                      <Button variant="primary" onClick={handleButtonAction}>
                        {currentStep.buttonLabel || "Continuar"}
                      </Button>
                    ) : canAdvance ? (
                      <Button variant="primary" onClick={nextStep}>
                        Siguiente
                      </Button>
                    ) : (
                      <span
                        className="text-xs italic px-2"
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
