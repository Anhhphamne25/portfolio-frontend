import { AiChatSection } from "@/components/ai-chat-section";
import { Navbar } from "@/components/navbar";

export default function PamBotPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AiChatSection />
    </main>
  );
}
