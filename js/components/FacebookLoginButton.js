import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export default class FacebookLoginButton extends Component {
    static contextTypes = {
        isLoggedIn: React.PropTypes.bool,
        login: React.PropTypes.func,
        logout: React.PropTypes.func,
        props: React.PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight
                onPress={() => {
                    this.context.isLoggedIn ? this.context.logout() : this.context.login();
                }}>
                <Text style={{margin: 10}}>{`Facebook ${this.context.isLoggedIn ? 'Logout' : 'Login'}`}</Text>
            </TouchableHighlight>
        )
    }
}
