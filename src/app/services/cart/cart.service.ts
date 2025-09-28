import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type CartItem = {
  id: number,
  title: string,
  description: string,
  price: number,
  location?: string,
  status?: string,
  auto_report_link?: string,
  seller_id: number,
  image_path?: string,
  qty?: number
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseApi = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCartItems(cartId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseApi}/cart/${cartId}/items`);
  }
}
