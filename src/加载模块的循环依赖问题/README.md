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
  4. bar.js 执行完毕, 将执行权交回 foo.js,
  5. foo.js 从require 语句继续向下执行, 直至流程结束.

## ES6 Module中的循环依赖
我们使用 ES6 Module 重写上面例子, 再执行 看能不能解决这个问题
```js
// foo.js
import bar from './bar.js'
console.log('value of bar: ', bar);

export default 'This is foo.js'

// bar.js
import foo from './foo.js'
console.log('value of foo: ', foo);

export default 'This is bar.js'

// index.js
import  foo from './foo.js'

// node index.js
// output:
// ReferenceError: Cannot access 'foo' before initialization
```
可以看到, 直接报错了: **在初始化之前无法访问“foo”**

## 如何利用 ES6 Module的特性支持循环依赖?
```js
// foo.js
import bar from './bar.js'

function foo(invoker) {
  console.log(invoker + ' invoker foo.js');
  bar('foo.js')
}

export default foo

// bar.js
import foo from './foo.js'

let invoked = false

function bar(invoker) {
  if (!invoked) {
    invoked = true
    console.log(invoker + ' invoker bar.js');
    foo('bar.js')
  }
}

export default bar

// index.js
import foo from './foo.js'

foo('index.js')

// output:
// index.js invoker foo.js
// foo.js invoker bar.js
// bar.js invoker foo.js
```
### 流程解析
  1. index.js 作为入口导入了 foo.js, 此时开始执行 foo.js中的代码.
  2. 从foo.js 导入了 bar.js, 这执行权交给了 bar.js.
  3. 在 bar.js 中一直执行到其结束, 完成了 bar 函数的定义. 注意: **由于此时 foo.js 还没有执行完, 所以 foo 的值现在还是 undefined**.
  4. 执行权回到 foo.js 继续执行直到结束, 完成 foo 函数的定义. **`由于ES6 Module 动态映射的特性, 此时在 bar.js中的 foo 值 已经从 undefined 成为了我们定义的函数`**, 这是和CommonJS在解决循环依赖的是有本质区别的.
  5. 执行权回到 index.js 并调用 foo 函数, 依次执行 foo → bar → foo.