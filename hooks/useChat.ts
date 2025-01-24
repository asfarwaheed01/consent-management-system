// hooks/useChat.ts
import { useState, useCallback } from "react";
import { Message, Artifact } from "@/interfaces";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to detect and create artifacts from message content
  const detectAndCreateArtifacts = (content: string): Artifact[] => {
    const artifacts: Artifact[] = [];

    // Detect code blocks using regex
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      const [fullMatch, language = "plaintext", code] = match;
      artifacts.push({
        id: `code-${Date.now()}-${Math.random()}`,
        type: "code",
        content: code.trim(),
        metadata: {
          language: language,
          title: `${language} Code Block`,
        },
      });
    }

    return artifacts;
  };

  const processStreamResponse = async (response: Response) => {
    if (!response.body) throw new Error("No response body");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedContent = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Decode the chunk
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.trim() || !line.startsWith("data: ")) continue;

          try {
            const jsonString = line.replace(/^data: /, "").trim();
            if (jsonString === "[DONE]") continue;

            const json = JSON.parse(jsonString);
            const content = json.choices[0]?.delta?.content || "";

            if (content) {
              accumulatedContent += content;

              // Update message and check for artifacts
              setMessages((prev) => {
                const lastMessage = prev[prev.length - 1];
                if (lastMessage?.role === "assistant") {
                  const artifacts =
                    detectAndCreateArtifacts(accumulatedContent);
                  return [
                    ...prev.slice(0, -1),
                    {
                      ...lastMessage,
                      content: accumulatedContent,
                      artifacts: artifacts.length > 0 ? artifacts : undefined,
                    },
                  ];
                }
                return prev;
              });
            }
          } catch (e) {
            console.error("Error parsing stream:", e);
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  };

  const sendMessage = useCallback(
    async (message: string, model: "openai" | "groq" = "openai") => {
      setIsLoading(true);

      try {
        // Add user message
        const userMessage: Message = {
          id: Date.now(),
          role: "user",
          content: message,
        };

        // Add initial assistant message
        const assistantMessage: Message = {
          id: Date.now() + 1,
          role: "assistant",
          content: "",
        };

        setMessages((prev) => [...prev, userMessage, assistantMessage]);

        const response = await fetch(`/api/chat/${model}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: message }],
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        await processStreamResponse(response);
      } catch (error) {
        console.error("Chat error:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            role: "assistant",
            content: "Sorry, there was an error processing your request.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
