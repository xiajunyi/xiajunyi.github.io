---
title: Babel 学习笔记
date: 2018-03-18 21:23:05
categories:
- 工具
tags:
- babel
---

> 在 Github 上 Fork 了别人的代码，在 package.json 中看到了很多与 Babel 有关的包，很是不解他们之间的关系。本文为 Babel 学习过程中记录的笔记，（建议直接去 [Babel 官网](http://babeljs.cn/) 学习）主要内容如下：
> - 记录 Babel 的基本使用方法；
> - 几个最初让我比较混淆的包的含义以及用法。

# 一、事件驱动

在项目中使用 ES6 语法，并可以通过 Babel 将 ES6 代码转换为 ES5 的代码，然后真正运行的是 ES5 代码的文件。

# 二、转码器与编译器

C语言在计算机里运行，计算机只能识别二进制数据（0和1组成的一系列数据）,在运行前需要先使用**编译器**将代码编译成二进制数据，这个过程叫做编译。

JS 在浏览器中运行，浏览器可以识别 ES5（JS 的某个版本） 语法的 JS，而 ES6 （JS 新出的一个版本，还没有被所有浏览器提供支持）语法使用起来更加精简，我们在写代码的时候通常使用 ES6 语法，之后使用 **Babel 转码器** 将 ES6 代码转换为 ES5 代码。由于转码前后都是 JS 这一语言，只是进行版本上的写法不同，这个过程就叫做转码。

# 三、使用 Babel

- 新建空白文件夹 `babel-demo`

    目录结构如下：
    
    ```
    - babel-demo 
        + package.json
        + index.js
    ```

- 安装依赖包

    ```
    $ npm install --save-dev babel-cli babel-preset-env
    ```
    
    - `babel-cli`  Babel 的命令行工具依赖包；在 Babel 上一个版本，命令行工具还是使用 `babel` 这个包，不过在新版本中将 `babel` 这个包一分为二变成了 `babel-cli` 包和 `babel-core` 包。
    - `babel-preset-env`  Babel 的预设包。
        
        什么是预设包？可以理解为 ES6 中有的而 ES5 中没有的语法，Babel 如何将 ES6 语法变成 ES5 语法，依赖的就是这个预设包，预设包中有很多方法，每条方法对应着 ES6 中一个新的语法，该方法的作用就是将 ES6 语法转换为 ES5 语法的转换机制。如第一个方法 `Arrow functions` 作用是将 ES6 的箭头函数转换为 ES5 中普通的 function 函数。 
    
        ![preset-env](https://static.oschina.net/uploads/img/201708/21101808_fRqd.png "preset-env")

- 配置文件 

    在 `babel-demo` 目录下创建 Babel 的配置文件 `.babelrc` 文件，在 Windows 中直接创建会报错：“不能创建没有文件名的文件”，可以输入 `.babelrc.` （后面多个点）试试，创建成功之后是没有后面那个点的。
    
    打开 .babelrc 文件（以记事本打开文件等），输入内容如下：
    
    ```
    {
    	"presets": ["env"]
    }
    ```
    
    说明：
        前面已经介绍了 `预设包` 的概念，因为这里依赖了 `babel-preset-env` 包，前缀 `babel-preset` 可以省略不写，在配置文件中直接写 `env`，这条配置的目的是将 Babel 与 `babel-preset-env` 联系起来，在 Babel 进行转码的时候，知道从 `babel-preset-env` 包中找对应的转换机制。

- 打开 `index.js` 文件，输入以下内容：
    
    ```
    [1, 2, 3].map(x => x * 2);
    ```
    
    说明：这里的 `=>` 就是 ES6 中函数的新功能箭头函数。
    
- 使用 Babel 将 ES6 语法转换为 ES5 语法

    打开 package.json 文件，修改 script 属性如下：
    
    ```
    "scripts": {
        "build": "babel index.js --out-file index.es5.js"
    },
    ```
    
    这里 `--out-file` 是生成文件，将 `--out-file` 换成 `-d` 再试试会生成什么。
    
    打开 DOS 黑窗口，切换到 `bel-demo` 目录下，敲入命令进行转换：
    
    ```
    $ npm run build
    
    > babel-demo@1.0.0 build D:\code\node\babel-demo
    > babel index.js --out-file index.es5.js
    ```
    
    可以看到，敲入 `npm run build`，实际上在命令行中运行的是 `babel index.js --out-file index.es5.js` ，也就是在 package.json 中配置的内容，这样写的用处是每次转换可以少敲几个字母。
    
    打开 `bel-demo` 目录，会发现新生成了一个 `index.es5.js` 文件，内容如下。可以看到箭头函数被转换为 ES5 中最常见的 function 函数了。
    
    ```
    "use strict";

    [1, 2, 3].map(function (x) {
      return x * 2;
    });
    ```
    
# 四、比较容易混淆的包

## 1. `babel-polyfill` 介绍

安装依赖包
```
$ npm install --save-dev babel-polyfill
```

具体是谁，我也不知道，暂且称为某人吧。某人把 ES6 拆分为语法和 API 两个概念，可能听起来有点一样。前面介绍的 `babel-preset-env` 包里记录就是 ES6 的语法，如箭头函数、for..of、module 等。而 API 又指什么呢？

`babel-polyfill` 里记录的就是 ES6 的 API，具体表现如下：

![polyfill](https://static.oschina.net/uploads/img/201708/21105059_bbAg.png "polyfill")

由上图可以看到，API 就是指 JS 语言数据结构（如：Object、Array）所拥有的一些新的属性或方法，是属于语言层面的。

比如：`Array.from()` 用于将其它类型的值转换为数组，这在 ES5 中不存在的方法，是 ES6 新增的方法。Set 和 Map 是 ES6 新增的数据结构，这些东东都是属于语言层面的。

使用方法：在入口文件的顶端引入
```
// index.js
import 'babel-polyfill'
// 或者 
require('babel-polyfill');
```

## 2. `babel-preset-react` 介绍
安装依赖包
```
$ npm install --save-dev babel-preset-react
```

ES5 中没有 react 和 JSX 写法而 ES6 中有，这个预设包就是 ES6 与 ES5 转换 react 和 JSX 语法的机制包。

用法：在 `.babelrc` 中进行配置
```
{
    "presets": ["env", "react"]
}
```

## 3. `babel-runtime` 与 `babel-plugin-transform-runtime` 介绍

- 安装依赖包
    
    ```
    $ npm install --save-dev babel-plugin-transform-runtime
    $ npm install --save babel-runtime
    ```
    
    - `babel-plugin-transform-runtime` 插件包，需要在 `.babelrc` 中配置，作用是在转码时调用 `babel-runtime` 包中的公共方法；
    - `babel-runtime` 工具包，包内写了很多 ES6 转换为 ES5 可能会用到的公共方法，本身不需要做任何配置，`babel-plugin-transform-runtime` 插件包在运行时会自动寻找该工具包。
    
- 配置文件 `.babelrc`
    ```
    {
        "presets": ["env", "react"],
        "plugins": [
            "transform-runtime"
        ]
    }
    ```
    
- 用处

    现在，Babel 会把这样的代码：
    
    ```
    class Foo {
      method() {}
    }
    ```
     
    编译成：
    
    ```
    // 这两句代码用到了 babel-runtime 中的方法
    import _classCallCheck from "babel-runtime/helpers/classCallCheck";
    import _createClass from "babel-runtime/helpers/createClass";
    
    let Foo = function () {
      function Foo() {
        _classCallCheck(this, Foo);
      }
    
      _createClass(Foo, [{
        key: "method",
        value: function method() {}
      }]);
    
      return Foo;
    }();
    ```
    
    如果不这么写，每个文件中都会有 `classCallCheck` 和 `createClass` 的具体实现代码，这样无疑会增加冗余代码量。
    引入 `babel-runtime` 工具包，将 `classCallCheck` 和 `createClass` 公共方法的代码都写在这个包里，这样在用的时候直接引用即可。
