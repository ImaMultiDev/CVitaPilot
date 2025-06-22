import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
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
    session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  providers: [], // Se añadirán en auth.ts
} satisfies NextAuthConfig;
