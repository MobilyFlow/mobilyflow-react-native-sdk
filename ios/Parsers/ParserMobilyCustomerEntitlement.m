//
//  ParserMobilyProduct.m
//  MobilyflowReactNativeSdk
//
//  Created by Gregoire Taja on 08/03/2025.
//

#import "ParserMobilyCustomerEntitlement.h"
#import "ParserMobilyProduct.h"

@implementation ParserMobilyCustomerEntitlement

+(NSArray<NSDictionary*>*)toDictionnaryArray:(NSArray<MobilyCustomerEntitlement*>*)array {
    NSMutableArray *result = [NSMutableArray arrayWithCapacity:array.count];
    for (MobilyCustomerEntitlement* obj in array) {
      [result addObject:[ParserMobilyCustomerEntitlement toDictionary:obj]];
    }
    return [result copy];
}

+(NSDictionary*)toDictionary:(MobilyCustomerEntitlement*)entitlement {
  NSMutableDictionary* dict = [NSMutableDictionary dictionary];
  
  [dict setObject:[NSNumber numberWithInt:entitlement.type] forKey:@"type"];
  [dict setObject:[ParserMobilyProduct toDictionary:entitlement.product] forKey:@"product"];
  [dict setObject:entitlement.platformOriginalTransactionId forKey:@"platformOriginalTransactionId"];

  if (entitlement.item != nil) {
    NSMutableDictionary* item = [NSMutableDictionary dictionary];
    
    [item setObject:[NSNumber numberWithLong:entitlement.item.quantity] forKey:@"quantity"];
    
    [dict setObject:item forKey:@"item"];
  }
  
  if (entitlement.subscription != nil) {
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setTimeZone:[NSTimeZone timeZoneWithAbbreviation:@"UTC"]];
    [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss'Z'"];
    
    NSMutableDictionary* subscription = [NSMutableDictionary dictionary];
    
    [subscription setObject:[dateFormatter stringFromDate:entitlement.subscription.startDate] forKey:@"startDate"];
    [subscription setObject:[dateFormatter stringFromDate:entitlement.subscription.expirationDate] forKey:@"expirationDate"];
    [subscription setObject:[NSNumber numberWithBool:entitlement.subscription.autoRenewEnable] forKey:@"autoRenewEnable"];
    [subscription setObject:[NSNumber numberWithInt:entitlement.subscription.platform] forKey:@"platform"];
    [subscription setObject:[NSNumber numberWithBool:entitlement.subscription.isManagedByThisStoreAccount] forKey:@"isManagedByThisStoreAccount"];
    
    [dict setObject:subscription forKey:@"subscription"];
  }
  
  return dict;
}

@end
