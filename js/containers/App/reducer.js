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

/**
 * Import actions.
 */
import {APP_USER_LOGGED_IN, APP_USER_LOGGED_OUT, APP_FETCH_POSTS} from './actions';

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
    console.log('--- ' + action.type + ' ---');
    let {type, payload} = action;
    switch (type) {
        case APP_USER_LOGGED_IN:
            return appUserLoggedIn(state, payload);
        case APP_USER_LOGGED_OUT:
            return appUserLoggedOut(state);
        case APP_FETCH_POSTS:
            return appFetchPosts(state, payload);
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
 * User logged out action handler.
 */
function appFetchPosts(state, posts) {
    console.log('POOOOOOOOOOSTS', posts);
    return state;
}

/**
 * Export the reducer.
 */
export default reducer;
