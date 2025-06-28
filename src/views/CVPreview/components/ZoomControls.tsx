"use client";

import React from "react";
import { ZoomInIcon, ZoomOutIcon, ZoomResetIcon } from "./CVPreviewIcons";

interface ZoomControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  minZoom?: number;
  maxZoom?: number;
  initialZoom?: number; // Nuevo prop para el zoom inicial dinámico
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  minZoom = 0.25, // Mucho más pequeño para asegurar que quepa
  maxZoom = 1.5, // Más conservador para evitar problemas
  initialZoom = 1.0, // Valor por defecto para desktop
}) => {
  const isZoomInDisabled = zoomLevel >= maxZoom;
  const isZoomOutDisabled = zoomLevel <= minZoom;
  const isResetDisabled = Math.abs(zoomLevel - initialZoom) < 0.01;

  const formatZoomPercentage = (zoom: number) => `${Math.round(zoom * 100)}%`;

  return (
    <div className="space-y-3">
      {/* Indicador de zoom actual */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <ZoomResetIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-blue-900 dark:text-blue-100">
            {formatZoomPercentage(zoomLevel)}
          </span>
        </div>
      </div>

      {/* Controles de zoom */}
      <div className="grid grid-cols-3 gap-2">
        {/* Zoom Out */}
        <button
          onClick={onZoomOut}
          disabled={isZoomOutDisabled}
          className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all duration-200 ${
            isZoomOutDisabled
              ? "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
              : "border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:scale-105 active:scale-95"
          }`}
          title={`Alejar (Min: ${formatZoomPercentage(minZoom)})`}
        >
          <ZoomOutIcon className="w-5 h-5" />
          <span className="text-xs font-medium">Alejar</span>
        </button>

        {/* Reset Zoom */}
        <button
          onClick={onZoomReset}
          disabled={isResetDisabled}
          className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all duration-200 ${
            isResetDisabled
              ? "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
              : "border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 hover:scale-105 active:scale-95"
          }`}
          title={`Restablecer zoom al ${Math.round(initialZoom * 100)}%`}
        >
          <ZoomResetIcon className="w-5 h-5" />
          <span className="text-xs font-medium">
            {Math.round(initialZoom * 100)}%
          </span>
        </button>

        {/* Zoom In */}
        <button
          onClick={onZoomIn}
          disabled={isZoomInDisabled}
          className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all duration-200 ${
            isZoomInDisabled
              ? "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
              : "border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:scale-105 active:scale-95"
          }`}
          title={`Acercar (Max: ${formatZoomPercentage(maxZoom)})`}
        >
          <ZoomInIcon className="w-5 h-5" />
          <span className="text-xs font-medium">Acercar</span>
        </button>
      </div>

      {/* Información adicional */}
      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">
          🔍 Controles de Zoom
        </h4>
        <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex justify-between">
            <span>Rango disponible:</span>
            <span className="font-mono">
              {formatZoomPercentage(minZoom)} - {formatZoomPercentage(maxZoom)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Teclas rápidas:</span>
            <span className="font-mono">Ctrl + / Ctrl -</span>
          </div>
        </div>
      </div>
    </div>
  );
};
