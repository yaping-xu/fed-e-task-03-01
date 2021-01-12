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
