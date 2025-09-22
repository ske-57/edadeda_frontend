import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TelegramService } from '../../../services/telegram/telegram.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.tg.getUserData());
  }

  ngOnDestroy(): void {
  }


  navigateToItemsList(): void {
    this.router.navigate(['/items']);
  }
}
