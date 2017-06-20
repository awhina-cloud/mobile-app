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

export default class MyApp extends Component {
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
                    console.log('A1');
                    try {
                        await GoogleSignIn.configure({
                            clientID: '214337708418-ln8d7vji3v6k1aciiqno9a4thcjh3ucv.apps.googleusercontent.com',
                            scopes: ['openid', 'email', 'profile'],
                            shouldFetchBasicProfile: true,
                        });
                    } catch (ex) {
                        console.log('Y1', ex);
                    }

                    try {
                        const user = await GoogleSignIn.signInPromise().catch(ex => {
                            console.log('XX', ex)
                        });
                        setTimeout(() => {
                            alert(JSON.stringify(user, null, '  '));
                        }, 1500);
                    } catch (ex) {
                        console.log('Y2', ex);
                    }
                }}>
                    <Text style={styles.instructions}>
                        Google Sign-In
                    </Text>
                </TouchableHighlight>
                <FBLogin style={styles.facebook}
                         ref={(fbLogin) => {
                             this.fbLogin = fbLogin
                         }}
                         permissions={["email", "user_friends"]}
                         loginBehavior={FBLoginManager.LoginBehaviors.Native}
                         onLogin={function (data) {
                             console.log("Logged in!");
                             console.log(data);
                             //_this.setState({ user : data.credentials });
                         }}
                         onLogout={function () {
                             console.log("Logged out.");
                             //_this.setState({ user : null });
                         }}
                         onLoginFound={function (data) {
                             console.log("Existing login found.");
                             console.log(data);
                             //_this.setState({ user : data.credentials });
                         }}
                         onLoginNotFound={function () {
                             console.log("No user logged in.");
                             //_this.setState({ user : null });
                         }}
                         onError={function (data) {
                             console.log("ERROR");
                             console.log(data);
                         }}
                         onCancel={function () {
                             console.log("User cancelled.");
                         }}
                         onPermissionsMissing={function (data) {
                             console.log("Check permissions!");
                             console.log(data);
                         }}
                />
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