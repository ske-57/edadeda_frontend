import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TelegramService } from '../../../services/telegram/telegram.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InitData, User, UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-start.component',
  standalone: true,
  imports: [],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit, OnDestroy {
  tg = inject(TelegramService);
  router = inject(Router)
  userService = inject(UserService);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.createOrGetTelegramUserData();


    if (this.userService.getStorageData()) {
      this.getUserIdByTgId(this.userService.getTgId());
      return;
    }
  }

  ngOnDestroy(): void {
    console.info('On destroy id: ', this.userService.getId());
  }

  createOrGetTelegramUserData(): void {
    const initData: InitData = {
      initData: this.tg.getInitData()
    };

    if (initData.initData === 'user') {
      console.log('Init data = "user"');
      return;
    }
    this.userService.createUser(initData).subscribe({
      next: (data: User) => {
        this.userService.saveStorageData(data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getUserIdByTgId(tgId: number): void {
    if (this.userService.getTgId() === -1) {
      console.error('Tg id is not valid', this.userService.getTgId());
    }
    this.userService.getUserByTgId(tgId).subscribe({
      next: (data) => {
        this.userService.saveStorageData(data);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


  navigateToItemsList(): void {
    this.router.navigate(['/items']);
  }

  navigateToCreatingItem(): void {
    this.router.navigate(['/create'])
  }
}
