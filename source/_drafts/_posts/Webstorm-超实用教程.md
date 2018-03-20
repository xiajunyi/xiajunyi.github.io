---
title: Webstorm 超实用教程
date: 2018-03-18 21:23:05
categories:
- 工具
tags:
- Webstorm
- 开发工具
---

## 更新日志

>1. 2017年10月18日（四）
Webstorm 启动缓慢，操作卡顿优化。
>2. 2017年10月22日（三.7）
Webstorm 配置 Less 自动转译 CSS。
>3. 2017年11月2日
Webstorm 配置 File Types，使微信小程序代码高亮显示。（三.9）
>4. 2017年11月29日
Webstorm 2017.2 版本使用搜狗输入法卡顿解决方案。（三.10）
>5. 2017年12月11日
Webstorm 弹出 Npm 对话框。（三.11）

## 一、下载安装包

[Webstorm 2017.1.4 【非汉化版】百度云盘下载地址](http://pan.baidu.com/s/1kVqoPJh)

[Webstorm 2017.2 【汉化版】百度云盘下载地址，密码：8oya](https://pan.baidu.com/s/1o76Ux2U)

## 二、安装过程（包含输入注册码永久使用）

双击下一步下一步即可，过程中有几个步骤说明一下：

### 1. 配置 Webstorm 安装项

选择 64 位，防止桌面 Webstorm 快捷方式打不开。

![配置 Webstorm 安装项](http://upload-images.jianshu.io/upload_images/6693922-fabb5514897e04aa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "在这里输入图片标题")

### 2. 是否导入 Webstorm 配置信息

这里的意思是之前使用过 Webstorm ，并且配置过，Webstorm 配置信息可以起到优化性能的作用，因为它本身是个比较吃内存的东西，文件多了容易卡顿，可以通过在配置文件中得到优化，后面单独介绍优化。

剧透：Webstorm 安装完成后配置信息位置：`C:\Users\Administrator\.WebStorm2017.1`。

![是否导入 Webstorm 配置信息](http://upload-images.jianshu.io/upload_images/6693922-8e05d8a5e14060ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "在这里输入图片标题")

### 3. 激活 Webstorm

免费版的试用期是 30 天，30 天之后各种让人不舒服，比如不能保存，每隔30分钟自动关闭程序等等，所以在开始的时候还是激活成功使用永久版本的比较好。

要填的内容：`http://idea.imsxm.com/`，复制进去即可。

![激活 Webstorm](http://upload-images.jianshu.io/upload_images/6693922-4b13697b434d6169.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

有朋友反映使用该网站激活失败，我又去找了另一种激活方式，实测在 Webstorm 2017.2 版本上是激活成功的。[Webstorm2017.2 版本激活文件，密码：fls5](https://pan.baidu.com/s/1c2ji2i8)

### 4. 设置 Webstorm 工具的主题和风格

这里暂时写保持默认设置，后面会单独介绍如何折腾一个独一无二的属于个人审美的 Webstorm 工具。

![设置 Webstorm 工具的主题和风格](http://upload-images.jianshu.io/upload_images/6693922-6af0e5511103143b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 三、使用心得

> 关于 Webstorm 大多数配置都在 `File -> Settings` 选项卡中进行的，也许你不得不第一个记住它的快捷键：`Ctrl + Alt + S`。

### 1. 设置开发工具主题/风格

File -> settings -> Editor -> colors&fonts -> scheme name. 

跟人觉得 `Default  Darcula` 这两款主题还可以，如果内置主题都不喜欢，可以去 [主题下载地址](http://phpstorm-themes.com/) 寻找你中意的主题。

### 2. 换成自己熟悉编辑器的快键键：如 Eclipse 的快捷键 + 自定义快捷键组合

![快捷键设置](http://upload-images.jianshu.io/upload_images/6693922-30f14115068bd770.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 3. 取消勾选安全保存时间

这两项取消勾选，否则影响热更新，不能及时将修改的内容反应在浏览器上。


![取消勾选安全保存时间](http://upload-images.jianshu.io/upload_images/6693922-ecfe5d510e195768.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 4. 集成 Eslint

集成 Eslint 的前提是你的项目里使用了 Eslint。

![集成 Eslint](http://upload-images.jianshu.io/upload_images/6693922-ab243acf9dc61e5c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "在这里输入图片标题")

### 5. 集成 Git

对 Webstorm 集成 Git 的前提是你已经掌握 Git 的基础使用方法，如果对于 Git 的基本概念不了解的话，可以参阅：[廖雪峰 Git 教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)。

![集成 Git](http://upload-images.jianshu.io/upload_images/6693922-1ae4d2a6529e3cf0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Webstorm 集成 Git 带来的遍历就是将 Git 的指令用选项的意思表达出来，如果你熟悉 Git 是如何提交代码的，那么在 Webstorm 使用 Git 提交代码应该不是什么难事。

   ![git 提交代码](http://upload-images.jianshu.io/upload_images/6693922-b701c29b696a3689.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240 "在这里输入图片标题")

对于分支的操作在 Webstorm 右下角

![操作分支](http://upload-images.jianshu.io/upload_images/6693922-1c2c6e19e66cad82.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 6. 常用开发工具窗口

开发过程中，最常用的工具窗口有以下几个：

- Project 记录项目的层级结构；（快捷键 Alt + 1）
- Structure  记录当前文件内部的层级结构，方便快速定位到某个方法；（快捷键 Alt + 7）
- Npm 使用 npm 构建的工程，Npm 窗口会记录 package.json 里的脚本信息，一般用于快速启动项目；快捷键 （Ctrl + E）
- TODO 项目中难免会预留 TODO 标记用于日后完善，该窗口可以快速定位到哪个文件的哪一行预留了 TODO 标记。（快捷键 Alt + 6）

  ![常用开发工具窗口](http://upload-images.jianshu.io/upload_images/6693922-62ada6f3fca0cbc1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 7. 配置 Less 自动转译 CSS

在进行配置之前，请确保你已经使用 npm/yarn 或其它工具全局安装了 less 包。

```
$ npm install less -g
```

![配置 Less 自动转译 CSS](http://upload-images.jianshu.io/upload_images/6693922-55edfe62068c542b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 8. Webstorm 安装 Editorconfig 插件

如果你的项目中要使用 .editorconfig 配置文件控制代码风格，那么 Editorconfig 插件必不可少。Webstorm 2017.1 及之后的版本都默认安装了这个插件，如果没有安装，参照下图自行安装。

![安装 Editorconfig 插件](http://upload-images.jianshu.io/upload_images/6693922-d87689ead4c58cf9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 9. 文件类型设置 —— File Types

在使用微信开发工具开发小程序时，经常遇到这么个问题：小程序开发工具不支持多例模式，一次性只能打开一个项目，可是同时又想打开其他项目参考里面的代码，总不至于用文本编辑器打开吧。我的选择是使用 Webstorm 打开小程序的项目，可是随之而来的一个问题就是小程序的 .wxml 和 .wxss 文件类型 Webstorm 无法识别，代码都是一片黑色，没有背景高亮看着很是不舒服。

使用 File Types 可以将 .wxml 和 .wxss 文件类型添加到 Webstorm 中。

![File Types 设置](http://upload-images.jianshu.io/upload_images/6693922-cae296c7cad5e6c6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 在 Cascading Style Sheet  下添加 *.wxss 类型，使用 css 语法高亮；
- 在 HTML 下添加 *.wxml 类型，使用 html 语法高亮。

注意：前面的 * 号不能忘记。

### 10. Webstorm 2017.2 版本使用搜狗输入法卡顿问题

卡顿卡的人心烦，查了一些资料都没起作用，就差重装 Webstorm 了，后来在搜狗贴吧上看到一方法试了试是有用的。

安装搜狗输入法最新版本，然后重启 Webstorm（刚装好没重启，使用输入法还是卡，以为没啥用，后来重启之后发现一点都不卡了）。

### 11. Webstorm 弹出 Npm 对话框

实际开发中，在终端会经常敲入 `npm run dev` 等指令，Webstorm 集成了这一功能，带来了很大的便利。但在打开 Webstorm 有些人却找不到该对话框。

![Npm 对话框](http://upload-images.jianshu.io/upload_images/6693922-e1f42e12b7d361eb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

首先确保你的项目含有 package.json 文件，并且文件内含有 script 脚本指令。右键 package.json 文件，可以看到如下画面，点击 `Show npm Scripts` 即可。还有一个方法，快捷键  `Ctrl + E` 也可以看到该选项，只不过该方法有时候会掉链子。

![如何弹出 Npm 对话框](http://upload-images.jianshu.io/upload_images/6693922-95be58949f820301.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 12. 快捷键 —— 最常用的快捷键最佳应在 10 个以内

- `Ctrl + Shift + R` —— 快速定位到文件并跳转

- `Ctrl + Shift + F` —— 全局搜索文件内某个字符串 （Webstorm 默认快捷键，eclipse 中是 `Ctrl + H`）

- `Ctrl + Shift + U` —— 大小写切换

- `Ctrl + E` —— 打开最近操作过的文件

- `Ctrl + Alt + L` —— 格式化代码（与 QQ 快捷键冲突，自定修改 QQ 快捷键）

- `Ctrl + Y` —— 删除光标所在行

- `Ctrl + Alt + S` —— 打开设置窗口

## 四、优化 Webstorm

使用 webstorm 有时打开项目时很慢很慢，有时操作时卡顿，这些不好的体验都可以通过简单的设置规避掉。

### 1. 调整 webstorm 内存

webstorm 安装目录 > bin > WebStorm.exe.vmoptions。文本编辑器打开，修改第二行和第三行内容。

第二行：-Xms526m

第三行：-Xmx1024m

楼主电脑是 8 g 内存，这样分配明显好很多，测试发现  -Xms 最大值不能超过1024，否则webstorm将无法打开。

### 2. 把不必要索引的文件进行排除

webstorm 如果同时引入很多个项目也会导致卡顿，我们可以将不需要的项目隐藏起来，和 Eclipse 中 close project 功能一样。

选择项目 > 右键 > Mark Directory As > Excluded。操作完成后会发现项目“消失了”。

不过还是建议 webstorm 只打开一个项目。

### 3. 关闭 node_modules 校验

在 node 项目中存在 node_modules 目录，每次打开 webstrom 时会校验文件，同样也会校验 node_modules 中的内容，这会浪费很多时间。

![关闭 node_modules 校验](http://upload-images.jianshu.io/upload_images/6693922-935fa0e69cce9fcb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 4. 取消勾选不常用的插件

webstorm 中可以集成很多插件，这些插件也会影响运行速度，有的插件你可能压根都没听过，更不会使用，可以取消勾选。

![取消勾选不常用的插件](http://upload-images.jianshu.io/upload_images/6693922-dbacdaaff62a9bd9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
