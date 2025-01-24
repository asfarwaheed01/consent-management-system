import { config } from "../config";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { query, source = "all" } = await req.json();
    const results = [];

    if (source === "serper" || source === "all") {
      const serperResponse = await fetch(config.serper.endpoint, {
        method: "POST",
        headers: {
          "X-API-KEY": config.serper.apiKey!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ q: query }),
      });

      if (serperResponse.ok) {
        const data = await serperResponse.json();
        results.push({ source: "serper", data });
      }
    }

    if (source === "brave" || source === "all") {
      const braveResponse = await fetch(
        `${config.brave.endpoint}?q=${encodeURIComponent(query)}`,
        {
          headers: {
            Accept: "application/json",
            "Accept-Encoding": "gzip",
            "X-Subscription-Token": config.brave.apiKey!,
          },
        }
      );

      if (braveResponse.ok) {
        const data = await braveResponse.json();
        results.push({ source: "brave", data });
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("[Search Error]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
