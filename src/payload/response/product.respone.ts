import { Review } from 'src/schema/reviews.schema';

export class ProductResponse {
  id: string;
  Product_name: string;
  Product_sku: string;
  Product_brand: string;
  Product_tag: string;
  Product_description: string;
  Product_currency: string;
  Product_color: string[];
  Product_size: string[];
  Product_variantSku: string | null;
  Product_specifications: string | null;
  Product_price: number;
  Product_rating: number;
  Product_count: number;
  Product_images: string[];
  Product_isNewArrival: boolean;
  Product_isBestSeller: boolean;
  Product_isOnSale: boolean;
  categoryId: string;
  userId?: string;
  reviews: string[] | Review[];
  favorite_users?: string[];
}
