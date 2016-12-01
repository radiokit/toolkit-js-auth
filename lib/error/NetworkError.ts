import { BaseError } from './BaseError';

export class NetworkError extends BaseError {
  constructor(message: string) {
    super(message);
  }
}
