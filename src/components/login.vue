<template>
  <div class="login-container">
    <div class="from-container">
      <h2>用户登陆</h2>

      <el-form label-position="top" :rules="rules" ref='formData' label-width="80px" :model="formData">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-button class="login-btn" @click="submitForm('formData')"  type="primary">用户登陆</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      formData: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 3, message: "长度在 3 到 10 个字符", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证成功
          //axios调用接口
          this.$axios.post("login", this.formData).then(res => {
            if (res.data.meta.status === 400) {
              //错误
            } else if (res.data.meta.status == 200) {
              //正确
              //保存token sessionStorage
              window.sessionStorage.setItem('token',res.data.data.token);
              //去首页
              this.$router.push('/');
            }
          });
        } else {
          //验证失败
          //弹框提示
          this.$message.error("请正确输入用户名和密码");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang='scss'>
.login-container {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .from-container {
    background-color: #fff;
    width: 580px;
    padding: 40px;
    box-sizing: border-box;
    border-radius: 10px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
