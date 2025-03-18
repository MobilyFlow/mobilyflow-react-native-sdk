//
//  ParserMobilyPurchaseSDKOptions.h
//  MobilyflowReactNativeSdk
//
//  Created by Gregoire Taja on 06/03/2025.
//

#import <Foundation/Foundation.h>
#import <RCTTypeSafety/RCTConvertHelpers.h>
#import "../generated/RNMobilyflowReactNativeSdkSpec/RNMobilyflowReactNativeSdkSpec.h"
#import <MobilyflowSDK/MobilyflowSDK.h>

NS_ASSUME_NONNULL_BEGIN

@interface ParserMobilyPurchaseSDKOptions : NSObject

+(MobilyPurchaseSDKOptions*)parseFromJSI:(JS::NativeMobilyflowReactNativeSdk::MobilyPurchaseSDKOptions &)jsi;

@end

NS_ASSUME_NONNULL_END
