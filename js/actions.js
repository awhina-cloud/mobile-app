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
import {NavigationActions} from 'react-navigation';
import {FBLoginManager} from 'react-native-facebook-login';
import GoogleSignIn from 'react-native-google-sign-in';

/**
 * Import local dependencies.
 */
import firebase from './firebase';

/**
 * Export action types.
 */
export const APP_USER_LOGGED_IN = 'APP_USER_LOGGED_IN';
export const APP_USER_LOGGED_OUT = 'APP_USER_LOGGED_OUT';

export const LOCATION_CHANGED = 'LOCATION_CHANGED';
export const LOCATION_ERROR = 'LOCATION_ERROR';

export const APP_FETCHED_BUSINESSES = 'APP_FETCH_BUSINESSES';
export const APP_FETCHED_ORDERS = 'APP_FETCHED_ORDERS';

export const OFFER_ADD_TO_ORDER = 'OFFER_ADD_TO_ORDER';

/**
 * User has logged in action.
 */
export const appUserLoggedInCreator = (user) => {
    return dispatch => {
        firebase.database().ref(`businesses`).on('value', (snapshot) => {
            dispatch({type: APP_FETCHED_BUSINESSES, payload: snapshot.val()});
        });
        firebase.database().ref(`user/${user.uid}/orders`).on('value', (snapshot) => {
            dispatch({type: APP_FETCHED_ORDERS, payload: snapshot.val()});
        });
        dispatch({type: APP_USER_LOGGED_IN, payload: user});
    };
};

/**
 * User has logged out action.
 */
export const appUserLoggedOutCreator = () => {
    return dispatch => {
        // TODO cleanup with database off
        dispatch({type: APP_USER_LOGGED_OUT});
        firebase.auth().signInAnonymously();
    };
};

/**
 * The location has changed action.
 */
export const locationChangedCreator = (payload) => ({type: LOCATION_CHANGED, payload});

/**
 * The location raised an error action.
 */
export const locationErrorCreator = (payload) => ({type: LOCATION_ERROR, payload});

/**
 * Logout the current user action.
 */
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

/**
 * Login with facebook action.
 */
export const appUserLoginFacebookCreator = () => {
    return dispatch => {
        try {
            FBLoginManager.loginWithPermissions(["email"], function (error, data) {
                if (!error) {
                    const credential = firebase.auth.FacebookAuthProvider.credential(data.credentials.token);
                    const firebaseUser = firebase.auth().signInWithCredential(credential);
                    if (firebaseUser === 'cancelled') {
                        console.log('firebaseAuthFacebookLogin: Login cancelled');
                    } else {
                        console.log('firebaseAuthFacebookLogin: ' + JSON.stringify(firebaseUser));
                    }
                } else {
                    console.log("firebaseAuthFacebookLogin Error: ", error);
                }
            })
        } catch (ex) {
            console.log('firebaseAuthFacebookLogin', ex);
        }
    };
};

/**
 * Login with google action.
 */
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
                        console.log('firebaseAuthGoogleLogin: ' + JSON.stringify(firebaseUser));
                    }
                }).catch(ex => console.log('google signin error', ex));
        } catch (ex) {
            console.log('firebaseAuthGoogleLogin', ex);
        }
    };
};

/**
 * User is adding an offer to the current order.
 */
export const offerAddToOrderCreator = (payload) => {
    return dispatch => {
        dispatch({type: OFFER_ADD_TO_ORDER, payload});
        dispatch(NavigationActions.back());
    };
};
