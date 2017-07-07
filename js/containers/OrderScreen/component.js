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
            dataSource: this.dataSource.cloneWithRows(this.props.order.offers)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({dataSource: this.dataSource.cloneWithRows(nextProps.order.offers)});
    }

    render() {
        let {onOrderAddMoreOffers, onOrderSubmitCreator, onOrderCancelCreator, user, order} = this.props;
        let {dataSource} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.button}>
                    <Button onPress={() => onOrderAddMoreOffers(order.business)} color="#3b5998" title="Add more offers"/>
                </View>
                <View style={styles.button}>
                    <Button onPress={() => onOrderSubmitCreator(user, order)} color="#3b5998" title="Submit order"/>
                </View>
                <View style={styles.button}>
                    <Button onPress={() => onOrderCancelCreator()} color="#3b5998" title="Cancel order"/>
                </View>
                <ListView style={styles.container} dataSource={dataSource} renderRow={offer => (
                    <View style={styles.row} elevation={2}>
                        <Text style={styles.businessName}>{offer.name}</Text>
                    </View>
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
        user: app.user,
        order: app.order
    };
};

/**
 * Map actions to component properties.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onOrderAddMoreOffers: (business) => dispatch(orderAddMoreOffersCreator(business)),
        onOrderSubmitCreator: (user, order) => dispatch(orderSubmitCreator({user, order})),
        onOrderCancelCreator: () => dispatch(orderCancelCreator())
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
