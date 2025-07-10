"use client";

import React, { useEffect, useState, useCallback } from "react";

interface SolidModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscapeKey?: boolean;
  footer?: React.ReactNode;
  className?: string;
}

export const SolidModal: React.FC<SolidModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscapeKey = true,
  footer,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

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

  useEffect(() => {
    setIsVisible(isOpen);
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

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[9999] flex items-center justify-center p-4
      `}
      style={{ background: "rgba(0,0,0,0.90)", zIndex: 9999 }}
      onClick={handleOverlayClick}
    >
      <div
        className={`
          relative w-full ${sizeClasses[size]}
          bg-white dark:bg-gray-900 text-gray-900 dark:text-white
          border-2 border-gray-300 dark:border-gray-700
          rounded-2xl shadow-2xl
          ${className}
        `}
        style={{
          zIndex: 10000,
          boxShadow: "0 10px 40px 0 rgba(0,0,0,0.25)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="relative flex items-center justify-between p-6 border-b-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-2xl">
            {title && (
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={handleClose}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
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
        <div className="relative p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
        {/* Footer */}
        {footer && (
          <div className="p-6 flex items-center justify-end space-x-3 border-t-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #a5b4fc transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a5b4fc;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6366f1;
        }
      `}</style>
    </div>
  );
};
