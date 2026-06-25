import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item-component/cart-item-component';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart-services/cart-service';
@Component({
  selector: 'app-cart-component',
  standalone: true,
  imports: [CommonModule, CartItemComponent, RouterLink],
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.css',
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);

  async ngOnInit() {
    await this.cartService.loadCart();
  }

  async updateQuantity(itemId: number, quantity: number) {
    await this.cartService.updateQuantity(itemId, quantity);
  }

  async removeItem(itemId: number) {
    await this.cartService.removeFromCart(itemId);
  }
}
