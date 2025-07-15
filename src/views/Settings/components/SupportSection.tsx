"use client";

import React, { useState } from "react";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export const SupportSection: React.FC = () => {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    message: "",
    priority: "medium",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el mensaje
    alert("Mensaje enviado. Te responderemos pronto.");
    setFormData({
      subject: "",
      category: "",
      message: "",
      priority: "medium",
    });
  };

  const categoryOptions = [
    { value: "", label: "Selecciona una categoría" },
    { value: "technical", label: "Problema técnico" },
    { value: "account", label: "Gestión de cuenta" },
    { value: "billing", label: "Facturación" },
    { value: "feature", label: "Solicitud de función" },
    { value: "bug", label: "Reporte de error" },
    { value: "other", label: "Otro" },
  ];

  const priorityOptions = [
    { value: "low", label: "Baja" },
    { value: "medium", label: "Media" },
    { value: "high", label: "Alta" },
    { value: "urgent", label: "Urgente" },
  ];

  return (
    <section id="support" className="mb-8 sm:mb-12">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <ConfiguredIcon
          name="help-circle"
          size={28}
          className="text-blue-600 dark:text-blue-400"
        />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Soporte y Ayuda
        </h2>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Quick Help */}
        <Card className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Ayuda rápida
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              Accede rápidamente a las preguntas más frecuentes y guías.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <ConfiguredIcon
                  name="book"
                  size={20}
                  className="text-blue-500"
                />
                <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                  Guías de uso
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Aprende a usar todas las funciones
              </p>
            </button>

            <button className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <ConfiguredIcon
                  name="help-circle"
                  size={20}
                  className="text-green-500"
                />
                <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                  FAQ
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Preguntas más frecuentes
              </p>
            </button>

            <button className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <ConfiguredIcon
                  name="target"
                  size={20}
                  className="text-purple-500"
                />
                <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                  Tutoriales
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Videos paso a paso
              </p>
            </button>
          </div>
        </Card>

        {/* Contact Form */}
        <Card className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Contactar soporte
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              ¿No encontraste lo que buscabas? Escríbenos directamente.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Categoría
                </label>
                <div className="relative">
                  <Select
                    value={formData.category}
                    onChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                    options={categoryOptions}
                    placeholder="Selecciona una categoría"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Prioridad
                </label>
                <div className="relative">
                  <Select
                    value={formData.priority}
                    onChange={(value) =>
                      setFormData({ ...formData, priority: value })
                    }
                    options={priorityOptions}
                    placeholder="Selecciona prioridad"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Asunto
              </label>
              <Input
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                placeholder="Describe brevemente tu consulta"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Mensaje
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Describe tu problema o consulta en detalle..."
                rows={5}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
              <Button type="submit" className="w-full sm:w-auto">
                Enviar mensaje
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  setFormData({
                    category: "",
                    priority: "",
                    subject: "",
                    message: "",
                  })
                }
                className="w-full sm:w-auto"
              >
                Limpiar formulario
              </Button>
            </div>
          </form>
        </Card>

        {/* Contact Information */}
        <Card className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Información de contacto
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              Otros medios para contactarnos directamente.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ConfiguredIcon
                  name="mail"
                  size={20}
                  className="text-blue-500 mt-1"
                />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                    Email directo
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    soporte@cvitapilot.com
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Respuesta en 24 horas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl mt-1">💬</span>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                    Chat en vivo
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Disponible L-V 9:00-18:00
                  </p>
                  <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                    Iniciar chat →
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-1">📞</span>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                    Teléfono
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    +34 900 123 456
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Solo para clientes Premium
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl mt-1">🌐</span>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                    Centro de ayuda
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    ayuda.cvitapilot.com
                  </p>
                  <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                    Visitar centro →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* System Status */}
        <Card className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Estado del sistema
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              Información sobre el estado de nuestros servicios.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-800 dark:text-green-200 text-sm sm:text-base">
                  Plataforma principal
                </span>
              </div>
              <span className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                Operativo
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-800 dark:text-green-200 text-sm sm:text-base">
                  Generación de PDFs
                </span>
              </div>
              <span className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                Operativo
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-800 dark:text-green-200 text-sm sm:text-base">
                  Base de datos
                </span>
              </div>
              <span className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                Operativo
              </span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
