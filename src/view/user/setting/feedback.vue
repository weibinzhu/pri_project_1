<template>
  <div class="feedbackWrapper">
    <v-header title="意见反馈"></v-header>
    <div class="feedbackInputWrapper">
      <textarea v-model="feedbackValue" :placeholder="feedbackPlaceholder" class="feedbackInput"></textarea>
    </div>
    <div @click="submitFeedback" class="feedbackSubmit">提交反馈</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../../../components/v-header/v-header'

  export default {
    data() {
      return {
        feedbackValue: '',
        feedbackPlaceholder: '感谢您的使用，我们将会认真对待每一份宝贵的意见，继续努力优化体验'
      }
    },
    computed: {
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
      token() {
        return sessionStorage.getItem('token')
      }
    },
    methods: {
      submitFeedback() {
        this.$http.post(`${this.globalDOMAIN}Employ/Feedback/apply`, {
          'content': this.feedbackValue
        }, {
          emulateJSON: true,
          headers: {'token': this.token}
        }).then(res => {
          if (res.body.status) {
            this.$vux.toast.text('提交成功')
          } else {
            this.$vux.toast.text(res.body.msg)
          }
        })
      }
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .feedbackWrapper
    display: flex
    flex-direction: column
    align-items: center
    background-color: #f8f8f8
    .feedbackInputWrapper
      box-sizing: border-box
      width: 100%
      margin-bottom: px2-2-rem(60)
      margin-top: px2-2-rem(20)
      padding: px2-2-rem(32) px2-2-rem(50)
      font-size: px2-2-rem(32)
      background-color: #ffffff
      .feedbackInput
        height: px2-2-rem(400)
    .feedbackSubmit
      width: px2-2-rem(688)
      height: px2-2-rem(86)
      line-height: px2-2-rem(86)
      text-align: center
      font-size: px2-2-rem(32)
      color: #ffffff
      background-color: #00a0e9
      border-radius: px2-2-rem(8)
  //      以下开始修改系统默认样式
    textarea
      font-size: 0.4rem
      box-sizing: border-box
      border: none
      outline: none
      resize: none
      width: 100%

    ::-webkit-input-placeholder // 修改placeholder
      color: #999999
      font-size: 0.4rem
</style>
