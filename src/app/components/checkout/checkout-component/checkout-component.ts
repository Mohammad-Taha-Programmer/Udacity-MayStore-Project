import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../../../services/cart-services/cart-service';
import { OrderService } from '../../../services/orders-services/orders-service';
import { ShippingInfoModel } from '../../../models/shipping-info-model';
import { PaymentInfoModel } from '../../../models/payment-info-model';
import { OrderModel } from '../../../models/order-model';

// Define the shape of error messages for each field
interface FormErrors {
  fullName?: string;
  email?: string;
  address?: string;
  city?: string;
  zip?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}

@Component({
  selector: 'app-checkout',
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

  // Error messages – using the defined interface
  errors: FormErrors = {};

  async ngOnInit() {
    await this.cartService.loadCart();
    if (this.cartService.cartItems().length === 0) {
      this.router.navigate(['/']);
    }
  }

  // Validation triggered by (ngModelChange)
  validateField(field: keyof FormErrors, value: any): void {
    // Use bracket notation to safely assign errors
    switch (field) {
      case 'fullName':
        this.errors['fullName'] =
          value.trim().length < 2 ? 'Full name must be at least 2 characters.' : '';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.errors['email'] = !emailRegex.test(value) ? 'Please enter a valid email address.' : '';
        break;
      case 'address':
        this.errors['address'] = value.trim().length === 0 ? 'Address is required.' : '';
        break;
      case 'city':
        this.errors['city'] = value.trim().length === 0 ? 'City is required.' : '';
        break;
      case 'zip':
        const zipRegex = /^[0-9]{5}$/;
        this.errors['zip'] = !zipRegex.test(value) ? 'ZIP must be exactly 5 digits.' : '';
        break;
      case 'cardNumber':
        const cardRegex = /^[0-9]{16}$/;
        this.errors['cardNumber'] = !cardRegex.test(value) ? 'Card number must be 16 digits.' : '';
        break;
      case 'expiry':
        const expiryRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
        this.errors['expiry'] = !expiryRegex.test(value) ? 'Use MM/YY format.' : '';
        break;
      case 'cvv':
        const cvvRegex = /^[0-9]{3,4}$/;
        this.errors['cvv'] = !cvvRegex.test(value) ? 'CVV must be 3 or 4 digits.' : '';
        break;
      default:
        break;
    }
  }

  async submitOrder() {
    this.processing.set(true);

    // Simulate payment processing
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
