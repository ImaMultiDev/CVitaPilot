// src/views/Home/HomePage.tsx

"use client";

import {
  DashboardStats,
  RecentActivity,
  QuickActions,
} from "@/components/dashboard";
import { CVEditor } from "@/components/editor/CVEditor";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const [showDashboard, setShowDashboard] = useState(true);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header with toggle */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {showDashboard ? "Dashboard" : "Editor de CV"}
          </h1>
          <p className="text-gray-600">
            {showDashboard
              ? "Resumen de tu actividad y estadísticas"
              : "Personaliza tu curriculum para cada oportunidad laboral"}
          </p>
        </div>
        <Button
          onClick={() => setShowDashboard(!showDashboard)}
          variant="secondary"
        >
          {showDashboard ? "✏️ Ir al Editor" : "📊 Ver Dashboard"}
        </Button>
      </div>

      {showDashboard ? (
        <>
          <DashboardStats />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>
        </>
      ) : (
        <CVEditor />
      )}
    </div>
  );
}
