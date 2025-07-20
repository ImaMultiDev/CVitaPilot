"use client";

import React from "react";
import { useActivity } from "@/hooks/useActivity";
import { ConfiguredIcon } from "@/components/ui/ConfiguredIcon";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

// Función para obtener el icono según el tipo de actividad
const getActivityIcon = (type: string) => {
  switch (type) {
    case "login":
      return "log-in";
    case "logout":
      return "log-out";
    case "cv_created":
      return "file-plus";
    case "cv_updated":
      return "edit";
    case "cv_deleted":
      return "trash-2";
    case "settings_changed":
      return "settings";
    case "password_changed":
      return "lock";
    case "two_factor_enabled":
      return "shield-check";
    case "two_factor_disabled":
      return "shield-off";
    case "profile_updated":
      return "user";
    default:
      return "activity";
  }
};

// Función para formatear la fecha relativa
const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return "Ahora mismo";
  } else if (diffInMinutes < 60) {
    return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? "s" : ""}`;
  } else if (diffInHours < 24) {
    return `Hace ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;
  } else if (diffInDays === 1) {
    return "Ayer";
  } else if (diffInDays < 7) {
    return `Hace ${diffInDays} día${diffInDays > 1 ? "s" : ""}`;
  } else {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
};

// Función para obtener el color del icono según el tipo
const getActivityColor = (type: string) => {
  switch (type) {
    case "login":
    case "cv_created":
    case "two_factor_enabled":
      return "text-green-500";
    case "logout":
    case "cv_deleted":
    case "two_factor_disabled":
      return "text-red-500";
    case "cv_updated":
    case "settings_changed":
    case "password_changed":
    case "profile_updated":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
};

export const RecentActivity: React.FC = () => {
  const { activities, isLoading, error, refreshActivities } = useActivity();

  if (isLoading) {
    return (
      <Card className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Actividad reciente
        </h3>
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-2/3"></div>
              </div>
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-20"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Actividad reciente
        </h3>
        <div className="text-center py-8">
          <ConfiguredIcon
            name="alert-circle"
            size={48}
            className="text-red-500 mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <Button onClick={refreshActivities} size="sm">
            Reintentar
          </Button>
        </div>
      </Card>
    );
  }

  if (activities.length === 0) {
    return (
      <Card className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Actividad reciente
        </h3>
        <div className="text-center py-8">
          <ConfiguredIcon
            name="activity"
            size={48}
            className="text-gray-400 mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400">
            No hay actividad reciente para mostrar
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
          Actividad reciente
        </h3>
        <Button onClick={refreshActivities} size="sm" variant="ghost">
          <ConfiguredIcon name="refresh-cw" size={16} className="mr-2" />
          Actualizar
        </Button>
      </div>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <ConfiguredIcon
                  name={getActivityIcon(activity.type)}
                  size={16}
                  className={getActivityColor(activity.type)}
                />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </p>
              </div>
              {activity.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.description}
                </p>
              )}
              {/* Metadata se mostrará cuando implementemos la detección de IP y ubicación */}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 self-start sm:self-center">
              {formatRelativeTime(activity.createdAt)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
