"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SolidModal } from "./SolidModal";
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
    <SolidModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Crear Nuevo CV"
      size="md"
      closeOnOverlayClick={!isCreating}
      closeOnEscapeKey={!isCreating}
    >
      <div className="p-6 space-y-6">
        <div>
          <p className="text-gray-700 dark:text-gray-200 mb-6 text-base leading-relaxed">
            Introduce un nombre descriptivo para tu nuevo CV. Se creará un CV
            vacío que podrás completar desde cero con todas las secciones
            disponibles.
          </p>

          <div className="space-y-3">
            <label
              htmlFor="cv-name"
              className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
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
              className={`text-base ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600"}`}
            />
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
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
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-200">
              <p className="font-semibold mb-2 text-base">
                ¿Qué pasará al crear el nuevo CV?
              </p>
              <ul className="space-y-1.5 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">
                    •
                  </span>
                  Se creará un CV completamente vacío
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">
                    •
                  </span>
                  Se activará automáticamente como tu CV actual
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">
                    •
                  </span>
                  Serás redirigido al editor para completarlo
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">
                    •
                  </span>
                  Tu CV anterior se guardará (no se perderá)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 p-6 border-t-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
        <Button
          variant="secondary"
          onClick={handleClose}
          disabled={isCreating}
          className="px-6 py-2.5 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleCreate}
          disabled={isCreating || !cvName.trim()}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
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
    </SolidModal>
  );
};
