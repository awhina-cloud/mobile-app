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
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

/**
 * Import local dependencies.
 */
import styles from './styles';

/**
 * Import actions.
 */
import {appUserLogoutCreator} from '../../actions';

/**
 * Create the container.
 */
class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Home',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#303050' },
    };

    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        };
    }

    render() {
        let {onUserLogout, onNavigateToLoginScreen, user, location} = this.props;
        let {latitude, longitude, error} = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{`Home`}</Text>
                <Text style={styles.welcome}>{JSON.stringify(location, null, 2)} -</Text>
                {
                    user && !user.isAnonymous &&
                    <TouchableHighlight
                        onPress={() => {
                            onUserLogout();
                        }}>
                        <Text style={styles.welcome}>{`Logout`}</Text>
                    </TouchableHighlight>
                }
                {
                    user && user.isAnonymous &&
                    <TouchableHighlight onPress={() => {
                        onNavigateToLoginScreen();
                    }}>
                        <Text style={styles.welcome}>Go to Login page</Text>
                    </TouchableHighlight>
                }
                <Text style={styles.welcome}>{JSON.stringify(user, null, 2)}</Text>
            </View>
        );
    }
}

/**
 * Map state to component properties.
 */
const mapStateToProps = ({app}) => {
    return {
        user: app.user,
        location: app.location
    }
};

/**
 * Map actions to component properties.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onUserLogout: () => dispatch(appUserLogoutCreator()),
        onNavigateToLoginScreen: () => dispatch(NavigationActions.navigate({routeName: 'Login'}))
    }
};

/**
 * Export the container component.
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null, {
        pure: false // https://github.com/reactjs/react-redux/blob/master/docs/troubleshooting.md
    }
)(HomeScreen);
