# 加载模块的循环依赖问题

## CommonJS中的循环依赖

```js
// foo.js
const bar = require('./bar')
console.log('value of bar: ', bar)

module.exports = 'This is foo.js'

// bar.js
const foo = require('./foo')
console.log('value of foo: ', foo)

module.exports = 'This is bar.js'

// index.js
require('./foo')

// node index.js
// output:
'value of foo:  {}'
'value of bar:  This is bar.js'
```

### 为什么foo的值会是一个空对象呢?
  1. index.js 导入了 foo.js, 此时开始执行 foo.js中的代码.
  2. foo.js 的第一句导入了 bar.js, 这时 foo.js 不会继续向下执行, 而是进入了 bar.js内部.
  3. 在 bar.js 中, 又对 foo.js 进行了 require, 这里产生了**循环依赖**. 需要注意的是, **执行权并不会再交回 foo.js, 而是直接取其导出的值, 也就是 module.exports. 但由于 foo.js 未执行完毕, 导出值在这时为默认的空对象**, 因此当 bar.js 执行到打印语句时, value of foo 就是一个空对象.

