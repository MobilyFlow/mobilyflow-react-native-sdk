export class MobilyPurchaseError extends Error {
  constructor(
    public readonly type: MobilyPurchaseError.Type,
    public readonly message: string,
    public readonly nativeStack?: any
  ) {
    super(message);
  }
}

export namespace MobilyPurchaseError {
  export enum Type {
    PURCHASE_ALREADY_PENDING,

    PRODUCT_UNAVAILABLE,
    NETWORK_UNAVAILABLE,
    BILLING_ISSUE,

    WEBHOOK_FAILED,
    WEBHOOK_NOT_PROCESSED,

    ALREADY_PURCHASED,
    RENEW_ALREADY_ON_THIS_PLAN,
    NOT_MANAGED_BY_THIS_STORE_ACCOUNT,
    STORE_ACCOUNT_ALREADY_HAVE_PURCHASE,
    CUSTOMER_FORWARDED,

    USER_CANCELED,
    FAILED,
    PENDING,
  }
}
