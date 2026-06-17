import Link from "next/link";

const systems = [
  {
    id: "AI-Score",
    title: "AI Code Scoring",
    description:
      "Submit code solutions and receive AI-generated feedback with scores and improvement tips.",
    stack: ["Python", "Gemini", "AST Analysis", "FastAPI", "langchain"],
    badge: "Most Impressive",
    badgeColor: "bg-[#6e95d0] text-[#ffffff]",
    featured: true,
  },
  {
    id: "doc-qa",
    title: "Document Q&A",
    description:
      "Upload a PDF and ask questions. RAG pipeline retrieves precise answers with source references.",
    stack: ["RAG", "Embedding", "FastAPI", "Qwen", "Qdrant"],
    badge: "Most Advanced",
    badgeColor: "bg-[#F5F7FA] text-[#081e5a]",
    featured: true,
  },
  {
    id: "problem-gen",
    title: "AI Problem Generator",
    description:
      "Generate custom coding problems by difficulty, language, and topic in seconds.",
    stack: ["FastAPI", "MultiAgent", "Gemini"],
    badge: null,
    badgeColor: "",
    featured: false,
  },
];

export function SystemsPreview() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-bold text-[#6e95d0] uppercase tracking-widest mb-3">
              AI Systems
            </p>
            <h2 className="text-3xl font-bold text-[#081e5a]">
              Featured Systems
            </h2>
            <p className="text-[#7D93C0] mt-2">
              Interactive AI tools you can try right now
            </p>
          </div>
          <Link
            href="/lab"
            className="px-5 py-2.5 rounded-2xl bg-[#6e95d0] border border-border text-[#ffffff] text-sm font-medium hover:bg-[#6e95d0]/80 transition-all hover:scale-105 whitespace-nowrap w-fit"
          >
            View All Systems
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {systems.map((system) => (
            <div
              key={system.id}
              className={`group relative flex flex-col gap-4 p-6 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer ${
                system.featured
                  ? "bg-card border-accent/60 shadow-sm"
                  : "bg-card border-border"
              }`}
            >
              {/* Badge */}
              {system.badge && (
                <span
                  className={`absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full ${system.badgeColor}`}
                >
                  {system.badge}
                </span>
              )}

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#081e5a]">
                  {system.title}
                </h3>
                <p className="text-sm text-[#7D93C0] leading-relaxed">
                  {system.description}
                </p>
              </div>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-1.5">
                {system.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-[#F5F7FA] border border-border text-xs font-medium text-[#081e5a]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                href="/lab"
                className="mt-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6e95d0] border border-border text-sm font-medium text-[#ffffff] hover:bg-[#6e95d0]/80 transition-colors w-fit group-hover:border-accent"
              >
                Try it
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
