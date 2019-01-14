//导入axios
import axios from 'axios';

// import Vue from 'vue';
import { Message } from 'element-ui';


//设置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';

//请求之前会触发这个回调函数
axios.interceptors.request.use( (config)=> {
    //判断请求的是登陆还是其他的url地址
    if (config.url.indexOf('/login')!=-1) {
        //登陆接口
    }else{
        //非登陆接口
        config.headers.Authorization = window.sessionStorage.getItem('token');
    }
    return config;
  }, function (error) {
    // 出错了
    return Promise.reject(error);
  });

  //axios响应拦截器
  //请求响应回来之后会触发这个回调函数
  axios.interceptors.response.use( (response)=> {
    // 根据响应的状态码 统一用户提示
    if (response.data.meta.status ===200) {
        //成功 提示返回的信息
        Message.success(response.data.meta.msg);
    }else if(response.data.meta.status ===400){
        Message.error(response.data.meta.msg);
    }
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

//暴露出去(vue插件)
export default {
    install(Vue){
        //4.添加实例方法
        Vue.prototype.$axios = axios;
    }
}