"use client";

import { useState } from "react";

import { score } from "../../services/api-labs";

const SAMPLE_PROBLEM = {
  title: "Two Sum",
  difficulty: "Easy",
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
  examples: [
    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
    { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "Only one valid answer exists.",
  ],
};

const STARTER_CODE = `def two_sum(nums: list[int], target: int) -> list[int]:
    # Write your solution here
    pass
`;

const SOLUTION = `def two_sum(nums: list[int], target: int) -> list[int]:
    num_dict = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_dict:
            return [num_dict[complement], i]
        num_dict[num] = i
    return []
`;

type GraderResult = {
  score: number;
  verdict: string;
  feedback: string;
  testResults: { input: string; expected: string; passed: boolean }[];
};

export function CodeGrader() {
  const [code, setCode] = useState(STARTER_CODE);
  const [result, setResult] = useState<GraderResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code.trim() || loading) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await score(SAMPLE_PROBLEM.title, code, SOLUTION);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({
        score: 0,
        verdict: "Error",
        feedback: "Failed to connect to grader. Please try again.",
        testResults: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = result
    ? result.score >= 80
      ? "text-primary"
      : result.score >= 50
        ? "text-yellow-600"
        : "text-red-500"
    : "";

  return (
    <div className="flex flex-col gap-6">
      {/* Problem statement */}
      <div className="rounded-2xl bg-secondary border border-border p-5 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-[#081e5a] text-lg">
            {SAMPLE_PROBLEM.title}
          </h3>
          <span className="px-2.5 py-1 rounded-full bg-[#F5F7FA] text-[#081e5a] text-xs font-semibold">
            {SAMPLE_PROBLEM.difficulty}
          </span>
        </div>
        <p className="text-sm text-[#7D93C0] leading-relaxed">
          {SAMPLE_PROBLEM.description}
        </p>

        <div className="flex flex-col gap-2">
          {SAMPLE_PROBLEM.examples.map((ex, i) => (
            <div
              key={i}
              className="rounded-xl bg-card border border-border p-3 text-xs font-mono"
            >
              <span className="text-[#7D93C0]">Input: </span>
              <span className="text-[#081e5a]">{ex.input}</span>
              <br />
              <span className="text-[#7D93C0]">Output: </span>
              <span className="text-[#081e5a]">{ex.output}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-[#7D93C0] uppercase tracking-wide">
            Constraints
          </p>
          {SAMPLE_PROBLEM.constraints.map((c, i) => (
            <p key={i} className="text-xs text-[#7D93C0] font-mono">
              • {c}
            </p>
          ))}
        </div>
      </div>

      {/* Code editor */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-[#7D93C0] uppercase tracking-wide">
            Code Editor (Python)
          </p>
          <button
            onClick={() => setCode(STARTER_CODE)}
            className="text-xs text-[#7D93C0] hover:text-[#081e5a] transition-colors"
          >
            Reset
          </button>
        </div>
        <div className="relative rounded-2xl overflow-hidden border border-border">
          {/* Editor header bar */}
          <div className="bg-foreground/5 border-b border-border px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-primary/60" />
            </div>
            <span className="text-xs text-[#7D93C0] ml-2">solution.py</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-48 px-4 py-3 bg-foreground/[0.03] font-mono text-sm text-[#081e5a] resize-none focus:outline-none leading-relaxed"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 rounded-2xl bg-[#7D93C0] text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
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
            Grading your solution...
          </span>
        ) : (
          "Submit Solution"
        )}
      </button>

      {/* Results */}
      {result && (
        <div className="flex flex-col gap-4 rounded-2xl bg-card border border-border p-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-4">
            <div className={`text-4xl font-bold ${scoreColor}`}>
              {result.score}/100
            </div>
            <div>
              <p className="font-semibold text-[#081e5a]">{result.verdict}</p>
              <p className="text-xs text-[#7D93C0]">AI-graded feedback</p>
            </div>
          </div>

          {/* Test results */}
          {result.testResults.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-[#7D93C0] uppercase tracking-wide">
                Test Cases
              </p>
              {result.testResults.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-xs p-2.5 rounded-xl bg-secondary"
                >
                  <span className={t.passed ? "text-primary" : "text-red-500"}>
                    {t.passed ? "PASS" : "FAIL"}
                  </span>
                  <span className="text-[#7D93C0] font-mono">{t.input}</span>
                  <span className="text-[#7D93C0] ml-auto">
                    Expected: {t.expected}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Feedback */}
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-[#7D93C0] uppercase tracking-wide">
              AI Feedback
            </p>
            <p className="text-sm text-[#081e5a] leading-relaxed whitespace-pre-line">
              {result.feedback}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
