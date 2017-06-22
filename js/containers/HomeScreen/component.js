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
import {FBLoginManager} from 'react-native-facebook-login';
import GoogleSignIn from 'react-native-google-sign-in';

/**
 * Import local dependencies.
 */
import firebase from '../../firebase';

/**
 * Import actions.
 */

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

    logout = () => {
        let {user} = this.props;
        let facebook = user.providerData.find(provider => {
            console.log('sdfsdfs', provider);
            return provider.providerId === 'facebook.com';
        });
        if (facebook) {
            console.log('facebook logout');
            try {
                FBLoginManager.logout((err, data) => {
                    console.log('facebook logout', err, data);
                    if (!err) {
                        firebase.auth().signOut();
                    }
                });
            } catch (ex) {
                console.log('facebook logout error', ex);
            }
        }
        //GoogleSignIn.signOutPromise()
        //firebase.auth().signOut();
    };

    render() {
        let {user} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{`Welcome`}</Text>
                <TouchableHighlight
                    onPress={() => {
                        this.logout();
                    }}>
                    <Text style={{margin: 10}}>{`Logout`}</Text>
                </TouchableHighlight>
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
    return {}
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