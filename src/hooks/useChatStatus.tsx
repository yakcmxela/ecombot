import { BotContext, BotDispatchContext } from "@/context";
import { useContext, useEffect, useMemo } from "react";

export const useChatStatus = (chatId?: string, triggerFocus = () => {}) => {
  const context = useContext(BotContext);
  const dispatch = useContext(BotDispatchContext);

  const isChatStarted = useMemo(() => {
    if (
      ((context.loadingBlogsId !== undefined &&
        context.loadingProductsId !== undefined) ||
        (context.chats || []).length > 0) &&
      context.isChatActive
    ) {
      return true;
    }
    return false;
  }, [
    context.chats,
    context.loadingBlogsId,
    context.loadingProductsId,
    context.isChatActive,
  ]);

  const isTyping = useMemo(
    () =>
      (context.loadingBlogsId !== undefined &&
        context.loadingBlogsId === chatId) ||
      (context.loadingProductsId !== undefined &&
        context.loadingProductsId === chatId &&
        !context.typingComplete),
    [context.loadingBlogsId, context.loadingProductsId, context.typingComplete]
  );

  const isFocused = useMemo(() => {
    return context.focusChatId != undefined && context.focusChatId === chatId;
  }, [context.focusChatId, chatId]);

  const displayRecommendations = useMemo(() => {
    if (!isFocused) return true;
    return context.typingComplete;
  }, [isFocused, context.typingComplete]);

  useEffect(() => {
    if ((isTyping || isFocused) && isChatStarted) {
      triggerFocus();
    }
  }, [isTyping, isFocused, isChatStarted]);

  return {
    displayRecommendations,
    isTyping,
    isFocused,
    isChatStarted,
    setTypingComplete: dispatch.setTypingComplete,
  };
};
