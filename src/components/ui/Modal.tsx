"use client";

// src/components/ui/Modal.tsx

import React, { useEffect, useState, useCallback } from "react";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  variant?: "default" | "modern" | "glass" | "gradient" | "solid";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscapeKey?: boolean;
  footer?: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  variant = "modern",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscapeKey = true,
  footer,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClose = useCallback(() => {
    if (!isAnimating) {
      onClose();
    }
  }, [isAnimating, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (closeOnEscapeKey && e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeOnEscapeKey, handleClose]);

  // Handle modal open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      // Reset animation state after animation completes
      setTimeout(() => setIsAnimating(false), 300);
    } else {
      setIsAnimating(true);
      // Hide modal after animation completes
      setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, 300);
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      handleClose();
    }
  };

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full mx-4",
  };

  const variants = {
    default: {
      overlay: "bg-black/50",
      modal: `
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700
        rounded-2xl shadow-2xl
      `,
      header: "border-b border-gray-200 dark:border-gray-700",
      footer: "border-t border-gray-200 dark:border-gray-700",
    },
    solid: {
      overlay: "bg-black/50",
      modal: `
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700
        rounded-2xl shadow-2xl
      `,
      header: "border-b border-gray-200 dark:border-gray-700",
      footer: "border-t border-gray-200 dark:border-gray-700",
    },
    modern: {
      overlay: "bg-black/60 backdrop-blur-sm",
      modal: `
        bg-gradient-to-br from-white to-gray-50/80 
        dark:from-gray-800 dark:to-gray-900/80
        border border-gray-200/50 dark:border-gray-700/50
        rounded-2xl shadow-2xl backdrop-blur-xl
        ring-1 ring-white/10 dark:ring-gray-700/10
      `,
      header: "border-b border-gray-200/50 dark:border-gray-700/50",
      footer: "border-t border-gray-200/50 dark:border-gray-700/50",
    },
    glass: {
      overlay: "bg-black/40 backdrop-blur-md",
      modal: `
        bg-white/10 dark:bg-gray-800/10 
        border border-white/20 dark:border-gray-700/20
        rounded-2xl shadow-2xl backdrop-blur-2xl
        ring-1 ring-white/10 dark:ring-gray-700/10
      `,
      header: "border-b border-white/20 dark:border-gray-700/20",
      footer: "border-t border-white/20 dark:border-gray-700/20",
    },
    gradient: {
      overlay:
        "bg-gradient-to-br from-black/60 via-purple-900/20 to-black/60 backdrop-blur-sm",
      modal: `
        bg-gradient-to-br from-white via-blue-50/50 to-white
        dark:from-gray-800 dark:via-blue-900/20 dark:to-gray-800
        border border-blue-200/50 dark:border-blue-800/50
        rounded-2xl shadow-2xl backdrop-blur-xl
        ring-1 ring-blue-500/10 dark:ring-blue-400/10
      `,
      header: "border-b border-blue-200/50 dark:border-blue-800/50",
      footer: "border-t border-blue-200/50 dark:border-blue-800/50",
    },
  };

  const currentVariant = variants[variant];

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        ${currentVariant.overlay}
        ${isOpen ? "animate-fadeIn" : "animate-fadeOut"}
        transition-all duration-300
      `}
      onClick={handleOverlayClick}
    >
      <div
        className={`
          relative w-full ${sizeClasses[size]}
          ${currentVariant.modal}
          ${isOpen ? "animate-slideUp" : "animate-slideDown"}
          transition-all duration-300 transform-gpu
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient overlay for gradient variant */}
        {variant === "gradient" && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-purple-500/5 to-indigo-600/5 rounded-2xl pointer-events-none"></div>
        )}

        {/* Header */}
        {(title || showCloseButton) && (
          <div
            className={`
            relative z-10 flex items-center justify-between p-6
            ${currentVariant.header}
          `}
          >
            {title && (
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
            )}

            {showCloseButton && (
              <button
                onClick={handleClose}
                className={`
                  p-2 rounded-xl transition-all duration-200
                  text-gray-400 hover:text-gray-600 dark:hover:text-gray-200
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${
                    variant === "glass"
                      ? "hover:bg-white/10 dark:hover:bg-gray-700/10"
                      : ""
                  }
                `}
                disabled={isAnimating}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="transform hover:scale-110 transition-transform duration-200"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className={`
            relative z-10 p-6 flex items-center justify-end space-x-3
            ${currentVariant.footer}
          `}
          >
            {footer}
          </div>
        )}

        {/* Glow effect for modern variant */}
        {variant === "modern" && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/5 via-purple-500/5 to-indigo-600/5 pointer-events-none animate-pulse opacity-50"></div>
        )}

        {/* Shine effect - Skip for solid variant */}
        {variant !== "solid" && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden opacity-20"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
              animation: "shimmer 3s infinite",
            }}
          />
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-fadeOut {
          animation: fadeOut 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-slideDown {
          animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(
            to bottom,
            rgba(99, 102, 241, 0.3),
            rgba(139, 92, 246, 0.3)
          );
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            to bottom,
            rgba(99, 102, 241, 0.5),
            rgba(139, 92, 246, 0.5)
          );
        }
      `}</style>
    </div>
  );
};

// Example usage component
export const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger" | "success";
}> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "default",
}) => {
  const variantColors = {
    default: "primary",
    danger: "danger",
    success: "success",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      variant="modern"
      size="md"
      footer={
        <div className="flex space-x-3">
          <Button variant="secondary" onClick={onClose} size="md">
            {cancelText}
          </Button>
          <Button
            variant={variantColors[variant] as "primary" | "danger" | "success"}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            size="md"
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        {message}
      </p>
    </Modal>
  );
};
