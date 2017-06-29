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
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

/**
 * Import local dependencies.
 */
import styles from './styles';
import FacebookLoginButton from '../../components/FacebookLoginButton';
import GoogleLoginButton from '../../components/GoogleLoginButton';

/**
 * Import actions.
 */
import {appUserLogoutCreator, appUserLoginFacebookCreator, appUserLoginGoogleCreator} from '../../actions';

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
                <FBLogin
                    buttonView={<FacebookLoginButton />}
                    loginBehavior={FBLoginManager.LoginBehaviors.Native}
                    permissions={["email"]}
                    onLogin={e => onUserLoginFacebook(e.credentials.token)}
                />
                <GoogleLoginButton login={() => onUserLoginGoogle()}/>
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
        onUserLoginFacebook: (token) => dispatch(appUserLoginFacebookCreator(token)),
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
