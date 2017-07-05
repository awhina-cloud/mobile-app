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
class BusinessesScreen extends Component {

    static navigationOptions = {
        title: 'Businesses',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#303050'}
    };

    constructor(props) {
        super(props);

        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

        this.state = {
            dataSource: this.dataSource.cloneWithRows(this.props.businesses)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({dataSource: this.dataSource.cloneWithRows(nextProps.businesses)});
    }

    render() {
        let {onNavigateToOffersScreen, businesses} = this.props;
        let {dataSource} = this.state;
        return (
            <ListView style={styles.container} dataSource={dataSource} renderRow={business => (
                <TouchableHighlight onPress={() => onNavigateToOffersScreen(business)}>
                    <View style={styles.row} elevation={2}>
                        <Text style={styles.businessName}>{business.name}</Text>
                    </View>
                </TouchableHighlight>
            )}/>
        );
    }
}

/**
 * Map state to component properties.
 */
const mapStateToProps = ({app}) => {
    return {
        businesses: app.businesses
    }
};

/**
 * Map actions to component properties.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onNavigateToOffersScreen: (business) => dispatch(NavigationActions.navigate({
            routeName: 'Offers',
            params: {business}
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
)(BusinessesScreen);