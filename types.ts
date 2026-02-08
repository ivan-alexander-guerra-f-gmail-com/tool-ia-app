export interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

export interface AIService {
    name: string;
    description: string;
    chat: (messages: ChatMessage[]) => AsyncIterable<string>;
}
