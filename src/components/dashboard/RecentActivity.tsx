// src/components/dashboard/RecentActivity.tsx

"use client";

import { useCV } from "@/contexts/CVContext";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { dateUtils } from "@/utils/dateUtils";

export const RecentActivity: React.FC = () => {
  const { state } = useCV();

  // Get recent deliveries across all CVs
  const recentDeliveries = state.savedCVs
    .flatMap((cv) =>
      cv.deliveries.map((delivery) => ({
        ...delivery,
        cvName: cv.name,
      }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

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

  if (recentDeliveries.length === 0) {
    return (
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Actividad Reciente
        </h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-gray-600">No hay entregas registradas aún</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Actividad Reciente
      </h3>
      <div className="space-y-4">
        {recentDeliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">
                  {delivery.company}
                </span>
                <Badge variant={statusColors[delivery.status]} size="sm">
                  {statusLabels[delivery.status]}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                {delivery.position} • CV: {delivery.cvName}
              </div>
              <div className="text-xs text-gray-500">
                {dateUtils.formatDate(delivery.date)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
