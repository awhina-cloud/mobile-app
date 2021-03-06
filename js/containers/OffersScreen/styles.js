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
        backgroundColor: 'rgba(0,0,0,255)',
    },

    header: {
        width: '100%',
        height: 200
    },
    backdrop: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: null,
        width: null,
        resizeMode: 'cover'
    },
    backdropView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        padding: 10
    },
    shoppingCart: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'absolute',
        right: 10,
        top: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,.5)'
    },
    shoppingCartActive: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'absolute',
        right: 10,
        top: 10,
        borderRadius: 20,
        backgroundColor: '#008855'
    },
    shoppingCartView: {
        height: 40,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    shoppingCartText: {
        fontSize: 30,
        fontWeight: '200',
        color: '#ffffff',
        marginBottom: 5
    },
    title1: {
        fontSize: 20,
        fontWeight: '100',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
        textShadowColor: 'rgba(0,0,0,255)',
        textShadowRadius: 10,
        textShadowOffset: {
            width: 1,
            height: 1

        }
    },
    title2: {
        fontSize: 40,
        fontWeight: '700',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
        textShadowColor: 'rgba(0,0,0,255)',
        textShadowRadius: 10,
        textShadowOffset: {
            width: 1,
            height: 1

        }
    },
    title3: {
        fontSize: 20,
        fontWeight: '700',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
        textShadowColor: 'rgba(0,0,0,255)',
        textShadowRadius: 10,
        textShadowOffset: {
            width: 1,
            height: 1

        }
    },
    distance: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        fontSize: 20,
        fontWeight: '100',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
        textShadowColor: 'rgba(0,0,0,255)',
        textShadowRadius: 10,
        textShadowOffset: {
            width: 1,
            height: 1

        }
    },

    description: {
        margin: 10,
        fontSize: 15,
        fontWeight: '100',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
        textAlign: 'justify'
    },


    list: {
        flex: 1,
        borderTopColor: '#888888',
        borderTopWidth: 1
    },
    row: {
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
        fontSize: 25,
        fontWeight: '100',
        textDecorationLine: 'line-through',
        color: '#888888',
        marginRight: 10
    },
    offerDiscountedPrice: {
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
});
