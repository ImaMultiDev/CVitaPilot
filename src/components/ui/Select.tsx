// src/components/ui/Select.tsx

import React, { useState, useRef, useEffect } from "react";

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string;
  error?: string;
  options: { value: string; label: string; icon?: React.ReactNode }[];
  variant?: "default" | "modern" | "glass";
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  variant = "modern",
  placeholder = "Seleccionar...",
  className = "",
  id,
  onChange,
  value,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find((opt) => opt.value === value) || null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update selected option when value prop changes
  useEffect(() => {
    const option = options.find((opt) => opt.value === value);
    setSelectedOption(option || null);
  }, [value, options]);

  const variants = {
    default: {
      container: "relative",
      button: `
        w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 
        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
        focus:outline-none focus:ring-0 cursor-pointer
        flex items-center justify-between
      `,
      dropdown: `
        absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 
        border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-xl z-50
        max-h-60 overflow-y-auto
      `,
      option:
        "px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 flex items-center space-x-2",
      label: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block",
      border:
        isOpen || isFocused
          ? error
            ? "border-red-400 shadow-lg shadow-red-500/25"
            : "border-blue-400 shadow-lg shadow-blue-500/25"
          : error
          ? "border-red-300 dark:border-red-600"
          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500",
    },
    modern: {
      container: "relative group",
      button: `
        w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 
        bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
        text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-0 cursor-pointer
        flex items-center justify-between transform-gpu
      `,
      dropdown: `
        absolute top-full left-0 right-0 mt-2 
        bg-white dark:bg-gray-800
        border-2 border-blue-200 dark:border-blue-800 rounded-xl 
        shadow-2xl shadow-blue-500/20 z-[60] max-h-60 overflow-y-auto
      `,
      option: `
        px-4 py-3 cursor-pointer transition-all duration-200 flex items-center space-x-2
        hover:bg-blue-50 dark:hover:bg-blue-900/30
        hover:shadow-sm mx-1 my-0.5 rounded-lg
      `,
      label:
        "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block",
      border:
        isOpen || isFocused
          ? error
            ? "border-red-400 shadow-xl shadow-red-500/30"
            : "border-blue-400 shadow-xl shadow-blue-500/30"
          : error
          ? "border-red-300 dark:border-red-600 shadow-md shadow-red-500/20"
          : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10",
    },
    glass: {
      container: "relative group",
      button: `
        w-full px-4 py-3 rounded-xl border transition-all duration-300 
        bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl
        text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-0 cursor-pointer
        flex items-center justify-between
      `,
      dropdown: `
        absolute top-full left-0 right-0 mt-2 
        bg-white/10 dark:bg-gray-800/10 backdrop-blur-2xl
        border border-white/20 dark:border-gray-600/20 rounded-xl 
        shadow-2xl z-50 max-h-60 overflow-y-auto
      `,
      option:
        "px-4 py-3 hover:bg-white/20 dark:hover:bg-gray-700/20 cursor-pointer transition-colors duration-200 flex items-center space-x-2",
      label: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block",
      border:
        isOpen || isFocused
          ? error
            ? "border-red-400/60 shadow-2xl shadow-red-500/20"
            : "border-blue-400/60 shadow-2xl shadow-blue-500/20"
          : error
          ? "border-red-300/40 dark:border-red-600/40"
          : "border-white/20 dark:border-gray-600/20 hover:border-blue-300/40 dark:hover:border-blue-500/40",
    },
  };

  const currentVariant = variants[variant];

  const handleSelect = (option: {
    value: string;
    label: string;
    icon?: React.ReactNode;
  }) => {
    setSelectedOption(option);
    setIsOpen(false);
    setIsFocused(false);
    onChange?.(option.value);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsFocused(!isOpen);
  };

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={selectId} className={currentVariant.label}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div ref={containerRef} className={currentVariant.container}>
        {/* Select Button */}
        <button
          type="button"
          id={selectId}
          className={`
            ${currentVariant.button}
            ${currentVariant.border}
            ${error ? "pr-12" : "pr-10"}
            ${className}
          `}
          onClick={toggleDropdown}
          onFocus={() => setIsFocused(true)}
        >
          <div className="flex items-center space-x-2 flex-1 text-left">
            {selectedOption?.icon && (
              <span className="text-gray-500">{selectedOption.icon}</span>
            )}
            <span
              className={
                selectedOption ? "" : "text-gray-400 dark:text-gray-500"
              }
            >
              {selectedOption?.label || placeholder}
            </span>
          </div>

          {/* Dropdown Arrow */}
          <div
            className={`
            text-gray-400 dark:text-gray-500 transition-transform duration-300
            ${isOpen ? "rotate-180" : "rotate-0"}
          `}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>

        {/* Error Icon */}
        {error && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-red-500">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className={`${currentVariant.dropdown} dropdown-solid`}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              marginTop: "8px",
              backgroundColor: "white",
              border: "2px solid rgb(147, 197, 253)",
              borderRadius: "12px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              zIndex: 9999,
              maxHeight: "240px",
              overflowY: "auto",
            }}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className="px-4 py-3 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                onClick={() => handleSelect(option)}
                style={{
                  color: "rgb(17, 24, 39)",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {option.icon && (
                  <span className="text-gray-500 mr-2">{option.icon}</span>
                )}
                <span>{option.label}</span>
                {selectedOption?.value === option.value && (
                  <span className="ml-auto text-blue-500">✓</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Shine Effect */}
        {(isOpen || isFocused) && variant !== "glass" && (
          <div
            className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
            style={{
              background: `linear-gradient(90deg, transparent, ${
                error ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)"
              }, transparent)`,
              animation: "shimmer 2s infinite",
            }}
          />
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-1 mt-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">
            {error}
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateX(-10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
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

        /* Asegurar fondo sólido para dropdown */
        .dropdown-solid {
          background-color: white !important;
          border: 2px solid rgb(147, 197, 253) !important;
        }

        .dark .dropdown-solid {
          background-color: rgb(31, 41, 55) !important;
          border: 2px solid rgb(59, 130, 246) !important;
        }

        /* Asegurar visibilidad de opciones */
        .dropdown-solid > div {
          color: rgb(17, 24, 39) !important;
        }

        .dark .dropdown-solid > div {
          color: rgb(243, 244, 246) !important;
        }

        .dropdown-solid > div:hover {
          background-color: rgb(239, 246, 255) !important;
          color: rgb(17, 24, 39) !important;
        }

        .dark .dropdown-solid > div:hover {
          background-color: rgba(59, 130, 246, 0.3) !important;
          color: rgb(243, 244, 246) !important;
        }
      `}</style>
    </div>
  );
};
