---
title: git常用命令
date: '2022-04-21'
---

## 基础

在 Git 中，用 HEAD 表示当前分支&&版本

所以上一个版本就是 HEAD^, 上上一个版本就是 HEAD^^, 上 n 个版本的话也可以 HEAD~n

## 版本操作

### 回退到上一个版本

```bash
git reset --hard HEAD^
```

### 回退到指定版本

```bash
git reset --hard <commit id>
```

### 回退远程版本

```bash
# 带上-u 参数其实就相当于记录了push到远端分支的默认值
# 这样当下次我们还想要继续push的这个远端分支的时候
# 推送命令就可以简写成git push即可
git push -u origin master -f
```

## 分支相关

### 切换分支

```bash
git switch <name>
# or
git checkout <name>
```

### 创建并切换分支

```bash
git switch -c <name>
# or
git checkout -b <name>
```

因为 git checkout 不仅仅只可以操作分支, 甚至还可以[操作文件](#file), 所以尽量不要用 git checkout 来操作分支(会很危险)

### 合并指定分支到当前分支

```bash
git merge <name>
```

合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而 fast forward 合并就看不出来曾经做过合并

### 删除本地分支

```bash
# 参数为-D 则为强制删除
git branch -d
```

### 删除远程分支

```bash
git push origin --delete <name>
```

删除远程仓库的叫 name 的分支，同名的本地分支并不会被删除，所以还需要单独删除本地同名分支

### 重命名分支

```bash
git branch -m <oldName> <newName>
```

### 强制 push

```bash
git push -f origin
```

## <span id="file">操作文件</span>

### 恢复暂存区的指定文件到工作区

```bash
# -- 是可选参数
# 用于指定后面跟着的参数只是文件路径, 而不是branch分支名或者commit信息
git checkout HEAD [--] <file>
```

### 恢复某个 commit 的指定文件到暂存区和工作区

```bash
git checkout <commit> <file>
```

### 恢复暂存区的所有文件到工作区

```bash
git checkout .
```

## 团队合作

各自在各自分支写代码, 写完之后往 dev 分支上合并

发布的时候再把 dev 分支合并到 master 分支上就可以了
![图片](/image/team-work.png)
