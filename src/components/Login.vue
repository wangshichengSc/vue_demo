<template>
  <div>
    <el-row style="text-align: center;margin-top: 100px">
      <el-col :span="8" :offset="8">
        <h1>PaLaPaLa</h1>
        <el-form>
          <el-form-item label="用户名">
            <el-input v-model="userName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userName: '',
        password: ''
      }
    },
    methods: {
      login() {
        // alert(this.password + "," + this.userName);
        this.$store.commit('LOGIN_TOKEN', 'token1234');
        this.$store.commit('LOGIN_USERNAME', 'wsc');
        this.$store.commit('LOGIN_STATE', true);
        // console.log(this.$route.query);
        let jumpPath = this.$route.query.redirect;
        if (jumpPath === '' || jumpPath == null || jumpPath == undefined) {
          jumpPath = '/test';
        }
        this.$router.push(jumpPath);
      }
    }
  }
</script>
<style></style>
