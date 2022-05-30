import lodash from 'lodash'

var object = {
    a: [{ b: { c: 'bar.js' } }]
};

console.log(lodash.get(object, 'a[0].b.c'));

export function add(a, b) {
    return a + b
}