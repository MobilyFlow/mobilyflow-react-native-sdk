//
//  ParserMobilyProduct.h
//  MobilyflowReactNativeSdk
//
//  Created by Gregoire Taja on 08/03/2025.
//

#import <Foundation/Foundation.h>
#import <MobilyflowSDK/MobilyflowSDK.h>

NS_ASSUME_NONNULL_BEGIN

@interface ParserMobilyProduct : NSObject

+(NSDictionary*)toDictionary:(MobilyProduct*)product;
+(NSArray<NSDictionary*> *)toDictionnaryArray:(NSArray<MobilyProduct*>*)array;

@end

NS_ASSUME_NONNULL_END
