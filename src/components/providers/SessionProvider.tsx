"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";

interface SessionProviderProps {
  children: ReactNode;
  session?: Session | null;
}

export function SessionProvider({ children, session }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider
      session={session}
      // Configurar para reducir frecuencia de verificación
      refetchInterval={5 * 60} // 5 minutos
      refetchOnWindowFocus={true}
    >
      {children}
    </NextAuthSessionProvider>
  );
}
