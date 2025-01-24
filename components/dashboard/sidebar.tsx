// components/dashboard/sidebar.tsx
"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Clock,
  Layout,
  Settings,
  ShoppingBag,
  SquareLibrary,
  SquareTerminal,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

const routes = [
  {
    label: "Dashboard",
    icon: Layout,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Global Chat",
    icon: Layout,
    href: "/dashboard/global-chat",
    color: "text-sky-500",
  },
  {
    label: "Agents",
    icon: BarChart3,
    href: "/dashboard/agents",
    color: "text-violet-500",
  },
  {
    label: "knowledge Base",
    icon: SquareLibrary,
    href: "/dashboard/knowledge-base",
    color: "text-emerald-500",
  },
  {
    label: "Prompts",
    icon: SquareTerminal,
    href: "/dashboard/prompts",
    color: "text-orange-500",
  },
  {
    label: "Tools",
    icon: Clock,
    href: "/dashboard/tools",
    color: "text-gray-500",
  },
  {
    label: "Payments",
    icon: ShoppingBag,
    href: "/dashboard/payments",
    color: "text-pink-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-gray-500",
  },
];

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-40 w-64 h-screen transition-transform lg:translate-x-0",
        !isOpen && "-translate-x-full"
      )}
    >
      <div className="h-full px-3 py-4 bg-white dark:bg-gray-900 border-r dark:border-gray-700 transition-colors duration-200">
        <div className="mb-8 px-4">
          <Link
            href="/dashboard"
            className="font-bold text-2xl text-gray-900 dark:text-white"
          >
            AI Platform
          </Link>
        </div>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition-colors",
                pathname === route.href
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
