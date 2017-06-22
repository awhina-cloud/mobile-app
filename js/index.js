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
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import GoogleSignIn from 'react-native-google-sign-in';

/**
 * Import local dependencies.
 */
import reducer from './reducer';
import App from './containers/App/component';

/**
 * Create the redux store.
 */
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

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
    console.log('GoogleSignIn.configure', ex);
}

/**
 * Export the component.
 */
export default class Root extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}
