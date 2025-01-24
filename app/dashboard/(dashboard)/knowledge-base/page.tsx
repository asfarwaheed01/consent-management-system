"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  FileText,
  Files,
  Users,
  HelpCircle,
  Book,
  GraduationCap,
  Trash2,
  Edit,
} from "lucide-react";
import CreateKnowledgeBaseDialog from "@/components/knowledgebaseDialog/KnowledgebaseDialog";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

interface KnowledgeBase {
  id: string;
  title: string;
  category: string;
  description: string;
  filesCount: number;
  lastUpdated: string;
}

const categories: Category[] = [
  {
    id: "product-docs",
    name: "Product Documentation",
    icon: <FileText className="w-4 h-4" />,
    count: 15,
  },
  {
    id: "company-policies",
    name: "Company Policies",
    icon: <Files className="w-4 h-4" />,
    count: 32,
  },
  {
    id: "customer-faqs",
    name: "Customer FAQs",
    icon: <HelpCircle className="w-4 h-4" />,
    count: 4,
  },
  {
    id: "technical-docs",
    name: "Technical Documentation",
    icon: <Book className="w-4 h-4" />,
    count: 12,
  },
  {
    id: "training",
    name: "Training Resources",
    icon: <GraduationCap className="w-4 h-4" />,
    count: 8,
  },
];

const knowledgeBases: KnowledgeBase[] = [
  {
    id: "1",
    title: "User Manuals",
    category: "product-docs",
    description:
      "Detailed user guides and manuals for all company products. Covers troubleshooting, installation, and usage tips.",
    filesCount: 24,
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    title: "User Manuals",
    category: "company-policies",
    description:
      "Detailed user guides and manuals for all company products. Covers troubleshooting, installation, and usage tips.",
    filesCount: 24,
    lastUpdated: "2 hours ago",
  },
  {
    id: "3",
    title: "User Manuals",
    category: "customer-faqs",
    description:
      "Detailed user guides and manuals for all company products. Covers troubleshooting, installation, and usage tips.",
    filesCount: 24,
    lastUpdated: "2 hours ago",
  },
  {
    id: "4",
    title: "User Manuals",
    category: "technical-docs",
    description:
      "Detailed user guides and manuals for all company products. Covers troubleshooting, installation, and usage tips.",
    filesCount: 24,
    lastUpdated: "2 hours ago",
  },
  // Add more knowledge bases as needed
];

export default function KnowledgeBasePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categorySearch, setCategorySearch] = useState("");
  const [kbSearch, setKbSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredKnowledgeBases = knowledgeBases.filter(
    (kb) =>
      (selectedCategory ? kb.category === selectedCategory : true) &&
      kb.title.toLowerCase().includes(kbSearch.toLowerCase())
  );

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="mb-8 bg-gray-900 dark:border-white dark:border-[1px] text-white p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-4 font-mono">
          Manage Your Knowledge Bases
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          Organize, upload, and access your knowledge effortlessly. Create new
          bases or update existing ones to keep your information centralized and
          up to date.
        </p>
        <Button
          className="bg-white text-gray-900 hover:bg-gray-100"
          size="lg"
          onClick={() => setIsDialogOpen(true)}
        >
          Create Knowledge Base
        </Button>
      </div>

      {/* Search Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search categories..."
            className="pl-9"
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
          />
        </div>
        <div className="relative md:col-span-3">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search knowledge base..."
            className="pl-9"
            value={kbSearch}
            onChange={(e) => setKbSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
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
                <span>{category.name}</span>
              </div>
              <span className="text-sm text-gray-500">{category.count}</span>
            </button>
          ))}
        </div>

        {/* Knowledge Base Grid */}
        <div className="md:col-span-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredKnowledgeBases.map((kb) => (
            <Card key={kb.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{kb.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {kb.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Files: {kb.filesCount}</span>
                  <span>Last updated: {kb.lastUpdated}</span>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {isDialogOpen && (
          <CreateKnowledgeBaseDialog
            open={isDialogOpen}
            setOpen={setIsDialogOpen}
          />
        )}
      </div>
    </div>
  );
}
