# Features

- Firebase offline capabilities
- Firebase realtime database with redux integration
- Firebase anonymous default user support (use app before logging in, like Trademe app)
- Facebook login
- Google login
- Geolocation support
- Latest react-native
- Clean application structure with redux best practices.

# Development

# Prerequisites

- node.js >=6
- npm >=4
- yarn >=0.21

Follow the [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) guide under the `Building Projects with Native Code` section.

# Setup

## Firebase

Taken from [this repo](https://github.com/invertase/react-native-firebase).

## Google Sign-In

Follow [this guide](https://developers.google.com/identity/sign-in/android/start-integrating).

Use the `GET A CONFIGURATION FILE` to get the `google-services.json` file and copy it to `android/app/google-services.json`.

## Facebook Sign-In

Follow [this guide](https://github.com/magus/react-native-facebook-login#setup).

# Getting started

## Dependencies

Run `yarn install` to install all dependencies.

## Android

The `npm postinstall` script should run automatically after the `yarn install` command.
This will modify the `Build Tool Version` and the `Google Play Services Version` of the native libraries to make the build work.

## Emulator Compatibility

If you use an Android Emulator make sure it has `Google Play Services` installed.

## Start Development

Run `react-native run-android`.

Sometimes on Windows the build breaks because it can't create or delete folders.
In this case simply re-run `react-native run-android` until it succeeds.
If that doesn't work manually delete the folders the build process is complaining about
and re-run `react-native run-android`.
