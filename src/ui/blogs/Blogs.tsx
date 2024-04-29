"use client";

import { animated, useTransition } from "react-spring";
import { Blog } from "@/types/Blog";
import { BlogItem } from "./BlogItem";

export const Blogs = ({
  animateIn,
  blogs,
}: {
  animateIn?: boolean;
  blogs?: Blog[];
}) => {
  const transition = useTransition(blogs ?? [], {
    trail: 400 / (blogs || []).length,
    from: animateIn ? { opacity: 0 } : { opacity: 1 },
    enter: animateIn ? { opacity: 1 } : { opacity: 1 },
    leave: animateIn ? { opacity: 0 } : { opacity: 1 },
  });

  return (
    <section title="Blogs">
      {(blogs || []).length > 0 && (
        <>
          <p className="mb-4">
            Here are some related articles you might find useful:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {transition((style, b) => {
              const blog = b as Blog;
              return (
                <animated.li
                  key={blog.id}
                  style={style}
                  className="w-full origin-bottom-center"
                >
                  <BlogItem blog={blog} />
                </animated.li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
};
