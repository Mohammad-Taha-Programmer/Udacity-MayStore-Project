import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from '../supabase-service';
import { ProductModel } from '../../models/product-model';
import { CategoryModel } from '../../models/category-model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private supabase = inject(SupabaseService);

  products = signal<ProductModel[]>([]);
  categories = signal<CategoryModel[]>([]);
  selectedCategory = signal<number | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  async loadCategories() {
    const categories = await this.supabase.query<CategoryModel>('categories', {
      order: 'name.asc',
    });
    this.categories.set(categories);
  }

  async loadProducts(categoryId?: number) {
    this.loading.set(true);
    this.error.set(null);
    try {
      const filter = categoryId ? `category_id=eq.${categoryId}` : undefined;
      const products = await this.supabase.query<ProductModel>('products', {
        filter,
        order: 'created_at.desc',
      });
      this.products.set(products);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      this.loading.set(false);
    }
  }

  async getProductById(id: number): Promise<ProductModel | null> {
    const products = await this.supabase.query<ProductModel>('products', {
      filter: `id=eq.${id}`,
      limit: 1,
    });
    return products[0] || null;
  }

  setCategory(categoryId: number | null) {
    this.selectedCategory.set(categoryId);
  }
}
