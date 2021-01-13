## 简答
#### 当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。
- 是否为响应式？
不是，Vue.js在初始化实例的时候将属性转换为getter/setter,所以属性必须在data对象上才能让Vue.js转换他，才能是响应式的。
- 如何设置 ？
```
method: {
  clickHandler () {
    this.$set(this.dog,"name", 'Trump')
  }
}
```
- 内部原理是什么？
this.$set()是将set函数绑定在Vue原型上

1. 如果目标是数组,使用 vue 实现的变异方法 splice 实现响应式
2. 如果目标是对象,判断属性存在,即为响应式,直接赋值
3. 如果 target 本身就不是响应式,直接赋值
4. 如果属性不是响应式,则调用 defineReactive 方法进行响应式处理
5. 最后 ob.dep.notify() ，通过notify来通知订阅者处理

#### 请简述 Diff 算法的执行过程
- patch(oldVNode,newVNode)，对比新旧节点，最后返回新节点作为下一次处理的旧节点
- 对比新旧节点的key和sel是否为相同，如果相同则为相同节点
- 不同节点，删除重新渲染
- 如果相同在判断newVNode是否有text，有并且和oldVNode不同直接更新文本内容到dom上
- 如果newVNode有children，判断子节点是否有变化。
- diff过程只是进行同层级比较，时间复杂度O(n)

## 编程题
#### [模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。](./code/hash-router/src/myrouter)
#### [在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。](./code/vueResponse/compiler.js)
#### [参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果](./code/snabbdom/index.html)

## 学习笔记
- [vue响应式原理](https://juejin.cn/post/6916433672820228110/)
- [vue-router](https://juejin.cn/post/6910002454713073672)
- [虚拟dom](https://www.processon.com/diagraming/5ff2c7c85653bb21c1b8b9f0)