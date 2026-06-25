import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/orders-services/orders-service';

@Component({
  selector: 'app-order-confirmation-component',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-confirmation-component.html',
  styleUrl: './order-confirmation-component.css',
})
export class OrderConfirmationComponent implements OnInit {
  orderService = inject(OrderService);
  route = inject(ActivatedRoute);
  orderId = '';

  ngOnInit() {
    this.orderId =
      this.route.snapshot.paramMap.get('orderId') || this.orderService.lastOrder()?.id || '';
  }
}
