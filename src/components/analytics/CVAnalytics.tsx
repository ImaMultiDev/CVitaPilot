// src/components/analytics/CVAnalytics.tsx

"use client";

import { useCV } from "@/contexts/CVContext";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const CVAnalytics: React.FC = () => {
  const { state } = useCV();

  // Calculate analytics
  const totalDeliveries = state.savedCVs.reduce(
    (acc, cv) => acc + cv.deliveries.length,
    0
  );
  const totalCVs = state.savedCVs.length;

  const deliveriesByStatus = state.savedCVs.reduce((acc, cv) => {
    cv.deliveries.forEach((delivery) => {
      acc[delivery.status] = (acc[delivery.status] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const responseRate =
    totalDeliveries > 0
      ? (((deliveriesByStatus.interview || 0) +
          (deliveriesByStatus.accepted || 0)) /
          totalDeliveries) *
        100
      : 0;

  const acceptanceRate =
    totalDeliveries > 0
      ? ((deliveriesByStatus.accepted || 0) / totalDeliveries) * 100
      : 0;

  // Most used skills
  const skillUsage = state.savedCVs.reduce((acc, cv) => {
    cv.data.skills
      .filter((s) => s.selected)
      .forEach((skill) => {
        acc[skill.name] = (acc[skill.name] || 0) + 1;
      });
    return acc;
  }, {} as Record<string, number>);

  const topSkills = Object.entries(skillUsage)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total CVs */}
      <Card className="text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2">{totalCVs}</div>
        <div className="text-sm text-gray-600">CVs Guardados</div>
      </Card>

      {/* Total Deliveries */}
      <Card className="text-center">
        <div className="text-3xl font-bold text-green-600 mb-2">
          {totalDeliveries}
        </div>
        <div className="text-sm text-gray-600">Total Entregas</div>
      </Card>

      {/* Response Rate */}
      <Card className="text-center">
        <div className="text-3xl font-bold text-orange-600 mb-2">
          {responseRate.toFixed(1)}%
        </div>
        <div className="text-sm text-gray-600">Tasa de Respuesta</div>
      </Card>

      {/* Acceptance Rate */}
      <Card className="text-center">
        <div className="text-3xl font-bold text-purple-600 mb-2">
          {acceptanceRate.toFixed(1)}%
        </div>
        <div className="text-sm text-gray-600">Tasa de Aceptación</div>
      </Card>

      {/* Delivery Status Breakdown */}
      <Card className="md:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Estado de Entregas
        </h3>
        <div className="space-y-3">
          {Object.entries(deliveriesByStatus).map(([status, count]) => {
            const percentage =
              totalDeliveries > 0 ? (count / totalDeliveries) * 100 : 0;
            const statusLabels = {
              sent: "Enviado",
              interview: "Entrevista",
              rejected: "Rechazado",
              accepted: "Aceptado",
            };
            const statusColors = {
              sent: "info",
              interview: "warning",
              rejected: "danger",
              accepted: "success",
            } as const;

            return (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={statusColors[status as keyof typeof statusColors]}
                    size="sm"
                  >
                    {statusLabels[status as keyof typeof statusLabels]}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {count} entregas
                  </span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {percentage.toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Top Skills */}
      <Card className="md:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Habilidades Más Utilizadas
        </h3>
        <div className="space-y-3">
          {topSkills.map(([skill, count]) => (
            <div key={skill} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{skill}</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(count / totalCVs) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
