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


-(MobilyPurchaseSDK*)getInstance:(NSString*)uuid {
  return [_sdkInstances objectForKey:uuid];
}

- (NSString *)instantiate:(NSString *)appId apiKey:(NSString *)apiKey environment:(double)environment options:(JS::NativeMobilyflowReactNativeSdk::MobilyPurchaseSDKOptions &)options {
  
  NSString* uuid = [[NSUUID UUID] UUIDString];
  
  MobilyPurchaseSDK *sdk = [[MobilyPurchaseSDK alloc] initWithAppId:appId apiKey:apiKey environment:(MobilyEnvironment) environment options:[ParserMobilyPurchaseSDKOptions parseFromJSI:options]];
  [_sdkInstances setObject:sdk forKey:uuid];
  
  return uuid;
}

- (void)close:(NSString *)uuid {
  return [[self getInstance:uuid] close];
}

- (void)login:(NSString *)uuid externalId:(NSString *)externalId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  [[self getInstance:uuid] loginWithExternalId:externalId completionHandler:^(NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve(0);
    }
  }];
}

- (void)getProducts:(NSString *)uuid identifiers:(NSArray *)identifiers resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  [[self getInstance:uuid] getProductsWithIdentifiers:identifiers completionHandler:^(NSArray<MobilyProduct *> * _Nullable products, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([ParserMobilyProduct toDictionnaryArray:products]);
    }
  }];
}

- (void)getSubscriptionGroups:(NSString *)uuid identifiers:(NSArray *)identifiers resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
}

- (void)getEntitlementForSubscription:(NSString *)uuid subscriptionGroupId:(NSString *)subscriptionGroupId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
}

- (void)getEntitlement:(NSString *)uuid productId:(NSString *)productId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
}

- (void)getEntitlements:(NSString *)uuid productIds:(NSArray *)productIds resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
}

- (void)requestTransferOwnership:(NSString *)uuid resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
}

- (void)openManageSubscription:(NSString *)uuid resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
}

- (void)purchaseProduct:(NSString *)uuid productId:(NSString *)productId options:(JS::NativeMobilyflowReactNativeSdk::PurchaseOptions &)options resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
}

- (void)sendDiagnotic:(NSString *)uuid {
  
}

- (void)getStoreCountry:(NSString *)uuid resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
}

@end
