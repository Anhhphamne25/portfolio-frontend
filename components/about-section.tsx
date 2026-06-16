"use client";

import { useState } from "react";

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
  "Vector Databases",
  "REST APIs",
  "Redis",
];

const highlights = [
  {
    year: "2025",
    label: "Frontend Developer for NEU Course 2.0",
    detail:
      "Developed the frontend for NEU Course 2.0, a system used to manage, process, and store academic administration workflows. I built user interfaces, handled raw data processing, and integrated the frontend with backend services. The system has been deployed and put into real use.",
  },
  {
    year: "2025",
    label: "AI RAG System for Scientific Research Support",
    detail:
      "Built an AI RAG system to support scientific research at NEU using the university's collection of academic papers. I worked on data preprocessing, text extraction, embedding generation, Qdrant-based vector storage, retrieval optimization, answer generation, and logging. The system has been applied at NEU.",
  },
  {
    year: "2025",
    label: "Backend Developer for NEU Online Judge Enhancement",
    detail:
      "Developed backend features to improve NEU OJ, an online coding practice and assessment system. Key features include AI-powered programming problem generation and editing using a multi-agent loop, as well as AI-based code grading by analyzing submitted code, sample solutions, and problem statements as graph nodes. The system is currently being tested and is planned for official use.",
  },
];

const achievements = [
  {
    year: "2023",
    label: "University-level “Student of Five Merits” Award",
    detail:
      "Recognized as a university-level “Student of Five Merits” for meeting five key criteria: good ethics, strong academic performance, physical fitness, volunteer spirit, and international integration.",
  },
  {
    year: "2025",
    label: "Olympic Informatics Award — Specialized Division",
    detail:
      "Received an award in the Specialized Division of the University-level Olympic Informatics Competition, demonstrating strong problem-solving and programming skills.",
  },
  {
    year: "2026",
    label: "1st Prize in University-level Scientific Research",
    detail:
      "Won 1st Prize with the highest score university-wide for the research project “Building a Data Lake Model for RAG Systems with Knowledge Gap Detection in Searching and Analyzing Academic Papers at National Economics University.” The project was selected to compete at the Ministry of Education and Training level.",
  },
  {
    year: "2026",
    label: "3rd Prize in University-level Scientific Research",
    detail:
      "Won 3rd Prize for the research project “Researching and Developing an Intelligent Online Programming Learning and Examination System Based on Automatic Code Grading.”",
  },
];

export function AboutSection() {
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [awardPinnedIndex, setAwardPinnedIndex] = useState<number | null>(null);
  const [awardHoveredIndex, setAwardHoveredIndex] = useState<number | null>(
    null,
  );

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
                Hi, I&apos;m Phạm Tuấn Anh — an AI Engineer and Backend
                Developer
              </h2>
            </div>
            <p className="text-[#7D93C0] leading-relaxed">
              I&apos;m able to build web applications on both the Frontend and
              Backend, from designing user interfaces and handling APIs to
              managing databases. I have worked with technologies such as
              React/Next.js, Express.js, NestJS, FastAPI, and Prisma. I also
              understand important concepts such as authentication,
              authorization, RBAC, CRUD APIs, and project deployment.
            </p>
            <p className="text-[#7D93C0] leading-relaxed">
              Besides programming skills, I am a fast learner with the ability
              to analyze problems and turn requirements into specific system
              features. I also have experience preparing teaching materials,
              explaining technical knowledge in an easy-to-understand way, and I
              am currently orienting my career toward Backend and AI Backend
              Engineering.
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

          {/* Experience */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold text-[#6e95d0] uppercase tracking-widest mb-1">
                Experience
              </p>
              <div className="flex flex-col gap-3">
                {highlights.map((item, i) =>
                  (() => {
                    const isOpen =
                      pinnedIndex === i ||
                      (pinnedIndex === null && hoveredIndex === i);

                    return (
                      <div
                        key={i}
                        className={`rounded-2xl bg-[#F5F7FA] border border-border px-4 py-4 hover:border-accent hover:shadow-sm transition-all duration-300 ease-out ${
                          isOpen ? "border-accent shadow-sm" : ""
                        }`}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() =>
                          setPinnedIndex((prev) => (prev === i ? null : i))
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setPinnedIndex((prev) => (prev === i ? null : i));
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-expanded={isOpen}
                      >
                        <div className="flex gap-4 items-start">
                          <span className="text-xs font-bold text-[#ffffff] bg-[#6e95d0] px-2 py-1 rounded-lg shrink-0 mt-0.5">
                            {item.year}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-[#081e5a] font-medium leading-relaxed">
                              {item.label}
                            </p>

                            <div
                              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                              }`}
                            >
                              <div className="overflow-hidden">
                                <p
                                  className={`pt-2 text-sm text-[#7D93C0] leading-relaxed transition-all duration-300 ease-out ${
                                    isOpen
                                      ? "opacity-100 translate-y-0"
                                      : "opacity-0 translate-y-2"
                                  }`}
                                >
                                  {item.detail}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })(),
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold text-[#6e95d0] uppercase tracking-widest mb-1">
                Awards
              </p>
              <div className="flex flex-col gap-3">
                {achievements.map((item, i) => {
                  const isOpen =
                    awardPinnedIndex === i ||
                    (awardPinnedIndex === null && awardHoveredIndex === i);

                  return (
                    <div
                      key={i}
                      className={`rounded-2xl bg-[#F5F7FA] border border-border px-4 py-4 hover:border-accent hover:shadow-sm transition-all duration-300 ease-out ${
                        isOpen ? "border-accent shadow-sm" : ""
                      }`}
                      onMouseEnter={() => setAwardHoveredIndex(i)}
                      onMouseLeave={() => setAwardHoveredIndex(null)}
                      onClick={() =>
                        setAwardPinnedIndex((prev) => (prev === i ? null : i))
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setAwardPinnedIndex((prev) =>
                            prev === i ? null : i,
                          );
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isOpen}
                    >
                      <div className="flex gap-4 items-start">
                        <span className="text-xs font-bold text-[#ffffff] bg-[#6e95d0] px-2 py-1 rounded-lg shrink-0 mt-0.5">
                          {item.year}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#081e5a] font-medium leading-relaxed">
                            {item.label}
                          </p>

                          <div
                            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                              isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <p
                                className={`pt-2 text-sm text-[#7D93C0] leading-relaxed transition-all duration-300 ease-out ${
                                  isOpen
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-2"
                                }`}
                              >
                                {item.detail}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
