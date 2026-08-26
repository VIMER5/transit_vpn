export class AppError extends Error {
  readonly code: string;
  readonly statusCode: number;
  constructor(code: string, statusCode: number, msg: string) {
    super(msg);
    this.code = code;
    this.statusCode = statusCode;
  }
}
