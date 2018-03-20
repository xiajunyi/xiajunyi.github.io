---
title: mongoose 学习笔记
date: 2018-03-18 21:23:05
categories:
- 后端
tags:
- mongoose
- Node
---

# 一、介绍

### 1. 概述
mongoose 模块用于简化 node 与数据库 mongodb 之间的操作，目的是通过简便的 API 将操作数据库的行为变成操作 javascript 对象的行为（因为我们使用 nodeJS 进行开发，对于 javascript 往往更加有亲切感）。主要 API 有三个：

- mongoose.connect  

    连接数据库，如果 mongodb 中没有该数据库，自动创建。
    
    注：mongodb 同 mysql，可以创建很多个子数据库，每个子数据库下面拥有自己的表。

- mongoose.Schema 

    mongoose 模块帮你创建子数据库下面的表。
    
- mongoose.Model

    mongoose 模块帮你创建表对应的 javascript 对象，接下来就可以通过操作这个对象来完成数据库的增删改查。

### 2. 环境要求

使用 `mongoose` 要求安装 `nodejs` 和 `mongodb 数据库`，当然再安装了 `mongodb 客户端` 是再好不过的啦。

[nodejs 安装教程](https://my.oschina.net/u/3500483/blog/1068685)

[【mongodb + 客户端】图文安装教程](http://blog.csdn.net/baidu_32262373/article/details/56513687)

### 3. 安装
mongoose 为第三方包，使用前先进行安装：

```
$ npm install mongoose
```

# 二、API 文档

### 1. 连接数据库
```
var mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/testuseage';
// mongoose 的第一个重要 API，连接数据库
mongoose.connect(DB_URL);   

// mongoose 提供异步事件监听，这里用到最常用的三个：connected、error、disconnected，用于得知数据的连接状态
// 当数据库连接上时触发该方法，打印连接成功的提示文字
mongoose.connection.on('connected', function () {
	console.log('Mongoose connection open to ' + DB_URL);
});
// 当连接过程错误触发该方法，如连接的 mongodb 服务未开启
mongoose.connection.on('error', function (err) {
	console.log('Mongoose connection error: ' + err);
});
// 当连接断开时触发该方法，打印连接断开的提示文字
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose connection disconnected');
});
```
说明：关于 `DB_URL = 'mongodb://localhost:27017/testuseage';` ，可以拆分为两部分 `mongodb://localhost:27017/` 和 `testuseage`。
- `mongodb://localhost:27017/`

    - 这部分通常为固定写法，`mongodb` 告诉连接的是 `mongodb` 数据库，而不是 `mysql` 或其它数据库；
    - `localhost` 为 `mongodb` 数据库所在机器的 ip 地址，通常自己玩都安装在自己的计算机上，ip 默认为 localhost；
    - `27017` 这个数字为 `mongodb` 的默认连接端口号，如果安装时没有修改的话就是这个，安装时如果修改了端口号，这里请写修改的那个端口号。

- `testuseage`
    `mongodb` 中子数据库的名称，`mongodb` 同 `mysql`，可以创建很多个数据库，每个数据库下面拥有自己的表。如果 `mongodb` 中没有这个子数据库，那么会自动创建。

### 2. 创建数据库表
```
var mongoose = require('mongoose');

// 创建数据库表构造函数
var Schema = mongoose.Schema;
// 通过构造函数创建具体的数据库表，这里是用于表
var UserSchema = new Schema({
	username: {type: String, index: true, required: true},
	userpwd: String,
	userage: {type: Number, min: 18, max: 100},
	logindate: {type: Date, default: new Date()}
});
```

上面代码中的 

- `index` 建立索引，这个用过其它数据库的应该知道什么意思；
- `default` 默认值，新建数据时如果该字段没有赋值，使用默认值；
- `required` 布尔值，必选验证器;
- `min` 数值，最小值；
- `max` 数值，最大值；
- `lowercase` 布尔值，转换为小写；
- `trim` 布尔值，去除前后空格
- `type` 为对应字段的数据类型，如果只有 type 一个属性，可直接写 type 的类型，还有其它一些数据类型收集如下：
    - String
    - Number
    - Boolean | Bool
    - Array
    - Buffer
    - Date
    - ObjectId | Oid
    - Mixed

### 3. 创建表对应的 javascript 对象
```
// 创建表 UserSchema 对应的 javascript 对象，接下来通过操作该对象来实现对数据库的增删改查
var User = mongoose.model('User', UserSchema);
```

### 4. 新增一条数据

- 4.1 新增 API 之 `save` 方法（实例对象操作方法）
    
    ```
    // 创建 javascript 对象的实例对象，也就是构造函数 User 是人类，而实例对象 user 是具体的某个人
    var user = new User({
    	username: 'Tracy Mc',
    	userpwd: 'abcd',
    	userage: 37,
    	logindate: new Date()
    });
    
    // 调用实例对象的 save 方法实现数据库新增一条数据的操作
    user.save(function (err, res) {
    	if (err) {
    	    console.log('Error: ' + err);
    	} else {
    	    console.log('Res: ' + res);
    	    
    	}
    });
    ```

- 4.2 新增 API 之 `create` 方法（构造函数操作方法）

    ```
    User.create({
    	username: 'bob james',
    	userpwd: '321',
    	userage: 32,
    	logindate: new Date()
    }, function (err, res) {
    	if (err) {
    		console.log('Error: ' + err);
    	} else {
    		console.log('Res: %o', res);
    	}
    });
    ```

### 5. 修改一条数据

- 5.1 修改 API 之 `update` 方法

    `update(condition, updateobj, multi, callback);`
    
    - `condition` 
        
        修改的对象应该是数据库中已存在的一条数据，ownobj 为查询条件，在下面的例子为查询 username 为 `Tracy Mc` 的对象对其进行修改；
    
    - `updateobj`
        
        要修改的字段，下面的例子中为修改用户密码字段；
    
    - `multi`
        
        固定写法 `{multi: false}`，因为通过 ownobj 查询到的数据可能不止一条，这里设置为 false 时就不管查询到几条数据，始终修改第一条数据；
    
    - `callback`
    
        回调函数，判断当前更新是否成功。下面例子中：`res = { n: 1, nModified: 1, ok: 1 }`，`n` 表示 ownobj 查询到的对象个数，`nModified` 为实际修改的对象个数， ok 为修改成功的对象个数。
    
    ```
    // 修改密码
    var condition = {'username': 'Tracy Mc'};
    var updatestr = {'userpwd': 'cccc'};
    var multi = {multi: false};
    User.update(condition, updatestr, multi, function (err, res) {
    	if (err) {
    		console.log('Error: ' + err);
    	} else {
    		console.log('Res: %o', res);
    	}
    });
    ```
    
- 5.2 修改 API 之 `findByIdAndUpdate` 方法

    `findByIdAndUpdate(id, updateobj, callback)`
    
    - `id`
    
        要修改那条数据的 id；
    
    - `updateobj`
            
        要修改的字段，下面的例子中为修改用户密码字段；
    
    - `callback`
        
        回调函数，判断当前更新是否成功。参数 `res` 为根据 id 查询到的那条数据对象。

    ```
    var id = '59a3c01e50f4b32148fe49a5';
    var updatepwd = {'userpwd': 'vvvv'}
    User.findByIdAndUpdate(id, updatepwd, function (err, res) {
    	if (err) {
    		console.log('Error: ' + err);
    	} else {
    		console.log('Res: %o', res);
    	}
    });
    
    // res = { _id: 59a3c01e50f4b32148fe49a5,
    //   username: 'bob james',
    //   userpwd: '321',
    //   userage: 32,
    //   logindate: 2017-08-28T07:02:54.537Z,
    //   __v: 0 }
    ```

### 6. 删除一条数据

- 6.1 删除 API 之 `remove` 方法

    `remove(condition, callback)`

    - `condition` 
        
        修改的对象应该是数据库中已存在的一条数据，ownobj 为查询条件，在下面的例子为查询 username 为 `bob james` 的对象对其进行修改；
    
    - `callback`
    
        回调函数，判断当前更新是否成功。下面例子中：`res = { n: 1, ok: 1 }`，`n` 表示 ownobj 查询到的对象个数，ok 为成功删除的对象个数。
    
    ```
    var condition = {'username': 'bob james'};
    User.remove(condition, function (err, res) {
    	if (err) {
    		console.log('Error: ' + err);
    	} else {
    		console.log('Res: %o', res);
    	}
    });
    ```
- 6.2 修改 API 之 `findByIdAndRemove` 方法

    `findByIdAndRemove(id, callback)`

    - `id` 
        
        要删除那条数据的 id 值；
    
    - `callback`
    
        回调函数，判断当前删除是否成功。res 为根据 id 查询查询到的对象。
        
    ```
    var id = '59a3c70b2be0770b846a752e';
	User.findByIdAndRemove(id, function (err, res) {
		if (err) {
			console.log('Error: ' + err);
		} else {
			console.log('Res: %o', res);
		}
	});
    ```

### 7. 查询数据

- 7.1 条件查询

    `find(condition, showfields, callback)`
    
    - condition
    
        查询条件，对象格式，查询条件不写则表示查询全部，如下例中为查询年龄为 23 岁的数据；
    
    - showfields
    
        显示字段，对象格式，字段值为 1 表示显示，值为 0 表示不显示；
        
    - callback 
    
        回调函数，其中 res 为查询到的数据，数组格式。
    
    ```
    var condition = {'userage': 23};
    var showfields = {'username': 1, '_id': 0}
    User.find(condition, showfields, function (err, res) {
    	if (err) {
    		console.log('Error: ' + err);
    	} else {
    		console.log('Res: %o', res);
    	}
    });
    
    // res = [ { username: 'dkvirus' } ]
    ```

- 7.2 条件运算符

    在数据库中，条件运算符及其重要，举例说明：获取年龄大于 20 岁小于 30 岁的所有数据。

    ```
    var condition = {userage: {$gte: 20, $lte: 30}};
	User.find(condition, function (err, res) {
		if (err) {
			console.log('Error: ' + err);
		} else {
			console.log('Res: %o', res);
		}
	});
    ```

    常用运算符收集如下：
    
    ```
    $or　　　　         或关系

    $nor　　　          或关系取反
    
    $gt　　　　         大于
    
    $gte　　　          大于等于
    
    $lt　　　　         小于
    
    $lte　　　          小于等于
    
    $ne                 不等于
    
    $in                 在多个值范围内
    
    $nin                不在多个值范围内
    
    $all                匹配数组中多个值
    
    $regex　　          正则，用于模糊查询
    
    $size　　　         匹配数组大小
    
    $maxDistance　　    范围查询，距离（基于LBS）
    
    $mod　　            取模运算
    
    $near　　　         邻域查询，查询附近的位置（基于LBS）
    
    $exists　　         字段是否存在
    
    $elemMatch　　      匹配内数组内的元素
    
    $within　　         范围查询（基于LBS）
    
    $box　　　          范围查询，矩形范围（基于LBS）
    
    $center             范围醒询，圆形范围（基于LBS）
    
    $centerSphere　　   范围查询，球形范围（基于LBS）
    
    $slice　　　        查询字段集合中的元素（比如从第几个之后，第N到第M个元素）
    ```

- 7.3 模糊查询

    模糊查询在实际应用上及其普遍，应熟练掌握。下例为为查询用户名中包含字母 `c` 的数据，不区分大小写。
    
    ```
    var condition = {'username': {$regex: /c/i}};
    User.find(condition, function (err, res) {
    	if (err) {
    		console.log('Error: ' + err);
    	} else {
    		console.log('Res: %o', res);
    	}
    });
    ```

- 7.4 根据 ID 查找

    `findById(id, callback)`

    ```
    var id = '59a3b25db0ddb621701db1cb';
	User.findById(id, function (err, res) {
		if (err) {
			console.log('Error: ' + err);
		} else {
			console.log('Res: %o', res);
		}
	});
    ```
    
- 7.5 获取查找数据的个数

    `count(condition, callback)`

    ```
    var condition = {userage: {$gte: 20, $lte: 30}};
    User.count(condition, function (err, res) {
    	if (err) {
    		console.log('Error: ' + err);
    	} else {
    		console.log('Res: %o', res);
    	}
    });
    ```

- 7.6 分页查询

    链式写法实现分页查询。

    ```
    var pageSize = 5;		// 一页多少条数据
    var currentPage = 1;	// 当前第几页
    var sort = {'logindate': -1};	// -1 表示倒序，1 表示正序
    var condition = {};		// 查询条件
    var skipnum = (currentPage - 1) * pageSize;	// 跳过数
    
    User.find(condition)	// 条件为空对象时表示查询全部
    	.skip(skipnum)     	// 从下标数为 skipnum 开始统计数据
    	.limit(pageSize)	// 从 skipnum 下标开始统计 pageSize 个数据
    	.sort(sort)			// 统计完成后进行排序
    	.exec(function (err, res) {		// 得到最终数据 res 
    		if (err) {
    			console.log('Error: ' + err);
    		} else {
    			console.log('Res: %o', res);
    		}
    	});
    ```

# 三、钩子函数

林子大了什么鸟都有，mongoose 模块还提供了另外两个用于监听的方法来处理层出不穷的业务逻辑。

经过测试，并不是所有方法都可以被监听到，可以被监听到的方法收集如下：

- `save`
- `remove` 
- `findOneAndRemove`
- `update`
- `findOneAndUpdate`
- `find`
- `findOne`
- `count`
- `init`
- `validate`



### 1. `pre(method, callback)` 

method 方法执行之前先执行 pre 方法。

```
var Schema = mongoose.Schema;
var UserSchema = new Schema({ username: 'String' });

// pre 方法监听 save 方法执行之前回调函数
UserSchema.pre('save', function (next) {
	cosnole.log('要准备保存了');
	next();
});

var User = mongoose.model('User', UserSchema);
var user = new User({
	username: 'dkvirus'
});
user.save(function (err, res) {
	if (err) {
		console.log('Error: ' + err);
	} else {
		console.log('Res: ' + res);
		
	}
});
```

### 2. `post(method, callback)`

method 方法执行之后会执行 post 方法。

```
var Schema = mongoose.Schema;
var UserSchema = new Schema({ username: 'String' });

// post 方法监听 save 方法执行完毕后回调函数
UserSchema.post('save', function (res) {
	console.log('数据被保存了，保存数据的Id为: ' + res._id);
});

var User = mongoose.model('User', UserSchema);
var user = new User({
	username: 'dkvirus'
});
user.save(function (err, res) {
	if (err) {
		console.log('Error: ' + err);
	} else {
		console.log('Res: ' + res);
		
	}
});
```

# 四、参考文章
### 1. [Mongoose介绍和入门](http://www.jianshu.com/p/c29334634114)
### 2. [node第三方库之【mongoose模块】](http://blog.csdn.net/baidu_32262373/article/details/56519712)
### 3. [Mongoose初使用总结](http://www.jianshu.com/p/265ff15bca7a)
