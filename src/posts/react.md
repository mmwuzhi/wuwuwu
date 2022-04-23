---
title: react笔记
date: '2022-04-21'
---

## `useMemo`
1. 缓存的是值
2. 第一个参数是需要缓存的值或者是计算后再返回值的函数

## `useCallback`
1. 缓存的是函数
2. 第一个参数是需要缓存的函数
3. `useCallback`不是为了节省创建函数的开销，而是为了不使函数发生变化以导致渲染开销大的组件重新渲染
4. 就算用`useCallback`，子组件不用`React.memo`的话就还是无法避免重新渲染
5. `useState`的`setState`被callback化了，所以加不加到依赖数组里面都不会影响渲染

## 性能优化
1. 本质: 将**变的部分**与**不变的部分**分离
   1. props
     1. `const A = () => {}` 这样的没有props, state, context的组件 其实是有props的 这个props是 `{}` 所以在对比props的时候会 `{} !== {}` 导致rerender
     2. 这种没有props的组件的父组件渲染的时候 会重新创建一个props 所以会导致  `{} !== {}` 导致rerender
   2. state
   3. context
2. 当父组件满足性能优化条件 子孙组件**可能**命中性能优化
3. 返回值不变的时候会自动优化

## `React.memo()`
1. 用了这个之后 对比props的时候会用**浅比较**(比较对象中的元素)而不是**全等比较**

## QA
1. Q: function组件和箭头函数组件

   A: 箭头函数可以很简单的写React.memo()