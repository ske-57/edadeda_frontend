import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TelegramService } from '../../../services/telegram/telegram.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Item, ItemService } from '../../../services/item/item.service';

@Component({
  selector: 'app-item-details.component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  tg = inject(TelegramService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  itemService = inject(ItemService);

  item: Item = {
    "id": 1,
    "title": "",
    "description": "",
    "price": 0,
    "location": "",
    "status": "",
    "auto_report_link": "",
    "seller_id": 0
  }
  itemId: number | undefined;

  constructor() {
    this.navigateToItemsList = this.navigateToItemsList.bind(this);
    this.navigateToCart = this.navigateToCart.bind(this);
  }

  ngOnInit(): void {
    this.setVisibileTgButton(true);
    this.getItemIdFromUrl();
    if (this.itemId) {
      this.getItemDetailsData(this.itemId);
    } else {
      console.error('Item id not got from url');
    }

  }

  ngOnDestroy(): void {
    this.setVisibileTgButton(false);
  }

  setVisibileTgButton(needToEnable: boolean): void {
    if (needToEnable) {
      this.tg.BackButton.show();
      this.tg.BackButton.onClick(this.navigateToItemsList);

      this.tg.MainButton.show();
      this.tg.MainButton.setText('Корзина');
      this.tg.MainButton.onClick(this.navigateToCart);
    } else {
      this.tg.BackButton.hide();
      this.tg.BackButton.offClick(this.navigateToItemsList);

      this.tg.MainButton.hide();
      this.tg.MainButton.offClick(this.navigateToCart);
    }
  }

  getItemDetailsData(itemId: number): void {
    this.itemService.getItemDetails(itemId).subscribe({
      next: (data) => {
        this.item = data;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getItemIdFromUrl(): void {
    this.route.params.subscribe(params => {
      this.itemId = params['itemId'];
    })
  }

  navigateToItemsList(): void {
    this.router.navigate(['/items']);
  }

  navigateToCart(): void {
    this.router.navigate(['/cart'])
  }
}
