import React, { useState } from "react";
import { OtherInformation } from "@/types/cv";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";

interface OtherInformationSectionProps {
  otherInformation: OtherInformation[];
  onChange: (otherInformation: OtherInformation[]) => void;
}

export const OtherInformationSection: React.FC<
  OtherInformationSectionProps
> = ({ otherInformation, onChange }) => {
  const [newItemName, setNewItemName] = useState("");

  const addOtherInformation = () => {
    if (newItemName.trim()) {
      const newItem: OtherInformation = {
        id: crypto.randomUUID(),
        name: newItemName.trim(),
        selected: true,
      };
      onChange([...otherInformation, newItem]);
      setNewItemName("");
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addOtherInformation();
    }
  };

  return (
    <Card>
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4 md:mb-6">
        Otra Información
      </h3>

      {/* Add new information */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg mb-4 md:mb-6">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3 md:mb-4 text-sm md:text-base">
          Añadir nueva información
        </h4>
        <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-2">
          <Input
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Ej: Carnet de conducir, Vehículo propio, Disponibilidad inmediata..."
            className="flex-1 h-12 md:h-10 text-base md:text-sm"
            onKeyPress={handleKeyPress}
          />
          <Button
            onClick={addOtherInformation}
            size="sm"
            disabled={!newItemName.trim()}
            className="h-12 md:h-10 px-4 md:px-3 text-base md:text-sm font-medium whitespace-nowrap"
          >
            <span className="inline-flex items-center gap-2">
              <ConfiguredIcon name="plus" size={16} />
              Añadir información
            </span>
          </Button>
        </div>
      </div>

      {/* Existing information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {otherInformation.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border rounded-lg p-3 md:p-2 min-h-[56px] md:min-h-[auto]"
          >
            <span className="text-base md:text-sm text-gray-900 dark:text-white flex-1 min-w-0 truncate pr-2">
              {item.name}
            </span>
            <div className="flex items-center space-x-2 md:space-x-1 flex-shrink-0">
              <Toggle
                checked={item.selected}
                onChange={() => toggleOtherInformation(item.id)}
              />
              <Button
                onClick={() => removeOtherInformation(item.id)}
                size="sm"
                variant="secondary"
                className="text-red-600 hover:text-red-700 p-2 md:p-1 min-w-[44px] min-h-[44px] md:min-w-[auto] md:min-h-[auto]"
              >
                <ConfiguredIcon name="trash" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {otherInformation.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No has añadido ninguna información adicional.</p>
          <p className="text-sm">
            Puedes añadir elementos como carnet de conducir, vehículo propio,
            etc.
          </p>
        </div>
      )}
    </Card>
  );
};
