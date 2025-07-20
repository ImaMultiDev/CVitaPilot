"use client";

// src/components/ui/Select.tsx

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string;
  error?: string;
  options: { value: string; label: string; icon?: React.ReactNode }[];
  variant?: "default" | "modern" | "glass";
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
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
  disabled = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find((opt) => opt.value === value) || null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectId =
    id || `select-${label?.toLowerCase().replace(/\s+/g, "-") || "unnamed"}`;
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  // Detectar tema oscuro
  useEffect(() => {
    const checkDarkMode = () => {
      const isDarkMode =
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(isDarkMode);
    };

    checkDarkMode();

    // Observer para cambios en la clase dark
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // No cerrar si el click es en el contenedor del select o en el dropdown
      if (
        containerRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }

      setIsOpen(false);
      setIsFocused(false);
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
      container: `relative ${isOpen ? "z-50" : "z-10"}`,
      button: `
        w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border transition-colors duration-200 
        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
        focus:outline-none cursor-pointer
        flex items-center justify-between
        text-sm md:text-base
      `,
      dropdown: `
        absolute top-full left-0 right-0 mt-1 
        bg-gray-50 dark:bg-gray-900
        border border-gray-200 dark:border-gray-600 rounded-lg 
        shadow-2xl z-[9999] max-h-60 overflow-y-auto
        isolation-isolate
      `,
      option:
        "px-3 py-2 md:px-4 md:py-3 hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200 flex items-center space-x-2",
      label: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block",
      border:
        isOpen || isFocused
          ? error
            ? "border-red-500 focus:ring-2 focus:ring-red-500"
            : "border-blue-500 focus:ring-2 focus:ring-blue-500"
          : error
            ? "border-red-300 dark:border-red-600"
            : "border-gray-300 dark:border-gray-600",
    },
    modern: {
      container: `relative ${isOpen ? "z-50" : "z-10"}`,
      button: `
        w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border transition-colors duration-200 
        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
        focus:outline-none cursor-pointer
        flex items-center justify-between
        text-sm md:text-base
      `,
      dropdown: `
        absolute top-full left-0 right-0 mt-1 
        bg-gray-50 dark:bg-gray-900
        border border-gray-200 dark:border-gray-600 rounded-lg 
        shadow-2xl z-[9999] max-h-60 overflow-y-auto
        isolation-isolate
      `,
      option: `
        px-3 py-2 md:px-4 md:py-3 cursor-pointer transition-colors duration-200 flex items-center space-x-2
        hover:bg-white dark:hover:bg-gray-800
      `,
      label:
        "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block",
      border:
        isOpen || isFocused
          ? error
            ? "border-red-500 focus:ring-2 focus:ring-red-500"
            : "border-blue-500 focus:ring-2 focus:ring-blue-500"
          : error
            ? "border-red-300 dark:border-red-600"
            : "border-gray-300 dark:border-gray-600",
    },
    glass: {
      container: `relative ${isOpen ? "z-50" : "z-10"}`,
      button: `
        w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border transition-colors duration-200 
        bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm
        text-gray-900 dark:text-gray-100 focus:outline-none cursor-pointer
        flex items-center justify-between
        text-sm md:text-base
      `,
      dropdown: `
        absolute top-full left-0 right-0 mt-1 
        bg-gray-50 dark:bg-gray-900
        border border-gray-200 dark:border-gray-600 rounded-lg 
        shadow-2xl z-[9999] max-h-60 overflow-y-auto
        isolation-isolate
      `,
      option:
        "px-3 py-2 md:px-4 md:py-3 hover:bg-white/30 dark:hover:bg-gray-800/30 cursor-pointer transition-colors duration-200 flex items-center space-x-2",
      label: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block",
      border:
        isOpen || isFocused
          ? error
            ? "border-red-400/60"
            : "border-blue-400/60"
          : error
            ? "border-red-300/40 dark:border-red-600/40"
            : "border-white/20 dark:border-gray-600/20",
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

  // Calcular la posición del dropdown al abrir
  const openDropdown = () => {
    if (containerRef.current) {
      const button = containerRef.current.querySelector("button");
      if (button) {
        const rect = button.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    }
    setIsOpen(true);
    setIsFocused(true);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setIsFocused(false);
  };

  // Modificar toggleDropdown para usar openDropdown
  const toggleDropdown = () => {
    if (disabled) return;

    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
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
            ${error ? "pr-10" : "pr-8"}
            ${className}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
          onClick={toggleDropdown}
          onFocus={() => setIsFocused(true)}
          disabled={disabled}
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
            text-gray-400 dark:text-gray-500 transition-transform duration-200
            ${isOpen ? "rotate-180" : "rotate-0"}
          `}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
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
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-red-500">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        {/* Dropdown Menu en portal */}
        {isOpen &&
          ReactDOM.createPortal(
            <div
              ref={dropdownRef}
              className={currentVariant.dropdown + " bg-white dark:bg-gray-900"}
              style={{
                position: "absolute",
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
                zIndex: 9999,
                backgroundColor: isDark ? "#111827" : "#fff",
              }}
            >
              {options.map((option, _idx) => (
                <div
                  key={option.value}
                  className={currentVariant.option}
                  onClick={() => handleSelect(option)}
                >
                  {option.icon && <span className="mr-2">{option.icon}</span>}
                  {option.label}
                </div>
              ))}
            </div>,
            document.body
          )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center space-x-1 mt-1">
          <svg
            width="14"
            height="14"
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
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
};
