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
import {StyleSheet, Text, View, ListView, TouchableHighlight, Button} from 'react-native';
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
class DealsScreen extends Component {

    static navigationOptions = {
        title: 'Deals',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#303050'}
    };

    constructor(props) {
        super(props);

        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

        this.state = {
            dataSource: this.dataSource.cloneWithRows(this.props.deals)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({dataSource: this.dataSource.cloneWithRows(nextProps.deals)});
    }

    render() {
        let {onNavigateToOffersScreen, deals, orders} = this.props;
        let {dataSource} = this.state;
        return (
            <View style={styles.container}>
                {
                    orders.length > 0 &&
                    <View style={styles.button}>
                        <Button onPress={() => console.log('PRESSED')} color="#3b5998"
                                title={`${orders.length} Orders in progress.`}/>
                    </View>
                }
                <ListView style={styles.container} dataSource={dataSource} renderRow={deal => (
                    <TouchableHighlight onPress={() => onNavigateToOffersScreen(deal)}>
                        <View style={styles.row} elevation={2}>
                            <Text style={styles.dealTitle}>{deal.title}</Text>
                            <Text style={styles.dealDescription}>{deal.description}</Text>
                        </View>
                    </TouchableHighlight>
                )}/>
            </View>
        );
    }
}

/**
 * Map state to component properties.
 */
const mapStateToProps = ({app}) => {
    return {
        deals: app.deals,
        orders: app.buyer ? app.buyer.orders : []
    }
};

/**
 * Map actions to component properties.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onNavigateToOffersScreen: (deal) => dispatch(NavigationActions.navigate({
            routeName: 'Offers',
            params: {deal}
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
)(DealsScreen);
