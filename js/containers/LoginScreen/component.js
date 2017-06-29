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
import {StyleSheet, Text, View, TouchableHighlight, Button} from 'react-native';
import {connect} from 'react-redux';

/**
 * Import local dependencies.
 */
import styles from './styles';

/**
 * Import actions.
 */
import {appUserLoginFacebookCreator, appUserLoginGoogleCreator} from '../../actions';

/**
 * Create the container.
 */
class LoginScreen extends Component {

    static navigationOptions = {
        title: 'Login' // https://github.com/react-community/react-navigation/issues/293
    };

    render() {
        let {onUserLoginFacebook, onUserLoginGoogle} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{`Please login to proceed`}</Text>
                <View style={styles.facebook}>
                    <Button onPress={() => onUserLoginFacebook()} color="#3b5998" title="Login with Facebook"/>
                </View>
                <View style={styles.google}>
                    <Button onPress={() => onUserLoginGoogle()} color="#dd4b39" title="Login with Google"/>
                </View>
            </View>
        );
    }
}

/**
 * Map state to component properties.
 */
const mapStateToProps = ({app}) => {
    return {}
};

/**
 * Map actions to component properties.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onUserLoginFacebook: () => dispatch(appUserLoginFacebookCreator()),
        onUserLoginGoogle: () => dispatch(appUserLoginGoogleCreator())
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
)(LoginScreen);
