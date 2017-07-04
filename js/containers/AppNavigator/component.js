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
import React from 'react';
import {connect} from 'react-redux';
import {addNavigationHelpers, StackNavigator} from 'react-navigation';

/**
 * Import local dependencies.
 */
import LoginScreen from '../LoginScreen/component';
import HomeScreen from '../HomeScreen/component';
import BusinessesScreen from '../BusinessesScreen/component';

/**
 * Export the app navigator.
 */
export const AppNavigator = StackNavigator({
    Login: {screen: LoginScreen},
    Home: {screen: HomeScreen, title: 'Home'},
    Businesses: {screen: BusinessesScreen, title: 'Businesses'}
});

/**
 * Create the connected app navigator.
 */
const AppWithNavigationState = ({dispatch, nav}) => (
    <AppNavigator navigation={addNavigationHelpers({dispatch, state: nav})}/>
);

/**
 * Map the navigation state to the navigator props.
 */
const mapStateToProps = state => ({
    nav: state.nav
});

/**
 * Export the connected app navigator.
 */
export default connect(mapStateToProps)(AppWithNavigationState);
