---
title: GIT 使用之 SSH 以及码云上配置 SSH
date: 2018-03-18 21:23:05
categories:
- 工具
tags:
- git
- 码云
---

# 一、讲故事

现在要做这么个事，你在码云上发现了一个爬虫项目，但是写的很烂，你看不下去，于是使用 git clone HTTPS 把代码克隆了一份到你的计算机上，高手总是讲究效率的，半天时间你将这个爬虫项目进行了极大的改善后就想将代码再提交到码云上。可是码云不认识你是谁，这个时候就提示你输入账号密码来确认是谁谁谁提交了这次代码。往后的日子里每次修改提交代码都需要输入账号密码来确认身份，这是个很烦的事情，所以出现了 SSH （公钥）这种形式来解决这个问题。

# 二、公钥与私钥

使用 git，第一件事就是通过用户名和邮箱生成公钥和私钥，这是一一对应的关系，就像一把钥匙开一把锁一样。私钥 a 也只能开公钥 a。

公钥和私钥都是一个记录一些加密信息的文件。一般来说私钥是要放在你的私人计算机上（路径：C:\Users\Administrator\.ssh\id_rsa），将公钥（路径：C:\Users\Administrator\.ssh\id_rsa.pub）的内容复制到 git 的一些客户端上面如 Github、Gitlab、Gitee（码云）上。

这样，当大牛改完爬虫项目再次提交代码的时候，因为码云上已经有了一份公钥，就会拿这份公钥和你计算机上的私钥做关联，看看你计算机上的私钥和它上面的公钥是否是一对，因为公钥和私钥是通过用户名和邮箱注册的，这个时候码云就已经知道了你的身份，提交代码也就不需要再次输入密码了。

![公钥与私钥](http://upload-images.jianshu.io/upload_images/6693922-2daec62424fb144c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


# 三、本机如何生成公钥

确认你提前安装过 Git，在桌面右键打开 git bach 工具。

### 1. 设置 user.name 和 user.email

如果你第一次打开 git bash，需要设置这两个配置信息，如果之前配置过，请跳过这一步。

```
# 这里的 "dkvirus" 可以替换成自己的用户名
git config --global user.name "dkvirus"
# 这里的邮箱 "949582269@qq.com"  替换成自己的邮箱
git config --global user.email  "949582269@qq.com"
```

### 2. 生成秘钥 ssh

```
# 这里的邮箱 "949582269@qq.com"  替换成自己的邮箱
ssh-keygen -t rsa -C "949582269@qq.com"
```

回车只有可能需要你输入三个东东。

- 第一个东东是 .ssh 文件保存的位置，一般默认为 `C:\Users\Administrator\.ssh\id_rsa`，直接回车即可；
- 第二个东东让你输入密码，可以不输入，直接回车即可；
- 第三个东东是让你确认输入密码的。

### 3. 查看秘钥

打开 `C:\Users\Administrator\.ssh` 目录，可以看到该目录生成了两个文件。

- id_rsa 私钥。就让它安静的放在你的计算机里即可；
- id_rsa.pub 公钥。这玩意是放到 git 服务端的。

# 四、码云上配置公钥

### 1. 进入配置页面

![进入配置页面](http://upload-images.jianshu.io/upload_images/6693922-3b1b07761c7e099e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 2. 配置 ssh

将 id_rsa.pub 的内容复制到框框里即可。

![配置 SSH](http://upload-images.jianshu.io/upload_images/6693922-17fb4af7a4c9f3ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


# 五、最后

愉快的使用 SSH 的方式拉代码下来，之后提交代码再也不需要输入啥的啦。




