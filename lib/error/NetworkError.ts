export class NetworkError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "NetworkError";
    this.stack = (<any> new Error()).stack;
  }
}
