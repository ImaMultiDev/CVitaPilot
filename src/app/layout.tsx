// src/app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CVProvider, ThemeProvider, TutorialProvider } from "@/contexts";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { auth } from "@/auth";
import "./globals.css";
import "../utils/printOptimization.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CVitaPilot - Generador Profesional de CVs",
    template: "%s | CVitaPilot",
  },
  description:
    "Aplicación profesional para crear, personalizar y gestionar múltiples versiones de tu CV con formatos duales: Visual para reclutadores humanos y ATS para sistemas automáticos. Desarrollada con Next.js 15, Prisma y PostgreSQL.",
  keywords: [
    "curriculum vitae",
    "CV profesional",
    "generador CV",
    "ATS optimizado",
    "formato ATS",
    "CV visual",
    "plantillas CV",
    "crear curriculum",
    "trabajo",
    "empleo",
    "carrera profesional",
    "reclutamiento",
    "búsqueda empleo",
    "portfolio profesional",
  ],
  authors: [
    {
      name: "Imanol Mugueta Unsain",
      url: "https://imamultidev.dev",
    },
  ],
  creator: "Imanol Mugueta Unsain",
  publisher: "ImaMultiDev",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://cvitapilot.com",
    siteName: "CVitaPilot",
    title: "CVitaPilot - Generador Profesional de CVs",
    description:
      "Crea CVs profesionales con formatos duales: Visual para reclutadores y ATS para sistemas automáticos. Gestiona múltiples versiones de tu curriculum vitae.",
    images: [
      {
        url: "/logo_512.png",
        width: 512,
        height: 512,
        alt: "CVitaPilot - Generador de CVs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CVitaPilot - Generador Profesional de CVs",
    description:
      "Crea CVs profesionales con formatos duales: Visual para reclutadores y ATS para sistemas automáticos.",
    images: ["/logo_512.png"],
  },
  alternates: {
    canonical: "https://cvitapilot.com",
  },
  category: "productivity",
  applicationName: "CVitaPilot",
  appleWebApp: {
    capable: true,
    title: "CVitaPilot",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f5f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Obtener sesión del servidor para hidratación inicial
  const session = await auth();

  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="192x192" href="/logo_128x128.png" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="application-name" content="CVitaPilot" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <ThemeProvider>
            <TutorialProvider>
              <CVProvider>{children}</CVProvider>
            </TutorialProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
