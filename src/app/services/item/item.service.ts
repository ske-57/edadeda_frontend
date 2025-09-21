import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseApi = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<any> {
    return this.http.get(`${this.baseApi}/items`);
  }
}
