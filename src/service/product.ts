import { getEndpoints } from "../config/config";
import type { DetailProductModel, ProductModel } from "../model/product";

const ProductService = {
  async getProducts(searchTerm?: string): Promise<ProductModel[]> {
    const { product } = getEndpoints();
    const url = new URL(product);

    if (searchTerm) {
      url.searchParams.append("search", searchTerm);
    }

    const res = await fetch(url.toString());

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    return json.data || [];
  },

   async getProductById(id: string): Promise<DetailProductModel> {
      const { product } = getEndpoints();
      const res = await fetch(`${product}/${id}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      return json.data;
    },
  
};

export default ProductService;
