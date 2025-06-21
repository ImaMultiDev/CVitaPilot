import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Rutas que no requieren autenticación
  const publicPaths = ["/api/health"];

  // Verificar si la ruta actual es pública
  const isPublicPath = publicPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  // Verificar si ya está autenticado
  const authCookie = request.cookies.get("cvitapilot-auth");

  if (authCookie?.value === "authenticated") {
    return NextResponse.next();
  }

  // Si no está autenticado, verificar credenciales
  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [username, password] = credentials.split(":");

    // Credenciales (cambiar por las tuyas)
    const validUsername = process.env.AUTH_USERNAME || "admin";
    const validPassword = process.env.AUTH_PASSWORD || "cvitapilot2024";

    if (username === validUsername && password === validPassword) {
      // Crear respuesta con cookie de autenticación
      const response = NextResponse.next();
      response.cookies.set("cvitapilot-auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 días
      });
      return response;
    }
  }

  // Solicitar autenticación básica
  return new NextResponse("Acceso no autorizado", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="CVitaPilot"',
      "Content-Type": "text/plain",
    },
  });
}

export const config = {
  matcher: [
    /*
     * Proteger todas las rutas excepto:
     * - api/health (para monitoreo)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico
     * - archivos públicos
     */
    "/((?!api/health|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
  ],
};
