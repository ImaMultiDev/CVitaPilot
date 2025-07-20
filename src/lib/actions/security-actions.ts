"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import crypto from "crypto";
import { logUserActivity } from "./activity-actions";

// Schema de validación para cambio de contraseña
const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "La contraseña actual es requerida"),
    newPassword: z
      .string()
      .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
      .max(50, "La nueva contraseña no puede tener más de 50 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&.#-_+=]{8,50}$/,
        "La contraseña debe contener al menos: 1 minúscula, 1 mayúscula y 1 número"
      ),
    confirmPassword: z.string().min(1, "Debes confirmar la nueva contraseña"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "La nueva contraseña debe ser diferente a la actual",
    path: ["newPassword"],
  });

// Cambiar contraseña
export async function changePassword(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validar datos
    const validatedFields = changePasswordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Datos inválidos",
        fieldErrors: validatedFields.error.flatten().fieldErrors,
      };
    }

    // Obtener usuario actual
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || !user.password) {
      return { success: false, error: "Usuario no encontrado" };
    }

    // Verificar contraseña actual
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      return { success: false, error: "La contraseña actual es incorrecta" };
    }

    // Hashear nueva contraseña
    const hashedNewPassword = await hashPassword(newPassword);

    // Actualizar contraseña
    await prisma.user.update({
      where: { email: session.user.email },
      data: { password: hashedNewPassword },
    });

    revalidatePath("/settings");

    // Registrar actividad
    console.log("Registrando actividad de cambio de contraseña...");
    const activityResult = await logUserActivity(
      "password_changed",
      "Contraseña actualizada",
      "Se cambió la contraseña de la cuenta",
      { details: { method: "manual" } }
    );
    console.log("Resultado del logging:", activityResult);

    return {
      success: true,
      message: "Contraseña actualizada correctamente",
    };
  } catch (error) {
    console.error("Error changing password:", error);
    return {
      success: false,
      error: "Error al cambiar la contraseña. Inténtalo de nuevo.",
    };
  }
}

// Verificar contraseña actual (para validación en tiempo real)
export async function verifyCurrentPassword(password: string) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || !user.password) {
      return { success: false, error: "Usuario no encontrado" };
    }

    const isValid = await bcrypt.compare(password, user.password);

    return {
      success: true,
      isValid,
    };
  } catch (error) {
    console.error("Error verifying password:", error);
    return {
      success: false,
      error: "Error al verificar la contraseña",
    };
  }
}

// Obtener última actualización de contraseña
export async function getPasswordLastUpdate() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { updatedAt: true },
    });

    if (!user) {
      return { success: false, error: "Usuario no encontrado" };
    }

    return {
      success: true,
      lastUpdate: user.updatedAt,
    };
  } catch (error) {
    console.error("Error getting password last update:", error);
    return {
      success: false,
      error: "Error al obtener la información",
    };
  }
}

// ===== AUTENTICACIÓN DE DOS FACTORES =====

// Generar secret para 2FA
export async function generateTwoFactorSecret() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    // Generar secret aleatorio de 32 caracteres
    const secret = Array.from({ length: 32 }, () =>
      Math.floor(Math.random() * 36).toString(36)
    ).join("");

    // Generar QR code URL (formato estándar TOTP)
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { name: true, email: true },
    });

    if (!user) {
      return { success: false, error: "Usuario no encontrado" };
    }

    const qrCodeUrl = `otpauth://totp/CVitaPilot:${encodeURIComponent(
      user.email
    )}?secret=${secret}&issuer=CVitaPilot&algorithm=SHA1&digits=6&period=30`;

    return {
      success: true,
      secret,
      qrCodeUrl,
      email: user.email,
    };
  } catch (error) {
    console.error("Error generating 2FA secret:", error);
    return {
      success: false,
      error: "Error al generar el código 2FA",
    };
  }
}

// Verificar código 2FA
export async function verifyTwoFactorCode(code: string, secret: string) {
  try {
    // Implementación simple de TOTP
    // En producción, usar librería como 'speakeasy'
    const now = Math.floor(Date.now() / 1000);
    const timeStep = 30; // 30 segundos
    const window = 1; // Ventana de tiempo permitida

    // Generar código esperado
    const timeSlice = Math.floor(now / timeStep);
    // const expectedCode = generateTOTPCode(secret, timeSlice); // ELIMINADA

    // Verificar código actual y ventana
    for (let i = -window; i <= window; i++) {
      const testCode = generateTOTPCode(secret, timeSlice + i);
      if (code === testCode) {
        return { success: true, isValid: true };
      }
    }

    return { success: true, isValid: false };
  } catch (error) {
    console.error("Error verifying 2FA code:", error);
    return {
      success: false,
      error: "Error al verificar el código",
    };
  }
}

// Función auxiliar para generar código TOTP
function generateTOTPCode(secret: string, timeSlice: number): string {
  // Implementación simplificada
  // En producción, usar librería especializada
  const hash = crypto
    .createHmac("sha1", secret)
    .update(timeSlice.toString())
    .digest("hex");

  const offset = parseInt(hash.slice(-1), 16);
  const code = (
    (parseInt(hash.slice(offset, offset + 8), 16) & 0x7fffffff) %
    1000000
  )
    .toString()
    .padStart(6, "0");

  return code;
}

// Habilitar 2FA
export async function enableTwoFactor(secret: string, code: string) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    // Verificar código
    const verification = await verifyTwoFactorCode(code, secret);
    if (!verification.success || !verification.isValid) {
      return { success: false, error: "Código 2FA inválido" };
    }

    // Actualizar usuario con secret 2FA
    await prisma.user.update({
      where: { email: session.user.email },
      data: { twoFactorSecret: secret },
    });

    revalidatePath("/settings");

    // Registrar actividad
    await logUserActivity(
      "two_factor_enabled",
      "Autenticación de dos factores habilitada",
      "Se activó la autenticación de dos factores para la cuenta"
    );

    return {
      success: true,
      message: "Autenticación de dos factores habilitada correctamente",
    };
  } catch (error) {
    console.error("Error enabling 2FA:", error);
    return {
      success: false,
      error: "Error al habilitar 2FA",
    };
  }
}

// Deshabilitar 2FA
export async function disableTwoFactor() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    // Actualizar usuario removiendo secret 2FA
    await prisma.user.update({
      where: { email: session.user.email },
      data: { twoFactorSecret: null },
    });

    revalidatePath("/settings");

    // Registrar actividad
    await logUserActivity(
      "two_factor_disabled",
      "Autenticación de dos factores deshabilitada",
      "Se desactivó la autenticación de dos factores de la cuenta"
    );

    return {
      success: true,
      message: "Autenticación de dos factores deshabilitada",
    };
  } catch (error) {
    console.error("Error disabling 2FA:", error);
    return {
      success: false,
      error: "Error al deshabilitar 2FA",
    };
  }
}

// Obtener estado 2FA
export async function getTwoFactorStatus() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "No autorizado" };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { twoFactorSecret: true },
    });

    if (!user) {
      return { success: false, error: "Usuario no encontrado" };
    }

    return {
      success: true,
      isEnabled: !!user.twoFactorSecret,
    };
  } catch (error) {
    console.error("Error getting 2FA status:", error);
    return {
      success: false,
      error: "Error al obtener el estado 2FA",
    };
  }
}
