#import "MobilyflowReactNativeSdk.h"
#import <MobilyflowSDK/MobilyflowSDK.h>
#import <Foundation/NSUUID.h>
#import "Utils/ParserMobilyPurchaseSDKOptions.h"
#import "Utils/Utils.h"

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

- (void)login:(NSString *)uuid externalRef:(NSString *)externalRef resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  [[self getInstance:uuid] loginWithExternalRef:externalRef completionHandler:^(MobilyCustomer * _Nullable customer, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([customer toDictionary]);
    }
  }];
}

- (void)getProducts:(NSString *)uuid identifiers:(NSArray *)identifiers onlyAvailable:(BOOL)onlyAvailable resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  [[self getInstance:uuid] getProductsWithIdentifiers:identifiers onlyAvailable:onlyAvailable completionHandler:^(NSArray<MobilyProduct *> * _Nullable products, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([Utils arrayMap:products withBlock:^id _Nonnull(Serializable*  _Nonnull obj, NSUInteger idx) {
        return [obj toDictionary];
      }]);
    }
  }];
}

- (void)getSubscriptionGroups:(NSString *)uuid identifiers:(NSArray *)identifiers onlyAvailable:(BOOL)onlyAvailable resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  [[self getInstance:uuid] getSubscriptionGroupsWithIdentifiers:identifiers onlyAvailable:onlyAvailable completionHandler:^(NSArray<MobilySubscriptionGroup *> * _Nullable groups, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([Utils arrayMap:groups withBlock:^id _Nonnull(Serializable*  _Nonnull obj, NSUInteger idx) {
        return [obj toDictionary];
      }]);
    }
  }];
}

- (void)getEntitlementForSubscription:(NSString *)uuid subscriptionGroupId:(NSString *)subscriptionGroupId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  [[self getInstance:uuid] getEntitlementForSubscriptionWithSubscriptionGroupId:subscriptionGroupId completionHandler:^(MobilyCustomerEntitlement * _Nullable entitlement, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([entitlement toDictionary]);
    }
  }];
}

- (void)getEntitlement:(NSString *)uuid productId:(NSString *)productId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  [[self getInstance:uuid] getEntitlementWithProductId:productId completionHandler:^(MobilyCustomerEntitlement * _Nullable entitlement, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([entitlement toDictionary]);
    }
  }];
}

- (void)getEntitlements:(NSString *)uuid productIds:(NSArray *)productIds resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  [[self getInstance:uuid] getEntitlementsWithProductIds:productIds completionHandler:^(NSArray<MobilyCustomerEntitlement *> * _Nullable entitlements, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([Utils arrayMap:entitlements withBlock:^id _Nonnull(Serializable*  _Nonnull obj, NSUInteger idx) {
        return [obj toDictionary];
      }]);
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

- (void)openRefundDialog:(NSString *)uuid transactionId:(NSString *)transactionId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  [[self getInstance:uuid] openRefundDialogWithTransactionId:[transactionId longLongValue] completionHandler:^(BOOL result) {
    resolve([NSNumber numberWithBool:result]);
  }];
}

- (void)purchaseProduct:(NSString *)uuid productId:(NSString *)productId options:(JS::NativeMobilyflowReactNativeSdk::PurchaseOptions &)options resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  MobilyPurchaseSDK* sdk = [self getInstance:uuid];

  NSString *offerId = options.offerId();
  int quantity = (int)options.quantity();

  // TODO: This trigger a new useless API call, we should have a product registry
  [sdk getProductsWithIdentifiers:nil onlyAvailable:NO completionHandler:^(NSArray<MobilyProduct *> * _Nullable products, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      PurchaseOptions *purchaseOptions = [[PurchaseOptions alloc] init];
      if (quantity > 1) {
        purchaseOptions = [purchaseOptions setQuantity:quantity];
      }

      MobilyProduct *product = nil;

      for (MobilyProduct *it in products) {
        if ([it.id isEqualToString:productId]) {
          product = it;

          if (offerId != nil) {
            if ([it.subscriptionProduct.baseOffer.id isEqualToString:offerId]) {
              purchaseOptions = [purchaseOptions setOffer:it.subscriptionProduct.baseOffer];
            } else if (it.subscriptionProduct.freeTrial != nil && [it.subscriptionProduct.freeTrial.id isEqualToString:offerId]) {
              purchaseOptions = [purchaseOptions setOffer:it.subscriptionProduct.freeTrial];
            } else {
              for (MobilySubscriptionOffer *off in it.subscriptionProduct.promotionalOffers) {
                if ([off.id isEqualToString:offerId]) {
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

- (void)isForwardingEnable:(NSString *)uuid externalRef:(NSString *)externalRef resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  [[self getInstance:uuid] isForwardingEnableWithExternalRef:externalRef completionHandler:^(BOOL result, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([NSNumber numberWithBool:result]);
    }
  }];
}

@end
