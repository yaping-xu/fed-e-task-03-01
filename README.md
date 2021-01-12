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
```
export function set(target: Array<any> | Object, key: any, val: any): any { 
 // target 为数组 
 if (Array.isArray(target) && isValidArrayIndex(key)) {   
  // 修改数组的长度, 避免索引>数组长度导致splice()执行有误   
   target.length = Math.max(target.length, key);   
  // 利用数组的splice变异方法触发响应式   
  target.splice(key, 1, val);  
   return val; 
  } 
  // target为对象, key在target或者target.prototype上 且必须不能在 Object.prototype 上,直接赋值 
    if (key in target && !(key in Object.prototype)) {    
    target[key] = val;   
    return val; 
 }  
 // 以上都不成立, 即开始给target创建一个全新的属性 
  // 获取Observer实例 
  const ob = (target: any).__ob__;  
  // target 本身就不是响应式数据, 直接赋值 
   if (!ob) {  
     target[key] = val;  
     return val;
   }  
   // 进行响应式处理
     defineReactive(ob.value, key, val);
     ob.dep.notify(); 
      return val;
  } 
```
如果目标是数组,使用 vue 实现的变异方法 splice 实现响应式
如果目标是对象,判断属性存在,即为响应式,直接赋值
如果 target 本身就不是响应式,直接赋值
如果属性不是响应式,则调用 defineReactive 方法进行响应式处理
最后 ob.dep.notify() ，通过notify来通知订阅者处理
