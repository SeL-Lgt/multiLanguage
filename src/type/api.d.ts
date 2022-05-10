export interface Result<T> {
  data: T;
  message: string;
  status: number;
}

export interface Pagination {
  total: number;
  current: number;
  pageSize: number;
}

export interface PaginationList<T> extends Pagination {
  row: T;
}
