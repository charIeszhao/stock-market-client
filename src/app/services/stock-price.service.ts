import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Entity, ResponseData, State } from './table.service';
import { Observable } from 'rxjs';
import { Company } from './company.service';
import { MarketData, SectorData } from '../components/dashboard/dashboard.component';

export interface Price extends Entity {
  id: number;
  dateTime: string;
  price: number;
  company: Company;
}

@Injectable({
  providedIn: 'root'
})
export class StockPriceService {

  constructor(private http: HttpClient) { }

  getPricesByCompanyId(companyId: string, from?: string, to?: string): Observable<Price[]> {
    if (from && to) {
      return this.http.get<Price[]>(`/price/${companyId}/${from}/${to}`);
    } else {
      return this.http.get<Price[]>(`/price/${companyId}`);
    }
  }

  getPriceHistory(companyId: string): Observable<MarketData> {
    return this.http.get<MarketData>(`/price/${companyId}/history`);
  }

  getPricesByDate(companyId: string, date: string): Observable<Price[]> {
    return this.http.get<Price[]>(`/price/${companyId}/${date}`);
  }

  getSectorPrices(): Observable<SectorData[]> {
    return this.http.get<SectorData[]>('/price/sectorPrices');
  }

  importExcel(data): Observable<any> {
    return this.http.post('/price/import', data);
  }
}
