"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { CodeGrader } from "@/components/lab/scoring-code";
import { DocumentQA } from "@/components/lab/document-qa";
import { ProblemGenerator } from "@/components/lab/problem-generator";

const SYSTEMS = [
  {
    id: "AI-Score",
    title: "AI Code Scoring",
    description:
      "Submit code solutions and receive AI-generated feedback with scores and improvement tips.",
    stack: ["Python", "Qwen", "AST Analysis", "FastAPI"],
    badge: "Most Impressive",
    badgeColor: "bg-[#6e95d0] text-[#ffffff]",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
    ),
  },
  {
    id: "doc-qa",
    title: "Document Q&A",
    description: "Upload a PDF and ask questions — powered by a RAG pipeline",
    stack: ["RAG", "Embedding", "FastAPI"],
    badge: "Most Advanced",
    badgeColor: "bg-[#F5F7FA] text-[#081e5a]",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    ),
  },
  {
    id: "problem-gen",
    title: "Problem Generator",
    description:
      "Generate custom coding problems by difficulty, language, and topic",
    stack: ["Qwen", "FastAPI", "React"],
    badge: null,
    badgeColor: "",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a11.255 11.255 0 01-3 0"
        />
      </svg>
    ),
  },
];

function SystemContent({ id }: { id: string }) {
  switch (id) {
    case "AI-Score":
      return <CodeGrader />;
    case "doc-qa":
      return <DocumentQA />;
    case "problem-gen":
      return <ProblemGenerator />;
    default:
      return null;
  }
}

export default function LabPage() {
  const [activeSystem, setActiveSystem] = useState("AI-Score");

  const activeData = SYSTEMS.find((s) => s.id === activeSystem)!;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Page header */}
      <div className="pt-28 pb-10 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold text-[#6e95d0] uppercase tracking-widest mb-2">
            Interactive Playground
          </p>
          <h1 className="text-4xl font-bold text-[#081e5a] mb-2">
            AI Systems Lab
          </h1>
          <p className="text-[#7D93C0]">
            Explore and interact with my AI systems — built with real ML models
            and backend pipelines.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
          {/* Sidebar nav */}
          <aside className="lg:sticky lg:top-24 flex flex-col gap-2">
            {SYSTEMS.map((system) => (
              <button
                key={system.id}
                onClick={() => setActiveSystem(system.id)}
                className={`group flex items-start gap-3 p-4 rounded-2xl border text-left transition-all ${
                  activeSystem === system.id
                    ? "bg-[#fff] border-primary/40 shadow-sm"
                    : "bg-[#fff] border-border hover:border-accent hover:scale-[1.01]"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${activeSystem === system.id ? "bg-[#6e95d0] text-[#ffffff]" : "bg-secondary text-muted-foreground group-hover:bg-accent/40 group-hover:text-foreground"}`}
                >
                  {system.icon}
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-sm font-semibold ${activeSystem === system.id ? "text-[#081e5a]" : "text-[#7D93C0] group-hover:text-[#081e5a]"}`}
                    >
                      {system.title}
                    </span>
                    {system.badge && (
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${system.badgeColor}`}
                      >
                        {system.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#7D93C0] leading-relaxed">
                    {system.description}
                  </p>
                </div>
              </button>
            ))}
          </aside>

          {/* Main content panel */}
          <div className="rounded-3xl bg-card border border-border p-6 md:p-8">
            {/* Panel header */}
            <div className="flex flex-col gap-1 pb-6 mb-6 border-b border-border">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold text-[#081e5a]">
                  {activeData.title}
                </h2>
                {activeData.badge && (
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${activeData.badgeColor}`}
                  >
                    {activeData.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-[#7D93C0] leading-relaxed">
                {activeData.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {activeData.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-[#F5F7FA] text-xs font-medium text-[#081e5a]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* System content */}
            <SystemContent id={activeSystem} />
          </div>
        </div>
      </div>

      <footer className="border-t border-border py-8 px-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#7D93C0]">
            &copy; {new Date().getFullYear()} Phạm Tuấn Anh. AI Systems Lab.
          </p>
          <p className="text-xs text-[#7D93C0]">
            Powered by Gemini, FastAPI, and LangChain
          </p>
        </div>
      </footer>
    </main>
  );
}
