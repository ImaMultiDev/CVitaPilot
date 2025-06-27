"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";
import {
  addCertification,
  deleteCertification,
  toggleCertification,
} from "@/lib/actions/cv-actions";
import { CVEditorIcons } from "@/components/ui/icons/CVEditorIcons";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
  selected: boolean;
}

interface CertificationsSectionProps {
  certifications: Certification[];
  onUpdate: (
    updateFn: () => Promise<{ success: boolean; error?: string }>
  ) => Promise<boolean>;
  isUpdating: boolean;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  onUpdate,
  isUpdating,
}) => {
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    date: "",
    expiryDate: "",
    credentialId: "",
    url: "",
  });

  const handleAddCertification = async () => {
    if (newCertification.name.trim() && newCertification.issuer.trim()) {
      const success = await onUpdate(() =>
        addCertification({
          ...newCertification,
          name: newCertification.name.trim(),
          issuer: newCertification.issuer.trim(),
          date: newCertification.date,
          expiryDate: newCertification.expiryDate || undefined,
          credentialId: newCertification.credentialId.trim() || undefined,
          url: newCertification.url.trim() || undefined,
          selected: true,
        })
      );
      if (success) {
        setNewCertification({
          name: "",
          issuer: "",
          date: "",
          expiryDate: "",
          credentialId: "",
          url: "",
        });
      }
    }
  };

  const handleDeleteCertification = async (certificationId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta certificación?")) {
      await onUpdate(() => deleteCertification(certificationId));
    }
  };

  const handleToggleCertification = async (certificationId: string) => {
    await onUpdate(() => toggleCertification(certificationId));
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Certificaciones
      </h3>

      {/* Añadir nueva certificación */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Añadir nueva certificación
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Nombre de la certificación"
            value={newCertification.name}
            onChange={(e) =>
              setNewCertification((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="Ej: AWS Cloud Practitioner"
            disabled={isUpdating}
          />
          <Input
            label="Organización emisora"
            value={newCertification.issuer}
            onChange={(e) =>
              setNewCertification((prev) => ({
                ...prev,
                issuer: e.target.value,
              }))
            }
            placeholder="Ej: Amazon Web Services"
            disabled={isUpdating}
          />
          <Input
            label="Fecha de obtención"
            type="date"
            value={newCertification.date}
            onChange={(e) =>
              setNewCertification((prev) => ({
                ...prev,
                date: e.target.value,
              }))
            }
            disabled={isUpdating}
          />
          <Input
            label="Fecha de expiración (opcional)"
            type="date"
            value={newCertification.expiryDate}
            onChange={(e) =>
              setNewCertification((prev) => ({
                ...prev,
                expiryDate: e.target.value,
              }))
            }
            disabled={isUpdating}
          />
          <Input
            label="ID del certificado (opcional)"
            value={newCertification.credentialId}
            onChange={(e) =>
              setNewCertification((prev) => ({
                ...prev,
                credentialId: e.target.value,
              }))
            }
            placeholder="Ej: AWS-CP-2024-123456"
            disabled={isUpdating}
          />
          <Input
            label="URL de verificación (opcional)"
            value={newCertification.url}
            onChange={(e) =>
              setNewCertification((prev) => ({
                ...prev,
                url: e.target.value,
              }))
            }
            placeholder="Ej: https://verify.example.com/cert123"
            disabled={isUpdating}
          />
        </div>
        <Button
          onClick={handleAddCertification}
          size="sm"
          className="mt-3"
          disabled={isUpdating}
        >
          <span className="inline-flex items-center gap-2">
            <CVEditorIcons.Add size={16} />
            Añadir certificación
          </span>
        </Button>
      </div>

      {/* Certificaciones existentes */}
      <div className="space-y-3">
        {certifications.map((certification) => (
          <div
            key={certification.id}
            className="border rounded-lg p-4 flex items-start justify-between"
          >
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <CVEditorIcons.Badge size={18} />
                {certification.name}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {certification.issuer}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <CVEditorIcons.Calendar size={14} />
                Obtenida: {certification.date}
                {certification.expiryDate && (
                  <span> • Expira: {certification.expiryDate}</span>
                )}
              </p>
              {certification.credentialId && (
                <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <CVEditorIcons.Id size={12} />
                  ID: {certification.credentialId}
                </p>
              )}
              {certification.url && (
                <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <CVEditorIcons.Link size={12} />
                  <a
                    href={certification.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Verificar certificado
                  </a>
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <Toggle
                checked={certification.selected}
                onChange={() => handleToggleCertification(certification.id)}
                disabled={isUpdating}
              />
              <Button
                onClick={() => handleDeleteCertification(certification.id)}
                size="sm"
                variant="secondary"
                className="text-red-600 hover:text-red-700"
                disabled={isUpdating}
              >
                <CVEditorIcons.Delete size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
