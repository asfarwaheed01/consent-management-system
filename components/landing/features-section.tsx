// components/landing/features-section.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Code, Image, MessageSquare } from "lucide-react";

const features = [
  {
    title: "AI Chat Assistant",
    description:
      "Engage in natural conversations with our advanced AI chatbot.",
    icon: MessageSquare,
  },
  {
    title: "Image Generation",
    description: "Create stunning visuals with our AI-powered image generator.",
    icon: Image,
  },
  {
    title: "Code Generation",
    description:
      "Generate clean, efficient code in multiple programming languages.",
    icon: Code,
  },
  {
    title: "Smart Analytics",
    description: "Gain insights from your data with AI-powered analytics.",
    icon: Brain,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-black font-bold text-center mb-12">
          Powerful AI Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardHeader>
                <feature.icon className="w-12 h-12 mb-4 text-purple-600" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
