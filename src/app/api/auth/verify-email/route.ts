import { NextRequest, NextResponse } from "next/server";
import { verifyEmail } from "@/lib/actions/auth-actions";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/auth/error?error=missing-token", request.url)
      );
    }

    const result = await verifyEmail(token);

    if (result.success) {
      // Redirigir a página de éxito
      return NextResponse.redirect(
        new URL("/auth/login?verified=true", request.url)
      );
    } else {
      // Redirigir a página de error con el mensaje específico
      return NextResponse.redirect(
        new URL(
          `/auth/error?error=verification-failed&message=${encodeURIComponent(
            result.error || "Error de verificación"
          )}`,
          request.url
        )
      );
    }
  } catch (error) {
    console.error("Error en verificación de email:", error);
    return NextResponse.redirect(
      new URL("/auth/error?error=server-error", request.url)
    );
  }
}
