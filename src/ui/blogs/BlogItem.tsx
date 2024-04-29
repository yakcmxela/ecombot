import { useState } from "react";
import Link from "next/link";

import { Blog } from "@/types/Blog";
import { IconClock } from "../icons/IconClock";
import { PLACEHOLDER } from "@/types/constants";

export const BlogItem = ({ blog }: { blog: Blog }) => {
  const [imageUrl, setImageUrl] = useState<string>(
    blog.image === undefined ? PLACEHOLDER : blog.image
  );
  return (
    <Link href={blog.url} title={blog.title}>
      <div className="flex flex-col user-select-none">
        <img
          src={imageUrl}
          alt={blog.title}
          width={500}
          height={500}
          className="w-full h-[200px] md:h-[350px] object-cover rounded-lg mb-4"
          onError={() => setImageUrl(PLACEHOLDER)}
        />
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-sm">{blog.author}</p>
          </div>
          <p className="flex items-center text-sm">
            <IconClock className="w-4 h-4 mr-2" /> {blog.readingTime}
          </p>
        </div>
        <h3 className="text-lg line-clamp-2 my-4 text-themeBlue leading-6">
          {blog.title}
        </h3>
        {blog.content && (
          <p className="text-body text-sm mb-4">{blog.content}</p>
        )}
      </div>
    </Link>
  );
};
