import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity, ResponseData, State, TableService } from './table.service';
import { PageableResponse } from '../models/pageable-response';

export interface Exchange extends Entity {
  id: number;
  name: string;
  description: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeService extends TableService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getExchanges(state: State): Observable<ResponseData<Exchange>> {
    return this.http.get<PageableResponse<Exchange>>(`/exchange?page=${state.page - 1}&pageSize=${state.pageSize}`)
      .pipe(
        map(res => this.pipeline(res.content, res.totalElements, state))
      );
  }

  addExchange(data: Exchange) {
    return this.http.post('/exchange', data);
  }

  editExchange(id: number, data: Exchange) {
    return this.http.put(`/exchange/${id}`, data);
  }

  deleteExchange(id: number) {
    return this.http.delete(`/exchange/${id}`);
  }
}
