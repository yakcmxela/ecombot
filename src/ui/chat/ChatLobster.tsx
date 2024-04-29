"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { animated, useChain, useSpring, useSpringRef } from "react-spring";

import { useMeasure } from "@/hooks/useMeasure";
import { useChatStatus } from "@/hooks/useChatStatus";
import { delay } from "@/util/delay";
import { Chat } from "@/types/Chat";
import Image from "next/image";

const ICON_HEIGHT_SMALL = 40;
const ICON_HEIGHT_LARGE = 120;
const SCALE = ICON_HEIGHT_LARGE / ICON_HEIGHT_SMALL;

export const ChatLobster = ({ chat }: { chat?: Partial<Chat> }) => {
  const chatStatus = useChatStatus(chat?.id);
  const containerRef = useSpringRef();
  const lobsterSpringRef = useSpringRef();
  const lobsterOpacitySpringRef = useSpringRef();

  const [answerTyped, setAnswerTyped] = useState<string>("");
  const [containerRect, setContainerRect] = useState<DOMRect>();
  const [iconRect, setIconRect] = useState<DOMRect>();
  const [headingRect, setHeadingRect] = useState<DOMRect>();
  const [typedRect, setTypedRect] = useState<DOMRect>();

  const answer = useMemo(() => chat?.blogsResponse?.response, [chat]);

  const inTitleMode = useMemo(() => {
    return !chatStatus.isChatStarted;
  }, [chatStatus.isChatStarted]);

  const measureIconContainer = useMeasure<HTMLDivElement>(
    (rect) => {
      setContainerRect(rect);
    },
    [inTitleMode]
  );

  const measureIcon = useMeasure<HTMLDivElement>(
    (rect) => {
      setIconRect(rect);
    },
    [inTitleMode]
  );

  const measureHeading = useMeasure<HTMLDivElement>(
    (rect) => {
      setHeadingRect(rect);
    },
    [inTitleMode]
  );

  const measureTypedRef = useMeasure<HTMLDivElement>(
    (rect) => {
      setTypedRect(rect);
    },
    [
      inTitleMode,
      answer,
      answerTyped,
      chatStatus.isFocused,
      chatStatus.isChatStarted,
      chatStatus.isTyping,
    ]
  );

  const { rightPosition, topPosition, opacity } = useMemo(() => {
    if (typeof window === "undefined" || !iconRect || !containerRect)
      return { rightPosition: 0, topPosition: 0, opacity: 0 };
    return {
      opacity: 1,
      rightPosition: containerRect.width / 2 - ICON_HEIGHT_LARGE / 2,
      topPosition: 0,
    };
  }, [iconRect, containerRect, chatStatus.isChatStarted]);

  const container = useSpring({
    ref: containerRef,
    paddingTop: inTitleMode ? `${ICON_HEIGHT_LARGE}px` : `0px`,
    height: inTitleMode
      ? `${ICON_HEIGHT_LARGE + (headingRect?.height ?? 0) ?? 212}px`
      : chatStatus.isTyping && !answerTyped
      ? `${ICON_HEIGHT_SMALL + 24}px`
      : `${ICON_HEIGHT_SMALL + (typedRect?.height ?? 0) + 24}px`,
  });

  const lobsterSpring = useSpring({
    ref: lobsterSpringRef,
    transform: !inTitleMode
      ? `translate(0px, 0px) scale(1)`
      : `translate(${rightPosition}px, ${topPosition}px)  scale(${SCALE})`,
  });

  const headingSpring = useSpring({
    ref: lobsterSpringRef,
    from: {
      opacity: 0,
      height: !inTitleMode ? "0px" : `${headingRect?.height}px`,
    },
    to: {
      opacity: 1,
      height: !inTitleMode ? "0px" : `${headingRect?.height}px`,
    },
  });

  const lobsterSpringOpacity = useSpring({
    ref: lobsterOpacitySpringRef,
    from: { opacity: 0 },
    to: { opacity: opacity },
  });

  const typeAnswer = useCallback(async () => {
    if (!answer) return;
    if (!chatStatus.isTyping) {
      setAnswerTyped(answer);
    } else {
      const words = (answer || "").split(" ");
      for (const word of words) {
        await delay(25);
        setAnswerTyped((prev) => prev + " " + word);
      }
      chatStatus.setTypingComplete(true);
    }
  }, [answer, chatStatus.isTyping]);

  useChain(
    [lobsterSpringRef, containerRef, lobsterOpacitySpringRef],
    [0, 0, 0.4]
  );

  useEffect(() => {
    lobsterSpringRef.start();
  }, [chatStatus.isChatStarted, inTitleMode, chatStatus.isFocused]);

  useEffect(() => {
    if (answer && chatStatus.isChatStarted && chatStatus.isFocused) {
      if (chatStatus.isTyping) {
        typeAnswer();
      } else {
        setAnswerTyped(answer);
        containerRef.set({
          paddingTop: `0px`,
          height: `${ICON_HEIGHT_SMALL + (typedRect?.height ?? 0) + 24}px`,
        });
      }
    } else if (!answer) {
      containerRef.set({
        paddingTop: `0px`,
        height: `${ICON_HEIGHT_SMALL + 24}px`,
      });
      setAnswerTyped("");
    }
  }, [
    answer,
    chatStatus.isChatStarted,
    chatStatus.isFocused,
    chatStatus.isTyping,
  ]);

  return (
    <animated.section title="lobster chatbot" style={container}>
      <div ref={measureIconContainer}>
        <animated.div
          style={{ ...lobsterSpring, ...lobsterSpringOpacity }}
          className="inline-block origin-bottom-left mb-1 mr-auto"
          ref={measureIcon}
        >
          <Image
            src="/lobster.png"
            alt="Everett the lobster"
            width={ICON_HEIGHT_LARGE}
            height={ICON_HEIGHT_LARGE}
            className="rounded-full border-2 border-white shadow w-[40px] h-[40px]"
          />
        </animated.div>
      </div>

      {inTitleMode && (
        <animated.h1
          style={headingSpring}
          className="relative w-full text-3xl leading-12 font-heading text-themeBlue font-normal text-center"
        >
          <span
            ref={measureHeading}
            className="py-8 w-full absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
          >
            CHAT WITH CLAWDE
          </span>
        </animated.h1>
      )}
      {chatStatus.isChatStarted &&
        (answer ? (
          <div className="relative">
            {chatStatus.isFocused ? (
              <div
                className="absolute left-0 top-0 w-full"
                ref={measureTypedRef}
              >
                <p
                  className="w-full text-base leading-6 text-themeBlue my-4"
                  dangerouslySetInnerHTML={{
                    __html: answerTyped.split("\n").join("<br/>"),
                  }}
                />
              </div>
            ) : (
              <div
                className="absolute left-0 top-0 w-full"
                ref={measureTypedRef}
              >
                <p
                  className="w-full text-base leading-6 text-themeBlue my-4"
                  dangerouslySetInnerHTML={{
                    __html: answer.split("\n").join("<br/>"),
                  }}
                />
              </div>
            )}
          </div>
        ) : null)}
    </animated.section>
  );
};
