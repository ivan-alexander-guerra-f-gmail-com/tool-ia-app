import Cerebras from '@cerebras/cerebras_cloud_sdk';
import type { AIService, ChatMessage } from '../types';

const cerebras = new Cerebras();

export const cerebrasService: AIService = {
    name: "cerebras",
    description: "Cerebras service",
    async *chat(messages: ChatMessage[]) {
        const stream = await cerebras.chat.completions.create({
            messages: [
                {
            "role": "system",
            "content": ""
        }
    ],
    model: 'zai-glm-4.7',
    stream: true,
    max_completion_tokens: 65000,
    temperature: 1,
    top_p: 0.95
  });

  for await (const chunk of stream) {
    yield chunk.choices[0]?.delta?.content || '';
  }
}

main();