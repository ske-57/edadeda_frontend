import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Order } from '../../../services/order/order.service';

@Component({
  selector: 'app-my-orders.component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  orders: Order[] = [
    {
      "id": 8,
      "price": 2281337,
      "item_id": 1,
      "user_id": 15
    },
    {
      "id": 9,
      "price": 2281337,
      "item_id": 1,
      "user_id": 15
    }
  ]

}
