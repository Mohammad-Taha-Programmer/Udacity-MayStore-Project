import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItemModel } from '../../../../models/cart-item-model';
@Component({
  selector: 'app-cart-item-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item-component.html',
  styleUrl: './cart-item-component.css',
})
export class CartItemComponent {
  @Input({ required: true }) item!: CartItemModel;
  @Output() update = new EventEmitter<number>();
  @Output() removeItem = new EventEmitter<void>();
  defaultImage = 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?w=100';

  increment() {
    this.update.emit(this.item.quantity + 1);
  }

  decrement() {
    this.update.emit(this.item.quantity - 1);
  }

  remove() {
    this.removeItem.emit();
  }
}
