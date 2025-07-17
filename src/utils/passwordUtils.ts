// Utilidades para manejo de contraseñas

/**
 * Analiza la fortaleza de una contraseña
 * @param password - La contraseña a analizar
 * @returns Objeto con score, feedback y color
 */
export function getPasswordStrength(password: string): {
  score: number;
  feedback: string[];
  color: string;
} {
  let score = 0;
  const feedback: string[] = [];

  // Longitud mínima
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push("Al menos 8 caracteres");
  }

  // Letras minúsculas
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Al menos una minúscula");
  }

  // Letras mayúsculas
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Al menos una mayúscula");
  }

  // Números
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push("Al menos un número");
  }

  // Caracteres especiales
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Al menos un carácter especial");
  }

  // Determinar color
  let color = "red";
  if (score >= 4) color = "green";
  else if (score >= 3) color = "yellow";
  else if (score >= 2) color = "orange";

  return { score, feedback, color };
}

/**
 * Valida si una contraseña cumple con los requisitos mínimos
 * @param password - La contraseña a validar
 * @returns true si cumple con los requisitos
 */
export function validatePasswordRequirements(password: string): boolean {
  const strength = getPasswordStrength(password);
  return strength.score >= 3; // Mínimo 3 criterios cumplidos
}

/**
 * Genera una contraseña aleatoria segura
 * @param length - Longitud de la contraseña (por defecto 12)
 * @returns Contraseña generada
 */
export function generateSecurePassword(length: number = 12): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";

  // Asegurar al menos una minúscula, mayúscula, número y carácter especial
  password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
  password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
  password += "0123456789"[Math.floor(Math.random() * 10)];
  password += "!@#$%^&*"[Math.floor(Math.random() * 8)];

  // Completar el resto de la contraseña
  for (let i = password.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  // Mezclar los caracteres
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}
