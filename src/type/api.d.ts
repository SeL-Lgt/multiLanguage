export interface Result<T> {
  data: T;
  message: string;
  status: number;
}

export interface Pagination<T> {
  row: T;
  total: number;
  current: number;
  pageSize: number;
}
