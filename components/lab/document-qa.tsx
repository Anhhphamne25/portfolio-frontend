"use client";

import { useState, useRef, useCallback } from "react";

type Message = { role: "user" | "assistant"; text: string };

export function DocumentQA() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === "application/pdf") setFile(dropped);
  }, []);

  const handleAsk = async () => {
    if (!input.trim() || !file || loading) return;
    const question = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("question", question);
      const res = await fetch("/api/doc-qa", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.answer },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I couldn't process that. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Upload zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
          isDragging
            ? "border-primary bg-accent/20"
            : file
              ? "border-primary/50 bg-secondary"
              : "border-border bg-secondary hover:border-primary/40 hover:bg-accent/10"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setFile(f);
          }}
        />
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${file ? "bg-primary/20" : "bg-card border border-border"}`}
        >
          <svg
            className={`w-6 h-6 ${file ? "text-primary" : "text-muted-foreground"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        </div>
        {file ? (
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024).toFixed(0)} KB — Click to change
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">
              Drop your PDF here
            </p>
            <p className="text-xs text-muted-foreground">or click to browse</p>
          </div>
        )}
      </div>

      {/* Chat interface */}
      <div
        className={`rounded-2xl border border-border overflow-hidden transition-all ${!file ? "opacity-50 pointer-events-none" : ""}`}
      >
        <div className="bg-secondary px-4 py-3 border-b border-border flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <p className="text-xs font-semibold text-foreground">
            Document Q&amp;A — RAG Mode
          </p>
          {file && (
            <span className="ml-auto text-xs text-muted-foreground truncate max-w-32">
              {file.name}
            </span>
          )}
        </div>

        <div className="h-64 overflow-y-auto p-4 flex flex-col gap-3 bg-card">
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <p className="text-xs text-muted-foreground text-center">
                {file
                  ? "Upload complete. Ask your first question below."
                  : "Upload a PDF to get started."}
              </p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 items-start ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent text-foreground"}`}
              >
                {msg.role === "user" ? "U" : "AI"}
              </div>
              <div
                className={`px-3 py-2 rounded-xl text-sm leading-relaxed max-w-xs md:max-w-sm ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-secondary text-foreground rounded-tl-none"}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-2 items-start">
              <div className="w-7 h-7 rounded-xl bg-accent flex items-center justify-center text-xs font-bold text-foreground shrink-0">
                AI
              </div>
              <div className="bg-secondary rounded-xl rounded-tl-none px-3 py-2 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-border flex gap-2 bg-card">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder={
              file ? "Ask about the document..." : "Upload a PDF first"
            }
            disabled={!file || loading}
            className="flex-1 px-3 py-2 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
          />
          <button
            onClick={handleAsk}
            disabled={!file || !input.trim() || loading}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}
