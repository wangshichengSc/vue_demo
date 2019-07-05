<template>
  <div id="app">
    <el-container direction="vertical">
      <el-header class="header" v-if="this.$store.state.isLogin">
        <Head></Head>
      </el-header>
      <el-container>
        <el-aside class="aside" width="250px" v-if="this.$store.state.isLogin">
          <Navigation></Navigation>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  import Navigation from './components/common/Navigation'
  import Head from './components/common/Head'

  export default {
    name: 'App',
    components: {
      Head,
      Navigation
    }
  }
</script>

<style>
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  }

  .header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    text-align: right;
    font-size: 12px
  }

  .aside {
    color: #333;
    height: 600px;
    background-color: rgb(238, 241, 246);
    border: 1px solid #eee
  }
</style>
