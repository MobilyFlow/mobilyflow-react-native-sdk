//
//  ParserMobilyProduct.h
//  MobilyflowReactNativeSdk
//
//  Created by Gregoire Taja on 08/03/2025.
//

#import <Foundation/Foundation.h>
#import <MobilyflowSDK/MobilyflowSDK.h>

NS_ASSUME_NONNULL_BEGIN

@interface ParserMobilyCustomerEntitlement : NSObject

+(NSDictionary*)toDictionary:(MobilyCustomerEntitlement*)group;
+(NSArray<NSDictionary*> *)toDictionnaryArray:(NSArray<MobilyCustomerEntitlement*>*)array;

@end

NS_ASSUME_NONNULL_END
