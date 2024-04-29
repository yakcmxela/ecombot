"use client";

import { useRef } from "react";

import { Blogs } from "@/ui/blogs/Blogs";
import { Chat } from "@/types/Chat";
import { ChatQuestion } from "@/ui/chat/ChatQuestion";
import { ChatLobster } from "@/ui/chat/ChatLobster";
import { Products } from "@/ui/products/Products";
import { useChatStatus } from "@/hooks/useChatStatus";
import { ChatTyping } from "./ChatTyping";

export const ChatItem = ({ chat }: { chat?: Partial<Chat> }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  const triggerFocus = () => {
    if (itemRef.current) {
      setTimeout(() => {
        window.scrollTo({
          behavior: "smooth",
          top: (itemRef.current?.offsetTop ?? 0) - 92,
        });
      }, 1000);
    }
  };

  const { displayRecommendations, isTyping, isFocused, isChatStarted } =
    useChatStatus(chat?.id, triggerFocus);

  return (
    <>
      <div className="w-full px-6" ref={itemRef}>
        {isChatStarted && <ChatQuestion question={chat?.question} />}
        <ChatLobster chat={chat} />
        {isChatStarted && chat?.blogsResponse && displayRecommendations && (
          <Blogs animateIn={isFocused} blogs={chat?.blogsResponse?.blogs} />
        )}
      </div>
      {isTyping && isChatStarted && (
        <div className="pl-6 py-4">
          <ChatTyping />
        </div>
      )}
      {isChatStarted && chat?.productsResponse && displayRecommendations && (
        <div className="max-w-[900px] w-full pl-6">
          <Products products={chat?.productsResponse?.products} />
        </div>
      )}
    </>
  );
};
