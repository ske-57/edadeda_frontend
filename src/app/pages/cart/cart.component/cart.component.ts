import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TelegramService } from '../../../services/telegram/telegram.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../../services/item/item.service';
import { CartItem, CartService } from '../../../services/cart/cart.service';
import { Order, OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-cart.component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy {
  tg = inject(TelegramService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  cartService = inject(CartService);
  orderService = inject(OrderService);

  cartItems: CartItem[] = [
    {
      "id": 1,
      "title": "BMW M5 F90",
      "description": "The best car ever i saw",
      "price": 39000,
      "location": "Moscow City",
      "status": "AVAILABLE",
      "auto_report_link": "https://example.com",
      "seller_id": 2
    },
    {
      "id": 4,
      "title": "Toyota Supra",
      "description": "The Paul's Walker car",
      "price": 39000,
      "location": "Brazil",
      "status": "CLOSED",
      "auto_report_link": "https://example.com",
      "seller_id": 4
    }
  ]
  total: number = 0;

  constructor() {
    this.navigateToItemsList = this.navigateToItemsList.bind(this);
    this.createOrder = this.createOrder.bind(this);
  }

  ngOnInit(): void {
    this.getCartItems();
    this.getTotalAmount();
    this.setVisibileTgButton(true);
  }

  ngOnDestroy(): void {
    this.setVisibileTgButton(false);
  }

  setVisibileTgButton(needToEnable: boolean): void {
    if (needToEnable) {
      this.tg.BackButton.show();
      this.tg.BackButton.onClick(this.navigateToItemsList);

      this.tg.MainButton.show();
      this.tg.MainButton.setText('Оформить заказ');
      this.tg.MainButton.onClick(this.createOrder);
    } else {
      this.tg.BackButton.hide();
      this.tg.BackButton.offClick(this.navigateToItemsList);

      this.tg.MainButton.hide();
      this.tg.MainButton.offClick(this.createOrder);
    }
  }

  getCartItems(): void {
    this.cartService.getCartItems(1).subscribe({
      next: (data) => {
        this.cartItems = data;
      },
      error: (err) => {
        console.error('error while getting cart items: ', err);
      }
    }
    )
  }

  generateOrderBody(): Order {
    const order: Order = {
      item_id: this.cartItems[0].id,
      buyer_id: 2,
      price: this.cartItems[0].price
    }
    return order
  }

  createOrder(): void {
    this.orderService.createOrder(this.generateOrderBody()).subscribe({
      next: (data) => {
        console.log('All is ok!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error creating order: ', err);
      }
    })
  }

  getTotalAmount(): void {
    this.cartItems.forEach((item) => {
      this.total += item.price;
    })
  }

  navigateToItemsList(): void {
    this.router.navigate(['/items']);
  }

}
