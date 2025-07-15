import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuración",
  description: "Configuración y utilidades de CVitaPilot",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
