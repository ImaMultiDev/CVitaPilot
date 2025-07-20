"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Tipos de actividad
export type ActivityType =
  | "login"
  | "logout"
  | "cv_created"
  | "cv_updated"
  | "cv_deleted"
  | "settings_changed"
  | "password_changed"
  | "two_factor_enabled"
  | "two_factor_disabled"
  | "profile_updated";

// Interfaz para metadata de actividad
export interface ActivityMetadata {
  ip?: string;
  location?: string;
  userAgent?: string;
  device?: string;
  browser?: string;
  os?: string;
  details?: Record<string, unknown>;
}

// Registrar una nueva actividad
export async function logUserActivity(
  type: ActivityType,
  title: string,
  description?: string,
  metadata?: ActivityMetadata
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, error: "Usuario no encontrado" };
    }

    await prisma.userActivity.create({
      data: {
        type,
        title,
        description,
        metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : {},
        userId: user.id,
      },
    });

    revalidatePath("/settings");
    return { success: true };
  } catch (error) {
    console.error("Error logging user activity:", error);
    return { success: false, error: "Error al registrar actividad" };
  }
}

// Obtener actividad reciente del usuario
export async function getUserRecentActivity(limit: number = 10) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, error: "Usuario no encontrado" };
    }

    const activities = await prisma.userActivity.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        type: true,
        title: true,
        description: true,
        metadata: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      activities: activities.map((activity) => ({
        ...activity,
        createdAt: activity.createdAt.toISOString(),
      })),
    };
  } catch (error) {
    console.error("Error getting user activity:", error);
    return { success: false, error: "Error al obtener actividad" };
  }
}

// Obtener estadísticas de actividad
export async function getUserActivityStats() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, error: "Usuario no encontrado" };
    }

    // Actividad de los últimos 30 días
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentActivity = await prisma.userActivity.count({
      where: {
        userId: user.id,
        createdAt: { gte: thirtyDaysAgo },
      },
    });

    // Actividad por tipo
    const activityByType = await prisma.userActivity.groupBy({
      by: ["type"],
      where: { userId: user.id },
      _count: { type: true },
    });

    // Última actividad
    const lastActivity = await prisma.userActivity.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: { type: true, title: true, createdAt: true },
    });

    return {
      success: true,
      stats: {
        recentActivity,
        activityByType: activityByType.map((item) => ({
          type: item.type,
          count: item._count.type,
        })),
        lastActivity: lastActivity
          ? {
              ...lastActivity,
              createdAt: lastActivity.createdAt.toISOString(),
            }
          : null,
      },
    };
  } catch (error) {
    console.error("Error getting user activity stats:", error);
    return { success: false, error: "Error al obtener estadísticas" };
  }
}

// Limpiar actividad antigua (más de 90 días)
export async function cleanupOldActivity() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return { success: false, error: "Usuario no encontrado" };
    }

    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const deletedCount = await prisma.userActivity.deleteMany({
      where: {
        userId: user.id,
        createdAt: { lt: ninetyDaysAgo },
      },
    });

    return {
      success: true,
      deletedCount: deletedCount.count,
    };
  } catch (error) {
    console.error("Error cleaning up old activity:", error);
    return { success: false, error: "Error al limpiar actividad antigua" };
  }
}
