export interface ResponseOptions {
  statusCode?: number;
  message?: string;
  data?: any;
  apiPath?: string;
}

export interface ApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: any;
  docs: string;
}

export interface ErrorResponseOptions {
  statusCode?: number;
  message?: string;
  stack?: string | null;
  apiPath?: string;
}

export interface ErrorResponse {
  status: string;
  statusCode: number;
  message: string;
  stack: string | null;
  doc: string;
}
