// src/components/layout/MainLayout.tsx

import { CVProvider } from "@/contexts/CVContext";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showSidebar = false,
}) => {
  return (
    <CVProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex">
          {showSidebar && (
            <div className="hidden lg:block">
              <Sidebar />
            </div>
          )}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </CVProvider>
  );
};
