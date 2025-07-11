import React from "react";
import { CVData } from "@/types/cv";
import { CVVisualFormat } from "@/views/CVPreview/components/CVVisualFormat";

interface CVMiniPreviewProps {
  cvData: CVData;
}

export const CVMiniPreview: React.FC<CVMiniPreviewProps> = ({ cvData }) => {
  return (
    <div
      className="relative mx-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-900 overflow-hidden"
      style={{ width: 180, height: 255, minWidth: 180, minHeight: 255 }}
    >
      <div
        style={{
          transform: "scale(0.285)", // 180/630 ≈ 0.285
          transformOrigin: "top left",
          width: "630px", // 210mm * 3
          height: "900px", // 297mm * 3
          pointerEvents: "none",
        }}
      >
        <CVVisualFormat cvData={cvData} />
      </div>
    </div>
  );
};
