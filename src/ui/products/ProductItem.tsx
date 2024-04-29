import Link from "next/link";

import { Product } from "@/types/Product";
import { useMemo, useState } from "react";
import { PLACEHOLDER } from "@/types/constants";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const ProductItem = ({ product }: { product: Product }) => {
  const [imageUrl, setImageUrl] = useState<string>(
    product.image ?? PLACEHOLDER
  );

  const isOnSale = useMemo(() => {
    return product.salePrice && product.salePrice !== product.price;
  }, [product.salePrice, product.price]);

  return (
    <Link href={product.url}>
      <li
        className="w-[170px] h-[262px] shadow-lg bg-white rounded-lg flex-shrink-0 overflow-hidden p-4 flex flex-col"
        key={product.id}
      >
        <img
          src={imageUrl}
          alt={product.name}
          width={170}
          height={500}
          className="w-full object-contain"
          onError={() => setImageUrl(PLACEHOLDER)}
        />
        <h3 className="pt-4 mt-auto text-left line-clamp-2">{product.name}</h3>
        <div className="flex items-center mt-4-auto justify-between">
          {isOnSale && (
            <p className="text-sm font-medium leading-[18px] text-themeRed">
              {currencyFormatter.format(Number(product.salePrice))}
            </p>
          )}
          <p className="text-sm font-medium leading-[18px]">
            {isOnSale ? (
              <s>{currencyFormatter.format(Number(product.price))}</s>
            ) : (
              currencyFormatter.format(Number(product.price))
            )}
          </p>
        </div>
      </li>
    </Link>
  );
};
