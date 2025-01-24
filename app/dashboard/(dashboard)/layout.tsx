// app/(dashboard)/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/themeprovider/theme-provider";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FullscreenLoader } from "@/components/LoadingComponent/LoadingComponent";
import { getAccessToken } from "@/utils/constants";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const accessToken = getAccessToken();
  const { isAuthenticated, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !accessToken) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-gray-900">
        <FullscreenLoader text="Preparing your dashboard..." />
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Sidebar isOpen={isSidebarOpen} />
        <main
          className={cn(
            "pt-16 transition-all duration-200",
            isSidebarOpen ? "lg:pl-64" : ""
          )}
        >
          <div className="px-4 py-8">{children}</div>
        </main>
      </div>
    </ThemeProvider>
  );
}
