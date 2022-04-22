---
title: react笔记
date: '2022-04-21'
---

## useCallback
1. ```useCallback```不是为了节省创建函数的开销，而是为了不使函数发生变化以导致渲染开销大的组件重新渲染
2. 就算用了```useCallback```，子组件不用```React.memo```的话就还是无法避免重新渲染
3. ```useState```的```setState```被callback化了，所以加不加到依赖数组里面都不会影响渲染
