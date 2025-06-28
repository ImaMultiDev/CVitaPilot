import { useState, useEffect } from "react";

export const useResponsiveCV = () => {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width < 1280) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    // Set initial size
    updateScreenSize();

    // Listen for resize events
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  const getResponsiveStyles = () => {
    const baseStyles = {
      container: "cv-container",
      page: "cv-page",
    };

    switch (screenSize) {
      case "mobile":
        return {
          ...baseStyles,
          transform: "scale(0.75)",
          margin: "0 -3rem !important",
          fontSize: "0.65em !important",
          sidebarPadding: "calc(12mm * 0.65) !important",
          mainPadding: "calc(12mm * 0.65) !important",
        };
      case "tablet":
        return {
          ...baseStyles,
          transform: "scale(0.85)",
          margin: "0 -2rem !important",
          fontSize: "0.7em !important",
          sidebarPadding: "calc(15mm * 0.7) !important",
          mainPadding: "calc(15mm * 0.7) !important",
        };
      default:
        return {
          ...baseStyles,
          transform: screenSize === "desktop" ? "scale(1)" : "scale(0.95)",
          margin: screenSize === "desktop" ? "0" : "0 !important",
          fontSize: screenSize === "desktop" ? "0.85em" : "0.75em",
          sidebarPadding: "calc(20mm * 0.85)",
          mainPadding: "calc(20mm * 0.85)",
        };
    }
  };

  const isMobile = screenSize === "mobile";
  const isTablet = screenSize === "tablet";
  const isDesktop = screenSize === "desktop";

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    getResponsiveStyles,
  };
};
