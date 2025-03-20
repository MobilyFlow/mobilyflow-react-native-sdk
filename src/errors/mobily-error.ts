export class MobilyError extends Error {
  constructor(
    public readonly type: MobilyError.Type,
    public readonly message: string,
    public readonly nativeStack?: any
  ) {
    super(message);
  }
}

export namespace MobilyError {
  export enum Type {
    STORE_UNAVAILABLE,
    SERVER_UNAVAILABLE,
    NO_CUSTOMER_LOGGED,
    UNKNOWN_ERROR,
  }
}
