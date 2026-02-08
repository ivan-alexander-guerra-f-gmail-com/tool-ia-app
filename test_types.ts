
import { groqService } from './services/groq';
import type { AIService, ChatMessage } from './types';

const service: AIService = groqService; // This should compile if types match

async function test() {
    const messages: ChatMessage[] = [{ role: "user", content: "Hello" }];
    const response = service.chat(messages);

    // Check if it is iterable
    for await (const chunk of response) {
        console.log(chunk);
    }
}
