// app/lib/api-config.ts
export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4-turbo-preview",
  },
  groq: {
    apiKey: process.env.NEXT_PUBLIC_GROQ_KEY,
    model: "mixtral-8x7b-32768",
  },
  serper: {
    apiKey: process.env.BRAVE_SEARCH_API_KEY,
    endpoint: "https://google.serper.dev/search",
  },
  brave: {
    apiKey: process.env.NEXT_PUBLIC_BRAVE_SEARCH_KEY,
    endpoint: "https://api.search.brave.com/res/v1/web/search",
  },
} as const;
