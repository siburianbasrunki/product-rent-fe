import { useQuery } from "@tanstack/react-query";
import ProductService from "../service/product";
import { useParams } from "react-router-dom";

export const useProducts = (searchTerm?: string) => {
  return useQuery({
    queryKey: ["products", { search: searchTerm }],
    queryFn: () => ProductService.getProducts(searchTerm),
  });
}

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
}