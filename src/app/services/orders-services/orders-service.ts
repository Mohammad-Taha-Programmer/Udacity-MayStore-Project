import { Injectable, signal } from '@angular/core';
import { OrderModel } from '../../models/order-model';
import { CartItemModel } from '../../models/cart-item-model';
import { ShippingInfoModel } from '../../models/shipping-info-model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  lastOrder = signal<OrderModel | null>(null);

  generateOrderId(): string {
    return 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  createOrder(items: CartItemModel[], shipping: ShippingInfoModel, total: number): OrderModel {
    const order: OrderModel = {
      id: this.generateOrderId(),
      items: [...items],
      shipping: { ...shipping },
      total,
      createdAt: new Date(),
    };
    this.lastOrder.set(order);
    return order;
  }
}
