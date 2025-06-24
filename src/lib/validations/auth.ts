import { z } from "zod";

// Regex para validación de email más estricta
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Regex para validación de contraseña segura
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&.#-_+=]{8,50}$/;

// Regex para validación de nombre (solo letras, espacios y acentos)
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{2,100}$/;

// Schema de validación para registro
export const registerSchema = z
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
      .refine((email) => !email.includes(" "), {
        message: "El email no puede contener espacios",
      })
      .refine(
        (email) => {
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
export const loginSchema = z.object({
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

// Tipos TypeScript derivados de los schemas
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

// Función helper para validar fortaleza de contraseña en tiempo real
export function getPasswordStrength(password: string): {
  score: number;
  feedback: string[];
  level: "weak" | "medium" | "strong";
} {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push("Debe tener al menos 8 caracteres");
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Debe incluir al menos una letra minúscula");
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Debe incluir al menos una letra mayúscula");
  }

  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push("Debe incluir al menos un número");
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
    feedback.push("¡Excelente! Incluye caracteres especiales");
  }

  let level: "weak" | "medium" | "strong" = "weak";
  if (score >= 4) level = "strong";
  else if (score >= 3) level = "medium";

  return { score, feedback, level };
}
