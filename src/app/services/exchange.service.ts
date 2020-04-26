import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../directives/sortable.directive';

export interface Exchange {
  id: number;
  name: string;
  description: string;
  address: string;
}

export interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

export interface ResponseData {
  exchanges: Exchange[];
  total: number;
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(exchanges: Exchange[], column: SortColumn, direction: string): Exchange[] {
  if (direction === '' || column === '') {
    return exchanges;
  } else {
    return [...exchanges].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(exchange: Exchange, term: string) {
  return exchange.name.toLowerCase().includes(term.toLowerCase())
    || exchange.address.toLowerCase().includes(term)
    || exchange.description.toLowerCase().includes(term);
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(
    private http: HttpClient
  ) { }

  getExchanges(searchTerm: string, column: SortColumn, direction: SortDirection, page: number, pageSize: number): Observable<ResponseData> {
    return this.http.get<Exchange[]>('/assets/mockup/getStockExchanges.json')
      .pipe(map((exchanges: Exchange[]) => {
            const total = exchanges.length;
            exchanges = sort(exchanges, column, direction);
            exchanges = exchanges.filter(country => matches(country, searchTerm));
            exchanges = exchanges.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
            return { exchanges, total };
          }
        )
      );
  }

  addExchange(data: Exchange) {
    return this.http.post('exchange', data);
  }

  editExchange(id: number, data: Exchange) {
    return this.http.put(`exchange/${id}`, data);
  }

  deleteExchange(id: number) {
    return this.http.delete(`exchange/${id}`);
  }
}
