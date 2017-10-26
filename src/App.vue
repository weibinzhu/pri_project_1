<template>
  <div id="app">
    <!--<transition name="routerViewMove">-->
      <!--不知道为什么，反正必须把keep-alive放在transition里面-->
      <!--taskDetail页面不需要缓存-->
    <!--需要传数据的都不应该keep-alive-->
      <!--这里的taskDetail是组件的name-->
      <keep-alive exclude="taskDetail,serviceDetail,signUpPhone,xiakeMainPage,login,contract,taskManageMainPage">
        <router-view></router-view>
      </keep-alive>
    <!--</transition>-->
  </div>
</template>

<script>
  import store from '@/store.js' // import 我们创建的 store
  export default {
    name: 'app',
    store: store,  // 在根组件加入 store，让它的子组件和 store 连接,
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  .routerViewMove-leave-active {
    transition: all .2s;
  }

  .routerViewMove-enter-active {
    transition: all .2s .2s;
  }

  .routerViewMove-enter /* .fade-leave-active in below version 2.1.8 */ {
    /*transform: translateX(-100%)*/
    opacity: 0
  }

  /*.routerViewMove-enter-to!* .fade-leave-active in below version 2.1.8 *! {*/
  /*opacity: 0;*/
  /*!*transform: translateX(0)*!*/
  /*}*/
  /*.routerViewMove-leave{*/
  /*opacity: 0;*/
  /*!*transform: translateX(0)*!*/
  /*}*/
  .routerViewMove-leave-to {
    /*transform: translateX(100%)*/
    opacity: 0
  }
</style>
