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

/**
 * Import local dependencies.
 */
import {APP_USER_LOGGED_IN, APP_USER_LOGGED_OUT} from './actions';

/**
 * Create the initial state.
 */
const initialState = {
    user: null
};

/**
 * Create the reducer.
 */
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_USER_LOGGED_IN:
            return appUserLoggedIn(state, action.payload);
        case APP_USER_LOGGED_OUT:
            return appUserLoggedOut(state);
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
 * Export the reducer.
 */
export default reducer;
