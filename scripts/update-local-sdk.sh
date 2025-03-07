#!/bin/sh
HEADER_FILE=Sources/MobilyflowSDK/MobilyflowSDK.h
SCRIPT_DIR="$( dirname -- "$0" )"

# 1. Go to SDK
cd $SCRIPT_DIR/../../mobilyflow-ios-sdk

# 2. Build header file
rm $HEADER_FILE
swiftc -emit-objc-header -emit-objc-header-path $HEADER_FILE \
  -sdk $(xcrun --show-sdk-path --sdk iphoneos) -target arm64-apple-ios15.0 \
  -framework UIKit -framework Foundation -module-name MobilyflowSDK Sources/**/*

# 2. Get podspec version
POD_VERSION=$(cat MobilyflowSDK.podspec | grep -E "s.version[^=]*=" | sed -rn "s/(.+'([0-9a-zA-Z.-]+)'.*)/\2/p")
VERSION=$(echo $POD_VERSION | sed -rn "s/(([0-9.]+)(-alpha[0-9]+)?)/\2/p")
ALPHA_VERSION=$(echo $POD_VERSION | sed -rn "s/(.+-alpha([0-9]+))/\2/p")

# 3. Update podspec version
let ALPHA_VERSION=$ALPHA_VERSION+1
sed -i '' -E "s/( *s.version *= *)'([0-9a-zA-Z.-]+)'/\1 '${VERSION}-alpha${ALPHA_VERSION}'/" MobilyflowSDK.podspec

# 4. Back to this project
cd ../mobilyflow-react-native-sdk/example
cd ios && pos install && cd ..
