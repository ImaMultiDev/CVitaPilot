import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import authConfig from "./auth.config";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

// Configuración extendida para el backend con funcionalidad completa de Prisma
const backendConfig = {
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" as const },
  callbacks: {
    ...authConfig.callbacks,
    // Callback de session extendido para el backend
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        // Obtener la imagen actualizada de la base de datos
        try {
          const user = await prisma.user.findUnique({
            where: { email: token.email },
            select: { image: true },
          });
          // Priorizar la imagen de la base de datos sobre la de OAuth
          if (user?.image) {
            session.user.image = user.image;
          }
        } catch (error) {
          console.error("Error obteniendo imagen del usuario:", error);
        }
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(backendConfig);

// Función helper para obtener la sesión del usuario
export async function getCurrentUser() {
  const session = await auth();
  return session?.user || null;
}

// Función helper para crear hash de contraseña
export async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import("bcryptjs");
  return bcrypt.hash(password, 12);
}
