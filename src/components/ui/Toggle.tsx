// src/components/ui/Toggle.tsx

import React from "react";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = "md",
}) => {
  const sizes = {
    sm: { width: 60, height: 32, scale: 0.8 },
    md: { width: 70, height: 36, scale: 1 },
    lg: { width: 80, height: 40, scale: 1.2 },
  };

  const currentSize = sizes[size];

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <label
      className={`flex items-center ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
      style={{ userSelect: "none" }}
    >
      <div
        onClick={handleClick}
        style={{
          width: currentSize.width,
          height: currentSize.height,
          transform: `scale(${currentSize.scale})`,
          transformOrigin: "left center",
        }}
      >
        <svg
          width={currentSize.width}
          height={currentSize.height}
          viewBox="0 0 70 36"
          style={{
            filter: disabled ? "grayscale(100%)" : "none",
            transition: "all 0.3s ease",
          }}
        >
          {/* Background/Base */}
          <rect
            x="2"
            y="2"
            width="66"
            height="32"
            rx="16"
            fill={checked ? "#f59e0b" : "#6b7280"}
            stroke={checked ? "#d97706" : "#4b5563"}
            strokeWidth="2"
            style={{
              transition: "all 0.3s ease",
              filter: checked
                ? "drop-shadow(0 0 8px rgba(245, 158, 11, 0.4))"
                : "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
            }}
          />

          {/* Inner shadow */}
          <rect
            x="4"
            y="4"
            width="62"
            height="28"
            rx="14"
            fill="none"
            stroke="rgba(0, 0, 0, 0.1)"
            strokeWidth="1"
          />

          {/* OFF Text */}
          <text
            x="20"
            y="22"
            fontSize="8"
            fontWeight="bold"
            fill={checked ? "rgba(255, 255, 255, 0.3)" : "#ffffff"}
            textAnchor="middle"
            style={{
              transition: "all 0.3s ease",
              opacity: checked ? 0.3 : 1,
            }}
          >
            OFF
          </text>

          {/* ON Text */}
          <text
            x="50"
            y="22"
            fontSize="8"
            fontWeight="bold"
            fill={checked ? "#ffffff" : "rgba(255, 255, 255, 0.3)"}
            textAnchor="middle"
            style={{
              transition: "all 0.3s ease",
              opacity: checked ? 1 : 0.3,
              textShadow: checked ? "0 1px 2px rgba(0, 0, 0, 0.5)" : "none",
            }}
          >
            ON
          </text>

          {/* Switch Handle */}
          <circle
            cx={checked ? "52" : "18"}
            cy="18"
            r="12"
            fill="url(#switchGradient)"
            stroke="#e5e7eb"
            strokeWidth="1"
            style={{
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
            }}
          />

          {/* Handle highlight */}
          <circle
            cx={checked ? "52" : "18"}
            cy="18"
            r="8"
            fill="url(#handleHighlight)"
            style={{
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {/* Inner dot */}
          <circle
            cx={checked ? "52" : "18"}
            cy="18"
            r="2"
            fill={checked ? "#f59e0b" : "#9ca3af"}
            style={{
              transition: "all 0.3s ease",
            }}
          />

          {/* Glow effect when ON */}
          {checked && (
            <circle
              cx="52"
              cy="18"
              r="14"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1"
              opacity="0.6"
              style={{
                animation: "pulse 2s infinite",
              }}
            />
          )}

          {/* Gradients */}
          <defs>
            <linearGradient
              id="switchGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f3f4f6" />
              <stop offset="100%" stopColor="#e5e7eb" />
            </linearGradient>

            <radialGradient id="handleHighlight" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </radialGradient>
          </defs>
        </svg>

        {/* CSS Animation */}
        <style jsx>{`
          @keyframes pulse {
            0%,
            100% {
              opacity: 0.6;
              transform: scale(1);
            }
            50% {
              opacity: 0.3;
              transform: scale(1.1);
            }
          }
        `}</style>
      </div>

      {/* Label */}
      {label && (
        <span
          className="ml-3 font-medium text-sm text-gray-700 dark:text-gray-300"
          style={{
            color: checked
              ? "var(--foreground)"
              : "rgba(var(--foreground-rgb, 0, 0, 0), 0.6)",
            transition: "color 0.2s ease",
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
};
