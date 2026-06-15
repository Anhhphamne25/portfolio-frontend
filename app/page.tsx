import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SystemsPreview } from "@/components/systems-preview";
import { AiChatSection } from "@/components/ai-chat-section";
import { ContactSection } from "@/components/contact-section";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SystemsPreview />
      {/* <AiChatSection /> */}
      <ContactSection />

      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Phạm Tuấn Anh.
          </p>
          <p className="text-xs text-muted-foreground">
            AI Engineer / Backend Developer
          </p>
        </div>
      </footer>
    </main>
  );
}
