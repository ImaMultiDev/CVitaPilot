"use client";

import React from "react";
import { ThemeToggle } from "@/components/ui";

interface ThemeToggleWrapperProps {
  className?: string;
}

export const ThemeToggleWrapper: React.FC<ThemeToggleWrapperProps> = React.memo(
  ({ className = "" }) => {
    return (
      <div className={`${className}`}>
        <ThemeToggle />
      </div>
    );
  }
);

ThemeToggleWrapper.displayName = "ThemeToggleWrapper";
