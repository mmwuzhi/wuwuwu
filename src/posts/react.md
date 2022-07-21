---
title: react笔记
date: '2022-04-21'
update: '2022-06-25'
---

## `useState`

会有人直接 state.value = hoge, 所以如果 state 在 set 之后不知道为啥和 set 的值变得不一样的话, 八成就是因为这个了

```jsx
// prevState
const [state, setState] = useState([
  { key: 'a', value: [111] },
  { key: 'b', value: [222] },
])
// filteredData
const filteredData = state.filter((data) => data.key !== 'b') // [{key:'a', value: [111]}]
// addData
const addData = [{ key: 'b', value: [333] }]
// mergedData
const mergedData = [...filteredData, ...addData] // [{key:'a', value: [111]}, {key:'b', value: [333]}]
setState(mergedData)
// 结果最后setState完了之后state里面的key: 'b'的value还是之前的[222]
console.log(tate) // [{key:'a', value: [111]}, {key:'b', value: [222]}]
// 原因就是因为在setState执行之后, 其他地方直接修改了state, 导致渲染后的state还是之前的里面的key: 'b'的value还是之前的[222]
const targetState = state.find((item) => item.key === 'b')
targetState.value = [222]
```

通过执行回调函数更改 state 的时候, 有一种特殊情况会导致回调函数虽然执行了但是 state 没有更改成功

```jsx
function Component1({ loading }) {
  // loading的值从false变成true再变回false变化的时候会使Form被卸载之后再渲染
  // 导致Form组件内部的state被重置
  // 如果在Form里面义了更改Form的state用的回调函数 并且在别的组件使用了这个回调函数的话
  // 回调函数会被执行 但是state不会被更改(因为要更改的state所在的组件已经被卸载掉了)
  return <>{loading ? <></> : <Form />}</>
}
```

遇到这种情况的话, 可以考虑以下写法

```jsx
function Component2({ loading }) {
  // 如果想让组件在loading为true的时候也不被卸载的话可以用style
  return <Form style={{ display: loading ? 'none' : 'flex' }} />
}
```

## `useRef`

定义 ref 的时候初始值设置为`null`的话会被认为是只读 ref

```ts
const elementRef = useRef<string>(null)
elementRef.current = 'hoge' // 报错ts2540
```

原理是用了函数重载，当传入的泛型参数 `T` 不包含 `null` 时返回`RefObject<T>`，当包含 `null` 时将返回 `MutableRefObject<T>`, 而`RefObject<T>`的 current 为只读

```ts
function useRef<T>(initialValue: T): MutableRefObject<T>
function useRef<T>(initialValue: T | null): RefObject<T>
interface RefObject<T> {
  readonly current: T | null
}
interface MutableRefObject<T> {
  current: T
}
```

所以如果想让 ref 是可修改的话, 需要加上`| null`

```ts
const elementRef = useRef<string | null>(null)
elementRef.current = 'hoge' // 不报错
```

## `useMemo`

1. 缓存的是值
2. 第一个参数是需要缓存的值或者是计算后再返回值的函数

## `useCallback`

1. 缓存的是函数
2. 第一个参数是需要缓存的函数
3. `useCallback`不是为了节省创建函数的开销，而是为了不使函数发生变化以导致渲染开销大的组件重新渲染
4. 就算用`useCallback`，子组件不用`React.memo`的话就还是无法避免重新渲染
5. `useState`的`setState`被 callback 化了，所以加不加到依赖数组里面都不会影响渲染

## 性能优化

1. 本质: 将**变的部分**与**不变的部分**分离
   1. props
   1. `const A = () => {}` 这样的没有 props, state, context 的组件 其实是有 props 的 这个 props 是 `{}` 所以在对比 props 的时候会 `{} !== {}` 导致 rerender
   1. 这种没有 props 的组件的父组件渲染的时候 会重新创建一个 props 所以会导致 `{} !== {}` 导致 rerender
   1. state
   1. context
2. 当父组件满足性能优化条件 子孙组件**可能**命中性能优化
3. 返回值不变的时候会自动优化

## `React.memo()`

1. 用了这个之后 对比 props 的时候会用**浅比较**(比较对象中的元素)而不是**全等比较**

## Custom Hook

- 返回数组的时候用`as const`可以使返回类型不会成为联合类型的数组而是元组, 这样的话在结构的时候 ts 可以根据解构位置推断出来正确的类型
- 不过 React 团队建议返回值为 2 个以上的 Custom Hook 应该使用对象`{}`而不是数组`[]`

```ts
import { useState } from 'react'

export function useLoading() {
  const [isLoading, setState] = useState(false)
  const load = (aPromise: Promise<any>) => {
    setState(true)
    return aPromise.finally(() => setState(false))
  }
  return [isLoading, load] as const // 推断为类型为[boolean, typeof load]的元组而不是为联合类型(boolean | typeof load)的数组(boolean | typeof load)[]
}
```

## props type

### `React.ComponentProps`

可以使用内置的泛型工具直接获取 props 的类型, 这样获取到的 props 的类型是真实的类型声明, 而使用 library 导出的类型声明有时候是不完整的(比如有的会缺少`children`)

```ts
import React from 'react'
import { AnyComponent } from 'any-library'

type AnyComponentProps = React.ComponentProps<typeof AnyComponent>
```

源码

```ts
type ComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
  T extends JSXElementConstructor<infer P>
    ? P
    : T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : {}
```

### `React.ComponentRef`

同样也有可以获取 ref 类型的泛型工具

```ts
import React from 'react'
import { AnyRefComponent } from 'any-library'

type AnyComponentRef = React.ComponentRef<typeof AnyRefComponent>
```

源码

```ts
type ComponentRef<T extends ElementType> = T extends NamedExoticComponent<
  ComponentPropsWithoutRef<T> & RefAttributes<infer Method>
>
  ? Method
  : ComponentPropsWithRef<T> extends RefAttributes<infer Method>
  ? Method
  : never
```

## QA

1. Q: function 组件和箭头函数组件

   A: 箭头函数可以很简单地写 React.memo() 也可以很简单地用 React.FC 或者 NextPage 来约束类型

## 包

**[click-to-react-component](https://github.com/ericclemmons/click-to-component)**

可以给调试模式增加一个按住 alt(option)键选中组件跳转至代码的功能,并且开箱即用

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// import click-to-react-component
import { ClickToComponent } from 'click-to-react-component'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    // 这里加上这行代码就搞定了!
    <ClickToComponent />
    <App />
  </React.StrictMode>,
)
```

**[copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard)**

复制文本到剪贴板组件

```js
// react-copy-to-clipboard
<CopyToClipboard onCopy={this.onCopy} text={this.state.value}>
  <button onClick={this.onClick}>复制</button>
</CopyToClipboard>
```
