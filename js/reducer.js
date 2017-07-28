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
import {BackHandler} from 'react-native';
import {combineReducers} from 'redux';
import {NavigationActions} from 'react-navigation';
import R from 'ramda';

/**
 * Import local dependencies.
 */
import firebase from './firebase';
import {AppNavigator} from './containers/AppNavigator/component';
import {objectsToArrays, haversine} from './selectors';

/**
 * Import actions.
 */
import {
    HARDWARE_BACK_PRESS,
    APP_USER_LOGGED_IN,
    APP_USER_LOGGED_OUT,
    OFFER_ADD_TO_ORDER_AND_MORE,
    OFFER_ADD_TO_ORDER_AND_DONE,
    LOCATION_CHANGED,
    LOCATION_ERROR,
    APP_FETCHED_DEALS,
    APP_FETCHED_BUYER,
    ORDER_SUBMIT,
    ORDER_CANCEL
} from './actions';

/**
 * Create the initial app state.
 */
const initialAppState = {
    user: null,
    location: null,
    deals: [],
    buyer: null,
    orders: {}, // these are drafts basically, max one per deal
    error: null
};

/**
 * Create the reducer.
 */
const appReducer = (state = initialAppState, action) => {
    let {type, payload} = action;
    switch (type) {
        case APP_USER_LOGGED_IN:
            return appUserLoggedIn(state, payload);
        case APP_USER_LOGGED_OUT:
            return appUserLoggedOut(state);
        case OFFER_ADD_TO_ORDER_AND_MORE:
            return offerAddToOrder(state, payload);
        case OFFER_ADD_TO_ORDER_AND_DONE:
            return offerAddToOrder(state, payload);
        case ORDER_SUBMIT:
            return orderSubmit(state, payload);
        case ORDER_CANCEL:
            return orderCancel(state, payload);
        case LOCATION_CHANGED:
            return locationChanged(state, payload);
        case LOCATION_ERROR:
            return locationError(state, payload);
        case APP_FETCHED_DEALS:
            return appFetchedDeals(state, payload);
        case APP_FETCHED_BUYER:
            return appFetchedBuyer(state, payload);
        case 'ERROR':
            return R.assoc('error', payload, state);
        default:
            return state;
    }
};

/**
 * User logged in action handler.
 */
function appUserLoggedIn(state, user) {
    return Object.assign({}, state, {user});
}

/**
 * User logged out action handler.
 */
function appUserLoggedOut(state) {
    return Object.assign({}, state, {user: null});
}

/**
 * Add an offer to the current order.
 */
function offerAddToOrder(state, {deal, item}) {
    let newState = state;
    if (!newState.orders.hasOwnProperty(deal.id)) {
        newState = R.assocPath(['orders', deal.id], {deal, items: []}, state);
    }
    return R.evolve({
        orders: {
            [`${deal.id}`]: o => R.assoc('items', R.append(item, o.items), o)
        }
    }, newState);
}

/**
 * Submit the current order.
 */
function orderSubmit(state, {buyer, order}) {
    // Order has been submitted, so remove the draft.
    return R.assoc('orders', R.omit([order.deal.id], state.order), state);
}

/**
 * Cancel the current order.
 */
function orderCancel(state, {buyer, order}) {
    // Order has been cancelled, so remove the draft.
    return R.assoc('orders', R.omit([order.deal.id], state.order), state);
}

/**
 * Location has changed action handler.
 */
function locationChanged(state, location) {
    // Update location and sort deals by distance.
    return R.evolve({
        deals: R.compose(
            R.sort((a, b) => {
                return a.distance - b.distance;
            }),
            R.map(x => R.assoc('distance', haversine(x.seller, location.coords, {unit: 'meter'}), x))
        ),
        location: () => location
    }, state);
}

/**
 * Location raised an error action handler.
 */
function locationError(state, error) {
    console.log('locationError', error);
    return state;
}

/**
 * Fetched deals action handler.
 */
