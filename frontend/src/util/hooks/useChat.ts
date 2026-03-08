import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

const SYSTEM_PROMPT = `You are PAL, an inquisitive tutor. Ask probing questions to ensure the user deeply understands the topic. Questions should at most be 2 sentences and straight forward. Mention "mastery" once they explain it well.`;

// Initialize model with system instruction
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  systemInstruction: SYSTEM_PROMPT
});

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const sendMessage = useCallback(async (userContent: string) => {
    if (!userContent.trim()) return;

    const currentHistory = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userContent }];
    setMessages(newMessages);
    setIsLoading(true);

    let retryCount = 0;
    const maxRetries = 3;
    const baseDelay = 1000;

    const attemptSendMessage = async (): Promise<boolean> => {
      try {
        const chat = model.startChat({
          history: currentHistory,
        });

        const result = await chat.sendMessage(userContent);
        const response = await result.response;
        const aiText = response.text();

        setMessages(prev => [...prev, { role: 'model', content: aiText }]);

        // Check for exit condition (Gemini usually follows instructions)
        if (aiText.toLowerCase().includes("great job") && aiText.toLowerCase().includes("mastery")) {
          setIsDone(true);
        }
        return true;
      } catch (error: any) {
        // Log the error
        console.error(`Chat attempt ${retryCount + 1} failed:`, error);

        // Check for 503 (Service Unavailable)
        // The SDK usually wraps the original fetch error or status line in the message
        const errorMessage = error.message || String(error);
        if (errorMessage.includes('503') && retryCount < maxRetries) {
          const delay = baseDelay * Math.pow(2, retryCount);
          console.log(`Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          retryCount++;
          return await attemptSendMessage();
        }

        // For other errors or max retries reached, fail
        return false;
      }
    };

    try {
      await attemptSendMessage();
    } finally {
      setIsLoading(false);
    }
  }, [messages, model]);

  return {
    messages,
    isLoading,
    isDone,
    sendMessage,
    setMessages
  };
}
