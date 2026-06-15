import Link from "next/link";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border w-fit">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">
              Available for opportunities
            </span>
          </div>

          <div className="flex flex-col gap-3 ">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">
              Phạm Tuấn Anh
            </h1>
            <p className="text-xl font-medium text-primary">
              AI Engineer / Backend Developer
            </p>
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
            I build intelligent systems that solve real-world problems — from
            RAG pipelines and code graders to music classifiers and document
            understanding engines.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/lab"
              className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              View Systems
            </Link>
            <Link
              href="/#chat"
              className="px-6 py-3 rounded-2xl bg-secondary text-foreground font-semibold border border-border hover:bg-accent/40 transition-all hover:scale-105 active:scale-95"
            >
              Chat with me
            </Link>
          </div>
        </div>

        {/* Right — visual card */}
        <div className="relative flex justify-center">
          <div className="relative w-72 h-72 md:w-80 md:h-80">
            {/* Background glow */}
            <div className="absolute inset-0 rounded-3xl bg-accent/40 blur-2xl scale-110" />
            {/* Avatar card */}
            <div className="relative w-full h-full rounded-3xl bg-card border border-border shadow-lg flex flex-col items-center justify-center gap-4 p-8">
              <div className="w-24 h-24 rounded-2xl bg-accent flex items-center justify-center text-4xl font-bold text-foreground">
                AC
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">Alex Chen</p>
                <p className="text-sm text-muted-foreground">AI Engineer</p>
              </div>
              {/* Stats row */}
              <div className="flex gap-4 w-full mt-2">
                {[
                  { label: "Systems", value: "4+" },
                  { label: "Projects", value: "12+" },
                  { label: "Stack", value: "10+" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex-1 text-center p-2 rounded-xl bg-secondary"
                  >
                    <p className="font-bold text-foreground text-sm">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
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
