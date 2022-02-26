import bar from './bar.js'

function foo(invoker) {
  console.log(invoker + ' invoker foo.js');
  bar('foo.js')
}

export default foo