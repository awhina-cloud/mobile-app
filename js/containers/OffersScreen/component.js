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
import {StyleSheet, Text, View, ListView, TouchableHighlight, Image} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
        //title: 'Offers',
        //headerTintColor: 'rgba(255,255,255,255)',
        //headerStyle: {backgroundColor: 'rgba(0,0,0,0)'}
        header: null
    };

    constructor(props) {
        super(props);

        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

        this.state = {
            dataSource: this.dataSource.cloneWithRows(this.props.navigation.state.params.deal.offers)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({dataSource: this.dataSource.cloneWithRows(nextProps.navigation.state.params.deal.offers)});
    }

    renderPrice = (variations) => {
        let variation = variations.find(v => v.default);
        let originalPrice = variation.originalPrice ? variation.originalPrice.toFixed(2) : null;
        let discountPrice = variation.discountPrice ? variation.discountPrice.toFixed(2) : null;
        return (
            <View style={styles.offerPrices}>
                {originalPrice &&
                <Text style={styles.currencySymbol}>$</Text>
                }
                {originalPrice &&
                <Text style={styles.offerOriginalPrice}>{originalPrice}</Text>
                }
                <Text style={styles.currencySymbol}>$</Text>
                <Text style={styles.offerDiscountedPrice}>{discountPrice}</Text>
            </View>
        );
    };

    render() {
        let {onNavigateToOfferScreen, onNavigateToOrderScreen, navigation, order} = this.props;
        let {dataSource} = this.state;
        let {deal} = navigation.state.params;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        style={styles.backdrop}
                        source={{uri: deal.image}}>
                        <TouchableHighlight style={order ? styles.shoppingCartActive : styles.shoppingCart}
                                            onPress={() => {
                                                if (order && order.items.length > 0) {
                                                    onNavigateToOrderScreen({deal: navigation.state.params.deal})
                                                }
                                            }}>
                            <View style={styles.shoppingCartView}>
                                <Icon name="shopping-cart" size={30} color="#ffffff"/>
                                <Text style={styles.shoppingCartText}>{order ? order.items.length : 0}</Text>
                            </View>
                        </TouchableHighlight>
                        <View style={styles.backdropView}>
                            <Text style={styles.title1}>{deal.title1}</Text>
                            <Text style={styles.title2}>{deal.title2}</Text>
                            <Text style={styles.title3}>{deal.title3}</Text>
                            {!isNaN(deal.distance) &&
                            <Text
                                style={styles.distance}>{deal.distance > 1000 ? `${(deal.distance / 1000).toFixed(2)}km` : `${deal.distance}m`}</Text>
                            }
                        </View>
                    </Image>
                </View>
                <Text style={styles.description}>{deal.description}</Text>
                <ListView style={styles.list} dataSource={dataSource} renderRow={offer => (
                    <TouchableHighlight
                        onPress={() => onNavigateToOfferScreen({deal: navigation.state.params.deal, offer})}>
                        <View style={styles.row} elevation={2}>
                            <Text style={styles.offerTitle}>{offer.title}</Text>
                            {this.renderPrice(offer.variations)}
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
const mapStateToProps = ({app}, {navigation}) => {
    return {
        order: app.orders[navigation.state.params.deal.id]
    }
};

/**
 * Map actions to component properties.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onNavigateToOfferScreen: (params) => dispatch(NavigationActions.navigate({
            routeName: 'Offer',
            params: params
        })),
        onNavigateToOrderScreen: (params) => dispatch(NavigationActions.navigate({
            routeName: 'Order',
            params: params
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
