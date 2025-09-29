import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TelegramService } from '../../../services/telegram/telegram.service';
import { Router } from '@angular/router';
import { Item, ItemService } from '../../../services/item/item.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items-list.component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.css'
})
export class ItemsListComponent implements OnInit, OnDestroy {
  tg = inject(TelegramService);
  router = inject(Router)
  itemService = inject(ItemService)

  itemsList: Item[] = [
    // {
    //   "id": 1,
    //   "title": "BMW M5 F90",
    //   "description": "The best car ever i saw",
    //   "price": 123,
    //   "location": "Moscow City",
    //   "status": "AVAILABLE",
    //   "auto_report_link": "https://example.com",
    //   "seller_id": 2
    // },
    // {
    //   "id": 3,
    //   "title": "BMW M5 F90",
    //   "description": "The best car ever i saw",
    //   "price": 123,
    //   "location": "Moscow City",
    //   "status": "RESERVED",
    //   "auto_report_link": "https://example.com",
    //   "seller_id": 2
    // },
    // {
    //   "id": 4,
    //   "title": "Toyota Supra",
    //   "description": "The Paul's Walker car",
    //   "price": 39000,
    //   "location": "Brazil",
    //   "status": "CLOSED",
    //   "auto_report_link": "https://example.com",
    //   "seller_id": 4
    // }
  ]



  constructor() {
    this.navigateToStart = this.navigateToStart.bind(this);
    this.navigateToCart = this.navigateToCart.bind(this);
  }

  ngOnInit(): void {
    this.setVisibileTgButton(true);
    this.getItemsData();
  }

  ngOnDestroy(): void {
    this.setVisibileTgButton(false);

  }

  setVisibileTgButton(needToEnable: boolean): void {
    if (needToEnable) {
      this.tg.BackButton.show();
      this.tg.BackButton.onClick(this.navigateToStart);

      this.tg.MainButton.show();
      this.tg.MainButton.setText('Корзина');
      this.tg.MainButton.onClick(this.navigateToCart);
    } else {
      this.tg.BackButton.hide();
      this.tg.BackButton.offClick(this.navigateToStart);

      this.tg.MainButton.hide();
      this.tg.MainButton.offClick(this.navigateToCart);
    }
  }

  getItemsData(): void {
    this.itemService.getAllItems().subscribe({
      next: (data) => {
        this.itemsList = data;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  navigateToStart(): void {
    this.router.navigate(['/']);
  }

  navigateToItemDetails(itemId: number): void {
    this.router.navigate([`items/${itemId}`]);
  }

  navigateToCart(): void {
    this.router.navigate(['/cart'])
  }
}
