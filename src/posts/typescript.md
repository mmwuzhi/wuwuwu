---
title: TypeScript笔记
date: '2022-04-29'
---

## `/// <reference types="..." />`

写在 d.ts 最顶端, 相当于导入指定 library 的声明文件

```ts
// index.d.ts
/// <reference types="@reduxjs/toolkit/query/react"/>
```

没有写 reference 的时候, 输入 createApi 也不会出现自动补全和自动导入
因为@reduxjs/toolkit/query/react 里面虽然存在 d.ts 但是没有在 library 的 package.json 里面指定的 dist/index.d.ts 里面导出, 所以 ts 的编译器无法自动识别@reduxjs/toolkit/query/react 的 d.ts 文件
写了 reference 之后 ts 就知道要识别指定 library 的声明文件了, 所以就可以自动补全和自动导入了

```ts
// 业务逻辑ts文件
import { createApi } from '@reduxjs/toolkit/dist/query/react'

export const userApi = createApi
```

## ?

在 key 后面的`?`表示此类型可为`undefined`, 在类型前面的`?`表示此类型可为`null`

```ts
interface Person {
  // name的类型为string
  name: string
  // sex的类型为'm'或者'f'或者undefined
  sex?: 'm' | 'f'
  // address的类型为string或者null
  address: ?string
  // tel的类型为number或者undefined或者null
  tel?: ?number
}
```

在 key 后面的`-?`表示删除类型 key 后面的的`?`

```ts
type NonUndefined<T> = {
  [key in keyof T]-?: T[key]
}

interface Mail {
  gmail?: string
  outlook: string | undefined
  yahoo?: string | undefined
  iCould: string
}
type NonUndefinedMail = NonUndefined<Mail>
// 生成的类型如下
type NonUndefinedMail = {
  // 单纯的key后面加问号的undefined被去掉了
  gmail: string
  // 联合类型的undefined没有被去掉
  outlook: string | undefined
  // key后面加问号并且联合类型中有undefined的也被去掉了
  yahoo: string
  // 本来就是string的还是string
  iCould: string
}
```

说明类型后面的?和联合类型的`undefined`还是有区别的, 联合类型的 undefined 是说这个属性的值可以是`undefined`, 但是 key 如果没有加问号的话这个 key 还是必须存在的; 而 key 后面的问号既可以说这个属性是可选的, 又可以说明这个属性的值可以是`undefined`, 并且如果这个属性的类型被定义了联合类型的`undefined`的话, key 后面的`?`会将联合类型的`undefined`的效果覆盖掉

所以使用的时候最好还是不要一块用, 还是要分工明确, 可选属性不管想不想给类型加上`undefined`都只用 key 后面加`?`; 不想让属性变成可选, 只是想加上`undefined`, 那就用联合类型, 不要图省事只给 Key 后面加`?`

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

## 常用工具类

### `Partial<T>`

将泛型中全部属性变为可选

```ts
type Partial<T> = {
  [key in keyof T]?: T[P]
}
```

### `Record<K, T>`

快速定义对象

```ts
type Record<K extends keyof any, T> = {
  [key in K]: T
}
```

### `Pick<T, K>`

将 T 类型中的 K 键列表提取出来，生成新的子键值对类型

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

### `Extract<T, U>`

从 T 中提取出 U

```ts
type Extract<T, U> = T extends U ? T : never
```

### `Exclude<T, U>`

去除联合类型 T 中的 U 类型

```ts
type Exclude<T, U> = T extends U ? never : T
```

### `Omit<T, K>`

去除类型 T 中包含 K 的键值对

```ts
type Omit = Pick<T, Exclude<keyof T, K>>
```

### `ReturnType<T>`

获取 T 类型(函数)对应的返回值类型

```ts
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
// 等于
type ReturnType<T extends func> = T extends () => infer R ? R : any
```

### `Required<T>`

将类型 T 中所有的属性变为必选项

```ts
type Required<T> = {
  [P in keyof T]-?: T[P]
}
```

### `NonNullable<T>`

过滤掉联合类型中的 null 和 undefined 类型

```ts
type NonNullable<T> = T extends null | undefined ? never : T
```

### `Parameters<T>`

获取函数的全部参数类型，以**元组类型**返回

```ts
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
```

## 模式匹配

Typescript 类型的模式匹配是通过 extends 对类型参数做匹配，结果保存到通过 infer 声明的局部类型变量里，如果匹配就能从该局部变量里拿到提取出的类型

- 数组

```ts
type Pop<T extends unknown[]> = T extends [...infer Rest, infer R] ? Rest : never

// res = [1, 2]
type res = Pop<[1, 2, 'a']>
```

- 递归实现字符串去行尾空格以及换行符

```ts
type TrimRight<Str extends string> = Str extends `${infer Rest}${' ' | '\t' | '\n'}`
  ? TrimRight<Rest>
  : Str

// trimStr = 'abc
type trimStr = TrimRight<`abc


\n    \n`>
```

- 替换字符串中的一部分(replace)

```ts
type Replace<
  Str extends string,
  From extends string,
  To extends string,
> = Str extends `${infer Left}${From}${infer Right}` ? `${Left}${To}${Right}` : Str

// res = 'My father is Tom'
type res = Replace<'My name is Tom', 'name', 'father'>
```

- 获取函数的参数类型(返回数组)

```ts
type GetParams<Fn extends Function> = Fn extends (...prams: infer Params) => void ? Params : never

// res = [a: number, b: boolean]
type res = GetParams<(a: number, b: boolean) => string>
```
