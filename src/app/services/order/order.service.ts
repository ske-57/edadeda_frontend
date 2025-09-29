import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Order = {
  id?: number,
  item_id: number,
  user_id: number,
  price: number
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseApi = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createOrder(body: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseApi}/orders`, body);
  }

  getUserOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseApi}/orders/${userId}`);
  }

}
