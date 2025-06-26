// src/components/ui/Badge.tsx

import React, { useState } from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "gradient"
    | "modern";
  size?: "sm" | "md" | "lg";
  pill?: boolean;
  interactive?: boolean;
  pulse?: boolean;
  glow?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "modern",
  size = "md",
  pill = false,
  interactive = false,
  pulse = false,
  glow = false,
  className = "",
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const variants = {
    default: {
      base: `
        bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200
        border border-gray-200 dark:border-gray-700
      `,
      hover: "hover:bg-gray-200 dark:hover:bg-gray-700",
      glow: "shadow-md shadow-gray-500/20",
    },
    primary: {
      base: `
        bg-gradient-to-r from-blue-500 to-blue-600 text-white
        border border-blue-600/20
      `,
      hover: "hover:from-blue-600 hover:to-blue-700 hover:scale-105",
      glow: "shadow-lg shadow-blue-500/40",
    },
    secondary: {
      base: `
        bg-gradient-to-r from-gray-500 to-gray-600 text-white
        border border-gray-600/20
      `,
      hover: "hover:from-gray-600 hover:to-gray-700 hover:scale-105",
      glow: "shadow-lg shadow-gray-500/40",
    },
    success: {
      base: `
        bg-gradient-to-r from-green-500 to-emerald-600 text-white
        border border-green-600/20
      `,
      hover: "hover:from-green-600 hover:to-emerald-700 hover:scale-105",
      glow: "shadow-lg shadow-green-500/40",
    },
    warning: {
      base: `
        bg-gradient-to-r from-yellow-500 to-orange-500 text-white
        border border-yellow-600/20
      `,
      hover: "hover:from-yellow-600 hover:to-orange-600 hover:scale-105",
      glow: "shadow-lg shadow-yellow-500/40",
    },
    danger: {
      base: `
        bg-gradient-to-r from-red-500 to-red-600 text-white
        border border-red-600/20
      `,
      hover: "hover:from-red-600 hover:to-red-700 hover:scale-105",
      glow: "shadow-lg shadow-red-500/40",
    },
    info: {
      base: `
        bg-gradient-to-r from-blue-400 to-cyan-500 text-white
        border border-blue-500/20
      `,
      hover: "hover:from-blue-500 hover:to-cyan-600 hover:scale-105",
      glow: "shadow-lg shadow-blue-400/40",
    },
    gradient: {
      base: `
        bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white
        border border-purple-500/20 relative overflow-hidden
      `,
      hover:
        "hover:from-purple-600 hover:via-pink-600 hover:to-red-600 hover:scale-105",
      glow: "shadow-xl shadow-purple-500/40",
    },
    modern: {
      base: `
        bg-gradient-to-r from-indigo-500/90 to-purple-600/90 text-white
        border border-indigo-500/20 backdrop-blur-sm relative overflow-hidden
      `,
      hover:
        "hover:from-indigo-600/90 hover:to-purple-700/90 hover:scale-105 hover:shadow-lg",
      glow: "shadow-xl shadow-indigo-500/30",
    },
  };

  const currentVariant = variants[variant];

  const baseClasses = `
    inline-flex items-center justify-center font-medium
    transition-all duration-300 transform-gpu
    ${pill ? "rounded-full" : "rounded-lg"}
    ${sizeClasses[size]}
    ${currentVariant.base}
    ${interactive || onClick ? `cursor-pointer ${currentVariant.hover}` : ""}
    ${glow ? currentVariant.glow : ""}
    ${pulse ? "animate-pulse" : ""}
    ${className}
  `;

  const Component = onClick ? "button" : "span";

  return (
    <Component
      className={baseClasses}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...(onClick && { type: "button" })}
    >
      {/* Gradient overlay for gradient variants */}
      {(variant === "gradient" || variant === "modern") && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 rounded-full pointer-events-none"></div>
      )}

      {/* Shine effect on hover */}
      {(interactive || onClick) && isHovered && (
        <div
          className={`
            absolute inset-0 ${pill ? "rounded-full" : "rounded-lg"} 
            pointer-events-none overflow-hidden
          `}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
            animation: "shimmer 0.8s ease-out",
          }}
        />
      )}

      {/* Pulse ring for modern variant */}
      {variant === "modern" && pulse && (
        <div
          className={`
          absolute inset-0 ${pill ? "rounded-full" : "rounded-lg"}
          border-2 border-indigo-400 animate-ping opacity-30
        `}
          style={{ animation: "ping 2s infinite" }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center space-x-1">
        {children}
      </span>

      {/* Glow effect for modern variant */}
      {variant === "modern" && glow && isHovered && (
        <div
          className={`
          absolute inset-0 ${pill ? "rounded-full" : "rounded-lg"} 
          bg-gradient-to-r from-indigo-500/20 to-purple-600/20 
          blur-sm animate-pulse
        `}
        />
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%,
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </Component>
  );
};
