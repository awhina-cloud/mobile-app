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
        backgroundColor: '#008855'
    },
    header: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1
    },
    orderTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff'
    },
    orderDetails: {
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1
    },
    orderDetailsTitle: {
        fontSize: 15,
        fontWeight: '100',
        color: '#ffffff',
        padding: 20,
    },

    orderDetailsList: {
      flex: 1
    },
    orderDetailsRow: {
        padding: 20,
        flexDirection: 'row',
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1
    },
    orderDetail: {
        flex: 1,
        flexDirection: 'column'
    },
    orderDetailTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff',
    },
    orderDetailItems: {
        fontSize: 10,
        fontWeight: '100',
        color: '#ffffff',
    },
    orderDetailPrice: {
        flexDirection: 'row',
        marginLeft: 20
    },
    orderDetailCurrency: {
        fontSize: 15,
        fontWeight: '100',
        color: '#ffffff',
        marginRight: 5,
        alignSelf: 'flex-start'
    },
    orderDetailTotal: {
        fontSize: 30,
        fontWeight: '100',
        color: '#ffffff'
    },

    orderTotalRow: {
        padding: 20,
        flexDirection: 'row'
    },
    orderTotalTitle: {
        flex: 1,
        alignSelf: 'flex-end',
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff',
    },
    orderTotalPrice: {
        flexDirection: 'row',
        marginLeft: 20
    },
    orderTotalCurrency: {
        fontSize: 15,
        fontWeight: '100',
        color: '#ffffff',
        marginRight: 5,
        alignSelf: 'flex-start'
    },
    orderTotalAmount: {
        fontSize: 30,
        fontWeight: '900',
        color: '#ffffff',
        alignSelf: 'flex-end'
    },




    footer: {
        flexDirection: 'row',
        width: '100%'
    },

    cancelOrderButton: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#ffffff',
        margin: 10,
        padding: 10
    },
    cancelOrderText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '800',
        color: '#ffffff',
    },
    submitOrderButton: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#ffffff',
        margin: 10,
        padding: 10
    },
    submitOrderText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '800',
        color: '#008855',
    },
});
