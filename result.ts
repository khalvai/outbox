import { HttpStatus } from '@nestjs/common';

export class Result<T> {
  private constructor(
    private _value: T | null,
    private notification: string | null,
    private status?: HttpStatus,
  ) {}
  public static ok<U>(value?: U, status?: HttpStatus): Result<U> {
    return new Result<U>(value, null, status);
  }
  public static fail<U>(notification: string, status?: HttpStatus): Result<U> {
    return new Result<U>(null, notification, status);
  }

  public isSuccess(): boolean {
    return this.notification === null;
  }

  public isFailure(): boolean {
    return this.notification !== null;
  }

  public clean(): Result<T> {
    this.notification = null;
    return this;
  }

  public get value(): T | null {
    if (this.isFailure()) {
      throw new Error('Cannot get value from a failed result.');
    }
    return this._value;
  }

  public getError(): string | null {
    if (this.isSuccess()) {
      throw new Error('Cannot get error from a successful result.');
    }
    return this.notification;
  }

  public getStatus(): HttpStatus {
    return this.status;
  }
}
