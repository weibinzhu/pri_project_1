<template>
  <div class="withdrawWrapper">
    <v-header title="提现"></v-header>
    <div class="contentBlock">
      <router-link to="/withdrawSetting" tag="div" class="account">
        <div class="title">提现账户</div>
        <div class="accountInfo">
          <div>{{bank}}</div>
          <div>{{accountNum}}</div>
          <div>{{name}} {{phone}}</div>
        </div>
        <img src="/static/arrow-right-gray.png"/>
      </router-link>
      <div class="withdrawMoney">
        <div class="title">提现金额</div>
        <div class="money"><span>￥</span>{{withdrawMoney}}</div>
      </div>
      <div class="contentNotice">
        可提现金额￥{{available}}<span>全部提现</span>
      </div>
    </div>
    <router-link to="/invoiceSetting" tag="div" class="invoiceInfo">
      <div class="title">开票信息</div>
      <div class="info">
        <div>{{invoiceInfo[0]}}</div>
        <div>{{invoiceInfo[1]}}</div>
      </div>
      <img src="/static/arrow-right-gray.png"/>
    </router-link>
    <div class="withdrawBtn">
      提交
    </div>
    <div class="withdrawNotice">
      <p>*最低提现金额￥50.00</p>
      <p>*提交后24小时内到账</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'

  export default {
    data() {
      return {
        bank: '中国人民银行 广州琶洲支行',
        accountNum: '000888 888 888 888 00',
        name: '郑某某',
        phone: 13415648956,
        withdrawMoney: 15620,
        available: 50.00,
        invoiceInfo: ['广州闻喜信息科技有限公司', 'XXXXXXXXXXXXXXXXXXXXXX']// 开票信息
      }
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../../common/style/fun.styl'
  .withdrawWrapper
    display: flex
    flex-direction: column
    align-items: center
    min-height :100vh
    background-color: #f8f8f8
    .invoiceInfo
      box-sizing: border-box
      display: flex
      flex-direction: row
      align-items: center
      width: 100%
      padding: px2-2-rem(20) px2-2-rem(30)
      border-top: 1px solid #e5e5e5
      border-bottom: 1px solid #e5e5e5
      font-size: px2-2-rem(32)
      background-color: #ffffff
      .title
        align-self: flex-start
        color: #353535
        margin-right: px2-2-rem(50)
      .info
        flex: 1
        font-size: px2-2-rem(28)
        color: #999999
      img
        width: px2-2-rem(16)
        height: px2-2-rem(24)
    .contentBlock
      display: flex
      flex-direction: column
      justify-content: center
      width: 100%
      margin-top: px2-2-rem(30)
      margin-bottom: px2-2-rem(20)
      background-color: #ffffff
      border-top: 1px solid #e5e5e5
      border-bottom: 1px solid #e5e5e5
      font-size: px2-2-rem(32)
      .account
        box-sizing: border-box
        display: flex
        flex-direction: row
        align-items: center
        padding: px2-2-rem(20) px2-2-rem(30)
        border-bottom: 1px solid #e5e5e5
        .title
          align-self: flex-start
          color: #353535
          margin-right: px2-2-rem(50)
        .accountInfo
          flex: 1
          font-size: px2-2-rem(28)
          color: #999999
        img
          width: px2-2-rem(16)
          height: px2-2-rem(24)
      .withdrawMoney
        display: flex
        flex-direction: column
        justify-content: space-between
        height: px2-2-rem(194)
        padding: px2-2-rem(20) px2-2-rem(30)
        border-bottom: 1px solid #e5e5e5
        .title
          color: #353535
        .money
          display: flex
          flex-direction: row
          align-items: baseline
          height: px2-2-rem(80)
          line-height: px2-2-rem(80)
          color: #e4790f
          font-size: px2-2-rem(80)
          span
            color: #055555
            font-size: px2-2-rem(32)
            margin-right: px2-2-rem(20)
      .contentNotice
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        height: px2-2-rem(74)
        line-height: px2-2-rem(74)
        font-size: px2-2-rem(28)
        color: #999999
        padding: 0 px2-2-rem(30)
        span
          color: #00a0e9
    .withdrawBtn
      width: px2-2-rem(690)
      height: px2-2-rem(88)
      line-height: px2-2-rem(88)
      text-align: center
      font-size: px2-2-rem(32)
      margin-top: px2-2-rem(30)
      margin-bottom: px2-2-rem(24)
      color: #ffffff
      background-color: #00a0e9
      border-radius: px2-2-rem(8)
    .withdrawNotice
      box-sizing: border-box
      width: 100%
      color: #999999
      font-size: px2-2-rem(26)
      padding-left: px2-2-rem(30)
</style>
