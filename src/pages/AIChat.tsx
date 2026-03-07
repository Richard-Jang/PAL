import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../util/components/Card';
import { Button } from '../util/components/Button';
import { useSummary } from '../util/hooks/useSummary';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export function Component() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Hello! What topic are you teaching me today? Or did you have a question?' }
  ]);
  const [input, setInput] = useState('');
  const { generate, isLoading } = useSummary();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Mock API response via our generic "generate" hook for Gemini
    const aiResponseText = await generate(input);
    if (aiResponseText) {
      const aiMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        sender: 'ai', 
        text: `Here's what I think: ${aiResponseText}. Can you tell me more about this specific detail?` 
      };
      setMessages(prev => [...prev, aiMsg]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 h-[90vh] flex flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
          AI Student Chat
        </h1>
        <p className="text-slate-400">Teach me a concept, and I'll ask questions to help you solidify your understanding.</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden mb-4 p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 border border-slate-700 text-slate-400 rounded-2xl px-4 py-2 rounded-bl-none">
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="p-3 bg-slate-900 border-t border-slate-800">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-slate-800 border border-slate-700 focus:border-blue-500 rounded-lg px-4 py-2 text-white outline-none"
              disabled={isLoading}
            />
            <Button type="submit" isLoading={isLoading} disabled={!input.trim()}>
              Send
            </Button>
          </form>
        </div>
      </Card>
      
      <div className="flex justify-end gap-2">
        <Button variant="ghost">Export Chat to PDF</Button>
        <Button variant="secondary">Save to Database</Button>
      </div>
    </div>
  );
}
