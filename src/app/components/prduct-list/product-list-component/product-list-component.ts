import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card-component/product-card-component';
import { CategoryFilterComponent } from '../category-filter/category-filter-component/category-filter-component';
import { ProductService } from '../../../services/product-services/product-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list-component',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, CategoryFilterComponent],
  templateUrl: './product-list-component.html',
  styleUrl: './product-list-component.css',
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService);
  router = inject(Router);

  categoryName = computed(() => {
    const id = this.productService.selectedCategory();
    if (!id) return 'All Products';
    return this.productService.categories().find((c) => c.id === id)?.name || 'All Products';
  });

  async ngOnInit() {
    if (this.productService.categories().length === 0) {
      await this.productService.loadCategories();
    }
    if (this.productService.products().length === 0) {
      await this.productService.loadProducts();
    }
  }

  async onCategoryChange(categoryId: number | null) {
    this.productService.setCategory(categoryId);
    await this.productService.loadProducts(categoryId ?? undefined);
  }
}
