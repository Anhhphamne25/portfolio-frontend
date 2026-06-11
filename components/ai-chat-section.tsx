"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useState, useRef, useEffect } from "react"

const suggestedQuestions = [
  "What are your strongest technical skills?",
  "Tell me about your RAG system",
  "What projects are you most proud of?",
  "Are you open to new opportunities?",
]

function getMessageText(parts: { type: string; text?: string }[]): string {
  if (!parts || !Array.isArray(parts)) return ""
  return parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

export function AiChatSection() {
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return
    sendMessage({ text: inputValue.trim() })
    setInputValue("")
  }

  const handleSuggestion = (q: string) => {
    if (isLoading) return
    sendMessage({ text: q })
  }

  return (
    <section id="chat" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">AI Assistant</p>
          <h2 className="text-3xl font-bold text-foreground mb-3">Chat with my AI</h2>
          <p className="text-muted-foreground">
            Ask me anything about my background, projects, or skills — I&apos;ll answer in Alex&apos;s voice.
          </p>
        </div>

        <div className="rounded-3xl bg-card border border-border shadow-sm overflow-hidden">
          {/* Chat window */}
          <div className="h-96 overflow-y-auto p-6 flex flex-col gap-4">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center text-xs font-bold text-foreground shrink-0">
                  AC
                </div>
                <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs md:max-w-md">
                  <p className="text-sm text-foreground">
                    Hey! I&apos;m Alex&apos;s AI assistant. Ask me about his projects, skills, or experience — I&apos;m happy to help!
                  </p>
                </div>
              </div>
            )}

            {messages.map((message) => {
              const text = getMessageText(message.parts as { type: string; text?: string }[])
              const isUser = message.role === "user"
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 items-start ${isUser ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-foreground"
                    }`}
                  >
                    {isUser ? "You" : "AC"}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-xs md:max-w-md text-sm leading-relaxed ${
                      isUser
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-secondary text-foreground rounded-tl-sm"
                    }`}
                  >
                    {text}
                  </div>
                </div>
              )
            })}

            {isLoading && (
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center text-xs font-bold text-foreground shrink-0">
                  AC
                </div>
                <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          <div className="px-6 pb-3 flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSuggestion(q)}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-xl bg-secondary border border-border text-xs font-medium text-muted-foreground hover:border-accent hover:text-foreground hover:bg-accent/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
