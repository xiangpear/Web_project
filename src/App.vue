<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示，在Login、Register隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通知Vuex发请求，获取数据，存储于仓库中
    this.$store.dispatch("categoryList");
  }
};
</script>

<style>

</style>
