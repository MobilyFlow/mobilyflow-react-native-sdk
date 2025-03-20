export class MobilyTransferOwnershipError extends Error {
  constructor(
    public readonly type: MobilyTransferOwnershipError.Type,
    public readonly message: string,
    public readonly nativeStack?: any
  ) {
    super(message);
  }
}

export namespace MobilyTransferOwnershipError {
  export enum Type {
    NOTHING_TO_TRANSFER,
    TRANSFER_TO_SAME_CUSTOMER,
    ALREADY_PENDING,

    WEBHOOK_NOT_PROCESSED,
    WEBHOOK_FAILED,
  }
}
