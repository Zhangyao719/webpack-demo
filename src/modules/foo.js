import lodash from 'lodash'
import './bar.js'

var object = {
    a: [{ b: { c: 'foo.js' } }]
};

console.log(lodash.get(object, 'a[0].b.c'));

