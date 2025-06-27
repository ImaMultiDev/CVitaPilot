import React from "react";

export const SidebarCustomScrollbar: React.FC = () => {
  return (
    <style jsx>{`
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
      }

      .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
      }

      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }

      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(
          to bottom,
          rgba(99, 102, 241, 0.3),
          rgba(139, 92, 246, 0.3)
        );
        border-radius: 2px;
      }

      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(
          to bottom,
          rgba(99, 102, 241, 0.5),
          rgba(139, 92, 246, 0.5)
        );
      }

      .border-l-3 {
        border-left-width: 3px;
      }
    `}</style>
  );
};
