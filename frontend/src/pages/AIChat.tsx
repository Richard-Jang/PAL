import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../util/components/Card';
import { Button } from '../util/components/Button';
import { useChat } from '../util/hooks/useChat';
import { TypeWriter } from '../components/TypeWriter';
import { FaRobot, FaUser, FaCheckCircle } from 'react-icons/fa';

export function Component() {
  const { messages, isLoading, isDone, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const [typingComplete, setTypingComplete] = useState<{ [key: number]: boolean }>({});
  const endRef = useRef<HTMLDivElement>(null);

  const initialGreeting = "Hello! My name is PAL, and I look forward to learning with you! What will we be learning today?";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingComplete]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isDone) return;

    const currentInput = input;
    setInput('');
    await sendMessage(currentInput);
  };

  const handleTypingComplete = (index: number) => {
    setTypingComplete(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 h-full flex flex-col bg-slate-50">
      <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <FaRobot size={20} />
            </span>
            <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 tracking-tight">
              PAL Learning Studio
            </h1>
          </div>
          <p className="text-slate-600 font-medium text-sm ml-10">Your personal AI learning companion.</p>
        </div>
        {isDone && (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 font-bold animate-bounce shadow-sm">
            <FaCheckCircle /> Topic Mastered!
          </div>
        )}
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden mb-4 p-0 border-indigo-100 shadow-xl bg-white rounded-3xl">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scroll-smooth">
          {/* Initial Greeting */}
          <div className="flex justify-start">
            <div className="flex flex-col gap-1 max-w-[80%] text-left">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                <FaRobot /> PAL
              </div>
              <div className="bg-slate-50 border border-slate-100 text-slate-700 rounded-2xl rounded-tl-sm px-5 py-3 shadow-sm font-medium text-sm leading-relaxed">
                <TypeWriter text={initialGreeting} speed={20} />
              </div>
            </div>
          </div>

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex flex-col gap-1 max-w-[80%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mx-2 justify-end">
                  {msg.role === 'user' ? <><FaUser /> You</> : <><FaRobot /> PAL</>}
                </div>
                <div className={`rounded-2xl px-5 py-3 shadow-md font-medium text-sm leading-relaxed transition-all duration-300 ${msg.role === 'user'
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-tr-sm'
                  : 'bg-white border border-slate-100 text-slate-800 rounded-tl-sm'
                  }`}>
                  {msg.role === 'model' ? (
                    <TypeWriter 
                      text={msg.content} 
                      speed={10} 
                      onComplete={() => handleTypingComplete(idx)} 
                    />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start animate-fade-in text-left">
               <div className="flex flex-col gap-1">
                 <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
                   <FaRobot /> PAL is thinking...
                 </div>
                 <div className="bg-white border border-slate-200 text-indigo-500 rounded-2xl px-6 py-4 rounded-tl-sm shadow-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-300"></span>
                </div>
               </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="p-6 bg-slate-50/50 border-t border-slate-100">
          <form onSubmit={handleSend} className="flex gap-4 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isDone ? "Topic mastered! You can start a new one..." : "Explain your understanding..."}
              className="flex-1 bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-6 py-4 text-slate-800 font-medium outline-none transition-all shadow-inner"
              disabled={isLoading || isDone}
            />
            <Button 
              type="submit" 
              isLoading={isLoading} 
              disabled={!input.trim() || isDone} 
              className="px-10 rounded-2xl shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              Send
            </Button>
          </form>
          <p className="text-center text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest">
            {isDone ? "Conversation Ended - Comprehensive Understanding Reached" : "PAL learns by asking you to expand on your knowledge"}
          </p>
        </div>
      </Card>
    </div>
  );
}

export default Component;
