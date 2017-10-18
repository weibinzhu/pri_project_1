<template>
  <div class="takeCareMoneyWrapper">
    <v-header title="托管资金"></v-header>
    <div class="moneyWrapper">
      <div class="moneyItem">
        <div class="title">合同金额</div>
        <div class="price">￥{{contractPrice}}</div>
      </div>
      <div class="moneyItem">
        <div class="title">已托管</div>
        <div class="price">￥{{already}}</div>
      </div>
      <div class="moneyItem">
        <div class="title">本次托管</div>
        <div class="price">￥{{thisTime}}</div>
      </div>
    </div>
    <div class="payHeader">支付方式</div>
    <div class="payMethodWrapper">
      <div class="payMethod">
        <input id="wxPay" type="radio" name="method" value="wxPay">
        <label for="wxPay" class="title">
          <img src="./wechat@3x.png"/>微信支付
        </label>
      </div>
      <div class="payMethod">
        <input id="aliPay" type="radio" name="method" value="aliPay">
        <label for="aliPay" class="title">
          <img src="./wechat@3x.png"/>支付宝支付
        </label>
      </div>
    </div>
    <p class="notice">{{notice}}</p>
    <footer class="toPay">确定支付</footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'

  export default {
    data() {
      return {
        contractPrice: 36000,// 合同金额
        already: 0, // 已托管
        thisTime: 12000, // 本次托管
        notice: '*交易保障：行峡网是雇主行峡网是雇主行峡网是雇主行峡网是雇主行峡网是雇主行峡网是雇主行峡网是雇主',// 底部提示文字
      }
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/style/fun.styl"
  .takeCareMoneyWrapper
    display: flex
    flex-direction: column
    align-items: center
    min-height: 100vh
    background-color: #f8f8f8
    .moneyWrapper
      box-sizing: border-box
      display: flex
      flex-direction: column
      width: 100%
      margin-bottom: px2-2-rem(30)
      padding-left: px2-2-rem(32)
      border-top: 1px solid #e9e9e9
      background-color: #ffffff
      .moneyItem
        display: flex
        flex-direction: row
        align-items: center
        height: px2-2-rem(88)
        font-size: px2-2-rem(32)
        border-bottom: 1px solid #e9e9e9
        .title
          width: px2-2-rem(160)
        .price
          color: #e4790f
    .payHeader
      box-sizing: border-box
      width: 100%
      height: px2-2-rem(58)
      line-height: px2-2-rem(58)
      font-size: px2-2-rem(28)
      padding-left: px2-2-rem(32)
    .payMethodWrapper
      box-sizing: border-box
      display: flex
      flex-direction: column
      align-items: center
      width: 100%
      padding-left: px2-2-rem(32)
      font-size: px2-2-rem(32)
      border-top: 1px solid #e9e9e9
      background-color: #ffffff
      .payMethod
        display: flex
        flex-direction: row
        align-items: center
        height: px2-2-rem(88)
        width: 100%
        border-bottom: 1px solid #e9e9e9
        .title
          position: relative
          flex: 1
          display: flex
          flex-direction: row
          align-items: center
          img
            width: px2-2-rem(50)
            height: px2-2-rem(50)
            margin-right: px2-2-rem(16)
        .title:after
          content: ""
          display: inline-block
          width: 0.4rem
          height: 0.4rem
          margin-right: 0.2666rem
          position: absolute
          right: px2-2-rem(32)
          bottom: 0.1066rem
          background-color: #fff
          border: 1px solid #bababa
          border-radius: 50%
        input[type=radio]
          display: none;
        input[type=radio]:checked + .title:after
          content: "\2022"
          color: #55abf4
          font-size: 0.4rem
          text-align: center
          line-height: 0.39rem // 微调，让小点在手机上也垂直居中
          border: 1px solid #55abf4
    .notice
      margin-top: px2-2-rem(30)
      padding: 0 px2-2-rem(32)
      font-size: px2-2-rem(28)
      color: #999999
    .toPay
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
