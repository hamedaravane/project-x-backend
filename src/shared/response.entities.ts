export interface ResponseEntities<T> {
  timestamp: Date;
  isSuccess: boolean;
  data: T;
}
