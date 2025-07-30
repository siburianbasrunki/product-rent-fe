import { getEndpoints } from "../config/config";
import type { DetailProductModel, InfoProductBookModel, ProductModel } from "../model/product";

const ProductService = {
  async getProducts(params: {
    search?: string;
    category_id?: string;
    sort?: string;
  }): Promise<ProductModel[]> {
    const { product } = getEndpoints();
    const url = new URL(product);

    if (params.search) {
      url.searchParams.append("search", params.search);
    }
    if (params.category_id) {
      url.searchParams.append("category_id", params.category_id);
    }
    if (params.sort) {
      url.searchParams.append("sort", params.sort);
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
  async getInfoProductById(id: string): Promise<InfoProductBookModel> {
    const { product } = getEndpoints();
    const res = await fetch(`${product}/book/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },
};

export default ProductService;
