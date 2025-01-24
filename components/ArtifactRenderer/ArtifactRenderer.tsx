import React from "react";
import { Artifact } from "@/interfaces";
import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  tomorrow,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "lucide-react";
import ReactMarkdown from "react-markdown";
import CopyButton from "../GlobalChat/ChatInterface/CopyButton";

interface Props {
  artifact: Artifact;
  className?: string;
}

const ArtifactRenderer: React.FC<Props> = ({ artifact, className = "" }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const renderText = (content: string) => (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );

  // const renderCode = (content: string, language: string = "plaintext") => (
  //   <Card className="w-full">
  //     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
  //       <CardTitle className="text-sm font-medium">
  //         {language.charAt(0).toUpperCase() + language.slice(1)}
  //       </CardTitle>
  //       <Code className="h-4 w-4" />
  //     </CardHeader>
  //     <CardContent>
  //       <SyntaxHighlighter
  //         language={language}
  //         style={isDark ? tomorrow : oneLight}
  //         customStyle={{
  //           margin: 0,
  //           borderRadius: "0.5rem",
  //           fontSize: "0.9rem",
  //         }}
  //       >
  //         {content}
  //       </SyntaxHighlighter>
  //     </CardContent>
  //   </Card>
  // );
  const renderCode = (content: string, language: string = "plaintext") => (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {language.charAt(0).toUpperCase() + language.slice(1)}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4" />
          <CopyButton content={content} />
        </div>
      </CardHeader>
      <CardContent>
        <SyntaxHighlighter
          language={language}
          style={isDark ? tomorrow : oneLight}
          customStyle={{
            margin: 0,
            borderRadius: "0.5rem",
            fontSize: "0.9rem",
          }}
        >
          {content}
        </SyntaxHighlighter>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (artifact.type) {
      case "text":
        return renderText(artifact.content);
      case "code":
        return renderCode(artifact.content, artifact.metadata?.language);
      default:
        return <div>{artifact.content}</div>;
    }
  };

  return (
    <div className={`mt-4 max-w-full ${className}`}>{renderContent()}</div>
  );
};

export default ArtifactRenderer;
