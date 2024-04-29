"use server";
import Promise from "bluebird";

import { v4 as uuidv4 } from "uuid";
import { Product, ProductsResponse } from "@/types/Product";
import { createRequest } from "@/util/requests";
import { getOGData } from "./og";

export const getProducts = async (
  question: string
): Promise<ProductsResponse | undefined> => {
  const productsResponse = await createRequest<{
    response: string;
    products: Omit<Product, "id">[];
  }>("Demo", {
    action: "getProducts",
    question,
  });
  if (productsResponse.data) {
    const products = await Promise.map<Omit<Product, "id">, Product>(
      productsResponse.data.products,
      async (product) => {
        const ogData = await getOGData(product.url);
        let ogImage;
        let ogDescription;
        if (ogData && ogData.ogImage && ogData.ogImage.length > 0) {
          ogImage = ogData.ogImage[0].url;
        }
        if (ogData && ogData.ogDescription) {
          ogDescription = ogData.ogDescription;
        }
        const productToReturn: Product = {
          id: uuidv4(),
          image: ogImage ?? product.image,
          name: product.name,
          price: product.price,
          salePrice: product.salePrice,
          url: product.url,
        };
        return productToReturn;
      },
      {
        concurrency: 2,
      }
    );
    return {
      products,
    };
  }
};
