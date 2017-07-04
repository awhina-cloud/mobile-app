/**
 * Bernd Wessels (https://github.com/BerndWessels/)
 *
 * Copyright © 2016 Bernd Wessels. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Import dependencies.
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Platform, StatusBar} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import GoogleSignIn from 'react-native-google-sign-in';

/**
 * Import local dependencies.
 */
import firebase from './firebase';
import reducer from './reducer';
import AppNavigator from './containers/AppNavigator/component';

/**
 * Import actions.
 */
import {
    appUserLoggedInCreator,
    appUserLoggedOutCreator,
    locationChangedCreator,
    locationErrorCreator
} from './actions';

/**
 * Turn off annoying warning bar.
 */
console.disableYellowBox = true;

/**
 * Create the redux store.
 */
const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk),
    // other store enhancers if any
));
/**
 * Initialize Google Authentication.
 */
try {
    GoogleSignIn.configure({
        clientID: '214337708418-ln8d7vji3v6k1aciiqno9a4thcjh3ucv.apps.googleusercontent.com',
        scopes: ['openid', 'email', 'profile'],
        shouldFetchBasicProfile: true,
    });
} catch (ex) {
    console.log('GoogleSignIn.configure error', ex);
}

/**
 * Style the phones status bar.
 */
StatusBar.setBarStyle('light-content');
StatusBar.setBackgroundColor('#303050');

/**
 * Export the component.
 */
export default class Root extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /*
         * Subscribe to firebase user authentication state changes.
         */
        this.unsubscribeFirebaseAuthState = firebase.auth().onAuthStateChanged(user => {
            console.log('onAuthStateChanged :', JSON.stringify(user, null, 2));
            if (user) {
                store.dispatch(appUserLoggedInCreator(user));
            } else {
                store.dispatch(appUserLoggedOutCreator());
            }
        });

        /*
         * Subscribe to location changes.
         */
        this.unsubscribeLocationWatchPosition = navigator.geolocation.watchPosition(
            position => {
                // this.setState({
                //     latitude: position.coords.latitude,
                //     longitude: position.coords.longitude,
                //     error: null,
                // });
                store.dispatch(locationChangedCreator(position));
            },
            error => {
                store.dispatch(locationErrorCreator(error));
            },
            {
                enableHighAccuracy: false,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 10
            },
        );
    }

    componentWillUnmount() {
        /*
         * Un-subscribe from firebase user authentication state changes.
         */
        if (this.unsubscribeFirebaseAuthState) {
            this.unsubscribeFirebaseAuthState();
        }

        /*
         * Un-subscribe from location changes.
         */
        if (this.unsubscribeLocationWatchPosition) {
            navigator.geolocation.clearWatch(this.unsubscribeLocationWatchPosition);
        }
    }

    render() {
        return (
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        );
    }
}
