"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// Función auxiliar para obtener el ID del usuario actual
async function getCurrentUserId(): Promise<string> {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Usuario no autenticado");
  }

  return session.user.id;
}

// Regex para validación de email más estricta
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Regex para validación de contraseña segura
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&.#-_+=]{8,50}$/;

// Regex para validación de nombre (solo letras, espacios y acentos)
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{2,100}$/;

// Schema de validación para registro
const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(100, "El nombre no puede tener más de 100 caracteres")
      .regex(
        nameRegex,
        "El nombre solo puede contener letras, espacios y acentos"
      )
      .refine((name) => name.trim().length >= 2, {
        message: "El nombre no puede estar vacío o contener solo espacios",
      }),
    email: z
      .string()
      .min(1, "El email es obligatorio")
      .max(255, "El email es demasiado largo")
      .regex(emailRegex, "Por favor, introduce un email válido")
      .toLowerCase()
      .refine(
        (email) => {
          // Verificar que no tenga espacios
          return !email.includes(" ");
        },
        {
          message: "El email no puede contener espacios",
        }
      )
      .refine(
        (email) => {
          // Verificar dominios comunes para mejor UX
          const domain = email.split("@")[1];
          return domain && domain.length > 0;
        },
        {
          message: "El dominio del email parece inválido",
        }
      ),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(50, "La contraseña no puede tener más de 50 caracteres")
      .regex(
        passwordRegex,
        "La contraseña debe contener al menos: 1 minúscula, 1 mayúscula y 1 número"
      )
      .refine(
        (password) => {
          // Verificaciones adicionales de seguridad
          const hasLowerCase = /[a-z]/.test(password);
          const hasUpperCase = /[A-Z]/.test(password);
          const hasNumber = /\d/.test(password);
          return hasLowerCase && hasUpperCase && hasNumber;
        },
        {
          message:
            "La contraseña debe incluir al menos una letra minúscula, una mayúscula y un número",
        }
      ),
    confirmPassword: z.string().min(1, "Debes confirmar tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// Schema de validación para login
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El email es obligatorio")
    .max(255, "El email es demasiado largo")
    .regex(emailRegex, "Por favor, introduce un email válido")
    .toLowerCase()
    .refine((email) => !email.includes(" "), {
      message: "El email no puede contener espacios",
    }),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .max(50, "La contraseña es demasiado larga"),
});

type RegisterData = z.infer<typeof registerSchema>;
type LoginData = z.infer<typeof loginSchema>;

export async function registerUser(data: RegisterData) {
  try {
    // Validar datos de entrada
    const validatedFields = registerSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { name, email, password } = validatedFields.data;

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        errors: { email: ["Este email ya está registrado"] },
      };
    }

    // Crear hash de la contraseña
    const hashedPassword = await hashPassword(password);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Inicializar CV por defecto para el nuevo usuario
    await initializeDefaultCVForUser(user.id);

    revalidatePath("/auth/login");

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    console.error("Error registrando usuario:", error);
    return {
      success: false,
      errors: { general: ["Error interno del servidor"] },
    };
  }
}

// Función para inicializar CV por defecto para un nuevo usuario
export async function initializeDefaultCVForUser(
  _userId: string
): Promise<string> {
  try {
    // Importar la función que ya tiene todos los datos de ejemplo
    const { initializeDefaultCV } = await import("./cv-actions");

    // Usar la función existente que ya tiene todos los datos de ejemplo
    return await initializeDefaultCV();
  } catch (error) {
    console.error("Error inicializando CV por defecto:", error);
    throw error;
  }
}

// Función para validar datos de login
export async function validateLoginData(data: LoginData) {
  try {
    // Validar datos de entrada
    const validatedFields = loginSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    return {
      success: true,
      data: validatedFields.data,
    };
  } catch (error) {
    console.error("Error validando datos de login:", error);
    return {
      success: false,
      errors: { general: ["Error interno del servidor"] },
    };
  }
}

// Función para exportar datos del usuario
export async function exportUserData(): Promise<{
  success: boolean;
  data?: unknown;
  error?: string;
}> {
  try {
    const userId = await getCurrentUserId();

    const userData = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        cvs: {
          include: {
            languages: true,
            skills: {
              include: {
                category: true,
              },
            },
            skillCategories: true,
            competences: true,
            interests: true,
            softSkills: true,
            experiences: true,
            education: true,
            certifications: true,
            achievements: true,
            references: true,
            deliveries: true,
            socialNetworks: true,
            otherInformation: true,
          },
        },
        accounts: true,
        sessions: true,
      },
    });

    if (!userData) {
      return {
        success: false,
        error: "Usuario no encontrado",
      };
    }

    // Remover datos sensibles
    const sanitizedData = {
      ...userData,
      password: undefined,
      accounts: userData.accounts.map((account) => ({
        ...account,
        refresh_token: undefined,
        access_token: undefined,
        id_token: undefined,
      })),
    };

    return {
      success: true,
      data: sanitizedData,
    };
  } catch (error) {
    console.error("Error exportando datos del usuario:", error);
    return {
      success: false,
      error: "Error interno del servidor",
    };
  }
}

// Función para eliminar cuenta de usuario
export async function deleteUserAccount(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const userId = await getCurrentUserId();

    // Eliminar usuario (esto eliminará automáticamente todos los CVs y datos relacionados)
    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error eliminando cuenta de usuario:", error);
    return {
      success: false,
      error: "Error interno del servidor",
    };
  }
}

// Funciones para verificación de email
import { randomBytes } from "crypto";
import { addDays } from "date-fns";

// Función para generar token de verificación
async function generateVerificationToken(email: string): Promise<string> {
  const token = randomBytes(32).toString("hex");

  // Eliminar tokens anteriores para este email
  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  // Crear nuevo token con expiración de 24 horas
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires: addDays(new Date(), 1),
    },
  });

  return token;
}

