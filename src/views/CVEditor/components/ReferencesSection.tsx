"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";
import {
  addReference,
  deleteReference,
  toggleReference,
} from "@/lib/actions/cv-actions";

interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  relationship: string;
  phone?: string;
  email?: string;
  yearsWorking?: string;
  selected: boolean;
}

interface ReferencesSectionProps {
  references: Reference[];
  onUpdate: (
    updateFn: () => Promise<{ success: boolean; error?: string }>
  ) => Promise<boolean>;
  isUpdating: boolean;
}

export const ReferencesSection: React.FC<ReferencesSectionProps> = ({
  references,
  onUpdate,
  isUpdating,
}) => {
  const [newReference, setNewReference] = useState({
    name: "",
    position: "",
    company: "",
    relationship: "",
    phone: "",
    email: "",
    yearsWorking: "",
    selected: true,
  });

  const handleAddReference = async () => {
    if (newReference.name && newReference.position && newReference.company) {
      const success = await onUpdate(() => addReference(newReference));
      if (success) {
        setNewReference({
          name: "",
          position: "",
          company: "",
          relationship: "",
          phone: "",
          email: "",
          yearsWorking: "",
          selected: true,
        });
      }
    }
  };

  const handleDeleteReference = async (referenceId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta referencia?")) {
      await onUpdate(() => deleteReference(referenceId));
    }
  };

  const handleToggleReference = async (referenceId: string) => {
    await onUpdate(() => toggleReference(referenceId));
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Referencias Profesionales
      </h3>

      {/* Añadir nueva referencia */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Añadir nueva referencia
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Nombre completo"
            value={newReference.name}
            onChange={(e) =>
              setNewReference((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder="Ej: Ana García López"
            disabled={isUpdating}
          />
          <Input
            label="Cargo/Posición"
            value={newReference.position}
            onChange={(e) =>
              setNewReference((prev) => ({
                ...prev,
                position: e.target.value,
              }))
            }
            placeholder="Ej: Directora de Tecnología"
            disabled={isUpdating}
          />
          <Input
            label="Empresa"
            value={newReference.company}
            onChange={(e) =>
              setNewReference((prev) => ({
                ...prev,
                company: e.target.value,
              }))
            }
            placeholder="Ej: ERRIBERRI S.L."
            disabled={isUpdating}
          />
          <Input
            label="Relación profesional"
            value={newReference.relationship}
            onChange={(e) =>
              setNewReference((prev) => ({
                ...prev,
                relationship: e.target.value,
              }))
            }
            placeholder="Ej: Supervisor directo, Compañero de equipo"
            disabled={isUpdating}
          />
          <Input
            label="Teléfono"
            value={newReference.phone}
            onChange={(e) =>
              setNewReference((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            placeholder="Ej: +34 600 123 456"
            disabled={isUpdating}
          />
          <Input
            label="Email"
            value={newReference.email}
            onChange={(e) =>
              setNewReference((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            placeholder="Ej: ana.garcia@empresa.com"
            disabled={isUpdating}
          />
          <Input
            label="Años trabajando juntos"
            value={newReference.yearsWorking}
            onChange={(e) =>
              setNewReference((prev) => ({
                ...prev,
                yearsWorking: e.target.value,
              }))
            }
            placeholder="Ej: 2 años, 6 meses"
            disabled={isUpdating}
          />
        </div>
        <Button
          onClick={handleAddReference}
          size="sm"
          className="mt-3"
          disabled={isUpdating}
        >
          <span className="inline-flex items-center gap-2">
            <ConfiguredIcon name="plus" size={16} />
            Añadir referencia
          </span>
        </Button>
      </div>

      {/* Referencias existentes */}
      <div className="space-y-3 md:space-y-4">
        {references.map((reference) => (
          <div
            key={reference.id}
            className="border rounded-lg p-4 md:p-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-0"
          >
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                {reference.name}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {reference.position} en {reference.company}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {reference.relationship}
              </p>
              <div className="flex flex-col flex-wrap gap-1 text-xs text-gray-500 dark:text-gray-400">
                {reference.phone && (
                  <span className="flex items-center gap-1">
                    <ConfiguredIcon name="phone" size={12} />
                    {reference.phone}
                  </span>
                )}
                {reference.email && (
                  <span className="flex items-center gap-1">
                    <ConfiguredIcon name="mail" size={12} />
                    {reference.email}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end md:justify-center space-x-3 md:space-x-2 md:ml-4 flex-shrink-0">
              <Toggle
                checked={reference.selected}
                onChange={() => handleToggleReference(reference.id)}
                disabled={isUpdating}
              />
              <Button
                onClick={() => handleDeleteReference(reference.id)}
                size="sm"
                variant="secondary"
                className="text-red-600 hover:text-red-700"
                disabled={isUpdating}
              >
                <ConfiguredIcon name="trash" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
