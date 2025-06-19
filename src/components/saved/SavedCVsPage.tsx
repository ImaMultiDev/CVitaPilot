// src/components/saved/SavedCVsPage.tsx

"use client";

import { useState } from "react";
import { useCV } from "@/contexts/CVContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { SavedCV, CVDelivery } from "@/types/cv";

export const SavedCVsPage: React.FC = () => {
  const { state, dispatch, loadCV } = useCV();
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [selectedCVId, setSelectedCVId] = useState<string>("");
  const [deliveryForm, setDeliveryForm] = useState({
    company: "",
    position: "",
    date: new Date().toISOString().split("T")[0],
    status: "sent" as CVDelivery["status"],
    notes: "",
  });

  const openDeliveryModal = (cvId: string) => {
    setSelectedCVId(cvId);
    setIsDeliveryModalOpen(true);
  };

  const closeDeliveryModal = () => {
    setIsDeliveryModalOpen(false);
    setSelectedCVId("");
    setDeliveryForm({
      company: "",
      position: "",
      date: new Date().toISOString().split("T")[0],
      status: "sent",
      notes: "",
    });
  };

  const handleAddDelivery = (e: React.FormEvent) => {
    e.preventDefault();

    const delivery: CVDelivery = {
      id: Date.now().toString(),
      ...deliveryForm,
    };

    dispatch({
      type: "ADD_DELIVERY",
      payload: { cvId: selectedCVId, delivery },
    });

    closeDeliveryModal();
  };

  const handleLoadCV = (cvId: string) => {
    loadCV(cvId);
    alert("CV cargado en el editor");
  };

  const handleDeleteCV = (cvId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este CV?")) {
      dispatch({ type: "DELETE_SAVED_CV", payload: cvId });
    }
  };

  const statusColors = {
    sent: "info",
    interview: "warning",
    rejected: "danger",
    accepted: "success",
  } as const;

  const statusLabels = {
    sent: "Enviado",
    interview: "Entrevista",
    rejected: "Rechazado",
    accepted: "Aceptado",
  };

  const deliveryStatusOptions = [
    { value: "sent", label: "Enviado" },
    { value: "interview", label: "Entrevista" },
    { value: "rejected", label: "Rechazado" },
    { value: "accepted", label: "Aceptado" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis CVs</h1>
          <p className="text-gray-600">
            Gestiona tus curriculums guardados y su historial de entrega
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">{state.savedCVs.length}</span> CVs
            guardados
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-semibold">
              {state.savedCVs.reduce(
                (acc, cv) => acc + cv.deliveries.length,
                0
              )}
            </span>{" "}
            entregas registradas
          </div>
        </div>
      </div>

      {state.savedCVs.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No tienes CVs guardados
          </h3>
          <p className="text-gray-600 mb-6">
            Comienza creando y personalizando tu primer CV
          </p>
          <Button>🛠️ Ir al Editor</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {state.savedCVs.map((savedCV) => (
            <Card key={savedCV.id} className="relative">
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {savedCV.name}
                  </h3>
                  <div className="flex space-x-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLoadCV(savedCV.id)}
                      title="Cargar en editor"
                    >
                      ✏️
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDeliveryModal(savedCV.id)}
                      title="Agregar entrega"
                    >
                      📤
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteCV(savedCV.id)}
                      title="Eliminar CV"
                    >
                      🗑️
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <div>👤 {savedCV.data.personalInfo.name}</div>
                  <div>🎯 {savedCV.data.personalInfo.position}</div>
                  <div className="flex items-center space-x-4">
                    <span>
                      📅 {new Date(savedCV.createdAt).toLocaleDateString()}
                    </span>
                    <span>
                      ✏️ {new Date(savedCV.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* CV Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">
                    {savedCV.data.skills.filter((s) => s.selected).length}
                  </div>
                  <div className="text-xs text-gray-600">Habilidades</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">
                    {savedCV.data.experiences.filter((e) => e.selected).length}
                  </div>
                  <div className="text-xs text-gray-600">Experiencias</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600">
                    {savedCV.data.education.filter((e) => e.selected).length}
                  </div>
                  <div className="text-xs text-gray-600">Formación</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-orange-600">
                    {savedCV.deliveries.length}
                  </div>
                  <div className="text-xs text-gray-600">Entregas</div>
                </div>
              </div>

              {/* Delivery History */}
              {savedCV.deliveries.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                    <span className="mr-2">📤</span>
                    Historial de Entregas
                  </h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {savedCV.deliveries
                      .slice(-3)
                      .reverse()
                      .map((delivery) => (
                        <div
                          key={delivery.id}
                          className="border-l-2 border-gray-200 pl-3 text-sm"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-gray-900">
                                {delivery.company}
                              </div>
                              <div className="text-gray-600">
                                {delivery.position}
                              </div>
                              <div className="text-xs text-gray-500">
                                {delivery.date}
                              </div>
                            </div>
                            <Badge
                              variant={statusColors[delivery.status]}
                              size="sm"
                            >
                              {statusLabels[delivery.status]}
                            </Badge>
                          </div>
                          {delivery.notes && (
                            <div className="text-xs text-gray-600 mt-1 italic">
                              "{delivery.notes}"
                            </div>
                          )}
                        </div>
                      ))}
                    {savedCV.deliveries.length > 3 && (
                      <div className="text-xs text-gray-500 text-center pt-1">
                        +{savedCV.deliveries.length - 3} entregas más
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleLoadCV(savedCV.id)}
                  >
                    🛠️ Editar
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openDeliveryModal(savedCV.id)}
                  >
                    📤 Entregar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Delivery Modal */}
      <Modal
        isOpen={isDeliveryModalOpen}
        onClose={closeDeliveryModal}
        title="Registrar Entrega de CV"
        size="md"
      >
        <form onSubmit={handleAddDelivery} className="space-y-4">
          <Input
            label="Empresa"
            value={deliveryForm.company}
            onChange={(e) =>
              setDeliveryForm((prev) => ({ ...prev, company: e.target.value }))
            }
            required
          />

          <Input
            label="Posición"
            value={deliveryForm.position}
            onChange={(e) =>
              setDeliveryForm((prev) => ({ ...prev, position: e.target.value }))
            }
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Fecha"
              type="date"
              value={deliveryForm.date}
              onChange={(e) =>
                setDeliveryForm((prev) => ({ ...prev, date: e.target.value }))
              }
              required
            />

            <Select
              label="Estado"
              value={deliveryForm.status}
              onChange={(e) =>
                setDeliveryForm((prev) => ({
                  ...prev,
                  status: e.target.value as CVDelivery["status"],
                }))
              }
              options={deliveryStatusOptions}
              required
            />
          </div>

          <Input
            label="Notas (opcional)"
            value={deliveryForm.notes}
            onChange={(e) =>
              setDeliveryForm((prev) => ({ ...prev, notes: e.target.value }))
            }
            placeholder="Notas adicionales sobre esta entrega..."
          />

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={closeDeliveryModal}
            >
              Cancelar
            </Button>
            <Button type="submit">📤 Registrar Entrega</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
