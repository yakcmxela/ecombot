"use client";

import { FormEvent, useContext, useRef, useState } from "react";

import { BotContext, BotDispatchContext } from "@/context";

export const ChatForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  const context = useContext(BotContext);
  const dispatch = useContext(BotDispatchContext);

  const [search, setSearch] = useState("");

  const onSubmitForm = async (event: FormEvent) => {
    event.preventDefault();
    dispatch.queueNewChat(search);
    setSearch("");
  };

  return (
    <form ref={ref} onSubmit={onSubmitForm} className="my-16">
      <fieldset className="shadow-lg w-[366px] max-w-[100%] border-themeRed bg-transparent bg-white rounded-full border-2 py-4 px-6 flex justify-between">
        <input
          disabled={context.loadingBlogsId !== undefined}
          className="disabled:opacity-50 w-full text-sm outline-none text-themeBlue border-none bg-transparent placeholder-themeBlue"
          placeholder="Enter yer inquiries..."
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          value={search}
        />
        <button
          disabled={context.loadingBlogsId !== undefined}
          className="disabled:opacity-50 pl-2"
          type="submit"
        >
          ⁉️
        </button>
      </fieldset>

      {context.error &&
        context.error.length > 0 &&
        context.error.map((error, i) => {
          return (
            <p
              key={`error${i}`}
              className="text-red-400 my-4 text-sm text-center"
            >
              {error}
            </p>
          );
        })}
    </form>
  );
};
