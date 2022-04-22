---
title: git常用命令
date: '2022-04-21'
---

## ```git switch``` 和 ```git checkout```
1. ```git switch```一般都可以代替```git checkout```
2. ```git switch -c``` === ```git checkout -b```

## 分支相关
1. 删除本地分支
   >```git branch -d``` ：参数为-D则为强制删除。
2. 删除远程分支
   >```git push origin --delete``` : 删除远程仓库的叫name的分支，同名的本地分支并不会被删除，所以还需要单独删除本地同名分支
3. ```git branch -m oldName newName``` : 重命名分支
4. ```git push -f origin``` : 强制push