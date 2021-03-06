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
import RNFirebase from 'react-native-firebase';

/**
 * TODO: Switch between development and production.
 */
const configurationOptions = {
    debug: true,
    persistence: true
};

/**
 * Export the firebase instance.
 */
export default RNFirebase.initializeApp(configurationOptions);
