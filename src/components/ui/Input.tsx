// src/components/ui/Input.tsx

import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  variant?: "default" | "modern" | "glass";
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  variant = "modern",
  className = "",
  id,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  const variants = {
    default: {
      container: "relative",
      input: `
        w-full px-4 py-3 rounded-xl border-2 transition-colors duration-200 
        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
        placeholder-gray-400 dark:placeholder-gray-500
        focus:outline-none focus:ring-0
      `,
      label: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block",
      border: isFocused
        ? error
          ? "border-red-500"
          : "border-blue-500"
        : error
        ? "border-red-300 dark:border-red-600"
        : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500",
    },
    modern: {
      container: "relative",
      input: `
        w-full px-4 py-3 rounded-xl border-2 transition-colors duration-200 
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
        focus:outline-none focus:ring-0
      `,
      label:
        "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block",
      border: isFocused
        ? error
          ? "border-red-500"
          : "border-blue-500"
        : error
        ? "border-red-300 dark:border-red-600"
        : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500",
    },
    glass: {
      container: "relative",
      input: `
        w-full px-4 py-3 rounded-xl border transition-colors duration-200 
        bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
        text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
        focus:outline-none focus:ring-0
      `,
      label: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block",
      border: isFocused
        ? error
          ? "border-red-500"
          : "border-blue-500"
        : error
        ? "border-red-300 dark:border-red-600"
        : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500",
    },
  };

  const currentVariant = variants[variant];

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e);
  };

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className={currentVariant.label}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className={currentVariant.container}>
        {/* Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 z-10">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          id={inputId}
          className={`
            ${currentVariant.input}
            ${currentVariant.border}
            ${icon ? "pl-10" : ""}
            ${error ? "pr-10" : ""}
            ${className}
          `}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />

        {/* Error Icon */}
        {error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
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
    </div>
  );
};
