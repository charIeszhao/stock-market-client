import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseData, State } from './table.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPO } from './ipo.service';

@Injectable({
  providedIn: 'root'
})
export class StockPriceService {

  constructor(private http: HttpClient) { }

  getPricesByDateRange(from: string, to: string): Observable<ResponseData<any>> {
    return this.http.get<any>(`/price?from=${from}&to=${to}`);
  }

  getPricesByDate(date: string): Observable<ResponseData<any>> {
    return this.http.get<any>(`/price/${date}`);
  }

  importExcel(data): Observable<any> {
    return this.http.post('/price/import', data);
  }
}
