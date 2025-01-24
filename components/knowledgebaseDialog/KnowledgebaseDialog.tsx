"use client";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, Upload, Globe, Link2 } from "lucide-react";

interface CreateKnowledgeBaseDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

type OptionType = {
  title: string;
  description: string;
  icon: React.ReactNode;
  type: "scratch" | "upload" | "website" | "integration";
  onClick: () => void;
};

const CreateKnowledgeBaseDialog: React.FC<CreateKnowledgeBaseDialogProps> = ({
  open,
  setOpen,
}) => {
  const router = useRouter();

  const handleOptionClick = (type: OptionType["type"]) => {
    setOpen(false);
    router.push(`/dashboard/knowledge-base/create-knowledgebase?type=${type}`);
  };

  const options: OptionType[] = [
    {
      title: "Build from Scratch",
      description: "Blank - Start with an Empty Table",
      icon: <PlusCircle className="w-5 h-5" />,
      type: "scratch",
      onClick: () => handleOptionClick("scratch"),
    },
    {
      title: "Upload Your Files",
      description: "Upload File - CSV, Excel, JSON, PDF, or Audio",
      icon: <Upload className="w-5 h-5" />,
      type: "upload",
      onClick: () => handleOptionClick("upload"),
    },
    {
      title: "Extract from a Website",
      description: "Import from Website - Extract Content from a Website",
      icon: <Globe className="w-5 h-5" />,
      type: "website",
      onClick: () => handleOptionClick("website"),
    },
    {
      title: "Integrate with Third-Party Tools",
      description: "Integrations - Import Data from Third-Party Services",
      icon: <Link2 className="w-5 h-5" />,
      type: "integration",
      onClick: () => handleOptionClick("integration"),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          size="lg"
        >
          Create Knowledge Base
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">
            Create Knowledge Base
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          {options.map((option, index) => (
            <Card
              key={index}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              onClick={option.onClick}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  {option.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{option.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {option.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateKnowledgeBaseDialog;
