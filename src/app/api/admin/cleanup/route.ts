import { NextRequest, NextResponse } from "next/server";
import {
  cleanupUnverifiedUsers,
  getCleanupStats,
} from "@/lib/actions/auth-actions";

export async function POST(request: NextRequest) {
  try {
    // Verificar que sea una petición autorizada (puedes añadir autenticación aquí)
    const authHeader = request.headers.get("authorization");

    // Para desarrollo, permitir sin autenticación
    // En producción, deberías verificar un token de administrador
    if (
      process.env.NODE_ENV === "production" &&
      authHeader !== `Bearer ${process.env.ADMIN_SECRET}`
    ) {
      return NextResponse.json(
        { success: false, error: "No autorizado" },
        { status: 401 }
      );
    }

    const result = await cleanupUnverifiedUsers();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Limpieza completada: ${result.deletedUsers} usuarios eliminados, ${result.deletedTokens} tokens eliminados`,
        deletedUsers: result.deletedUsers,
        deletedTokens: result.deletedTokens,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error en limpieza:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verificar que sea una petición autorizada
    const authHeader = request.headers.get("authorization");

    if (
      process.env.NODE_ENV === "production" &&
      authHeader !== `Bearer ${process.env.ADMIN_SECRET}`
    ) {
      return NextResponse.json(
        { success: false, error: "No autorizado" },
        { status: 401 }
      );
    }

    const stats = await getCleanupStats();

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
