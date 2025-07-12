// src/components/layout/MainLayout.tsx

import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer";
import { CVData } from "@/types/cv";

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  cvData?: CVData;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showSidebar = false,
  cvData,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16">
        {showSidebar && cvData && (
          <div className="hidden lg:block">
            <Sidebar cvData={cvData} />
          </div>
        )}
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  );
};
