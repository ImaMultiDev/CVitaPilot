"use client";

import React, { memo } from "react";
import { Session } from "next-auth";

export interface UserAvatarProps {
  session: Session;
  size?: "sm" | "lg";
  showStatus?: boolean;
  className?: string;
}

export const UserAvatar = memo<UserAvatarProps>(
  ({ session, size = "sm", showStatus = true, className = "" }) => {
    const sizeClasses = {
      sm: "w-10 h-10 text-base",
      lg: "w-14 h-14 text-xl",
    };

    const statusSizeClasses = {
      sm: "w-4 h-4 -bottom-0.5 -right-0.5",
      lg: "w-5 h-5 -bottom-1 -right-1",
    };

    const userInitial = (session.user?.name || session.user?.email || "U")
      ?.charAt(0)
      .toUpperCase();

    return (
      <div className={`relative ${className}`}>
        <div
          className={`${sizeClasses[size]} rounded-full flex items-center justify-center shadow-xl border-2 border-white/50 transition-transform duration-300 hover:scale-110`}
          style={{
            background:
              "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ea580c 100%)",
          }}
        >
          <span
            className={`font-bold drop-shadow-lg ${
              size === "lg" ? "text-xl" : "text-base"
            }`}
            style={{ color: "#ffffff" }}
          >
            {userInitial}
          </span>
        </div>

        {/* Status indicator */}
        {showStatus && (
          <div
            className={`absolute ${statusSizeClasses[size]} bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse`}
            title="En línea"
          />
        )}
      </div>
    );
  }
);

UserAvatar.displayName = "UserAvatar";
