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

/**
 * Import local dependencies.
 */

/**
 * Import actions.
 */

/**
 * Create the container.
 */
export default class LoadingScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{`Loading`}</Text>
            </View>
        );
    }
}

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