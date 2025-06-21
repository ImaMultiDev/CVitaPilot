import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Verificar conexión a la base de datos
    await prisma.$queryRaw`SELECT 1`;

    // Verificar estado de las tablas principales
    const cvCount = await prisma.cV.count();

    return NextResponse.json(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        database: "connected",
        tables: {
          cvs: cvCount,
        },
        version: process.env.npm_package_version || "1.0.0",
        environment: process.env.NODE_ENV || "development",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Health check failed:", error);

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
        environment: process.env.NODE_ENV || "development",
      },
      { status: 503 }
    );
  }
}

export async function HEAD() {
  // Para verificaciones rápidas de estado
  try {
    await prisma.$queryRaw`SELECT 1`;
    return new NextResponse(null, { status: 200 });
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}
