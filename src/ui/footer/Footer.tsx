"use client";

import { useContext, useEffect } from "react";

import { BotContext, BotDispatchContext } from "@/context";
import { IconBack } from "@/ui/icons/IconBack";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const context = useContext(BotContext);
  const { setIsChatActive } = useContext(BotDispatchContext);

  const onClickGoBack = () => {
    setIsChatActive(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    onClickGoBack();
  }, []);

  return (
    <>
      <nav className="w-full drop-shadow-[0_0px_4px_rgba(0,0,0,0.1)]  fixed bottom-0 bg-slate-100 px-4 pt-3 z-10 overflow-hidden">
        <div className="container relative flex items-center justify-between mx-auto max-w-[900px]">
          {context.isChatActive ? (
            <IconBack onClick={onClickGoBack} className="cursor-pointer" />
          ) : (
            <span className="block w-10" />
          )}
          <div className="flex items-center">
            <Image
              className="h-full rotate-[-10deg] translate-x-2"
              src="/flag.png"
              alt="Flag"
              width={100}
              height={50}
            />
            <div className="m-4">
              <p className="text-sm">An AI driven shopping experience.</p>
              <p className="text-xs">
                UI by{" "}
                <Link className="text-themeRed" href="https://github.com/yakcmxela">Alex McKay</Link>
              </p>
            </div>
          </div>
          <span className="block w-10" />
        </div>
      </nav>
      <span className="block h-[200px] pb-12 " />
    </>
  );
};
