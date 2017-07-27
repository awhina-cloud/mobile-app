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
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ListView,
    TouchableHighlight,
    Button,
    Switch,
    ScrollView
} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import R from 'ramda';

/**
 * Import local dependencies.
 */
import styles from './styles';

/**
 * Import actions.
 */
import {offerAddToOrderAndMoreCreator, offerAddToOrderAndDoneCreator} from '../../actions';

/**
 * Create the container.
 */
class OffersScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        let {offer} = this.props.navigation.state.params;
        this.state = {
            extras: R.map(R.assoc('count', 0 /*defaultCount*/), offer.extras),
            selectedVariation: offer.variations.findIndex(v => v.default)
        }
    }

    render() {
        let {onAddToOrderAndMore, onAddToOrderAndDone, navigation} = this.props;
        let {deal, offer} = navigation.state.params;
        let selectedVariation = offer.variations[this.state.selectedVariation];
        let totals = this.state.extras.reduce((totals, extra) => {
            totals.originalPrice += extra.count * (extra.originalPrice ? extra.originalPrice : extra.discountPrice ? extra.discountPrice : 0);
            totals.discountPrice += extra.count * (extra.discountPrice ? extra.discountPrice : 0);
            return totals;
        }, {
            originalPrice: selectedVariation.originalPrice ? selectedVariation.originalPrice : selectedVariation.discountPrice ? selectedVariation.discountPrice : 0,
            discountPrice: selectedVariation.discountPrice ? selectedVariation.discountPrice : 0
        });
        let originalTotalPrice = totals.originalPrice > totals.discountPrice ? totals.originalPrice.toFixed(2) : null;
        let discountTotalPrice = totals.discountPrice.toFixed(2);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.offerTitle}>{offer.title}</Text>
                    <View style={styles.offerPrices}>
                        {originalTotalPrice &&
                        <Text style={styles.currencySymbol}>$</Text>
                        }
                        {originalTotalPrice &&
                        <Text style={styles.offerOriginalPrice}>{originalTotalPrice}</Text>
                        }
                        {discountTotalPrice &&
                        <Text style={styles.currencySymbol}>$</Text>
                        }
                        {discountTotalPrice &&
                        <Text style={styles.offerDiscountedPrice}>{discountTotalPrice}</Text>
                        }
                    </View>
                </View>
                <ScrollView styles={styles.content}>
                    <View style={styles.offerVariations}>
                        <Text style={styles.offerVariationsTitle}>{offer.variationsTitle}</Text>
                        {offer.variations.map((variation, index) => {
                            let originalPrice = variation.originalPrice ? variation.originalPrice.toFixed(2) : null;
                            let discountPrice = variation.discountPrice ? variation.discountPrice.toFixed(2) : null;
                            return (
                                <View style={styles.offerVariation}>
                                    <Text style={styles.offerVariationTitle} key={variation.id}>{variation.title}</Text>
                                    <View style={styles.offerVariationPrices}>
                                        {originalPrice &&
                                        <Text style={styles.currencySymbol}>$</Text>
                                        }
                                        {originalPrice &&
                                        <Text style={styles.offerVariationOriginalPrice}>{originalPrice}</Text>
                                        }
                                        {discountPrice &&
                                        <Text style={styles.currencySymbol}>$</Text>
                                        }
                                        {discountPrice &&
                                        <Text style={styles.offerVariationDiscountedPrice}>{discountPrice}</Text>
                                        }
                                        <Switch style={styles.offerVariationSwitch}
                                                tintColor="#444444" onTintColor="#888888"
                                                thumbTintColor={index === this.state.selectedVariation ? "#00ea8d" : "#aaaaaa"}
                                                onValueChange={value => {
                                                    if (value) {
                                                        this.setState({selectedVariation: index})
                                                    }
                                                }}
                                                value={index === this.state.selectedVariation}/>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                    <View style={styles.offerExtras}>
                        <Text style={styles.offerExtrasTitle}>{offer.extrasTitle}</Text>
                        {offer.extras.map(extra => {
                            let originalPrice = extra.originalPrice ? extra.originalPrice.toFixed(2) : null;
                            let discountPrice = extra.discountPrice ? extra.discountPrice.toFixed(2) : null;
                            return (
                                <View style={styles.offerExtra}>
                                    <Text style={styles.offerExtraTitle} key={extra.id}>{extra.title}</Text>
                                    <View style={styles.offerExtraPrices}>
                                        {originalPrice &&
                                        <Text style={styles.currencySymbol}>$</Text>
                                        }
                                        {originalPrice &&
                                        <Text style={styles.offerExtraOriginalPrice}>{originalPrice}</Text>
                                        }
                                        {discountPrice &&
                                        <Text style={styles.currencySymbol}>$</Text>
                                        }
                                        {discountPrice &&
                                        <Text style={styles.offerExtraDiscountedPrice}>{discountPrice}</Text>
                                        }
                                        {extra.max === 1 &&
                                        <Switch style={styles.offerExtraSwitch}
                                                tintColor="#444444" onTintColor="#888888"
                                                thumbTintColor={this.state.extras.find(x => x.id === extra.id).count === 1 ? "#00ea8d" : "#aaaaaa"}
                                                onValueChange={value => {
                                                    this.state.extras.find(x => x.id === extra.id).count = value ? 1 : 0;
                                                    this.setState({extras: this.state.extras})
                                                }}
                                                value={this.state.extras.find(x => x.id === extra.id).count === 1}/>
                                        }
                                        {extra.max > 1 &&
                                        <TextInput
                                            style={styles.offerExtraCount}
                                            keyboardType='numeric'
                                            onChangeText={value => {
                                                this.state.extras.find(x => x.id === extra.id).count = value.length === 0 || isNaN(value) ? 0 : parseInt(value);
                                                this.setState({extras: this.state.extras})
                                            }}
                                            value={this.state.extras.find(x => x.id === extra.id).count.toString()}/>
                                        }
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <TouchableHighlight style={styles.addMoreButton} onPress={() => onAddToOrderAndMore({
                        deal, item: {
                            title: offer.title,
                            description: offer.description,
                            image: offer.image,
                            variation: selectedVariation,
                            extras: R.filter(x => x.count > 0, this.state.extras),
                            total: totals.discountPrice
                        }
                    })}>
                        <Text style={styles.addMoreText}>ADD MORE</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.doneButton} onPress={() => onAddToOrderAndDone({
                        deal, item: {
                            title: offer.title,
                            description: offer.description,
                            image: offer.image,
                            variation: selectedVariation,
                            extras: R.filter(x => x.count > 0, this.state.extras),
                            total: totals.discountPrice
                        }
                    })}>
                        <Text style={styles.doneText}>DONE</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

/**
 * Map state to component properties.
 */
const mapStateToProps = ({app}) => {
    return {};
};

/**
 * Map actions to component properties.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onAddToOrderAndMore: (payload) => dispatch(offerAddToOrderAndMoreCreator(payload)),
        onAddToOrderAndDone: (payload) => dispatch(offerAddToOrderAndDoneCreator(payload))
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
