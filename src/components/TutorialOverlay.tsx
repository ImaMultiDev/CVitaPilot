"use client";

import React from "react";
import { useTutorial } from "@/contexts/TutorialContext";
import { TutorialCard } from "./TutorialCard";
import Image from "next/image";

export function TutorialOverlay() {
  const {
    state,
    currentStep,
    nextStep,
    previousStep,
    completeTutorial,
    skipTutorial,
  } = useTutorial();

  if (!state.isActive) return null;

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <TutorialCard>
        <div className="p-6 flex flex-col items-center">
          {currentStep.characterImage && (
            <Image
              src={currentStep.characterImage}
              alt="Personaje tutorial"
              className="w-32 h-32 mb-4"
              width={128}
              height={128}
            />
          )}
          <h2 className="text-xl font-bold mb-2 text-center">
            {currentStep.title}
          </h2>
          <p className="mb-4 text-center">{currentStep.content}</p>
          <div className="flex gap-2 justify-center">
            {state.currentStep > 0 && (
              <button className="btn btn-secondary" onClick={previousStep}>
                Anterior
              </button>
            )}
            {currentStep.action === "next" && (
              <button className="btn btn-primary" onClick={nextStep}>
                Siguiente
              </button>
            )}
            {currentStep.action === "button" && currentStep.buttonLabel && (
              <button className="btn btn-primary" onClick={nextStep}>
                {currentStep.buttonLabel}
              </button>
            )}
            {currentStep.action === "complete" && (
              <button className="btn btn-success" onClick={completeTutorial}>
                Finalizar
              </button>
            )}
            <button className="btn btn-link text-xs" onClick={skipTutorial}>
              Saltar tutorial
            </button>
          </div>
        </div>
      </TutorialCard>
    </div>
  );
}

// Componente para resaltar elementos específicos
export function TutorialHighlight({
  children,
}: {
  elementId: string;
  children: React.ReactNode;
}) {
  // This component is no longer used as TutorialOverlay is disabled
  return <>{children}</>;
}
