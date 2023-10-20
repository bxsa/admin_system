import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
//注册全局组件
import HintButton from '@/components/HintButton';
import  categorySelect from '@/components/categorySelect';
Vue.component(categorySelect.name,categorySelect);
Vue.component(HintButton.name,HintButton);

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
//引入相关API请求接口
import  API from './api';
//将接口文件绑定在vue原型上，目的使所有组件都可以访问到所有接口
//组件实例的原型的原型指向的是vue.prototype
//任意组件可以使用api相关的接口。 
Vue.prototype.$API=API;
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
