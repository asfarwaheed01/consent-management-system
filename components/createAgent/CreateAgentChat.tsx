"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";

// Types for messages and questions
type MessageType = {
  id: string;
  type: "bot" | "user";
  content: string | React.ReactNode;
  inputType?: "text" | "select";
  options?: { value: string; label: string }[];
  completed?: boolean;
};

type QuestionType = {
  id: string;
  content: string;
  inputType: "text" | "select";
  options?: { value: string; label: string }[];
};

// Sample data arrays
const SAMPLE_KNOWLEDGE_BASES = [
  { value: "kb1", label: "General Knowledge" },
  { value: "kb2", label: "Technical Documentation" },
  { value: "kb3", label: "Customer Support" },
];

const SAMPLE_PROMPTS = [
  { value: "p1", label: "Friendly Assistant" },
  { value: "p2", label: "Technical Expert" },
  { value: "p3", label: "Creative Writer" },
];

const CreateAgentChat = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  console.log(responses);

  const questions: QuestionType[] = useMemo(
    () => [
      {
        id: "name",
        content: "What would you like to name your AI agent?",
        inputType: "text",
      },
      {
        id: "purpose",
        content: "What's the main purpose of this agent?",
        inputType: "text",
      },
      {
        id: "knowledge",
        content: "Select a knowledge base for your agent:",
        inputType: "select",
        options: SAMPLE_KNOWLEDGE_BASES,
      },
      {
        id: "prompt",
        content: "Choose a base personality template:",
        inputType: "select",
        options: SAMPLE_PROMPTS,
      },
    ],
    [] // Add dependencies here if needed
  );

  const addBotMessage = (question: QuestionType) => {
    setMessages((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type: "bot",
        content: question.content,
        inputType: question.inputType,
        options: question.options,
      },
    ]);
  };

  const addUserMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type: "user",
        content,
        completed: true,
      },
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (showChat && messages.length === 0 && questions.length > 0) {
      addBotMessage(questions[0]);
    }
    scrollToBottom();
  }, [messages, showChat, questions]);

  const handleQuestionResponse = (questionId: string, response: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: response,
    }));
  };

  const handleSubmit = (value: string) => {
    if (!value.trim()) return;

    const currentQuestion = questions[currentQuestionIndex];
    handleQuestionResponse(currentQuestion.id, value);

    let displayContent = value;
    if (currentQuestion.inputType === "select" && currentQuestion.options) {
      const selectedOption = currentQuestion.options.find(
        (opt) => opt.value === value
      );
      displayContent = selectedOption?.label || value;
    }

    addUserMessage(displayContent);
    setCurrentInput("");
    setIsWaitingForResponse(true);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        addBotMessage(questions[currentQuestionIndex + 1]);
        setIsWaitingForResponse(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            type: "bot",
            content:
              "Great! I have everything I need to create your agent. Processing...",
          },
        ]);
        setIsWaitingForResponse(false);
      }, 1000);
    }
  };

  return (
    <div className="h-screen max-h-screen bg-gray-50 dark:bg-gray-900">
      <AnimatePresence mode="wait">
        {!showChat ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="landing"
            className="h-[calc(100vh-10vh)] flex flex-col items-center justify-center px-4"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-center space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Create Custom
                </h1>
                <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 tracking-tight">
                  AI Agents in Minutes
                </h1>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
                Design, customize, and deploy your personal AI assistant with
                just a few clicks. No coding required.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setShowChat(true)}
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 px-8 py-6 text-lg rounded-2xl"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Create Your Custom Agent
                </Button>
              </motion.div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-full blur-3xl" />
              <div className="absolute left-1/4 top-1/4 w-1/3 h-1/3 bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-full blur-3xl" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            key="chat"
            className="h-full"
          >
            <div className="flex flex-col h-screen max-h-screen">
              {/* Chat container */}
              <div className="flex-1 min-h-0">
                <div className="h-full overflow-y-auto py-4">
                  <div className="w-full mx-auto space-y-6 px-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex w-full",
                          message.type === "user"
                            ? "justify-end"
                            : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "flex items-start gap-3 rounded-lg p-4 max-w-[85%]",
                            message.type === "bot"
                              ? "bg-white dark:bg-gray-800 shadow-sm"
                              : "bg-blue-600 dark:bg-blue-700 text-white"
                          )}
                        >
                          {message.type === "bot" && (
                            <Bot className="h-5 w-5 mt-1 text-blue-600 dark:text-blue-400" />
                          )}
                          <div className="flex-1 space-y-2">
                            <div className="prose dark:prose-invert">
                              {message.content}
                            </div>
                            {message.inputType === "select" &&
                              !message.completed && (
                                <Select onValueChange={handleSubmit}>
                                  <SelectTrigger className="w-full bg-white dark:bg-gray-700">
                                    <SelectValue placeholder="Select an option" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {message.options?.map((option) => (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                          </div>
                          {message.type === "user" && (
                            <User className="h-5 w-5 mt-1 text-white" />
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </div>

              {/* Input container */}
              <div className="sticky bottom-0 w-full border-t dark:border-gray-800 bg-white dark:bg-gray-900 py-4">
                <div className="w-full mx-auto px-4">
                  <div className="flex gap-2">
                    <Input
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      placeholder="Type your response..."
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !isWaitingForResponse) {
                          handleSubmit(currentInput);
                        }
                      }}
                      disabled={
                        isWaitingForResponse ||
                        messages[messages.length - 1]?.inputType === "select"
                      }
                    />
                    <Button
                      onClick={() => handleSubmit(currentInput)}
                      disabled={
                        isWaitingForResponse ||
                        !currentInput.trim() ||
                        messages[messages.length - 1]?.inputType === "select"
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateAgentChat;
