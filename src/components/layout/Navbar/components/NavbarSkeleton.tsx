"use client";

import React from "react";

export const NavbarSkeleton: React.FC = React.memo(() => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-[100] shadow-2xl shadow-purple-500/20">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          {/* Logo skeleton */}
          <div className="flex items-center">
            <div className="w-40 h-10 bg-white/10 rounded-2xl animate-pulse backdrop-blur-sm shadow-lg"></div>
          </div>

          {/* Navigation items skeleton */}
          <div className="hidden md:flex items-center gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-24 h-10 bg-white/10 rounded-2xl animate-pulse backdrop-blur-sm shadow-lg"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>

          {/* User controls skeleton */}
          <div className="flex items-center space-x-3">
            {/* Theme toggle skeleton */}
            <div className="w-10 h-10 bg-white/10 rounded-2xl animate-pulse backdrop-blur-sm shadow-lg"></div>

            {/* User dropdown skeleton */}
            <div className="w-32 h-10 bg-white/10 rounded-2xl animate-pulse backdrop-blur-sm shadow-lg"></div>

            {/* Mobile menu button skeleton */}
            <div className="md:hidden w-10 h-10 bg-white/10 rounded-xl animate-pulse backdrop-blur-sm shadow-lg"></div>
          </div>
        </div>
      </div>

      {/* Additional animated elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
      </div>
    </nav>
  );
});

NavbarSkeleton.displayName = "NavbarSkeleton";
