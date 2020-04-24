import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Company, CompanyService, ResponseData, State } from '../../services/company.service';
import { SortableDirective, SortColumn, SortDirection, SortEvent } from '../../directives/sortable.directive';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.scss']
})
export class CompanyManagementComponent implements OnInit {

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  companies: Company[];
  isLoading = true;
  total = 0;

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  private state: State = {
    page: 1,
    pageSize: 6,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(
    private service: CompanyService,
    private modalService: NgbModal
  ) {
    this.getData();
  }

  get page() { return this.state.page; }
  set page(page: number) { this._set({ page }); }

  get pageSize() { return this.state.pageSize; }
  set pageSize(pageSize: number) { this._set({ pageSize }); }

  get searchTerm() { return this.state.searchTerm; }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }

  set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this.state, patch);
    this.getData();
  }

  ngOnInit(): void {
  }

  getData() {
    const { searchTerm, sortColumn, sortDirection, page, pageSize } = this.state;
    this.service.getCompanies(searchTerm, sortColumn, sortDirection, page, pageSize).subscribe((data: ResponseData) => {
      this.companies = [... data.companies];
      this.total = data.total;
      this.isLoading = false;
    });
  }

  onSort({column, direction}: SortEvent): void {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.sortColumn = column;
    this.sortDirection = direction;
  }

  onEdit(company: Company): void {
  }

  onDelete(companyId: number): void {
    this.companies = this.companies.filter(company => company.id !== companyId);
  }

  raiseModal(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }
}
