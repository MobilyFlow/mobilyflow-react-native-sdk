#import "MobilyflowReactNativeSdk.h"
#import <MobilyflowSDK/MobilyflowSDK.h>
#import <Foundation/NSUUID.h>
#import "Utils/ParserMobilyPurchaseSDKOptions.h"
#import "Utils/Utils.h"

@implementation MobilyflowReactNativeSdk

RCT_EXPORT_MODULE()

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeMobilyflowReactNativeSdkSpecJSI>(params);
}

- (NSUUID*)parseUUID:(NSString*)strID {
  return [[NSUUID alloc] initWithUUIDString:strID];
}

- (NSArray<NSUUID*>*)parseUUIDArray:(NSArray<NSString*>*)array {
  NSMutableArray* result = [[NSMutableArray alloc] initWithCapacity:[array count]];
  for (int i = 0; i < [array count]; i++) {
    result[i] = [self parseUUID:array[i]];
  }
  return result;
}

- (void)initialize:(NSString *)appId apiKey:(NSString *)apiKey environment:(NSString *)environment options:(JS::NativeMobilyflowReactNativeSdk::MobilyPurchaseSDKOptions &)options {

  [MobilyPurchaseSDK initializeWithAppId:appId apiKey:apiKey environment:environment options:[ParserMobilyPurchaseSDKOptions parseFromJSI:options]];
}

- (void)close {
  return [MobilyPurchaseSDK close];
}

- (void)login:(NSString *)externalRef resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  [MobilyPurchaseSDK loginWithExternalRef:externalRef completionHandler:^(MobilyCustomer * _Nullable customer, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([customer toDictionary]);
    }
  }];
}

- (void)logout {
  [MobilyPurchaseSDK logout];
}

- (void)getProducts:(NSArray *)identifiers onlyAvailable:(BOOL)onlyAvailable resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  [MobilyPurchaseSDK getProductsWithIdentifiers:identifiers onlyAvailable:onlyAvailable completionHandler:^(NSArray<MobilyProduct *> * _Nullable products, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([Utils arrayMap:products withBlock:^id _Nonnull(Serializable*  _Nonnull obj, NSUInteger idx) {
        return [obj toDictionary];
      }]);
    }
  }];
}

- (void)getSubscriptionGroups:(NSArray *)identifiers onlyAvailable:(BOOL)onlyAvailable resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  [MobilyPurchaseSDK getSubscriptionGroupsWithIdentifiers:identifiers onlyAvailable:onlyAvailable completionHandler:^(NSArray<MobilySubscriptionGroup *> * _Nullable groups, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([Utils arrayMap:groups withBlock:^id _Nonnull(Serializable*  _Nonnull obj, NSUInteger idx) {
        return [obj toDictionary];
      }]);
    }
  }];
}

- (void)getSubscriptionGroupById:(NSString *)ID resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  [MobilyPurchaseSDK getSubscriptionGroupById:[self parseUUID:ID] completionHandler:^(MobilySubscriptionGroup * _Nullable group, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([group toDictionary]);
    }
  }];
}

- (void)getEntitlementForSubscription:(NSString *)subscriptionGroupId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  [MobilyPurchaseSDK getEntitlementForSubscriptionWithSubscriptionGroupId:[self parseUUID:subscriptionGroupId] completionHandler:^(MobilyCustomerEntitlement * _Nullable entitlement, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([entitlement toDictionary]);
    }
  }];
}

- (void)getEntitlement:(NSString *)productId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  [MobilyPurchaseSDK getEntitlementWithProductId:[self parseUUID:productId] completionHandler:^(MobilyCustomerEntitlement * _Nullable entitlement, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([entitlement toDictionary]);
    }
  }];
}

- (void)getEntitlements:(NSArray *)productIds resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  [MobilyPurchaseSDK getEntitlementsWithProductIds:[self parseUUIDArray:productIds] completionHandler:^(NSArray<MobilyCustomerEntitlement *> * _Nullable entitlements, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([Utils arrayMap:entitlements withBlock:^id _Nonnull(Serializable*  _Nonnull obj, NSUInteger idx) {
        return [obj toDictionary];
      }]);
    }
  }];
}

- (void)getExternalEntitlements:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  [MobilyPurchaseSDK getExternalEntitlementsWithCompletionHandler:^(NSArray<MobilyCustomerEntitlement *> * _Nullable entitlements, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([Utils arrayMap:entitlements withBlock:^id _Nonnull(Serializable*  _Nonnull obj, NSUInteger idx) {
        return [obj toDictionary];
      }]);
    }
  }];
}

