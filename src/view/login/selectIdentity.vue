<template>
  <div class="selectIdentityWrapper">
    <v-header title="选择身份"></v-header>
    <div class="selectBtnWrapper">
      <div class="selectBtn" @click="onEmployerClick">
        <img src="./employer@3x.png"/>
        <p>我是旅游业者</p>
        <p>我有旅业需求</p>
      </div>
      <div class="selectBtn" @click="onXiakeClick">
        <img src="./xiake@3x.png"/>
        <p>我是旅游创客</p>
        <p>我来行峡仗义</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../../components/v-header/v-header.vue'

  export default {
    methods:{
      onEmployerClick(){
        // 选择了雇主身份
        alert('注册成功')
        this.$router.push({path:'/home'})
      },
      onXiakeClick(){
        // 选择了峡客身份，需要进一步填写资料
        this.$router.push({path:'/xiakeSignUp'})
      }
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/fun.styl"
  .selectIdentityWrapper
    min-height: 100vh
    background-image: url("./bg2@3x.png")
    background-size: cover
    .selectBtnWrapper
      display: flex
      align-items :center
      width: px2-2-rem(676)
      height: px2-2-rem(518)
      margin-top: px2-2-rem(294)
      margin-left: auto
      margin-right: auto
      background-color :rgba(0,0,0,0.6)
      border-radius :px2-2-rem(20)
      .selectBtn
        flex: 1
        display :flex
        flex-direction :column
        align-items :center
        justify-content :center
        font-size :px2-2-rem(32)
        color:#ffffff
        img
          width :px2-2-rem(228)
          height :px2-2-rem(264)
          margin-bottom :px2-2-rem(30)
        p
          line-height :px2-2-rem(40)
      .selectBtn:first-child
        box-sizing :border-box
        border-right :1px dotted #ffffff
</style>
