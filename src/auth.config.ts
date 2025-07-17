import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import { z } from "zod";
import bcrypt from "bcryptjs";

// Schema de validación para login
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export default {
  // Configurar la URL base para NextAuth
  basePath: "/api/auth",
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
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
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid profile email",
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
          const { prisma } = await import("@/lib/prisma");
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            return null;
          }

          // Verificar que el email esté verificado (solo para usuarios con contraseña)
          if (!user.emailVerified) {
            throw new Error("EMAIL_NOT_VERIFIED");
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
          if (
            error instanceof Error &&
            error.message === "EMAIL_NOT_VERIFIED"
          ) {
            throw error;
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAuthPage = nextUrl.pathname.startsWith("/auth");
      const isOnPublicPath = [
        "/api/health",
        "/manifest.json",
        "/robots.txt",
        "/sitemap.xml",
      ].some((path) => nextUrl.pathname.startsWith(path));

      // Permitir acceso a archivos estáticos y públicos
      if (isOnPublicPath) {
        return true;
      }

      // Si está en página de auth y ya está logueado, redirigir al dashboard
      if (isOnAuthPage) {
        if (isLoggedIn) return Response.redirect(new URL("/", nextUrl));
        return true;
      }

      // Si no está logueado y trata de acceder a rutas protegidas
      if (!isLoggedIn && !isOnAuthPage) {
        return false;
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email!;
        token.name = user.name || user.email!;
      }
      return token;
    },
    // Callback de session simplificado para Edge compatibility
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
    async signIn({ user, account, profile: _profile }) {
      if (account?.provider === "google" || account?.provider === "linkedin") {
        try {
          // Verificar si el usuario ya existe
          const { prisma } = await import("@/lib/prisma");
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            // El usuario se creará automáticamente por el adapter
            // No podemos crear el CV aquí porque el usuario aún no existe
            // Lo manejaremos en el callback de session
            console.log(
              `Usuario OAuth nuevo detectado: ${user.email} (${account.provider})`
            );
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
} satisfies NextAuthConfig;
