export class HttpExceptionError extends Error {
  public statusCode: number;

  constructor(message: any, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}
