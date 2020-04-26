import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Exchange, ExchangeService, ResponseData, State } from '../../services/exchange.service';
import { SortableDirective, SortColumn, SortDirection, SortEvent } from '../../directives/sortable.directive';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-exchange-management',
  templateUrl: './exchange-management.component.html',
  styleUrls: ['./exchange-management.component.scss']
})
export class ExchangeManagementComponent implements OnInit {

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  exchanges: Exchange[];
  isLoading = true;
  total = 0;

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  editExchangeForm: FormGroup;
  exchangeToDelete: Exchange;

  private state: State = {
    page: 1,
    pageSize: 6,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(
    private service: ExchangeService,
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
    this.resetEditForm();
  }

  getData() {
    const { searchTerm, sortColumn, sortDirection, page, pageSize } = this.state;
    this.service.getExchanges(searchTerm, sortColumn, sortDirection, page, pageSize).subscribe((data: ResponseData) => {
      this.exchanges = [... data.exchanges];
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
    this.editExchangeForm = this.fb.group({
      name: [''],
      address: [''],
      description: ['']
    });
  }

  raiseEditModal(template, exchange?: Exchange) {
    this.resetEditForm();
    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
    });
    if (exchange) {
      this.editExchangeForm.patchValue({
        name: exchange.name,
        address: exchange.address,
        description: exchange.description
      });
    }
  }

  raiseDeleteModal(template, exchange: Exchange) {
    this.exchangeToDelete = exchange;
    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  submitEdit(modal) {
    modal.close();
  }

  submitDelete(modal) {
    this.exchanges = this.exchanges.filter(exchange => exchange.id !== this.exchangeToDelete.id);
    this.exchangeToDelete = null;
    modal.close();
  }
}
