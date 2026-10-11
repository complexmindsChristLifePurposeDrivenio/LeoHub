import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, ConfidenceClass } from "../../types";
import { sendChatMessage } from "../../services/apiClient";
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  Bookmark,
  RefreshCw,
  Compass,
  Layers,
  History,
  PenTool,
  Loader2,
} from "lucide-react";

export const GtaChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "assistant",
      text: "Welcome to the Leonida Intelligence Assistant. I am connected directly to verified GTA VI research, official Rockstar communications, and the CMPlay creator database.\n\nAsk me about the Nov 19, 2026 launch details, Vice City districts, Lucia & Jason lore, or request viral video script hooks!",
      timestamp: "Just now",
      confidence: "official",
      citations: [
        { source: "Rockstar Games Official Bulletin", confidence: "Official" },
        { source: "CMPlay Intelligence Registry", confidence: "Verified" },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"research" | "creator" | "gameplay" | "nostalgia">("research");
  const [isLoading, setIsLoading] = useState(false);
  const [savedMessages, setSavedMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      mode,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await sendChatMessage(userText, mode);
      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: "assistant",
        text: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        mode,
        confidence: (res.confidence as ConfidenceClass) || "verified",
        citations: res.citations || [],
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "assistant",
        text: "Encountered a connection delay with the inference engine. Verified offline answer: GTA VI is scheduled for launch on November 19, 2026 on PlayStation 5 and Xbox Series X|S.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        confidence: "verified",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveMessage = (text: string) => {
    if (!savedMessages.includes(text)) {
      setSavedMessages([...savedMessages, text]);
    }
  };

  const quickPrompts = [
    { label: "Launch Date & Consoles", prompt: "What is the confirmed official release date and platform availability for GTA VI?" },
    { label: "Lucia Character Dossier", prompt: "Summarize Lucia's confirmed background, probation status, and role in Vice City." },
    { label: "3-Second Viral Hook", prompt: "Give me 3 high-retention opening hooks for a YouTube Short about the Leonida storm physics." },
    { label: "Vice City 2002 Comparison", prompt: "How does the 2026 Leonida coastline compare to the 2002 PS2 Vice City map?" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#00FF66]" />
            <span>GTA Chat Assistant</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20 font-mono">
              Gemini 3.8 Flash
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Dedicated conversational assistant for GTA VI lore, creator scripting, gameplay navigation, and nostalgia.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 bg-white/[0.05] p-1 rounded-xl border border-white/[0.08]">
          <button
            onClick={() => setMode("research")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              mode === "research"
                ? "bg-[#00FF66] text-black font-semibold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Research</span>
          </button>
          <button
            onClick={() => setMode("creator")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              mode === "creator"
                ? "bg-[#00FF66] text-black font-semibold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Creator</span>
          </button>
          <button
            onClick={() => setMode("gameplay")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              mode === "gameplay"
                ? "bg-[#00FF66] text-black font-semibold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Gameplay</span>
          </button>
          <button
            onClick={() => setMode("nostalgia")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              mode === "nostalgia"
                ? "bg-[#00FF66] text-black font-semibold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Nostalgia</span>
          </button>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0E1017] flex flex-col h-[600px] overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div
                  className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs ${
                    isUser
                      ? "bg-white/[0.1] text-white"
                      : "bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/30"
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-1.5">
                  <div
                    className={`p-4 rounded-xl text-xs leading-relaxed ${
                      isUser
                        ? "bg-[#00FF66] text-black font-medium"
                        : "bg-black/50 border border-white/[0.08] text-slate-200"
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>

                    {!isUser && msg.citations && msg.citations.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-white/[0.08] text-[11px] text-slate-400 space-y-1">
                        <div className="font-semibold text-slate-300">Verified Citations:</div>
                        {msg.citations.map((c, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-emerald-400">
                            <span>·</span>
                            <span>{c.source}</span>
                            <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20">
                              {c.confidence}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className={`flex items-center gap-2 text-[10px] text-slate-500 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleSaveMessage(msg.text)}
                        className="hover:text-slate-300 flex items-center gap-1"
                        title="Save to Notes"
                      >
                        <Bookmark className="w-3 h-3" />
                        <span>Save</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 max-w-xl mr-auto">
              <div className="w-8 h-8 rounded-lg bg-[#00FF66]/20 text-[#00FF66] flex items-center justify-center shrink-0">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.08] text-xs text-slate-400 flex items-center gap-2">
                <span>Querying Leonida knowledge vectors...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompt Bar */}
        <div className="px-4 py-2 border-t border-white/[0.06] bg-black/40 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-slate-400 shrink-0 font-medium">Suggestions:</span>
          {quickPrompts.map((qp) => (
            <button
              key={qp.label}
              onClick={() => setInput(qp.prompt)}
              className="px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 whitespace-nowrap transition-colors border border-white/[0.06] cursor-pointer"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-3 bg-black/60 border-t border-white/[0.08] flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask in ${mode} mode... (e.g. 'Break down Jason's getaway routes near Port Gellhorn')`}
            className="flex-1 px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF66]/50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2.5 rounded-lg bg-[#00FF66] text-black font-semibold text-xs hover:bg-[#00FF66]/90 transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-[0_0_12px_rgba(0,255,102,0.2)]"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
