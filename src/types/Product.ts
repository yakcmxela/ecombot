export type Product = {
  id: string;
  name: string;
  price: string;
  salePrice: string;
  image: string;
  url: string;
};

export type ProductsResponse = {
  products: Product[];
};
