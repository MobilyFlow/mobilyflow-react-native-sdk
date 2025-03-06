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

- (NSString*)instantiate:(NSString*)appId apiKey:(NSString*)apiKey environment:(NSNumber*)environment options:(NSDictionary*)options {
  NSString* uuid = [[NSUUID UUID] UUIDString];
  
  MobilyPurchaseSDK *sdk = [[MobilyPurchaseSDK alloc] initWithAppId:appId apiKey:apiKey environment:(MobilyEnvironment) [environment intValue] options:nil];
  [_sdkInstances setObject:sdk forKey:uuid];
  
  return uuid;
}

-(MobilyPurchaseSDK*)getInstance:(NSString*)uuid {
  return [_sdkInstances objectForKey:uuid];
}

- (void)close:(NSString*)uuid {
  return [[self getInstance:uuid] close];
}

- (void)login:(NSString*)uuid externalId:(NSString*)externalId {
  [[self getInstance:uuid] loginWithExternalId:externalId completionHandler:^(NSError * _Nullable err) {
    if (err) {
      NSLog(@"Error %@\n", err);
    } else {
      // Ok magle
      NSLog(@"Ok logged\n");
    }
  }];
}

@end
