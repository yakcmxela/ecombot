"use client";

import { createContext, PropsWithChildren, useCallback, useState } from "react";

import { getAnswer } from "@/data/answer";
import { getBlogs } from "@/data/blogs";
import { getProducts } from "@/data/products";
import { Chat } from "@/types/Chat";
import { v4 as uuidv4 } from "uuid";
import { delay } from "@/util/delay";
import { getBlogMocks } from "@/mocks/blogs";
import { getProductMocks } from "@/mocks/products";

export const BotContext = createContext<{
  chats?: Partial<Chat>[];
  error?: string[];
  isChatActive?: boolean;
  focusChatId?: string;
  loadingBlogsId?: string;
  loadingProductsId?: string;
  typingComplete?: boolean;
}>({});

export const BotDispatchContext = createContext<{
  queueNewChat: (question: string) => void;
  queueOldChat: (id: string) => void;
  clearChat: () => void;
  setIsChatActive: (state: boolean) => void;
  setTypingComplete: (state: boolean) => void;
}>({
  queueNewChat: () => {},
  queueOldChat: () => {},
  clearChat: () => {},
  setIsChatActive: () => {},
  setTypingComplete: () => {},
});

export const BotProvider = ({ children }: PropsWithChildren) => {
  const [chats, setChats] = useState<Partial<Chat>[]>();
  const [error, setError] = useState<string[]>();
  const [isChatActive, setIsChatActive] = useState<boolean>(false);
  const [focusChatId, setFocusChatId] = useState<string>();
  const [loadingBlogsId, setLoadingBlogsId] = useState<string>();
  const [loadingProductsId, setLoadingProductsId] = useState<string>();
  const [typingComplete, setTypingComplete] = useState<boolean>(false);

  const clearChat = () => {
    setChats(undefined);
    setLoadingBlogsId(undefined);
  };

  const queueNewChat = useCallback(
    async (question: string) => {
      setError(undefined);
      setIsChatActive(true);
      setFocusChatId(undefined);
      if (!question || question.length === 0) {
        setError(["No question provided"]);
        return;
      }
      const chatId = uuidv4();
      setLoadingBlogsId(chatId);
      setLoadingProductsId(chatId);
      setChats((prev) => [
        {
          id: chatId,
          question,
        },
        ...(prev || []),
      ]);
      await delay(3000);
      await requestNewResults(question, chatId);
    },
    [loadingBlogsId, chats]
  );

  const queueOldChat = useCallback(
    (id: string) => {
      setIsChatActive(true);
      setFocusChatId(id);
      setTypingComplete(true);
    },
    [focusChatId, isChatActive]
  );

  const addError = (error: unknown) => {
    if (error instanceof ErrorEvent) {
      setError((prev) => [...(prev || []), error.message]);
    } else {
      setError((prev) => [...(prev || []), "An error occurred"]);
    }
  };

  const requestNewResults = useCallback(
    async (question: string, chatId: string) => {
      setFocusChatId(chatId);
      setTypingComplete(false);

      const blogsResponse = await getBlogMocks();
      const productsResponse = await getProductMocks();
      setChats((prev) =>
        (prev || []).map((chat) => {
          if (chat?.id === chatId) {
            return {
              ...chat,
              blogsResponse,
              productsResponse,
            };
          } else {
            return chat;
          }
        })
      );
      // Commented out because this is a DEMO!
      // try {
      //   const answerResponse = await getAnswer(question);
      //   setChats((prev) =>
      //     (prev || []).map((chat) => {
      //       if (chat?.id === chatId) {
      //         return {
      //           ...chat,
      //           answerResponse,
      //         };
      //       } else {
      //         return chat;
      //       }
      //     })
      //   );
      // } catch (error) {
      //   console.error(error);
      //   addError(error)
      // }
      // try {
      //   const blogsResponse = await getBlogs(question);
      //   setChats((prev) =>
      //     (prev || []).map((chat) => {
      //       if (chat?.id === chatId) {
      //         return {
      //           ...chat,
      //           blogsResponse,
      //         };
      //       } else {
      //         return chat;
      //       }
      //     })
      //   );
      // } catch (error) {
      //   console.error(error);
      //   addError(error);
      // }
      setLoadingBlogsId(undefined);
      // try {
      //   const productsResponse = await getProducts(question);
      //   setChats((prev) =>
      //     (prev || []).map((chat) => {
      //       if (chat?.id === chatId) {
      //         return {
      //           ...chat,
      //           productsResponse,
      //         };
      //       } else {
      //         return chat;
      //       }
      //     })
      //   );
      // } catch (error) {
      //   console.error(error);
      //   addError(error);
      // }
      await delay(2000)
      setLoadingProductsId(undefined);
    },
    [loadingBlogsId, chats]
  );

  return (
    <BotContext.Provider
      value={{
        chats,
        error,
        isChatActive: isChatActive,
        focusChatId,
        loadingBlogsId,
        loadingProductsId,
        typingComplete,
      }}
    >
      <BotDispatchContext.Provider
        value={{
          clearChat,
          queueNewChat,
          queueOldChat,
          setIsChatActive: setIsChatActive,
          setTypingComplete,
        }}
      >
        {children}
      </BotDispatchContext.Provider>
    </BotContext.Provider>
  );
};
