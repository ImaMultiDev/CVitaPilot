"use client";

import React from "react";

interface TutorialCardProps {
  children: React.ReactNode;
  className?: string;
}

export const TutorialCard: React.FC<TutorialCardProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`rounded-xl border w-full max-w-md mx-auto z-[1201] ${className}`}
      style={{
        zIndex: 1201,
        background: "var(--card)",
        backgroundColor: "var(--card)",
        color: "var(--card-foreground)",
        borderColor: "var(--border)",
        opacity: 1,
        boxShadow: "0 10px 40px 0 rgba(0,0,0,0.25)",
        position: "relative",
        isolation: "isolate", // Crear un nuevo contexto de apilamiento
        borderRadius: "12px",
      }}
    >
      {children}
    </div>
  );
};
