// src/components/ui/Button.tsx

import React, { useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  loading = false,
  icon,
  iconPosition = "left",
  disabled,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const variants = {
    primary: {
      base: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)",
      shadow: "0 4px 14px 0 rgba(59, 130, 246, 0.3)",
      hoverShadow: "0 6px 20px 0 rgba(59, 130, 246, 0.4)",
      text: "#ffffff",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    secondary: {
      base: "linear-gradient(135deg, #9ca3af 0%, #6b7280 50%, #4b5563 100%)",
      shadow: "0 4px 14px 0 rgba(107, 114, 128, 0.25)",
      hoverShadow: "0 6px 20px 0 rgba(107, 114, 128, 0.35)",
      text: "#ffffff",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    danger: {
      base: "linear-gradient(135deg, #f87171 0%, #ef4444 50%, #dc2626 100%)",
      shadow: "0 4px 14px 0 rgba(239, 68, 68, 0.3)",
      hoverShadow: "0 6px 20px 0 rgba(239, 68, 68, 0.4)",
      text: "#ffffff",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    success: {
      base: "linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)",
      shadow: "0 4px 14px 0 rgba(16, 185, 129, 0.3)",
      hoverShadow: "0 6px 20px 0 rgba(16, 185, 129, 0.4)",
      text: "#ffffff",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    ghost: {
      base: "rgba(255, 255, 255, 0.05)",
      shadow: "0 2px 8px 0 rgba(0, 0, 0, 0.1)",
      hoverShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.15)",
      text: "#374151",
      border: "1px solid rgba(156, 163, 175, 0.3)",
    },
  };

  const sizes = {
    sm: {
      padding: "8px 16px",
      fontSize: "14px",
      borderRadius: "8px",
      minHeight: "32px",
    },
    md: {
      padding: "10px 20px",
      fontSize: "14px",
      borderRadius: "10px",
      minHeight: "40px",
    },
    lg: {
      padding: "12px 24px",
      fontSize: "16px",
      borderRadius: "12px",
      minHeight: "48px",
    },
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];
  const isDisabled = disabled || loading;

  const buttonStyle = {
    background: currentVariant.base,
    color: currentVariant.text,
    border: currentVariant.border,
    borderRadius: currentSize.borderRadius,
    padding: currentSize.padding,
    fontSize: currentSize.fontSize,
    minHeight: currentSize.minHeight,
    fontWeight: "600",
    cursor: isDisabled ? "not-allowed" : "pointer",
    outline: "none",
    position: "relative" as const,
    overflow: "hidden" as const,
    transform: isPressed
      ? "translateY(1px) scale(0.98)"
      : "translateY(0) scale(1)",
    boxShadow: isPressed
      ? "0 2px 8px 0 rgba(0, 0, 0, 0.15)"
      : isHovered
      ? currentVariant.hoverShadow
      : currentVariant.shadow,
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: isDisabled ? 0.6 : 1,
    filter: isDisabled ? "grayscale(100%)" : "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    userSelect: "none" as const,
    ...(isHovered &&
      !isDisabled && {
        transform: "translateY(-1px) scale(1.02)",
        filter: "brightness(1.1)",
      }),
  };

  const LoadingSpinner = () => (
    <div
      style={{
        width: "16px",
        height: "16px",
        border: `2px solid ${currentVariant.text}`,
        borderTop: "2px solid transparent",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
  );

  return (
    <>
      <button
        className={className}
        style={buttonStyle}
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => {
          if (!isDisabled) {
            setIsHovered(false);
            setIsPressed(false);
          }
        }}
        onMouseDown={() => !isDisabled && setIsPressed(true)}
        onMouseUp={() => !isDisabled && setIsPressed(false)}
        disabled={isDisabled}
        {...props}
      >
        {/* Shine overlay effect */}
        {isHovered && !isDisabled && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
              animation: "shine 0.6s ease-out",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Content */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            opacity: loading ? 0 : 1,
            transition: "opacity 0.2s ease",
          }}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {icon && iconPosition === "left" && (
                <span style={{ display: "flex", alignItems: "center" }}>
                  {icon}
                </span>
              )}

              <span>{children}</span>

              {icon && iconPosition === "right" && (
                <span style={{ display: "flex", alignItems: "center" }}>
                  {icon}
                </span>
              )}
            </>
          )}
        </div>
      </button>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </>
  );
};
