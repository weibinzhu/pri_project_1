<template>
  <div class="contractWrapper">
    <v-header title="合同详情"></v-header>
    <div class="priceBlock">
      <div class="title">项目总金额 （元）</div>
      <div class="price">￥{{price}}</div>
    </div>

    <div class="contractBlock">
      <div class="header">项目合同</div>
      <div class="contractItemWrapper">
        <div class="contractItem" v-if="contract.isExist">
          <div class="contractIcon">{{contract.ext}}</div>
          <div class="contractText">{{contract.name}}</div>
        </div>
        <img v-if="!contract.isExist" class="addContract" src="./add@3x.png"/>
      </div>
    </div>

    <div class="signBlock">
      <div class="header">签署合同</div>
      <div class="signItemBlock">
        <div class="info">
          <div class="role">甲方</div>
          <div class="name">陈先生</div>
          <div class="date">2017年12月12日</div>
        </div>
        <div class="confirmedBtn" v-if="isFirstPartyConfirmed">已确认</div>
        <div class="toConfirmBtn" v-else>确认合同</div>
      </div>
      <div class="signItemBlock">
        <div class="info">
          <div class="role">乙方</div>
          <div class="name">主题邦科技有限公司</div>
          <div class="date">2017年11月30日</div>
        </div>
        <div class="confirmedBtn" v-if="isSecondPartyConfirmed">已确认</div>
        <div class="toConfirmBtn" v-else>确认合同</div>
      </div>
    </div>

    <div class="contractBlock" v-if="isFirstPartyConfirmed&&isSecondPartyConfirmed">
      <div class="header">附加合同</div>
      <div class="contractItemWrapper">
        <div class="contractItem" v-if="contractAttach.isExist">
          <div class="contractIcon">{{contractAttach.ext}}</div>
          <div class="contractText">{{contractAttach.name}}</div>
        </div>
        <img v-if="!contractAttach.isExist" class="addContract" src="./add@3x.png"/>
      </div>
    </div>

    <div class="signBlock" v-if="isFirstPartyConfirmed&&isSecondPartyConfirmed&&contractAttach.isExist">
      <div class="header">签署合同</div>
      <div class="signItemBlock">
        <div class="info">
          <div class="role">甲方</div>
          <div class="name">陈先生</div>
          <div class="date">2017年12月12日</div>
        </div>
        <div class="confirmedBtn" v-if="isFirstPartyConfirmedAttach">已确认</div>
        <div class="toConfirmBtn" v-else>确认合同</div>
      </div>
      <div class="signItemBlock">
        <div class="info">
          <div class="role">乙方</div>
          <div class="name">主题邦科技有限公司</div>
          <div class="date">2017年11月30日</div>
        </div>
        <div class="confirmedBtn" v-if="isSecondPartyConfirmedAttach">已确认</div>
        <div class="toConfirmBtn" v-else>确认合同</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'

  export default {
    data() {
      return {
        price: 36000,// 项目总金额
        contract: {
          isExist: true,
          link: 'www.baidu.com',
          name: 'V 1.6合同...',
          ext: '.doc'
        },
        contractAttach: {
          // 附加合同
          isExist: true,
          link: 'www.baidu.com',
          name: 'V 1.6附加...',
          ext: '.doc'
        },
        isFirstPartyConfirmed: true,// 甲方确认
        isSecondPartyConfirmed: true,// 乙方确认
        isFirstPartyConfirmedAttach: false,// 附加合同甲方确认
        isSecondPartyConfirmedAttach: true,// 附加合同乙方确认
      }
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/style/fun.styl"
  .contractWrapper
    display: flex
    flex-direction: column
    min-height: 100vh
    background-color: #f8f8f8
    .priceBlock
      box-sizing: border-box
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      height: px2-2-rem(90)
      padding: 0 px2-2-rem(30)
      margin-bottom: px2-2-rem(20)
      border-top: 1px solid #e9e9e9
      font-size: px2-2-rem(32)
      background-color: #ffffff
      .price
        color: #e4790f
    .contractBlock, .signBlock
      display: flex
      flex-direction: column
      font-size: px2-2-rem(32)
      padding-left: px2-2-rem(30)
      margin-bottom: px2-2-rem(20)
      border-top: 1px solid #e9e9e9
      background-color: #ffffff
      .header
        height: px2-2-rem(90)
        line-height: px2-2-rem(90)
        border-bottom: 1px solid #e5e5e5
      .contractItemWrapper
        display: flex
        flex-direction: row
        flex-wrap: wrap
        align-content: center
        padding-top: px2-2-rem(30)
        padding-bottom: px2-2-rem(60)
        .contractItem
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          height: px2-2-rem(144)
          margin-right: px2-2-rem(20)
          .contractIcon
            width: px2-2-rem(144)
            height: px2-2-rem(88)
            line-height: px2-2-rem(88)
            text-align: center
            background-color: #00a0e9
            color: #ffffff
            border-radius: px2-2-rem(8)
          .contractText
            margin-top: px2-2-rem(10)
            font-size: px2-2-rem(26)
            color: #888888
        .addContract
          height: px2-2-rem(142)
          width: px2-2-rem(142)
      .signItemBlock
        box-sizing: border-box
        display: flex
        flex-direction: row
        align-items: center
        justify-content: space-between
        padding-right: px2-2-rem(36)
        height: px2-2-rem(168)
        border-bottom: 1px solid #e5e5e5
        .role
          font-size: px2-2-rem(30)
          color: #999999
        .name
          font-size: px2-2-rem(32)
        .date
          font-size: px2-2-rem(26)
          color: #999999
        .confirmedBtn, .toConfirmBtn
          display: flex
          flex-direction: row
          align-items: center
          justify-content: center
          font-size: px2-2-rem(30)
          width: px2-2-rem(162)
          height: px2-2-rem(50)
          border-radius: px2-2-rem(8)
        .confirmedBtn
          color: #555555
          border: 1px solid #555555
        .toConfirmBtn
          color: #00a0e9
          border: 1px solid #00a0e9
      .signItemBlock:last-child
        border: none
</style>
