"use client";

import { useEffect } from "react";
import { useTutorial } from "@/contexts/TutorialContext";
import { TutorialOverlay } from "./TutorialOverlay";
import { useSession } from "next-auth/react";

interface TutorialStarterProps {
  isNewUser?: boolean;
  autoStart?: boolean; // Nueva prop para controlar el inicio automático
}

export function TutorialStarter({
  isNewUser = false,
  autoStart = false,
}: TutorialStarterProps) {
  const { startTutorial, state } = useTutorial();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Restaurar: iniciar automáticamente si es un usuario nuevo o autoStart
  useEffect(() => {
    if (
      (isNewUser || autoStart) &&
      !state.isActive &&
      !state.isCompleted &&
      !state.isSkipped
    ) {
      startTutorial();
    }
  }, [
    isNewUser,
    startTutorial,
    state.isActive,
    state.isCompleted,
    state.isSkipped,
    userId,
    autoStart,
  ]);

  return <TutorialOverlay />;
}
