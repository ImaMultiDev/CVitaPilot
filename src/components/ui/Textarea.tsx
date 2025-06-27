// src/components/ui/Textarea.tsx

import React, { useRef, useEffect } from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  autoResize?: boolean;
  maxHeight?: number;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  autoResize = true,
  maxHeight = 200,
  className = "",
  id,
  ...props
}) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <textarea
          ref={textareaRef}
          id={textareaId}
          className={`
            w-full px-3 py-2 md:px-4 md:py-3
            text-sm md:text-base
            border border-gray-300 dark:border-gray-600 rounded-lg
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed
            resize-none transition-colors duration-200
            ${error ? "border-red-500 focus:ring-red-500" : ""}
            ${className}
          `}
          style={{
            minHeight: "80px",
            maxHeight: autoResize ? `${maxHeight}px` : undefined,
            overflowY: autoResize ? "auto" : "scroll",
          }}
          onChange={handleChange}
          {...props}
        />

        {/* Character Count */}
        {props.maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-400 dark:text-gray-500 bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded">
            {props.value?.toString().length || 0} / {props.maxLength}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
};
