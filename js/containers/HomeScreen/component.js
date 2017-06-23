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
import FacebookLoginButton from '../../components/FacebookLoginButton';
import GoogleLoginButton from '../../components/GoogleLoginButton';

/**
 * Import actions.
 */
import {appUserLogoutCreator, appUserLoginFacebookCreator, appUserLoginGoogleCreator} from '../App/actions';

/**
 * Create the container.
 */
class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let {onUserLogout, onUserLoginFacebook, onUserLoginGoogle, user} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{`Home`}</Text>
                <TouchableHighlight
                    onPress={() => {
                        onUserLogout();
                    }}>
                    <Text style={{margin: 10}}>{`Logout`}</Text>
                </TouchableHighlight>
                <FBLogin
                    buttonView={<FacebookLoginButton />}
                    loginBehavior={FBLoginManager.LoginBehaviors.Native}
                    permissions={["email"]}
                    onLogin={e => onUserLoginFacebook(e.credentials.token)}
                />
                <GoogleLoginButton login={() => onUserLoginGoogle()}/>
                <Text>{JSON.stringify(user, null, 2)}</Text>
            </View>
        );
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
        onUserLogout: () => dispatch(appUserLogoutCreator()),
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
)(HomeScreen);

/**
 * TODO move styles to styles.js
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00ff00',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});