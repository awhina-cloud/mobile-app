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
import {appUserLogoutCreator} from '../../actions';

/**
 * Create the container.
 */
class BusinessListScreen extends Component {

    static navigationOptions = {
        title: 'Home',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#303050' },
    };

    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        };
    }

    render() {
        let {onNavigateToOfferListScreen, businessList} = this.props;
        let {latitude, longitude, error} = this.state;

        return (
            <View style={styles.container}>
                <ListView dataSource={businessList} renderRow={rowData => <Text>{rowData}</Text>}/>
            </View>
        );
    }
}

/**
 * Map state to component properties.
 */
const mapStateToProps = ({app}) => {
    return {
        businessList: []
    }
};

/**
 * Map actions to component properties.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onNavigateToOfferListScreen: (businessId) => dispatch(NavigationActions.navigate({routeName: 'OfferList'}))
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
)(BusinessListScreen);
