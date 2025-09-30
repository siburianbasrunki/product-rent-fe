import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ProductService from "../service/product";
import { useParams } from "react-router-dom";
import type { ProductModel } from "../model/product";

type ListParams = {
  search?: string;
  category_id?: string;
  sort?: string;
};

export const useProducts = (params?: ListParams) => {
  const key = [
    "products",
    params?.search ?? "",
    params?.category_id ?? "",
    params?.sort ?? "",
  ] as const;

  return useQuery<ProductModel[], Error, ProductModel[], typeof key>({
    queryKey: key,
    queryFn: () => ProductService.getProducts(params || {}),
    placeholderData: keepPreviousData,
    staleTime: 5_000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useProductByid = () => {
  const { id } = useParams<{ id: string }>();
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => {
      if (!id) throw new Error("No ID provided");
      return ProductService.getProductById(id);
    },
    enabled: !!id,
  });
};

export const useInfoProductByid = () => {
  const { id } = useParams<{ id: string }>();
  return useQuery({
    queryKey: ["infoproduct", id],
    queryFn: () => {
      if (!id) throw new Error("No ID provided");
      return ProductService.getInfoProductById(id);
    },
    enabled: !!id,
  });
};
