<template>
  <div class="serviceDetailWrapper">
    <v-header @share="onShareClick" title="服务详情" :shareShow="true"></v-header>
    <!--内容区块Wrapper-->
    <div class="serviceInfoWrapper">
      <!--内容块-->
      <div class="serviceInfoBlock">
        <div class="subBlock">
          <div class="serviceInfoHeader">UI设计</div>
          <div class="serviceInfoContent">
            服务内容服务内容服务内容服务内容服务内容服务内容服务内容服务内容服务内容服务内容服务内容服务内容服务内容服务内容
          </div>
        </div>
        <div class="price">
          价格<span>{{price}}元/次</span>
        </div>
      </div>
      <!--内容块-->
      <div class="serviceInfoBlock">
        <div class="serviceInfoHeader">
          我的成就
        </div>
        <div class="serviceInfoContent">
          市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广市场推广
        </div>
      </div>
      <!--内容块-->
      <div class="serviceInfoBlock">
        <div class="serviceInfoHeader">
          作品图片
        </div>
        <div class="picBlock">
          <img src="./picture@3x.png"/>
          <img src="./picture@3x.png"/>
          <img src="./picture@3x.png"/>
          <img src="./picture@3x.png"/>
        </div>
      </div>
    </div>
    <!--底部按钮-->
    <footer class="toEdit">编辑</footer>
    <!--广告-->
    <transition name="adFade">
      <div class="adWrapper" v-show="showAd">
        <img class="adImg" src="/static/pic@3x.png"/>
        <img @click="onCloseBtnClick" class="closeBtn" src="./Close@3x.png"/>
        <div class="getAppBtn">
          下载行峡APP
        </div>
      </div>
    </transition>
    <!--遮罩-->
    <transition name="overlayFade">
      <div class="overlay" v-show="showAd"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../../../../components/v-header/v-header.vue'

  export default {
    name: 'serviceDetail',
    data() {
      return {
        id: undefined,
        price: 3000,//价格
        showAd: false,// 广告（下载行峡APP）显隐
      }
    },
    methods: {
      onCloseBtnClick() {
        if (this.showAd) {
          this.showAd = false
        }
      },
      onShareClick() {
        if (!this.showAd) {
          this.showAd = true
        }
      },
    },
    created() {
      this.id = this.$route.params.id
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/style/fun.styl"
  .serviceDetailWrapper
    font-size: px2-2-rem(32)
    min-height: 100vh
    background-color: #f8f8f8
    padding-bottom: px2-2-rem(130)
    .serviceInfoWrapper
      display: flex
      flex-direction: column
      align-items: center
      background-color: #f8f8f8
    .serviceInfoBlock
      box-sizing: border-box
      display: flex
      flex-direction: column
      width: 100%
      padding: 0 px2-2-rem(20) px2-2-rem(30) px2-2-rem(36)
      margin-bottom: px2-2-rem(30)
      border-radius: px2-2-rem(8)
      border-top: 1px solid #e5e5e5
      background-color: #ffffff
      .price
        display: flex
        align-items: center
        justify-content: space-between
        height: px2-2-rem(88)
        border-top: 1px solid #e5e5e5
        span
          color: #888888
      .serviceName
        display: flex
        align-items: center
        margin-top: px2-2-rem(20)
        padding-left: px2-2-rem(36)
      .serviceDesc
        margin-top: px2-2-rem(10)
        padding-left: px2-2-rem(36)
        font-size: px2-2-rem(28)
        color: #999999
      .serviceInfoHeader
        display: flex
        flex-direction: row
        align-items: center
        height: px2-2-rem(82)
      .serviceInfoContent
        padding :px2-2-rem(20) 0
        font-size: px2-2-rem(28)
        color: #999999
      .picBlock
        display: flex
        flex-direction: row
        padding: px2-2-rem(10) 0 px2-2-rem(40)
        img
          width: px2-2-rem(145)
          height: px2-2-rem(145)
          margin-right: px2-2-rem(18)
    .overlay
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1000;
      background-color: rgba(0, 0, 0, .8);
    .toEdit
      position: fixed
      bottom: 0
      width: 100%
      height: px2-2-rem(86)
      line-height: px2-2-rem(86)
      text-align: center
      color: #ffffff
      background-color: #00a0e9
    .adWrapper
      position: absolute
      display: flex
      flex-direction: column
      align-items: center
      top: 12%
      left: 12%
      z-index: 10000
    .adImg
      position: relative
      width: px2-2-rem(586)
    .closeBtn
      position: absolute
      top: px2-2-rem(-40)
      right: px2-2-rem(-40)
      width: px2-2-rem(78)
      height: px2-2-rem(78)
    .getAppBtn
      margin-top: px2-2-rem(50)
      width: px2-2-rem(428)
      height: px2-2-rem(90)
      line-height: px2-2-rem(90)
      text-align: center
      font-size: px2-2-rem(32)
      color: #ffffff
      background-color: #00a0e9
      border-radius: px2-2-rem(42) px2-2-rem(42)
    .overlayFade-leave-active, .overlayFade-enter-active, .adFade-enter-active, .adFade-leave-active
      transition: all .5s
    .overlayFade-enter, .overlayFade-leave-to, .adFade-enter, .adFade-leave-to
      opacity: 0
</style>
