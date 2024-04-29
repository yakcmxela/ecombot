export type Blog = {
  id: string;
  content?: string;
  title: string;
  author: string;
  readingTime: string;
  image?: string;
  url: string;
};

export type BlogsResponse = {
  response: string;
  blogs: Blog[];
};
