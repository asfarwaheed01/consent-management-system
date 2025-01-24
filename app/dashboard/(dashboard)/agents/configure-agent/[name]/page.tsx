"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Key, Bot, Database, MessageSquare } from "lucide-react";

const agentSchema = z.object({
  providerName: z.enum(["openai", "gemini", "llama"], {
    required_error: "Please select an AI provider",
  }),
  apiKey: z.string().min(1, "API Key is required"),
  uploadedData: z.any().optional(),
  prompt: z.string().optional(),
  useKnowledgeBase: z.boolean().default(false),
  selectedKnowledgeBase: z.array(z.string()).optional(),
  useTemplatePrompt: z.boolean().default(false),
  selectedPromptTemplate: z.array(z.string()).optional(),
});

type AgentFormValues = z.infer<typeof agentSchema>;

// Sample knowledge bases and prompt templates
const knowledgeBases = [
  { id: "kb1", name: "General Knowledge" },
  { id: "kb2", name: "Technical Documentation" },
  { id: "kb3", name: "Customer Support" },
  { id: "kb4", name: "Product Information" },
];

const promptTemplates = [
  { id: "pt1", name: "Customer Service Bot" },
  { id: "pt2", name: "Technical Support Agent" },
  { id: "pt3", name: "Sales Assistant" },
  { id: "pt4", name: "Documentation Helper" },
];

const CreateAgentPage = () => {
  const params = useParams();
  const agentName = params.agentName;

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AgentFormValues>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      useKnowledgeBase: false,
      useTemplatePrompt: false,
    },
  });

  const useKnowledgeBase = watch("useKnowledgeBase");
  const useTemplatePrompt = watch("useTemplatePrompt");

  const onSubmit = async (data: AgentFormValues) => {
    try {
      console.log("Form data:", data);
      // Add your API call here
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Bot className="w-6 h-6" />
            Configure Agent: {agentName}
          </CardTitle>
          <CardDescription>
            Set up your AI agent by configuring the provider and additional
            settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Provider Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Key className="w-4 h-4" />
                Provider
              </label>
              <Controller
                name="providerName"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select AI Provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="gemini">Gemini</SelectItem>
                      <SelectItem value="llama">Llama</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.providerName && (
                <p className="text-sm text-red-500">
                  {errors.providerName.message}
                </p>
              )}
            </div>

            {/* API Key */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Key className="w-4 h-4" />
                API Key
              </label>
              <Input
                type="password"
                placeholder="Enter your API key"
                {...register("apiKey")}
              />
              {errors.apiKey && (
                <p className="text-sm text-red-500">{errors.apiKey.message}</p>
              )}
            </div>

            {/* Data Upload */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Training Data
                </label>
                <Input
                  type="file"
                  accept=".txt,.pdf,.doc,.docx"
                  {...register("uploadedData")}
                />
              </div>

              {/* Knowledge Base Checkbox */}
              <div className="flex items-center space-x-2">
                <Controller
                  name="useKnowledgeBase"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="useKnowledgeBase"
                    />
                  )}
                />
                <label
                  htmlFor="useKnowledgeBase"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Database className="w-4 h-4" />
                  Import Knowledge Base
                </label>
              </div>

              {/* Knowledge Base Selection */}
              {useKnowledgeBase && (
                <div className="ml-6">
                  <Controller
                    name="selectedKnowledgeBase"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => field.onChange([value])}
                        defaultValue={field.value?.[0]}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Knowledge Base" />
                        </SelectTrigger>
                        <SelectContent>
                          {knowledgeBases.map((kb) => (
                            <SelectItem key={kb.id} value={kb.id}>
                              {kb.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              )}
            </div>

            {/* Prompt Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Custom Prompt
                </label>
                <Textarea
                  placeholder="Enter your custom prompt"
                  className="min-h-[100px]"
                  {...register("prompt")}
                />
              </div>

              {/* Template Prompt Checkbox */}
              <div className="flex items-center space-x-2">
                <Controller
                  name="useTemplatePrompt"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="useTemplatePrompt"
                    />
                  )}
                />
                <label
                  htmlFor="useTemplatePrompt"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Use Template Prompt
                </label>
              </div>

              {/* Prompt Template Selection */}
              {useTemplatePrompt && (
                <div className="ml-6">
                  <Controller
                    name="selectedPromptTemplate"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => field.onChange([value])}
                        defaultValue={field.value?.[0]}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Prompt Template" />
                        </SelectTrigger>
                        <SelectContent>
                          {promptTemplates.map((pt) => (
                            <SelectItem key={pt.id} value={pt.id}>
                              {pt.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                </div>
              ) : (
                "Create Agent"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAgentPage;
