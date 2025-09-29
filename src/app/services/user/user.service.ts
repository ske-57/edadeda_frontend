import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TelegramService } from '../telegram/telegram.service';

export type InitData = {
  initData: string
}

export type User = {
  id?: number,
  tg_id: number,
  name: string,
  is_seller?: boolean,
  cart_id?: number
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly ID_KEY = 'id';
  private readonly TG_ID_KEY = 'tg_id';
  private readonly NAME_KEY = 'name';
  private readonly CART_ID = 'cart_id'

  constructor(private http: HttpClient) { }

  getName(): string | null {
    return sessionStorage.getItem(this.NAME_KEY);
  }

  getCartId(): number {
    const raw = sessionStorage.getItem(this.CART_ID);
    return raw !== null ? Number(raw) : -1;
  }

  getId(): number {
    const raw = sessionStorage.getItem(this.ID_KEY);
    return raw !== null ? Number(raw) : -1;
  }

  getTgId(): number {
    const raw = sessionStorage.getItem(this.TG_ID_KEY);
    return raw !== null ? Number(raw) : -1;
  }

  saveStorageData(user: User): void {
    if (user.id) {
      sessionStorage.setItem(this.ID_KEY, String(user.id));
    } else {
      sessionStorage.setItem(this.TG_ID_KEY, String(user.tg_id));
    }
    sessionStorage.setItem(this.NAME_KEY, user.name)
  }

  saveCartId(cart_id: number): void {
    sessionStorage.setItem(this.CART_ID, String(cart_id));
  }

  getStorageData(): User {
    const id = sessionStorage.getItem(this.ID_KEY)
    const tg_id = sessionStorage.getItem(this.TG_ID_KEY)
    const name = sessionStorage.getItem(this.NAME_KEY);
    const cart_id = sessionStorage.getItem(this.CART_ID);
    const user: User = {
      id: Number(id),
      tg_id: Number(tg_id),
      name: String(name),
      cart_id: Number(cart_id),
    }
    return user
  }

  createUser(body: InitData): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users`, body);
  }

  getUserByTgId(tgId: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${tgId}`);
  }
}