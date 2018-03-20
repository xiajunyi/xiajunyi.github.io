---
title: es6 异步编程之 Promise 从认识到使用
date: 2018-03-18 21:23:05
categories:
- 后端
tags:
- Promise
- Node
---

> 说起 ES6 异步编程，你可能会想到 Generator、async、Promise 以及各种第三方库，如：co 等。认识这几个名词是源于在网上看到一些帖子在辩论哪种异步编程更完美，当时的我对异步编程的概念还不是很熟悉，更无须谈哪种更好以及在我的代码中使用它们了。本文总结异步编程的概念以及什么时候会用到这些技术。

# 一、传统异步解决方案
在 Promise 等 es6 异步编程出现之前，传统异步是通过回调函数进行处理的。想一想 ajax 的 success 函数就是处理 ajax 异步成功的一个回调函数。

### 1. 什么是异步
传统编程都是顺序执行代码的，下面代码正常输出顺序应该是：step1 > step2 > step3。

```
// asyncfunc.js
function step2 () {
	setTimeout (() => {
		console.log('step2');
	}, 3000);
}

console.log('step1');
step2();
console.log('step3');
```
在控制台打印结果：先打印 step1 和 step3，过几秒之后才会打印出 step2，这无疑与传统编程的顺序执行并不同。这种变更代码执行顺序的行为就叫做异步。

```
D:\code\es6\promise-demo>node asyncfunc.js
step1
step3
step2
```
常见的异步操作有 ajax，这里的 setTimeout 是模拟异步操作的一种方式。

### 2. 回调函数完成异步操作
在出现 es6 异步编程之前，传统的异步是通过回调函数完成的。下面实现一个泡茶操作：先烧水（水烧开需要5秒），再进行泡茶。

```
// callbackForAsync.js   
// v1.0

// 烧水
function boilWater () {
	setTimeout(() => {
		console.log('水刚刚烧开，可以泡茶了');
	}, 5000);
}

// 泡茶
function makeTea () {
	console.log('水已经烧开了，开始泡茶');
}

boilWater();	// 烧水
makeTea();	// 泡茶
```

这里写了两个方法，一个烧水，一个泡茶，烧水方法里用了一个延迟函数 setTimeout，因为烧水这个过程需要 5 s 时间。之后调用这两个方法，先调用烧水，再调用泡茶。

打印结果：

```
D:\code\es6\promise-demo>node callbackForAsync.js
水已经烧开了，开始泡茶
水刚刚烧开，可以泡茶了
```
尽管我们先调用了烧水方法，再调用泡茶方法，但打印的结果与我们期待的并不同。这是因为这个过程用到了异步的思想。烧水是个异步过程，但是这里的写法是顺序执行的，泡茶并不会等待烧水完成再执行，而我们期望的就是泡茶等待烧水完成。

```
// callbackForAsync.js 
// v2.0

// 烧水
function boilWater (callback) {
	setTimeout(() => {
		console.log('水刚刚烧开，可以泡茶了');
		callback();
	}, 5000);
}

// 泡茶
function makeTea () {
	console.log('水已经烧开了，开始泡茶');
}

boilWater(makeTea);	// 烧水 + 泡茶
```
对 v1.0 代码进行修改，将泡茶方法作为参数传递给烧水方法，在烧水方法内部调用调用方法就可以实现我们的期待值。

```
D:\code\es6\promise-demo>node callbackForAsync.js
水刚刚烧开，可以泡茶了
水已经烧开了，开始泡茶
```

### 3. 回调地狱
前面只有两步操作，通过一个回调可以很容易的实现，现在加一个操作，泡完茶之后进行喝茶操作，如何实现？？

```
// callbackHell.js

// 烧水
function boilWater (callback, callback2) {
	setTimeout(() => {
		console.log('水刚刚烧开，可以泡茶了');
		callback(callback2);
	}, 5000);
}

// 泡茶
function makeTea (callback2) {
	console.log('水已经烧开了，开始泡茶');
	callback2();
}

// 喝茶
function drinkTea () {
	console.log('茶泡好了，正在喝茶');
}

// 烧水 > 泡茶 > 喝茶
boilWater(makeTea, drinkTea);	
```

