interface Sortable {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface Pageable {
  sort: Sortable;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PageableResponse<T> {
  content: T[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  sort: Sortable;
  empty: boolean;
}
