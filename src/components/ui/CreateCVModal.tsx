"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { Input } from "./Input";
import { createNewCV } from "@/lib/actions/cv-actions";

interface CreateCVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateCVModal: React.FC<CreateCVModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [cvName, setCVName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!cvName.trim()) {
      setError("El nombre del CV es requerido");
      return;
    }

    setIsCreating(true);
    setError("");

    try {
      const result = await createNewCV(cvName.trim());

      if (result.success) {
        // Cerrar modal y limpiar
        setCVName("");
        setError("");
        onClose();

        // Redirigir al editor con el nuevo CV
        router.push("/editor");
        router.refresh();
      } else {
        setError(result.error || "Error al crear el CV");
      }
    } catch (error) {
      console.error("Error creating CV:", error);
      setError("Error inesperado al crear el CV");
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    if (!isCreating) {
      setCVName("");
      setError("");
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isCreating) {
      handleCreate();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Crear Nuevo CV"
      variant="solid"
      size="md"
      closeOnOverlayClick={!isCreating}
      closeOnEscapeKey={!isCreating}
    >
      <div className="p-6 space-y-4">
        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Introduce un nombre descriptivo para tu nuevo CV. Se creará un CV
            vacío que podrás completar desde cero.
          </p>

          <div className="space-y-2">
            <label
              htmlFor="cv-name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Nombre del CV
            </label>
            <Input
              id="cv-name"
              type="text"
              value={cvName}
              onChange={(e) => {
                setCVName(e.target.value);
                if (error) setError("");
              }}
              onKeyPress={handleKeyPress}
              placeholder="Ej: CV para Desarrollador Frontend"
              disabled={isCreating}
              className={error ? "border-red-500 focus:ring-red-500" : ""}
            />
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium mb-1">
                ¿Qué pasará al crear el nuevo CV?
              </p>
              <ul className="space-y-1 text-sm">
                <li>• Se creará un CV completamente vacío</li>
                <li>• Se activará automáticamente como tu CV actual</li>
                <li>• Serás redirigido al editor para completarlo</li>
                <li>• Tu CV anterior se guardará (no se perderá)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
        <Button variant="secondary" onClick={handleClose} disabled={isCreating}>
          Cancelar
        </Button>
        <Button
          onClick={handleCreate}
          disabled={isCreating || !cvName.trim()}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {isCreating ? (
            <span className="flex items-center space-x-2">
              <svg
                className="animate-spin w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Creando...</span>
            </span>
          ) : (
            "Crear CV"
          )}
        </Button>
      </div>
    </Modal>
  );
};
