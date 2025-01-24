"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Plus, Search, Settings2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

// Sample agents data
const agents = [
  {
    id: 1,
    name: "Customer Support Agent",
    description: "Handles customer inquiries and provides support",
    status: "Active",
    type: "Support",
    tasks_completed: 1234,
  },
  {
    id: 2,
    name: "Data Analysis Agent",
    description: "Processes and analyzes data sets for insights",
    status: "Active",
    type: "Analytics",
    tasks_completed: 856,
  },
  {
    id: 3,
    name: "Content Writer",
    description: "Generates and optimizes content for various platforms",
    status: "Inactive",
    type: "Content",
    tasks_completed: 432,
  },
  // Add more sample agents as needed
];

export default function AgentsPage() {
  const router = useRouter();

  const handleConfigureClick = (agentName: string) => {
    const urlSafeName = agentName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/dashboard/agents/configure-agent/${urlSafeName}`);
  };

  const handleCreateClick = () => {
    router.push(`/dashboard/agents/create-agent`);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gray-900 p-8 rounded-lg">
        <h1 className="text-2xl font-bold text-white mb-2">
          Manage Your AI Agents
        </h1>
        <p className="text-gray-300 mb-4">
          View, create, and manage AI agents to automate tasks and provide
          intelligent solutions. Customize agent behavior and connect knowledge
          bases effortlessly.
        </p>
        <Button
          className="bg-white text-gray-900 hover:bg-gray-100"
          onClick={handleCreateClick}
        >
          <Plus className="mr-2 h-4 w-4" /> Add a New AI Agent
        </Button>
      </div>

      {/* Search Section */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          placeholder="Search agents..."
          className="pl-10 bg-white dark:bg-gray-800"
        />
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="border bg-white dark:bg-gray-800">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold text-lg">{agent.name}</h3>
                    <Badge
                      variant={
                        agent.status === "Active" ? "default" : "secondary"
                      }
                      className="mt-1"
                    >
                      {agent.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {agent.description}
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Type:
                  </span>
                  <span className="font-medium">{agent.type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Tasks Completed:
                  </span>
                  <span className="font-medium">
                    {agent.tasks_completed.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleConfigureClick(agent.name)}
              >
                <Settings2 className="h-4 w-4 mr-1" /> Configure
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
