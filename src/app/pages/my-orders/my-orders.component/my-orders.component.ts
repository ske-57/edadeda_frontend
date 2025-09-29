import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Order, OrderService } from '../../../services/order/order.service';
import { TelegramService } from '../../../services/telegram/telegram.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-my-orders.component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  tg = inject(TelegramService);
  orderSerivce = inject(OrderService);
  router = inject(Router);
  userService = inject(UserService);


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

  constructor() {
    this.navigateToStart = this.navigateToStart.bind(this);
  }

  ngOnInit(): void {
    this.setVisibileTgButton(true);
  }

  ngOnDestroy(): void {
    this.setVisibileTgButton(false);
  }


  setVisibileTgButton(needToEnable: boolean): void {
    if (needToEnable) {
      this.tg.BackButton.show();
      this.tg.BackButton.onClick(this.navigateToStart);

    } else {
      this.tg.BackButton.hide();
      this.tg.BackButton.offClick(this.navigateToStart);
    }
  }

  uploadOrders(): void {
    this.orderSerivce.getUserOrders(this.userService.getId()).subscribe({
      next: (data) => {
        this.orders = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Error while getting user orders list', err);
      }
    })
  }

  navigateToStart() {
    this.router.navigate(['/']);
  }

}
