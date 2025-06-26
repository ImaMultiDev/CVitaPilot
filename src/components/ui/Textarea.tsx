// src/components/ui/Textarea.tsx

import React, { useState, useRef, useEffect } from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  autoResize?: boolean;
  variant?: "default" | "modern" | "glass";
  maxHeight?: number;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  autoResize = true,
  variant = "modern",
  maxHeight = 200,
  className = "",
  id,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [_hasValue, setHasValue] = useState(
    !!props.value || !!props.defaultValue
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

  // Auto-resize functionality
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  }, [props.value, autoResize, maxHeight]);

  const variants = {
    default: {
      container: "relative",
      textarea: `
        w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 resize-none
        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
        placeholder-gray-400 dark:placeholder-gray-500
        focus:outline-none focus:ring-0
      `,
      label: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block",
      border: isFocused
        ? error
          ? "border-red-400 shadow-lg shadow-red-500/25"
          : "border-blue-400 shadow-lg shadow-blue-500/25"
        : error
        ? "border-red-300 dark:border-red-600"
        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500",
    },
    modern: {
      container: "relative group",
      textarea: `
        w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 resize-none
        bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900
        text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
        focus:outline-none focus:ring-0 transform-gpu
      `,
      label:
        "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block",
      border: isFocused
        ? error
          ? "border-red-400 shadow-xl shadow-red-500/30 scale-[1.01]"
          : "border-blue-400 shadow-xl shadow-blue-500/30 scale-[1.01]"
        : error
        ? "border-red-300 dark:border-red-600 shadow-md shadow-red-500/20"
        : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10",
    },
    glass: {
      container: "relative group",
      textarea: `
        w-full px-4 py-3 rounded-xl border transition-all duration-300 resize-none
        bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl
        text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
        focus:outline-none focus:ring-0
      `,
      label: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block",
      border: isFocused
        ? error
          ? "border-red-400/60 shadow-2xl shadow-red-500/20"
          : "border-blue-400/60 shadow-2xl shadow-blue-500/20"
        : error
        ? "border-red-300/40 dark:border-red-600/40"
        : "border-white/20 dark:border-gray-600/20 hover:border-blue-300/40 dark:hover:border-blue-500/40",
    },
  };

  const currentVariant = variants[variant];

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHasValue(!!e.target.value);
    props.onChange?.(e);

    // Trigger auto-resize
    if (autoResize) {
      const textarea = e.target;
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  };

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={textareaId} className={currentVariant.label}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className={currentVariant.container}>
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          id={textareaId}
          className={`
            ${currentVariant.textarea}
            ${currentVariant.border}
            ${error ? "pr-10" : ""}
            ${className}
          `}
          style={{
            minHeight: "80px",
            maxHeight: autoResize ? `${maxHeight}px` : undefined,
            overflowY: autoResize ? "auto" : "scroll",
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />

        {/* Character Count */}
        {props.maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-400 dark:text-gray-500 bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded backdrop-blur-sm">
            {props.value?.toString().length || 0} / {props.maxLength}
          </div>
        )}

        {/* Error Icon */}
        {error && (
          <div className="absolute top-3 right-3 text-red-500">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        {/* Focus Ring */}
        {isFocused && variant === "modern" && (
          <div
            className={`
            absolute inset-0 rounded-xl border-2 pointer-events-none
            ${error ? "border-red-400" : "border-blue-400"}
            animate-pulse opacity-50
          `}
          />
        )}

        {/* Shine Effect */}
        {isFocused && variant !== "glass" && (
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

        {/* Resize Indicator */}
        {autoResize && isFocused && (
          <div className="absolute bottom-1 right-1 w-3 h-3 text-gray-400">
            <svg viewBox="0 0 16 16" fill="currentColor" className="opacity-50">
              <path d="M16 0v16l-16-16h16zm-2 2v12l-12-12h12z" />
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

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};
