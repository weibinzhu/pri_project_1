<template>
  <div class="userAgreementWrapper">
    <v-header title="行峡网"></v-header>
    <div class="userAgreementContent">
      <div class="agreementTitle">行峡网用户服务协议</div>
      <p class="agreementText">
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
      </p>
    </div>
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
  .userAgreementWrapper
    height: 100vh
    background-color: #ffffff
    .userAgreementContent
      padding: px2-2-rem(40) px2-2-rem(30)
    .agreementTitle
      font-size: px2-2-rem(32)
      line-height: px2-2-rem(60)
      height: px2-2-rem(60)
      text-align: center
      color: #353535
    .agreementText
      margin-top :px2-2-rem(20)
      font-size: px2-2-rem(28)
      color: #888888
</style>
