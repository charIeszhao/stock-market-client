import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SortableDirective, SortColumn, SortDirection, SortEvent } from '../../directives/sortable.directive';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { IPO, IpoService } from '../../services/ipo.service';
import { ResponseData, State } from '../../services/table.service';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ipo-update',
  templateUrl: './ipo-update.component.html',
  styleUrls: ['./ipo-update.component.scss']
})
export class IpoUpdateComponent implements OnInit {

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  ipoList: IPO[];
  isLoading = true;
  total = 0;

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  editIpoForm: FormGroup;
  ipoToDelete: IPO;

  isEditing = false;

  private state: State = {
    page: 1,
    pageSize: 6,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(
    private service: IpoService,
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
  }

  getData() {
    this.service.getIpoList(this.state).subscribe((data: ResponseData<IPO>) => {
      this.ipoList = [... data.entities];
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
    this.editIpoForm = this.fb.group({
      name: [''],
      exchange: [''],
      ipoDate: [''],
      description: [''],
      minPrice: [''],
      maxPrice: [''],
      shares: ['']
    });
  }

  raiseEditModal(template, ipo?: IPO) {
    this.resetEditForm();
    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
    });
    if (ipo) {
      this.isEditing = true;
      const ipoDate = moment(ipo.ipoDate);
      this.editIpoForm.patchValue({
        name: ipo.name,
        exchange: ipo.exchange,
        ipoDate: {
          year: Number(ipoDate.format('YYYY')),
          month: Number(ipoDate.format('MM')),
          day: Number(ipoDate.format('DD'))
        },
        description: ipo.description,
        minPrice: ipo.minPrice,
        maxPrice: ipo.maxPrice,
        shares: ipo.shares
      });
    }
  }

  raiseDeleteModal(template, ipo: IPO) {
    this.ipoToDelete = ipo;
    this.modalService.open(template, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  submitEdit(modal) {
    modal.close();
    this.isEditing = false;
  }

  submitDelete(modal) {
    this.ipoList = this.ipoList.filter(company => company.id !== this.ipoToDelete.id);
    this.ipoToDelete = null;
    modal.close();
  }
}
