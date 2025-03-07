#import "MobilyflowReactNativeSdk.h"
#import <MobilyflowSDK/MobilyflowSDK.h>
#import <Foundation/NSUUID.h>

@interface MobilyflowReactNativeSdk()
@property (strong, nonatomic) NSMutableDictionary* sdkInstances;
@end

@implementation MobilyflowReactNativeSdk

RCT_EXPORT_MODULE()

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeMobilyflowReactNativeSdkSpecJSI>(params);
}


- (id) init {
  if (self = [super init]) {
    _sdkInstances = [NSMutableDictionary dictionary];
  }
  return self;
}

- (NSString*)playground {
  return [[NSUUID UUID] UUIDString];
}

- (NSString *)instantiate:(NSString *)appId
                   apiKey:(NSString *)apiKey
              environment:(double)environment
                  options:(JS::NativeMobilyflowReactNativeSdk::MobilyPurchaseSDKOptions &)options {
  NSString* uuid = [[NSUUID UUID] UUIDString];
  
  MobilyPurchaseSDK *sdk = [[MobilyPurchaseSDK alloc] initWithAppId:appId apiKey:apiKey environment:(MobilyEnvironment) environment options:[ParserMobilyPurchaseSDKOptions parseFromJSI:options]];
  [_sdkInstances setObject:sdk forKey:uuid];
  
  return uuid;
}

-(MobilyPurchaseSDK*)getInstance:(NSString*)uuid {
  return [_sdkInstances objectForKey:uuid];
}

- (void)close:(NSString*)uuid {
  return [[self getInstance:uuid] close];
}

- (void)login:(NSString*)uuid externalId:(NSString*)externalId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  [[self getInstance:uuid] loginObjcWithExternalId:externalId completionHandler:^(NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve(0);
    }
  }];
}

- (void)getProducts:(NSString *)uuid
        identifiers:(NSArray *)identifiers
            resolve:(RCTPromiseResolveBlock)resolve
             reject:(RCTPromiseRejectBlock)reject {
  
  [[self getInstance:uuid] getProductsObjcWithIdentifiers:identifiers completionHandler:^(NSArray<MobilyProduct *> * _Nullable products, NSError * _Nullable error) {
    if (error) {
      resolve(@{@"hello": @"world"});
//      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve(@{@"hello": @"world"});
      // TODO: Parse
      // resolve(products);
    }
  }];
}

@end
