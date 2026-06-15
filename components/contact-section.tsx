const contactLinks = [
  {
    label: "Email",
    value: "AhhPam.Work@gmail.com",
    href: "mailto:AhhPam.Work@gmail.com",
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
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/Anhhphamne25",
    href: "https://github.com/Anhhphamne25",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/tuấn-anh-phạm-0746193b3",
    href: "https://linkedin.com/in/tuấn-anh-phạm-0746193b3",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 bg-[#ffffff]">
      <div className="max-w-5xl mx-auto ">
        <div className="rounded-3xl bg-[#F5F7FA] border border-border p-10 md:p-16 flex flex-col md:flex-row gap-12 items-center">
          {/* Left */}
          <div className="flex-1 flex flex-col gap-4">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest">
              Contact
            </p>
            <h2 className="text-3xl font-bold text-foreground text-balance">
              Let&apos;s build something together
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m open to new opportunities, collaborations, and
              interesting projects. Feel free to reach out through any of the
              channels below.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3 w-full md:w-auto md:min-w-72">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#fff] border border-border hover:border-accent hover:bg-accent/20 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors border border-border">
                  {link.icon}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{link.label}</p>
                  <p className="text-sm font-medium text-foreground">
                    {link.value}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors"
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
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
