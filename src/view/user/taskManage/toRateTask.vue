<template>
  <div class="toRateTaskWrapper">
    <v-header title="评价"></v-header>
    <loading v-show="isLoading"></loading>
    <div class="ratingScore">
      <div class="title">
        好评度
      </div>
      <ul class="starWrapper">
        <li @click="setScore(index)" v-for="(item,index) in new Array(starLength)"
            :class="[index<score?'starActive':'','star']"></li>
      </ul>
    </div>
    <div class="rateTextInput">
      <textarea :placeholder="inputPH" v-model="comment"></textarea>
    </div>
    <div @click="onSubmitClick" class="submitRatingBtn">
      提交评价
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'
  import Loading from '@/components/loading'

  export default {
    data() {
      return {
        isLoading: false,
        taskId: -1,
        bidId: -1,
        starLength: 5,// 星星长度
        score: 1,// 评价星数
        comment: '',// 评价内容
        inputPH: '请留下您对我们服务的评价吧~'
      }
    },
    created() {
      this.taskId = this.$route.params.taskId
      this.bidId = this.$route.params.bidId
    },
    computed: {
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
      token(){
        return sessionStorage.getItem('token')
      }
    },
    methods: {
      setScore(index) {
        this.score = index + 1
      },
      onSubmitClick() {
        let result = confirm('确定要提交？')
        if (result) {
          this.sendComment(this.taskId, this.bidId, this.score, this.comment)
        }
      },
      sendComment(task_id, bid_id, score, comment) {
        let data = {
          task_id,
          bid_id,
          score,
          comment,
        }
        this.$http.post(`${this.globalDOMAIN}Employ/Task/comment`, data, {
          emulateJSON: true,
          headers: {'token': this.token}
        }).then((res) => {
          if (res.body.status) {
            this.$vux.toast.text('评价发送成功')
            this.$router.go(-1)
          } else {
            this.$vux.toast.text(`${res.body.msg}`)
          }
        })
      }
    },
    components: {
      Loading,
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/style/fun.styl"
  .toRateTaskWrapper
    display: flex
    flex-direction: column
    align-items: center
    background-color: #f8f8f8
    min-height: 100vh
    font-size: px2-2-rem(32)
    .ratingScore
      box-sizing: border-box
      display: flex
      flex-direction: row
      align-items: center
      padding: 0 px2-2-rem(50)
      height: px2-2-rem(130)
      width: 100%
      background-color: #ffffff
      border-top: 1px solid #d9d9d9
      border-bottom: 1px solid #d9d9d9
      .title
        margin-right: px2-2-rem(30)
      .starWrapper
        display: flex
        flex-direction: row
        align-items: center
        .star
          width: px2-2-rem(56)
          height: px2-2-rem(56)
          margin-right: px2-2-rem(8)
          background-size: px2-2-rem(112) px2-2-rem(56)
          background-image: url('./star.png')
          transition: background 0.2s
        .starActive
          background-position: px2-2-rem(56) 0
    .rateTextInput
      box-sizing: border-box
      padding: px2-2-rem(30) px2-2-rem(50)
      height: px2-2-rem(258)
      width: 100%
      background: #ffffff
      border-bottom: 1px solid #d9d9d9
    .submitRatingBtn
      margin-top: px2-2-rem(40)
      width: px2-2-rem(690)
      height: px2-2-rem(84)
      line-height: px2-2-rem(84)
      text-align: center
      color: #ffffff
      background-color: #00a0e9
      border-radius: px2-2-rem(8)
  //      以下开始修改系统默认样式
    textarea
      font-size: px2-2-rem(32)
      box-sizing: border-box
      border: none
      outline: none
      resize: none
      width: 100%
      height: px2-2-rem(200)

    ::-webkit-input-placeholder // 修改placeholder
      color: #999999
      font-size: 0.4rem
</style>
