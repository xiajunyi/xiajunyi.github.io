---
title: 使用Parcel零配置创建React应用（译）
date: 2018-03-18 21:32:34
categories:
- 前端
tags:
- Parcel
- 翻译
---

> 最近经常在一些大牛博客里看他们提到 Parcel，下意识关注一波，Parcel 官网介绍比较简单，官网里看到一篇入门博客，遂译之。

我们都经历过创建 React 项目时的痛苦，在能够正式编码之前需要花费数个小时去配置 Webpack。

[Create React App](https://github.com/facebookincubator/create-react-app) 开源项目让创建 React 项目变得更加容易和快速，但问题是 create react app将大量的 webpack 配置自己完成了。当项目变得越来越大需要使用一些高级特性时，又需要抛弃 create react app 然后去一步一步手动配置 webpack。然后又回到了学习 webapck 的问题上。

![Parcel：开箱即用](http://upload-images.jianshu.io/upload_images/6693922-78d51f37bc42463e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

最近一款新的打包工具诞生了 —— Parcel —— 号称零配置的打包工具。这听起来太过于美好而让人不敢相信，因为如果真的这样的话，它几乎解决了开发中的大多数问题。

我在一个很大的代码库中测试过，它果然开箱即用！它甚至给我打包了一个及其优化的包，而要打出同样优化的包使用  webpack 要花费我数天时间。

我认为它很酷并且很有潜力，让我们从头开始创建一个 React 应用。

### 使用 Parcel 创建 React 应用

**第一步：创建一个 npm 项目。**

```
mkdir react-parcel
cd react-parcel
npm init
```
npm init 会问你一连串问题，全部按回车键跳过设置默认选项即可。

**第二步：添加 React、Babel 和 Parcel 的依赖。**

```
npm install --save react
npm install --save react-dom
npm install --save-dev babel-preset-react
npm install --save-dev babel-preset-env
npm install --save-dev parcel-bundler
```

**第三步：创建 .babelrc 文件，这个文件告诉 Parcel 我们使用了 ES6 和 React JSX。**

```
{
  "presets": ["env", "react"]
}
```

**第四步：创建 React 项目，它仅仅包含两个文件。**

index.js
```
import React from "react";
import ReactDOM from "react-dom";

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<HelloMessage name="Jane" />, mountNode);
```

index.html

```
<!DOCTYPE html>
<html>
    <head>
        <title>React starter app</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="index.js"></script>
    </body>
</html>
```

**第五步：在 package.json 中添加 script 脚本，用于启动我们的应用。**

```
"scripts": {
  "start": "parcel index.html",
},
```

**第六步：启动应用**

```
npm start
```

确保你的 node 版本大于等于 8.0.0，之后可以在浏览器中输入 http://localhost:1234 看到应用的内容。

### 思考

比较了一下，用 parcel 创建 react 应用和用 webpack 创建 react 应用，parcel 不是一般的简单。

Parcel 在创建 React 项目上看起来是个不错的选择，但是它是否适合于大型应用的生成打包？这个现在还不确定，我们必须了解事物是如何发展的，唯一可以肯定的是：接下来将会很有趣!

### 动手试一试！

Parcel 很好！但是不要只相信我的片面之词，动手试一试吧，亲自感受一下它带给你的魅力!

（译文完）

----

**谈下感受：**小 demo 跑了一遍，过程确实简单很多，.babelrc 不算 parcel 的配置，确实可以说是零配置，甚至让我有种错觉，这就结束了？但要说有多犀利，现在也还看不出来，期待后续发展！

最后附上作者信息：

![作者：雅各布](http://upload-images.jianshu.io/upload_images/6693922-28802d3d4fda1ea2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

原文博客地址：http://blog.jakoblind.no/
Parcel 官网地址：https://parceljs.org/





