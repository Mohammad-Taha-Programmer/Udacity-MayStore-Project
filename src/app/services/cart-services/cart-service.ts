import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { SupabaseService } from '../supabase-service';
import { ToastService } from '../toast-services/toast-service';
import { CartItemModel } from '../../models/cart-item-model';
import { ProductModel } from '../../models/product-model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class CartService {
  private supabase = inject(SupabaseService);
  private toastService = inject(ToastService);
  private platformId = inject(PLATFORM_ID);

  // Lazily get session ID – only when needed and only in browser
  private get sessionId(): string {
    if (!isPlatformBrowser(this.platformId)) {
      return ''; // or throw, but we'll return empty and handle it
    }
    let id = localStorage.getItem('cart_session_id');
    if (!id) {
      id = 'session_' + Math.random().toString(36).substring(2) + Date.now();
      localStorage.setItem('cart_session_id', id);
    }
    return id;
  }

  cartItems = signal<CartItemModel[]>([]);
  loading = signal(false);

  cartCount = computed(() => this.cartItems().reduce((sum, item) => sum + item.quantity, 0));

  cartTotal = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );

  async loadCart() {
    if (!isPlatformBrowser(this.platformId)) return; // skip if server
    this.loading.set(true);
    try {
      const items = await this.supabase.query<CartItemModel & { products: ProductModel }>(
        'cart_items',
        {
          filter: `session_id=eq.${this.sessionId}`,
          select: '*,products(id,name,price,image_url,stock)',
        },
      );
      this.cartItems.set(
        items.map((item) => ({
          ...item,
          product: item.products,
        })),
      );
    } catch {
      this.cartItems.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  async addToCart(product: ProductModel, quantity: number = 1) {
    if (!isPlatformBrowser(this.platformId)) return;
    const existing = this.cartItems().find((item) => item.product_id === product.id);
    if (existing) {
      await this.updateQuantity(existing.id, existing.quantity + quantity);
      this.toastService.show(`Updated ${product.name} quantity in cart`);
    } else {
      await this.supabase.insert('cart_items', {
        session_id: this.sessionId,
        product_id: product.id,
        quantity,
      });
      await this.loadCart();
      this.toastService.show(`Added ${product.name} to cart`);
    }
  }

  async updateQuantity(itemId: number, quantity: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    const item = this.cartItems().find((i) => i.id === itemId);
    if (quantity <= 0) {
      await this.removeFromCart(itemId);
      return;
    }
    await this.supabase.update('cart_items', itemId, { quantity });
    await this.loadCart();
    if (item) {
      this.toastService.show(`Updated ${item.product.name} quantity`);
    }
  }

  async removeFromCart(itemId: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    const item = this.cartItems().find((i) => i.id === itemId);
    await this.supabase.delete('cart_items', itemId);
    await this.loadCart();
    if (item) {
      this.toastService.show(`Removed ${item.product.name} from cart`);
    }
  }

  async clearCart() {
    if (!isPlatformBrowser(this.platformId)) return;
    await Promise.all(this.cartItems().map((item) => this.supabase.delete('cart_items', item.id)));
    await this.loadCart();
  }
}
