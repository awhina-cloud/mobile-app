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
import {orderAddMoreOffersCreator, orderSubmitCreator, orderCancelCreator} from '../../actions';

/**
 * Create the container.
 */
class OrderScreen extends Component {

    static navigationOptions = {
        title: 'Order',
        headerTintColor: 'white',
        headerStyle: {backgroundColor: '#303050'}
    };

    constructor(props) {
        super(props);

        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

        this.state = {
            dataSource: this.dataSource.cloneWithRows(this.props.order.items)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({dataSource: this.dataSource.cloneWithRows(nextProps.order.items)});
    }

    render() {
        let {onOrderAddMoreOffers, onOrderSubmit, onOrderCancel, onNavigateToLoginScreen, buyer, order} = this.props;
        let {dataSource} = this.state;
        console.log('EEEEEEEEEEE', buyer);
        return (
            <View style={styles.container}>
                <View style={styles.button}>
                    <Button onPress={() => onOrderAddMoreOffers(order.deal)} color="#3b5998" title="Add more offers"/>
                </View>
                <View style={styles.button}>
                    {buyer &&
                    <Button onPress={() => onOrderSubmit(buyer, order)} color="#3b5998" title="Submit order"/>
                    }
                    {!buyer &&
                    <Button onPress={() => onNavigateToLoginScreen()} color="#3b5998" title="Login to submit order"/>
                    }
                </View>
                <View style={styles.button}>
                    <Button onPress={() => onOrderCancel()} color="#3b5998" title="Cancel order"/>
                </View>
                <ListView style={styles.container} dataSource={dataSource} renderRow={item => (
                    <View style={styles.row} elevation={2}>
                        <Text style={styles.offerTitle}>{item.title}</Text>
                        <Text style={styles.offerDescription}>{item.description}</Text>
                    </View>
                )}/>
            </View>
        );
    }
}

/** this.props.navigation.state.params
 * Map state to component properties.
 */
const mapStateToProps = ({app}, {navigation}) => {
    return {
        buyer: app.buyer,
        order: app.orders[navigation.state.params.deal.id]
    };
};

/**
 * Map actions to component properties.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onOrderAddMoreOffers: (deal) => dispatch(orderAddMoreOffersCreator(deal)),
        onOrderSubmit: (buyer, order) => dispatch(orderSubmitCreator({buyer, order})),
        onOrderCancel: () => dispatch(orderCancelCreator()),
        onNavigateToLoginScreen: () => dispatch(NavigationActions.navigate({routeName: 'Login'}))
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
)(OrderScreen);
