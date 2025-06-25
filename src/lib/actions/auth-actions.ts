"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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
  userId: string
): Promise<string> {
  try {
    // Datos iniciales para el nuevo usuario
    const defaultData = {
      name: "Mi CV Principal",
      userId: userId,
      isActive: true,
      personalName: "",
      position: "",
      phone: "",
      email: "",
      linkedin: "",
      website: "",
      location: "",
      aboutMe: "",
      drivingLicense: false,
      ownVehicle: false,
    };

    const cv = await prisma.cV.create({
      data: defaultData,
    });

    // Crear categorías de habilidades por defecto
    const categories = [
      "Lenguajes de Programación",
      "Frameworks",
      "Bases de Datos",
      "Herramientas",
      "Librerías",
    ];

    await Promise.all(
      categories.map((categoryName) =>
        prisma.skillCategory.create({
          data: { cvId: cv.id, name: categoryName },
        })
      )
    );

    return cv.id;
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
