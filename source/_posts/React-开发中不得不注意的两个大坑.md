---
title: React 开发中不得不注意的两个大坑
date: 2018-03-19 11:39:02
categories:
- 前端
tags:
- React
---

> 本篇文章介绍笔者在使用 React 中遇到的两个大坑，希望各位读者看到可以避免。主要为函数式编写组件与状态管理器的精髓。

## 一、避免使用函数式编写组件

### 1. 编写组件的两种方式

React 中的组件简单理解就是输出元素，[官网](https://reactjs.org/docs/components-and-props.html)提供两种书写方式：`Functional Component` 和 `Class Components`。

**函数式（Functional Component）编写组件**：输入参数，返回元素。

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

**类式（Class Components）编写组件**

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

> Classes have some additional features that we will discuss in the [next sections](https://reactjs.org/docs/state-and-lifecycle.html). Until then, we will use functional components for their conciseness.

官网的解释 `Class Components` 有一些特性是 `Functional Component` 所没有的，最常见的有 `生命周期钩子函数` 和 `state` 这两个特性。

### 2. 函数式组件没有生命周期钩子函数

实际开发中，当组件加载完成时想要发起 http 请求去获取数据啥的，如果使用 `Functional Component` 编写的组件就会一筹莫展，而使用 `Class Components`  只需添加一个钩子函数即可。

```
class List extends React.Component {
  // 当页面加载完成 React 会自动调用该生命周期钩子方法
  // 在这个方法里可以完成一些初始化数据的功能
  componentDidMount () {
    axios.get('/api/v1/list');
    // ....
  }

  render () {
    return (<h1>hello world!</h1>);
  }
}
```

### 3. 函数式组件没有 state 特性管理内部属性

当使用状态管理器，如 dva 或 redux 时。如果使用 `Functional Component` 编写组件就需要把每个属性都扔到状态管理器中，但事实上有些属性只是该组件内部使用，压根不属于共享属性。如果使用 `Class Components` 编写的组件可以很方便的使用 state 管理内部属性。（如果对 state 不了解，可以参照[官网 state 示例](https://reactjs.org/docs/state-and-lifecycle.html)）

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

### 4. 小结

**不要使用函数式（Functional Component）编写组件**。

**不要使用函数式（Functional Component）编写组件**。

**不要使用函数式（Functional Component）编写组件**。

### 二、状态管理器的精髓

相信很多人和我一样，最初接触状态管理器（React 中有 redux 和 dva）不知道干嘛用，只是人家用，我也用。

在 vue 官网上看到这么一句话：**Flux 架构就像眼镜：您自会知道什么时候需要它。**（flux 和 vuex、dva、redux 一样都是状态管理器，是最早的状态管理器，后续的都是重复造轮子行为）

上面那不知道哪位名人说的话简直就是**放屁**，因为下面我会通过简单的示例揭开状态管理器的神秘面纱以及正确使用姿势。

### 1. 传统组件传值

```
// 父组件
class Parent extends React.Component {
  constructor () {
    this.state = { now: new Date() };
  }

  render () {
    // 调用子组件并传递属性 today
    return (
      <Children today={this.state.now} />
    );
  }
}

// 儿子组件
class Children extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    // 接收父组件传递的参数 today
    const { today } = this.props;
    return (<h1>{today}</h1>);
  }
}
```

上述代码是简单的父组件往子组件传值，设想一下现在还有孙子组件 （只有儿子组件可以调用孙子组件）`<Grandson>`，并且父组件要往孙子组件传值，这需要两步：

- 父组件传值给儿子组件；
- 儿子组件传值给孙子组件。

不妨再设想一下，现在不是传一个参数，而是传七八上十个参数，需要不停地一层层中转。

这时候就会想，如果有一个全局对象，父组件将自己的属性保存在全局对象里，孙子组件如果需要参数可以直接去全局对象中获取，而不再通过子组件传递。

### 2. 状态管理器让组件间共享数据变得更加方便

状态管理器就做这么一个全局对象的事儿，在 `dva` 中尤其方便，孙子组件只需通过 `connect` 绑定状态管理器即可获取里面的数据。（其它状态管理器也提供类似接口）

```
import { connect } from 'dva';

class Grandson extends React.Component {
  render () {
    const { parentProps } = this.props.parent ;
    return (<h3>{parentProps}</h3>);
  } 
}

Grandson  = connect(({ parent }) => ({ parent }))(Grandson);
```

### 3. 什么时候用状态管理器

理论上，状态管理器处理组件间共享数据。组件内部有的属性并不共享，而是内部独有的，此时就可以使用上面提到的 `state` 来管理内部独有的属性，而将组件间需要共享的属性扔到状态管理器即可。

你也不用去理睬你的组件间是否存在共享数据的可能或程度，前端发展到现在，状态管理器是必经的一步，你大可在你的每个项目中都使用它。

随着时间的推移，有些开源作者将 `路由`、`状态管理器`、`UI 框架`、`打包工具` 等概念都糅合到一起开发成一个框架（包），我关注的开源项目 umi 就在做这么件事，感兴趣的可以自行研究研究。






