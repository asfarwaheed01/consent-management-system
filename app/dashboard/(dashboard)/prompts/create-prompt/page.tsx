"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";

const CreatePromptPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    promptText: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className=" p-6">
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Pencil className="w-6 h-6" />
          Create Prompt
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create a new prompt by entering the details below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Prompt Title
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a descriptive name (e.g. Medical Research)"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer-service">
                  Customer Service
                </SelectItem>
                <SelectItem value="content-creation">
                  Content Creation
                </SelectItem>
                <SelectItem value="lead-generation">Lead Generation</SelectItem>
                <SelectItem value="seo">SEO & Analytics</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder='Briefly explain the prompt&apos;s purpose (e.g., "Generates engaging introductions for blog posts," "Drafts professional email replies")'
            className="min-h-[100px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Prompt Text</label>
          <Textarea
            name="promptText"
            value={formData.promptText}
            onChange={handleChange}
            placeholder='Write your prompt here. Use double curly braces {{variable_name}} for variables. (Example: "Summarize this: {{text}}")'
            className="min-h-[200px] font-mono"
          />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Save Prompt</Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePromptPage;
