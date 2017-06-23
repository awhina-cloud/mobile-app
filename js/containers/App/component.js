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
import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';

/**
 * Import local dependencies.
 */
import firebase from '../../firebase';

/**
 * Import actions.
 */
import {appUserLoggedInCreator, appUserLoggedOutCreator} from './actions';
import HomeScreen from '../HomeScreen/component';
import LoadingScreen from "../LoadingScreen/component";

/**
 * Create the container.
 */
class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.unsubscribeFirebaseAuthState = firebase.auth().onAuthStateChanged(user => {
            console.log('-------------------- onAuthStateChanged :', JSON.stringify(user, null, 2));
            if (user) {
                this.props.onUserLoggedIn(user);
            } else {
                this.props.onUserLoggedOut();
            }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribeFirebaseAuthState) {
            this.unsubscribeFirebaseAuthState();
        }
    }

    render() {
        let {user} = this.props;
        console.log('render', user);
        if (user) {
            return <HomeScreen/>
        } else {
            return <LoadingScreen/>
        }
    }
}

/**
 * Map state to component properties.
 */
const mapStateToProps = ({app}) => {
    return {
        user: app.user
    }
};

/**
 * Map actions to component properties.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onUserLoggedIn: (user) => dispatch(appUserLoggedInCreator(user)),
        onUserLoggedOut: () => dispatch(appUserLoggedOutCreator())
    }
};

/**
 * Export the container component.
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null, {
        pure: false
    }
)(App);
