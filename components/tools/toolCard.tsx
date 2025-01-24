// components/tools/tool-card.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FileText, Globe, LineChart } from "lucide-react";
import Link from "next/link";

interface ToolCardProps {
  title: string;
  description: string;
  icon: "web-scraper" | "web-search" | "seo-report" | "coming-soon";
  isComingSoon?: boolean;
}

const iconMap = {
  "web-scraper": FileText,
  "web-search": Globe,
  "seo-report": LineChart,
  "coming-soon": FileText,
};

export function ToolCard({
  title,
  description,
  icon,
  isComingSoon,
}: ToolCardProps) {
  const Icon = iconMap[icon];

  return (
    <Card className="bg-gray-50 dark:bg-gray-800 border-0">
      <CardHeader>
        <div className="w-10 h-10 flex items-center justify-center">
          <Icon className="h-8 w-8 text-gray-600 dark:text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </CardContent>
      <CardFooter>
        {!isComingSoon ? (
          <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white">
            <Link href={`/tools/${title.toLowerCase().replace(/\s+/g, "-")}`}>
              Use Tool
            </Link>
          </Button>
        ) : (
          <div className="text-sm text-gray-500">Coming Soon</div>
        )}
      </CardFooter>
    </Card>
  );
}
