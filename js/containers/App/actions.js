/**
 * Bernd Wessels (https://github.com/BerndWessels/)
 *
 * Copyright © 2016 Bernd Wessels. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Export action types.
 */
export const APP_USER_LOGGED_IN = 'APP_USER_LOGGED_IN';
export const APP_USER_LOGGED_OUT = 'APP_USER_LOGGED_OUT';

/**
 * Export action creators.
 */
export const appUserLoggedInCreator = (payload) => ({type: APP_USER_LOGGED_IN, payload});
export const appUserLoggedOutCreator = () => ({type: APP_USER_LOGGED_OUT});
