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
    APP_USER_LOGGED_IN,
    APP_USER_LOGGED_OUT,
    OFFER_ADD_TO_ORDER,
    LOCATION_CHANGED,
    LOCATION_ERROR,
    APP_FETCHED_BUSINESSES,
    APP_FETCHED_ORDERS,
    ORDER_ADD_MORE_OFFERS,
    ORDER_SUBMIT,
    ORDER_CANCEL
} from './actions';

/**
 * Create the initial app state.
 */
const initialAppState = {
    user: null,
    location: null,
    businesses: [],
    orders: [],
    order: null
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
        case OFFER_ADD_TO_ORDER:
            return offerAddToOrder(state, payload);
        case ORDER_SUBMIT:
            return orderSubmit(state, payload);
        case ORDER_CANCEL:
            return orderCancel(state);
        case LOCATION_CHANGED:
            return locationChanged(state, payload);
        case LOCATION_ERROR:
            return locationError(state, payload);
        case APP_FETCHED_BUSINESSES:
            return appFetchedBusinesses(state, payload);
        case APP_FETCHED_ORDERS:
            return appFetchedOrders(state, payload);
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
function offerAddToOrder(state, {business, offer}) {
    return R.evolve({
        order: (o) => {
            if (!o) {
                return {
                    business,
                    offers: [offer]
                }
            } else {
                return R.assoc('offers', R.append(offer, o.offers), o);
            }
        }
    }, state);
}

/**
 * Cancel the current order.
 */
function orderSubmit(state) {
    return R.assoc('order', null, state);
}

/**
 * Cancel the current order.
 */
function orderCancel(state) {
    return R.assoc('order', null, state);
}

/**
 * Location has changed action handler.
 */
function locationChanged(state, location) {
    // Update location and sort businesses by distance.
    return R.evolve({
        businesses: R.compose(
            R.sort((a, b) => {
                return a.distance - b.distance;
            }),
            R.map(x => R.assoc('distance', haversine(x, location.coords, {unit: 'meter'}), x))
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
 * Fetched businesses action handler.
 */
function appFetchedBusinesses(state, businesses) {
    // Transform firebase objects to arrays.
    return R.assoc('businesses', objectsToArrays({
        businesses: {
            offers: {
                variations: true,
                extras: true
            }
        }
    }, {
        businesses
    }).businesses, state);
}

/**
 * Fetched orders action handler.
 */
function appFetchedOrders(state, orders) {
    // Transform firebase objects to arrays.
    return R.assoc('orders', objectsToArrays({
        orders: true
    }, {
        orders
    }).orders, state);
}

/**
 * Create the initial navigation state.
 */
const initialNavState = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams('Businesses')
);

/**
 * Create the route reducer.
 */
const navReducer = (state = initialNavState, action) => {
    let {type, payload} = action;
    switch (type) {
        case APP_USER_LOGGED_IN:
            return navUserLoggedIn(state, payload);
        case OFFER_ADD_TO_ORDER:
            return navOfferAddToOrder(state, payload);
        case ORDER_ADD_MORE_OFFERS:
            return navOrderAddMoreOffers(state, payload);
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
function navUserLoggedIn(state, user) {
    // If we are on the login screen, redirect to the home screen.
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
function navOfferAddToOrder(state, params) {
    let pathAndParams = AppNavigator.router.getPathAndParamsForState(state);
    if (pathAndParams.path === 'Offer') {
        let businessesOffersState = AppNavigator.router.getStateForAction(
            NavigationActions.back(),
            state
        );
        let businessesOffersPathAndParams = AppNavigator.router.getPathAndParamsForState(businessesOffersState);
        let nextState = AppNavigator.router.getStateForAction(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Order', params}),
                //NavigationActions.navigate({routeName: 'Offers', params: businessesOffersPathAndParams.params})
            ]
        }));
        return nextState;
    }
    return state;
}

/**
 * User added an offer to the order.
 */
function navOrderAddMoreOffers(state, business) {
    let pathAndParams = AppNavigator.router.getPathAndParamsForState(state);
    if (pathAndParams.path === 'Order') {
        let nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate({
            routeName: 'Offers',
            params: {business}
        }), state);
        return nextState;
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
            routeName: 'Businesses'
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
            routeName: 'Businesses'
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
