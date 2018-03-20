---
title: 解决 npm 无法安装 devDependencies 下的依赖包的问题
date: 2018-03-18 21:23:05
categories:
- 工具
tags:
- npm
- Node
---

# 分析原因
- 起初无法安装  `devDependencies`  下依赖包，急的不行，以为是 npm 版本有问题，陆续安装了 node@6.11.5、node@8.0.0 和 node@8.6.0 都试了还是不行；
- 我就像是不是哪个配置项有问题，立马去 `C:\Users\Administrator\.npmrc` 下去查看 `.npmrc` 文件，这个文件会记录 npm 的默认配置，发现里面就只配置了一个淘宝镜像，也没其它配置可看，此时就开始怀疑是不是安装其它环境影响了 Node 的环境；
- 第二天在我同事电脑上安装了 nvm 和 node，测试是可以成功安装 `devDependencies` 下的依赖包，此时就可以排除是 npm 版本问题了，应该是我本机某些配置项出现了差错；
- 查看配置信息 `$ npm config list`，该指令只能查看 .npmrc 下的基础配置信息，前面已经说过，突然发现最下面提示一行 `$ npm config ls -l`，该指令可以查看 npm 自身默认配置信息，查看可以得到将近百条信息；
- 有时就靠那么点灵感，嫩你怎么想，也不会想到是 npm 自身默认配置信息出问题了啊，可偏偏就出在这里，我将我同事电脑里的默认配置和我本机默认配置在[在线文本比较工具](https://wenbenbijiao.renrensousuo.com/#diff)比较之后终于找到这个罪魁祸首 —— production 属性。
 
# 解决方法
npm 有个默认配置项 `production` （生产）设置为 true 时就不会安装 `devDependencies` 下的依赖包。
 
```
// 配置成 false，意思是不在生产环境下
$ npm config set production false
```
# 分析起因
问题解决了，就思考为什么会出现这种情况，想到在不久之前在 windows 的环境变量里添加了 NODE_ENV = production 这条属性，可能就是这个影响到了它。

![环境变量中配置 NODE_ENV](http://upload-images.jianshu.io/upload_images/6693922-52b0d2633e4c5499.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
