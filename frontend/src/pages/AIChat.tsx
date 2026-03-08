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
    <div className="max-w-4xl mx-auto p-4 md:p-6 h-[90vh] flex flex-col min-h-screen">
      <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 tracking-tight mb-2">
            AI Student Chat
          </h1>
          <p className="text-slate-600 font-medium text-sm">Teach me a concept, and I'll ask questions to help you solidify your understanding.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="text-indigo-600 bg-indigo-50">Export PDF</Button>
          <Button variant="secondary" className="border-indigo-200">Save Chat</Button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden mb-4 p-0 border-indigo-100 shadow-md bg-white">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm font-medium text-sm leading-relaxed ${msg.sender === 'user'
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-sm'
                : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm drop-shadow-sm'
                }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl px-5 py-3 rounded-bl-sm shadow-sm flex items-center gap-2 font-medium text-sm">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce delay-100">●</span>
                <span className="animate-bounce delay-200">●</span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="p-4 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Explain a concept..."
              className="flex-1 border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl px-4 py-3 text-slate-800 font-medium outline-none transition-all"
              disabled={isLoading}
            />
            <Button type="submit" isLoading={isLoading} disabled={!input.trim()} className="px-8 shadow-indigo-500/30">
              Send
            </Button>
          </form>
        </div>
      </Card>

    </div>
  );
}

export default Component;
