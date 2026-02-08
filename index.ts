import { groqService } from './services/groq';
import type { AIService, ChatMessage } from './types';

const service: AIService[] = [groqService];
let currentServiceIndex = 0; // 0 = groq, 1 = cerebras, 2 = gemini, 3 = claude, 4 = openai

function getNextService() {
    const nextService = service[currentServiceIndex];
    currentServiceIndex = (currentServiceIndex + 1) % service.length;
    return nextService;
}

const server = Bun.serve({
    port: process.env.PORT ?? 3050,
    async fetch(req) {
        const { pathname } = new URL(req.url);
        if (req.method === "POST" && pathname === "/chat") {
            const { messages } = await req.json() as { messages: ChatMessage[] };
            const service = getNextService();

            console.log(`Using service: ${service?.name} ${service?.description}`)
            const stream = service?.chat(messages);
            if (!stream) {
                return new Response("Error", { status: 500 });
            }
            return new Response(stream, {
                headers: {
                    "Content-Type": "text/event-stream",
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive"
                }
            });
        }
        return new Response("Not Found", { status: 404 });
    }
})

console.log(`Server is running on ${server.url}:${server.port}`);