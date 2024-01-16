type message = {message: string[] | string};
export class ApiResponse<T> {
  success: boolean;
  data?: T & message;
  error?: {
    code: string | number;
    message: string[] | string;
  };
  timestamp?: Date = new Date();
}
