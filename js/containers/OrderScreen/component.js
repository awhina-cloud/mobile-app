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
import {orderSubmitCreator, orderCancelCreator} from '../../actions';

/**
 * Create the container.
 */
class OrderScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

        this.state = {
            dataSource: this.dataSource.cloneWithRows(this.props.order.items)
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.order) {
            this.setState({dataSource: this.dataSource.cloneWithRows(nextProps.order.items)});
        }
    }

    render() {
        let {onOrderSubmit, onOrderCancel, onNavigateToLoginScreen, buyer, order} = this.props;
        let {dataSource} = this.state;
        if (!order) {
            return null;
        }
        let totalAmount = order.items.reduce((total, item) => {
            return total + item.total;
        }, 0);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.orderTitle}>{order.deal.title3}</Text>
                </View>
                <View style={styles.orderDetails}>
                    <Text style={styles.orderDetailsTitle}>Order Details</Text>
                </View>
                <ListView style={styles.orderDetailsList} dataSource={dataSource} renderRow={item => (
                    <View style={styles.orderDetailsRow}>
                        <View style={styles.orderDetail}>
                            <Text style={styles.orderDetailTitle}>{item.title}</Text>
                            <Text style={styles.orderDetailItems} numberOfLines={1} ellipsizeMode="tail">
                                {[item.variation.title, ...item.extras.map(e => ` ${e.count} ${e.title}`)].toString()}
                            </Text>
                        </View>
                        <View style={styles.orderDetailPrice}>
                            <Text style={styles.orderDetailCurrency}>$</Text>
                            <Text style={styles.orderDetailTotal}>{item.total.toFixed(2)}</Text>
                        </View>
                    </View>
                )}
                          renderFooter={() => (
                              <View style={styles.orderTotalRow}>
                                  <Text style={styles.orderTotalTitle}>Total</Text>
                                  <View style={styles.orderTotalPrice}>
                                      <Text style={styles.orderTotalCurrency}>$</Text>
                                      <Text style={styles.orderTotalAmount}>{totalAmount.toFixed(2)}</Text>
                                  </View>
                              </View>
                          )}
                />
                <View style={styles.footer}>
                    <TouchableHighlight style={styles.cancelOrderButton} onPress={() => {
                        onOrderCancel({buyer, order});
                    }}>
                        <Text style={styles.cancelOrderText}>CANCEL ORDER</Text>
                    </TouchableHighlight>
                    {buyer &&
                    <TouchableHighlight style={styles.submitOrderButton} onPress={() => {
                        onOrderSubmit({buyer, order});
                    }}>
                        <Text style={styles.submitOrderText}>SUBMIT ORDER</Text>
                    </TouchableHighlight>
                    }
                    {!buyer &&
                    <TouchableHighlight style={styles.loginBeforeSubmitOrderButton} onPress={() => {
                        onNavigateToLoginScreen();
                    }}>
                        <Text style={styles.loginBeforeSubmitOrderText}>LOGIN</Text>
                    </TouchableHighlight>
                    }
                </View>
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
        onOrderSubmit: (payload) => dispatch(orderSubmitCreator(payload)),
        onOrderCancel: (payload) => dispatch(orderCancelCreator(payload)),
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
