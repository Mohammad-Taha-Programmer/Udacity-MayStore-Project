import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../../../services/cart-services/cart-service';
import { OrderService } from '../../../services/orders-services/orders-service';
import { OrderModel } from '../../../models/order-model';
import { ShippingInfoModel } from '../../../models/shipping-info-model';
import { PaymentInfoModel } from '../../../models/payment-info-model';
@Component({
  selector: 'app-checkout-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout-component.html',
  styleUrl: './checkout-component.css',
})
export class CheckoutComponent implements OnInit {
  cartService = inject(CartService);
  orderService = inject(OrderService);
  router = inject(Router);

  step = signal<'form' | 'confirmation'>('form');
  processing = signal(false);
  order = signal<OrderModel | null>(null);

  shipping: ShippingInfoModel = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  };

  payment: PaymentInfoModel = {
    cardNumber: '',
    expiry: '',
    cvv: '',
  };

  async ngOnInit() {
    await this.cartService.loadCart();
    if (this.cartService.cartItems().length === 0) {
      this.router.navigate(['/']);
    }
  }

  async submitOrder() {
    this.processing.set(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newOrder = this.orderService.createOrder(
      this.cartService.cartItems(),
      this.shipping,
      this.cartService.cartTotal(),
    );

    await this.cartService.clearCart();

    this.order.set(newOrder);
    this.processing.set(false);
    this.step.set('confirmation');
  }
}
