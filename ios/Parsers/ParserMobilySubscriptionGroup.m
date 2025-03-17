//
//  ParserMobilyProduct.m
//  MobilyflowReactNativeSdk
//
//  Created by Gregoire Taja on 08/03/2025.
//

#import "ParserMobilySubscriptionGroup.h"
#import "ParserMobilyProduct.h"

@implementation ParserMobilySubscriptionGroup

+(NSArray<NSDictionary*>*)toDictionnaryArray:(NSArray<MobilySubscriptionGroup*>*)array {
    NSMutableArray *result = [NSMutableArray arrayWithCapacity:array.count];
    for (MobilySubscriptionGroup* obj in array) {
      [result addObject:[ParserMobilySubscriptionGroup toDictionary:obj]];
    }
    return [result copy];
}

+(NSDictionary*)toDictionary:(MobilySubscriptionGroup*)group {
  NSMutableDictionary* dict = [NSMutableDictionary dictionary];
  
  [dict setObject:group.id forKey:@"id"];
  [dict setObject:group.identifier forKey:@"identifier"];
  [dict setObject:group.name forKey:@"name"];
  [dict setObject:group.details forKey:@"details"];
  [dict setObject:group.ios_groupId forKey:@"ios_groupId"];
  [dict setObject:group.extras forKey:@"extras"];
  
  if (group.products.count > 0) {
    [dict setObject:[ParserMobilyProduct toDictionnaryArray:group.products] forKey:@"products"];
  }
  
  return dict;
}

@end
