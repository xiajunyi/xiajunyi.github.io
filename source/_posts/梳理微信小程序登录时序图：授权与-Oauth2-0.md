---
title: 梳理微信小程序登录时序图：授权与 Oauth2.0
date: 2018-03-18 21:40:31
categories:
- 微信
tags:
- 微信小程序
- 授权
---

```
目录：
1. 做微信小程序遇到授权问题
2. 没接触过授权，先理解授权是什么意思
3. 具体开发如何实现授权
  3.1 使用账号密码进行传统授权
  3.2 传统授权显得很蠢，Oauth 授权方式出现
4. 回过头分析小程序为什么如此设计授权
5. 参考文章
```

# 一、遇到授权

最近开发微信小程序，做登录功能时遇到下图。

![微信小程序登录时序图](http://upload-images.jianshu.io/upload_images/6693922-52b8a1941f4adbfd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

看太懂，有几处疑惑地方：

- 同事告诉我这是认证和授权，之前没接触过，不了解是要解决什么问题；
- 为什么要有认证和授权，要解决什么问题；
- appid、appsecret、openid、session_key 这些单词都是什么意思。

下面就是寻找答案的过程。

# 二、没接触过授权，先理解授权是什么意思

豪车模型

> 如果你开车去酒店赴宴，你经常会苦于找不到停车位而耽误很多时间。是否有好办法可以避免这个问题呢？有的，听说有一些豪车的车主就不担心这个问题。豪车一般配备两种钥匙：主钥匙和泊车钥匙。当你到酒店后，只需要将泊车钥匙交给服务生，停车的事情就由服务生去处理。与主钥匙相比，这种泊车钥匙的使用功能是受限制的：它只能启动发动机并让车行驶一段有限的距离，可以锁车，但无法打开后备箱，无法使用车内其他设备。这里就体现了一种简单的“开放授权”思想：通过一把泊车钥匙，车主便能将汽车的部分使用功能（如启动发动机、行驶一段有限的距离）授权给服务生。

邻居模型

> 你和你的家人在外面游玩，突然阴雨蒙蒙，眼看就要下雨了，你想起家中的被子还在外面晒着。你给你的邻居打电话，告诉他在你家门口地毯下面有一把钥匙，希望他将被子收到房间中。通过告知他钥匙的位置，就是你授权你的邻居进入你家的权限，虽然你只是希望他拿到被子送到客厅就出来锁门，但是你给了他所有的权限，他不仅可以进入客厅，还可以进入你们的卧室、厨房等，这不是你想看到的。

在上面两个模型中。豪车的主钥匙赋予泊车钥匙部分权限，而你赋予你的邻居所有的权限。比较之下，我们更希望使用豪车模型赋予部分权限，而不是邻居模型，万一他偷偷配了把钥匙呢？这种授权存在不安全性，在网络开发中也是如此。

# 三、具体开发如何实现授权

![使用 QQ 号登录简书](http://upload-images.jianshu.io/upload_images/6693922-66b39ce844a6eb04.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

登录简书时可以选择社交账号登录，这里以 QQ 为例。这里涉及三方：当前要登录简书的用户，以下简称 `用户`，其它两方是：`简书`，`QQ 服务器`。因为 `用户`
 之前注册过 QQ，`简书` 请求 `QQ 服务器` 授权用户的 QQ 基本信息，这样用户就不用在简书上再进行注册了。

下面来探讨下 `QQ 服务器` 如何授权 `简书` 当前 `用户` 的 QQ 基本信息。

### 3.1 使用账号密码进行传统授权

这种方法比较简单，`用户` 告诉 `简书` 它的 QQ 账号密码，简书拿着账号密码去请求 QQ 服务器获取用户基本信息。

![传统授权方式](http://upload-images.jianshu.io/upload_images/6693922-2bc598eca79eac44.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**优点**：操作简单。

**缺点**：用户将 qq 账号密码给了简书，简书获得了该用户在 QQ 上的所有特权，不仅可以查看基本信息，还可以查看 QQ 空间，查看 QQ 邮箱等，而用户的本意是只让简书获取 QQ 基本信息这一项特权。

> 正是传统授权方式存在缺陷，Oauth 2.0 授权才会出现：只授权指定权限。

###  3.2 传统授权显得很蠢，Oauth2.0 授权方式出世

下面是在 [小胡子哥的个人博客](http://www.barretlee.com/blog/2016/01/10/oauth2-introduce/) 里看到的，将整个授权过程讲解的生动形象，我就不做二次加工，直接截取部分内容如下。

> 以用户使用 github 登录网站留言为例，简述 OAuth 2.0 的运作流程。

>假如我有一个网站，你是我网站上的访客，看了文章想留言表示「朕已阅」，留言时发现有这个网站的帐号才能够留言，此时给了你两个选择：一个是在我的网站上注册拥有一个新账户，然后用注册的用户名来留言；一个是使用 github 帐号登录，使用你的 github 用户名来留言。前者你觉得过于繁琐，于是惯性地点击了 github 登录按钮，此时 OAuth 认证流程就开始了。

> 需要明确的是，即使用户刚登录过 github，我的网站也不可能向 github 发一个什么请求便能够拿到访客信息，这显然是不安全的。就算用户允许你获取他在 github 上的信息，github 为了保障用户信息安全，也不会让你随意获取。所以操作之前，我的网站与 github 之间需要要有一个协商。

> 1. 网站和 Github 之间的协商
Github 会对用户的权限做分类，比如读取仓库信息的权限、写入仓库的权限、读取用户信息的权限、修改用户信息的权限等等。如果我想获取用户的信息，Github 会要求我，先在它的平台上注册一个应用，在申请的时候标明需要获取用户信息的哪些权限，用多少就申请多少，并且在申请的时候填写你的网站域名，Github 只允许在这个域名中获取用户信息。

> 此时我的网站已经和 Github 之间达成了共识，Github 也给我发了两张门票，一张门票叫做 Client Id，另一张门票叫做 Client Secret。

> 2. 用户和 Github 之间的协商
用户进入我的网站，点击 github 登录按钮的时候，我的网站会把上面拿到的 Client Id 交给用户，让他进入到 Github 的授权页面，Github 看到了用户手中的门票，就知道这是我的网站让他过来的，于是它就把我的网站想要获取的权限摆出来，并询问用户是否允许我获取这些权限。

```
// 用户登录 github，协商
GET //github.com/login/oauth/authorize
// 协商凭证
params = {
  client_id: "xxxx",
  redirect_uri: "http://my-website.com"
}
```

> 如果用户觉得我的网站要的权限太多，或者压根就不想我知道他这些信息，选择了拒绝的话，整个 OAuth 2.0 的认证就结束了，认证也以失败告终。如果用户觉得 OK，在授权页面点击了确认授权后，页面会跳转到我预先设定的 `redirect_uri` 并附带一个盖了章的门票 code。

```
// 协商成功后带着盖了章的 code
Location: http://my-website.com?code=xxx
```

> 这个时候，用户和 Github 之间的协商就已经完成，Github 也会在自己的系统中记录这次协商，表示该用户已经允许在我的网站访问上直接操作和使用他的部分资源。

>3. 告诉 Github 我的网站要来拜访了
第二步中，我们已经拿到了盖过章的门票 code，但这个 code 只能表明，用户允许我的网站从 github 上获取该用户的数据，如果我直接拿这个 code 去 github 访问数据一定会被拒绝，因为任何人都可以持有 code，github 并不知道 code 持有方就是我本人。
还记得之前申请应用的时候 github 给我的两张门票么，Client Id 在上一步中已经用过了，接下来轮到另一张门票 Client Secret。

```
// 网站和 github 之间的协商
POST //github.com/login/oauth/access_token
// 协商凭证包括 github 给用户盖的章和 github 发给我的门票
params = {
  code: "xxx",
  client_id: "xxx",
  client_secret: "xxx",
  redirect_uri: "http://my-website.com"
}
```

> 拿着用户盖过章的 code 和能够标识个人身份的 client_id、client_secret 去拜访 github，拿到最后的绿卡 access_token。

```
// 拿到最后的绿卡
response = {
  access_token: "e72e16c7e42f292c6912e7710c838347ae178b4a"
  scope: "user,gist"
  token_type: "bearer",
  refresh_token: "xxxx"
}
```

> 4. 用户开始使用 github 帐号在我的页面上留言

```
// 访问用户数据
GET //api.github.com/user?access_token=e72e16c7e42f292c6912e7710c838347ae178b4a
```

> 上一步 github 已经把最后的绿卡 access_token 给我了，通过 github 提供的 API 加绿卡就能够访问用户的信息了，能获取用户的哪些权限在 response 中也给了明确的说明，scope 为 user 和 gist，也就是只能获取 user 组和 gist 组两个小组的权限，user 组中就包含了用户的名字和邮箱等信息了。
```
// 告诉我用户的名字和邮箱
response = {
  username: "barretlee",
  email: "barret.china@gmail.com"
}
```

> 整个 OAuth2 流程在这里也基本完成了。

# 四、回过头分析小程序为什么如此设计授权

![微信小程序登录时序图](http://upload-images.jianshu.io/upload_images/6693922-52b8a1941f4adbfd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 明确一点：小程序和微信是两个程序，只不过小程序的入口在微信内。所以微信的接口一般小程序是不能直接调用的，得先授权。

> 微信小程序登录时序图真正的目的不是小程序自身去请求授权，而是通过小程序去获取授权 token，然后给第三方服务器用，第三方服务器会拿这个 token 去调用微信服务器授权的相关接口。

### 1. 注册微信公众账号

开发微信小程序第一步要在 [微信公众平台](https://mp.weixin.qq.com/) 上注册一个账号，注册完成后在 `设置 > 开发设置` 里可以看到 AppID 和 AppSecret，这相当于上面提到的  Client Id 和 Client Secret。

### 2. 明确对应关系

用户 | 第三方应用 | 授权服务器 | 备注
---|--- | --- | ---
用户 |  小胡子的网站 | github | 小胡子网站获取 github 授权用户基本信息
用户 | 简书 | QQ 服务器 | 简书获取 QQ 服务器授权基本信息
微信登录用户 | 小程序 | 微信服务器 | 小程序获得微信服务器授权可以调用一些微信接口，如获取微信登录用户的基本信息、调用微信支付接口

### 3. `wx.login` 接口获取 `code`

```
wx.login({
    success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
});
```

`微信登录用户` 在 `微信` 中打开 `小程序`，`小程序` 中运行了 `wx.login` 接口，此时 `小程序` 拿着 appid 去请求 `微信服务器` 给 `小程序` 授权，让它可以调用一些微信接口，比如获取微信登录用户的基本信息。因为是 `微信登录用户` 进行操作的，所以微信那端默认是同意授权的。（appid 哪里来？在新建小程序项目时输入，每个 appid 和小程序都是一一对应的）

![新建小程序项目](http://upload-images.jianshu.io/upload_images/6693922-805f36a82456ef8b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 4. 拿着 `code` 去获取令牌

上面也提到，这个 code 可能会泄露，所以需要 `code + appid + appsecret` 去再次拜访微信服务器获取令牌 session_key 和用户标识 openid。

这里有个疑问？为什么获取 code 在小程序上做，而获取 session_key 在第三方服务器上操作？这是因为获取 code 需要使用 appid 去跳转微信服务器授权页面，再使用当前 `微信登录用户` 默认同意此次授权，如果坐在第三方服务器上，appid 我们是知道的，但是当前 `微信登录用户` 是不知道，只要手机上的微信知道。

那为什么请求 session_key 在第三方服务器上操作？这是因为前面也说过 code 只能表明微信服务器统一此次授权，但是 code 可能会泄露，还需要第二张门票 appsecret 告诉微信服务器 “就是我，不是别人” 来请求获取 session_key 的。可见 appsecret 对于安全的重要性，放在第三方服务器方便管理。

关于 openid 和 session_key 说明？session_key 就是返回的绿卡，此后每次访问微信服务器资源都要带上它，这样微信服务器才知道此次请求是有授权的，我可以把资源给你。openid 是同意授权的那个人，这里是 `微信登录用户` 的标识 ID。也就是为什么 code 要在小程序中获取中我们不知道的那个 `微信登录用户` ID。

到此，上图中涉及 Oauth2.0 的部分已经结束，下面的那些都是普通的 session 维持会话机制，这里就不再赘述。

# 五、参考文章
1. [帮你深入理解OAuth2.0协议](http://blog.csdn.net/seccloud/article/details/8192707)
2. [Oauth2.0（一）：为什么需要 Oauth2.0 协议？](http://www.cnblogs.com/blowing00/p/4521135.html)
3. [简述 OAuth 2.0 的运作流程](http://www.barretlee.com/blog/2016/01/10/oauth2-introduce/)

# 六、最后

由于作者文笔有限，文章如有遗漏或表达有误，请不吝赐教。如果仍对微信授权或 Oauth2.0 有疑问的，欢迎留言讨论。
