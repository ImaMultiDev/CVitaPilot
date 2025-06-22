import { signOut } from "@/auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await signOut({
      redirect: false,
    });

    return NextResponse.json(
      { message: "Sesión cerrada exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return NextResponse.json(
      { error: "Error al cerrar sesión" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST(); // Permitir tanto GET como POST para compatibilidad
}
