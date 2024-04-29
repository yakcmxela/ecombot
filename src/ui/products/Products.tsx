"use client";

import { Product } from "@/types/Product";
import { ProductItem } from "@/ui/products/ProductItem";

export const Products = ({ products }: { products?: Product[] }) => {
  if (!products) return null;

  return (
    <section title="Products">
      <p className="mb-4">
      Here is some relevant gear you might be interested in:
      </p>
      <ul className="flex gap-4 overflow-scroll pr-6">
        {products.map((p) => (
          <ProductItem product={p} key={p.id} />
        ))}
      </ul>
    </section>
  );
};
