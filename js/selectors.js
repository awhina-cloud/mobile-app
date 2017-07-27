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
import R from 'ramda';

/**
 * https://github.com/njj/haversine
 */
export const haversine = (function () {

    // convert to radians
    let toRad = function (num) {
        return num * Math.PI / 180
    };

    return function haversine(start, end, options) {
        options = options || {};

        let radii = {
            km: 6371,
            mile: 3960,
            meter: 6371000,
            nmi: 3440
        };

        let R = options.unit in radii
            ? radii[options.unit]
            : radii.km;

        let dLat = toRad(end.latitude - start.latitude);
        let dLon = toRad(end.longitude - start.longitude);
        let lat1 = toRad(start.latitude);
        let lat2 = toRad(end.latitude);

        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        if (options.threshold) {
            return options.threshold > (R * c)
        }

        return R * c
    }

})();

/**
 * Export firebase object to array transformation helper.
 */
export const objectToArray = R.curry(obj => R.map(x => R.assoc('id', x, obj[x]), R.keys(obj)));

/**
 * Export firebase recursive object to array transformation helper.
 */
export const objectsToArrays = (transformations, obj) => {
    if (!obj) {
        return obj;
    }
    R.forEachObjIndexed((value, key) => {
        obj[key] = R.sortBy(R.prop('id'), objectToArray(obj[key]));
        obj[key] = R.map(p => objectsToArrays(value, p), obj[key]);
    }, transformations);
    return obj;
};
