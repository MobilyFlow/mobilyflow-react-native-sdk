#import "MobilyflowReactNativeSdk.h"
#import <MobilyflowSDK/MobilyflowSDK.h>
#import <Foundation/NSUUID.h>
#import "Parsers/ParserMobilyPurchaseSDKOptions.h"
#import "Parsers/ParserMobilyProduct.h"
#import "Parsers/ParserMobilySubscriptionGroup.h"
#import "Parsers/ParserMobilyCustomerEntitlement.h"

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
  
  [[self getInstance:uuid] getSubscriptionGroupsWithIdentifiers:identifiers completionHandler:^(NSArray<MobilySubscriptionGroup *> * _Nullable groups, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([ParserMobilySubscriptionGroup toDictionnaryArray:groups]);
    }
  }];
}

- (void)getEntitlementForSubscription:(NSString *)uuid subscriptionGroupId:(NSString *)subscriptionGroupId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
  [[self getInstance:uuid] getEntitlementForSubscriptionWithSubscriptionGroupId:subscriptionGroupId completionHandler:^(MobilyCustomerEntitlement * _Nullable entitlement, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([ParserMobilyCustomerEntitlement toDictionary:entitlement]);
    }
  }];
}

- (void)getEntitlement:(NSString *)uuid productId:(NSString *)productId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
  [[self getInstance:uuid] getEntitlementWithProductId:productId completionHandler:^(MobilyCustomerEntitlement * _Nullable entitlement, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([ParserMobilyCustomerEntitlement toDictionary:entitlement]);
    }
  }];
}

- (void)getEntitlements:(NSString *)uuid productIds:(NSArray *)productIds resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
  [[self getInstance:uuid] getEntitlementsWithProductIds:productIds completionHandler:^(NSArray<MobilyCustomerEntitlement *> * _Nullable entitlements, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([ParserMobilyCustomerEntitlement toDictionnaryArray:entitlements]);
    }
  }];
}

- (void)requestTransferOwnership:(NSString *)uuid resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
  [[self getInstance:uuid] requestTransferOwnershipWithCompletionHandler:^(enum TransferOwnershipStatus status, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([NSNumber numberWithInt:status]);
    }
  }];
}

- (void)openManageSubscription:(NSString *)uuid resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
  [[self getInstance:uuid] openManageSubscriptionWithCompletionHandler:^{
    resolve([NSNumber numberWithInt:1]);
  }];
}

- (void)purchaseProduct:(NSString *)uuid productId:(NSString *)productId options:(JS::NativeMobilyflowReactNativeSdk::PurchaseOptions &)options resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  
  MobilyPurchaseSDK* sdk = [self getInstance:uuid];
  
  [sdk getProductsWithIdentifiers:nil completionHandler:^(NSArray<MobilyProduct *> * _Nullable products, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      
      PurchaseOptions *purchaseOptions = [[PurchaseOptions alloc] init];
      MobilyProduct *product = nil;
      NSString *offerId = options.offerId();
      
      for (MobilyProduct *it in products) {
        if (it.id == productId) {
          product = it;
          
          if (offerId != nil) {
            if (it.subscriptionProduct.baseOffer.id == offerId) {
              purchaseOptions = [purchaseOptions setOffer:it.subscriptionProduct.baseOffer];
            } else if (it.subscriptionProduct.freeTrial != nil && it.subscriptionProduct.freeTrial.id == offerId) {
              purchaseOptions = [purchaseOptions setOffer:it.subscriptionProduct.freeTrial];
            } else {
              for (MobilySubscriptionOffer *off in it.subscriptionProduct.promotionalOffers) {
                if (off.id == offerId) {
                  purchaseOptions = [purchaseOptions setOffer:off];
                  break;
                }
              }
            }
          }
          
          break;
        }
      }
      
      if (product == nil) {
        reject(@"-1", [NSString stringWithFormat:@"Unknown productId (%@)", productId], nil);
        return;
      }
      
      [sdk purchaseProduct:product options:purchaseOptions completionHandler:^(enum WebhookStatus status, NSError * _Nullable error) {
        if (error) {
          reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
        } else {
          resolve([NSNumber numberWithInt:status]);
        }
      }];
    }
  }];
}

- (void)sendDiagnotic:(NSString *)uuid {
  [[self getInstance:uuid] sendDiagnotic];
}

- (void)getStoreCountry:(NSString *)uuid resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  [[self getInstance:uuid] getStoreCountryWithCompletionHandler:^(NSString * _Nullable countryCode) {
    resolve(countryCode);
  }];
}

@end
