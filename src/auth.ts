import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "./auth.config";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";

// Schema de validación para login
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@cvitapilot.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          // Validar datos de entrada
          const validatedFields = loginSchema.safeParse(credentials);

          if (!validatedFields.success) {
            return null;
          }

          const { email, password } = validatedFields.data;

          // Buscar usuario en la base de datos
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            return null;
          }

          // Verificar contraseña
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return {
              id: user.id,
              name: user.name || user.email, // Asegurar que name no sea null
              email: user.email,
            };
          }

          return null;
        } catch (error) {
          console.error("Error en autorización:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Verificar si el usuario ya existe
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            // Crear CV inicial para usuario de Google
            const { initializeDefaultCVForUser } = await import(
              "@/lib/actions/auth-actions"
            );

            // El usuario se creará automáticamente por el adapter
            // Pero necesitamos crear su CV inicial después
            setTimeout(async () => {
              try {
                const newUser = await prisma.user.findUnique({
                  where: { email: user.email! },
                });
                if (newUser) {
                  await initializeDefaultCVForUser(newUser.id);
                }
              } catch (error) {
                console.error(
                  "Error creando CV inicial para usuario OAuth:",
                  error
                );
              }
            }, 1000);
          }

          return true;
        } catch (error) {
          console.error("Error en signIn callback:", error);
          return false;
        }
      }

      return true;
    },
  },
});

// Función helper para obtener la sesión del usuario
export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

// Función helper para crear hash de contraseña
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}
