import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

//导入css全局样式
import './assets/base.css';

//导入自己抽取的axios插件
import VueAxios from './lib/vue-axios';
Vue.use(VueAxios);

//导入自己抽取的路由
import router from './lib/router';

//导入自己的面包屑
import myBreadcrumb from './components/myBreadcrumb.vue';
//注册面包屑组件
Vue.component('myBreadcrumb',myBreadcrumb)


new Vue({
  el: '#app',
  //挂载到最顶级的vue实例上
  router,
  render: h => h(App)
});
