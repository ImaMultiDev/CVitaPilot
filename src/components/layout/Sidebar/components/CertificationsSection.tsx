import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
import type { CVData } from "@/types/cv";

interface CertificationsSectionProps {
  cvData: CVData;
  onToggleCertification: (certificationId: string) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  cvData,
  onToggleCertification,
}) => {
  const selectedCount = cvData.certifications.filter(
    (cert) => cert.selected
  ).length;

  return (
    <Card variant="modern" padding="md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500"></div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
            Certificaciones
          </h4>
        </div>
        <Badge variant="info" size="sm" pill>
          {selectedCount}/{cvData.certifications.length}
        </Badge>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
        {cvData.certifications.map((cert) => (
          <div
            key={cert.id}
            className="border-l-3 border-yellow-500 pl-3 p-2 rounded-r-lg bg-gray-50/50 dark:bg-gray-800/50 hover:shadow-sm transition-all duration-200 group/item"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-2">
                <h5 className="text-xs font-semibold text-gray-900 dark:text-white group-hover/item:text-yellow-600 dark:group-hover/item:text-yellow-400 transition-colors">
                  {cert.name}
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {cert.issuer}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {cert.date}
                </p>
              </div>
              <Toggle
                checked={cert.selected}
                onChange={() => onToggleCertification(cert.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
