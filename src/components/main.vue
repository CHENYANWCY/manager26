<template>
  <div class="contenter">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <img src="../assets/logo.png" alt>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light">电商后台管理系统</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-button @click="logout" type="success">退出</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router>
            <el-submenu v-for="(item, index) in menuList" :key="item.id" :index="item.order+''">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item v-for="(it, i) in item.children" :key="it.id" :index="'/'+it.path">
                <i class="el-icon-menu"></i>
                {{it.authName}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
       <el-main>
         <router-view></router-view>
       </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      menuList: []
    };
  },
  methods: {
    logout() {
      this.$confirm("真的要退出吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //退出成功
          window.sessionStorage.removeItem("token");
          //编程式导航
          this.$router.push("login");
          //退出之后的提示信息
          this.$message({
            type: "success",
            message: "你已退出!"
          });
        })
        .catch(() => {
          //取消退出之后的提示信息
          this.$message({
            type: "info",
            message: "不退出"
          });
        });
    }
  },
  created() {
    this.$axios
      .get("menus")
      .then(res => {
        // console.log(res);
        this.menuList = res.data.data;
      });
  }
};
</script>

<style lang='scss'>
.contenter {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header,
    .el-footer {
      background-color: #b3c0d1;
      color: #333;
      text-align: center;
      line-height: 60px;
      .el-col-4 {
        text-align: left;
      }
      .el-col-18 {
        font-size: 30px;
        font-weight: bold;
        color: white;
      }
      .el-col-2 {
        text-align: right;
      }
    }

    .el-aside {
      background-color: #d3dce6;
      color: #333;
      text-align: center;
      line-height: 200px;
      .el-submenu__title {
        text-align: left;
      }
    }

    .el-main {
      background-color: #e9eef3;
      color: #333;
    }
  }
}
</style>
