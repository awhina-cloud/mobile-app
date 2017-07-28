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
import R from 'ramda';

/**
 * Import local dependencies.
 */
import firebase from './firebase';

/**
 * Export action types.
 */
export const HARDWARE_BACK_PRESS = 'HARDWARE_BACK_PRESS';

export const APP_USER_LOGGED_IN = 'APP_USER_LOGGED_IN';
export const APP_USER_LOGGED_OUT = 'APP_USER_LOGGED_OUT';

export const LOCATION_CHANGED = 'LOCATION_CHANGED';
export const LOCATION_ERROR = 'LOCATION_ERROR';

export const APP_FETCHED_DEALS = 'APP_FETCHED_DEALS';
export const APP_FETCHED_BUYER = 'APP_FETCHED_BUYER';

export const OFFER_ADD_TO_ORDER_AND_MORE = 'OFFER_ADD_TO_ORDER_AND_MORE';
export const OFFER_ADD_TO_ORDER_AND_DONE = 'OFFER_ADD_TO_ORDER_AND_DONE';

export const ORDER_SUBMIT = 'ORDER_SUBMIT';
export const ORDER_CANCEL = 'ORDER_CANCEL';

/**
 * The Android hardware back button has been pressed.
 */
export const hardwareBackPressCreator = () => ({type: HARDWARE_BACK_PRESS});

/**
 * User has logged in action.
 */
export const appUserLoggedInCreator = (user) => {
    return dispatch => {
        if (!user.isAnonymous) {
            firebase.database().ref(`buyers/${user.uid}`).update({
                id: user.uid,
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            });
        }
        firebase.database().ref(`deals`).on('value', (snapshot) => {
            dispatch({type: APP_FETCHED_DEALS, payload: snapshot.val()});
        });
        firebase.database().ref(`buyers/${user.uid}`).on('value', (snapshot) => {
            dispatch({type: APP_FETCHED_BUYER, payload: snapshot.val()});
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
                    const firebaseUser = firebase.auth().signInWithCredential(credential).catch(ex => {
                        dispatch({type: 'ERROR', payload: JSON.stringify(ex, null, 2)});
                        console.log('signInWithCredential', ex);
                    });
                    if (firebaseUser === 'cancelled') {
                        dispatch({type: 'ERROR', payload: `firebaseUser === 'cancelled'`});
                        console.log('firebaseAuthFacebookLogin: Login cancelled');
                    } else {
                        console.log('firebaseAuthFacebookLogin: ' + JSON.stringify(firebaseUser));
                    }
                } else {
                    dispatch({type: 'ERROR', payload: JSON.stringify(error, null, 2)});
                    console.log("firebaseAuthFacebookLogin Error: ", error);
                }
            })
        } catch (ex) {
            dispatch({type: 'ERROR', payload: JSON.stringify(ex, null, 2)});
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
                    const firebaseUser = firebase.auth().signInWithCredential(credential).catch(ex => {
                        dispatch({type: 'ERROR', payload: JSON.stringify(ex, null, 2)});
                        console.log('signInWithCredential', ex);
                    });
                    if (firebaseUser === 'cancelled') {
                        dispatch({type: 'ERROR', payload: `firebaseUser === 'cancelled'`});
                        console.log('firebaseAuthGoogleLogin: Login cancelled');
                    } else {
                        console.log('firebaseAuthGoogleLogin: ' + JSON.stringify(firebaseUser));
                    }
                }).catch(ex => {
                dispatch({type: 'ERROR', payload: JSON.stringify(ex, null, 2)});
                console.log('google signin error', ex);
            });
        } catch (ex) {
            dispatch({type: 'ERROR', payload: JSON.stringify(ex, null, 2)});
            console.log('firebaseAuthGoogleLogin', ex);
        }
    };
};

/**
 * User is adding an offer to the current order and wants to add more.
 */
export const offerAddToOrderAndMoreCreator = (payload) => ({type: OFFER_ADD_TO_ORDER_AND_MORE, payload});

/**
 * User is adding an offer to the current order and is done.
 */
export const offerAddToOrderAndDoneCreator = (payload) => ({type: OFFER_ADD_TO_ORDER_AND_DONE, payload});

/**
 * User wants to submit the current order.
 */
export const orderSubmitCreator = ({buyer, order}) => {
    return dispatch => {
        // Submit the new order.
        firebase.database().ref(`/commands/${firebase.auth().currentUser.uid}`).push({
            command: 'submitOrder',
            order: order,
            buyer: buyer
        }).then(() => {
            dispatch({type: ORDER_SUBMIT, payload: {buyer, order}});
        }).catch(ex => console.log(ex));
        // TODO .catch ORDER_SUBMIT_FAILED
    };
};

/**
 * User is canceling the current order.
 */
export const orderCancelCreator = (payload) => ({type: ORDER_CANCEL, payload});
