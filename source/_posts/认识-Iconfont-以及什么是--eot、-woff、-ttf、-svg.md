---
title: 认识 Iconfont 以及什么是 —— eot、 woff、 ttf、 svg
date: 2018-03-18 21:23:05
categories:
- 工具
tags:
- Iconfont
---

> 在看别人 github 项目的时候，看到了 iconfont，百度了一下是阿里的图标库，这个很容易理解，但是自己操作一遍之后发现下载下来的目录还包含了 .eot、.woff 等文件，对于这些新东西感到有些陌生，在经过一番查找之后有所得，整理思路，记录于此。

# 一、Iconfont 

### 1. 概述

在前端作业中，二十年前只有页面中铺满文字就算上线产品，现如今，不加点俏皮的“图标”会让页面显得很 Low 很 Low。

![图标](http://upload-images.jianshu.io/upload_images/6693922-a9d21e81c0489361.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在写这篇文章之前，我一直以为上图中的“图标”是一个个的图片组成，但学习总是给人新知，现在我知道了它们只是一种字体，类似于“宋体”、“楷体”这种。如果我们要使用它们，也只需要在 css 文件中使用 @font-face 引入这种字体即可。@font-face 是 css3 的一个语法，刚兴趣的可以自行阅读 [@font-face 用法](http://www.jianshu.com/p/c0301e632a01) 。

### 2. Iconfont 介绍

Iconfont 是阿里提供了一个图标库，你可以想象成是一个售卖图标的超市，挑选你需要的图标放入购物车，然后 Iconfont 会为你打包你购物车里的图标，自动生成一种新的字体，你可以选择下载到本地，在你的项目中引入这种字体，这样即便没有网络的情况也可以使用图标。

这种模式的一大优点就是只挑选出需要的图标，不会像其他图标库那样直接下载一整个图标库的内容，尽管你可能只会使用到其中一到两个图标。要知道，有的项目打包上线对大小是有严格要求的，比如微信小程序打包之后的代码大小就要控制在 1 M以下。

关于如何使用 Iconfont，网络已经有人赘述的很详细了，这里就不再重复。具体步骤参阅： [iconfont字体图标的使用方法](http://www.cnblogs.com/hjvsdr/p/6639649.html)。

注：除了阿里的 Iconfont，Bootstrap 的图标是 Font-Awsome。
# 二、字体格式 —— .eot、.woff、.ttf、.svg

### 1. 概述
在阿里图标库中下载图标到本地后，目录结构如下：

![图标库下载到本地目录结构](http://upload-images.jianshu.io/upload_images/6693922-ca950bfdfcb106ab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

第一次看到这几个文件时，不知道有什么用，可能会直接删除，但万万不可，打开 iconfont.css 文件可以在 @font-face 中都有引用这几个文件。查询资料后得知：虽然现代浏览器支持自定义字体样式，并且可以通过 @font-face 引入自定义的字体，但是各个浏览器对于字体样式是存在兼容性问题的，而这几个文件就是分别处理对应浏览兼容性问题的。

### 2. 字体格式介绍

目前最主要的几种网络字体(web font)格式包括WOFF，SVG，EOT，OTF/TTF。

WOFF

WOFF是Web Open Font Format几个词的首字母简写。这种字体格式专门用于网上，由Mozilla联合其它几大组织共同开发。WOFF字体通常比其它字体加载的要快些，因为使用了OpenType (OTF)和TrueType (TTF)字体里的存储结构和压缩算法。这种字体格式还可以加入元信息和授权信息。这种字体格式有君临天下的趋势，因为所有的现代浏览器都开始支持这种字体格式。【支持的浏览器：IE9+,Firefox3.5+,Chrome6+,Safari3.6+,Opera11.1+】

SVG / SVGZ

Scalable Vector Graphics (Font). SVG是一种用矢量图格式改进的字体格式，体积上比矢量图更小，适合在手机设备上使用。【支持的浏览器：Chrome4+,Safari3.1+,Opera10.0+,iOS Mobile Safari3.2+】

EOT

Embedded Open Type。这是微软创造的字体格式。这种格式只在IE6-IE8里使用。【支持的浏览器：IE4+】

OTF / TTF

OpenType Font 和 TrueType Font。部分的因为这种格式容易被复制(非法的)，这才催生了WOFF字体格式。然而，OpenType有很多独特的地方，受到很多设计者的喜爱。【支持的浏览器：IE9+,Firefox3.5+,Chrome4+,Safari3+,Opera10+,iOS Mobile Safari4.2+】

### 3. 使用 @font-face 引入字体格式

因为各个浏览器对字体格式的不兼容，作为前端开发人员，我们需要考虑的全面性，将各个格式的字体都引入进来，这样就不怕刁钻的用户使用哪种浏览器了。

常见兼容性写法：

```
@font-face {
  font-family: 'yourfontname';
  src: url('../fonts/singlemalta-webfont.eot');
  src: url('../fonts/singlemalta-webfont.eot?#iefix') format('embedded-opentype'),
       url('../fonts/singlemalta-webfont.woff') format('woff'),
       url('../fonts/singlemalta-webfont.ttf') format('truetype'),
       url('../fonts/singlemalta-webfont.svg#defineName') format('svg');
  font-weight: normal;
  font-style: normal;
}
```

如果你是使用 Iconfont 下载字体到本地，那么恭喜你，打开 iconfont.css 文件，可以看到 Iconfont 已经帮助你配好了这些内容，你只需要在页面中引入 iconfont.css 即可直接使用。

# 三、参考文章

1. [博客园 - iconfont字体图标的使用方法--超简单!](http://www.cnblogs.com/hjvsdr/p/6639649.html)
2. [Airen的博客 - CSS3 @font-face](http://www.w3cplus.com/content/css3-font-face)
3. [简书 - CSS3 @font-face属性](http://www.jianshu.com/p/c0301e632a01)
