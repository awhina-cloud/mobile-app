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
export const APP_USER_LOGGED_IN = 'APP_USER_LOGGED_IN';
export const APP_USER_LOGGED_OUT = 'APP_USER_LOGGED_OUT';

export const LOCATION_CHANGED = 'LOCATION_CHANGED';
export const LOCATION_ERROR = 'LOCATION_ERROR';

export const APP_FETCHED_DEALS = 'APP_FETCHED_DEALS';
export const APP_FETCHED_BUYER = 'APP_FETCHED_BUYER';

export const OFFER_ADD_TO_ORDER = 'OFFER_ADD_TO_ORDER';

export const ORDER_ADD_MORE_OFFERS = 'ORDER_ADD_MORE_OFFERS';
export const ORDER_SUBMIT = 'ORDER_SUBMIT';
export const ORDER_CANCEL = 'ORDER_CANCEL';

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
export const offerAddToOrderCreator = (payload) => ({type: OFFER_ADD_TO_ORDER, payload});

/**
 * User wants to add more offers to the current order.
 */
export const orderAddMoreOffersCreator = (payload) => ({type: ORDER_ADD_MORE_OFFERS, payload});

/**
 * User wants to submit the current order.
 */
export const orderSubmitCreator = ({buyer, order}) => {
    return dispatch => {
        let buyerId = buyer.id;
        let sellerId = order.deal.seller.id;
        let orderId = firebase.database().ref().push().key;
        firebase.database().ref().update({
            [`/buyers/${buyerId}/orders/${orderId}`]: {
                items: order.items,
                seller: R.pick(['id', 'name', 'address', 'latitude', 'longitude'], order.deal.seller)
            },
            [`/sellers/${sellerId}/orders/${orderId}`]: {
                items: order.items,
                buyer: R.pick(['id', 'name', 'email', 'photo'], buyer)
            }
        }).then(() => {
            dispatch({type: ORDER_SUBMIT, payload: {buyer, order}});
        });
    };
};

/**
 * User is canceling the current order.
 */
export const orderCancelCreator = () => ({type: ORDER_CANCEL});
