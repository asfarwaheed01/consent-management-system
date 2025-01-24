// app/api/chat/groq/route.ts
import { Groq } from "groq-sdk";
import { config } from "../../config";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: config.groq.apiKey,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await groq.chat.completions.create({
      model: config.groq.model,
      messages,
      temperature: 0.7,
      stream: true,
    });

    return new NextResponse(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[Groq Error]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
