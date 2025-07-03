import React, { useState } from "react";
import { OtherInformation } from "@/types/cv";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";

interface OtherInformationSectionProps {
  otherInformation: OtherInformation[];
  onChange: (otherInformation: OtherInformation[]) => void;
}

export const OtherInformationSection: React.FC<
  OtherInformationSectionProps
> = ({ otherInformation, onChange }) => {
  const [newItemName, setNewItemName] = useState("");
  const [newItemIcon, setNewItemIcon] = useState("");

  const addOtherInformation = () => {
    if (newItemName.trim()) {
      const newItem: OtherInformation = {
        id: crypto.randomUUID(),
        name: newItemName.trim(),
        icon: newItemIcon.trim() || undefined,
        selected: true,
      };
      onChange([...otherInformation, newItem]);
      setNewItemName("");
      setNewItemIcon("");
    }
  };

  const removeOtherInformation = (id: string) => {
    onChange(otherInformation.filter((item) => item.id !== id));
  };

  const toggleOtherInformation = (id: string) => {
    onChange(
      otherInformation.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const updateOtherInformation = (
    id: string,
    field: keyof OtherInformation,
    value: string
  ) => {
    onChange(
      otherInformation.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addOtherInformation();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Otra Información
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {otherInformation.filter((item) => item.selected).length} elementos
          activos
        </span>
      </div>

      {/* Formulario para añadir nueva información */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Añadir Nueva Información
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Ej: Carnet de conducir, Vehículo propio, Disponibilidad inmediata..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div>
            <Input
              placeholder="Icono (emoji)"
              value={newItemIcon}
              onChange={(e) => setNewItemIcon(e.target.value)}
              onKeyPress={handleKeyPress}
              maxLength={2}
            />
          </div>
        </div>
        <Button
          onClick={addOtherInformation}
          disabled={!newItemName.trim()}
          className="w-full"
        >
          Añadir Información
        </Button>
      </div>

      {/* Lista de información existente */}
      {otherInformation.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Información Añadida
          </h3>
          {otherInformation.map((item) => (
            <div
              key={item.id}
              className={`p-4 border rounded-lg ${
                item.selected
                  ? "border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20"
                  : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Input
                      value={item.name}
                      onChange={(e) =>
                        updateOtherInformation(item.id, "name", e.target.value)
                      }
                      placeholder="Nombre de la información"
                    />
                  </div>
                  <div>
                    <Input
                      value={item.icon || ""}
                      onChange={(e) =>
                        updateOtherInformation(item.id, "icon", e.target.value)
                      }
                      placeholder="Icono"
                      maxLength={2}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Toggle
                    checked={item.selected}
                    onChange={() => toggleOtherInformation(item.id)}
                  />
                  <Button
                    onClick={() => removeOtherInformation(item.id)}
                    variant="danger"
                    size="sm"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {otherInformation.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No has añadido ninguna información adicional.</p>
          <p className="text-sm">
            Puedes añadir elementos como carnet de conducir, vehículo propio,
            etc.
          </p>
        </div>
      )}
    </div>
  );
};
