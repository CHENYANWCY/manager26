//导入vue
import Vue from 'vue';
//导入路由
import VueRouter from 'vue-router';
//注册插件
Vue.use(VueRouter);

//导入组件
import login from '../components/login.vue';
import main from '../components/main.vue';

//导入嵌套组件
import user from '../components/user.vue';

//写路由规则
let routes = [{
        path: '/',
        component: main,
        children: [{
            path: 'users',
            component: user
        }]
    },
    {
        path: '/login',
        component: login
    }
]

//实例化路由
let router = new VueRouter({
    routes
})

//把路由暴露出去
export default router;