const R = require('ramda');

const state = {
    orders: {
        one: 'Bernd'
    }
};

let item = 'Item';
let newState = state;
if(!state.orders.hasOwnProperty('two')) {
    newState = R.assocPath(['orders', 'two'], {deal: 5, items: []}, state);
}
newState = R.evolve({
    orders: {
        two: o => R.assoc('items', R.append(item, o.items), o)
    }
}, newState);




if(!newState.orders.hasOwnProperty('two')) {
    newState = R.assocPath(['orders', 'two'], {deal: 5, items: []}, state);
}
newState = R.evolve({
    orders: {
        two: o => R.assoc('items', R.append(item, o.items), o)
    }
}, newState);



console.log(JSON.stringify(newState, null, 2));