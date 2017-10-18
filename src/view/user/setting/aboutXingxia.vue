<template>
  <div class="aboutXingxiaWrapper">
    <v-header title="行峡网"></v-header>
    <div class="aboutContent">
      <img src="/static/logo@3x.png"/>
      <div class="version">行峡网V1.1.0</div>
      <p class="aboutText">
        巴拉巴拉内容内容巴拉巴拉内容内容巴拉巴拉内容内容巴拉巴拉内容内容巴拉巴拉内容内容巴拉巴拉内容内容巴拉巴拉内容内容
        巴拉巴拉内容内容巴拉巴拉内容内容巴拉巴拉内容内容巴拉巴拉内容内容巴拉巴拉内容内容巴拉巴拉内容内容巴拉巴拉内容内容巴拉巴拉内容内容
        巴拉巴拉内容内容巴拉巴拉内容内容巴拉巴拉内容内容
      </p>
    </div>
    <router-link tag="div" to="/userAgreement" class="toUserAgreement">
      <div class="toUserAgreementTitle">用户协议</div>
      <img src="/static/arrow-right-gray.png"/>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../../../components/v-header/v-header'

  export default {
    data() {
      return {}
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .aboutXingxiaWrapper
    display: flex
    flex-direction: column
    align-items: center
    height: 100vh
    background-color: #f8f8f8
    .aboutContent
      display: flex
      flex-direction: column
      align-items: center
      font-size: px2-2-rem(28)
      color: #888888
      padding: px2-2-rem(40) px2-2-rem(40) px2-2-rem(60) px2-2-rem(40)
      background-color: #ffffff
      border-bottom: 1px solid #e5e5e5
      img
        width: px2-2-rem(126)
        margin-bottom: px2-2-rem(26)
      .version
        margin-bottom: px2-2-rem(40)
    .toUserAgreement
      box-sizing: border-box
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      width: 100%
      height: px2-2-rem(88)
      font-size: px2-2-rem(32)
      margin-top :px2-2-rem(20)
      padding: 0 px2-2-rem(30)
      border-top: 1px solid #e5e5e5
      border-bottom: 1px solid #e5e5e5
      background-color :#ffffff
      img
        width: px2-2-rem(16)
        height: px2-2-rem(24)
</style>
