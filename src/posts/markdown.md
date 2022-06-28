---
title: markdown常用语法
date: '2022-06-27'
---

## 链接

```md
[这是链接显示的文字](https://github.com/ "这是 title”)
```

会被转换为

```html
<a href="https://github.com/" title="这是title">这是链接显示的文字</a>
```

本机资源的话 link 的地方可以用相对路径替代

```md
[本地链接](/local-link)
```

或者可以用参考式链接

```md
<!-- 标签忽略大小写 所以url和URL效果是一样的 -->

[参考链接][url]

<!-- 定义链接可以放在任意位置 -->
<!-- 冒号之后一定要有至少一个空格 -->
<!-- 后面的形式就和普通的链接的括号里面的部分一样了 -->

[url]: http://sample.com/ '参考链接'
```

或者可以用隐式链接标记(省略第二个方括号的内容)

```md
[隐式标记][]

<!-- 此时定义的文字就和第一个方括号内的文字一样了 -->

[隐式标记]: https://abc.xyz/ 'AlphaBet'
```

## 页内跳转

定义一个锚

```md
<span id="jump">跳转到的地方</span>
```

在想实现跳转的地方用 markdown 的语法带上锚的 id

```md
[点击跳转](#jump)
```