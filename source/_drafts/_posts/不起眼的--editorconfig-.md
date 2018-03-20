---
title: 不起眼的--editorconfig
date: 2018-03-18 21:23:05
categories:
- 工具
tags:
- editorconfig
---

> 还是在看别人 github 上项目的时候，看到好多项目目录下都会有个 .editorconfig  文件，起初看里面内容有个 md 的字符，还以为就 markdown 文件的配置来，后来有一次在 Webstorm 里配置一个 tab 键占几个空格时又发现了这个配置文件，这次细细查询了一番，感觉不起眼的 .editorconfig 还是颇有用处的。

# 一、为什么要用 .editorconfig ？

在多人合作的项目中，每个人的开发习惯是不同的。以缩进来说，有的人习惯使用 space 键来进行缩进，有的人喜欢用 tab 键，有的人喜欢设置缩进为 4 个空格，有的人喜欢设置为 2 个空格。这样产生的后果就是每个人修改后的代码在格式上总是不统一的，那么提交到 git 上就会代码风格不一致，变得丑陋无比。

在此之前，我一直使用 Eslint 做代码 lint，那么为什么还要使用 .editorconfig 呢？细细想了下，应该有两个方面吧。
- Eslint 确实包含 .editorconfig 中的一些属性，如缩进等，但并不全部包含，如 .editorconfig 中的 `insert_final_newline` 属性 Eslint 就没有。Eslint 更偏向于对语法的提示，如定义了一个变量但是没有使用时应该给予提醒。而 .editorconfig 更偏向于代码风格，如缩进等。

- Eslint 仅仅支持对 js 文件的校验，而 .editorconfig 不光可以检验 js 文件的代码风格，还可以对 .py（python 文件）、.md（markdown 文件）进行代码风格控制。

总结：根据项目需要，Eslint 和 .editorconfig 并不冲突，同时配合使用可以使代码风格更加优雅。

# 二、使用  .editorconfig

### 1. 示例 .editorconfig 文件
通用的 .editorconfig 配置文件一般如下所示：
```
# http://editorconfig.org
root = true

[*]
#缩进风格：空格
indent_style = space
#缩进大小2
indent_size = 2
#换行符lf
end_of_line = lf
#字符集utf-8
charset = utf-8
#是否删除行尾的空格
trim_trailing_whitespace = true
#是否在文件的最后插入一个空行
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```
在上面配置文件中：
- 第一行 `http://editorconfig.org` 是 Editorconfig 的官方网站；
- 第二行 `root = true` 控制 .editorconfig 是否生效的字段；
- 其它字段应该注意的有 `indent_size` 和 `charset`，如果想要了解更多，参阅：[.editorconfig 配置文件字段详解](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties) 。

测试是否可用：

在项目的 js 文件中使用 tab 键进行缩进，分别修改 indent_size 属性值为 2 和 4，观察是否有变化。如果没有任何变化，说明还没有安装 Editorconfig 插件。

### 2. Editorconfig 插件

该插件的作用是告诉开发工具，如 Webstorm 自动去读取项目根目录下的 `.editorconfig` 配置文件，如果没有安装这个插件，光有一个配置文件是无法生效的。Webstorm 2017.1 版本之后都是自动安装这个插件的。

如果你的 Webstorm 没有安装这个插件，参阅：[Webstorm 安装 Editorconfig 插件](http://www.jianshu.com/p/4ce97b360c13)。
