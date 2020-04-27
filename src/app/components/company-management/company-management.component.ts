import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Company, CompanyService } from '../../services/company.service';
import { SortableDirective, SortColumn, SortDirection, SortEvent } from '../../directives/sortable.directive';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ResponseData, State } from '../../services/table.service';

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
    private fb: FormBuilder,
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
    this.resetEditForm();
  }

  getData() {
    this.service.getCompanies(this.state).subscribe((data: ResponseData<Company>) => {
      this.companies = [... data.entities];
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

  resetEditForm() {
    this.editCompanyForm = this.fb.group({
      name: [''],
      exchange: [''],
      ceoName: [''],
      boardMembers: [''],
      ipoDate: [''],
      description: ['']
    });
  }

  raiseEditModal(template, company?: Company) {
    this.resetEditForm();
    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
    });
    if (company) {
      const ipoDate = moment(company.ipoDate);
      this.editCompanyForm.patchValue({
        name: company.name,
        exchange: company.exchange,
        ceoName: company.ceoName,
        boardMembers: company.boardMembers.join(', '),
        ipoDate: {
          year: Number(ipoDate.format('YYYY')),
          month: Number(ipoDate.format('MM')),
          day: Number(ipoDate.format('DD'))
        },
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
