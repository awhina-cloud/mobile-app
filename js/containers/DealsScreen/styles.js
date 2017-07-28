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
    order: {
        backgroundColor: '#008855',
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000000'
    },
    orderLeft: {
        flex: 1,
        flexDirection: 'column'
    },
    orderTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff'
    },
    orderStatusText: {
        fontSize: 10,
        fontWeight: '100',
        color: '#ffffff'
    },
    list: {
        flex: 1
    },
    row: {
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
    }
});
