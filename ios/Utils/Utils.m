//
//  Utils.m
//  MobilyflowReactNativeSdk
//
//  Created by Gregoire Taja on 18/03/2025.
//

#import "Utils.h"

@implementation Utils

+(NSArray *)arrayMap:(NSArray*)array withBlock:(id (^)(id obj, NSUInteger idx))block {
  NSMutableArray *result = [NSMutableArray arrayWithCapacity:[array count]];
    
  [array enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
    [result addObject:block(obj, idx)];
  }];
  
  return result;
}

@end
