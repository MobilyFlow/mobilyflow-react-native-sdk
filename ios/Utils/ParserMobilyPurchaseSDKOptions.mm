//
//  ParserMobilyPurchaseSDKOptions.m
//  MobilyflowReactNativeSdk
//
//  Created by Gregoire Taja on 06/03/2025.
//

#import "ParserMobilyPurchaseSDKOptions.h"

@implementation ParserMobilyPurchaseSDKOptions

+(MobilyPurchaseSDKOptions*)parseFromJSI:(JS::NativeMobilyflowReactNativeSdk::MobilyPurchaseSDKOptions &)jsi {
  NSArray<NSString*>* languages = nil;
  if (jsi.languages().has_value()) {
    languages = RCTConvertVecToArray(jsi.languages().value());
  }
  
  bool debug = jsi.debug().has_value() ? jsi.debug().value() : false;
  
  NSString* apiURL = jsi.apiURL().length > 0 ? jsi.apiURL() : nil;
  
  return [[MobilyPurchaseSDKOptions alloc] initWithLanguages:languages debug:debug apiURL:apiURL];
}

@end
