import React from "react";

export const ResponsiveStyles: React.FC = () => {
  return (
    <style jsx>{`
      /* Escalado proporcional simple del formato DIN A4 */

      /* Desktop - Tamaño original A4 */
      @media (min-width: 1024px) {
        .cv-container {
          transform: scale(1);
          transform-origin: top center;
        }
      }

      /* Tablet - Escalado 80% */
      @media (max-width: 1023px) and (min-width: 769px) {
        .cv-container {
          transform: scale(0.8);
          transform-origin: top center;
        }
      }

      /* Mobile - Escalado 60% */
      @media (max-width: 768px) {
        .cv-container {
          transform: scale(0.6);
          transform-origin: top center;
        }
      }

      /* Mobile pequeño - Escalado 50% */
      @media (max-width: 480px) {
        .cv-container {
          transform: scale(0.5);
          transform-origin: top center;
        }
      }

      /* Estilos para tema oscuro - CV siempre en blanco */
      :global(.dark) .cv-container {
        background: white !important;
      }

      :global(.dark) .cv-container * {
        color-scheme: light !important;
      }
    `}</style>
  );
};
