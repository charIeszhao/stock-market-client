import { SortColumn, SortDirection } from '../directives/sortable.directive';

export interface Entity {
  id: number;
  name: string;
}

export interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

export interface ResponseData<T> {
  entities: T[];
  total: number;
}

export abstract class TableService {

  protected constructor() { }

  private compare(v1: string, v2: string) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  private sort<T>(entities: T[], column: SortColumn, direction: string): T[] {
    if (direction === '' || column === '') {
      return entities;
    } else {
      return [...entities].sort((a: T, b: T) => {
        const result = this.compare(`${a[column]}`, `${b[column]}`);
        return direction === 'asc' ? result : -result;
      });
    }
  }

  private matches<T>(entity: T, term: string) {
    for (const [key, value] of Object.entries(entity)) {
      if (key !== 'id' && ('' + value).toLowerCase().includes(term.toLowerCase())) {
        return true;
      }
    }
  }

  protected pipeline<T>(entities: T[], total: number, state: State): ResponseData<T> {
    const { searchTerm, sortColumn, sortDirection } = state;
    entities = this.sort(entities, sortColumn, sortDirection);
    entities = entities.filter(entity => this.matches(entity, searchTerm));
    return { entities, total };
  }
}
