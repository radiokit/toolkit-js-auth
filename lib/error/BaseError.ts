export class BaseError {
  public message : string;


  constructor(message: string) {
    this.message = message;
  }
}

BaseError.prototype = new Error();
