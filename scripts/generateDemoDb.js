/**
 * Fancy ID generator that creates 20-character string identifiers with the following properties:
 *
 * 1. They're based on timestamp so that they sort *after* any existing ids.
 * 2. They contain 72-bits of random data after the timestamp so that IDs won't collide with other clients' IDs.
 * 3. They sort *lexicographically* (so the timestamp is converted to characters that will sort properly).
 * 4. They're monotonically increasing.  Even if you generate more than one in the same timestamp, the
 *    latter ones will sort after the former ones.  We do this by using the previous random bits
 *    but "incrementing" them by 1 (only in the case of a timestamp collision).
 */
const generatePushID = (function () {
    // Modeled after base64 web-safe chars, but ordered by ASCII.
    var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

    // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
    var lastPushTime = 0;

    // We generate 72-bits of randomness which get turned into 12 characters and appended to the
    // timestamp to prevent collisions with other clients.  We store the last characters we
    // generated because in the event of a collision, we'll use those same characters except
    // "incremented" by one.
    var lastRandChars = [];

    return function () {
        var now = new Date().getTime();
        var duplicateTime = (now === lastPushTime);
        lastPushTime = now;

        var timeStampChars = new Array(8);
        for (var i = 7; i >= 0; i--) {
            timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
            // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
            now = Math.floor(now / 64);
        }
        if (now !== 0) throw new Error('We should have converted the entire timestamp.');

        var id = timeStampChars.join('');

        if (!duplicateTime) {
            for (i = 0; i < 12; i++) {
                lastRandChars[i] = Math.floor(Math.random() * 64);
            }
        } else {
            // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
            for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
                lastRandChars[i] = 0;
            }
            lastRandChars[i]++;
        }
        for (i = 0; i < 12; i++) {
            id += PUSH_CHARS.charAt(lastRandChars[i]);
        }
        if (id.length !== 20) throw new Error('Length should be 20.');

        return id;
    };
})();

const createBusiness = (function () {
    let counter = -1;
    return function () {
        counter++;
        return {
            name: `Business ${counter}`,
            latitude: -36.845239 + (counter * 0.001),
            longitude: 175.773221 + (counter * 0.001),
            offers: {
                [`${generatePushID()}`]: createOffer(),
                [`${generatePushID()}`]: createOffer(),
                // [`${generatePushID()}`]: createOffer(),
                // [`${generatePushID()}`]: createOffer(),
                // [`${generatePushID()}`]: createOffer(),
                // [`${generatePushID()}`]: createOffer(),
                // [`${generatePushID()}`]: createOffer(),
                // [`${generatePushID()}`]: createOffer(),
                // [`${generatePushID()}`]: createOffer(),
                // [`${generatePushID()}`]: createOffer(),
            }
        }
    }
})();

const createOffer = (function () {
    let counter = -1;
    return function () {
        counter++;
        return {
            name: `Offer ${counter}`,
            variations: {
                [`${generatePushID()}`]: {
                    name: 'Small',
                    price: 3.0
                },
                [`${generatePushID()}`]: {
                    name: 'Medium',
                    price: 4.0
                },
                [`${generatePushID()}`]: {
                    name: 'Large',
                    price: 5.0
                }
            },
            extras: {
                [`${generatePushID()}`]: {
                    name: 'Decaf',
                    price: 0.5
                },
                [`${generatePushID()}`]: {
                    name: 'Sugar',
                    price: 0.0
                },
                [`${generatePushID()}`]: {
                    name: 'Milk',
                    price: 0.0
                },
            }
        }
    }
})();

const createDatabase = (function () {
    return function () {
        return {
            businesses: {
                [`${generatePushID()}`]: createBusiness(),
                [`${generatePushID()}`]: createBusiness(),
                [`${generatePushID()}`]: createBusiness(),
                [`${generatePushID()}`]: createBusiness(),
                [`${generatePushID()}`]: createBusiness(),
                [`${generatePushID()}`]: createBusiness(),
                [`${generatePushID()}`]: createBusiness(),
                [`${generatePushID()}`]: createBusiness(),
                [`${generatePushID()}`]: createBusiness(),
                [`${generatePushID()}`]: createBusiness(),
            }
        }
    }
})();

//console.log(JSON.stringify(createDatabase(), null, 2));

let db = {
    businesses: {
        [`${generatePushID()}`]: createBusiness(),
        [`${generatePushID()}`]: createBusiness(),
    }
};

const R = require('ramda');

//let x = R.map(x => R.assoc('id', x, businesses[x]), R.keys(businesses));

let objectToArray = R.curry(obj => R.map(x => R.assoc('id', x, obj[x]), R.keys(obj)));
let propToArray = R.curry((prop, arr) => R.map(x => R.evolve({[`${prop}`]: y => objectToArray(y)}, x), arr));

//let x = R.map(x => R.evolve({offers: y=>objectToArray(y)}, x), objectToArray(businesses));

//let x = propToArray('offers', objectToArray(businesses));

//let x = objectToArray(businesses);


// const transform = (transformations, obj) => {
//     R.forEachObjIndexed((value, key) => {
//         obj[key] = objectToArray(obj[key]);
//         obj[key] = R.map(p => transform(value, p), obj[key]);
//     }, transformations);
//     return obj;
// };
//
// transform({
//     businesses: {
//         offers: {
//             variations: true,
//             extras: true
//         }
//     }
// }, db);
//
// console.log(JSON.stringify(db, null, 2));

// const businessTransformation = {
//     businesses: objectToArray
// };
//
// let x = R.evolve(businessTransformation, db);
//
// console.log(JSON.stringify(x, null, 2));

// let arr = [{a:1}, {b:2}];
// let obj = {arr: arr};
// let x = R.evolve({arr: R.map(R.assoc('x', 5))}, obj);
// console.log(JSON.stringify(x, null, 2))

const haversine = (function () {

    // convert to radians
    let toRad = function (num) {
        return num * Math.PI / 180
    }

    return function haversine (start, end, options) {
        options   = options || {}

        let radii = {
            km:    6371,
            mile:  3960,
            meter: 6371000,
            nmi:   3440
        }

        let R = options.unit in radii
            ? radii[options.unit]
            : radii.km

        let dLat = toRad(end.latitude - start.latitude)
        let dLon = toRad(end.longitude - start.longitude)
        let lat1 = toRad(start.latitude)
        let lat2 = toRad(end.latitude)

        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2)
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

        if (options.threshold) {
            return options.threshold > (R * c)
        }

        return R * c
    }

})();

const start = {
    latitude: -36.846889,
    longitude: 174.773955
}

const end = {
    latitude: -36.845429,
    longitude: 174.773322
}

console.log(haversine(start, end, {unit: 'meter'}))