function appFetchedDeals(state, deals) {
    // Transform firebase objects to arrays.
    return R.assoc('deals', objectsToArrays({
        deals: {
            offers: {
                variations: true,
                extras: true
            }
        }
    }, {
        deals
    }).deals, state);
}

/**
 * Fetched buyer action handler.
 */
function appFetchedBuyer(state, buyer) {
    return R.assoc('buyer', objectsToArrays({
        orders: true
    }, buyer), state);
}

/**
 * Create the initial navigation state.
 */
const initialNavState = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams('Deals')
);

/**
 * Create the route reducer.
 */
const navReducer = (state = initialNavState, action) => {
    let {type, payload} = action;
    switch (type) {
        case HARDWARE_BACK_PRESS:
            return navHardwareBackPress(state);
        case APP_USER_LOGGED_IN:
            return navUserLoggedIn(state, payload);
        case OFFER_ADD_TO_ORDER_AND_MORE:
            return navOfferAddToOrderAndMore(state, payload);
        case OFFER_ADD_TO_ORDER_AND_DONE:
            return navOfferAddToOrderAndDone(state, payload);
        case ORDER_SUBMIT:
            return navOrderSubmit(state, payload);
        case ORDER_CANCEL:
            return navOrderCancel(state);
    }
    // State based routing logic.
    const nextState = AppNavigator.router.getStateForAction(action, state);
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};

/**
 * User logged in action handler.
 */
function navHardwareBackPress(state) {
    // If we are on the not on the deals screen navigate back to the previous screen.
    if (AppNavigator.router.getPathAndParamsForState(state).path !== 'Deals') {
        return AppNavigator.router.getStateForAction(
            NavigationActions.back(),
            state
        );
    } else {
        BackHandler.exitApp();
        return state;
    }
}

/**
 * User logged in action handler.
 */
function navUserLoggedIn(state, user) {
    // If we are on the login screen navigate back to the previous screen.
    if (AppNavigator.router.getPathAndParamsForState(state).path === 'Login') {
        return AppNavigator.router.getStateForAction(
            NavigationActions.back(),
            state
        );
    } else {
        return state;
    }
}

/**
 * User added an offer to the order.
 */
function navOfferAddToOrderAndMore(state, params) {
    // If we are on the login screen navigate back to the previous screen.
    if (AppNavigator.router.getPathAndParamsForState(state).path === 'Offer') {
        return AppNavigator.router.getStateForAction(
            NavigationActions.back(),
            state
        );
    } else {
        return state;
    }
}

/**
 * User added an offer to the order.
 */
function navOfferAddToOrderAndDone(state, params) {
    let pathAndParams = AppNavigator.router.getPathAndParamsForState(state);
    if (pathAndParams.path === 'Offer') {
        // To allow a nice back button flow we first go back to the offers screen.
        let dealsOffersState = AppNavigator.router.getStateForAction(
            NavigationActions.back(),
            state
        );
        // And then navigate to the order screen.
        return AppNavigator.router.getStateForAction(
            NavigationActions.navigate({routeName: 'Order', params}),
            dealsOffersState
        );
    }
    return state;
}

/**
 * User submitted the current order.
 */
function navOrderSubmit(state, {user, order}) {
    let pathAndParams = AppNavigator.router.getPathAndParamsForState(state);
    if (pathAndParams.path === 'Order') {
        let nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
            routeName: 'Deals'
        }));
        return nextState;
    }
    return state;
}

/**
 * User cancelled the current order.
 */
function navOrderCancel(state) {
    let pathAndParams = AppNavigator.router.getPathAndParamsForState(state);
    if (pathAndParams.path === 'Order') {
        let nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
            routeName: 'Deals'
        }));
        return nextState;
    }
    return state;
}

/**
 * Collect all reducers.
 */
const reducers = {
    app: appReducer,
    nav: navReducer
};

/**
 * Export the root reducer.
 */
export default combineReducers(reducers);
