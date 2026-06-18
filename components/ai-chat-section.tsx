"use client";

import { useState, useRef, useEffect } from "react";
import { askPambot } from "../services/api-pambot";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  pending?: boolean;
  requestId?: string;
}

const suggestedQuestions = [
  "What are your strongest technical skills?",
  "Tell me about your RAG system",
  "What projects are you most proud of?",
  "Are you open to new opportunities?",
];

export function AiChatSection() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false); // [FIX 1] thêm loading state
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);
  const requestIdRef = useRef(0);

  const nextMessageId = (prefix: string) => {
    messageIdRef.current += 1;
    return `${prefix}-${messageIdRef.current}`;
  };

  const nextRequestId = () => {
    requestIdRef.current += 1;
    return `request-${requestIdRef.current}`;
  };

  const normalizeAnswer = (value: unknown) => {
    if (typeof value === "string") return value.trim();
    return "";
  };

  // [FIX 2] scroll cả khi message update (Thinking... -> text thực)
  useEffect(() => {
    if (messages.length === 0) return;

    const chatWindow = chatWindowRef.current;
    if (!chatWindow) return;

    chatWindow.scrollTo({
      top: chatWindow.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSendMessage = async (question: string) => {
    if (!question.trim() || isLoading) return; // [FIX 3] chặn gửi khi đang loading

    const requestId = nextRequestId();
    const userMessageId = nextMessageId("user");
    const assistantMessageId = nextMessageId("assistant");

    const userMessage: Message = {
      id: userMessageId,
      role: "user",
      text: question.trim(),
    };
    const assistantPlaceholder: Message = {
      id: assistantMessageId,
      role: "assistant",
      text: "Thinking...",
      pending: true,
      requestId,
    };

    setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
    setInputValue("");
    setIsLoading(true); // [FIX 1]

    try {
      const res = await askPambot(question.trim());
      const answer =
        normalizeAnswer(res?.answer) ||
        "Sorry, I couldn't get an answer from PamBot.";
      setMessages((prev) =>
        prev.map((message) =>
          message.requestId === requestId && message.role === "assistant"
            ? { ...message, text: answer, pending: false }
            : message,
        ),
      );
    } catch {
      setMessages((prev) =>
        prev.map((message) =>
          message.requestId === requestId && message.role === "assistant"
            ? {
                ...message,
                text: "Sorry, there was an error contacting PamBot.",
                pending: false,
              }
            : message,
        ),
      );
    } finally {
      setIsLoading(false); // [FIX 1]
    }
  };

  const handleSend = () => {
    handleSendMessage(inputValue);
  };

  const handleSuggestion = (q: string) => {
    console.log("Suggested question clicked:", q);
    handleSendMessage(q);
  };

  return (
    <section id="chat" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-[#7D93C0] uppercase tracking-widest mb-3">
            PamBot
          </p>
          <h2 className="text-3xl font-bold text-[#081e5a] mb-3">
            Chat with my AI
          </h2>
          <p className="text-sm text-[#7D93C0] leading-relaxed">
            Ask me anything about my background, projects, or skills — I&apos;ll
            answer in Pam&apos;s voice.
          </p>
        </div>

        <div className="rounded-3xl bg-[#f8fafc] border border-border shadow-sm overflow-hidden">
          {/* Chat window */}
          <div
            ref={chatWindowRef}
            className="h-96 overflow-y-auto p-6 flex flex-col gap-4"
          >
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center text-xs font-bold text-[#081e5a] shrink-0">
                  AC
                </div>
                <div className="bg-[#e2e8f0] rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs md:max-w-md">
                  <p className="text-sm text-[#081e5a]">
                    Hey! I&apos;m PamBot AhhPam&apos;s Assistant. Ask me about
                    his projects, skills, or experience — I&apos;m happy to
                    help!
                  </p>
                </div>
              </div>
            )}

            {messages.map((message) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 items-start ${isUser ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      isUser
                        ? "bg-[#081e5a] text-[#ffffff] rounded-tr-sm"
                        : "bg-[#e2e8f0] text-[#081e5a] rounded-tl-sm"
                    }`}
                  >
                    {isUser ? "You" : "AC"}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-xs md:max-w-md text-sm leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? "bg-[#081e5a] text-[#ffffff] rounded-tr-sm"
                        : "bg-[#e2e8f0] text-[#081e5a] rounded-tl-sm"
                    }`}
                  >
                    {message.pending ? (
                      <span className="flex gap-1 items-center h-4">
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:300ms]" />
                      </span>
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Suggested questions */}
          {/* [FIX 4] disable buttons khi đang loading */}
          <div className="px-6 pb-3 flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                type="button"
                key={q}
                onClick={() => handleSuggestion(q)}
                disabled={isLoading}
                className="relative z-[10] px-3 py-1.5 rounded-xl bg-secondary border border-border text-xs font-medium text-muted-foreground hover:border-accent hover:text-foreground hover:bg-accent/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-border flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              disabled={isLoading} // [FIX 4]
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading} // [FIX 4]
              className="px-4 py-2.5 rounded-xl bg-[#081e5a] text-[#ffffff] text-sm font-medium hover:opacity-90 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
