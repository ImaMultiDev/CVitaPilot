import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
import type { CVData } from "@/types/cv";

interface PhotoSectionProps {
  cvData: CVData;
  onTogglePhoto: () => void;
}

export const PhotoSection: React.FC<PhotoSectionProps> = ({
  cvData,
  onTogglePhoto,
}) => {
  console.log("PhotoSection renderizando:", cvData, {
    photoEnabled: cvData.photoEnabled,
    personalInfo: cvData.personalInfo,
    photo: cvData.personalInfo.photo,
  });
  const hasPhoto = !!cvData.personalInfo.photo;
  const isEnabled = cvData.photoEnabled;

  return (
    <Card variant="modern" padding="md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
            Foto de Perfil
          </h4>
        </div>
        <Badge
          variant={hasPhoto ? (isEnabled ? "success" : "warning") : "danger"}
          size="sm"
          pill
        >
          {hasPhoto
            ? isEnabled
              ? "Activada"
              : "Desactivada"
            : "No disponible"}
        </Badge>
      </div>

      <div className="space-y-3">
        {/* Estado de la foto */}
        <div className="border-l-3 border-purple-500 pl-3 rounded-r-lg bg-gray-50 dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div className="flex-1 mr-2">
              <h5 className="text-xs font-semibold text-gray-900 dark:text-white">
                {hasPhoto ? "Foto disponible" : "Sin foto subida"}
              </h5>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {hasPhoto
                  ? "Foto de perfil cargada correctamente"
                  : "Sube una foto en la información personal"}
              </p>
            </div>
            <Toggle
              checked={isEnabled}
              onChange={onTogglePhoto}
              disabled={!hasPhoto}
              size="sm"
            />
          </div>
        </div>

        {/* Información sobre formatos */}
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Formato Visual: {isEnabled ? "Visible" : "Oculta"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Formato Europass: {isEnabled ? "Visible" : "Oculta"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <span>Formato ATS: Nunca visible</span>
          </div>
        </div>

        {/* Mensaje de ayuda */}
        {!hasPhoto && (
          <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-md">
            💡 Para activar la foto, primero sube una imagen en la sección de
            información personal
          </div>
        )}
      </div>
    </Card>
  );
};
