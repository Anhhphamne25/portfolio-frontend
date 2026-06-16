import Link from "next/link";

export function HeroSection() {
  return (
    <section className="py-20 flex items-center justify-center px-6">
      <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F7FA] border border-border w-fit">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-xs font-medium text-[#7D93C0]">
              Available for opportunities
            </span>
          </div>

          <div className="flex flex-col gap-3 ">
            <h1 className="text-5xl md:text-6xl font-bold text-[#081e5a] text-balance leading-tight">
              Phạm Tuấn Anh
            </h1>
            <p className="text-xl font-medium text-[#3E5A9A]">
              AI Engineer / Backend Developer
            </p>
          </div>

          <p className="text-[#7D93C0] text-lg leading-relaxed text-pretty">
            Information Technology student passionate about Backend Engineering
            and AI, focused on building scalable systems and intelligent
            applications.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/pambot"
              className="px-6 py-3 rounded-2xl bg-[#344ead] text-[#F5F7FA] font-semibold shadow-md hover:opacity-90 transition-all hover:scale-105 active:scale-95"
            >
              Chat with PamBot
            </Link>
            <Link
              href="/lab"
              className="px-6 py-3 rounded-2xl bg-[#F5F7FA] text-[#081e5a] font-semibold shadow-md hover:opacity-90 transition-all hover:scale-105 active:scale-95"
            >
              View Lab
            </Link>
          </div>
        </div>

        {/* Right — visual card */}
        <div className="relative flex justify-center">
          <div className="relative w-80 h-80 md:w-[22rem] md:h-[22rem] lg:w-96 lg:h-96">
            {/* Background glow */}
            <div className="absolute inset-0 rounded-3xl bg-accent/40 blur-2xl scale-110" />
            {/* Avatar card */}
            <div className="relative w-full h-full rounded-3xl bg-card border border-border shadow-lg flex flex-col items-center justify-center gap-4 p-8">
              <div className="w-36 h-36 md:w-40 md:h-40 rounded-2xl bg-accent flex items-center justify-center text-4xl font-bold text-foreground">
                <img
                  src="/Avatar.jpg"
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-2xl scale-110 hover:scale-125 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-[#081e5a]">Phạm Tuấn Anh</p>
                <p className="text-sm text-[#3E5A9A]">
                  AI Engineer - Backend Developer
                </p>
              </div>
              {/* Stats row */}
              <div className="flex gap-4 w-full mt-2">
                {[
                  { label: "GPA", value: "3.63" },
                  { label: "Projects", value: "3" },
                  { label: "Skills", value: "10+" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex-1 text-center p-2 rounded-xl bg-[#F5F7FA]"
                  >
                    <p className="font-bold text-[#081e5a] text-sm">
                      {stat.value}
                    </p>
                    <p className="text-xs text-[#3E5A9A]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
