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
import {StyleSheet, Text, View, ListView, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

/**
 * Import local dependencies.
 */
import styles from './styles';

/**
 * Import actions.
 */

/**
 * Create the container.
 */
class OffersScreen extends Component {

    static navigationOptions = {
        title: 'Offer',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#303050'}
    };

    constructor(props) {
        super(props);
    }

    render() {
        let {onNavigateToOfferScreen, navigation} = this.props;
        let {offer} = navigation.state.params;
        return (
            <View style={styles.container}>
                <Text style={styles.name}>{offer.name}</Text>
                <Text style={styles.variations}>Variations</Text>
                {offer.variations.map(variaton => (
                    <Text style={styles.variation}>{variaton.name} - NZD {variaton.price}</Text>
                ))}
                <Text style={styles.extras}>Extras</Text>
                {offer.extras.map(extra => (
                    <Text style={styles.extra}>{extra.name} - NZD {extra.price}</Text>
                ))}
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
        onNavigateToOfferScreen: (offer) => dispatch(NavigationActions.navigate({
            routeName: 'Offer',
            params: {offer}
        }))
    }
};

/**
 * Export the container component.
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null, {
        pure: false // https://github.com/reactjs/react-redux/blob/master/docs/troubleshooting.md
    }
)(OffersScreen);
