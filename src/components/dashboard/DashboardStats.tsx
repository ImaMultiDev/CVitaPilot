// src/components/dashboard/DashboardStats.tsx

"use client";

import { useCV } from "@/contexts/CVContext";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useCVAnalytics } from "@/hooks/useCVAnalytics";

export const DashboardStats: React.FC = () => {
  const { state } = useCV();
  const analytics = useCVAnalytics();

  const quickStats = [
    {
      title: "CVs Guardados",
      value: analytics.totalCVs,
      icon: "📄",
      color: "text-blue-600",
    },
    {
      title: "Entregas Totales",
      value: analytics.totalDeliveries,
      icon: "📤",
      color: "text-green-600",
    },
    {
      title: "Tasa de Respuesta",
      value: `${analytics.responseRate.toFixed(1)}%`,
      icon: "📈",
      color: "text-orange-600",
    },
    {
      title: "Habilidades Activas",
      value: state.currentCV.skills.filter((s) => s.selected).length,
      icon: "🛠️",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {quickStats.map((stat) => (
        <Card key={stat.title} className="text-center">
          <div className="text-3xl mb-2">{stat.icon}</div>
          <div className={`text-2xl font-bold ${stat.color} mb-1`}>
            {stat.value}
          </div>
          <div className="text-sm text-gray-600">{stat.title}</div>
        </Card>
      ))}
    </div>
  );
};
