---
title: JavaScript笔记
date: '2022-06-04'
---

## `Array.prototype.forEach`

forEach 一定有<span id="foreach">副作用</span>(影响外界), 并且没有返回值, 所以适合做有副作用的事情(反之没有副作用的事情交给 map, filter, reduce 这些)

```js
const persons = [
  { name: 'John', age: 28 },
  { name: 'Sam', age: 17 },
  { name: 'Jane', age: 27 },
]
const personAges = {}
persons.forEach((item) => {
  // 这里产生了副作用(影响了外界的personAges)
  personAges[item.name] = age
})
```

## `Array.prototype.reduce`

最基础的用法是计算数组里所有元素的和

```js
// 用来计算的数组
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
// 初始值
const initialValue = 0
const sum = array.reduce((total, current) => total + current, initialValue)
```

优点是可以利用上一轮计算的结果来进行这一轮的计算

```js
const str = '123456789'
// 千位分隔
const thousandsSeparator = (str) => {
  // 将数组倒序
  const ret = Array.from(str)
    .reverse()
    .reduce((result, next, i, arr) => {
      // 向result添加当前数字, 并且高位以外每隔3位数添加一个分隔符
      if ((i + 1) % 3 === 0 && i + 1 !== arr.length) {
        result.push(next, ',')
        return result
      }
      result.push(next)
      return result
    }, [])
  // 将倒过来得数组再倒序一次变为正确得顺序并且转化为字符串
  return ret.reverse().join('')
}
```

而且只需要输入是数组, 输出可以是任何类型, 并且不会产生[副作用](#foreach)

```js
const persons = [
  { name: 'John', age: 28 },
  { name: 'Sam', age: 17 },
  { name: 'Jane', age: 27 },
]
// 输出key为name, value为年龄的对象
const personAges = persons.reduce((result, curr) => ({ ...result, [curr.name]: curr.age }), {})
```

当 map 和 filter 都需要用的时候，用 reduce 可以减少一遍循环

```js
const persons = [
  { name: 'John', age: 28 },
  { name: 'Sam', age: 17 },
  { name: 'Jane', age: 17 },
]
// 获取age为17的元素的name的list
//  filter + map
const age17PersonList = persons.filter((item) => item.age === 17).map((item) => item.name)
// reduce
const age17PersonList = persons.reduce(
  (result, curr) => (curr.age === 17 ? [...result, curr.name] : result),
  [],
)
```

因为可以利用上一轮的结果进行这一轮的计算, 所以可以很简单地实现 compose 和 pipe

```js
// 执行顺序: 左 -> 右
const pipe =
  (...args) =>
  (param) =>
    args.reduce((result, fn) => fn(result), param)
// 执行顺序: 左 <- 右
const compose =
  (...args) =>
  (param) =>
    args.reduceRight((result, fn) => fn(result), param)

const add1 = (num) => num + 1
const multiply2 = (num) => num * 2

// 结果为 (2 + 1) * 2 = 6
const resultPipe = pipe(add1, multiply2)(2)
// 结果为 (2 * 2) + 1 = 5
const resultCompose = compose(add1, multiply2)(2)
```

## Tips

- 好的代码是规避[副作用][]的
- 如果每次迭代包含了太多操作，将它们拆分到不同的函数中。

[副作用]: https://zh.m.wikipedia.org/zh-hans/%E5%89%AF%E4%BD%9C%E7%94%A8_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6)
