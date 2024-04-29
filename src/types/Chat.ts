import { BlogsResponse } from "./Blog";
import { ProductsResponse } from "./Product";

export type Chat = {
  id: string;
  question: string;
  answer: string;
  blogsResponse: BlogsResponse;
  productsResponse: ProductsResponse;
};
