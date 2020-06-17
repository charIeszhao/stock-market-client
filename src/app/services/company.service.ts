import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity, ResponseData, State, TableService } from './table.service';
import { PageableResponse } from '../models/pageable-response';

export interface Company extends Entity {
  id: number;
  name: string;
  exchange: string;
  description: string;
  ceoName: string;
  boardMembers?: string[];
  ipoDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends TableService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getCompanies(state?: State): Observable<ResponseData<Company>> {
    return this.http.get<PageableResponse<Company>>(`/company?page=${state.page - 1}&pageSize=${state.pageSize}`)
      .pipe(
        map(res => this.pipeline(res.content, res.totalElements, state))
      );
  }

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`/company/all`);
  }

  addCompany(data: Company) {
    return this.http.post('/company', data);
  }

  editCompany(id: number, data: Company) {
    return this.http.put(`/company/${id}`, data);
  }

  deleteCompany(id: number) {
    return this.http.delete(`/company/${id}`);
  }
}
