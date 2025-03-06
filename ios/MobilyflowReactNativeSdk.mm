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

- (void)login:(NSString*)uuid externalId:(NSString*)externalId {
  NSLog(@"Avant le drame\n");
  NSError* error = nil;
  
  [[self getInstance:uuid] loginWithExternalId:externalId error:&error completionHandler:^{
      NSLog(@"Ok logged\n");
  }];
  NSLog(@"Ok finished\n");
  
  NSLog(@"Error final %@\n", error);
}

@end
