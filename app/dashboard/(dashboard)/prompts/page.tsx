"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Users,
  PenTool,
  Target,
  ShoppingCart,
  LineChart,
  Trash2,
  Edit,
  Copy,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  description: string;
}

interface Prompt {
  id: string;
  title: string;
  category: string;
  description: string;
  usage: number;
  rating: number;
  tags: string[];
  lastUsed: string;
}

const categories: Category[] = [
  {
    id: "customer-service",
    name: "Customer Service",
    icon: <Users className="w-4 h-4" />,
    count: 28,
    description:
      "Prompts for customer support, feedback, and service improvement",
  },
  {
    id: "content-creation",
    name: "Content Creation",
    icon: <PenTool className="w-4 h-4" />,
    count: 45,
    description: "Content writing, blog posts, and social media prompts",
  },
  {
    id: "lead-generation",
    name: "Lead Generation",
    icon: <Target className="w-4 h-4" />,
    count: 32,
    description: "Sales, marketing, and lead nurturing prompts",
  },
  {
    id: "ecommerce",
    name: "E-commerce Optimization",
    icon: <ShoppingCart className="w-4 h-4" />,
    count: 36,
    description: "Product descriptions, sales copy, and conversion prompts",
  },
  {
    id: "seo-analytics",
    name: "SEO and Analytics",
    icon: <LineChart className="w-4 h-4" />,
    count: 24,
    description: "SEO optimization and data analysis prompts",
  },
];

const prompts: Prompt[] = [
  {
    id: "1",
    title: "Customer Satisfaction Survey",
    category: "customer-service",
    description:
      "Generate personalized customer satisfaction surveys based on recent interactions and purchase history.",
    usage: 1289,
    rating: 4.8,
    tags: ["survey", "feedback", "customer experience"],
    lastUsed: "5 minutes ago",
  },
  {
    id: "2",
    title: "Blog Post Generator",
    category: "content-creation",
    description:
      "Create engaging blog post outlines and content based on target keywords and audience preferences.",
    usage: 2456,
    rating: 4.9,
    tags: ["blog", "content", "SEO"],
    lastUsed: "2 hours ago",
  },
  {
    id: "3",
    title: "Sales Email Sequence",
    category: "lead-generation",
    description:
      "Generate personalized sales email sequences for different customer segments and industries.",
    usage: 1876,
    rating: 4.7,
    tags: ["sales", "email", "automation"],
    lastUsed: "1 hour ago",
  },
  {
    id: "4",
    title: "Product Description Optimizer",
    category: "ecommerce",
    description:
      "Create compelling product descriptions that highlight key features and benefits for better conversion.",
    usage: 3421,
    rating: 4.9,
    tags: ["product", "copywriting", "conversion"],
    lastUsed: "30 minutes ago",
  },
  {
    id: "5",
    title: "SEO Meta Description Generator",
    category: "seo-analytics",
    description:
      "Generate optimized meta descriptions for better search engine visibility and click-through rates.",
    usage: 2198,
    rating: 4.6,
    tags: ["SEO", "meta tags", "optimization"],
    lastUsed: "15 minutes ago",
  },
];

export default function PromptsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categorySearch, setCategorySearch] = useState("");
  const [promptSearch, setPromptSearch] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredPrompts = prompts.filter(
    (prompt) =>
      (selectedCategory ? prompt.category === selectedCategory : true) &&
      prompt.title.toLowerCase().includes(promptSearch.toLowerCase())
  );

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="mb-8 dark:border-[1px] dark:border-white bg-gray-900 text-white p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-4 font-mono">
          Manage Your Prompts
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          Create, organize, and optimize your AI prompts. Build a powerful
          collection of prompts for different use cases and improve your
          workflow efficiency.
        </p>
        <Button
          className="bg-white text-gray-900 hover:bg-gray-100"
          size="lg"
          onClick={() => router.push("/dashboard/prompts/create-prompt")}
        >
          Create New Prompt
        </Button>
      </div>

      {/* Search Section */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="relative md:w-1/4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search categories..."
            className="pl-9 w-full"
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
          />
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search prompts..."
            className="pl-9 w-full"
            value={promptSearch}
            onChange={(e) => setPromptSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Categories Sidebar */}
        <div className="md:w-1/4 flex flex-col gap-2">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-col gap-2">
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  {category.icon}
                  <div className="text-left">
                    <span className="block">{category.name}</span>
                    <span className="text-xs text-gray-500">
                      {category.description}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Prompts Section */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-4">
            {filteredPrompts.map((prompt) => (
              <Card
                key={prompt.id}
                className="hover:shadow-lg transition-shadow flex-[1_1_300px] max-w-[400px]"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold">{prompt.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm">{prompt.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {prompt.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {prompt.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>Used: {prompt.usage.toLocaleString()} times</span>
                    <span>Last used: {prompt.lastUsed}</span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="Copy prompt">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Edit prompt">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Delete prompt">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
