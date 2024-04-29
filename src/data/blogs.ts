"use server";

import Promise from "bluebird";
import { v4 as uuidv4 } from "uuid";

import { Blog, BlogsResponse } from "@/types/Blog";
import { createRequest } from "@/util/requests";
import { getOGData } from "./og";

export const getBlogs = async (
  question: string
): Promise<BlogsResponse | undefined> => {
  type BlogFromAPI = {
    title: string;
    author: string;
    url: string;
    reading_time: string;
  };
  const blogsResponse = await createRequest<{
    blogs: BlogFromAPI[];
    response: string;
  }>("Demo", {
    action: "getBlogs",
    question,
  });

  if (blogsResponse.data) {
    const response = blogsResponse.data.response;
    const blogs = await Promise.map<BlogFromAPI, Blog>(
      blogsResponse.data.blogs,
      async (blog) => {
        const ogData = await getOGData(blog.url);
        let ogImage;
        let ogDescription;
        if (ogData && ogData.ogImage && ogData.ogImage.length > 0) {
          ogImage = ogData.ogImage[0].url;
        }
        if (ogData && ogData.ogDescription) {
          ogDescription = ogData.ogDescription;
        }
        const blogToReturn: Blog = {
          id: uuidv4(),
          readingTime: blog.reading_time,
          image: ogImage,
          title: blog.title,
          author: blog.author,
          url: blog.url,
          content: ogDescription,
        };
        return blogToReturn;
      },
      {
        concurrency: 2,
      }
    );
    return {
      blogs,
      response,
    };
  }
};
