import { useCallback } from "react";

export const usePDFOptimization = () => {
  const applyPDFOptimization = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.add("pdf-compact");

      // Agregar estilos inline críticos para asegurar la aplicación
      const styleSheet = document.createElement("style");
      styleSheet.innerHTML = `
        .pdf-compact * {
          margin: 0 !important;
          line-height: 1.1 !important;
        }
        .pdf-compact {
          font-size: 10px !important;
          line-height: 1.15 !important;
        }
        .pdf-compact h1 { font-size: 20px !important; padding: 8px 0 4px 0 !important; }
        .pdf-compact h2 { font-size: 14px !important; padding: 2px 0 !important; }
        .pdf-compact h3 { font-size: 12px !important; margin-bottom: 3px !important; }
        .pdf-compact h4 { font-size: 10px !important; margin-bottom: 1px !important; }
        .pdf-compact p { margin-bottom: 2px !important; line-height: 1.2 !important; }
        .pdf-compact .text-xs { font-size: 8px !important; line-height: 1.1 !important; }
        .pdf-compact .text-sm { font-size: 9px !important; line-height: 1.15 !important; }
        .pdf-compact .text-4xl { font-size: 20px !important; }
        .pdf-compact .text-xl { font-size: 12px !important; }
        .pdf-compact .text-2xl { font-size: 14px !important; }
        .pdf-compact .py-6 { padding: 6px 0 !important; }
        .pdf-compact .py-4 { padding: 3px 0 !important; }
        .pdf-compact .p-8 { padding: 8px !important; }
        .pdf-compact .p-6 { padding: 6px !important; }
        .pdf-compact .p-4 { padding: 4px !important; }
        .pdf-compact .pl-4 { padding-left: 4px !important; }
        .pdf-compact .mb-8 { margin-bottom: 6px !important; }
        .pdf-compact .mb-6 { margin-bottom: 4px !important; }
        .pdf-compact .mb-4 { margin-bottom: 3px !important; }
        .pdf-compact .mb-3 { margin-bottom: 2px !important; }
        .pdf-compact .mb-2 { margin-bottom: 1px !important; }
        .pdf-compact .mb-1 { margin-bottom: 0.5px !important; }
        .pdf-compact .space-y-4 > * + * { margin-top: 3px !important; }
        .pdf-compact .space-y-3 > * + * { margin-top: 2px !important; }
        .pdf-compact .space-y-2 > * + * { margin-top: 1.5px !important; }
        .pdf-compact .space-y-1 > * + * { margin-top: 1px !important; }
        .pdf-compact .border-l-4 { border-left-width: 2px !important; padding-left: 3px !important; }
        .pdf-compact .border-b-2 { border-bottom-width: 1px !important; padding-bottom: 1px !important; margin-bottom: 2px !important; }
        .pdf-compact .w-1\\/3 { padding: 6px !important; }
        .pdf-compact .w-2\\/3 { padding: 8px !important; }
        .pdf-compact .flex.items-center { margin-bottom: 1px !important; }
        .pdf-compact .flex.justify-between { margin-bottom: 0.5px !important; }
        .pdf-compact .bg-gray-50 { padding: 3px !important; }
        .pdf-compact .rounded-lg { padding: 3px !important; margin-bottom: 2px !important; }
      `;

      document.head.appendChild(styleSheet);
      element.setAttribute("data-pdf-style-id", styleSheet.id);
      return styleSheet;
    }
    return null;
  }, []);

  const removePDFOptimization = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.remove("pdf-compact");

      // Remover estilos inline
      const styleId = element.getAttribute("data-pdf-style-id");
      if (styleId) {
        const styleElement = document.getElementById(styleId);
        if (styleElement) {
          styleElement.remove();
        }
        element.removeAttribute("data-pdf-style-id");
      }
    }
  }, []);

  const withPDFOptimization = useCallback(
    async (elementId: string, exportFunction: () => Promise<void>) => {
      applyPDFOptimization(elementId);

      try {
        // Pequeña pausa para que se apliquen los estilos
        await new Promise((resolve) => setTimeout(resolve, 100));
        await exportFunction();
      } finally {
        // Limpiar optimizaciones
        removePDFOptimization(elementId);
      }
    },
    [applyPDFOptimization, removePDFOptimization]
  );

  return {
    applyPDFOptimization,
    removePDFOptimization,
    withPDFOptimization,
  };
};
