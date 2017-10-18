<template>
  <div class="zhimaWrapper">
    <v-header title="芝麻信用"></v-header>
    <div class="zhimaContent">
      <div class="zhimaTitle">芝麻信用认证</div>
      <p>能提高你在行峡网的功力值</p>
      <p>可提高你被找到的几率</p>
      <div class="zhimaNotice">芝麻信用是独立的第三方信用评估及信用管理机构。</div>
      <div class="zhimaBtn">马上认证</div>
    </div>
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
  .zhimaWrapper
    background-color: #f8f8f8
    height: 100%
    .zhimaContent
      position: fixed
      left: px2-2-rem(126)
      bottom: px2-2-rem(146)
      display: flex
      flex-direction: column
      align-items: center
      width: px2-2-rem(502)
      height: px2-2-rem(662)
      background-color: #ffffff
      box-shadow: 0px 3px 25px -1px rgba(204,204,204,1);
      .zhimaTitle
        font-size: px2-2-rem(36)
        font-weight: 600
        margin: px2-2-rem(60) 0
        color: #00a0e9
      p
        font-size: px2-2-rem(26)
        line-height: px2-2-rem(60)
        color: #999999
      .zhimaNotice
        box-sizing :border-box
        display: flex
        flex-direction: column
        justify-content: center
        width: px2-2-rem(432)
        height: px2-2-rem(122)
        font-size: px2-2-rem(26)
        text-align: center
        color: #00a0e9
        padding : 0 px2-2-rem(38)
        margin-top: px2-2-rem(60)
        background-color: #d8f0fb
      .zhimaBtn
        display: flex
        flex-direction: column
        justify-content: center
        width: px2-2-rem(432)
        height: px2-2-rem(112)
        font-size: px2-2-rem(32)
        text-align: center
        color: #ffffff
        margin: px2-2-rem(30) 0
        background-color: #00a0e9
</style>
