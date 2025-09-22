import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TelegramService } from '../../../services/telegram/telegram.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../../services/item/item.service';

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

  cartItems: Item[] = [
    {
      "id": 1,
      "title": "BMW M5 F90",
      "description": "The best car ever i saw",
      "price": 123,
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
  }

  ngOnInit(): void {
    this.setVisibileTgButton(true);
    this.getTotalAmount();
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
    } else {
      this.tg.BackButton.hide();
      this.tg.BackButton.offClick(this.navigateToItemsList);

      this.tg.MainButton.hide();
    }
  }

  getTotalAmount(): void {
    this.cartItems.forEach((item) => {
      this.total += item.price;
      console.log(this.total);
    })
  }

  navigateToItemsList(): void {
    this.router.navigate(['/items']);
  }

}
