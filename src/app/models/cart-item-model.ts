import { ProductModel } from "./product-model";

export interface CartItemModel {
    id: number;
    product_id: number;
    quantity: number;
    product: ProductModel
}