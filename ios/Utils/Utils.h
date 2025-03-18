//
//  Utils.h
//  MobilyflowReactNativeSdk
//
//  Created by Gregoire Taja on 18/03/2025.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Utils : NSObject

+(NSArray *)arrayMap:(NSArray*)array withBlock:(id (^)(id obj, NSUInteger idx))block;

@end

NS_ASSUME_NONNULL_END
