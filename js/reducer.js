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

/**
 * Import local dependencies.
 */
import {AppNavigator} from './containers/AppNavigator/component';

/**
 * Import actions.
 */
import {
    APP_USER_LOGGED_IN,
    APP_USER_LOGGED_OUT,
    LOCATION_CHANGED,
    LOCATION_ERROR,
    APP_FETCHED_BUSINESSES
} from './actions';

/**
 * Create the initial app state.
 */
const initialAppState = {
    user: null,
    location: null
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
        case LOCATION_CHANGED:
            return locationChanged(state, payload);
        case LOCATION_ERROR:
            return locationError(state, payload);
        case APP_FETCHED_BUSINESSES:
            return appFetchedBusinesses(state, payload);
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
 * Location has changed action handler.
 */
function locationChanged(state, location) {
    return Object.assign({}, state, {location: location});
}

/**
 * Location raised an error action handler.
 */
function locationError(state, error) {
    console.log('locationError', error);
    return state;
}

/**
 * User logged out action handler.
 */
function appUserLoggedOut(state) {
    return Object.assign({}, state, {user: null});
}

/**
 * User logged out action handler.
 */
function appFetchedBusinesses(state, businesses) {
    console.log('BUSINESSES', businesses);
    return state;
}

/**
 * Create the initial navigation state.
 */
const initialNavState = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams('Home')
);

/**
 * Create the route reducer.
 */
const navReducer = (state = initialNavState, action) => {
    let {type, payload} = action;
    switch (type) {
        case APP_USER_LOGGED_IN:
            return navUserLoggedIn(state, payload);
    }
    // Simply return the original `state` if `nextState` is null or undefined.
    return AppNavigator.router.getStateForAction(action, state) || state;
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
