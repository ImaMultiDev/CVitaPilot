import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    /*
     * Proteger todas las rutas excepto:
     * - Rutas de Auth.js (/api/auth/*)
     * - Rutas públicas (/auth/*)
     * - API de salud (/api/health)
     * - Páginas legales (/legal/*)
     * - Archivos estáticos
     */
    "/((?!api/auth|api/health|auth|legal|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
  ],
};
