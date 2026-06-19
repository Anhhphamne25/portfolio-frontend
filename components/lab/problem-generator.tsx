"use client";

import { useState } from "react";
import { generateProblem } from "../../services/api-labs";

type ProblemOutput = {
  title: string;
  description: string;
  examples: { input: string; output: string }[];
  constraints: string;
};

const DIFFICULTIES = ["easy", "medium", "hard"];
const LANGUAGES = ["Python", "JavaScript", "C++", "Java"];
const TOPICS = [
  "Array",
  "Dynamic Programming",
  "Graph",
  "Tree",
  "String",
  "Hash Map",
  "Binary Search",
  "Stack",
];

export function ProblemGenerator() {
  const [difficulty, setDifficulty] = useState("medium");
  const [language, setLanguage] = useState("python");
  const [topic, setTopic] = useState("array");
  const [result, setResult] = useState<ProblemOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const data = await generateProblem(topic, difficulty, language);
      setResult(data);
    } catch {
      setResult({
        title: "Error",
        description: "Failed to generate problem. Please try again.",
        examples: [],
        constraints: " ",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Config */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Difficulty */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-[#7D93C0] uppercase tracking-wide">
            Difficulty
          </label>
          <div className="flex gap-2">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                  difficulty === d
                    ? "bg-[#6e95d0] text-[#fff] border-primary"
                    : "bg-[#6e95d0]/10 border-border text-[#7D93C0] hover:border-primary/40"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-[#7D93C0] uppercase tracking-wide">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#6e95d0]/10 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Topic */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-[#7D93C0] uppercase tracking-wide">
            Topic
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#6e95d0]/10 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 rounded-2xl bg-[#6e95d0] text-[#fff] font-semibold hover:opacity-90 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Generating problem...
          </span>
        ) : (
          "Generate Problem"
        )}
      </button>

      {/* Output */}
      {result && (
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-[#081e5a] text-lg">{result.title}</h3>
            <span className="px-2.5 py-1 rounded-full bg-[#6e95d0]/15 text-[#6e95d0] text-xs font-semibold">
              {difficulty}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#6e95d0]/10 text-[#7D93C0] text-xs">
              {topic}
            </span>
          </div>

          <p className="text-sm text-[#3E5A9A] leading-relaxed">
            {result.description}
          </p>

          {result.examples.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-[#7D93C0] uppercase tracking-wide">
                Examples
              </p>
              {result.examples.map((ex, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-[#6e95d0]/10 border border-border p-3 text-xs font-mono"
                >
                  <p>
                    <span className="text-[#7D93C0]">Input: </span>
                    <span className="text-[#081e5a]">{ex.input}</span>
                  </p>
                  <p>
                    <span className="text-[#7D93C0]">Output: </span>
                    <span className="text-[#081e5a]">{ex.output}</span>
                  </p>
                </div>
              ))}
            </div>
          )}

          {result.constraints.length > 0 && (
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-[#7D93C0] uppercase tracking-wide">
                Constraints
              </p>
              <p className="text-xs text-[#3E5A9A] font-mono">
                {result.constraints}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
