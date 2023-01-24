//引入vue.js
import Vue from 'vue'
//引入App组件，他是所有组件的父组件
import App from './App.vue'
//关闭vue的生产提示
Vue.config.productionTip = false

//创建vue实例
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this //安装全局事件总线
  }
}).$mount('#app') //绑定root容器
