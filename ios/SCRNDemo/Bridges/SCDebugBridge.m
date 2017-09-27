//
//  SCDebugBridge.m
//  SCRNDemo
//
//  Created by aevit on 2017/9/25.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "SCDebugBridge.h"
#import "AppDelegate.h"
#import <React/RCTRootView.h>
#import <React/RCTDevMenu.h>
#include <arpa/inet.h>
#import <React/RCTBridge+Private.h>

#define SC_DEBUG_IP_PORT   @"__SC_DEBUG_IP_PORT__"
#define EXIT_APP_TO_RELOAD  0

@implementation SCDebugBridge

RCT_EXPORT_MODULE(SCDebug)

#ifdef DEBUG
- (instancetype)init {
  if (self = [super init]) {
    [self addIpAndPortDevItem];
  }
  return self;
}

#pragma mark - public methods
+ (NSDictionary*)getIpAndPort {
  NSString *ip = @"127.0.0.1";
  NSString *port = @"8081";
  NSString *from = @"default";
  
  NSString *str = [[NSUserDefaults standardUserDefaults] objectForKey:SC_DEBUG_IP_PORT];
  if (![SCDebugBridge isEmptyString:str]) {
    // from userDefault (dev menu)
    NSArray *tmpArr = [str componentsSeparatedByString:@":"];
    ip = tmpArr.count > 0 ? tmpArr[0] : @"127.0.0.1";
    port = tmpArr.count > 1 ? tmpArr[1] : @"8081";
    from = @"menu";
  }
  return @{@"ip": ip, @"port": port, @"from": from};
}

+ (RCTBridge*)getRootBrdige {
  AppDelegate *appDelegate = (AppDelegate*)([UIApplication sharedApplication].delegate);
  RCTRootView *rootView = (RCTRootView*)appDelegate.window.rootViewController.view;
  if (![rootView isKindOfClass:[RCTRootView class]]) {
    return nil;
  }
  return rootView.bridge;
}

#pragma mark - alert delegate
- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
  if (alertView.cancelButtonIndex == buttonIndex) {
    return;
  }
  NSString *ip = [alertView textFieldAtIndex:0].text;
  NSString *port = [alertView textFieldAtIndex:1].text;
  
  if ([SCDebugBridge isEmptyString:ip] || [SCDebugBridge isEmptyString:port]) {
    // clean saved ip and port
    [SCDebugBridge removeSavedIpAndPort];
#if EXIT_APP_TO_RELOAD
    [SCDebugBridge exitApp];
#else
    [SCDebugBridge reloadApp];
#endif
    return;
  }
  
  if (![SCDebugBridge isValidIPAddress:ip]) {
    [SCDebugBridge showAlertMsg:@"invalid ip address"];
    return;
  }
  if (port.length != 4) {
    [SCDebugBridge showAlertMsg:@"the length of port must be 4"];
    return;
  }
  NSString *ipAndPortStr = [NSString stringWithFormat:@"%@:%@", ip, port];
  [[NSUserDefaults standardUserDefaults] setObject:ipAndPortStr forKey:SC_DEBUG_IP_PORT];
  [[NSUserDefaults standardUserDefaults] synchronize];
#if EXIT_APP_TO_RELOAD
  [SCDebugBridge exitApp];
#else
  [SCDebugBridge reloadApp];
#endif
}

#pragma mark - private methods
+ (void)removeSavedIpAndPort {
  [[NSUserDefaults standardUserDefaults] removeObjectForKey:SC_DEBUG_IP_PORT];
  [[NSUserDefaults standardUserDefaults] synchronize];
}

- (void)addIpAndPortDevItem {
  dispatch_async(dispatch_get_main_queue(), ^{
    RCTBridge *bridge = [SCDebugBridge getRootBrdige];
    if (!bridge) {
      return;
    }
    
    NSDictionary *ipAndPort = [SCDebugBridge getIpAndPort];
    RCTDevMenuItem *item = [RCTDevMenuItem buttonItemWithTitleBlock:^NSString *{
      return [NSString stringWithFormat:@"Debug Server Host & Port (%@)", ipAndPort[@"from"]];
    } handler:^{
      UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Tips" message:@"Input empty ip OR port and press 'Reload' will clean saved ip and port and use 127.0.0.1:8081" delegate:self cancelButtonTitle:@"Cancel" otherButtonTitles:@"Reload", nil];
      [alert setAlertViewStyle:UIAlertViewStyleLoginAndPasswordInput];
      
      UITextField *ipField = [alert textFieldAtIndex:0];
      [ipField setPlaceholder:[NSString stringWithFormat:@"(%@) current ip: %@", ipAndPort[@"from"], ipAndPort[@"ip"]]];
      [ipField setKeyboardType:UIKeyboardTypeDecimalPad];
      
      UITextField *portField = [alert textFieldAtIndex:1];
      [portField setSecureTextEntry:NO];
      [portField setText:ipAndPort[@"port"]];
      [portField setPlaceholder:[NSString stringWithFormat:@"(%@) current port: %@", ipAndPort[@"from"], ipAndPort[@"port"]]];
      [portField setKeyboardType:UIKeyboardTypeNumberPad];
      
      [alert show];
    }];
    [bridge.devMenu addItem:item];
  });
}

+ (BOOL)isValidIPAddress:(NSString*)ipStr {
  if ([SCDebugBridge isEmptyString:ipStr]) {
    return NO;
  }
  if ([ipStr isEqualToString:@"localhost"]) {
    return YES;
  }
  const char *utf8 = [ipStr UTF8String];
  int success;
  
  struct in_addr dst;
  success = inet_pton(AF_INET, utf8, &dst);
  if (success != 1) {
    struct in6_addr dst6;
    success = inet_pton(AF_INET6, utf8, &dst6);
  }
  
  return success == 1;
}

+ (BOOL)isEmptyString:(NSString*)str {
  return (!str || [str isEqual:[NSNull null]] || ![str isKindOfClass:[NSString class]] || str.length <= 0);
}

+ (void)showAlertMsg:(NSString*)msg {
  UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Oops" message:msg delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
  [alert show];
}

+ (void)reloadApp {
  NSDictionary *ipAndPort = [SCDebugBridge getIpAndPort];
  NSURL *jsCodeLocation = [NSURL URLWithString:[NSString stringWithFormat:@"http://%@:%@/index.ios.bundle?platform=ios&dev=true", ipAndPort[@"ip"], ipAndPort[@"port"]]];
  
  RCTBridge *bridge = [SCDebugBridge getRootBrdige];
  bridge.bundleURL = jsCodeLocation;
  [bridge reload];
  
  /*
  AppDelegate *appDelegate = (AppDelegate*)([UIApplication sharedApplication].delegate);
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"SCRNDemo"
                                               initialProperties:nil
                                                   launchOptions:appDelegate.launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  appDelegate.window.rootViewController.view = rootView;
   */
}

+ (void)exitApp {
  UIWindow *window = [UIApplication sharedApplication].delegate.window;
  [UIView animateWithDuration:0.3f animations:^{
    window.transform = CGAffineTransformMakeScale(1.0, 1 / [UIScreen mainScreen].bounds.size.height);
  } completion:^(BOOL finished) {
    [UIView animateWithDuration:0.5f animations:^{
      window.transform = CGAffineTransformMakeScale(1 / [UIScreen mainScreen].bounds.size.width, 1 / [UIScreen mainScreen].bounds.size.height);
    } completion:^(BOOL finished) {
      exit(1);
    }];
  }];
}
#endif

@end
