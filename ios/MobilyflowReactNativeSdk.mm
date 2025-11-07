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

- (NSString *)instantiate:(NSString *)appId apiKey:(NSString *)apiKey environment:(NSString *)environment options:(JS::NativeMobilyflowReactNativeSdk::MobilyPurchaseSDKOptions &)options {

  NSString* uuid = [[NSUUID UUID] UUIDString];

  MobilyPurchaseSDK *sdk = [[MobilyPurchaseSDK alloc] initWithAppId:appId apiKey:apiKey environment:environment options:[ParserMobilyPurchaseSDKOptions parseFromJSI:options]];
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

- (void)logout:(NSString *)uuid {
  [[self getInstance:uuid] logout];
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

- (void)getSubscriptionGroupById:(NSString *)uuid id:(NSString *)id resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  [[self getInstance:uuid] getSubscriptionGroupByIdWithId:id completionHandler:^(MobilySubscriptionGroup * _Nullable group, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([group toDictionary]);
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

  [[self getInstance:uuid] getEntitlementWithProductId:[[NSUUID alloc] initWithUUIDString:productId] completionHandler:^(MobilyCustomerEntitlement * _Nullable entitlement, NSError * _Nullable error) {
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

- (void)getExternalEntitlements:(NSString *)uuid resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  [[self getInstance:uuid] getExternalEntitlementsWithCompletionHandler:^(NSArray<MobilyCustomerEntitlement *> * _Nullable entitlements, NSError * _Nullable error) {
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

  [[self getInstance:uuid] requestTransferOwnershipWithCompletionHandler:^(NSString * _Nullable status, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve(status);
    }
  }];
}

- (void)openManageSubscription:(NSString *)uuid resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  [[self getInstance:uuid] openManageSubscriptionWithCompletionHandler:^{
    resolve([NSNumber numberWithInt:1]);
  }];
}

- (void)openRefundDialog:(NSString *)uuid productId:(NSString *)productId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  MobilyProduct* product = [[self getInstance:uuid] getProductFromCacheWithIdWithId:[[NSUUID alloc] initWithUUIDString:productId]];
  if (product == nil) {
    reject(@"3", @"MobilyflowSDK.MobilyError.unknown_error", [NSError errorWithDomain:@"MobilyflowSDK.MobilyError" code:3 userInfo:nil]);
    return;
  }

  [[self getInstance:uuid] openRefundDialogWithProduct:product completionHandler:^(NSString * _Nullable result) {
    resolve([NSNumber numberWithBool:result]);
  }];
}

- (void)purchaseProduct:(NSString *)uuid productId:(NSString *)productId options:(JS::NativeMobilyflowReactNativeSdk::PurchaseOptions &)options resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  MobilyPurchaseSDK* sdk = [self getInstance:uuid];

  MobilyProduct* product = [[self getInstance:uuid] getProductFromCacheWithIdWithId:[[NSUUID alloc] initWithUUIDString:productId]];
  if (product == nil) {
    reject(@"1", @"MobilyflowSDK.MobilyPurchaseError.product_unavailable", [NSError errorWithDomain:@"MobilyflowSDK.MobilyPurchaseError" code:1 userInfo:nil]);
    return;
  }

  NSUUID *offerId = [[NSUUID alloc] initWithUUIDString:options.offerId()];
  int quantity = (int)options.quantity();

  PurchaseOptions *purchaseOptions = [[PurchaseOptions alloc] init];
  if (quantity > 1) {
    purchaseOptions = [purchaseOptions setQuantity:quantity];
  }

  if (offerId != nil) {
    if (product.subscription.freeTrial != nil && [product.subscription.freeTrial.id isEqual:offerId]) {
      purchaseOptions = [purchaseOptions setOffer:product.subscription.freeTrial];
    } else {
      for (MobilySubscriptionOffer *off in product.subscription.promotionalOffers) {
        if ([off.id isEqual:offerId]) {
          purchaseOptions = [purchaseOptions setOffer:off];
          break;
        }
      }
    }
  }
  
  [sdk purchaseProduct:product options:purchaseOptions completionHandler:^(MobilyEvent * _Nullable event, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([event toDictionary]);
    }
  }];
}

- (void)sendDiagnostic:(NSString *)uuid {
  [[self getInstance:uuid] sendDiagnostic];
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

- (void)getCustomer:(NSString *)uuid resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  [[self getInstance:uuid] getCustomerWithCompletionHandler:^(MobilyCustomer * _Nullable customer, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([customer toDictionary]);
    }
  }];
}

- (void)getSDKVersion:(NSString *)uuid resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  resolve([[self getInstance:uuid] getSDKVersion]);
}

@end
