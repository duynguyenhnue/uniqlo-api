import { Types } from "mongoose";
import { ProductResponse } from "./product.respone";

export class CategoryResponse {
  id: string;
  name: string;
  image: string;
  order: number;
  featured: boolean;
  material: string;
  status: string;
}

export class ProductInCategory {
  id: string;
  name: string;
  price: number;
  image: string;
}

export class CategoryResponseWithProducts extends CategoryResponse {
  products: ProductInCategory[]
}
