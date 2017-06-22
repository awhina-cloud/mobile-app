import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export default class GoogleLoginButton extends Component {
    static propTypes = {
        login: React.PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight
                onPress={() => {
                    this.props.login();
                }}>
                <Text style={{margin: 10}}>{`Google Login`}</Text>
            </TouchableHighlight>
        )
    }
}
