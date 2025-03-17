//
//  ParserMobilyProduct.h
//  MobilyflowReactNativeSdk
//
//  Created by Gregoire Taja on 08/03/2025.
//

#import <Foundation/Foundation.h>
#import <MobilyflowSDK/MobilyflowSDK.h>

NS_ASSUME_NONNULL_BEGIN

@interface ParserMobilySubscriptionGroup : NSObject

+(NSDictionary*)toDictionary:(MobilySubscriptionGroup*)group;
+(NSArray<NSDictionary*> *)toDictionnaryArray:(NSArray<MobilySubscriptionGroup*>*)array;

@end

NS_ASSUME_NONNULL_END
