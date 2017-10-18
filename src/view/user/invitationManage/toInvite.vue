<template>
  <div class="toInviteWrapper">
    <v-header title="邀请好友" :shareShow="true"></v-header>
    <div class="notice">
      <img src="./speaker.png"/>长按右键，保存图片
    </div>
    <img class="banner" src="/static/banner2@3x.png"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'

  export default {
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .toInviteWrapper
    display: flex
    flex-direction: column
    background-color: #f8f8f8
    min-height: 100vh
    font-size: px2-2-rem(32)
    .notice
      box-sizing: border-box
      display: flex
      align-items: center
      width: 100%
      height: px2-2-rem(95)
      color: #00a0e9
      padding-left: px2-2-rem(40)
      background-color: #ffffff
      img
        height: px2-2-rem(42)
        width: px2-2-rem(42)
        margin-right: px2-2-rem(22)
    .banner
      width :100%
      height :px2-2-rem(378)
</style>
