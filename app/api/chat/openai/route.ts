// // app/api/chat/openai/route.ts
// import OpenAI from "openai";
// import { NextResponse } from "next/server";

// const openai = new OpenAI({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
// });

// function iteratorToStream(iterator: AsyncIterator<Uint8Array>) {
//   return new ReadableStream({
//     async pull(controller) {
//       try {
//         const { value, done } = await iterator.next();

//         if (done) {
//           controller.close();
//         } else {
//           controller.enqueue(value);
//         }
//       } catch (error) {
//         controller.error(error);
//       }
//     },
//   });
// }

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();
//     const encoder = new TextEncoder();
//     let completeMessage = "";

//     const response = await openai.chat.completions.create({
//       model: "gpt-4-turbo-preview",
//       messages,
//       stream: true,
//     });

//     async function* makeIterator() {
//       for await (const chunk of response) {
//         const content = chunk.choices[0]?.delta?.content;

//         if (content) {
//           completeMessage += content;

//           // Send each chunk as a JSON object
//           yield encoder.encode(
//             JSON.stringify({
//               type: "chunk",
//               content: content,
//               completeMessage,
//             }) + "\n"
//           );
//         }
//       }

//       // Send a final message indicating completion
//       yield encoder.encode(
//         JSON.stringify({
//           type: "done",
//           completeMessage,
//         }) + "\n"
//       );
//     }

//     const stream = iteratorToStream(makeIterator());

//     return new NextResponse(stream, {
//       headers: {
//         "Content-Type": "text/event-stream",
//         "Cache-Control": "no-cache",
//         Connection: "keep-alive",
//       },
//     });
//   } catch (error) {
//     console.error("OpenAI API Error:", error);
//     return NextResponse.json(
//       {
//         error: "Error processing your request",
//         details: error instanceof Error ? error.message : String(error),
//       },
//       { status: 500 }
//     );
//   }
// }

import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});

function iteratorToStream(iterator: AsyncIterator<Uint8Array>) {
  return new ReadableStream({
    async pull(controller) {
      try {
        const { value, done } = await iterator.next();
        if (done) controller.close();
        else controller.enqueue(value);
      } catch (error) {
        controller.error(error);
      }
    },
  });
}

const extractCodeBlocks = (text: string) => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const artifacts = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      artifacts.push({
        type: "text",
        content: text.slice(lastIndex, match.index).trim(),
      });
    }

    // Add code block
    artifacts.push({
      type: "code",
      content: match[2].trim(),
      metadata: {
        language: match[1] || "plaintext",
      },
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    artifacts.push({
      type: "text",
      content: text.slice(lastIndex).trim(),
    });
  }

  return artifacts;
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const encoder = new TextEncoder();
    let completeMessage = "";
    let currentArtifacts = [];

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages,
      stream: true,
    });

    async function* makeIterator() {
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          completeMessage += content;
          currentArtifacts = extractCodeBlocks(completeMessage);

          yield encoder.encode(
            JSON.stringify({
              type: "chunk",
              content,
              completeMessage,
              artifacts: currentArtifacts,
            }) + "\n"
          );
        }
      }

      yield encoder.encode(
        JSON.stringify({
          type: "done",
          completeMessage,
          artifacts: currentArtifacts,
        }) + "\n"
      );
    }

    return new NextResponse(iteratorToStream(makeIterator()), {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      {
        error: "Error processing your request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
