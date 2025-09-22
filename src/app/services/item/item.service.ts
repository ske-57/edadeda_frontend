import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Item = {
  id: number,
  title: string,
  description: string,
  price: number,
  location?: string,
  status?: string,
  auto_report_link?: string,
  seller_id: number,
  image_path?: string
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseApi = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<any> {
    return this.http.get(`${this.baseApi}/items`);
  }

  getItemDetails(itemId: number): Observable<any> {
    return this.http.get(`${this.baseApi}/items/${itemId}`);
  }
}
