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
import {StyleSheet} from 'react-native';

/**
 * Export styles.
 */
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,255)'
    },
    header: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#888888',
        borderBottomWidth: 1
    },
    offerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff'
    },
    offerPrices: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    offerOriginalPrice: {
        fontSize: 20,
        fontWeight: '100',
        textDecorationLine :'line-through',
        color: '#888888',
        marginRight: 10
    },
    offerDiscountedPrice: {
        fontSize: 30,
        fontWeight: '100',
        color: '#00ea8d'
    },


    content: {
      flex: 1
    },

    offerVariations: {
        borderBottomColor: '#888888',
        borderBottomWidth: 1
    },
    offerVariationsTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#bbbbbb',
        padding: 20,
    },
    offerVariation: {
        paddingLeft: 20,
        paddingRight: 10,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    offerVariationTitle: {
        fontSize: 20,
        fontWeight: '100',
        color: '#ffffff'
    },
    offerVariationPrices: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    offerVariationOriginalPrice: {
        fontSize: 25,
        fontWeight: '100',
        textDecorationLine :'line-through',
        color: '#888888',
        marginRight: 10
    },
    offerVariationDiscountedPrice: {
        fontSize: 25,
        fontWeight: '100',
        color: '#ffffff'
    },
    offerVariationSwitch: {
        marginLeft: 20
    },


    offerExtras: {
        paddingBottom: 20,
        borderBottomColor: '#888888',
        borderBottomWidth: 1
    },
    offerExtrasTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#bbbbbb',
        padding: 20
    },
    offerExtra: {
        paddingLeft: 20,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    offerExtraTitle: {
        fontSize: 20,
        fontWeight: '100',
        color: '#ffffff'
    },
    offerExtraPrices: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    offerExtraOriginalPrice: {
        fontSize: 25,
        fontWeight: '100',
        textDecorationLine :'line-through',
        color: '#888888',
        marginRight: 10
    },
    offerExtraDiscountedPrice: {
        fontSize: 25,
        fontWeight: '100',
        color: '#ffffff'
    },
    offerExtraSwitch: {
        marginLeft: 20
    },
    offerExtraCount: {
        textAlign: 'center',
        width: 65,
        fontSize: 25,
        fontWeight: '100',
        color: '#ffffff'
    },
    currencySymbol: {
        fontSize: 15,
        fontWeight: '100',
        color: '#888888',
        marginRight: 5,
        alignSelf: 'flex-start'
    },




    footer: {
        flexDirection: 'row',
        width: '100%'
    },

    addMoreButton: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#008855',
        margin: 10,
        padding: 10
    },
    addMoreText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '800',
        color: '#ffffff',
    },
    doneButton: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#008855',
        margin: 10,
        padding: 10
    },
    doneText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '800',
        color: '#ffffff',
    },







    footerSection: {
        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 5,
        margin: 1
    },
    button: {
        flex: 1,
        alignSelf: 'stretch',
    },


    title: {
        fontSize: 20,
        color: '#ffffff'
    },
    description: {
        fontSize: 16
    },
    variations: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1
    },
    variation: {
        margin: 5,
        color: '#000080'
    },
    extras: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1
    },
    extra: {
        margin: 5,
        color: '#303050'
    }
});
