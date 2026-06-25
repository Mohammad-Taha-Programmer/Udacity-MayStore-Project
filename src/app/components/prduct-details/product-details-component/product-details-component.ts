import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink , Router, ActivatedRoute} from '@angular/router';
import { ProductService } from '../../../services/product-services/product-service';
import { CartService } from '../../../services/cart-services/cart-service';
import { ProductModel } from '../../../models/product-model';
@Component({
  selector: 'app-product-details-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-details-component.html',
  styleUrl: './product-details-component.css',
})
export class ProductDetailsComponent implements OnInit {
  productService = inject(ProductService);
  cartService = inject(CartService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  product = signal<ProductModel | null>(null);
  loading = signal(true);
  quantity = signal(1);
  defaultImage = 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?w=600';

  categoryName = computed(() => {
    const p = this.product();
    if (!p || !p.category_id) return '';
    return this.productService.categories().find((c) => c.id === p.category_id)?.name || '';
  });

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      await this.productService.loadCategories();
      this.product.set(await this.productService.getProductById(id));
      this.loading.set(false);
    }
  }

  incrementQty() {
    this.quantity.update((q) => Math.min(q + 1, this.product()?.stock || 1));
  }

  decrementQty() {
    this.quantity.update((q) => Math.max(1, q - 1));
  }

  async addToCart() {
    if (this.product()) {
      await this.cartService.addToCart(this.product()!, this.quantity());
      this.router.navigate(['/cart']);
    }
  }
}
