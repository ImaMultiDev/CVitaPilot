"use server";

import { prisma } from "@/lib/prisma";

export interface SystemStatus {
  service: string;
  status: "operational" | "degraded" | "down";
  message: string;
  lastChecked: string;
}

export async function getSystemStatus(): Promise<SystemStatus[]> {
  try {
    const statuses: SystemStatus[] = [];

    // Verificar base de datos
    try {
      await prisma.$queryRaw`SELECT 1`;
      statuses.push({
        service: "Base de datos",
        status: "operational",
        message: "Operativo",
        lastChecked: new Date().toISOString(),
      });
    } catch (_error) {
      statuses.push({
        service: "Base de datos",
        status: "down",
        message: "Error de conexión",
        lastChecked: new Date().toISOString(),
      });
    }

    // Verificar generación de PDFs (simulado)
    // En un entorno real, aquí verificarías el servicio de PDF
    statuses.push({
      service: "Generación de PDFs",
      status: "operational",
      message: "Operativo",
      lastChecked: new Date().toISOString(),
    });

    // Verificar plataforma principal (simulado)
    // En un entorno real, aquí verificarías múltiples endpoints
    statuses.push({
      service: "Plataforma principal",
      status: "operational",
      message: "Operativo",
      lastChecked: new Date().toISOString(),
    });

    return statuses;
  } catch (error) {
    console.error("Error obteniendo estado del sistema:", error);

    // Retornar estado por defecto en caso de error
    return [
      {
        service: "Base de datos",
        status: "degraded",
        message: "Verificando...",
        lastChecked: new Date().toISOString(),
      },
      {
        service: "Generación de PDFs",
        status: "degraded",
        message: "Verificando...",
        lastChecked: new Date().toISOString(),
      },
      {
        service: "Plataforma principal",
        status: "degraded",
        message: "Verificando...",
        lastChecked: new Date().toISOString(),
      },
    ];
  }
}
