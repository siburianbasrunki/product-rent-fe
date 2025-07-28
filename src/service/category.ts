import { getEndpoints } from "../config/config";
import type { Category } from "../model/categories";

const CategoryService = {
  
  async getCategory (): Promise<Category[]> {
    const { product } = getEndpoints();
    const res = await fetch(`${product}/category`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },

};

export default CategoryService;
