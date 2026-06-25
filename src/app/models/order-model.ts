import { CartItemModel } from "./cart-item-model";
import { ShippingInfoModel } from "./shipping-info-model";

export interface OrderModel {
    id: string;
    items: CartItemModel[];
    shipping: ShippingInfoModel;
    total: number;
    createdAt: Date;
}
