//
//  ParserMobilyProduct.m
//  MobilyflowReactNativeSdk
//
//  Created by Gregoire Taja on 08/03/2025.
//

#import "ParserMobilyProduct.h"

@implementation ParserMobilyProduct

+(NSArray<NSDictionary*>*)subscriptionOffersToDictionnaryArray:(NSArray<MobilySubscriptionOffer*>*)array {
    NSMutableArray *result = [NSMutableArray arrayWithCapacity:array.count];
  for (MobilySubscriptionOffer* obj in array) {
      [result addObject:[ParserMobilyProduct subscriptionOfferToDictionnary:obj]];
    }
    return [result copy];
}

+(NSDictionary*)subscriptionOfferToDictionnary:(MobilySubscriptionOffer*)offer {
  NSMutableDictionary* dict = [NSMutableDictionary dictionary];
  
  if (offer.id != nil) {
    [dict setObject:offer.id forKey:@"id"];
  }
  if (offer.name != nil) {
    [dict setObject:offer.name forKey:@"name"];
  }
  [dict setObject:[NSDecimalNumber decimalNumberWithDecimal:offer.price] forKey:@"price"];
  [dict setObject:offer.currencyCode forKey:@"currencyCode"];
  [dict setObject:offer.priceFormatted forKey:@"priceFormatted"];
  [dict setObject:[NSNumber numberWithBool:offer.isFreeTrial] forKey:@"isFreeTrial"];
  [dict setObject:[NSNumber numberWithInt:(int)offer.periodCount] forKey:@"periodCount"];
  [dict setObject:[NSNumber numberWithInt:(int)offer.periodUnit] forKey:@"periodUnit"];
  if (offer.ios_offerId != nil) {
    [dict setObject:offer.ios_offerId forKey:@"ios_offerId"];
  }
  if (offer.extras != nil) {
    [dict setObject:offer.extras forKey:@"extras"];
  }
  [dict setObject:[NSNumber numberWithInt:(int)offer.status] forKey:@"status"];
  
  return dict;
}

+(NSArray<NSDictionary*>*)toDictionnaryArray:(NSArray<MobilyProduct*>*)array {
    NSMutableArray *result = [NSMutableArray arrayWithCapacity:array.count];
    for (MobilyProduct* obj in array) {
      [result addObject:[ParserMobilyProduct toDictionary:obj]];
    }
    return [result copy];
}

+(NSDictionary*)toDictionary:(MobilyProduct*)product {
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
  // NSLocale *enUSPOSIXLocale = [NSLocale localeWithLocaleIdentifier:@"en_US_POSIX"];
  // [dateFormatter setLocale:enUSPOSIXLocale];
  // [dateFormatter setCalendar:[NSCalendar calendarWithIdentifier:NSCalendarIdentifierGregorian]];
  [dateFormatter setTimeZone:[NSTimeZone timeZoneWithAbbreviation:@"UTC"]];
  [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss'Z'"];

  NSMutableDictionary* dict = [NSMutableDictionary dictionary];
  
  [dict setObject:product.name forKey:@"name"];
  [dict setObject:[dateFormatter stringFromDate:product.createdAt] forKey:@"createdAt"];
  [dict setObject:[dateFormatter stringFromDate:product.createdAt] forKey:@"updatedAt"];
  [dict setObject:product.identifier forKey:@"identifier"];
  [dict setObject:product.appId forKey:@"appId"];
  [dict setObject:product.name forKey:@"name"];
  [dict setObject:product.details forKey:@"details"];
  [dict setObject:product.ios_sku forKey:@"ios_sku"];
  [dict setObject:[NSNumber numberWithInt:(int)product.type] forKey:@"type"];
  if (product.extras != nil) {
    [dict setObject:product.extras forKey:@"extras"];
  }
  [dict setObject:[NSNumber numberWithInt:(int)product.status] forKey:@"status"];
  
  if (product.type == ProductTypeOne_time) {
    NSMutableDictionary* oneTimeProduct = [NSMutableDictionary dictionary];
    
    [oneTimeProduct setObject:[NSDecimalNumber decimalNumberWithDecimal:product.oneTimeProduct.price] forKey:@"price"];
    [oneTimeProduct setObject:product.oneTimeProduct.currencyCode forKey:@"currencyCode"];
    [oneTimeProduct setObject:product.oneTimeProduct.priceFormatted forKey:@"priceFormatted"];
    [oneTimeProduct setObject:[NSNumber numberWithBool:product.oneTimeProduct.isConsumable] forKey:@"isConsumable"];
    [oneTimeProduct setObject:[NSNumber numberWithBool:product.oneTimeProduct.isNonRenewableSub] forKey:@"isNonRenewableSub"];
    [oneTimeProduct setObject:[NSNumber numberWithBool:product.oneTimeProduct.isMultiQuantity] forKey:@"isMultiQuantity"];
    [oneTimeProduct setObject:[NSNumber numberWithInt:(int)product.oneTimeProduct.status] forKey:@"status"];
    
    [dict setObject:oneTimeProduct forKey:@"oneTimeProduct"];
  } else {
    NSMutableDictionary* subscriptionProduct = [NSMutableDictionary dictionary];
    
    if (product.subscriptionProduct.baseOffer != nil) {
      [subscriptionProduct setObject:[ParserMobilyProduct subscriptionOfferToDictionnary:product.subscriptionProduct.baseOffer] forKey:@"baseOffer"];
    }
    
    if (product.subscriptionProduct.freeTrial != nil) {
      [subscriptionProduct setObject:[ParserMobilyProduct subscriptionOfferToDictionnary:product.subscriptionProduct.freeTrial] forKey:@"freeTrial"];
    }
    
    [subscriptionProduct setObject:[ParserMobilyProduct subscriptionOffersToDictionnaryArray:product.subscriptionProduct.promotionalOffers] forKey:@"promotionalOffers"];
    [subscriptionProduct setObject:[NSNumber numberWithInt:(int)product.subscriptionProduct.status] forKey:@"status"];
    [subscriptionProduct setObject:[NSNumber numberWithInt:(int)product.subscriptionProduct.groupLevel] forKey:@"groupLevel"];
    [subscriptionProduct setObject:product.subscriptionProduct.subscriptionGroupId forKey:@"subscriptionGroupId"];
    [subscriptionProduct setObject:product.subscriptionProduct.subscriptionGroup forKey:@"subscriptionGroup"];
    
    [dict setObject:subscriptionProduct forKey:@"subscriptionProduct"];
  }
  
  return dict;
}

@end
