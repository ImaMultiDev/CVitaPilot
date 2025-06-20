import { GuiaCVPage } from "@/components/guia/GuiaCVPage";
import { MainLayout } from "@/components/layout";

export default function GuiaCVPageRoute() {
  return (
    <MainLayout showSidebar={false}>
      <GuiaCVPage />
    </MainLayout>
  );
}

export const metadata = {
  title: "Guía del CV Perfecto | CV Manager",
  description:
    "Aprende a crear un CV perfecto que supere los sistemas ATS, cómo escribir cartas de presentación efectivas y obtén consejos profesionales para destacar en tu búsqueda de empleo.",
  keywords:
    "CV perfecto, ATS, carta de presentación, Eva Porto, consejos CV, búsqueda empleo",
};
