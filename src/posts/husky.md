---
title: husky + lint-staged + commit-lint配置
date: '2022-04-25'
---

## 安装

1. husky

   ```bash
   yarn add husky -D
   ```

2. lint-staged (eslint, prettier)

   ```bash
   yarn add lint-staged -D
   ```

3. commitlint (commit message)
   ```bash
   yarn add @commitlint/config-conventional @commitlint/cli -D
   ```

## 配置

1. husky

   - 在`package.json`中增加命令
     - `npm set-script prepare "husky install"`
     - 或者直接把`"prepare: "husky install""`复制粘贴到`"script"`里面
   - 执行`npm run prepare` (自动生成`.husky`文件夹)
   - 在`.husky`下添加文件

     - `pre-commit` (check code style)

       - `npx husky add .husky/pre-commit "npx lint-staged --allow-empty $1"`
       - 或者直接创建`pre-commit`文件并复制粘贴以下内容

         ```bash
         #!/bin/sh
         . "$(dirname "$0")/_/husky.sh"

         npx lint-staged --allow-empty
         ```

     - `commit-msg` (check commit message)

       - `npx husky add .husky/commit-msg "npx commitlint --edit $1"`
       - 或者直接创建`commit-msg`文件并复制粘贴以下内容

         ```bash
         #!/bin/sh
         . "$(dirname "$0")/_/husky.sh"

         npx commitlint --edit
         ```

2. lint-staged

   - 在`package.json`文件中增加配置 (根据需求自己改)

     ```json
     "lint-staged": {
       "*.{js,ts,tsx}": [
         "eslint",
         "prettier --write"
       ],
       "*.{ts,tsx}": [
         "bash -c 'yarn type-check'"
       ],
       "*.{yml,yaml,json,css,scss,md}": [
         "prettier --write"
       ]
     }
     ```

     > **注**: 这里要注意，如果想用 tsc 检查 ts 的语法错误的话，需要在`"script"`里面加上下面这句
     >
     > ```json
     > "type-check": "tsc"
     > ```
     >
     > 这是因为如果像这样
     >
     > ```json
     > "*.{ts,tsx}": [
     >     "tsc"
     > ],
     > ```
     >
     > 直接用 lint-staged 调用的话，会导致`tsc`忽略掉`tsconfig.json`, 引发比如代码被编译导致 commit 失败
     >
     > **参考**: [husky+lint-staged で tsc するときに tsconfig.json が無視されてしまう時の対応](https://qiita.com/rpf-nob/items/454ff6cf135cee3dcab4)

3. commit-lint
   - 在根目录添加`commitlint.config.js`文件并且复制粘贴以下内容 (根据需求自己改)
     ```js
     module.exports = {
       extends: ['@commitlint/config-conventional'],
       rules: {
         'type-enum': [
           2,
           'always',
           [
             'build',
             'perf', // 优化相关，比如提升性能、体验
             'bug', // 此项特别针对bug号，用于向测试反馈bug列表的bug修改情况
             'feat', // 新功能（feature）
             'fix', // 修补bug
             'docs', // 文档（documentation）
             'style', // 格式（不影响代码运行的变动）
             'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
             'test', // 增加测试
             'chore', // library、构建过程或辅助工具的变动
             'revert', // feat(pencil): add ‘graphiteWidth’ option (撤销之前的commit)
             'merge', // 合并分支， 例如： merge（前端页面）： feature-xxxx修改线程地址
           ],
         ],
         'type-case': [0],
         'type-empty': [0],
         'scope-empty': [0],
         'scope-case': [0],
         'subject-full-stop': [0],
         'subject-case': [0, 'never'],
         'header-max-length': [0, 'always', 50],
         'body-max-line-length': [0, 'always', 72],
       },
     }
     ```

## 测试

1. 用不符合标准的文件和 commit message 提交一下试试能不能正常运行
