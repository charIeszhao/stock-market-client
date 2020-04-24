import { Injectable, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../directives/sortable.directive';

export interface Company {
  id: number;
  name: string;
  exchange: string;
  description: string;
  ceoName: string;
  boardMembers?: string[];
  ipoDate?: string;
}

export interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

export interface ResponseData {
  companies: Company[];
  total: number;
}

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(companies: Company[], column: SortColumn, direction: string): Company[] {
  if (direction === '' || column === '') {
    return companies;
  } else {
    return [...companies].sort((a, b) => {
      const res = compare(`${a[column]}`, `${b[column]}`);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(company: Company, term: string, pipe?: PipeTransform) {
  return company.name.toLowerCase().includes(term.toLowerCase())
    || company.exchange.toLowerCase().includes(term)
    || company.description.toLowerCase().includes(term);
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient
  ) { }

  getCompanies(searchTerm: string, column: SortColumn, direction: SortDirection, page: number, pageSize: number): Observable<ResponseData> {
    return this.http.get<Company[]>('/assets/mockup/getCompanies.json')
      .pipe(
        map((companies: Company[]) => {
            const total = companies.length;
            companies = sort(companies, column, direction);
            companies = companies.filter(country => matches(country, searchTerm));
            companies = companies.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
            return { companies, total };
          }
        )
      );
  }

  addCompany(data: Company) {
    return this.http.post('company', data);
  }

  editCompany(id: number, data: Company) {
    return this.http.put(`company/${id}`, data);
  }

  deleteCompany(id: number) {
    return this.http.delete(`company/${id}`);
  }
}
