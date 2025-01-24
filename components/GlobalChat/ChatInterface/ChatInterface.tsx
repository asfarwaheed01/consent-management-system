// // components/ChatInterface.tsx
// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { Message } from "@/interfaces";
// import { Send, Bot, User, Loader2, Settings } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { MessageComponent } from "./MessageComponent";

// // Constants
// const BOT_NAME = "AI Assistant";
// const PERSON_NAME = "User";

// interface ChatMessage extends Message {
//   timestamp: string;
// }

// export default function ChatInterface() {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const chatEndRef = useRef<HTMLDivElement>(null);

//   // Auto scroll to bottom
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Format timestamp
//   const formatTimestamp = (date: Date): string => {
//     return date.toLocaleTimeString("en-US", {
//       hour12: false,
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Generate unique ID
//   const generateId = (): string => {
//     return crypto.randomUUID();
//   };

//   const processStream = async (
//     reader: ReadableStreamDefaultReader<Uint8Array>,
//     messageId: string
//   ) => {
//     const decoder = new TextDecoder();

//     try {
//       while (true) {
//         const { value, done } = await reader.read();
//         if (done) break;

//         const chunk = decoder.decode(value);
//         const lines = chunk.split("\n").filter((line) => line.trim());

//         for (const line of lines) {
//           try {
//             const data = JSON.parse(line);

//             if (data.type === "chunk") {
//               // Update message with new content
//               setMessages((prev) =>
//                 prev.map((message) =>
//                   message.id === messageId
//                     ? { ...message, content: data.completeMessage }
//                     : message
//                 )
//               );
//             }

//             if (data.type === "done") {
//               // Handle completion if needed
//               setIsLoading(false);
//             }
//           } catch (error) {
//             console.error("Error parsing chunk:", error);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Stream processing error:", error);
//     } finally {
//       reader.releaseLock();
//       setIsLoading(false);
//     }
//   };
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const timestamp = formatTimestamp(new Date());
//     const userMessageId = generateId();
//     const botMessageId = generateId();

//     // Add user message
//     const userMessage: ChatMessage = {
//       id: userMessageId,
//       role: "user",
//       content: input.trim(),
//       timestamp,
//     };

//     // Add initial bot message
//     const botMessage: ChatMessage = {
//       id: botMessageId,
//       role: "assistant",
//       content: "", // Start with empty content
//       timestamp,
//     };

//     // Update messages state with both messages
//     setMessages((prev) => [...prev, userMessage, botMessage]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("/api/chat/openai", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           messages: [{ role: "user", content: input }],
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       if (!response.body) {
//         throw new Error("No response body");
//       }

//       const reader = response.body.getReader();
//       await processStream(reader, botMessageId); // Pass the bot message ID
//     } catch (error) {
//       console.error("Error:", error);
//       // Remove the bot message on error
//       setMessages((prev) => prev.filter((msg) => msg.id !== botMessageId));
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-[85vh] max-w-full mx-auto">
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <MessageComponent
//             key={message.id}
//             role={message.role}
//             content={message.content}
//             timestamp={message.timestamp}
//           />
//         ))}
//         <div ref={chatEndRef} />
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="p-4 border-t dark:border-gray-700"
//       >
//         <div className="flex items-center space-x-2">
//           <Input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type your message..."
//             disabled={isLoading}
//             className="flex-1"
//           />
//           <Button type="submit" disabled={isLoading || !input.trim()}>
//             {isLoading ? (
//               <Loader2 className="h-5 w-5 animate-spin" />
//             ) : (
//               <Send className="h-5 w-5" />
//             )}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import React, { useState, useRef, useEffect } from "react";
import { Message, Artifact } from "@/interfaces";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ArtifactRenderer from "@/components/ArtifactRenderer/ArtifactRenderer";

interface ChatMessage extends Message {
  timestamp: string;
  artifacts?: Artifact[];
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTimestamp = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const generateId = (): string => crypto.randomUUID();

  const processStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    messageId: string
  ) => {
    const decoder = new TextDecoder();

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((line) => line.trim());

        for (const line of lines) {
          try {
            const data = JSON.parse(line);

            if (data.type === "chunk") {
              setMessages((prev) =>
                prev.map((message) =>
                  message.id === messageId
                    ? {
                        ...message,
                        content: data.completeMessage,
                        artifacts: data.artifacts || [],
                      }
                    : message
                )
              );
            }
          } catch (error) {
            console.error("Error parsing chunk:", error);
          }
        }
      }
    } catch (error) {
      console.error("Stream processing error:", error);
    } finally {
      reader.releaseLock();
      setIsLoading(false);
    }
  };

  const renderMessage = (message: ChatMessage) => (
    <div
      key={message.id}
      className={`flex flex-col ${
        message.role === "user" ? "items-end" : "items-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        {message.artifacts?.length ? (
          message.artifacts.map((artifact, index) => (
            <ArtifactRenderer
              key={`${message.id}-artifact-${index}`}
              artifact={artifact}
            />
          ))
        ) : (
          <div className="prose dark:prose-invert max-w-none">
            {message.content}
          </div>
        )}
      </div>
      <span className="text-xs text-muted-foreground mt-1">
        {message.timestamp}
      </span>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const timestamp = formatTimestamp(new Date());
    const userMessageId = generateId();
    const botMessageId = generateId();

    const userMessage: ChatMessage = {
      id: userMessageId,
      role: "user",
      content: input.trim(),
      timestamp,
    };

    const botMessage: ChatMessage = {
      id: botMessageId,
      role: "assistant",
      content: "",
      timestamp,
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: input }],
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(response.statusText);
      }

      const reader = response.body.getReader();
      await processStream(reader, botMessageId);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => prev.filter((msg) => msg.id !== botMessageId));
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[85vh] max-w-full mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(renderMessage)}
        <div ref={chatEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-t dark:border-gray-700"
      >
        <div className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
