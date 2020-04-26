import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Company, CompanyService, ResponseData, State } from '../../services/company.service';
import { SortableDirective, SortColumn, SortDirection, SortEvent } from '../../directives/sortable.directive';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  editCompanyForm: FormGroup;
  companyToDelete: Company;

  private state: State = {
    page: 1,
    pageSize: 6,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(
    private service: CompanyService,
    private modalService: NgbModal,
    private fb: FormBuilder
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
    this.editCompanyForm = this.fb.group({
      name: [''],
      exchange: [''],
      ceoName: [''],
      boardMembers: [''],
      ipoDate: [''],
      description: ['']
    });
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

  raiseEditModal(template, company?: Company) {
    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
    });
    if (company) {
      this.editCompanyForm.patchValue({
        name: company.name,
        exchange: company.exchange,
        ceoName: company.ceoName,
        boardMembers: company.boardMembers.join(', '),
        ipoDate: company.ipoDate,
        description: company.description
      });
    }
  }

  raiseDeleteModal(template, company: Company) {
    this.companyToDelete = company;
    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  submitEdit(modal) {
    modal.close();
  }

  submitDelete(modal) {
    this.companies = this.companies.filter(company => company.id !== this.companyToDelete.id);
    this.companyToDelete = null;
    modal.close();
  }
}
