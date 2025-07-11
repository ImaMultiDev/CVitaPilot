"use client";

import { useEffect } from "react";
import { useTutorial } from "@/contexts/TutorialContext";
import { TutorialOverlay } from "./TutorialOverlay";
import { useSession } from "next-auth/react";

interface TutorialStarterProps {
  isNewUser?: boolean;
}

export function TutorialStarter({ isNewUser = false }: TutorialStarterProps) {
  const { startTutorial, state } = useTutorial();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;
    const completedKey = `tutorial-completed-${userId}`;
    const skippedKey = `tutorial-skipped-${userId}`;
    const isTutorialCompleted = localStorage.getItem(completedKey) === "true";
    const isTutorialSkipped = localStorage.getItem(skippedKey) === "true";
    // Solo iniciar el tutorial si:
    // 1. Es un usuario nuevo O
    // 2. No ha completado ni saltado el tutorial
    if (
      (isNewUser || (!isTutorialCompleted && !isTutorialSkipped)) &&
      !state.isActive
    ) {
      // Pequeño delay para asegurar que la página esté completamente cargada
      const timer = setTimeout(() => {
        startTutorial();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isNewUser, startTutorial, state.isActive, userId]);

  return <TutorialOverlay />;
}
