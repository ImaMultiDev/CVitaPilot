import { MainLayout } from "@/components/layout/MainLayout";
import { FAQPage } from "@/views/FAQ";

export default function FAQ() {
  return (
    <MainLayout showSidebar={false}>
      <FAQPage />
    </MainLayout>
  );
}

export const metadata = {
  title: "Preguntas Frecuentes | CVitaPilot",
  description:
    "Encuentra respuestas a las preguntas más frecuentes sobre CVitaPilot. Aprende a usar todas las funciones y resuelve tus dudas.",
  keywords: "FAQ, preguntas frecuentes, CVitaPilot, ayuda, soporte, dudas",
};
