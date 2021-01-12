
let _Vue = null;
export default class VueRouter {
  constructor(options) {
    this.options = options
    this.routeMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
  }

  // Vue.use()后会调用这个函数
  static install(Vue){
    
    // 1. 组件是否已经被注册
    if(VueRouter.install.installed){
      return
    }
    VueRouter.install.installed = true
    // 2. 全局作用域存储Vue
    _Vue = Vue
    // 3. 创建Vue实例时候传入的router，注入到所有Vue实例上
    _Vue.mixin({
      beforeCreate() {
        if(this.$options.router){
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      },
    })
  }

  // 存入component键值对
  createRouteMap() {
    this.options.routes.forEach((route)=>{
      this.routeMap[route.path] = route.component
    })
  }

  // 初始化component
  initComponent(Vue) {
    Vue.component('router-link',{
      props: {
        to: String,
      },
      render(h){
        return h('a', {
          attrs: {
            herf: this.to
          },
          on: {
            click: this.clickHandler
          }
        },[this.$slots.default]);
      },
      methods: {
        clickHandler(e){
          console.log()
          const path = VueRouter.getUrl(this.to)
          window.location.replace(path)
          // 把当前路径记录到current里面
          this.$router.data.current = this.to
          e.preventDefault();
        }
      }
      // template: '<a :herf="to"><slot></slot></a>'
    })
    const self = this
    // 创建router-view
    Vue.component('router-view', {
      render(h){
        const component = self.routeMap[self.data.current]
        return h(component)
      }
    })
  }

  initEvent(){
    window.addEventListener('hashchange',()=>{
      console.log('hashchange',window)
      this.data.current = window.location.hash.slice(1)
    })
  }

  // 初始化函数
  init(){
    this.createRouteMap()
    this.initComponent(_Vue)
    this.initEvent()
  }

  static getUrl (path) {
    const href = window.location.href
    const i = href.indexOf('#')
    const base = i >= 0 ? href.slice(0, i) : href
    return `${base}#${path}`
  }

}