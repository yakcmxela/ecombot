import { Product, ProductsResponse } from "@/types/Product";
import { v4 as uuidv4 } from "uuid";

export const getProductMocks = async (): Promise<ProductsResponse> => {
  const products: Product[] = [
    {
      id: uuidv4(),
      name: "Seafarer's Scourge",
      price: "19.99",
      salePrice: "15.99",
      image: "",
      url: "https://github.com/yakcmxela",
    },
    {
      id: uuidv4(),
      name: "Corsair's Companion",
      price: "29.99",
      salePrice: "24.99",
      image: "",
      url: "https://github.com/yakcmxela",
    },
    {
      id: uuidv4(),
      name: "Rogue's Ransom",
      price: "39.99",
      salePrice: "15.99",
      url: "https://github.com/yakcmxela",
      image: "",
    },
    {
      id: uuidv4(),
      name: "Buccaneer's Bounty",
      price: "49.99",
      salePrice: "39.99",
      url: "https://github.com/yakcmxela",
      image: "",
    },
    {
      id: uuidv4(),
      name: "Privateer's Paragon",
      price: "59.99",
      salePrice: "49.99",
      url: "https://github.com/yakcmxela",
      image: "",
    },
    {
      id: uuidv4(),
      name: "Mariner's Medley",
      price: "69.99",
      salePrice: "59.99",
      url: "https://github.com/yakcmxela",
      image: "",
    },
  ];
  return { products };
};
