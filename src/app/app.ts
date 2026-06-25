import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header-component/header-component';
import { FooterComponent } from './components/footer/footer-component/footer-component';
import { ToastComponent } from './components/toast/toast-component/toast-component';
import { ProductService } from './services/product-services/product-service';
import { CartService } from './services/cart-services/cart-service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('my-store');
  productService = inject(ProductService);
  cartService = inject(CartService);

  async ngOnInit() {
    await Promise.all([
      this.productService.loadCategories(),
      this.productService.loadProducts(),
      this.cartService.loadCart(),
    ]);
  }
}
