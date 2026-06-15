const skills = [
  "Python",
  "FastAPI",
  "LangChain",
  "RAG",
  "Qdrant",
  "React",
  "Next.js",
  "TypeScript",
  "Docker",
  "PostgreSQL",
  "OpenAI API",
  "Hugging Face",
  "Vector Databases",
  "REST APIs",
  "Redis",
];

const highlights = [
  {
    year: "2024",
    label: "Built RAG-powered Document Q&A system",
    detail:
      "Developed a RAG-based document question answering system for enterprise use.",
  },
  {
    year: "2023",
    label: "AI Code Grader with 95% accuracy feedback",
    detail:
      "Created an AI-powered code grader that provides 95% accurate feedback on student submissions.",
  },
  {
    year: "2022",
    label: "Music Genre Classifier — 87% test accuracy",
    detail:
      "Built a music genre classifier with 87% accuracy on a diverse dataset.",
  },
  {
    year: "2021",
    label: "B.Sc. Computer Science — AI specialization",
    detail:
      "Completed a Bachelor's degree in Computer Science with a focus on Artificial Intelligence.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-[#ffffff]">
      <div className="max-w-5xl mx-auto ">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-bold text-[#6e95d0] uppercase tracking-widest mb-3">
                About
              </p>
              <h2 className="text-3xl font-bold text-[#081e5a] mb-4">
                Building AI that actually works
              </h2>
            </div>
            <p className="text-[#7D93C0] leading-relaxed">
              I&apos;m a software engineer with a deep focus on AI systems and
              backend architecture. I design and ship production-grade AI
              applications — not demos. My work spans retrieval-augmented
              generation, code intelligence, and machine learning pipelines.
            </p>
            <p className="text-[#7D93C0] leading-relaxed">
              I care about systems that are reliable, fast, and genuinely
              useful. Every project I build is grounded in real engineering
              principles — clean APIs, thoughtful architecture, and measurable
              outcomes.
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-xl bg-[#F5F7FA] border border-border text-sm font-medium text-[#081e5a] hover:bg-accent/40 hover:px-4 hover:py-2 hover:shadow-sm transition-all duration-200 ease-out cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold text-[#6e95d0] uppercase tracking-widest mb-1">
              Experience
            </p>
            <div className="flex flex-col gap-3">
              {highlights.map((item, i) => (
                <div
                  key={i}
                  className="group rounded-2xl bg-[#F5F7FA] border border-border px-4 py-4 hover:border-accent hover:shadow-sm transition-all duration-300 ease-out"
                >
                  <div className="flex gap-4 items-start">
                    <span className="text-xs font-bold text-[#ffffff] bg-[#6e95d0] px-2 py-1 rounded-lg shrink-0 mt-0.5">
                      {item.year}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#081e5a] font-medium leading-relaxed">
                        {item.label}
                      </p>

                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                        <div className="overflow-hidden">
                          <p className="pt-2 text-sm text-[#7D93C0] leading-relaxed opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
