"use client";

import { BotProvider } from "@/context";
import { ChatHistory } from "@/ui/chat/ChatHistory";
import { ChatForm } from "@/ui/chat/ChatForm";
import { Footer } from "@/ui/footer/Footer";
import { Chat } from "@/ui/chat/Chat";

export default function EcomBot() {
  return (
    <BotProvider>
      <main className="pt-10 min-h-[100vh] flex flex-col items-center container mx-auto max-w-[900px]">
        <Chat />
        <ChatForm />
        <ChatHistory />
      </main>
      <Footer />
    </BotProvider>
  );
}
