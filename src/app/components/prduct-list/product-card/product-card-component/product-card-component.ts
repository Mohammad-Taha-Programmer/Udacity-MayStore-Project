import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductModel } from '../../../../models/product-model';
import { CartService } from '../../../../services/cart-services/cart-service';

@Component({
  selector: 'app-product-card-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card-component.html',
  styleUrl: './product-card-component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: ProductModel;
  cartService = inject(CartService);
  defaultImage = 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?w=400';

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
