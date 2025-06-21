import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Sesión cerrada",
  });

  // Eliminar la cookie de autenticación
  response.cookies.set("cvitapilot-auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0, // Expira inmediatamente
    path: "/", // Mismo path que cuando se creó
  });

  return response;
}

export async function GET() {
  return POST(); // Permitir tanto GET como POST
}
