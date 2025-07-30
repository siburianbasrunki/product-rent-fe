import { useQuery } from "@tanstack/react-query";
import ProductService from "../service/product";
import { useParams } from "react-router-dom";

export const useProducts = (params?: {
  search?: string;
  category_id?: string;
  sort?: string;
}) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => ProductService.getProducts(params || {}),
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
}