// Función para enviar email de verificación
async function sendVerificationEmail(
  email: string,
  token: string
): Promise<boolean> {
  try {
    // Importar la función de envío de email
    const { sendVerificationEmail: sendEmail } = await import("@/lib/email");
    return await sendEmail(email, token);
  } catch (error) {
    console.error("Error enviando email de verificación:", error);
    return false;
  }
}

// Función para registrar usuario con verificación de email
export async function registerUserWithEmailVerification(data: RegisterData) {
  try {
    // Validar datos de entrada
    const validatedFields = registerSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { name, email, password } = validatedFields.data;

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        errors: { email: ["Este email ya está registrado"] },
      };
    }

    // Crear hash de la contraseña
    const hashedPassword = await hashPassword(password);

    // Crear usuario sin verificar
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: null, // No verificado inicialmente
      },
    });

    // Generar token de verificación
    const verificationToken = await generateVerificationToken(email);

    // Enviar email de verificación
    const emailSent = await sendVerificationEmail(email, verificationToken);

    if (!emailSent) {
      // Si falla el envío del email, eliminar el usuario creado
      await prisma.user.delete({
        where: { id: user.id },
      });

      return {
        success: false,
        errors: { general: ["Error enviando email de verificación"] },
      };
    }

    revalidatePath("/auth/login");

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      message:
        "Usuario registrado. Por favor, verifica tu email para activar tu cuenta.",
    };
  } catch (error) {
    console.error("Error registrando usuario con verificación:", error);
    return {
      success: false,
      errors: { general: ["Error interno del servidor"] },
    };
  }
}

// Función para verificar email
export async function verifyEmail(token: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Buscar el token de verificación
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return {
        success: false,
        error: "Token de verificación inválido",
      };
    }

    // Verificar que no haya expirado
    if (verificationToken.expires < new Date()) {
      // Eliminar token expirado
      await prisma.verificationToken.delete({
        where: { token },
      });

      return {
        success: false,
        error: "Token de verificación expirado",
      };
    }

    // Buscar usuario por email
    const user = await prisma.user.findUnique({
      where: { email: verificationToken.identifier },
    });

    if (!user) {
      return {
        success: false,
        error: "Usuario no encontrado",
      };
    }

    // Verificar email del usuario
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });

    // Eliminar token usado
    await prisma.verificationToken.delete({
      where: { token },
    });

    // Inicializar CV por defecto para el usuario verificado
    await initializeDefaultCVForUser(user.id);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error verificando email:", error);
    return {
      success: false,
      error: "Error interno del servidor",
    };
  }
}

// Función para reenviar email de verificación
export async function resendVerificationEmail(email: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Verificar que el usuario existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        success: false,
        error: "Usuario no encontrado",
      };
    }

    // Verificar que el email no esté ya verificado
    if (user.emailVerified) {
      return {
        success: false,
        error: "El email ya está verificado",
      };
    }

    // Generar nuevo token de verificación
    const verificationToken = await generateVerificationToken(email);

    // Enviar email de verificación
    const emailSent = await sendVerificationEmail(email, verificationToken);

    if (!emailSent) {
      return {
        success: false,
        error: "Error enviando email de verificación",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error reenviando email de verificación:", error);
    return {
      success: false,
      error: "Error interno del servidor",
    };
  }
}

// Función para limpiar usuarios no verificados y tokens expirados
export async function cleanupUnverifiedUsers(): Promise<{
  success: boolean;
  deletedUsers: number;
  deletedTokens: number;
  error?: string;
}> {
  try {
    const now = new Date();
    const maxAge = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
    const cutoffDate = new Date(now.getTime() - maxAge);

    // Eliminar tokens expirados
    const deletedTokens = await prisma.verificationToken.deleteMany({
      where: {
        expires: {
          lt: now,
        },
      },
    });

    // Eliminar usuarios no verificados que se registraron hace más de 24 horas
    const deletedUsers = await prisma.user.deleteMany({
      where: {
        emailVerified: null,
        createdAt: {
          lt: cutoffDate,
        },
        // Solo eliminar usuarios con contraseña (no OAuth)
        password: {
          not: null,
        },
      },
    });

    console.log(
      `Limpieza completada: ${deletedUsers.count} usuarios eliminados, ${deletedTokens.count} tokens eliminados`
    );

    return {
      success: true,
      deletedUsers: deletedUsers.count,
      deletedTokens: deletedTokens.count,
    };
  } catch (error) {
    console.error("Error en limpieza de usuarios no verificados:", error);
    return {
      success: false,
      deletedUsers: 0,
      deletedTokens: 0,
      error: "Error interno del servidor",
    };
  }
}

// Función para obtener estadísticas de limpieza
export async function getCleanupStats(): Promise<{
  unverifiedUsers: number;
  expiredTokens: number;
  lastCleanup?: Date;
}> {
  try {
    const now = new Date();
    const maxAge = 24 * 60 * 60 * 1000; // 24 horas
    const cutoffDate = new Date(now.getTime() - maxAge);

    const [unverifiedUsers, expiredTokens] = await Promise.all([
      prisma.user.count({
        where: {
          emailVerified: null,
          createdAt: {
            lt: cutoffDate,
          },
          password: {
            not: null,
          },
        },
      }),
      prisma.verificationToken.count({
        where: {
          expires: {
            lt: now,
          },
        },
      }),
    ]);

    return {
      unverifiedUsers,
      expiredTokens,
    };
  } catch (error) {
    console.error("Error obteniendo estadísticas de limpieza:", error);
    return {
      unverifiedUsers: 0,
      expiredTokens: 0,
    };
  }
}
