import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/auth";
import { initializeDefaultCVForUser } from "@/lib/actions/auth-actions";
import { prisma } from "@/lib/prisma";

export async function POST(_request: NextRequest) {
  try {
    // Verificar que el usuario está autenticado
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 }
      );
    }

    // Verificar si el usuario tiene algún CV
    const existingCV = await prisma.cV.findFirst({
      where: { userId: user.id },
    });

    if (!existingCV) {
      // Crear CV por defecto
      const cvId = await initializeDefaultCVForUser(user.id);

      return NextResponse.json({
        success: true,
        message: "CV por defecto creado exitosamente",
        cvId: cvId,
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "Usuario ya tiene un CV",
        cvId: existingCV.id,
        cvName: existingCV.name,
      });
    }
  } catch (error) {
    console.error("Error en ensure-default CV:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
