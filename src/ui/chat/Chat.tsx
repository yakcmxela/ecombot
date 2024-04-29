"use client";

import { useContext } from "react";

import { ChatItem } from "./ChatItem";
import { BotContext } from "@/context";

export const Chat = () => {
  const context = useContext(BotContext);

  return (
    <ul className="w-full">
      {(context.chats || []).length > 1 && context.isChatActive
        ? (context.chats || []).slice(1).map((chat, i) => {
            return (
              <li key={chat.id}>
                <ChatItem chat={chat} />
              </li>
            );
          })
        : null}
      <ChatItem chat={(context.chats || [])[0]} />
    </ul>
  );
};
