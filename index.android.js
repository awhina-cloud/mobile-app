/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow


 import React, { Component } from 'react';
 import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

 export default class MyApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

 AppRegistry.registerComponent('MyApp', () => MyApp);
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import GoogleSignIn from 'react-native-google-sign-in';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import FireAuth from 'react-native-firebase-auth';
import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCcNYIzJnkRM1EV6-MpPoEzC_noKuyCSnk",
    authDomain: "my-app-2a4f4.firebaseapp.com",
    databaseURL: "https://my-app-2a4f4.firebaseio.com",
    projectId: "my-app-2a4f4",
    storageBucket: "my-app-2a4f4.appspot.com",
    messagingSenderId: "214337708418"
};

export default class MyApp extends Component {

    constructor(props) {
        super(props);
        try {
            firebase.initializeApp(config);
        } catch (ex) {
            console.log(ex);
        }

        try {
            FireAuth.init({
                clientID: '214337708418-ln8d7vji3v6k1aciiqno9a4thcjh3ucv.apps.googleusercontent.com',
                scopes: ['openid', 'email', 'profile'],
                shouldFetchBasicProfile: true,
            });
        } catch (ex) {
            console.log(ex);
        }
    }

    componentDidMount() {
        FireAuth.setup(this.onLogin, this.onUserChange, this.onLogout, this.emailVerified, this.onError);
    }

    onLogin = (a, b, c) => {
        console.log('onLogin', a, b, c);
    };
    onUserChange = (a, b, c) => {
        console.log('onUserChange', a, b, c);
    };
    onLogout = (a, b, c) => {
        console.log('onLogout', a, b, c);
    };
    emailVerified = (a, b, c) => {
        console.log('emailVerified', a, b, c);
    };
    onError = (a, b, c) => {
        console.log('onError', a, b, c);
    };

    register = () => {
        const {email, password, firstName, lastName} = this.state;
        FireAuth.register(email, password, {firstName, lastName});
    }

    login = () => {
        FireAuth.login(this.state.email, this.state.password);
    }

    facebookLogin() {
        FireAuth.facebookLogin();
    }

    googleLogin() {
        console.log('FireAuth.googleLogin();');
        FireAuth.googleLogin();
    }

    logout() {
        FireAuth.logout();
    }

    update = () => {
        FireAuth.update({firstName: this.state.firstName, lastName: this.state.lastName}).then(() => {
            console.log('update');
        }).catch(err => {
            console.log('update error');
        });
    };

    resetPassword = () => {
        FireAuth.resetPassword(this.state.email)
            .then(() => {
                console.log('reset pw');
            })
            .catch(err => {
                console.log('reset pw error');
            });
    };

    updatePassword = () => {
        FireAuth.updatePassword(this.state.password).then(() => {
            console.log('update pw');
        }).catch(err => {
            console.log('update pw error');
        });
    };


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native! A4
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R hahs on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
                <TouchableHighlight style={styles.google} onPress={async () => {
                    this.logout();
                }}>
                    <Text style={styles.instructions}>
                        Sign-Out
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.google} onPress={async () => {
                    this.googleLogin();
                }}>
                    <Text style={styles.instructions}>
                        Google Sign-In
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.google} onPress={async () => {
                    this.facebookLogin();
                }}>
                    <Text style={styles.instructions}>
                        Facebook Sign-In
                    </Text>
                </TouchableHighlight>
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
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    google: {
        flex: 0
    },
    facebook: {
        flex: 0
    }
});

AppRegistry.registerComponent('MyApp', () => MyApp);