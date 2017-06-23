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
import {FBLoginManager} from 'react-native-facebook-login';
import GoogleSignIn from 'react-native-google-sign-in';

/**
 * Import local dependencies.
 */
import firebase from '../../firebase';

/**
 * Export action types.
 */
export const APP_USER_LOGGED_IN = 'APP_USER_LOGGED_IN';
export const APP_USER_LOGGED_OUT = 'APP_USER_LOGGED_OUT';

export const APP_FETCH_POSTS = 'APP_FETCH_POSTS';

/**
 * Export action creators.
 */
export const appUserLoggedInCreator = (user) => {
    return dispatch => {
        firebase.database().ref(`users/${user.uid}/posts`).on('value', (snapshot) => {
            dispatch({type: APP_FETCH_POSTS, payload: snapshot.val()});
        });
        dispatch({type: APP_USER_LOGGED_IN, payload: user});
    };
};
export const appUserLoggedOutCreator = () => {
    return dispatch => {
        // TODO cleanup with database off
        dispatch({type: APP_USER_LOGGED_OUT});
        firebase.auth().signInAnonymously();
    };
};
export const appUserLogoutCreator = () => {
    return dispatch => {
        let user = firebase.auth().currentUser;
        let providers = user.providerData.reduce((acc, value) => {
            acc[`${value.providerId}`] = true;
            return acc;
        }, {});
        if (providers.hasOwnProperty('facebook.com')) {
            try {
                FBLoginManager.logout((err, data) => {
                    console.log('facebook logout', err, data);
                    if (!err) {
                        // This will result in the APP_USER_LOGGED_OUT action to be dispatched.
                        firebase.auth().signOut();
                    }
                });
            } catch (ex) {
                console.log('facebook logout error', ex);
            }
        }
        if (providers.hasOwnProperty('google.com')) {
            GoogleSignIn.signOutPromise()
                .then(() => {
                    // This will result in the APP_USER_LOGGED_OUT action to be dispatched.
                    firebase.auth().signOut();
                })
                .catch(ex => {
                    console.log('google logout error', ex);
                })
        }
    };
};
export const appUserLoginFacebookCreator = (token) => {
    return dispatch => {
        try {
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            const user = firebase.auth().signInWithCredential(credential);
            if (user === 'cancelled') {
                console.log('firebaseAuthFacebookLogin: Login cancelled');
            } else {
                console.log('firebaseAuthFacebookLogin: ' + JSON.stringify(user));
            }
        } catch (ex) {
            console.log('firebaseAuthFacebookLogin', ex);
        }
    };
};
export const appUserLoginGoogleCreator = () => {
    return dispatch => {
        try {
            GoogleSignIn.signInPromise()
                .then(googleUser => {
                    const credential = firebase.auth.GoogleAuthProvider.credential(googleUser.idToken, googleUser.accessToken);
                    const firebaseUser = firebase.auth().signInWithCredential(credential);
                    if (firebaseUser === 'cancelled') {
                        console.log('firebaseAuthGoogleLogin: Login cancelled');
                    } else {
                        console.log('firebaseAuthGoogleLogin: ' + JSON.stringify(user));
                    }
                }).catch(ex => console.log('google signin error', ex));
        } catch (ex) {
            console.log('firebaseAuthGoogleLogin', ex);
        }
    };
};
