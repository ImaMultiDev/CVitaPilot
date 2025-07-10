import { NextRequest, NextResponse } from "next/server";
import { resendVerificationEmail } from "@/lib/actions/auth-actions";
import { z } from "zod";

const resendSchema = z.object({
  email: z.string().email("Email inválido"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedFields = resendSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Email inválido",
        },
        { status: 400 }
      );
    }

    const { email } = validatedFields.data;
    const result = await resendVerificationEmail(email);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Email de verificación reenviado",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error reenviando email de verificación:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor",
      },
      { status: 500 }
    );
  }
}
