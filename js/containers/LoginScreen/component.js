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
import {StyleSheet, Text, View} from 'react-native';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import GoogleSignIn from 'react-native-google-sign-in';
import firebase from '../../firebase';
import FacebookLoginButton from "../../components/FacebookLoginButton";
import GoogleLoginButton from "../../components/GoogleLoginButton";

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.unsubscribeFirebaseAuthState = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('!!!!!!!!!', user);
            } else {
                console.log('!!!!!!!!! Logged out');
            }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribeFirebaseAuthState) {
            this.unsubscribeFirebaseAuthState();
        }
    }

    firebaseAuthFacebookLogin = (token) => {
        try {
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            const user = firebase.auth().signInWithCredential(credential);
            if (user === 'cancelled') {
                console.log('firebaseAuthFacebookLogin: Login cancelled');
            } else {
                console.log('firebaseAuthFacebookLogin: ' + JSON.stringify(user));
            }
        } catch (ex) {
            console.log('firebaseAuthFacebookLogin', ex);
        }
    };

    firebaseAuthFacebookLogout = () => {
        try {
            firebase.auth().signOut();
        } catch (ex) {
            console.log('firebaseAuthFacebookLogout', ex);
        }
    };

    firebaseAuthGoogleLogin = () => {
        try {
            GoogleSignIn.signInPromise()
                .then(googleUser => {
                    const credential = firebase.auth.GoogleAuthProvider.credential(googleUser.idToken, googleUser.accessToken);
                    const firebaseUser = firebase.auth().signInWithCredential(credential);
                    if (firebaseUser === 'cancelled') {
                        console.log('firebaseAuthGoogleLogin: Login cancelled');
                    } else {
                        console.log('firebaseAuthGoogleLogin: ' + JSON.stringify(user));
                    }
                }).catch(ex => console.log('google signin error', ex));
        } catch (ex) {
            console.log('firebaseAuthGoogleLogin', ex);
        }
    };

    firebaseAuthGoogleLogout = () => {
        try {
            firebase.auth().signOut();
        } catch (ex) {
            console.log('firebaseAuthGoogleLogout', ex);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{`Login`}</Text>
                <FBLogin
                    buttonView={<FacebookLoginButton />}
                    loginBehavior={FBLoginManager.LoginBehaviors.Native}
                    permissions={["email"]}
                    onLogin={e => {
                        console.log('onLogin', e);
                        this.firebaseAuthFacebookLogin(e.credentials.token);
                    }}
                    onLogout={e => {
                        console.log('onLogout', e);
                        this.firebaseAuthFacebookLogout();
                    }}
                    onLoginFound={e => {
                        console.log('onLoginFound', e);
                    }}
                    onLoginNotFound={e => {
                        console.log('onLoginNotFound', e)
                    }}
                    onCancel={e => {
                        console.log('onCancel', e)
                    }}
                    onPermissionsMissing={e => {
                        console.log('onPermissionsMissing', e)
                    }}
                />
                <GoogleLoginButton login={() => this.firebaseAuthGoogleLogin()}/>
            </View>
        );
    }
}

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