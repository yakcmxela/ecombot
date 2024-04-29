"use client";

import { useContext } from "react";

import { IconQuestion } from "@/ui/icons/IconQuestion";
import { BotContext, BotDispatchContext } from "@/context";

export const ChatHistory = () => {
  const context = useContext(BotContext);
  const dispatch = useContext(BotDispatchContext);

  if (!context.chats || context.chats.length === 0) return null;
  if (context.isChatActive) return null;

  return (
    <section className="w-full container max-w-[900px] px-6">
      <h2 className="text-base font-body font-semibold text-center leading-6 pt-[150px] pb-4">
        Previous conversations
      </h2>
      <div className="relative">
        <div
          className="absolute left-0 right-0 bottom-0 h-[100%] pointer-events-none"
          style={{
            background:
              "linear-gradient(0deg, #EEEADF 0%, rgba(238, 234, 223, 0) 100%)",
          }}
        />
        <ul className="max-h-[300px] w-full overflow-scroll">
          {context.chats?.map((chat) => (
            <li key={chat.id} className="py-4">
              <button
                className="flex items-start"
                onClick={() => dispatch.queueOldChat(chat.id!)}
              >
                <IconQuestion className="flex-shrink-0" />
                <p className="text-left pt-1">{chat.question}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
