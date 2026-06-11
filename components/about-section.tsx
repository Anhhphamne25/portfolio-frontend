const skills = [
  "Python", "FastAPI", "LangChain", "RAG", "Qdrant",
  "React", "Next.js", "TypeScript", "Docker", "PostgreSQL",
  "OpenAI API", "Hugging Face", "Vector Databases", "REST APIs", "Redis",
]

const highlights = [
  { year: "2024", label: "Built RAG-powered Document Q&A system" },
  { year: "2023", label: "AI Code Grader with 95% accuracy feedback" },
  { year: "2022", label: "Music Genre Classifier — 87% test accuracy" },
  { year: "2021", label: "B.Sc. Computer Science — AI specialization" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">About</p>
              <h2 className="text-3xl font-bold text-foreground mb-4">Building AI that actually works</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m a software engineer with a deep focus on AI systems and backend architecture. I design and ship
              production-grade AI applications — not demos. My work spans retrieval-augmented generation, code
              intelligence, and machine learning pipelines.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I care about systems that are reliable, fast, and genuinely useful. Every project I build is grounded in
              real engineering principles — clean APIs, thoughtful architecture, and measurable outcomes.
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-xl bg-secondary border border-border text-sm font-medium text-foreground hover:bg-accent/40 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Highlights</p>
            <div className="flex flex-col gap-3">
              {highlights.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start p-4 rounded-2xl bg-card border border-border hover:border-accent hover:shadow-sm transition-all"
                >
                  <span className="text-xs font-bold text-primary bg-secondary px-2 py-1 rounded-lg shrink-0 mt-0.5">
                    {item.year}
                  </span>
                  <p className="text-sm text-foreground font-medium leading-relaxed">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
