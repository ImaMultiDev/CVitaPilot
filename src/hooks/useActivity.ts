"use client";

import { useState, useEffect } from "react";
import {
  getUserRecentActivity,
  getUserActivityStats,
} from "@/lib/actions/activity-actions";

export interface UserActivity {
  id: string;
  type: string;
  title: string;
  description?: string | null;
  metadata?: unknown;
  createdAt: string;
}

export interface ActivityStats {
  recentActivity: number;
  activityByType: Array<{
    type: string;
    count: number;
  }>;
  lastActivity: {
    type: string;
    title: string;
    createdAt: string;
  } | null;
}

interface UseActivityReturn {
  activities: UserActivity[];
  stats: ActivityStats | null;
  isLoading: boolean;
  error: string | null;
  refreshActivities: () => Promise<void>;
  refreshStats: () => Promise<void>;
}

export const useActivity = (): UseActivityReturn => {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [stats, setStats] = useState<ActivityStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = async () => {
    try {
      setError(null);
      console.log("Obteniendo actividad reciente...");
      const result = await getUserRecentActivity(10);
      console.log("Resultado de actividad:", result);

      if (result.success && result.activities) {
        setActivities(result.activities);
        console.log("Actividades cargadas:", result.activities.length);
      } else {
        setError(result.error || "Error al cargar actividad");
        console.log("Error al cargar actividad:", result.error);
      }
    } catch (err) {
      setError("Error inesperado al cargar actividad");
      console.error("Error fetching activities:", err);
    }
  };

  const fetchStats = async () => {
    try {
      setError(null);
      const result = await getUserActivityStats();

      if (result.success && result.stats) {
        setStats(result.stats);
      } else {
        setError(result.error || "Error al cargar estadísticas");
      }
    } catch (err) {
      setError("Error inesperado al cargar estadísticas");
      console.error("Error fetching stats:", err);
    }
  };

  const refreshActivities = async () => {
    await fetchActivities();
  };

  const refreshStats = async () => {
    await fetchStats();
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchActivities(), fetchStats()]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  return {
    activities,
    stats,
    isLoading,
    error,
    refreshActivities,
    refreshStats,
  };
};