- (void)requestTransferOwnership:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  [MobilyPurchaseSDK requestTransferOwnershipWithCompletionHandler:^(NSString * _Nullable status, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve(status);
    }
  }];
}

- (void)openManageSubscription:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  [MobilyPurchaseSDK openManageSubscriptionWithCompletionHandler:^{
    resolve([NSNumber numberWithInt:1]);
  }];
}

- (void)openRefundDialogForProduct:(NSString *)productId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  MobilyProduct* product = [MobilyPurchaseSDK DANGEROUS_getProductFromCacheWithId:[self parseUUID:productId]];
  if (product == nil) {
    reject(@"3", @"MobilyflowSDK.MobilyError.unknown_error", [NSError errorWithDomain:@"MobilyflowSDK.MobilyError" code:3 userInfo:nil]);
    return;
  }
  
  [MobilyPurchaseSDK openRefundDialogForProduct:product completionHandler:^(NSString * _Nullable result, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([NSNumber numberWithBool:result]);
    }
  }];
}

- (void)openRefundDialogForTransactionId:(NSString *)transactionId resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  [MobilyPurchaseSDK openRefundDialogForTransactionId:transactionId completionHandler:^(NSString * _Nullable result, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([NSNumber numberWithBool:result]);
    }
  }];
}

- (void)purchaseProduct:(NSString *)productId options:(JS::NativeMobilyflowReactNativeSdk::PurchaseOptions &)options resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {


  MobilyProduct* product = [MobilyPurchaseSDK DANGEROUS_getProductFromCacheWithId:[self parseUUID:productId]];
  if (product == nil) {
    reject(@"1", @"MobilyflowSDK.MobilyPurchaseError.product_unavailable", [NSError errorWithDomain:@"MobilyflowSDK.MobilyPurchaseError" code:1 userInfo:nil]);
    return;
  }

  NSUUID *offerId = [self parseUUID:options.offerId()];
  int quantity = (int)options.quantity();

  PurchaseOptions *purchaseOptions = [[PurchaseOptions alloc] init];
  if (quantity > 1) {
    purchaseOptions = [purchaseOptions setQuantity:quantity];
  }

  if (offerId != nil) {
    if (product.subscription.introductoryOffer != nil && [product.subscription.introductoryOffer.id isEqual:offerId]) {
      purchaseOptions = [purchaseOptions setOffer:product.subscription.introductoryOffer];
    } else {
      for (MobilySubscriptionOffer *off in product.subscription.promotionalOffers) {
        if ([off.id isEqual:offerId]) {
          purchaseOptions = [purchaseOptions setOffer:off];
          break;
        }
      }
    }
  }
  
  [MobilyPurchaseSDK purchaseProduct:product options:purchaseOptions completionHandler:^(MobilyEvent * _Nullable event, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([event toDictionary]);
    }
  }];
}

- (void)sendDiagnostic:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  NSError *error = nil;
  [MobilyPurchaseSDK sendDiagnosticAndReturnError:&error];
  
  if (error) {
    reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
  } else {
    resolve([NSNumber numberWithBool:true]);
  }
}

- (void)getStoreCountry:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  [MobilyPurchaseSDK getStoreCountryWithCompletionHandler:^(NSString * _Nullable countryCode, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve(countryCode);
    }
  }];
}

- (void)isBillingAvailable:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject {
  resolve([NSNumber numberWithBool:[MobilyPurchaseSDK isBillingAvailable]]);
}

- (void)isForwardingEnable:(NSString *)externalRef resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  [MobilyPurchaseSDK isForwardingEnableWithExternalRef:externalRef completionHandler:^(BOOL result, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([NSNumber numberWithBool:result]);
    }
  }];
}

- (void)getCustomer:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {

  [MobilyPurchaseSDK getCustomerWithCompletionHandler:^(MobilyCustomer * _Nullable customer, NSError * _Nullable error) {
    if (error) {
      reject([NSString stringWithFormat:@"%ld", error.code], error.description, error);
    } else {
      resolve([customer toDictionary]);
    }
  }];
}

- (void)getSDKVersion:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  resolve([MobilyPurchaseSDK getSDKVersion]);
}


@end
