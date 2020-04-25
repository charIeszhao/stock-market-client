import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { Company } from '../services/company.service';

export type SortColumn = keyof Company | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { asc: 'desc', desc: '', '': 'asc' };

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'th[sortable]'
})
export class SortableDirective {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();
  @HostBinding('class') class: string;

  @HostListener('click')
  rotate() {
    this.direction = rotate[this.direction];
    this.class = this.direction;
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
