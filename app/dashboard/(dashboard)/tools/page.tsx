// app/(dashboard)/tools/page.tsx
"use client";

import { useState } from "react";
import { ToolCard } from "@/components/tools/toolCard";
import { SearchTools } from "@/components/tools/searchTools";
import { ToolsHeader } from "@/components/tools/toolsHeader";

const tools = [
  {
    title: "Web Scraper",
    description:
      "Extract and utilize powerful AI tools to enhance productivity and performance. Choose a tool to perform tasks like web scraping, intelligent search, SEO optimization, and more",
    icon: "web-scraper" as const,
  },
  {
    title: "Web Search",
    description:
      "Perform intelligent web searches to retrieve accurate and relevant information quickly. Designed to save time by providing concise, filtered results.",
    icon: "web-search" as const,
  },
  {
    title: "SEO Audit Report",
    description:
      "Generate comprehensive SEO reports to evaluate your website's performance. Identify strengths, weaknesses, and actionable recommendations for improvement.",
    icon: "seo-report" as const,
  },
  {
    title: "Coming Soon",
    description:
      "New tools and features are being developed and will be available soon.",
    icon: "coming-soon" as const,
    isComingSoon: true,
  },
];

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter(
    (tool) =>
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <ToolsHeader />

      <SearchTools onSearch={setSearchQuery} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.title}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            isComingSoon={tool.isComingSoon}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
