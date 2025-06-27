"use client";

import React from "react";
import {
  GuideHeader,
  TableOfContents,
  CVStructureSection,
  ATSSection,
  CoverLetterSection,
  AdvancedTipsSection,
  FinalChecklistSection,
} from "./components";

export const CVGuidePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <GuideHeader />

        {/* Tabla de Contenidos */}
        <TableOfContents />

        {/* Sección 1: Estructura del CV */}
        <CVStructureSection />

        {/* Sección 2: ATS */}
        <ATSSection />

        {/* Sección 3: Carta de Presentación */}
        <CoverLetterSection />

        {/* Sección 4: Consejos Avanzados */}
        <AdvancedTipsSection />

        {/* Sección Final: Checklist */}
        <FinalChecklistSection />
      </div>
    </div>
  );
};
