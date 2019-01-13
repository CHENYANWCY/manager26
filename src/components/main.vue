<template>
    <div>主页
        <el-button @click="logout" type="success">退出</el-button>
    </div>
</template>

<script>
export default {
    //声明周期函数
    beforeCreate() {
        //判断是否又token
        let token = window.sessionStorage.getItem('token');
        if (token) {
            //登陆成功
        }else{
            //没有token 没有登陆
            this.$message.error('请先登陆');
            //跳转到登陆页  编程式导航
            this.$router.push('login');
        }
    },
    methods: {
        logout () {
            window.sessionStorage.removeItem('token');
            //编程式导航
            this.$router.push('login');
        }
    },
}
</script>

<style>

</style>
