import { useQuery } from "@tanstack/react-query";
import CategoryService from "../service/category";

export const useCategory = () => {
  return useQuery({
    queryKey: ['category'],
    queryFn: CategoryService.getCategory,
  });
};