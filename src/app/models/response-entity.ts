export interface ResponseEntity<T> {
  data?: T;
  message: string;
  code: number;
  count: number;
  success: boolean;
}
