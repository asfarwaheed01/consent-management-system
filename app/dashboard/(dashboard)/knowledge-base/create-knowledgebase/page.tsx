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
import { X, Upload } from "lucide-react";

interface FileWithPreview extends File {
  preview?: string;
}

interface UploadedFile {
  file: FileWithPreview;
  progress: number;
}

const CreateKnowledgeBasePage = () => {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        file,
        progress: 100, // Simulated progress for now
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files).map((file) => ({
      file,
      progress: 100, // Simulated progress
    }));
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  return (
    <div className=" p-6">
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold mb-2">Create Knowledge Base</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add a new knowledge base by entering the details below.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Knowledge Base Name
          </label>
          <Input
            placeholder="Enter a descriptive name (e.g. Medical Research)"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medical">Medical Research</SelectItem>
              <SelectItem value="technical">Technical Documentation</SelectItem>
              <SelectItem value="legal">Legal Documents</SelectItem>
              <SelectItem value="financial">Financial Reports</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            placeholder='Briefly describe the content of this knowledge base (e.g., "Contains research papers on cardiology")'
            className="min-h-[100px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Upload Supporting Files
          </label>
          <div
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-primary font-semibold">
                  Drag & Drop or choose file to upload
                </span>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileUpload}
                  accept=".pdf,.docx,.xlsx,.txt"
                />
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Supported formats: .pdf, .docx, .xlsx, .txt
              </p>
            </div>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadedFiles.map((uploadedFile, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-sm">
                      <p className="font-medium">{uploadedFile.file.name}</p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {Math.round(uploadedFile.file.size / 1024)} kb
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button>Save Knowledge Base</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateKnowledgeBasePage;
