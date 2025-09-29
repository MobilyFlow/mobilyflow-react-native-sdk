import { MobilyError, MobilyPurchaseError } from 'mobilyflow-react-native-sdk';
import { DateTime } from 'luxon';

export const removeUndefined = <T extends object>(obj: T) => {
  for (const key of Object.keys(obj)) {
    if ((obj as any)[key] === undefined) {
      delete (obj as any)[key];
    }
  }
  return obj;
};

export const getMobilyflowErrorLabel = (error: any) => {
  if (error) {
    if (error instanceof MobilyPurchaseError) {
      return `[MobilyPurchaseError] ${MobilyPurchaseError.Type[error.type]}`;
    } else if (error instanceof MobilyError) {
      return `[MobilyError] ${MobilyError.Type[error.type]}`;
    } else {
      return `[Error] ${error}`;
    }
  }
  return null;
};

export const formatDate = (date: Date, format: 'datetime' | 'date' = 'datetime') => {
  const luxonFormat = format === 'datetime' ? "yyyy-LL-dd 'at' HH:mm:ss" : 'yyyy-LL-dd';
  return DateTime.fromJSDate(date).toFormat(luxonFormat);
};

export const formatPriceMillis = (priceMillis: number, currency: string) => {
  return `${(priceMillis / 1000).toFixed(2)} ${currency}`;
};
