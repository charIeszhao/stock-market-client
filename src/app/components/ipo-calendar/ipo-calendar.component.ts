import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SortableDirective, SortColumn, SortDirection, SortEvent } from '../../directives/sortable.directive';
import { ResponseData, State } from '../../services/table.service';
import { IPO, IpoService } from '../../services/ipo.service';

@Component({
  selector: 'app-ipo-calendar',
  templateUrl: './ipo-calendar.component.html',
  styleUrls: ['./ipo-calendar.component.scss']
})
export class IpoCalendarComponent implements OnInit {

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective>;

  ipoList: IPO[];
  isLoading = true;
  total = 0;

  private state: State = {
    page: 1,
    pageSize: 6,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(
    private service: IpoService
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
}
