"use client";

import React, { useState, useEffect } from "react";
import { Input } from "./Input";
import { getPasswordStrength } from "@/lib/validations/auth";

interface InputWithValidationProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  label: string;
  error?: string;
  showPasswordStrength?: boolean;
}

export function InputWithValidation({
  id,
  name,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  disabled = false,
  className = "",
  label,
  error,
  showPasswordStrength = false,
}: InputWithValidationProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: [] as string[],
    level: "weak" as "weak" | "medium" | "strong",
  });

  // Actualizar strength de contraseña en tiempo real
  useEffect(() => {
    if (showPasswordStrength && type === "password" && value) {
      setPasswordStrength(getPasswordStrength(value));
    }
  }, [value, showPasswordStrength, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === "password" && showPassword ? "text" : type;
  const hasError = !!error;
  const isValid = !hasError && value.length > 0;

  const getInputBorderColor = () => {
    if (hasError) return "border-red-500 dark:border-red-400";
    if (isValid) return "border-green-500 dark:border-green-400";
    if (isFocused) return "border-blue-500 dark:border-blue-400";
    return "border-gray-300 dark:border-gray-600";
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength.level) {
      case "weak":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "strong":
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getPasswordStrengthWidth = () => {
    return `${(passwordStrength.score / 5) * 100}%`;
  };

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <Input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full pr-10 ${getInputBorderColor()} ${className}`}
        />

        {/* Icono de estado del campo */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          )}

          {type !== "password" && value.length > 0 && (
            <div className="flex items-center">
              {hasError ? (
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : isValid ? (
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* Indicador de fortaleza de contraseña */}
      {showPasswordStrength && type === "password" && value.length > 0 && (
        <div className="mt-2">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Fortaleza:
            </span>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                style={{ width: getPasswordStrengthWidth() }}
              ></div>
            </div>
            <span
              className={`text-sm font-medium ${
                passwordStrength.level === "strong"
                  ? "text-green-600"
                  : passwordStrength.level === "medium"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {passwordStrength.level === "strong"
                ? "Fuerte"
                : passwordStrength.level === "medium"
                ? "Media"
                : "Débil"}
            </span>
          </div>

          {passwordStrength.feedback.length > 0 && (
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              {passwordStrength.feedback.map((feedback, index) => (
                <li key={index} className="flex items-center space-x-1">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>{feedback}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-1 flex items-center space-x-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
