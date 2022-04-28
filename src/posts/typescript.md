---
title: TypeScript笔记
date: '2022-04-29'
---

## 接口

- 接口可以定义很多次，所有定义的接口最终被自动合并为单个接口

```ts
interface Person {
  name: string
}
interface Person {
  age: number
}
const person: Person = { name: 'Tom', age: 20 }
```

- 为什么尽量用接口呢，因为接口更符合 js 的对象的工作方式

```ts
// 接口扩展
interface Sister {
  sex: number
}
// 报错 因为 'string'无法分配给'number' 所以接口无法扩展
interface SisterAn extends Sister {
  sex: string
}

// 交叉类型
type Sister1 = {
  sex: number
}
type Sister2 = {
  sex: string
}
// 不报错 因为SisterAn的类型为 'number & string' 也就是'never'
type SisterAn = Sister1 & Sister2
```

## 属性名

- 可以用**索引签名**添加指定类型的 key

```ts
type Person = {
  name: string
  age: number
  // 任意字符串都可以作为key value的类型为any
  [key: string]: any
}
```

- 但是如果用了**索引签名**的话，所有确定属性都必须是**索引签名**定义的类型的子集

```ts
type Person = {
  // 报错(ts2411) 'name'的类型‘string’无法分配给索引类型的类型'number'
  name: string
  age: number
  [key: string]: number
}
```

- 如果想让**确定属性**和**可选属性**(索引签名)互不冲突的话，可以使用交叉类型&(只支持类型别名`type`)

```ts
type Person = {
  name: string
  age: number
} & {
  [key: string]: number
}
// 这样做虽然可以用于从某些地方获取的js对象, 但是无法用这个创建一个新对象
const fn = (person: Person) => {
  // 比如这样做会正常报错 告诉你test只可能是一个number
  if (person.test === 'test') {
    return person.name
  }
}
// 但是这样就不行 会告诉你'{ name: string; age: number; }'无法分配给'{ [key: string]: number; }'
const personTom: Person = {
  name: 'Tom',
  age: 1,
}
// 当然不是不可以解决这个问题 实在不行还可以断言是吧(
const personJerry = {
  name: 'Jerry',
  age: 2,
} as Person
```

## in

- 可以用来遍历枚举类型

```ts
type Keys = 'a' | 'b' | 'c'

// 这里必须用type定义 用interface定义的话会导致报错(ts7061)
type Obj = {
  [key in Keys]: string
}
// 等于
type Obj = {
  a: string
  b: string
  c: string
}
```
