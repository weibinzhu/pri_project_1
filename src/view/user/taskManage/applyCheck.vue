<template>
  <div class="applyCheckWrapper">
    <v-header title="申请验收"></v-header>
    <div class="paidMoney">
      <div class="money">付款金额：<span>￥{{money}}</span></div>
      <div class="modify">修改</div>
    </div>
    <p class="applyText">
      已完成工作，申请验收
    </p>
    <p class="noticeText">
      1、申请说明。。。
    </p>
    <footer class="checkConfirm">确认验收</footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'

  export default {
    data() {
      return {
        money: 13000,// 付款金额
      }
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .applyCheckWrapper
    display: flex
    flex-direction: column
    min-height: 100vh
    background-color: #f8f8f8
    font-size: px2-2-rem(32)
    .paidMoney
      box-sizing: border-box
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      height: px2-2-rem(86)
      padding: 0 px2-2-rem(30)
      border-bottom: 1px solid #e5e5e5
      border-top: 1px solid #e5e5e5
      background-color :#ffffff
      .money
        span
          color: #e4790f
      .modify
        color: #00a0e9
    .applyText
      box-sizing: border-box
      font-size :px2-2-rem(28)
      height :px2-2-rem(200)
      padding:px2-2-rem(30)
      background-color :#ffffff
    .noticeText
      font-size :px2-2-rem(28)
      color:#999999
      padding:px2-2-rem(30)
    .checkConfirm
      position: fixed
      bottom: 0
      font-size: px2-2-rem(32)
      width: 100%
      height: px2-2-rem(86)
      line-height: px2-2-rem(86)
      text-align: center
      color: #ffffff
      background-color: #00a0e9
</style>