上述代码中，将喝茶操作作为参数先传递给烧水方法，在烧水方法内部将喝茶方法作为参数传递给泡茶方法，最后在泡茶方法内部再调用喝茶方法。可见这里只有两步逻辑，喝茶方法在烧水方法和泡茶方法都有出现，如果喝茶操作之后还有操作，那么类推会不停的进行嵌套嵌套，这种实现不仅不美观，而且还不方便后期代码维护。

# 二、Promise 是什么？

![Promise1.png](http://upload-images.jianshu.io/upload_images/6693922-dbdd3b55c3958910.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在谷歌浏览器的控制台（按 F12）中打印 `console.dir(Promise)`，可以看到上图。
- Promise 是一个构造函数（只有构造函数的函数名首字母才大写，这是规范），本身拥有三个方法：all、race 、reject、resolve；
- 原型链对象拥有两个方法：catch、then，原型链上的方法通过 new 实例对象才能调用。

# 三、Promise 基础写法

### Demo1：创建 Promise 实例对象
```
// promiseBaseDemo.js
// v1.0
var myPromise = new Promise(function (resolve, reject) {
	console.log('peomise 内部代码');
	resolve('end');
});
```
Promise 是个构造函数，通过 new 得到实例对象 myPromise；构造函数的参数有两个 resolve 和 reject 两个形参，这两个参数就是在控制台中输入 `console.dir(Promise)` 打印出来的那两个属于构造函数的方法，有什么用，接下来说。

打印结果：
```
D:\code\es6\promise-demo>node promiseBaseDemo.js
peomise 内部代码
```
结果打印出了实例对象内部的代码。通常来说使用 new 创建的实例对象并不会打印任何信息，只有调用这个方法，如：`myPromise()` 才会执行代码，但是这里却打印了东东。

** 特性：Promise 构造出的实例对象会自执行。 **

### Demo2：构造函数的 resolve 方法和实例对象的 then 方法
```
// promiseBaseDemo.js
// v2.0
var myPromise = new Promise(function (resolve, reject) {
	console.log('peomise 内部代码');
	resolve('end');
});

myPromise.then(function (data) {
	console.log(data);
});
```
myPromise 是 Promise 的实例对象，拥有原型链方法 then。

打印结果：

```
D:\code\es6\promise-demo>node promiseBaseDemo.js
peomise 内部代码
end
```

then 方法为 Promise 的原型链方法，接收一个函数作为参数，如上述代码，data 表示 new 实例对象时 resolve() 里面的内容。

### Demo3：构造函数的 reject 方法和原型链对象的 catch 方法
```
// promiseBaseDemo.js
// v3.0
var myPromise = new Promise(function (resolve, reject) {
	console.log('peomise 内部代码');
	
	if (0 > 1) {
		resolve('end');
	} else {
		reject('出错了');
	}
});

myPromise.then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.log(error);
});
```
resolve 返回成功的数据，reject 返回失败的数据。楼主刚开始学习这里不是很理解，这里写贴上代码看下打印结果，下面通过实例感受区别。

catch 方法用来处理异常，也就是处理 reject 方法，保持程序不会直接挂掉，仍然可以继续执行。同样的 then 方法就是处理 resolve 方法。

打印结果：
```
D:\code\es6\promise-demo>node promiseBaseDemo.js
peomise 内部代码
出错了
```

### Demo4：规避 Promise 实例对象自执行

前面说到了 Promise 创建实例对象会自执行，这显示不是我们想要的，作为控制欲强盛的程序员，要做到我想让你执行你才能执行，不想让你执行就不能执行。

```
// promiseBaseDemo.js
// v4.0
function myPromise () {
	return new Promise(function (resolve, reject) {
		console.log('peomise 内部代码');
		
		if (0 > 1) {
			resolve('end');
		} else {
			reject('出错了');
		}
	});
}

// 想要执行解除下面代码的注释
// myPromise().then(function (data) {
// 	console.log(data);
// }).catch(function (error) {
// 	console.log(error);
// }); 
```
将 new Promise 这个过程封装到一个函数中，并且在函数内部返回 Promise 实例对象。

注意：执行方法变成了 myPromise() 而不是之前的 myPromise。

# 四、Promise 同步控制多个异步操作的执行顺序

### 1. 多个异步操作
```
// multiAsync.js

var boilWater = function () {
	setTimeout(() => {
		console.log('step1: 水刚刚烧开，可以泡茶了');
	}, 5000);
}

var makeTea = function () {
	setTimeout(() => {
		console.log('step2: 水已经烧开了，开始泡茶');
	}, 2000);
}

// 喝茶：异步操作，需要 1 s
var drinkTea = function () {
	setTimeout(() => {
		console.log('step3: 茶泡好了，正在喝茶');
	}, 1000);
}

boilWater();
makeTea();
drinkTea();
```

打印结果：

```
D:\code\es6\promise-demo>node multiAsync.js
step3: 茶泡好了，正在喝茶
step2: 水已经烧开了，开始泡茶
step1: 水刚刚烧开，可以泡茶了
```
像上面的代码，多个异步操作，按照正常写法，我们无法控制多个异步操作的执行顺序。Promise 可以控制多个异步操作的顺序，并且告别回调地狱，按照同步的写法去书写。

### 2. Promise 同步控制多个异步操作的顺序

```
// promiseForAsync.js

// 烧水：异步操作，需要 5 s
var boilWater = function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('step1: 水刚刚烧开，可以泡茶了');
		}, 5000);
	});
}

// 泡茶：异步操作，需要 2 s
var makeTea = function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('step2: 水已经烧开了，开始泡茶');
		}, 2000);
	});
}

// 喝茶：异步操作，需要 1 s
var drinkTea = function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('step3: 茶泡好了，正在喝茶');
		}, 1000);
	});
}

var arr = [];	// 创建数组，记录三个异步操作执行顺序

console.time('promise');
boilWater().then((data) => {
	arr.push(data);
	// makeTea() 返回的是 Promise 的实例对象，依次可以继续使用 then 方法。下同。
	return makeTea();	
}).then((data) => {
	arr.push(data);
	return drinkTea();
}).then((data) => {
	arr.push(data);
	console.log(arr);
	console.timeEnd('promise');
});
```

打印结果：

```
D:\code\es6\promise-demo>node promiseForAsync.js
[ 'step1: 水刚刚烧开，可以泡茶了',
  'step2: 水已经烧开了，开始泡茶',
  'step3: 茶泡好了，正在喝茶' ]
promise: 8020.676ms
```

# 五、Promise.all 异步控制多个异步操作的执行顺序

在 `promiseForAsync.js`  中已经控制了多个异步操作的顺序，但这还不是我们想要的，异步顺序确实控制住了，但执行时间却变成了三个异步操作分别执行时间的和。

我们期待的结果，执行时间依然异步（不能超过三个异步操作中时间最长的那个时间，因为三个异步操作是同时进行的），执行顺序得到控制。

```
// promiseForAll.js

// 烧水：异步操作，需要 5 s
var boilWater = function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('step1: 水刚刚烧开，可以泡茶了');
		}, 5000);
	});
}

// 泡茶：异步操作，需要 2 s
var makeTea = function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('step2: 水已经烧开了，开始泡茶');
		}, 2000);
	});
}

// 喝茶：异步操作，需要 1 s
var drinkTea = function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('step3: 茶泡好了，正在喝茶');
		}, 1000);
	});
}

console.time('promise');
Promise.all([boilWater(), makeTea(), drinkTea()]).then((result) => {
	console.log(result);
	console.timeEnd('promise');
});
```
打印结果：
```
D:\code\es6\promise-demo>node promiseForAll.js
[ 'step1: 水刚刚烧开，可以泡茶了',
  'step2: 水已经烧开了，开始泡茶',
  'step3: 茶泡好了，正在喝茶' ]
promise: 5015.434ms
```
可以看到，这种写法执行顺序依然得到控制，而执行时间从 8s 变成了 5s，为什么这里不是刚好 5s，而是有零头的时间，这是由于使用了 setTimeout 模拟异步，这个方法在执行代码的过程中会浪费些许时间导致的。

# 六、总结

Promise 用来处理以下问题：

- 同时操作多个异步操作；
- 需要控制多个异步操作按照一定顺序依次执行；
- 有同步（promiseForAsync.js）和异步（promiseForAll.js）两种写法。（这里的同步和异步可以通过执行时间 8s 和 5s 细细体会）
