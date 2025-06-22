import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    /*
     * Proteger todas las rutas excepto:
     * - Rutas de Auth.js (/api/auth/*)
     * - Rutas públicas (/auth/*)
     * - API de salud (/api/health)
     * - Archivos estáticos
     */
    "/((?!api/auth|api/health|auth|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
  ],
};
