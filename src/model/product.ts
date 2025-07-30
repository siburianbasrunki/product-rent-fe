export interface ProductModel {
  id: string;
  name: string;
  img: string;
  price: number;
  available: boolean;
  category: string;
}

export interface DetailProductModel {
  id: string;
  name: string;
  description: string[];
  img: string[];
  category_id: string;
  category_name: string;
  price: number;
  available: boolean;
  seller_id: string;
  created_at: string;
  updated_at: string;
}

export interface InfoProductBookModel {
  product_id: string
  name_product: string
  price: number
  is_upload: boolean
}
