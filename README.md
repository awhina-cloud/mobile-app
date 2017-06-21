# Development

# Prerequisites

- node.js >=6
- npm >=4
- yarn >=0.21

Follow the [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) guide under the `Building Projects with Native Code` section.

# Setup

## Authentication

Taken from [this repo](https://github.com/SolidStateGroup/react-native-firebase-auth).

## Google Sign-In

Follow [this guide](https://developers.google.com/identity/sign-in/android/start-integrating).

Use the `GET A CONFIGURATION FILE` to get the `google-services.json` file and copy it to `android/app/google-services.json`.

## Facebook Sign-In

Follow [this guide](https://github.com/magus/react-native-facebook-login#setup).

# Getting started

## Dependencies

Run `yarn install` to install all dependencies.

## Google Play Services Version

- In `android/app/build.gradle` make sure there is

  `compile "com.google.android.gms:play-services-auth:10.0.1"`

- Update `node_modules/react-native-google-sign-in/android/build.gradle` to match the same version
 
  `compile "com.google.android.gms:play-services-auth:10.0.1"`
  
## Android Build Tools Version

Make sure that the following files all use the correct `buildToolsVersion '25.0.0'`

- `android/app/build.gradle`
- `node_modules/react-native-facebook-login/android/build.gradle`
- `node_modules/react-native-google-sign-in/android/build.gradle`

## Emulator Compatibility

If you use an Android Emulator make sure it has `Google Play Services` installed.

## Start Development

Run `react-native run-android`.

Sometimes on Windows the build breaks because it can't create or delete folders.
In this case simply re-run `react-native run-android` until it succeeds.
If that doesn't work manually delete the folders the build process is complaining about
and re-run `react-native run-android`.
